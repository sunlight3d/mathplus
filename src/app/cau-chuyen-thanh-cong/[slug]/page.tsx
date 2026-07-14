import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ArrowLeft, Trophy } from "lucide-react";

const prisma = new PrismaClient();

export default async function SuccessStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const story = await prisma.successStory.findUnique({
    where: { slug },
  });

  if (!story) {
    notFound();
  }

  return (
    <div className="bg-green-50/50 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <Link href="/cau-chuyen-thanh-cong" className="inline-flex items-center text-green-100 hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Quay lại danh sách
          </Link>
          <div className="flex items-center gap-2 mb-4">
             <div className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider border border-white/20">
                <Trophy size={16} />
                <span>Học sinh xuất sắc</span>
             </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-md">
            {story.studentName} - {story.achievement}
          </h1>
          <div className="flex items-center text-green-100 gap-4">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={18} />
              <span>
                {new Date(story.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 -mt-8 relative z-20 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          {story.imageUrl && (
            <div className="w-full h-[400px] relative">
              <img
                src={story.imageUrl}
                alt={story.studentName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8 text-orange-900 italic text-lg text-center">
              "{story.excerpt}"
            </div>
            <div 
              className="prose prose-lg prose-green max-w-none prose-headings:text-green-800 prose-a:text-orange-500"
              dangerouslySetInnerHTML={{ __html: story.content || "" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
