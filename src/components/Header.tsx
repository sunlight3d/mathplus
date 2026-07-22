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
              alt="Trung tâm giáo dục MathPlus Academy Logo"
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
        <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-md z-50">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-[15px] font-bold border-b border-gray-50 last:border-0 ${
                      isActive ? "text-[#FFB800] bg-orange-50" : "text-[#2e5311] hover:bg-gray-50 hover:text-[#64B428]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
