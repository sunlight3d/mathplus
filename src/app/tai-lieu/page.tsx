import Link from "next/link";
import { FileText, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài liệu | MathPlus Academy",
  description: "Tài liệu học tập Toán các lớp 6, 7, 8 và luyện thi",
};

export const documents = [
  {
    id: "toan-lop-6",
    title: "Toán lớp 6",
    description: "Tài liệu học tập và bài tập Toán lớp 6",
    fileUrl: "/documents/toan-lop-6.pdf",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: "toan-lop-7",
    title: "Toán lớp 7",
    description: "Tài liệu học tập và bài tập Toán lớp 7",
    fileUrl: "/documents/toan-lop-7.pdf",
    color: "from-emerald-500 to-teal-400"
  },
  {
    id: "toan-lop-8",
    title: "Toán lớp 8",
    description: "Tài liệu học tập và bài tập Toán lớp 8",
    fileUrl: "/documents/toan-lop-8.pdf",
    color: "from-orange-500 to-amber-400"
  }
];

export default function TaiLieuPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Tài liệu học tập
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto drop-shadow-sm">
            Kho tài liệu, đề thi và bài tập được biên soạn độc quyền bởi MathPlus Academy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc) => (
            <Link 
              key={doc.id} 
              href={`/tai-lieu/${doc.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col transform hover:-translate-y-1"
            >
              <div className={`h-40 bg-gradient-to-r ${doc.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <BookOpen className="text-white/80 w-20 h-20 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {doc.description}
                </p>
                <div className="mt-auto flex items-center text-green-600 font-medium text-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Đọc tài liệu
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
