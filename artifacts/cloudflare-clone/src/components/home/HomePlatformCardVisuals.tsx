import React from 'react';

/**
 * §27.3 + §10.2 — Abstract geometric card tops for Track / Lens platform cards (not literal devices).
 * Matches brand palette; static SVG (no animation) for §12.3 first-paint safety on cards.
 */

export function HomeTrackPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`mb-5 flex h-[100px] w-full items-center justify-center rounded-lg bg-[#F7F9FC] ${className}`} aria-hidden>
      <svg viewBox="0 0 200 88" className="h-[72px] w-full max-w-[200px]" fill="none">
        <rect x="8" y="36" width="36" height="36" rx="8" fill="#1E3A8A" fillOpacity="0.35" stroke="#1E90FF" strokeOpacity="0.45" strokeWidth="1.2" />
        <rect x="82" y="28" width="44" height="44" rx="10" fill="#1E3A8A" fillOpacity="0.5" stroke="#1E90FF" strokeOpacity="0.55" strokeWidth="1.2" />
        <rect x="156" y="36" width="36" height="36" rx="8" fill="#1F8A70" fillOpacity="0.22" stroke="#1F8A70" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M44 54h34M126 54h26" stroke="#93C5FD" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
        <path d="M168 54h20" stroke="#93C5FD" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" />
        <circle cx="104" cy="14" r="5" fill="#1E3A8A" fillOpacity="0.55" />
        <path d="M104 19v12" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function HomeLensPlatformCardVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`mb-5 flex h-[100px] w-full items-center justify-center rounded-lg bg-[#F7F9FC] ${className}`} aria-hidden>
      <svg viewBox="0 0 200 88" className="h-[72px] w-full max-w-[200px]" fill="none">
        <circle cx="100" cy="50" r="38" fill="#1E90FF" fillOpacity="0.12" stroke="#1E90FF" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="100" cy="50" r="22" fill="#1E3A8A" fillOpacity="0.15" stroke="#93C5FD" strokeOpacity="0.4" strokeWidth="1.2" />
        <circle cx="100" cy="50" r="8" fill="#1F8A70" fillOpacity="0.45" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 100 + Math.cos(rad) * 28;
          const y1 = 50 + Math.sin(rad) * 28;
          const x2 = 100 + Math.cos(rad) * 52;
          const y2 = 50 + Math.sin(rad) * 52;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1D4ED8"
              strokeOpacity="0.22"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
        <rect x="78" y="6" width="44" height="18" rx="6" fill="#1E3A8A" fillOpacity="0.2" stroke="#1E90FF" strokeOpacity="0.35" strokeWidth="1" />
      </svg>
    </div>
  );
}
