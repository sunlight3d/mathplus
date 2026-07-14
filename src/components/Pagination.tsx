"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className="flex items-center justify-center gap-2 mt-12 mb-8">
      {/* Previous Button */}
      <li>
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#64B428] hover:text-[#64B428] transition-colors shadow-sm"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
        ) : (
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-300 cursor-not-allowed">
            <ChevronLeft className="w-5 h-5" />
          </span>
        )}
      </li>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <li key={`ellipsis-${index}`}>
              <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                <MoreHorizontal className="w-5 h-5" />
              </span>
            </li>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <li key={page}>
            {isCurrent ? (
              <span
                aria-current="page"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#64B428] text-white font-bold shadow-md cursor-default"
              >
                {page}
              </span>
            ) : (
              <Link
                href={createPageURL(page)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#64B428] hover:text-[#64B428] transition-colors shadow-sm font-medium"
              >
                {page}
              </Link>
            )}
          </li>
        );
      })}

      {/* Next Button */}
      <li>
        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#64B428] hover:text-[#64B428] transition-colors shadow-sm"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        ) : (
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-300 cursor-not-allowed">
            <ChevronRight className="w-5 h-5" />
          </span>
        )}
      </li>
    </ul>
  );
}
