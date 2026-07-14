"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

export default function CourseList({ courses }: { courses: any[] }) {
  const categories = ["Tất cả", "Toán tiểu học", "Toán THCS", "Toán PTTH", "Luyện thi đại học"];
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredCourses = activeCategory === "Tất cả" 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeCategory === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredCourses.map((course, idx) => (
          <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-green-50 group flex flex-col" data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={course.image || '/images/offline_math_class.jpg'}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-500">
                {course.category}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-700">5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-green-600" />
                  <span>100+</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Liên hệ</span>
                </div>
              </div>

              <Link href={`/khoa-hoc/${course.slug}`}>
                <h3 className="text-xl font-bold text-green-800 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {course.title}
                </h3>
              </Link>
              <p className="text-gray-600 line-clamp-3 mb-6 text-sm">
                {course.description}
              </p>

              <div className="mt-auto pt-4 border-t border-green-50 flex items-center justify-between">
                <span className="text-orange-500 font-bold">
                  {course.price 
                    ? (isNaN(Number(course.price)) ? course.price : `${Number(course.price).toLocaleString('vi-VN')}đ`) 
                    : 'Liên hệ để tư vấn'}
                </span>
                <Link href={`/khoa-hoc/${course.slug}`} className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors text-green-800">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Chưa có khóa học nào trong danh mục này.
        </div>
      )}
    </>
  );
}
