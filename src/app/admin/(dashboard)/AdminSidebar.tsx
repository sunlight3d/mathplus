"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, FileText } from "lucide-react";
import { logoutAction } from "@/actions/auth";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Khóa học", href: "/admin/courses", icon: BookOpen },
    { name: "Giáo viên", href: "/admin/teachers", icon: Users },
    { name: "Bài viết", href: "/admin/posts", icon: FileText },
    { name: "Cài đặt", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-green-800 text-white hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Check if exactly matched (for dashboard) or starts with (for nested routes like /admin/courses/new)
          const isActive = item.href === "/admin" 
            ? pathname === "/admin" 
            : pathname?.startsWith(item.href);

          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <form action={logoutAction}>
          <button type="submit" className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-white/10 transition-colors text-red-400 hover:text-red-300">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
