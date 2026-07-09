"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Users, BookOpen, Star, PlayCircle, FileText, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
  const params = useParams();
  
  return (
    <div className="w-full bg-white pb-20">
      {/* Hero Banner for specific course */}
      <div className="relative bg-[#11244e] text-white pt-20 pb-28">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-3/5" data-aos="fade-right">
              <div className="inline-block px-3 py-1 bg-red-600 rounded-full text-sm font-bold tracking-wider mb-6">
                Luyện thi Đại học
              </div>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">Toán lớp 12 - Luyện thi Đại học mục tiêu 9+</h1>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed">
                Khóa học trọng điểm giúp học sinh lớp 12 hệ thống toàn bộ kiến thức, rèn luyện kỹ năng giải đề, chiến thuật làm bài thi trắc nghiệm để bứt phá điểm số trong kỳ thi THPT Quốc gia.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                  <span className="font-bold">4.9/5</span>
                  <span className="text-blue-200 text-sm">(124 đánh giá)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-blue-300 w-5 h-5" />
                  <span>1,205 học sinh đã học</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-300 w-5 h-5" />
                  <span>Thời lượng: 12 tháng</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/dang-ki-hoc" className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 shadow-lg shadow-red-600/30">
                  Đăng ký khóa học ngay
                </Link>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold transition-colors">
                  Tư vấn lộ trình
                </button>
              </div>
            </div>

            <div className="lg:w-2/5" data-aos="fade-left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] group cursor-pointer">
                <Image
                  src="https://toan.vn/wp-content/uploads/2026/04/1212.jpg"
                  alt="Lớp học Toán 12"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-white/80 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-[#11244e] mb-6">Mục tiêu khóa học</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">Nắm vững 100% kiến thức nền tảng Toán lớp 12 theo chuẩn SGK.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">Thành thạo phương pháp giải nhanh trắc nghiệm bằng máy tính Casio.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">Chinh phục các dạng bài Vận dụng - Vận dụng cao (câu 8+, 9+).</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-700">Rèn luyện phản xạ phòng thi qua hệ thống đề thi thử bám sát bộ GD&ĐT.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#11244e] mb-6">Nội dung chương trình</h2>
            <div className="space-y-4 mb-12">
              {[
                { title: "Chuyên đề 1: Hàm số và Đồ thị (Khảo sát, Cực trị, Tiệm cận...)", lessons: 12 },
                { title: "Chuyên đề 2: Khối đa diện và Thể tích", lessons: 8 },
                { title: "Chuyên đề 3: Mũ và Logarit", lessons: 10 },
                { title: "Chuyên đề 4: Khối tròn xoay (Nón, Trụ, Cầu)", lessons: 6 },
                { title: "Chuyên đề 5: Nguyên hàm, Tích phân và Ứng dụng", lessons: 14 },
              ].map((module, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-red-400 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#11244e] font-bold">
                      {idx + 1}
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">{module.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>{module.lessons} bài giảng</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-[#11244e] mb-6 border-b border-gray-200 pb-4">Đặc quyền của học viên</h3>
              
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Tài liệu học tập độc quyền (Sách, bộ đề)</span>
                </li>
                <li className="flex gap-3">
                  <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Lớp học sĩ số nhỏ, tương tác cao</span>
                </li>
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Giáo viên hỗ trợ giải đáp ngoài giờ</span>
                </li>
              </ul>

              <div className="bg-white p-4 rounded-xl border border-red-100 mb-6 text-center">
                <p className="text-sm text-gray-500 mb-1">Học phí trọn khóa</p>
                <p className="text-2xl font-black text-red-600">Liên hệ trực tiếp</p>
              </div>

              <Link href="/dang-ki-hoc" className="w-full bg-[#11244e] hover:bg-blue-900 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-colors">
                Đăng ký ngay <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
