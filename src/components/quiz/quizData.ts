import defaultQuestionsMap from "./defaultQuestionsByGrade.json";
import { sampleCurriculumBalanced } from "@/lib/quizSampling";

export interface QuizOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface QuizQuestion {
  id: number;
  grade?: number;
  topic: string;
  question: string;
  options: QuizOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  image?: string;
  iconType?: string;
}

export interface GradeItem {
  id: number;
  label: string;
  shortLabel: string;
  desc: string;
  icon: string;
}

export const GRADES: GradeItem[] = [
  { id: 6, label: "Toán lớp 6", shortLabel: "Lớp 6", desc: "Số tự nhiên, Phân số & Hình trực quan", icon: "📐" },
  { id: 7, label: "Toán lớp 7", shortLabel: "Lớp 7", desc: "Số hữu tỉ, Đại số & Tam giác", icon: "🧮" },
  { id: 8, label: "Toán lớp 8", shortLabel: "Lớp 8", desc: "Hằng đẳng thức, Tứ giác & Thales", icon: "🔢" },
  { id: 9, label: "Toán lớp 9", shortLabel: "Lớp 9", desc: "Căn bậc hai, Hệ thức Vi-ét & Ôn thi vào 10", icon: "🎯" },
  { id: 10, label: "Toán lớp 10", shortLabel: "Lớp 10", desc: "Vector, Bất phương trình & Tổ hợp", icon: "📏" },
  { id: 11, label: "Toán lớp 11", shortLabel: "Lớp 11", desc: "Lượng giác, Đạo hàm & Hình không gian", icon: "📊" },
  { id: 12, label: "Toán lớp 12", shortLabel: "Lớp 12", desc: "Hàm số, Tích phân, Oxyz & Luyện thi THPT", icon: "🏆" },
];

export function getDefaultQuestionsForGrade(grade: number): QuizQuestion[] {
  const gradeKey = String(grade) as keyof typeof defaultQuestionsMap;
  const list = defaultQuestionsMap[gradeKey] || defaultQuestionsMap["6"] || [];
  const formatted = list.map((q: any, idx: number) => ({
    id: q.id || idx + 1,
    grade,
    topic: q.topic || `Toán Lớp ${grade}`,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    iconType: q.iconType || "📐"
  }));

  return sampleCurriculumBalanced(formatted, 10);
}

export const defaultMathQuizQuestions: QuizQuestion[] = getDefaultQuestionsForGrade(6);
export const mathQuizQuestions: QuizQuestion[] = defaultMathQuizQuestions;
