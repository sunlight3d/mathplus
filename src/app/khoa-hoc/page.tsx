"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Star, Clock, Users, ArrowRight } from "lucide-react";

export default function CoursesPage() {
  const categories = ["Tất cả", "Toán Tiểu Học", "Toán THCS", "Toán THPT", "Luyện thi Đại học", "Toán Quốc Tế"];
  
  const courses = [
    {
      id: 1,
      title: "Toán lớp 12 - Luyện thi Đại học mục tiêu 9+",
      slug: "toan-lop-12-luyen-thi-dai-hoc",
      category: "Luyện thi Đại học",
      image: "/images/offline_math_class.jpg",
      students: 1205,
      rating: 4.9,
      duration: "12 tháng",
      desc: "Khóa học trọng điểm giúp học sinh lớp 12 hệ thống toàn bộ kiến thức, rèn luyện kỹ năng giải đề và bứt phá điểm số trong kỳ thi THPT Quốc gia."
    },
    {
      id: 2,
      title: "Toán lớp 9 - Ôn thi vào 10 chuyên",
      slug: "toan-lop-9-on-thi-vao-10",
      category: "Toán THCS",
      image: "/images/online_math_class.jpg",
      students: 850,
      rating: 4.8,
      duration: "9 tháng",
      desc: "Lộ trình ôn tập chuyên sâu, bám sát cấu trúc đề thi vào lớp 10 của các trường THPT chuyên hàng đầu."
    },
    {
      id: 3,
      title: "Khóa học Toán STEM cấp 1",
      slug: "khoa-hoc-toan-stem-cap-1",
      category: "Toán Tiểu Học",
      image: "https://toan.vn/wp-content/uploads/2025/06/z6654844451158_4c348eebf8267220e5db3fe8fec2afb2.jpg",
      students: 420,
      rating: 5.0,
      duration: "6 tháng",
      desc: "Đánh thức tư duy toán học thông qua các mô hình thực tế, giúp trẻ tiểu học yêu thích và hiểu sâu bản chất toán học."
    },
    {
      id: 4,
      title: "Toán SAT - Nền tảng du học",
      slug: "toan-sat",
      category: "Toán Quốc Tế",
      image: "https://toan.vn/wp-content/uploads/2025/01/nhung-kien-thuc-dai-so-lop-7-hoc-sinh-can-nam-vung-scaled.jpg",
      students: 310,
      rating: 4.7,
      duration: "3 tháng",
      desc: "Rèn luyện kỹ năng giải bài thi SAT Math nhanh chóng, chính xác, tối ưu điểm số ứng tuyển học bổng."
    }
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#11244e] py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 bg-red-400 rounded-full blur-3xl bottom-0 right-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Khóa Học Toán Chất Lượng Cao</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">Hệ thống khóa học được thiết kế chuyên biệt, bám sát năng lực của từng học sinh, giúp các em học hiểu, làm hay và bứt phá điểm số.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${idx === 0 ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-red-600">
                  {course.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-700">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <Link href={`/khoa-hoc/${course.slug}`}>
                  <h3 className="text-xl font-bold text-[#11244e] mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-3 mb-6 text-sm">
                  {course.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-red-600 font-bold">Liên hệ để tư vấn</span>
                  <Link href={`/khoa-hoc/${course.slug}`} className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors text-[#11244e]">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
