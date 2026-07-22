import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AosProvider from "@/components/AosProvider";
import MathRender from "@/components/MathRender";
import { getSettings } from "@/actions/settings";
import MainLayout from "@/components/MainLayout";

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trung tâm giáo dục MathPlus Academy - Trung tâm đào tạo Toán",
  description: "Cung cấp các khóa học bồi dưỡng và luyện thi toán",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const logoUrl = settings.find((s: any) => s.key === 'LOGO')?.value || '/images/logo.jpg';

  return (
    <html lang="vi">
      <body className={inter.className}>
        <AosProvider>
          <MainLayout logoUrl={logoUrl}>
            {children}
          </MainLayout>
          <MathRender />
        </AosProvider>
      </body>
    </html>
  );
}
