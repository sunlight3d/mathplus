import { NextRequest, NextResponse } from "next/server";
import { normalizeMathSpeech } from "@/components/quiz/quizSpeech";

export const dynamic = "force-dynamic";

// In-memory cache for ultra-fast response and zero upstream failures
const ttsCache = new Map<string, { buffer: Buffer; timestamp: number }>();
const MAX_CACHE_SIZE = 500;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawText = searchParams.get("text");

  if (!rawText) {
    return new NextResponse("Missing text parameter", { status: 400 });
  }

  // Normalize text on the server (handles 7,5%, 75%, 0,75%, AB=AH, fractions, etc.)
  const cleanText = normalizeMathSpeech(rawText).trim().slice(0, 250);
  const cacheKey = `vi_${cleanText}`;

  if (ttsCache.has(cacheKey)) {
    const cached = ttsCache.get(cacheKey)!;
    return new NextResponse(cached.buffer as any, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  }

  try {
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(
      cleanText
    )}&total=1&idx=0&textlen=${cleanText.length}`;

    const response = await fetch(googleTtsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      // Fallback endpoint if needed
      const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=gtx&q=${encodeURIComponent(
        cleanText
      )}`;
      const fbResponse = await fetch(fallbackUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (!fbResponse.ok) {
        return new NextResponse("Failed to fetch TTS from upstream", {
          status: response.status,
        });
      }

      const fbArrayBuf = await fbResponse.arrayBuffer();
      const fbBuffer = Buffer.from(fbArrayBuf);

      if (ttsCache.size > MAX_CACHE_SIZE) {
        const firstKey = ttsCache.keys().next().value;
        if (firstKey) ttsCache.delete(firstKey);
      }
      ttsCache.set(cacheKey, { buffer: fbBuffer, timestamp: Date.now() });

      return new NextResponse(fbBuffer as any, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
        },
      });
    }

    const arrayBuf = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    if (ttsCache.size > MAX_CACHE_SIZE) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(cacheKey, { buffer, timestamp: Date.now() });

    return new NextResponse(buffer as any, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error: any) {
    console.error("TTS API Error:", error);
    return new NextResponse(error.message || "Internal Server Error", {
      status: 500,
    });
  }
}
