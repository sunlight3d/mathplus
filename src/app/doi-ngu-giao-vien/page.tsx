import Image from "next/image";
import { User, Award, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function TeachersPage() {
  let teachers: any[] = [];
  try {
    teachers = await prisma.teacher.findMany({
      orderBy: { id: 'asc' }
    });
  } catch (error) {
    console.error("Failed to fetch teachers from DB:", error);
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2e5311] to-[#64B428] py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute w-[30rem] h-[30rem] bg-white rounded-full blur-3xl -top-20 -left-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Đội Ngũ Giáo Viên Tài Năng</h1>
          <p className="text-green-50 max-w-3xl mx-auto text-lg leading-relaxed">
            100% giáo viên tại MathPlus Academy được tuyển chọn khắt khe, tốt nghiệp các trường Đại học Sư phạm hàng đầu. Chúng tôi không chỉ dạy kiến thức, mà còn truyền cảm hứng yêu thích môn Toán cho các em.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, idx) => (
            <div key={teacher.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group" data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
              <div className="relative aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
                {teacher.avatar ? (
                  <Image
                    src={teacher.avatar}
                    alt={teacher.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-32 h-32 bg-[#f0f7eb] rounded-full flex items-center justify-center text-[#2e5311]">
                    <User className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2e5311]/90 via-[#2e5311]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    "{teacher.bio}"
                  </p>
                </div>
              </div>
              
              <div className="p-6 relative flex flex-col flex-1">
                <div className="absolute -top-6 right-6 w-12 h-12 bg-[#64B428] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <Award className="w-5 h-5 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-[#2e5311] mb-1">{teacher.name}</h3>
                <p className="text-[#64B428] font-bold mb-4 line-clamp-1">{teacher.role || 'Giáo viên Toán'}</p>
                
                <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 text-[#64B428]" />
                    <span>Kinh nghiệm: <strong className="text-gray-800">{teacher.exp || '5 năm'}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-[#64B428]" />
                    <span>Học sinh: <strong className="text-gray-800">{teacher.students || '1000+'}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {teachers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Chưa có giáo viên nào được hiển thị. Vui lòng chạy dữ liệu mẫu (Seed).
          </div>
        )}
      </div>
    </div>
  );
}
