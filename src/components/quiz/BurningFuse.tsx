"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Flame } from "lucide-react";

interface BurningFuseProps {
  timeLeft: number;
  totalTime: number;
  isBurning: boolean;
  isTimeUp: boolean;
}

export default function BurningFuse({
  timeLeft,
  totalTime,
  isBurning,
  isTimeUp,
}: BurningFuseProps) {
  // progress goes from 0 (start) to 100 (fuse burnt out)
  const progress = Math.min(
    100,
    Math.max(0, ((totalTime - timeLeft) / totalTime) * 100)
  );

  return (
    <div className="w-full my-3 px-2">
      {/* Label and countdown stats */}
      <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-gray-700">
        <div className="flex items-center space-x-1.5">
          <Flame className={`w-4 h-4 ${isBurning ? "text-orange-500 animate-bounce" : "text-gray-400"}`} />
          <span className="uppercase tracking-wider">
            {isTimeUp ? "💥 ĐÃ HẾT GIỜ!" : isBurning ? "🔥 Đang đếm ngược..." : "⏳ Chờ đọc xong câu hỏi"}
          </span>
        </div>
        <div className="flex items-center space-x-1 font-mono text-sm">
          <span className={`px-2 py-0.5 rounded-full font-extrabold text-white transition-colors duration-300 ${
            timeLeft <= 3 && !isTimeUp
              ? "bg-red-500 animate-pulse scale-110"
              : isTimeUp
              ? "bg-gray-600"
              : "bg-[#64B428]"
          }`}>
            {Math.max(0, timeLeft)}s
          </span>
        </div>
      </div>

      {/* Fuse Rope Track */}
      <div className="relative h-7 w-full flex items-center select-none">
        {/* Background fuse track (Unburnt Rope) */}
        <div className="absolute left-0 right-10 h-3 rounded-full overflow-hidden bg-amber-800/20 border border-amber-900/30 shadow-inner">
          {/* Braided texture stripes */}
          <div
            className="w-full h-full opacity-80"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #d97706, #d97706 6px, #b45309 6px, #b45309 12px)`,
            }}
          />
          {/* Burnt part (Ash / Charcoal) */}
          <div
            className="absolute top-0 left-0 bottom-0 bg-neutral-900/90 transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          >
            {/* Ash texture */}
            <div
              className="w-full h-full opacity-60"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, #1f2937, #1f2937 4px, #111827 4px, #111827 8px)`,
              }}
            />
          </div>
        </div>

        {/* The Burning Spark & Flame head that travels along the fuse */}
        {isBurning && !isTimeUp && (
          <div
            className="absolute -top-1 -ml-4 z-20 pointer-events-none transition-all duration-200 ease-linear flex items-center justify-center"
            style={{ left: `calc(${progress}% * 0.88)` }}
          >
            {/* Spark Glow Filter */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              {/* Radial glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 blur-sm opacity-80 animate-pulse" />
              
              {/* Flame Icon */}
              <div className="relative z-10 text-yellow-200 drop-shadow-[0_0_8px_rgba(234,88,12,0.9)] animate-bounce">
                🔥
              </div>

              {/* Spark particles burst */}
              <span className="absolute -top-2 left-1 text-[10px] text-yellow-300 animate-ping opacity-75">✦</span>
              <span className="absolute -top-1 right-0 text-[12px] text-orange-300 animate-ping opacity-90 delay-100">✧</span>
              <span className="absolute -bottom-1 left-2 text-[8px] text-yellow-200 animate-ping opacity-70 delay-200">✦</span>
            </div>
          </div>
        )}

        {/* The Firecracker / Dynamite at the end of the wire */}
        <div className="absolute right-0 flex items-center justify-center z-10">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg border-2 transition-all transform duration-300 ${
              isTimeUp
                ? "bg-red-500 border-red-300 text-white scale-125 rotate-12 animate-wiggle"
                : progress > 70
                ? "bg-orange-500 border-yellow-300 text-white animate-pulse"
                : "bg-red-600 border-amber-300 text-white"
            }`}
            title="Pháo nổ khi hết giờ"
          >
            {isTimeUp ? "💥" : "🧨"}
          </div>
        </div>
      </div>
    </div>
  );
}
