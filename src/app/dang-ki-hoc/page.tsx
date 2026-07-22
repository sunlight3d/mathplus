import DangKiHocClient from "./DangKiHocClient";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Đăng Ký Học - MathPlus",
  description: "Đăng ký học Toán tại MathPlus Academy - Hệ thống đào tạo Toán chất lượng cao.",
};

export default async function DangKiHocPage() {
  const dbSettings = await prisma.siteSetting.findMany({
    where: { key: { in: ["REGISTRATION_IMG"] } }
  });
  
  const settingsMap = dbSettings.reduce((acc: Record<string, string>, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return <DangKiHocClient settings={settingsMap} />;
}
