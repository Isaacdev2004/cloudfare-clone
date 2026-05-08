import React from 'react';

/** §27.7 — Abstract SVGs for trust signal rows (no photos). */

export function TrustChainVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-[200px] w-full items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 280 160" className="h-full max-h-[200px] w-full max-w-[280px]" fill="none">
        <rect x="24" y="56" width="44" height="44" rx="8" fill="#1E3A8A" fillOpacity="0.35" stroke="#1E90FF" strokeOpacity="0.4" />
        <rect x="96" y="48" width="52" height="52" rx="10" fill="#1E3A8A" fillOpacity="0.5" stroke="#1E90FF" strokeOpacity="0.5" />
        <rect x="176" y="56" width="44" height="44" rx="8" fill="#1F8A70" fillOpacity="0.25" stroke="#1F8A70" strokeOpacity="0.5" />
        <path d="M68 78h20M148 74h22" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        <path d="M220 78h36" stroke="#93C5FD" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

export function TrustRegionVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-[200px] w-full items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 280 160" className="h-full max-h-[200px] w-full max-w-[280px]" fill="none">
        <ellipse cx="140" cy="88" rx="100" ry="64" fill="#1E3A8A" fillOpacity="0.2" stroke="#1E90FF" strokeOpacity="0.35" strokeWidth="2" />
        <circle cx="140" cy="88" r="40" fill="#1E90FF" fillOpacity="0.12" stroke="#93C5FD" strokeOpacity="0.4" />
        <circle cx="140" cy="88" r="18" fill="#1F8A70" fillOpacity="0.35" />
      </svg>
    </div>
  );
}

export function TrustVerifyVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-[200px] w-full items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 280 160" className="h-full max-h-[200px] w-full max-w-[280px]" fill="none">
        <rect x="40" y="50" width="48" height="48" rx="8" fill="#1E3A8A" fillOpacity="0.3" />
        <rect x="116" y="42" width="56" height="56" rx="10" fill="#1E3A8A" fillOpacity="0.45" stroke="#1E90FF" strokeOpacity="0.5" />
        <path
          d="M132 70 L148 86 L172 58"
          stroke="#1F8A70"
          strokeOpacity="0.9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="200" y="50" width="48" height="48" rx="8" fill="#1E90FF" fillOpacity="0.15" />
      </svg>
    </div>
  );
}

export function TrustStackVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-[200px] w-full items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 280 160" className="h-full max-h-[200px] w-full max-w-[280px]" fill="none">
        <circle cx="70" cy="50" r="14" fill="#1E3A8A" fillOpacity="0.45" />
        <circle cx="120" cy="40" r="12" fill="#1E90FF" fillOpacity="0.35" />
        <circle cx="170" cy="55" r="13" fill="#1F8A70" fillOpacity="0.4" />
        <circle cx="220" cy="45" r="11" fill="#1E3A8A" fillOpacity="0.35" />
        <path d="M84 52 L108 78" stroke="#93C5FD" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M132 48 L150 88" stroke="#93C5FD" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M182 62 L160 92" stroke="#93C5FD" strokeOpacity="0.35" strokeWidth="2" />
        <rect x="108" y="96" width="72" height="40" rx="10" fill="#1E3A8A" fillOpacity="0.55" stroke="#1E90FF" strokeOpacity="0.4" />
        <path d="M126 116h36M126 124h24" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
