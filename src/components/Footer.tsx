"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2e5311] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="/images/logo.jpg"
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
  );
}
