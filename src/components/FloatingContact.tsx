"use client";

import { Phone, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingContact() {
  const [showScroll, setShowScroll] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
      <Link
        href="tel:0988888888"
        className="w-14 h-14 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Gọi điện thoại"
      >
        <Phone className="w-6 h-6 fill-current" />
      </Link>

      <Link
        href="https://www.facebook.com/profile.php?id=61578811139148&locale=vi_VN"
        target="_blank"
        className="w-14 h-14 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Nhắn tin Messenger"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.923 1.503 5.513 3.824 7.21.22.161.371.41.411.68l.3 2.052c.071.492.617.755 1.026.495l2.257-1.434a.97.97 0 0 1 .632-.15 10.36 10.36 0 0 0 1.55.117c5.523 0 10-4.145 10-9.26S17.523 2 12 2zm1.093 9.421-2.42-2.585a.86.86 0 0 0-1.258-.04l-3.3 3.518c-.371.396.173.978.636.657l2.42-1.68a.86.86 0 0 1 1.026.042l2.42 2.585a.86.86 0 0 0 1.258.04l3.3-3.518c.371-.396-.173-.978-.636-.657l-2.42 1.68a.86.86 0 0 1-1.026-.042z"/>
        </svg>
      </Link>

      <Link
        href="https://zalo.me/0832645999"
        target="_blank"
        className="w-14 h-14 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
        title="Nhắn tin Zalo"
      >
        <div className="bg-white rounded-xl px-1.5 py-1 relative flex items-center justify-center">
          <span className="text-[#0084FF] text-[11px] font-black leading-none">Zalo</span>
          <div className="absolute -bottom-1 left-2 border-t-[5px] border-t-white border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>
        </div>
      </Link>
      
      <div className="relative mt-2 flex flex-col items-center">
        <div className={`transition-all duration-300 overflow-hidden ${showScroll ? 'h-10 opacity-100' : 'h-0 opacity-0'}`}>
          <button
            onClick={scrollToTop}
            className="w-12 h-10 bg-black text-gray-400 rounded-t-xl hover:text-white flex items-start justify-center pt-1.5 shadow-lg"
            title="Lên đầu trang"
          >
            <ChevronUp className="w-7 h-7" />
          </button>
        </div>
        
        <Link 
          href="https://www.facebook.com/profile.php?id=61578811139148&locale=vi_VN"
          target="_blank"
          className="w-16 h-16 bg-[#0068ff] text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,104,255,0.4)] hover:scale-110 transition-transform z-10 border-2 border-white relative group"
          title="Tư vấn trực tuyến"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
            <path d="M8 12h.01" strokeWidth="3"/>
            <path d="M12 12h.01" strokeWidth="3"/>
            <path d="M16 12h.01" strokeWidth="3"/>
          </svg>
          
          {/* Pulse effect */}
          <span className="absolute inset-0 rounded-full bg-[#0068ff] opacity-40 animate-ping z-[-1]"></span>
        </Link>
      </div>
    </div>
  );
}
