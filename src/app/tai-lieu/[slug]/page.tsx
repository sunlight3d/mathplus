import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { documents } from "../page";
import type { Metadata } from "next";

import PDFViewer from "@/components/PDFViewer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = documents.find((d) => d.id === slug);
  if (!doc) return {};

  return {
    title: `${doc.title} | MathPlus Academy`,
    description: doc.description,
  };
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = documents.find((d) => d.id === slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 pt-28 pb-8 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link href="/tai-lieu" className="inline-flex items-center text-green-100 hover:text-white transition-colors mb-4 font-medium">
                <ArrowLeft size={18} className="mr-2" />
                Quay lại danh sách
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                {doc.title}
              </h1>
            </div>
            <a 
              href={doc.fileUrl} 
              download 
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-gray-50 transition-colors shrink-0"
            >
              <Download size={18} />
              Tải xuống
            </a>
          </div>
        </div>
      </section>

      {/* PDF Viewer */}
      <section className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" style={{ height: "calc(100vh - 250px)", minHeight: "600px" }}>
          <PDFViewer fileUrl={doc.fileUrl} title={doc.title} />
        </div>
      </section>
    </div>
  );
}
