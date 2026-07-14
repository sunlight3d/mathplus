"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ArrowRight, Star, Users, BookOpen, Trophy, PlayCircle } from "lucide-react";

export default function HomeClient({ settings }: { settings: Record<string, string> }) {
  const heroSlides = [
    {
      title: "Tự hào TVNer",
      heading: "Tỏa sáng với điểm 10 Toán tuyệt đối",
      bgImage: settings["HOME_BANNER_1"] || "/images/hero_slider_1.jpg",
    },
    {
      title: "Vinh danh TVNer",
      heading: "Xuất sắc đạt 10 điểm Toán tốt nghiệp THPT",
      bgImage: settings["HOME_BANNER_2"] || "/images/hero_slider_2.jpg",
    },
    {
      title: "14+ năm MathPlus Academy",
      heading: "Cùng 50.000 + học sinh giỏi Toán",
      bgImage: settings["HOME_BANNER_3"] || "/images/hero_slider_3.jpg",
    },
  ];

  const numbers = [
    { icon: <Users className="w-8 h-8 text-[#64B428]" />, count: settings["STATS_TEACHERS"] || "100+", text: "Giáo viên tận tâm, kiên nhẫn kèm cặp từng học sinh" },
    { icon: <Star className="w-8 h-8 text-yellow-500" />, count: settings["STATS_BRANCHES"] || "18+", text: "Cơ sở học tập trực tiếp (offline) tiện nghi, hiện đại" },
    { icon: <BookOpen className="w-8 h-8 text-green-500" />, count: settings["STATS_STUDENTS"] || "42000+", text: "Học sinh đã lấy lại gốc Toán và tự tin vươn lên" },
    { icon: <Trophy className="w-8 h-8 text-[#64B428]" />, count: settings["STATS_PROGRESS"] || "95%+", text: "Học sinh tiến bộ vượt bậc chỉ sau 1 lộ trình học" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-gray-900 overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
                <div data-aos="fade-up" data-aos-delay="200">
                  <span className="inline-block py-1 px-3 rounded-full bg-[#64B428] text-white text-sm font-bold tracking-wider mb-4 uppercase">
                    {slide.title}
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8 max-w-4xl drop-shadow-lg">
                    {slide.heading}
                  </h1>
                  <button className="bg-[#64B428] hover:bg-[#509020] text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center shadow-xl">
                    Đăng ký ngay <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Numbers Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative" data-aos="fade-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={settings["HOME_ABOUT_IMG"] || "/images/10.jpg"}
                  alt="Tư vấn học tập"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover aspect-[4/5] object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <PlayCircle className="w-20 h-20 text-white/80 hover:text-white cursor-pointer hover:scale-110 transition-transform drop-shadow-xl" />
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-full shadow-2xl hidden md:flex flex-col items-center justify-center w-48 h-48 border-4 border-[#64B428] z-10" data-aos="zoom-in" data-aos-delay="400">
                <span className="text-5xl font-black text-[#64B428]">{settings["STATS_YEARS"] || "8+"}</span>
                <span className="text-gray-600 font-bold mt-2 text-center">năm hoạt động</span>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="mb-12">
                <h2 className="text-4xl font-extrabold text-[#2e5311] mb-4" data-aos="fade-up">Những con số ấn tượng</h2>
                <div className="w-24 h-1.5 bg-[#64B428] rounded-full" data-aos="fade-right" data-aos-delay="200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {numbers.map((num, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex items-start gap-4" data-aos="fade-up" data-aos-delay={200 * (idx + 1)}>
                    <div className="p-3 bg-[#f0f7eb] rounded-xl">
                      {num.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-[#2e5311] mb-2">{num.count}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed">{num.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methods Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2e5311] mb-4" data-aos="fade-up">Hình thức giảng dạy linh động</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Mời bạn tìm hiểu ngay 2 cách thức giảng dạy Toán tốt nhất hiện nay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Offline */}
            <div className="group cursor-pointer" data-aos="flip-right">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] mb-6">
                <Image
                  src={settings["HOME_OFFLINE_IMG"] || "/images/offline_math_class.jpg"}
                  alt="Lớp học trực tiếp"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2e5311]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h3 className="text-3xl font-bold text-white mb-2 flex items-center">
                    Lớp học Toán trực tiếp <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </h3>
                </div>
              </div>
            </div>

            {/* Online */}
            <div className="group cursor-pointer" data-aos="flip-right" data-aos-delay="200">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] mb-6">
                <Image
                  src={settings["HOME_ONLINE_IMG"] || "/images/online_math_class.jpg"}
                  alt="Lớp học Online"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2e5311]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h3 className="text-3xl font-bold text-white mb-2 flex items-center">
                    Lớp học Toán Online <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

    </div>
  );
}
