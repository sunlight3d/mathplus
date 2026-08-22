const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

const GRADE_CONFIGS = [
  { grade: 6, desc: "Toán lớp 6 (Số tự nhiên, Số nguyên, Phân số, Tính chất chia hết, Hình học trực quan)" },
  { grade: 7, desc: "Toán lớp 7 (Số hữu tỉ, Số thực, Biểu thức đại số, Tỉ lệ thức, Tam giác bằng nhau)" },
  { grade: 8, desc: "Toán lớp 8 (Hằng đẳng thức đáng nhớ, Phân thức đại số, Hàm số bậc nhất, Tứ giác, Định lý Thales)" },
  { grade: 9, desc: "Toán lớp 9 (Căn bậc hai, Hệ hai phương trình bậc nhất, Hàm số bậc hai, Hệ thức Vi-ét, Đường tròn, Ôn thi vào 10)" },
  { grade: 10, desc: "Toán lớp 10 (Mệnh đề - Tập hợp, Bất phương trình bậc hai, Đại số tổ hợp, Vector, Hệ thức lượng)" },
  { grade: 11, desc: "Toán lớp 11 (Hàm số lượng giác, Dãy số, Cấp số cộng/nhân, Giới hạn, Đạo hàm, Hình không gian)" },
  { grade: 12, desc: "Toán lớp 12 (Khảo sát hàm số, Hàm số mũ - Logarit, Nguyên hàm - Tích phân, Tọa độ Oxyz, Xác suất, Luyện thi THPT QG)" }
];

async function generateBatch(grade, desc, count = 5) {
  const prompt = `Bạn là chuyên gia sư phạm Toán học tại trung tâm MathPlus Academy.
Hãy tạo đúng ${count} câu hỏi trắc nghiệm Toán học hay, chuẩn xác dành cho học sinh ${desc} bám sát chương trình GDPT mới tại Việt Nam.

Mỗi câu có 4 đáp án A, B, C, D (đúng 1 đáp án chính xác), lời giải chi tiết, và emoji icon.

Định dạng trả về: Duy nhất một JSON array gồm ${count} objects:
[
  {
    "topic": "Tên chủ đề ngắn gọn",
    "question": "Nội dung câu hỏi",
    "options": [
      { "key": "A", "text": "Đáp án A" },
      { "key": "B", "text": "Đáp án B" },
      { "key": "C", "text": "Đáp án C" },
      { "key": "D", "text": "Đáp án D" }
    ],
    "correctAnswer": "A",
    "explanation": "Hướng dẫn giải chi tiết",
    "iconType": "📐"
  }
]
Không xuất markdown.`;

  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen3.5:397b-cloud",
        prompt,
        stream: false,
        format: "json"
      })
    });

    const data = await res.json();
    const parsed = JSON.parse(data.response);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.questions)) return parsed.questions;
    return [];
  } catch (err) {
    console.error(`Error generating grade ${grade}:`, err.message);
    return [];
  }
}

async function main() {
  console.log("Starting full seed for Grades 6 - 12 with Qwen 3.5 Cloud...");
  const allData = {};

  for (const cfg of GRADE_CONFIGS) {
    console.log(`[Grade ${cfg.grade}] Generating questions...`);
    let batch1 = await generateBatch(cfg.grade, cfg.desc, 5);
    let batch2 = await generateBatch(cfg.grade, cfg.desc, 5);
    let allQuestions = [...batch1, ...batch2];

    if (allQuestions.length === 0) {
      console.log(`[Grade ${cfg.grade}] Retrying...`);
      allQuestions = await generateBatch(cfg.grade, cfg.desc, 5);
    }

    console.log(`[Grade ${cfg.grade}] Got ${allQuestions.length} questions!`);
    allData[cfg.grade] = allQuestions;

    if (allQuestions.length > 0) {
      const insertData = allQuestions.map(q => ({
        grade: cfg.grade,
        topic: String(q.topic || `Toán Lớp ${cfg.grade}`).toUpperCase(),
        question: String(q.question || ""),
        options: q.options || [],
        correctAnswer: String(q.correctAnswer || "A"),
        explanation: String(q.explanation || ""),
        iconType: q.iconType || "📐"
      }));

      await prisma.quizQuestion.createMany({
        data: insertData
      });
      console.log(`[Grade ${cfg.grade}] Saved to PostgreSQL!`);
    }
  }

  fs.writeFileSync('src/components/quiz/defaultQuestionsByGrade.json', JSON.stringify(allData, null, 2), 'utf-8');
  console.log("Finished! Saved all questions to defaultQuestionsByGrade.json & PostgreSQL.");
  await prisma.$disconnect();
}

main().catch(console.error);
