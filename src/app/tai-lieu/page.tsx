import Link from "next/link";
import { FileText, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài liệu | MathPlus Academy",
  description: "Tài liệu học tập Toán các lớp 6, 7, 8 và luyện thi",
};

import { PrismaClient } from "@prisma/client";
import DocumentList from "./DocumentList";

const prisma = new PrismaClient();

export default async function TaiLieuPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
  });

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
        <DocumentList documents={documents} />
      </section>
    </div>
  );
}
