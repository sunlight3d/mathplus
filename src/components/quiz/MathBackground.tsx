"use client";

import React from "react";

export default function MathBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Mathematical Graph Paper Grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, #64B428 1px, transparent 1px),
            linear-gradient(to bottom, #64B428 1px, transparent 1px),
            linear-gradient(to right, rgba(255,184,0,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,184,0,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
        }}
      />

      {/* Floating Math Formulas & Symbols Watermarks */}
      <div className="absolute top-12 left-8 text-white/10 text-4xl font-serif font-black transform -rotate-12 animate-pulse">
        f(x) = ax² + bx + c
      </div>
      <div className="absolute top-36 right-12 text-[#FFB800]/15 text-5xl font-mono font-bold transform rotate-6">
        π ≈ 3.14159265
      </div>
      <div className="absolute bottom-24 left-16 text-[#64B428]/15 text-4xl font-serif font-bold transform rotate-12">
        a² + b² = c²
      </div>
      <div className="absolute bottom-32 right-20 text-white/10 text-5xl font-serif font-black transform -rotate-6">
        ∫ f(x)dx = F(x) + C
      </div>
      <div className="absolute top-1/2 left-6 text-[#FFB800]/15 text-6xl font-black font-mono">
        ∑ⁿᵢ₌₁ xᵢ
      </div>
      <div className="absolute top-2/3 right-8 text-[#64B428]/15 text-5xl font-serif font-bold transform -rotate-12">
        Δ = b² - 4ac
      </div>

      {/* Floating Math Geometric Shapes */}
      {/* Triangle */}
      <svg
        className="absolute top-20 right-1/4 w-32 h-32 text-white/5 transform rotate-45"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="50,15 90,85 10,85" />
        <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="3 3" />
      </svg>

      {/* Compass / Circle Angle */}
      <svg
        className="absolute bottom-16 left-1/3 w-40 h-40 text-[#64B428]/10"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="50" cy="50" r="40" strokeDasharray="4 2" />
        <line x1="50" y1="50" x2="85" y2="30" />
        <line x1="50" y1="50" x2="90" y2="50" />
        <path d="M 65 50 A 15 15 0 0 0 62 42" stroke="currentColor" />
      </svg>

      {/* Coordinate Axes */}
      <svg
        className="absolute top-1/3 left-1/4 w-28 h-28 text-[#FFB800]/10"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="10" y1="90" x2="90" y2="90" markerEnd="url(#arrow)" />
        <line x1="10" y1="90" x2="10" y2="10" markerEnd="url(#arrow)" />
        <path d="M 10 90 Q 50 80 80 20" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      {/* Ambient Lighting Spheres matching MathPlus Palette */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#64B428]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#FFB800]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#2e5311]/40 blur-3xl pointer-events-none" />
    </div>
  );
}
