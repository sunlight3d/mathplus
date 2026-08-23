import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDefaultQuestionsForGrade } from "@/components/quiz/quizData";
import { sampleCurriculumBalanced } from "@/lib/quizSampling";

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

const GRADE_CURRICULUM_STRUCTURE: Record<number, string> = {
  6: `Chương trình Toán 6 cần dàn trải đều qua các phần:
1. Số tự nhiên & Tính chất chia hết (ƯCLN, BCNN, số nguyên tố)
2. Số nguyên (Cộng trừ nhân chia số nguyên, quy tắc dấu)
3. Phân số & Số thập phân (Tính toán, so sánh, tỉ số phần trăm)
4. Hình học trực quan (Tam giác đều, hình thoi, hình chữ nhật, hình thang cân, chu vi, diện tích)
5. Tính đối xứng, Điểm, Đoạn thẳng & Góc
6. Bài toán thực tế mua sắm, lãi suất, chuyển động`,

  7: `Chương trình Toán 7 cần dàn trải đều qua các phần:
1. Số hữu tỉ & Số thực (Căn bậc hai số học, giá trị tuyệt đối, lũy thừa)
2. Tỉ lệ thức & Dãy tỉ số bằng nhau, Đại lượng tỉ lệ thuận/nghịch
3. Biểu thức đại số & Đa thức một biến (Cộng trừ nhân chia đa thức, nghiệm)
4. Góc, Hai đường thẳng song song, Định lý
5. Tam giác bằng nhau (c-c-c, c-g-c, g-c-g, tam giác vuông, tam giác cân)
6. Quan hệ cạnh - góc trong tam giác & 4 đường đồng quy (trung tuyến, phân giác, trung trực, đường cao)
7. Xác suất & Thống kê cơ bản`,

  8: `Chương trình Toán 8 cần dàn trải đều qua các phần:
1. Đa thức nhiều biến & 7 Hằng đẳng thức đáng nhớ, Phân tích nhân tử
2. Phân thức đại số (Rút gọn, cộng trừ nhân chia phân thức)
3. Hàm số bậc nhất y = ax + b & Hệ số góc, Đồ thị
4. Phương trình bậc nhất một ẩn & Giải bài toán bằng cách lập PT
5. Tứ giác (Hình thang cân, hình bình hành, hình thoi, hình chữ nhật, hình vuông)
6. Định lý Thales trong tam giác & Tính chất đường phân giác
7. Tam giác đồng dạng & Hình chóp tam giác/tứ giác đều`,

  9: `Chương trình Toán 9 cần dàn trải đều qua các phần:
1. Căn bậc hai, căn bậc ba & Biến đổi rút gọn căn thức
2. Hệ hai phương trình bậc nhất hai ẩn & Giải bài toán bằng cách lập HPT
3. Hàm số y = ax² & Phương trình bậc hai một ẩn
4. Định lý Vi-ét và các bài toán tương giao Parabol - Đường thẳng
5. Hệ thức lượng trong tam giác vuông & Tỉ số lượng giác góc nhọn
6. Đường tròn, Góc ở tâm, Góc nội tiếp & Tứ giác nội tiếp
7. Hình trụ, hình nón, hình cầu & Bài toán thực tế tích hợp`,

  10: `Chương trình Toán 10 cần dàn trải đều qua các phần:
1. Mệnh đề & Tập hợp
2. Bất phương trình & Hệ BPT bậc nhất hai ẩn (Quy hoạch tuyến tính tối ưu)
3. Hệ thức lượng trong tam giác (Định lý Sin, Cosin, Công thức diện tích)
4. Vector & Tích vô hướng của hai vector
5. Hàm số bậc hai & Dấu tam thức bậc hai, BPT bậc hai
6. Phương pháp tọa độ trong mặt phẳng Oxy (PT đường thẳng, PT đường tròn, 3 đường Conic: Elip, Hypebol, Parabol)
7. Đại số tổ hợp (Quy tắc đếm, Hoán vị, Chỉnh hợp, Tổ hợp, Nhị thức Newton)
8. Xác suất cổ điển`,

  11: `Chương trình Toán 11 cần dàn trải đều qua các phần:
1. Hàm số lượng giác & Phương trình lượng giác cơ bản
2. Dãy số, Cấp số cộng & Cấp số nhân
3. Giới hạn dãy số, giới hạn hàm số & Hàm số liên tục
4. Đạo hàm, quy tắc tính đạo hàm & Tiếp tuyến đồ thị
5. Hình học không gian: Quan hệ song song (đường-đường, đường-mặt, mặt-mặt)
6. Hình học không gian: Quan hệ vuông góc, Góc nhị diện & Khoảng cách
7. Thống kê mẫu số liệu ghép nhóm & Xác suất hợp, giao, độc lập`,

  12: `Chương trình Toán 12 cần dàn trải đều qua các phần:
1. Đơn điệu, Cực trị, GTLN - GTNN & Tiệm cận của đồ thị hàm số
2. Khảo sát & Nhận dạng đồ thị hàm số (bậc 3, phân thức bậc 1/1, bậc 2/1)
3. Hàm số lũy thừa, mũ & logarit (Phương trình, bất phương trình mũ - logarit)
4. Nguyên hàm, Tích phân & Ứng dụng tính diện tích, thể tích khối tròn xoay
5. Phương pháp tọa độ không gian Oxyz (Tọa độ điểm, vector, tích có hướng, Mặt cầu, Mặt phẳng, Đường thẳng, Vị trí tương đối, Góc & Khoảng cách)
6. Thống kê độ phân tán & Xác suất có điều kiện, Công thức xác suất toàn phần, Bayes
7. Bài toán thực tế tối ưu hóa kinh tế, vật lý, sinh học`
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const grade = Math.min(Math.max(Number(body.grade) || 6, 6), 12);
    const count = Math.min(Math.max(Number(body.count) || 10, 1), 15);

    const curriculumOutline = GRADE_CURRICULUM_STRUCTURE[grade] || `Toán lớp ${grade}`;
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

    const prompt = `Bạn là chuyên gia sư phạm Toán học cao cấp tại trung tâm MathPlus Academy.
Nhiệm vụ: Tạo đúng ${count} câu hỏi trắc nghiệm Toán học dành cho học sinh Lớp ${grade} bám sát chương trình GDPT mới tại Việt Nam.

ĐẶC BIỆT LƯU Ý - YÊU CẦU DÀN TRẢI KHUNG CHƯƠNG TRÌNH:
Bộ ${count} câu hỏi BẮT BUỘC PHẢI DÀN TRẢI ĐỀU QUA CÁC CHỦ ĐỀ sau, TUYỆT ĐỐI KHÔNG TẬP TRUNG VÀO DUY NHẤT 1 PHẦN:
${curriculumOutline}

Mỗi câu trong số ${count} câu phải thuộc về MỘT CHƯƠNG / DẠNG BÀI KHÁC NHAU theo cấu trúc trên.

Yêu cầu chất lượng:
1. Đa dạng câu hỏi: Nhận biết, Thông hiểu, Vận dụng tính toán và Toán thực tế.
2. Mỗi câu có 4 đáp án A, B, C, D (đúng 1 đáp án chính xác).
3. Lời giải thích ngắn gọn, sư phạm theo từng bước.
4. Chọn 1 biểu tượng emoji đại diện phù hợp cho mỗi câu (📐, 🧮, 🔢, 🌾, 📚, 🛒, 🔮, 📏, ✏️, 🎯, 💡, 📊, 🚀, 🏆).

Định dạng trả về: Bắt buộc là JSON array gồm đúng ${count} object:
[
  {
    "topic": "Tên chủ đề ngắn gọn",
    "question": "Nội dung câu hỏi",
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

Chỉ xuất ra duy nhất JSON array, không kèm markdown hay chữ nào khác.`;

    let generatedQuestions: GeneratedQuestion[] = [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000);

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
      console.warn("Ollama not reachable or timed out, using DB balanced fallback:", ollamaError);
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

      try {
        await prisma.quizQuestion.createMany({
          data: insertData
        });
      } catch (dbError) {
        console.error("Error saving generated questions to DB:", dbError);
      }

      return NextResponse.json({
        success: true,
        source: "AI_GENERATED",
        grade,
        questions: generatedQuestions.map((q, idx) => ({
          id: idx + 1,
          topic: q.topic,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          iconType: q.iconType || "📐"
        }))
      });
    }

    // Fallback: Query all questions from DB for this grade and apply Stratified Balanced Sampling
    let dbQuestions = await prisma.quizQuestion.findMany({
      where: { grade },
      take: 600
    });

    if (dbQuestions.length === 0) {
      const defaults = getDefaultQuestionsForGrade(grade);
      try {
        await prisma.quizQuestion.createMany({
          data: defaults.map(q => ({
            grade,
            topic: String(q.topic || `Toán Lớp ${grade}`).toUpperCase(),
            question: q.question,
            options: q.options as any,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            iconType: q.iconType || "📐"
          }))
        });
        dbQuestions = await prisma.quizQuestion.findMany({
          where: { grade },
          take: 600
        });
      } catch (e) {
        const balancedStatic = sampleCurriculumBalanced(defaults, count);
        return NextResponse.json({
          success: true,
          source: "DEFAULT_FALLBACK",
          grade,
          questions: balancedStatic
        });
      }
    }

    const balancedQuestions = sampleCurriculumBalanced(dbQuestions, count);
    return NextResponse.json({
      success: true,
      source: "DATABASE_FALLBACK",
      grade,
      questions: balancedQuestions.map((q) => ({
        id: q.id,
        topic: q.topic,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        iconType: q.iconType || "📐"
      }))
    });
  } catch (error: any) {
    console.error("Quiz generate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
