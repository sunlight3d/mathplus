import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDefaultQuestionsForGrade } from "@/components/quiz/quizData";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow up to 60s for AI generation

interface GeneratedOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

interface GeneratedQuestion {
  topic: string;
  question: string;
  options: GeneratedOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  iconType?: string;
}

const GRADE_PROMPTS: Record<number, string> = {
  6: "Toán lớp 6 (Số tự nhiên, Số nguyên, Phân số, Số thập phân, Tính chất chia hết, Hình học trực quan)",
  7: "Toán lớp 7 (Số hữu tỉ, Số thực, Biểu thức đại số, Tỉ lệ thức, Tam giác bằng nhau, Định lý hình học)",
  8: "Toán lớp 8 (Hằng đẳng thức đáng nhớ, Phân thức đại số, Hàm số bậc nhất, Tứ giác, Định lý Thales, Tam giác đồng dạng)",
  9: "Toán lớp 9 (Căn bậc hai, Hệ hai phương trình bậc nhất, Hàm số y=ax^2, Phương trình bậc hai, Hệ thức Vi-ét, Góc với đường tròn, Ôn thi vào 10)",
  10: "Toán lớp 10 (Mệnh đề - Tập hợp, Bất phương trình bậc hai, Đại số tổ hợp, Vector, Hệ thức lượng trong tam giác, Phương pháp tọa độ trong mặt phẳng)",
  11: "Toán lớp 11 (Hàm số lượng giác & Phương trình lượng giác, Dãy số, Cấp số cộng, Cấp số nhân, Giới hạn, Đạo hàm, Quan hệ song song và vuông góc trong không gian)",
  12: "Toán lớp 12 (Ứng dụng đạo hàm khảo sát hàm số, Hàm số lũy thừa - mũ - logarit, Nguyên hàm - Tích phân, Hình học không gian Oxyz, Xác suất có điều kiện, Ôn thi THPT Quốc Gia & ĐGNL)"
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const grade = Math.min(Math.max(Number(body.grade) || 6, 6), 12);
    const count = Math.min(Math.max(Number(body.count) || 10, 1), 15);

    const gradeDesc = GRADE_PROMPTS[grade] || `Toán lớp ${grade}`;
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

    const prompt = `Bạn là chuyên gia sư phạm Toán học cao cấp tại trung tâm MathPlus Academy.
Nhiệm vụ: Tạo đúng ${count} câu hỏi trắc nghiệm Toán học dành cho học sinh ${gradeDesc} bám sát chương trình GDPT mới tại Việt Nam.

Yêu cầu chất lượng:
1. Đa dạng các dạng bài: tính toán nhanh, tư duy logic, bài toán thực tế, hình học, đại số phù hợp đúng lứa tuổi lớp ${grade}.
2. Mỗi câu có 4 đáp án A, B, C, D (đúng 1 đáp án chính xác).
3. Lời giải thích ngắn gọn, súc tích, dễ hiểu theo từng bước.
4. Chọn 1 biểu tượng emoji đại diện phù hợp cho mỗi câu (ví dụ: 📐, 🧮, 🔢, 🌾, 📚, 🛒, 🔮, 📏, ✏️, 🎯, 💡).

Định dạng trả về: Bắt buộc là JSON array gồm đúng ${count} object theo cấu trúc:
[
  {
    "topic": "Tên chủ đề ngắn gọn",
    "question": "Nội dung câu hỏi rõ ràng",
    "options": [
      { "key": "A", "text": "Nội dung đáp án A" },
      { "key": "B", "text": "Nội dung đáp án B" },
      { "key": "C", "text": "Nội dung đáp án C" },
      { "key": "D", "text": "Nội dung đáp án D" }
    ],
    "correctAnswer": "A",
    "explanation": "Hướng dẫn giải chi tiết",
    "iconType": "📐"
  }
]

Chỉ xuất ra duy nhất JSON array, không kèm markdown, không có bất kỳ văn bản giải thích nào khác ngoài JSON.`;

    let generatedQuestions: GeneratedQuestion[] = [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

      const ollamaRes = await fetch(`${ollamaBaseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen3.5:397b-cloud",
          prompt: prompt,
          stream: false,
          format: "json"
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (ollamaRes.ok) {
        const ollamaData = await ollamaRes.json();
        const rawText = ollamaData.response || "";
        const parsed = JSON.parse(rawText);

        if (Array.isArray(parsed) && parsed.length > 0) {
          generatedQuestions = parsed;
        } else if (parsed && typeof parsed === "object" && Array.isArray(parsed.questions)) {
          generatedQuestions = parsed.questions;
        }
      }
    } catch (ollamaError) {
      console.warn("Ollama not reachable or timed out, using DB fallback:", ollamaError);
    }

    // If AI generated questions successfully, insert them into DB
    if (generatedQuestions.length > 0) {
      const insertData = generatedQuestions.map((q) => ({
        grade,
        topic: String(q.topic || `Toán Lớp ${grade}`).toUpperCase(),
        question: String(q.question || ""),
        options: JSON.parse(JSON.stringify(q.options || [])) as any,
        correctAnswer: String(q.correctAnswer || "A"),
        explanation: String(q.explanation || "Không có lời giải chi tiết"),
        iconType: q.iconType || "📐"
      }));

      // Insert into PostgreSQL
      try {
        await prisma.quizQuestion.createMany({
          data: insertData
        });
      } catch (dbError) {
        console.error("Error saving generated questions to DB:", dbError);
      }

      // Fetch the newly inserted questions from DB to return complete records
      const savedQuestions = await prisma.quizQuestion.findMany({
        where: { grade },
        orderBy: { id: "desc" },
        take: count
      });

      return NextResponse.json({
        success: true,
        source: "AI_GENERATED",
        grade,
        questions: savedQuestions.map((q) => ({
          id: q.id,
          topic: q.topic,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          iconType: q.iconType || "📐"
        }))
      });
    }

    // Fallback: Query random questions from DB for this grade
    let dbQuestions = await prisma.quizQuestion.findMany({
      where: { grade }
    });

    if (dbQuestions.length === 0) {
      // Auto seed from default question bank
      const defaults = getDefaultQuestionsForGrade(grade);
      try {
        await prisma.quizQuestion.createMany({
          data: defaults.map(q => ({
            grade,
            topic: q.topic,
            question: q.question,
            options: q.options as any,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            iconType: q.iconType || "📐"
          }))
        });
        dbQuestions = await prisma.quizQuestion.findMany({
          where: { grade }
        });
      } catch (e) {
        // Return static defaults
        return NextResponse.json({
          success: true,
          source: "DEFAULT_FALLBACK",
          grade,
          questions: defaults.slice(0, count)
        });
      }
    }

    if (dbQuestions.length > 0) {
      // Shuffle and pick `count` questions
      const shuffled = [...dbQuestions].sort(() => 0.5 - Math.random()).slice(0, count);
      return NextResponse.json({
        success: true,
        source: "DATABASE_FALLBACK",
        grade,
        questions: shuffled.map((q) => ({
          id: q.id,
          topic: q.topic,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          iconType: q.iconType || "📐"
        }))
      });
    }

    const fallbackList = getDefaultQuestionsForGrade(grade);
    return NextResponse.json({
      success: true,
      source: "DEFAULT_FALLBACK",
      grade,
      questions: fallbackList.slice(0, count)
    });
  } catch (error: any) {
    console.error("Quiz generate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
