"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    grade: "",
    center: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đăng ký thành công! Hệ thống TOÁN.VN sẽ liên hệ lại với bạn trong vòng 24h.");
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#11244e] py-16 relative">
        <div className="container mx-auto px-4 relative z-10 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Đăng Ký Học & Thi Thử</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">Hoàn thành biểu mẫu dưới đây để nhận tư vấn lộ trình học tập miễn phí và đăng ký làm bài kiểm tra năng lực đầu vào.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Form Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100" data-aos="fade-up">
              <h2 className="text-2xl font-bold text-[#11244e] mb-8 border-b border-gray-100 pb-4">Thông tin đăng ký</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Họ và tên học sinh <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="studentName"
                      required
                      placeholder="Nhập họ và tên học sinh"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Họ và tên phụ huynh</label>
                    <input 
                      type="text" 
                      name="parentName"
                      placeholder="Nhập họ và tên phụ huynh"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Lớp học hiện tại <span className="text-red-500">*</span></label>
                    <select 
                      name="grade"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white appearance-none"
                      onChange={handleChange}
                    >
                      <option value="">Chọn lớp học</option>
                      <option value="1">Lớp 1</option>
                      <option value="2">Lớp 2</option>
                      <option value="3">Lớp 3</option>
                      <option value="4">Lớp 4</option>
                      <option value="5">Lớp 5</option>
                      <option value="6">Lớp 6</option>
                      <option value="7">Lớp 7</option>
                      <option value="8">Lớp 8</option>
                      <option value="9">Lớp 9</option>
                      <option value="10">Lớp 10</option>
                      <option value="11">Lớp 11</option>
                      <option value="12">Lớp 12</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Trung tâm muốn theo học</label>
                  <select 
                    name="center"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white appearance-none"
                    onChange={handleChange}
                  >
                    <option value="">Chọn cơ sở TOÁN.VN gần nhất</option>
                    <option value="online">Học Online tương tác trực tiếp</option>
                    <option value="hn_caugiay">Hà Nội - Cơ sở Cầu Giấy</option>
                    <option value="hn_dongda">Hà Nội - Cơ sở Đống Đa</option>
                    <option value="hn_hadong">Hà Nội - Cơ sở Hà Đông</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mong muốn của học sinh / Ghi chú thêm</label>
                  <textarea 
                    name="notes"
                    rows={4}
                    placeholder="Ví dụ: Con học chậm hình học, mục tiêu thi vào chuyên Sư phạm..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-transform hover:scale-[1.02] shadow-lg shadow-red-600/30">
                  <Send className="w-5 h-5 mr-2" /> Gửi thông tin đăng ký
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-[#11244e] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" data-aos="fade-left" data-aos-delay="200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl"></div>
              
              <h3 className="text-2xl font-bold mb-6">Liên hệ trực tiếp</h3>
              <p className="text-blue-200 mb-8 leading-relaxed">
                Nếu bạn cần hỗ trợ ngay lập tức, vui lòng liên hệ với bộ phận CSKH của TOÁN.VN qua các kênh dưới đây.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Hotline tư vấn</p>
                    <p className="font-bold text-lg">024.7301.8910</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Email CSKH</p>
                    <p className="font-bold text-lg">cskh@toan.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Trụ sở chính</p>
                    <p className="font-semibold">Số 1, Ngõ 1, Đường XYZ, Cầu Giấy, Hà Nội</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 rounded-3xl overflow-hidden shadow-xl" data-aos="fade-up" data-aos-delay="300">
              <Image
                src="https://toan.vn/wp-content/uploads/2026/04/1212.jpg"
                alt="Support"
                width={400}
                height={300}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
