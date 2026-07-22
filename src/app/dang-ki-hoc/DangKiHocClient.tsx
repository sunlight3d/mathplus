"use client";

import Link from "next/link";
import { 
  ChevronRight, 
  BrainCircuit, 
  Target, 
  Users, 
  Award, 
  GraduationCap, 
  Calculator, 
  BookOpen, 
  TrendingUp,
  MapPin
} from "lucide-react";
import { useState } from "react";

export default function DangKiHocClient({ settings }: { settings: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState("direct"); // "direct" or "online"
  const imgUrl = settings["REGISTRATION_IMG"] || "/images/thay_dung_day_hoc.jpg";

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 1. Banner Section */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e5311] to-[#64B428]"></div>
        {/* Placeholder background image, can be replaced by real image */}
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
        <div className="relative z-10 text-center text-white px-4 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide">
            Đăng ký học thật – thi chất
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
            <Link href="/" className="hover:text-[#FFB800] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#FFB800] font-semibold">Đăng ký học thật – thi chất</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12 md:mt-20">
        
        {/* 2. Core Values Section (HỌC TOÁN DỄ HƠN- THI TOÁN TỐT HƠN) */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2e5311] mb-4 uppercase">
              Học Toán dễ hơn - Thi Toán tốt hơn
            </h2>
            <div className="w-24 h-1 bg-[#FFB800] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left side: Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2e5311]/40 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
              <img 
                src={imgUrl} 
                alt="Thầy Dũng hướng dẫn học sinh" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Right side: Values */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Item 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#64B428]/30 transition-all group">
                <div className="w-14 h-14 bg-[#64B428]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#64B428] transition-colors">
                  <BrainCircuit className="w-7 h-7 text-[#64B428] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#2e5311] mb-3">Học chủ động - Hiểu bài sâu - Vận dụng linh hoạt</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Học sinh được hướng dẫn để chủ động giải quyết bài toán theo cách sáng tạo nhất của mình. Hiểu bài sâu và biết cách vận dụng linh hoạt.
                </p>
              </div>

              {/* Item 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#64B428]/30 transition-all group">
                <div className="w-14 h-14 bg-[#64B428]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#64B428] transition-colors">
                  <Target className="w-7 h-7 text-[#64B428] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#2e5311] mb-3">Chiến lược luyện thi bài bản</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Chiến lược chinh phục mục tiêu học và thi của mỗi học sinh được thiết kế chi tiết, đầy đủ và bài bản dựa trên năng lực đầu vào của học sinh.
                </p>
              </div>

              {/* Item 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#64B428]/30 transition-all group">
                <div className="w-14 h-14 bg-[#64B428]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#64B428] transition-colors">
                  <Users className="w-7 h-7 text-[#64B428] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#2e5311] mb-3">Thầy cô hướng dẫn đồng hành</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Thầy cô đồng hành với từng học sinh, là người hướng dẫn, và là người truyền lửa, sẻ chia khó khăn và niềm vui chinh phục môn toán.
                </p>
              </div>

              {/* Item 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#64B428]/30 transition-all group">
                <div className="w-14 h-14 bg-[#64B428]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#64B428] transition-colors">
                  <Award className="w-7 h-7 text-[#64B428] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#2e5311] mb-3">Cam kết đầu ra</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Cam kết chất lượng giảng dạy và kết quả thi bằng văn bản rõ ràng, minh bạch cho phụ huynh và học sinh.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <a 
              href="#contact-form" 
              className="inline-flex items-center justify-center px-10 py-4 bg-[#FFB800] hover:bg-[#e5a600] text-white font-bold rounded-full text-lg shadow-lg shadow-[#FFB800]/30 transition-all transform hover:-translate-y-1"
            >
              Đăng ký học ngay
            </a>
          </div>
        </section>

        {/* 3. Exam Prep Categories */}
        <section className="mb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2e5311] to-[#64B428] rounded-full flex items-center justify-center mb-6 shadow-md group-hover:shadow-[#64B428]/50 transition-shadow">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#2e5311] transition-colors">Luyện thi<br />Toán Đại Học</h3>
            </a>

            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2e5311] to-[#64B428] rounded-full flex items-center justify-center mb-6 shadow-md group-hover:shadow-[#64B428]/50 transition-shadow">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#2e5311] transition-colors">Luyện thi<br />Toán vào 10</h3>
            </a>

            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2e5311] to-[#64B428] rounded-full flex items-center justify-center mb-6 shadow-md group-hover:shadow-[#64B428]/50 transition-shadow">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#2e5311] transition-colors">Luyện thi<br />Toán lên 6</h3>
            </a>

            <a href="#" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2e5311] to-[#64B428] rounded-full flex items-center justify-center mb-6 shadow-md group-hover:shadow-[#64B428]/50 transition-shadow">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#2e5311] transition-colors">Học tốt Toán<br />lớp 1 đến lớp 12</h3>
            </a>

          </div>
        </section>

        {/* 4. Trial Registration Form (ĐĂNG KÝ HỌC THỬ MIỄN PHÍ) */}
        <section id="contact-form" className="mb-24 scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-4 border-[#64B428] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#64B428]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFB800]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2e5311] mb-2 uppercase">ĐĂNG KÝ HỌC THỬ MIỄN PHÍ</h2>
                  <p className="text-gray-500">Vui lòng điền thông tin để được tư vấn lộ trình học phù hợp nhất.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Họ và tên học sinh *" 
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Số điện thoại *" 
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email (không bắt buộc)" 
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="Lớp học hiện tại" 
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Hình thức học</label>
                    <select className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all text-gray-700 appearance-none">
                      <option value="">— Vui lòng chọn —</option>
                      <option value="direct">LỚP HỌC TOÁN TRỰC TIẾP</option>
                      <option value="online">LỚP HỌC TOÁN ONLINE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Chọn cơ sở gần nhất</label>
                    <select className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all text-gray-700 appearance-none">
                      <option value="">— Vui lòng chọn —</option>
                      <option value="MATHPLUS ONLINE">MATHPLUS ONLINE</option>
                      <option value="MATHPLUS XÃ ĐÀN">MATHPLUS XÃ ĐÀN</option>
                      <option value="MATHPLUS HỒ ĐẮC DI">MATHPLUS HỒ ĐẮC DI</option>
                    </select>
                  </div>

                  <div className="pt-4 text-center">
                    <button 
                      type="submit" 
                      className="px-12 py-4 bg-[#2e5311] hover:bg-[#64B428] text-white font-bold rounded-xl text-lg shadow-lg shadow-[#2e5311]/20 transition-all transform hover:-translate-y-1 w-full md:w-auto"
                    >
                      Gửi Đăng Ký
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MathPlus Network Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2e5311] mb-4 uppercase">
              Mạng lưới MathPlus
            </h2>
            <div className="w-24 h-1 bg-[#FFB800] mx-auto rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Custom Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 p-1 rounded-full">
                <button 
                  onClick={() => setActiveTab("direct")}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    activeTab === "direct" 
                      ? "bg-white text-[#2e5311] shadow-sm" 
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Đào tạo Trực tiếp
                </button>
                <button 
                  onClick={() => setActiveTab("online")}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    activeTab === "online" 
                      ? "bg-white text-[#2e5311] shadow-sm" 
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Đào tạo Online
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://toan.vn/template/assets/images/nets-decor-1.png')] bg-contain bg-no-repeat opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
              
              {activeTab === "direct" && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#2e5311] rounded-xl flex items-center justify-center text-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Hệ thống đào tạo Toán trực tiếp</h3>
                  </div>
                  <p className="text-gray-600">
                    Hệ thống các trung tâm giảng dạy môn Toán trực tiếp tại Hà Nội, trang bị cơ sở vật chất hiện đại, tạo môi trường học tập tốt nhất cho học sinh.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-500 font-medium mb-1">Hotline tư vấn</p>
                        <a href="tel:0902236836" className="text-2xl font-bold text-[#64B428] hover:text-[#2e5311] transition-colors">0902-236-836</a>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium mb-1">Điện thoại bàn</p>
                        <a href="tel:02473018910" className="text-xl font-bold text-[#64B428] hover:text-[#2e5311] transition-colors">024-7301-8910</a>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium mb-1">Email liên hệ</p>
                        <a href="mailto:cs@mathplus.edu.vn" className="text-lg font-bold text-gray-800 hover:text-[#FFB800] transition-colors">cs@mathplus.edu.vn</a>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-gray-800 font-bold mb-4">Kết nối Zalo (Offline)</p>
                      <div className="w-40 h-40 border border-gray-200 p-2 rounded-lg bg-white">
                        <img 
                          src="https://toan.vn/wp-content/uploads/2023/02/toanvn-offline.jpg" 
                          alt="Zalo QR Offline" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link 
                      href="/lien-he" 
                      className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#2e5311] text-[#2e5311] hover:bg-[#2e5311] hover:text-white font-bold rounded-xl transition-colors"
                    >
                      Xem Danh Sách Chi Nhánh <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "online" && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#FFB800] rounded-xl flex items-center justify-center text-white">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Hệ thống đào tạo Toán Online</h3>
                  </div>
                  <p className="text-gray-600 mb-8 max-w-2xl">
                    Hệ thống giảng dạy môn Toán tương tác trực tuyến, chất lượng cao, phá vỡ khoảng cách địa lý, dành cho học sinh trên toàn quốc.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-[#FFB800]/5 p-8 rounded-2xl border border-[#FFB800]/20">
                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-500 font-medium mb-1">Hotline tư vấn Online</p>
                        <a href="tel:0868230935" className="text-2xl font-bold text-[#FFB800] hover:text-[#e5a600] transition-colors">0868-230-935</a>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium mb-1">Điện thoại hỗ trợ</p>
                        <a href="tel:02473096568" className="text-xl font-bold text-[#FFB800] hover:text-[#e5a600] transition-colors">024-7309-6568</a>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium mb-1">Email Online</p>
                        <a href="mailto:online@mathplus.edu.vn" className="text-lg font-bold text-gray-800 hover:text-[#FFB800] transition-colors">online@mathplus.edu.vn</a>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-gray-800 font-bold mb-4">Kết nối Zalo (Online)</p>
                      <div className="w-40 h-40 border border-gray-200 p-2 rounded-lg bg-white">
                        <img 
                          src="https://toan.vn/wp-content/uploads/2023/02/toanvn-online.jpg" 
                          alt="Zalo QR Online" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link 
                      href="/lien-he" 
                      className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-white font-bold rounded-xl transition-colors"
                    >
                      Đăng Ký Học Online <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
