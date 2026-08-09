"use client";

import { useState, useEffect } from "react";

export default function PDFViewer({ fileUrl, title }: { fileUrl: string, title: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full flex items-center justify-center bg-gray-50">Đang tải tài liệu...</div>;
  }

  if (isMobile) {
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(`https://mathplus.com.vn${fileUrl}`)}&embedded=true`;
    return (
      <iframe 
        src={googleViewerUrl} 
        className="w-full h-full border-0"
        title={title}
      />
    );
  }

  return (
    <iframe 
      src={`${fileUrl}#view=FitH`} 
      className="w-full h-full border-0"
      title={title}
    />
  );
}
