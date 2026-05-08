import React from 'react';

/**
 * §27.1 — Abstract evidence network (desktop hero). No literal devices/shields/people.
 * Line fade-in ~2s on first paint; `prefers-reduced-motion` disables animation in index.css.
 */
export function HomeHeroEvidenceVisual({ className = '' }: { className?: string }) {
  const delays = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'] as const;

  return (
    <div className={`relative aspect-square w-full max-w-[520px] mx-auto lg:mx-0 ${className}`} aria-hidden>
      <svg viewBox="0 0 400 400" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="160" fill="#1E3A8A" fillOpacity="0.12" />
        <circle cx="120" cy="140" r="90" fill="#1E90FF" fillOpacity="0.06" />
        <circle cx="280" cy="260" r="100" fill="#1F8A70" fillOpacity="0.07" />

        {[
          [200, 72],
          [320, 140],
          [328, 268],
          [200, 328],
          [72, 268],
          [80, 132],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="10" fill="#1E3A8A" fillOpacity="0.85" />
        ))}
        <circle cx="200" cy="200" r="14" fill="#1E90FF" fillOpacity="0.35" />

        {(
          [
            ['M200 82 L310 145', '#1E3A8A', '0.45'],
            ['M315 150 L315 258', '#1E90FF', '0.35'],
            ['M310 265 L210 318', '#1F8A70', '0.4'],
            ['M190 318 L82 265', '#1E3A8A', '0.4'],
            ['M78 255 L78 145', '#1E90FF', '0.3'],
            ['M88 132 L188 82', '#1F8A70', '0.35'],
            ['M200 92 L200 186', '#1E3A8A', '0.25'],
            ['M212 212 L300 150', '#1E3A8A', '0.2'],
          ] as const
        ).map(([d, stroke, op], i) => (
          <path
            key={i}
            d={d}
            stroke={stroke}
            strokeOpacity={op}
            strokeWidth={i >= 6 ? 1.5 : 2}
            strokeLinecap="round"
            className={`home-hero-line home-hero-line--${delays[i]}`}
          />
        ))}
      </svg>
    </div>
  );
}
