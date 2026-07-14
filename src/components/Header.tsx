"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header({ logoUrl = "/images/logo.jpg" }: { logoUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Giới thiệu", path: "/gioi-thieu" },
    { name: "Khóa học Toán", path: "/khoa-hoc" },
    { name: "Câu chuyện thành công", path: "/cau-chuyen-thanh-cong" },
    { name: "Đội ngũ giáo viên", path: "/doi-ngu-giao-vien" },
    { name: "Đăng ký học – thi", path: "/dang-ki-hoc" },
    { name: "Blog", path: "/blog" },
    { name: "Liên hệ", path: "/lien-he" },
  ];

  return (
    <header className="w-full bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative w-48 h-12">
            <Image
              src={logoUrl}
              alt="MathPlus Academy Logo"
              width={177}
              height={58}
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
        </Link>

        {/* Main Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[15px] font-bold transition-colors ${
                  isActive ? "text-[#FFB800]" : "text-[#2e5311] hover:text-[#64B428]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
