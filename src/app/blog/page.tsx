import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Pagination from "@/components/Pagination";
import { CalendarDays, ArrowRight } from "lucide-react";
import Image from "next/image";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [posts, totalItems] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.post.count({
      where: { published: true },
    }),
  ]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Góc Chia Sẻ & Tin Tức
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto drop-shadow-sm">
            Cập nhật những thông tin mới nhất về phương pháp học toán, tin tức tuyển sinh và các hoạt động của MathPlus.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mt-12">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">Hiện tại chưa có bài viết nào được đăng tải.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-green-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <Image src="/images/logo.png" alt="MathPlus Logo" width={120} height={120} className="opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 z-20 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Tin Tức
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-3 gap-2">
                    <CalendarDays size={16} className="text-orange-500" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-green-800 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <div 
                    className="text-gray-600 mb-6 line-clamp-3 flex-grow"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-orange-500 font-semibold hover:text-green-800 transition-colors mt-auto group/link"
                  >
                    Xem chi tiết 
                    <ArrowRight size={18} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination totalPages={totalPages} />
          </div>
        )}
      </section>
    </div>
  );
}
