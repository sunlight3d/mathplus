import Link from "next/link";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import Pagination from "@/components/Pagination";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

export default async function SuccessStoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [stories, totalCount] = await Promise.all([
    prisma.successStory.findMany({
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.successStory.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <main className="main">
      <div className="breadcrumb py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <ul className="breadcrumb-list flex items-center gap-2 text-sm text-gray-600">
            <li className="breadcrumb-item">
              <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            </li>
            <li>/</li>
            <li className="breadcrumb-item">
              <span className="current text-blue-800 font-medium">Câu chuyện thành công</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="bg-gradient-to-r from-green-700 to-emerald-500 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="section-title">
            <h2 className="title text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wide drop-shadow-md">Câu chuyện thành công</h2>
            <p className="desc text-green-50 max-w-2xl mx-auto drop-shadow-sm">Hành trình chinh phục điểm cao môn Toán và những bí quyết học tập từ các học sinh tiêu biểu của MathPlus.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative z-10">
            {stories.map((story) => (
              <div key={story.id} className="story-item bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.1)] transition-all duration-300 overflow-hidden group flex flex-col border border-green-50">
                <Link href={`/cau-chuyen-thanh-cong/${story.slug}`} className="story-img block relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={story.imageUrl || "/images/placeholder.jpg"}
                    alt={story.studentName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-4 left-4 bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded text-sm font-semibold text-white shadow-sm">
                    {story.studentName}
                  </div>
                </Link>
                <div className="story-content p-6 flex flex-col flex-grow">
                  <h3 className="story-name text-xl font-bold text-green-800 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    <Link href={`/cau-chuyen-thanh-cong/${story.slug}`}>
                      {story.achievement}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
                    {story.excerpt}
                  </p>
                  <div className="story-fl flex items-center justify-between mt-auto pt-4 border-t border-green-50">
                    <div className="story-time flex items-center gap-2 text-xs font-medium text-gray-400">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{new Date(story.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <Link href={`/cau-chuyen-thanh-cong/${story.slug}`} className="text-orange-500 font-semibold text-sm hover:text-green-800 transition-colors flex items-center gap-1 group/btn">
                      <span>Chi tiết</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <div className="pagination-wrapper bg-white rounded-full px-6 py-2 shadow-sm inline-block">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
