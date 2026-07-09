import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, FileText } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#11244e] text-white hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/courses" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <BookOpen size={20} />
            <span>Khóa học</span>
          </Link>
          <Link href="/admin/teachers" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Users size={20} />
            <span>Giáo viên</span>
          </Link>
          <Link href="/admin/posts" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <FileText size={20} />
            <span>Bài viết</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
            <Settings size={20} />
            <span>Cài đặt</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-white/10 transition-colors text-red-400 hover:text-red-300">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Quản lý hệ thống TOAN.VN</h1>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-medium text-gray-700">Admin</span>
          </div>
        </header>
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
