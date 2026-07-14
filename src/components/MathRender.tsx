"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
// @ts-ignore
import renderMathInElement from "katex/dist/contrib/auto-render";
import "katex/dist/katex.min.css";

export default function MathRender() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Allow slight delay for DOM to render before parsing math
      setTimeout(() => {
        renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
          ],
          throwOnError: false,
        });
      }, 100);
    }
  }, [pathname]);

  return null;
}
