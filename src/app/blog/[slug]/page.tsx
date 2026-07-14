import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowLeft, Clock } from "lucide-react";

const prisma = new PrismaClient();

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="bg-green-50/50 min-h-screen pb-20">
      {/* Post Header */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-green-100 hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Quay lại trang Blog
          </Link>
          <div className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md mb-4 uppercase tracking-wider border border-white/20">
            Tin Tức
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-md">
            {post.title}
          </h1>
          <div className="flex items-center text-green-100 gap-4">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={18} />
              <span>
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={18} />
              <span>5 phút đọc</span>
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="container mx-auto px-4 -mt-8 relative z-20 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          {post.image && (
            <div className="w-full h-[400px] relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div 
              className="prose prose-lg prose-green max-w-none prose-headings:text-green-800 prose-a:text-orange-500"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          
          <div className="border-t border-gray-100 bg-gray-50 p-8 flex justify-center">
            <p className="text-gray-500 font-medium">Chia sẻ bài viết này: </p>
            {/* Social sharing icons could go here */}
          </div>
        </div>
      </section>
    </div>
  );
}
