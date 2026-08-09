"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, BookOpen, Search } from "lucide-react";

type Document = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  fileUrl: string;
  color: string;
};

// Hàm bỏ dấu tiếng Việt để tìm kiếm
function removeAccents(str: string) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export default function DocumentList({ documents }: { documents: Document[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = documents.filter((doc) => {
    const term = removeAccents(searchTerm.toLowerCase());
    const title = removeAccents(doc.title.toLowerCase());
    const description = removeAccents(doc.description?.toLowerCase() || "");
    
    return title.includes(term) || description.includes(term);
  });

  return (
    <>
      <div className="max-w-xl mx-auto mb-10 relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all text-base"
            placeholder="Tìm kiếm tài liệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            Tìm thấy {filteredDocuments.length} tài liệu
          </p>
        )}
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Không tìm thấy tài liệu</h3>
          <p className="text-gray-500">
            Thử tìm kiếm với từ khóa khác xem sao.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocuments.map((doc) => (
            <Link 
              key={doc.id} 
              href={`/tai-lieu/${doc.slug}`}
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
      )}
    </>
  );
}
