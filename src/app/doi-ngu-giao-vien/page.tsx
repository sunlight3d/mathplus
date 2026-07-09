"use client";

import Image from "next/image";
import { User, Award, BookOpen } from "lucide-react";

export default function TeachersPage() {
  const teachers = [
    {
      id: 1,
      name: "Thầy Đặng Huy Hoàng",
      role: "Giám đốc Học thuật",
      bio: "Hơn 15 năm kinh nghiệm giảng dạy môn Toán. Chuyên gia luyện thi Đại học với hàng nghìn học sinh đạt điểm 9+.",
      image: "https://toan.vn/wp-content/uploads/2026/07/Dang-Huy-Hoang-Toanvn.jpg",
      stats: { students: "5000+", exp: "15 năm" }
    },
    {
      id: 2,
      name: "Cô Trần Thị Mai",
      role: "Tổ trưởng chuyên môn THCS",
      bio: "Chuyên gia bồi dưỡng học sinh giỏi Toán cấp THCS, luyện thi vào lớp 10 chuyên với tỉ lệ đỗ trên 90%.",
      image: "", // Use generic
      stats: { students: "3000+", exp: "10 năm" }
    },
    {
      id: 3,
      name: "Thầy Trương Quốc Đạt",
      role: "Giáo viên Toán THPT",
      bio: "Phương pháp giảng dạy trực quan, dễ hiểu. Truyền cảm hứng học Toán cho học sinh thông qua các bài toán thực tế.",
      image: "https://toan.vn/wp-content/uploads/2026/07/Truong-quoc-dat-toanvn.jpg",
      stats: { students: "2500+", exp: "8 năm" }
    },
    {
      id: 4,
      name: "Thầy Phạm Viết Tiến",
      role: "Giáo viên luyện thi Toán 9",
      bio: "Nhiệt huyết, tận tâm, luôn đồng hành cùng học sinh trong giai đoạn chuyển cấp quan trọng.",
      image: "https://toan.vn/wp-content/uploads/2026/07/pham-viet-tien-toanvn.jpg",
      stats: { students: "2000+", exp: "7 năm" }
    },
    {
      id: 5,
      name: "Cô Nguyễn Lan Anh",
      role: "Giáo viên Toán Tiểu học",
      bio: "Yêu trẻ, am hiểu tâm lý học sinh tiểu học. Giúp các em xây dựng gốc rễ tư duy Toán học vững chắc ngay từ sớm.",
      image: "", // Use generic
      stats: { students: "1500+", exp: "6 năm" }
    },
    {
      id: 6,
      name: "Thầy Lê Văn Hùng",
      role: "Giáo viên chuyên lớp 12",
      bio: "Chiến thuật giải đề trắc nghiệm cực nhanh và chính xác. Đặc trị các dạng bài Toán Vận dụng cao.",
      image: "", // Use generic
      stats: { students: "4000+", exp: "12 năm" }
    }
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#11244e] to-blue-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute w-[30rem] h-[30rem] bg-white rounded-full blur-3xl -top-20 -left-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Đội Ngũ Giáo Viên Tài Năng</h1>
          <p className="text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
            100% giáo viên tại MathPlus Academy được tuyển chọn khắt khe, tốt nghiệp các trường Đại học Sư phạm hàng đầu. Chúng tôi không chỉ dạy kiến thức, mà còn truyền cảm hứng yêu thích môn Toán cho các em.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, idx) => (
            <div key={teacher.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="relative aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
                {teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-[#11244e]">
                    <User className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11244e]/90 via-[#11244e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    "{teacher.bio}"
                  </p>
                </div>
              </div>
              
              <div className="p-6 relative">
                <div className="absolute -top-6 right-6 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <Award className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#11244e] mb-1">{teacher.name}</h3>
                <p className="text-red-600 font-medium mb-4">{teacher.role}</p>
                
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>Kinh nghiệm: <strong className="text-gray-800">{teacher.stats.exp}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-blue-500" />
                    <span>Học sinh: <strong className="text-gray-800">{teacher.stats.students}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
