"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "on";

  if (username === "admin" && password === "mathplusvolamcaithe") {
    const cookieOptions: any = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    };
    
    if (rememberMe) {
      cookieOptions.maxAge = 60 * 60 * 24 * 30; // 30 days
    }
    
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "mathplus-auth-valid", cookieOptions);
    return { success: true };
  }
  
  return { success: false, message: "Tên đăng nhập hoặc mật khẩu không chính xác!" };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}
