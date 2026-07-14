"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowRight, Star, Users, BookOpen, Target, Heart, Lightbulb, Share2, CheckCircle, Trophy, X } from "lucide-react";
import { useState } from "react";

export default function GioiThieuClient({ settings, successStories }: { settings: Record<string, string>, successStories: any[] }) {
  const [showLeadershipModal, setShowLeadershipModal] = useState(false);

  const coreValues = [
    {
      title: "TÔN TRỌNG",
      points: [
        "Đánh giá đúng mức vai trò, nỗ lực và sự khác biệt của người khác.",
        "Luôn coi trọng danh dự, phẩm giá và không xâm phạm lợi ích chung."
      ],
      icon: <Users className="w-8 h-8 text-[#64B428]" />
    },
    {
      title: "TRÁCH NHIỆM",
      points: [
        "Chủ động, tự giác và nỗ lực hết sức để hoàn thành tốt mọi nhiệm vụ.",
        "Sẵn sàng nhận lỗi, rút kinh nghiệm và tìm cách khắc phục khi chưa đạt."
      ],
      icon: <CheckCircle className="w-8 h-8 text-[#64B428]" />
    },
    {
      title: "CAM KẾT",
      points: [
        "Giữ đúng mọi thỏa thuận, tuân thủ quy định và làm việc theo kế hoạch.",
        "Thống nhất giữa lời nói và hành động để tạo sự tin cậy."
      ],
      icon: <Target className="w-8 h-8 text-[#64B428]" />
    },
    {
      title: "ĐỔI MỚI",
      points: [
        "Mạnh dạn đưa ra và áp dụng ý tưởng sáng tạo nhằm nâng cao hiệu quả.",
        "Liên tục học hỏi, sẵn sàng thay đổi, từ bỏ cái cũ để tiếp nhận điều tốt hơn."
      ],
      icon: <Lightbulb className="w-8 h-8 text-[#64B428]" />
    },
    {
      title: "CHIA SẺ",
      points: [
        "Luôn lắng nghe, cảm thông và hỗ trợ người khác bằng khả năng của mình.",
        "Sẵn sàng cho đi cơ hội, kiến thức, kinh nghiệm mà không mong báo đáp."
      ],
      icon: <Share2 className="w-8 h-8 text-[#64B428]" />
    },
    {
      title: "BIẾT ƠN",
      points: [
        "Ghi nhận, trân trọng những giá trị nhận được và thể hiện bằng lời nói, hành động.",
        "Cho đi những điều tốt đẹp mình từng nhận, thậm chí nhiều hơn khi có thể."
      ],
      icon: <Heart className="w-8 h-8 text-[#64B428]" />
    }
  ];

  const steps = [
    "Khám phá mục tiêu của bạn",
    "Xác định thế mạnh và năng lực hiện tại của bạn",
    "Xây dựng lộ trình dành riêng phù hợp để bạn chinh phục được mục tiêu",
    "Học tập theo lịch và lộ trình cá nhân hoá",
    "Theo dõi, đánh giá tiến độ chinh phục mục tiêu",
    "Hoàn thành mục tiêu và thiết lập lộ trình tiếp theo với mục tiêu cao hơn"
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <section className="relative h-[40vh] min-h-[400px] w-full bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${settings["ABOUT_BANNER"] || "/images/hero_slider_2.jpg"})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Giới thiệu
          </h1>
          <div className="flex items-center text-white/80 space-x-2">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-white font-medium">Giới thiệu</span>
          </div>
        </div>
      </section>

      {/* Câu chuyện thành lập */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-3/5 space-y-6">
              <h2 className="text-4xl font-extrabold text-[#2e5311]">Câu chuyện thành lập</h2>
              <div className="w-20 h-1.5 bg-[#64B428] rounded-full"></div>
              <div className="text-gray-700 leading-relaxed space-y-4 text-lg text-justify">
                <p>
                  {settings["ABOUT_FOUNDER_STORY_P1"] || "Thầy giáo Nguyễn Văn Dũng sinh năm 1987, là người sáng lập và linh hồn của hệ thống MathPlus. Với bề dày kinh nghiệm giảng dạy môn Toán trải dài từ cấp Tiểu học (lớp 2) cho đến Trung học Phổ thông (lớp 12), thầy đã đồng hành và thắp sáng niềm đam mê toán học cho hàng ngàn thế hệ học sinh. Trải qua nhiều năm gắn bó với bục giảng, từ những lớp học nhỏ đầu tiên cho đến khi xây dựng một hệ thống giáo dục chuyên nghiệp, thầy luôn ấp ủ một khát vọng mãnh liệt: tạo ra một môi trường học tập nơi mỗi học sinh không chỉ giỏi Toán mà còn biết cách tư duy logic trong cuộc sống."}
                </p>
                <p>
                  {settings["ABOUT_FOUNDER_STORY_P2"] || "Những ý tưởng giảng dạy của thầy Dũng luôn đột phá và khác biệt. Thay vì nhồi nhét kiến thức hay luyện thi theo kiểu học vẹt, thầy kiên định với phương pháp dạy học sinh hiểu sâu bản chất vấn đề. Thầy biến những con số khô khan, những định lý phức tạp thành các bài toán thực tế sinh động, giúp học sinh từ lớp 2 đến lớp 12 đều có thể tiếp thu một cách tự nhiên nhất. Chính sự tận tâm và phương pháp độc đáo này đã giúp MathPlus trở thành ngôi nhà chung, nơi ươm mầm những tài năng toán học thực thụ."}
                </p>
                <p>
                  {settings["ABOUT_FOUNDER_STORY_P3"] || "Mỗi ngày mới đến động lực của đội ngũ MathPlus để đạt mục tiêu là tất cả học sinh Việt Nam trở thành người có tư duy tốt, tự tin, độc lập, sáng tạo, hạnh phúc, thành công trong quá trình học tập và trong cuộc sống thông qua quá trình rèn luyện bằng phương pháp tự học môn Toán."}
                </p>
              </div>
            </div>
            <div className="lg:w-2/5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src={settings["ABOUT_FOUNDER_IMG"] || "/images/10.jpg"}
                  alt="Thầy Nguyễn Văn Dũng"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="font-bold text-xl">{settings["ABOUT_FOUNDER_NAME"] || "Thầy NGUYỄN VĂN DŨNG"}</h3>
                  <p className="text-white/80">{settings["ABOUT_FOUNDER_TITLE"] || "Nhà sáng lập MathPlus"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ban lãnh đạo */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-extrabold text-[#2e5311]">Ban lãnh đạo</h2>
              <div className="w-20 h-1.5 bg-[#64B428] rounded-full"></div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Đây là những người tiên phong, truyền lửa và định hướng MathPlus phát triển bền vững, mang lại những giá trị thực cho học sinh, phụ huynh và đồng nghiệp.
              </p>
              <button onClick={() => setShowLeadershipModal(true)} className="bg-[#64B428] hover:bg-[#509020] text-white px-8 py-3 rounded-full font-bold transition-transform hover:-translate-y-1 inline-flex items-center shadow-lg">
                Gặp gỡ Ban lãnh đạo <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={settings["ABOUT_OFFLINE_IMG"] || "/images/offline_math_class.jpg"}
                  alt="Ban lãnh đạo"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#f0f7eb] -skew-y-3 transform origin-top-left -z-10"></div>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2e5311] mb-4">Giá trị cốt lõi</h2>
            <div className="w-24 h-1.5 bg-[#64B428] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#64B428] transform transition-all hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-[#2e5311] mb-4 flex items-center">
                <Star className="w-8 h-8 text-yellow-500 mr-3" /> Tầm nhìn
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Tầm nhìn của MathPlus là trở thành hệ thống giáo dục học sinh phổ thông uy tín, chất lượng cao trên khắp Việt Nam.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-orange-500 transform transition-all hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-[#2e5311] mb-4 flex items-center">
                <Target className="w-8 h-8 text-orange-500 mr-3" /> Sứ mệnh
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                MathPlus mang sứ mệnh đồng hành cùng học sinh trên hành trình khám phá, rèn luyện, phát triển năng lực tư duy, phẩm chất tốt và hình thành lối sống tích cực.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow group">
                <div className="w-16 h-16 bg-[#f0f7eb] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#64B428] group-hover:text-white transition-colors">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-[#2e5311] mb-4">{value.title}</h4>
                <ul className="space-y-3">
                  {value.points.map((point, i) => (
                    <li key={i} className="text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phương pháp giảng dạy */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src={settings["ABOUT_ONLINE_IMG"] || "/images/online_math_class.jpg"}
                  alt="Phương pháp giảng dạy"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover opacity-80"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <div>
                <h2 className="text-4xl font-extrabold mb-4">Phương pháp giảng dạy</h2>
                <div className="w-20 h-1.5 bg-[#64B428] rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                {[
                  "Hướng dẫn học sinh học Toán chủ động",
                  "Tiếp cận cá nhân hoá từng học sinh",
                  "Tư duy hiểu bản chất để vận dụng linh hoạt"
                ].map((method, idx) => (
                  <div key={idx} className="flex items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-5xl font-black text-[#64B428] opacity-50">0{idx + 1}</span>
                    <p className="text-xl font-semibold">{method}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Bước thành công */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2e5311] mb-4">6 bước thành công tại MathPlus</h2>
            <div className="w-24 h-1.5 bg-[#64B428] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 border-b-4 border-b-[#64B428] relative overflow-hidden group hover:-translate-y-2 transition-transform flex items-center min-h-[160px]">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#64B428] rounded-full transition-transform duration-500 group-hover:scale-110 shadow-md">
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl">0{idx + 1}</span>
                </div>
                <div className="relative z-10 pr-10">
                  <p className="text-xl font-bold text-[#1e293b] leading-snug">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thành công của học sinh */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2e5311] mb-4">Thành công của học sinh là hạnh phúc của chúng tôi</h2>
            <div className="w-24 h-1.5 bg-[#64B428] rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={story.imageUrl || "/images/placeholder.jpg"} alt={story.studentName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-[#2e5311] text-lg hover:text-[#64B428] transition-colors line-clamp-2">
                    {story.achievement}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="flex items-center"><Target className="w-4 h-4 mr-1" /> {new Date(story.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <Link href={`/cau-chuyen-thanh-cong/${story.slug}`} className="inline-flex items-center text-[#64B428] font-bold hover:text-[#2e5311] transition-colors mt-2">
                    Chi tiết <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/cau-chuyen-thanh-cong" className="inline-flex items-center justify-center bg-transparent border-2 border-[#64B428] text-[#64B428] hover:bg-[#64B428] hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
              Xem thêm câu chuyện <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Báo chí nói về chúng tôi */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#2e5311] mb-4">Báo chí nói về MathPlus</h2>
            <div className="w-24 h-1.5 bg-[#64B428] rounded-full mx-auto"></div>
          </div>

          <div className="px-4">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="pb-16"
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide key={item} className="h-auto">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col group">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={`/images/1212.jpg`} alt={`Báo chí ${item}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-[#2e5311] text-lg hover:text-[#64B428] transition-colors mb-3 line-clamp-2">
                        Thi THPT 2026: Chiến thuật bứt phá điểm 10 môn Toán
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                        Không thức khuya hay cày đề liên tục, học sinh MathPlus vẫn chinh phục điểm 10 Toán trong kỳ thi Tốt nghiệp THPT 2026.
                      </p>
                      <Link href="#" className="inline-flex items-center text-[#64B428] font-bold hover:text-[#2e5311] transition-colors mt-auto">
                        Đọc tiếp <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Leadership Modal */}
      {showLeadershipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowLeadershipModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 text-gray-500 hover:text-gray-800">
              <X className="w-6 h-6" />
            </button>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-[#2e5311] mb-12 text-center">Ban lãnh đạo MathPlus</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Thành viên 1 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#64B428] shadow-lg">
                    <Image 
                      src={settings["LEADER_1_IMG"] || "/images/placeholder.jpg"} 
                      alt="Thầy Nguyễn Văn Dũng" 
                      width={192} 
                      height={192} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1e293b]">{settings["LEADER_1_NAME"] || "Thầy Nguyễn Văn Dũng"}</h3>
                    <p className="text-[#64B428] font-semibold mt-1">{settings["LEADER_1_ROLE"] || "Người Sáng Lập & Giám Đốc Chuyên Môn"}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {settings["LEADER_1_DESC"] || "Với 10 năm kinh nghiệm giảng dạy chuyên Toán, Thầy Dũng là người truyền cảm hứng và xây dựng triết lý giáo dục cốt lõi tại MathPlus, mang đến những bài học sâu sắc và thực tế."}
                  </p>
                </div>
                
                {/* Thành viên 2 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#64B428] shadow-lg relative bg-gray-100">
                    {settings["LEADER_2_IMG"] ? (
                      <Image 
                        src={settings["LEADER_2_IMG"]} 
                        alt={settings["LEADER_2_NAME"] || "Thầy Nguyễn Ngọc Sơn"} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Users className="w-20 h-20" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1e293b]">{settings["LEADER_2_NAME"] || "Thầy Nguyễn Ngọc Sơn"}</h3>
                    <p className="text-[#64B428] font-semibold mt-1">{settings["LEADER_2_ROLE"] || "Giám Đốc Điều Hành"}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {settings["LEADER_2_DESC"] || "Phụ trách quản lý điều hành trung tâm, đồng thời là chuyên gia giảng dạy các bộ môn Toán và Vật lý, tạo ra môi trường học tập chuyên nghiệp và hiệu quả cho học sinh."}
                  </p>
                </div>

                {/* Thành viên 3 */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#64B428] shadow-lg relative bg-gray-100">
                    {settings["LEADER_3_IMG"] ? (
                      <Image 
                        src={settings["LEADER_3_IMG"]} 
                        alt={settings["LEADER_3_NAME"] || "Thầy Hà Văn Đài"} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Users className="w-20 h-20" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1e293b]">{settings["LEADER_3_NAME"] || "Thầy Hà Văn Đài"}</h3>
                    <p className="text-[#64B428] font-semibold mt-1">{settings["LEADER_3_ROLE"] || "Trưởng phòng Đào tạo"}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {settings["LEADER_3_DESC"] || "Chuyên gia giảng dạy các bộ môn Vật lý, Hóa học và Tin học. Đảm nhiệm việc nghiên cứu và phát triển lộ trình học tập, tài liệu giảng dạy chuẩn hóa cho trung tâm."}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
