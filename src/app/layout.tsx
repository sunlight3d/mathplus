import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AosProvider from "@/components/AosProvider";
import FloatingContact from "@/components/FloatingContact";
import MathRender from "@/components/MathRender";
import { getSettings } from "@/actions/settings";

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
          <div className="flex flex-col min-h-screen">
            <Header logoUrl={logoUrl} />
            <main className="flex-grow">{children}</main>
            <Footer logoUrl={logoUrl} />
            <FloatingContact />
            <MathRender />
          </div>
        </AosProvider>
      </body>
    </html>
  );
}
