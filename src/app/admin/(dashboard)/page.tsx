import { BookOpen, Users, FileText, ClipboardList } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [courseCount, teacherCount, postCount, registrationCount, recentRegistrations] = await Promise.all([
    prisma.course.count(),
    prisma.teacher.count(),
    prisma.post.count(),
    prisma.registration.count(),
    prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    })
  ]);

  const stats = [
    { label: "Tổng Khóa Học", value: courseCount, icon: <BookOpen size={24} className="text-green-600" /> },
    { label: "Giáo Viên", value: teacherCount, icon: <Users size={24} className="text-green-500" /> },
    { label: "Bài Viết", value: postCount, icon: <FileText size={24} className="text-purple-500" /> },
    { label: "Đăng Ký Mới", value: registrationCount, icon: <ClipboardList size={24} className="text-orange-500" /> },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONTACTED":
        return "bg-blue-100 text-blue-800";
      case "ENROLLED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ xử lý";
      case "CONTACTED":
        return "Đã liên hệ";
      case "ENROLLED":
        return "Đã đăng ký";
      default:
        return status;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Đăng ký mới nhất</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Học sinh</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Số điện thoại</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Trạng thái</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Ngày đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.length > 0 ? recentRegistrations.map((reg) => (
                <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">#{reg.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{reg.studentName}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{reg.phone}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(reg.status)}`}>
                      {getStatusText(reg.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(reg.createdAt).toLocaleString("vi-VN")}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-4 px-4 text-center text-gray-500">Chưa có đăng ký nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
