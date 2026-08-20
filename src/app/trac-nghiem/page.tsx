import type { Metadata } from "next";
import QuizClient from "./QuizClient";
import MathBackground from "@/components/quiz/MathBackground";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Trắc nghiệm Đố Vui Toán Học | MathPlus Academy",
  description: "Trắc nghiệm đố vui Toán học tương tác trực quan, đếm ngược pháo dây và đọc câu hỏi tự động chuẩn giọng tiếng Việt tại MathPlus Academy.",
};

export default function TracNghiemPage() {
  return (
    <div className="bg-[#1b310a] min-h-screen relative overflow-hidden">
      {/* Math Background Layer */}
      <MathBackground />

      {/* Hero Intro Header with MathPlus Branding */}
      <section className="bg-gradient-to-b from-[#2e5311]/90 to-transparent pt-10 pb-4 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 py-1 px-4 rounded-full bg-[#64B428] text-white text-xs font-black uppercase tracking-wider mb-2 shadow-md">
            <span>📐</span>
            <span>Đấu Trí Toán Học Cùng MathPlus</span>
            <span>✨</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-md">
            Trắc Nghiệm Đố Vui <span className="text-[#FFB800]">Toán Học</span>
          </h1>
          <p className="text-sm md:text-base text-[#e0eed5] max-w-2xl mx-auto font-medium">
            Lắng nghe câu hỏi tự động • Thử thách tư duy tốc độ với đồng hồ pháo dây 8–12s • Bứt phá phản xạ Toán học!
          </p>
        </div>
      </section>

      {/* Main Interactive Quiz Engine */}
      <div className="relative z-10">
        <QuizClient />
      </div>
    </div>
  );
}
