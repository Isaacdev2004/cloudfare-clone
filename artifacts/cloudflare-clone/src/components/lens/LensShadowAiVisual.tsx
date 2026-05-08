import React from 'react';

/** §29.9 — Abstract “hidden AI surfacing” visual with AI accent hints. */
export function LensShadowAiVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex min-h-[220px] items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 280 200" className="h-full w-full max-w-[280px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lens-sh-lift" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0B1320" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <ellipse cx="92" cy="118" rx="52" ry="28" fill="#E6F1FB" stroke="#185FA5" strokeWidth={1} opacity={0.85} />
        <ellipse cx="188" cy="118" rx="52" ry="28" fill="#F1EFE8" stroke="#5F5E5A" strokeWidth={1} opacity={0.7} />
        <circle cx="92" cy="108" r="8" fill="#0B1320" opacity={0.15} />
        <circle cx="188" cy="108" r="8" fill="#0B1320" opacity={0.12} />
        <path
          d="M134 104 L146 88 M140 108 L154 92"
          stroke="#1E90FF"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.9}
        />
        <path d="M148 96 L168 72" stroke="url(#lens-sh-lift)" strokeWidth={3} strokeLinecap="round" />
        <circle cx="172" cy="68" r="14" fill="#E1F5EE" stroke="#0F6E56" strokeWidth={1.2} />
        <circle cx="172" cy="68" r="5" fill="#1E90FF" opacity={0.9} />
        <path
          d="M40 148 Q140 175 240 148"
          stroke="#CBD5E1"
          strokeWidth={1}
          strokeDasharray="4 4"
          fill="none"
        />
      </svg>
    </div>
  );
}
