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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Trung tâm giáo dục MathPlus Academy",
    "url": "https://mathplus.com.vn",
    "logo": "https://mathplus.com.vn" + logoUrl,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-832-645-999",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101B Xã Đàn 2",
      "addressLocality": "Đống Đa",
      "addressRegion": "Hà Nội",
      "addressCountry": "VN"
    }
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
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
