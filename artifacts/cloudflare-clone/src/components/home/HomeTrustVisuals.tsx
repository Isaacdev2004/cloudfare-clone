import React, { useId } from 'react';

/**
 * §27.7 — Trust row illustrations: production-ready abstract compositions (evidence-grade, no photos).
 */

function SvgShell({
  children,
  className = '',
  viewW = 400,
  viewH = 240,
}: {
  children: React.ReactNode;
  className?: string;
  viewW?: number;
  viewH?: number;
}) {
  return (
    <div className={`flex min-h-[220px] w-full items-center justify-center ${className}`} aria-hidden>
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="h-full w-full max-h-[min(100%,280px)] max-w-[min(100%,400px)]"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        {children}
      </svg>
    </div>
  );
}

/** Immutable evidence — ledger blocks, chain links, anchored hash strip */
export function TrustChainVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const blocks = [
    { x: 32, y: 88, w: 56, h: 60, rx: 11 },
    { x: 108, y: 78, w: 64, h: 72, rx: 13 },
    { x: 192, y: 70, w: 72, h: 82, rx: 14 },
    { x: 286, y: 82, w: 58, h: 66, rx: 12 },
  ];

  return (
    <SvgShell className={className} viewW={400} viewH={240}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#E0E7FF" />
        </linearGradient>
        <linearGradient id={`${id}-blk`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#172554" stopOpacity="0.38" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E3A8A" floodOpacity="0.18" />
        </filter>
        <linearGradient id={`${id}-chain`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1F8A70" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-bg)`} rx="8" />
      <path
        d="M 24 168 Q 120 188 200 176 T 376 164"
        stroke="#93C5FD"
        strokeOpacity="0.45"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 24 168 Q 120 188 200 176 T 376 164"
        stroke={`url(#${id}-chain)`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.35"
        fill="none"
      />

      {blocks.map((b, i) => (
        <g key={i} filter={`url(#${id}-sh)`}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={b.rx}
            fill={`url(#${id}-blk)`}
            stroke="#1E3A8A"
            strokeOpacity="0.55"
            strokeWidth="1.4"
          />
          {[0.3, 0.44, 0.58, 0.72].map((py, j) => (
            <line
              key={j}
              x1={b.x + 12}
              y1={b.y + b.h * py}
              x2={b.x + b.w - 12}
              y2={b.y + b.h * py}
              stroke="#F1F5F9"
              strokeOpacity={0.45 + j * 0.1}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          ))}
        </g>
      ))}

      {[
        [92, 118, 108, 114],
        [176, 112, 192, 106],
        [268, 118, 286, 114],
      ].map(([x1, y1, x2, y2], i) => (
        <path
          key={i}
          d={`M${x1} ${y1} L${x2} ${y2}`}
          stroke="#1E90FF"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      {[
        [72, 138],
        [148, 128],
        [228, 120],
        [312, 128],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill="#1F8A70" fillOpacity="0.65" stroke="#fff" strokeWidth="1.5" />
      ))}

      <rect x="158" y="28" width="84" height="26" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
      <line x1="172" y1="41" x2="228" y2="41" stroke="#1E3A8A" strokeOpacity="0.28" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="172" y1="47" x2="204" y2="47" stroke="#93C5FD" strokeOpacity="0.65" strokeWidth="1.6" strokeLinecap="round" />
    </SvgShell>
  );
}

/** Data residency — sovereign boundary, inner core, verified territory ring */
export function TrustRegionVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');

  return (
    <SvgShell className={className} viewW={400} viewH={240}>
      <defs>
        <radialGradient id={`${id}-rg`} cx="50%" cy="48%" r="68%">
          <stop offset="0%" stopColor="#F0F9FF" stopOpacity="1" />
          <stop offset="45%" stopColor="#BFDBFE" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.14" />
        </radialGradient>
        <linearGradient id={`${id}-ring`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#1F8A70" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.45" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="400" height="240" fill="#F8FAFC" rx="8" />

      <ellipse cx="200" cy="118" rx="172" ry="96" fill={`url(#${id}-rg)`} stroke="#BFDBFE" strokeWidth="1.5" />
      <ellipse
        cx="200"
        cy="118"
        rx="148"
        ry="82"
        fill="none"
        stroke={`url(#${id}-ring)`}
        strokeWidth="2.5"
        strokeDasharray="10 12"
        strokeOpacity="0.9"
      />

      <path
        d="M 88 132 Q 200 58 312 132 Q 200 198 88 132"
        fill="none"
        stroke="#1E3A8A"
        strokeOpacity="0.12"
        strokeWidth="2"
      />

      <circle cx="200" cy="118" r="56" fill="#FFFFFF" fillOpacity="0.92" stroke="#1E3A8A" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="200" cy="118" r="40" fill="#DBEAFE" fillOpacity="0.45" stroke="#1E90FF" strokeOpacity="0.4" strokeWidth="1.8" />
      <circle cx="200" cy="118" r="22" fill="#1E3A8A" fillOpacity="0.12" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1.5" />
      <path
        d="M 200 102 v 28 M 186 116 h 28"
        stroke="#1F8A70"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={`url(#${id}-glow)`}
      />

      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const r = ((deg - 90) * Math.PI) / 180;
        const x = 200 + Math.cos(r) * 132;
        const y = 118 + Math.sin(r) * 74;
        return <circle key={i} cx={x} cy={y} r="5" fill="#1E3A8A" fillOpacity="0.38" stroke="#fff" strokeWidth="1" />;
      })}

      <rect x="152" y="22" width="96" height="24" rx="7" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" />
      <line x1="164" y1="34" x2="236" y2="34" stroke="#1E3A8A" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
    </SvgShell>
  );
}

/** Independent verification — report frame, proof seal, verification rail */
export function TrustVerifyVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');

  return (
    <SvgShell className={className} viewW={400} viewH={240}>
      <defs>
        <linearGradient id={`${id}-v`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="55%" stopColor="#ECFEFF" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>
        <filter id={`${id}-doc`} x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.08" />
        </filter>
        <linearGradient id={`${id}-seal`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-v)`} rx="8" />

      <g filter={`url(#${id}-doc)`}>
        <rect x="48" y="44" width="304" height="152" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.4" />
        <path d="M 48 68 h 304" stroke="#E2E8F0" strokeWidth="1.2" />
        <path d="M 64 56 h 88 M 64 80 h 200 M 64 92 h 160" stroke="#CBD5E1" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <rect x="76" y="84" width="96" height="96" rx="12" fill="none" stroke="#1E3A8A" strokeOpacity="0.38" strokeWidth="2.2" />
      <path
        d="M 86 94 h 14 v 14 h -14 z M 158 94 h 14 v 14 h -14 z M 86 166 h 14 v 14 h -14 z M 158 166 h 14 v 14 h -14 z"
        fill="#1E3A8A"
        fillOpacity="0.18"
      />

      <circle cx="124" cy="132" r="40" fill="#1E3A8A" fillOpacity="0.06" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1.8" />
      <circle cx="124" cy="132" r="30" fill="none" stroke="#1E90FF" strokeOpacity="0.45" strokeWidth="1.8" strokeDasharray="5 7" />
      <circle cx="124" cy="132" r="20" fill="#FFFFFF" stroke={`url(#${id}-seal)`} strokeWidth="2.5" />
      <path
        d="M 112 132 l 8 8 20 -20"
        stroke="#059669"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <rect x="200" y="88" width="132" height="88" rx="12" fill="#F8FAFC" stroke="#93C5FD" strokeOpacity="0.55" strokeWidth="1.2" />
      <path d="M 216 112 h 100 M 216 128 h 72 M 216 144 h 88" stroke="#1E3A8A" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
      <rect x="248" y="154" width="44" height="12" rx="4" fill="#1E3A8A" fillOpacity="0.12" />
      <path d="M 172 132 L 192 132" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />

      <rect x="292" y="58" width="44" height="44" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" />
      <path d="M 306 72 h 16 M 306 80 h 16 M 306 88 h 12" stroke="#64748B" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 306 96 h 16" stroke="#64748B" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
    </SvgShell>
  );
}

/** Stack integration — converging evidence paths into assurance hub */
export function TrustStackVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const tops = [
    { x: 52, y: 42 },
    { x: 118, y: 32 },
    { x: 200, y: 26 },
    { x: 282, y: 32 },
    { x: 348, y: 42 },
  ];

  return (
    <SvgShell className={className} viewW={400} viewH={240}>
      <defs>
        <linearGradient id={`${id}-hub`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.92" />
        </linearGradient>
        <filter id={`${id}-hubSh`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1E90FF" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect width="400" height="240" fill="#F8FAFC" rx="8" />

      {tops.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="13" fill="#FFFFFF" stroke="#1E3A8A" strokeOpacity="0.42" strokeWidth="1.6" />
          <circle cx={p.x} cy={p.y} r="6" fill="#1E90FF" fillOpacity={0.28 + (i % 3) * 0.1} />
        </g>
      ))}

      {tops.map((p, i) => {
        const tx = 200 + (i - 2) * 26;
        const hubTop = 118;
        return (
          <path
            key={`l-${i}`}
            d={`M ${p.x} ${p.y + 14} Q ${(p.x + tx) / 2} ${88} ${tx} ${hubTop}`}
            stroke="#93C5FD"
            strokeOpacity="0.5"
            strokeWidth="2"
            fill="none"
          />
        );
      })}

      <g filter={`url(#${id}-hubSh)`}>
        <rect x="128" y="118" width="144" height="64" rx="16" fill={`url(#${id}-hub)`} stroke="#1E90FF" strokeOpacity="0.4" strokeWidth="1.4" />
      </g>
      <path d="M 152 148 h 96 M 152 162 h 64 M 152 176 h 80" stroke="#E2E8F0" strokeOpacity="0.5" strokeWidth="2.2" strokeLinecap="round" />

      <rect x="168" y="132" width="64" height="18" rx="5" fill="#1F8A70" fillOpacity="0.28" stroke="#1F8A70" strokeOpacity="0.45" strokeWidth="1.2" />
      <circle cx="200" cy="102" r="7" fill="#FFFFFF" stroke="#1E3A8A" strokeOpacity="0.4" strokeWidth="1.8" />
    </SvgShell>
  );
}
