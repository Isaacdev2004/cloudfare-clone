import React, { useId } from 'react';

/**
 * §27.3 + §10.2 — Platform card header visuals: always visible (no toggle). Abstract geometry only
 * (no literal devices/people); Track = evidence chain + mapping read; Lens = enforcement aperture +
 * perimeter signals. Static SVG for §12.3 on cards.
 */

export function HomeTrackPlatformCardVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');

  return (
    <div
      className={`mb-5 flex h-[120px] w-full items-center justify-center rounded-lg border border-[#E5E7EB]/90 bg-[#F7F9FC] ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 120"
        className="h-[96px] w-full max-w-[280px]"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <defs>
          <linearGradient id={`${id}-track-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#F7F9FC" />
          </linearGradient>
          <linearGradient id={`${id}-track-ledger`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="320" height="120" fill={`url(#${id}-track-bg)`} rx="8" />

        <circle cx="44" cy="58" r="10" fill="#1E3A8A" fillOpacity="0.35" stroke="#1E3A8A" strokeOpacity="0.55" strokeWidth="1.2" />
        <circle cx="68" cy="42" r="7" fill="#93C5FD" fillOpacity="0.45" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="68" cy="74" r="7" fill="#93C5FD" fillOpacity="0.35" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1" />
        <path
          d="M 78 50 Q 98 44 118 52"
          stroke="#60A5FA"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 78 66 Q 98 72 118 64"
          stroke="#60A5FA"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        <rect
          x="118"
          y="28"
          width="104"
          height="64"
          rx="12"
          fill={`url(#${id}-track-ledger)`}
          stroke="#1E3A8A"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
        <line x1="132" y1="46" x2="208" y2="46" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
        <line x1="132" y1="58" x2="198" y2="58" stroke="#1E3A8A" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
        <line x1="132" y1="70" x2="204" y2="70" stroke="#1E3A8A" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
        <line x1="132" y1="82" x2="188" y2="82" stroke="#1E3A8A" strokeOpacity="0.14" strokeWidth="2" strokeLinecap="round" />
        <circle cx="210" cy="44" r="4" fill="#1F8A70" fillOpacity="0.65" />

        <path d="M 222 60 L 248 60" stroke="#93C5FD" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
        <path d="M 252 56 l 6 4 -6 4" fill="none" stroke="#1E3A8A" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="262" y="40" width="44" height="40" rx="8" fill="#FFFFFF" stroke="#1E3A8A" strokeOpacity="0.4" strokeWidth="1.2" />
        <path d="M 274 54 h 20 M 274 62 h 14 M 274 70 h 18" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />

        <rect x="96" y="98" width="148" height="14" rx="4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={104 + i * 22} y="102" width="14" height="6" rx="2" fill="#1E3A8A" fillOpacity={0.12 + i * 0.04} />
        ))}
      </svg>
    </div>
  );
}

const LENS_SPOKE_DEG = [0, 60, 120, 180, 240, 300];

export function HomeLensPlatformCardVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const cx = 160;
  const cy = 62;
  const rInner = 26;
  const rOuter = 46;

  const spokes = LENS_SPOKE_DEG.map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x1: cx + Math.cos(rad) * rInner,
      y1: cy + Math.sin(rad) * rInner,
      x2: cx + Math.cos(rad) * rOuter,
      y2: cy + Math.sin(rad) * rOuter,
    };
  });

  const perimeter = LENS_SPOKE_DEG.map((deg, i) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    const pr = 52;
    return {
      key: i,
      x: cx + Math.cos(rad) * pr,
      y: cy + Math.sin(rad) * pr,
    };
  });

  return (
    <div
      className={`mb-5 flex h-[120px] w-full items-center justify-center rounded-lg border border-[#E5E7EB]/90 bg-[#F7F9FC] ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 120"
        className="h-[96px] w-full max-w-[280px]"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <defs>
          <linearGradient id={`${id}-lens-bg`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#F7F9FC" />
          </linearGradient>
          <radialGradient id={`${id}-lens-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#1E3A8A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1E90FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="320" height="120" fill={`url(#${id}-lens-bg)`} rx="8" />

        <rect x="96" y="14" width="128" height="18" rx="9" fill="#FFFFFF" stroke="#1E90FF" strokeOpacity="0.35" strokeWidth="1.2" />
        <line x1="108" y1="23" x2="212" y2="23" stroke="#1E90FF" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
        <line x1="108" y1="29" x2="188" y2="29" stroke="#93C5FD" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />

        <circle cx={cx} cy={cy} r="48" stroke="#1E90FF" strokeOpacity="0.38" strokeWidth="1.6" fill="none" />
        <circle cx={cx} cy={cy} r="38" stroke="#1E3A8A" strokeOpacity="0.18" strokeWidth="1.2" fill="none" strokeDasharray="4 6" />

        {spokes.map((s, i) => (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="#38BDF8"
            strokeOpacity="0.28"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}

        {perimeter.map((p) => (
          <circle
            key={p.key}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#FFFFFF"
            stroke="#1E3A8A"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        ))}

        <circle cx={cx} cy={cy} r="24" fill={`url(#${id}-lens-core)`} stroke="#1E90FF" strokeOpacity="0.55" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="14" fill="#FFFFFF" fillOpacity="0.95" stroke="#1E3A8A" strokeOpacity="0.25" strokeWidth="1.2" />
        <circle cx={cx} cy={cy} r="6" fill="#1F8A70" fillOpacity="0.55" />

        <line x1={cx} y1="44" x2={cx} y2="52" stroke="#1E90FF" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
        <line x1={cx} y1="72" x2={cx} y2="80" stroke="#1E90FF" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="142" y1={cy} x2="150" y2={cy} stroke="#1E90FF" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="170" y1={cy} x2="178" y2={cy} stroke="#1E90FF" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
