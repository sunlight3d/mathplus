import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AosProvider from "@/components/AosProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toan.vn - Trung tâm đào tạo Toán",
  description: "Cung cấp các khóa học bồi dưỡng và luyện thi toán",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AosProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AosProvider>
      </body>
    </html>
  );
}
