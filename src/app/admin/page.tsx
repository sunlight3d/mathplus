import { BookOpen, Users, FileText, ClipboardList } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Tổng Khóa Học", value: 24, icon: <BookOpen size={24} className="text-blue-500" /> },
    { label: "Giáo Viên", value: 112, icon: <Users size={24} className="text-green-500" /> },
    { label: "Bài Viết", value: 89, icon: <FileText size={24} className="text-purple-500" /> },
    { label: "Đăng Ký Mới", value: 15, icon: <ClipboardList size={24} className="text-orange-500" /> },
  ];

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
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800">#1024</td>
                <td className="py-3 px-4 text-sm text-gray-800 font-medium">Nguyễn Văn A</td>
                <td className="py-3 px-4 text-sm text-gray-800">0987654321</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">Chờ xử lý</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">2 phút trước</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800">#1023</td>
                <td className="py-3 px-4 text-sm text-gray-800 font-medium">Trần Thị B</td>
                <td className="py-3 px-4 text-sm text-gray-800">0912345678</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Đã liên hệ</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">1 giờ trước</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
