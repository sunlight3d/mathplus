"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer({ logoUrl = "/images/logo.jpg" }: { logoUrl?: string }) {
  return (
    <>
      {/* Call to action */}
      <section className="py-20 bg-gradient-to-r from-[#2e5311] to-[#1b310a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#64B428] blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Bạn đã sẵn sàng bứt phá điểm số?</h2>
          <p className="text-xl text-[#e0eed5] mb-10 max-w-2xl mx-auto">Tham gia cùng 50,000+ học sinh khác đã thành công với phương pháp học chủ động tại MathPlus Academy</p>
          <button className="bg-[#64B428] hover:bg-[#509020] text-white px-10 py-5 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(100,180,40,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(100,180,40,0.7)] flex items-center mx-auto">
            Đăng ký kiểm tra năng lực miễn phí <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      <footer className="bg-[#2e5311] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src={logoUrl}
              alt="MathPlus Academy Logo Footer"
              width={177}
              height={58}
              className="mb-6 rounded-full w-16 h-16 object-cover"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              MathPlus Academy là hệ thống trung tâm bồi dưỡng và luyện thi Toán hàng đầu tại Việt Nam, mang đến phương pháp học tập chủ động, giúp học sinh yêu thích và giỏi môn Toán.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Khóa học</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Toán tiểu học</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Toán THCS</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Toán THPT</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Luyện thi Đại học</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Liên kết</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Đội ngũ giáo viên</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Tuyển dụng</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Thông tin liên hệ</h3>
            <ul className="space-y-3 text-gray-300">
              <li><span className="font-bold text-white">Hotline:</span> 024.7301.8910</li>
              <li><span className="font-bold text-white">Email:</span> cskh@mathplus.vn</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} MathPlus Academy. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  );
}
