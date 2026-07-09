"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Phone, User, ChevronDown, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm relative z-50">
      {/* Header Top */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Toan.vn Logo"
            width={177}
            height={58}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Top Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-gray-700">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Trang chủ
          </Link>
          <Link href="/gioi-thieu" className="hover:text-red-600 transition-colors">
            Giới thiệu
          </Link>
          <Link href="/blog" className="hover:text-red-600 transition-colors">
            Blog
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm khoá học"
              className="w-full bg-gray-100 rounded-full py-2 px-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/dang-nhap"
            className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-red-600"
          >
            <User className="w-5 h-5" />
            <span>Đăng nhập</span>
          </Link>
          <a
            href="tel:02473018910"
            className="flex items-center space-x-2 text-sm font-semibold text-red-600"
          >
            <Phone className="w-5 h-5" />
            <span>024.7301.8910</span>
          </a>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-sm font-semibold text-gray-700">VN</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Header Bottom (Main Nav) */}
      <div className="hidden lg:block border-t border-gray-100">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-8 py-4">
            <div className="group relative">
              <Link
                href="/khoa-hoc"
                className="text-[15px] font-bold text-blue-900 hover:text-red-600 flex items-center"
              >
                Khóa học Toán <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="group relative">
              <Link
                href="/luyen-thi"
                className="text-[15px] font-bold text-blue-900 hover:text-red-600 flex items-center"
              >
                Luyện thi Toán <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="group relative">
              <Link
                href="/ket-qua-hoc-tap"
                className="text-[15px] font-bold text-blue-900 hover:text-red-600 flex items-center"
              >
                Kết quả học tập <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <Link
              href="/doi-ngu-giao-vien"
              className="text-[15px] font-bold text-blue-900 hover:text-red-600"
            >
              Đội ngũ giáo viên
            </Link>
            <Link
              href="/dang-ki-hoc"
              className="text-[15px] font-bold text-blue-900 hover:text-red-600"
            >
              Đăng ký học – thi
            </Link>
            <div className="group relative">
              <Link
                href="/lien-he"
                className="text-[15px] font-bold text-blue-900 hover:text-red-600 flex items-center"
              >
                Liên hệ <ChevronDown className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <Link
              href="/cau-chuyen-thanh-cong"
              className="text-[15px] font-bold text-blue-900 hover:text-red-600"
            >
              Câu chuyện thành công
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
