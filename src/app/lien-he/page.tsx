"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight, Search, Map } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  const centers = [
    {
      id: 1,
      name: "MATHPLUS CẦU GIẤY",
      address: "Ngõ 34 phố Nghĩa Đô, Phường Nghĩa Đô, Cầu Giấy, Hà Nội",
      hotline: "0982.921.441",
      phone: "0902.236.836",
      zalo: "0353.556.860",
      mapLink: "https://www.google.com/maps",
      qrCode: "https://toan.vn/wp-content/uploads/2023/03/zalo-cau-giay.jpg"
    },
    {
      id: 2,
      name: "MATHPLUS ĐÔNG ANH",
      address: "Số 123 Đường Cao Lỗ, Uy Nỗ, Đông Anh, Hà Nội",
      hotline: "0987.654.321",
      phone: "024.7301.8910",
      zalo: "0912.345.678",
      mapLink: "https://www.google.com/maps",
      qrCode: "https://toan.vn/wp-content/uploads/2023/02/DC.png"
    },
    {
      id: 3,
      name: "MATHPLUS THANH XUÂN",
      address: "Số 45 Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội",
      hotline: "0965.123.456",
      phone: "024.7301.8911",
      zalo: "0965.123.456",
      mapLink: "https://www.google.com/maps",
      qrCode: "https://toan.vn/wp-content/uploads/2023/02/DC.png"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Banner Section */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Placeholder background, you can replace this with an actual image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e5311] to-[#64B428]"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Danh sách trung tâm</h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base opacity-90">
            <Link href="/" className="hover:text-[#FFB800] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Liên hệ</span>
            <ChevronRight className="w-4 h-4" />
            <span>Danh sách trung tâm</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12 md:mt-20">
        {/* Contact Info & Form Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 bg-white p-8 md:p-12 rounded-2xl shadow-sm mb-20 border border-gray-100">
          {/* Left Column: Info */}
          <div>
            <h2 className="text-3xl font-bold text-[#2e5311] mb-8 relative inline-block">
              Hệ thống đào tạo Toán trực tiếp
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#FFB800] -mb-2 rounded-full"></span>
            </h2>

            <div className="grid grid-cols-2 gap-8 mt-10">
              <div>
                <p className="text-gray-500 mb-2 font-medium">Hotline</p>
                <a href="tel:0902236836" className="text-xl font-bold text-[#2e5311] hover:text-[#64B428] transition-colors">
                  0902-236-836
                </a>
              </div>
              
              <div>
                <p className="text-gray-500 mb-2 font-medium">Điện thoại</p>
                <a href="tel:02473018910" className="text-xl font-bold text-[#2e5311] hover:text-[#64B428] transition-colors">
                  024-7301-8910
                </a>
              </div>

              <div>
                <p className="text-gray-500 mb-2 font-medium">Email</p>
                <a href="mailto:cs@mathplus.edu.vn" className="text-lg font-bold text-[#2e5311] hover:text-[#64B428] transition-colors break-all">
                  cs@mathplus.edu.vn
                </a>
              </div>
              
              <div>
                <p className="text-gray-500 mb-2 font-medium">Kết nối Zalo</p>
                <div className="w-32 h-32 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden p-1">
                  <img 
                    src="https://toan.vn/wp-content/uploads/2023/02/toanvn-offline.jpg" 
                    alt="Zalo QR Code" 
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
            <h2 className="text-2xl font-bold text-[#2e5311] mb-6 text-center">Gửi liên hệ</h2>
            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Họ tên" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all bg-white"
              />
              <input 
                type="tel" 
                placeholder="Số điện thoại" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all bg-white"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all bg-white"
              />
              <select defaultValue="" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all bg-white text-gray-600 appearance-none">
                <option value="" disabled>Chọn nhu cầu hỗ trợ...</option>
                <option value="Học phí">Học phí</option>
                <option value="Khoá học">Khoá học</option>
                <option value="Chương trình học">Chương trình học</option>
                <option value="Khác">Khác</option>
              </select>
              <textarea 
                rows={4} 
                placeholder="Nội dung chi tiết" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#64B428]/50 focus:border-[#64B428] transition-all bg-white resize-none"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-[#2e5311] hover:bg-[#64B428] text-white font-semibold py-3 rounded-lg transition-colors shadow-md shadow-[#2e5311]/20"
              >
                Gửi đi
              </button>
            </form>
          </div>
        </div>

        {/* Center Search Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2e5311] mb-4">Tìm kiếm trung tâm</h2>
            <div className="w-24 h-1 bg-[#FFB800] mx-auto rounded-full"></div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto mb-12">
            <select 
              className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#64B428] transition-all text-gray-700"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="">Tỉnh/Thành phố</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Vĩnh Phúc">Vĩnh Phúc</option>
            </select>
            
            <select 
              className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#64B428] transition-all text-gray-700"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">Quận/Huyện</option>
              <option value="Cầu Giấy">Cầu Giấy</option>
              <option value="Đông Anh">Đông Anh</option>
              <option value="Thanh Xuân">Thanh Xuân</option>
            </select>
            
            <select className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#64B428] transition-all text-gray-700">
              <option value="">Trung tâm</option>
              <option value="MATHPLUS CẦU GIẤY">MATHPLUS CẦU GIẤY</option>
              <option value="MATHPLUS ĐÔNG ANH">MATHPLUS ĐÔNG ANH</option>
            </select>

            <button className="w-full md:w-auto px-8 py-3 bg-[#FFB800] hover:bg-[#e5a600] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Search className="w-5 h-5" />
              <span>Tìm kiếm</span>
            </button>
          </div>

          {/* Center List */}
          <div className="grid lg:grid-cols-2 gap-6">
            {centers.map((center) => (
              <div key={center.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
                {/* Content */}
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#2e5311] mb-4">{center.name}</h3>
                    <p className="text-gray-600 mb-4 flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                      <span><strong className="text-gray-800">Địa chỉ: </strong> {center.address}</span>
                    </p>
                    <div className="space-y-2 mb-4 pl-7">
                      <p className="text-gray-600">
                        <strong className="text-gray-800">Hotline: </strong>
                        <a href={`tel:${center.hotline.replace(/\./g, "")}`} className="text-[#64B428] hover:underline font-medium">{center.hotline}</a>
                      </p>
                      <p className="text-gray-600">
                        <strong className="text-gray-800">Điện thoại: </strong>
                        <a href={`tel:${center.phone.replace(/\./g, "")}`} className="text-[#64B428] hover:underline font-medium">{center.phone}</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                    <a 
                      href={center.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#2e5311] hover:text-[#FFB800] transition-colors text-sm font-semibold uppercase tracking-wide"
                    >
                      <Map className="w-5 h-5" />
                      Xem bản đồ
                    </a>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-gray-50 md:w-1/3 p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
                  <div className="w-32 h-32 bg-white rounded-lg p-1 border border-gray-200 mb-3 shadow-sm">
                    <img 
                      src={center.qrCode} 
                      alt={`Zalo QR ${center.name}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    <strong className="block text-gray-800 mb-1">Zalo:</strong>
                    <a href={`tel:${center.zalo.replace(/\./g, "")}`} className="text-[#64B428] font-medium hover:underline">
                      {center.zalo}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
