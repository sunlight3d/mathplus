"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="MathPlus Academy Logo"
            width={177}
            height={58}
            className="h-12 w-12 object-cover rounded-full"
          />
        </Link>

        {/* Main Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-8">
          <div className="group relative">
            <Link
              href="/khoa-hoc"
              className="text-[15px] font-bold text-[#2e5311] hover:text-[#64B428] flex items-center"
            >
              Khóa học Toán <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="group relative">
            <Link
              href="/luyen-thi"
              className="text-[15px] font-bold text-[#2e5311] hover:text-[#64B428] flex items-center"
            >
              Luyện thi Toán <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="group relative">
            <Link
              href="/ket-qua-hoc-tap"
              className="text-[15px] font-bold text-[#2e5311] hover:text-[#64B428] flex items-center"
            >
              Kết quả học tập <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <Link
            href="/doi-ngu-giao-vien"
            className="text-[15px] font-bold text-[#2e5311] hover:text-[#64B428]"
          >
            Đội ngũ giáo viên
          </Link>
          <Link
            href="/dang-ki-hoc"
            className="text-[15px] font-bold text-[#2e5311] hover:text-[#64B428]"
          >
            Đăng ký học – thi
          </Link>
          <div className="group relative">
            <Link
              href="/lien-he"
              className="text-[15px] font-bold text-[#2e5311] hover:text-[#64B428] flex items-center"
            >
              Liên hệ <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <Link
            href="/cau-chuyen-thanh-cong"
            className="text-[15px] font-bold text-[#2e5311] hover:text-[#64B428]"
          >
            Câu chuyện thành công
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
