import React, { useId } from 'react';

/**
 * §27.7 — Trust signal row illustrations: complete abstract compositions (evidence-grade, no photos).
 * Each visual uses unique gradient IDs via `useId` because multiple rows mount together.
 */

function SvgShell({
  children,
  className = '',
  viewW = 360,
  viewH = 200,
}: {
  children: React.ReactNode;
  className?: string;
  viewW?: number;
  viewH?: number;
}) {
  return (
    <div className={`flex min-h-[200px] w-full items-center justify-center ${className}`} aria-hidden>
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="h-full max-h-[220px] w-full max-w-[min(100%,360px)]"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        {children}
      </svg>
    </div>
  );
}

/** Immutable evidence — chained blocks, ledger strata, connector nodes */
export function TrustChainVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const blocks = [
    { x: 28, y: 72, w: 52, h: 56, rx: 10, op: 0.42 },
    { x: 98, y: 64, w: 58, h: 64, rx: 12, op: 0.55 },
    { x: 174, y: 58, w: 64, h: 72, rx: 12, op: 0.62 },
    { x: 258, y: 68, w: 52, h: 60, rx: 10, op: 0.48 },
  ];

  return (
    <SvgShell className={className}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>
        <linearGradient id={`${id}-blk`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <rect width="360" height="200" fill={`url(#${id}-bg)`} rx="4" />
      <path
        d="M 20 148 Q 90 168 180 158 T 340 152"
        stroke="#93C5FD"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        fill="none"
      />

      {blocks.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={b.rx}
            fill={`url(#${id}-blk)`}
            stroke="#1E3A8A"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          {[0.28, 0.42, 0.56, 0.7].map((py, j) => (
            <line
              key={j}
              x1={b.x + 10}
              y1={b.y + b.h * py}
              x2={b.x + b.w - 10}
              y2={b.y + b.h * py}
              stroke="#E2E8F0"
              strokeOpacity={0.35 + j * 0.08}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          ))}
        </g>
      ))}

      {[
        [80, 100, 98, 96],
        [156, 98, 174, 94],
        [238, 102, 258, 98],
      ].map(([x1, y1, x2, y2], i) => (
        <path
          key={i}
          d={`M${x1} ${y1} L${x2} ${y2}`}
          stroke="#1E90FF"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {[
        [64, 118],
        [132, 112],
        [210, 106],
        [288, 114],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#1F8A70" fillOpacity="0.55" stroke="#fff" strokeWidth="1" />
      ))}

      <rect x="138" y="22" width="84" height="22" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <line x1="150" y1="33" x2="210" y2="33" stroke="#1E3A8A" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
      <line x1="150" y1="38" x2="188" y2="38" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
    </SvgShell>
  );
}

/** Data residency — bounded region, inner core, outer guard ring (abstract, not a map) */
export function TrustRegionVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');

  return (
    <SvgShell className={className}>
      <defs>
        <radialGradient id={`${id}-rg`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#93C5FD" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.12" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width="360" height="200" fill="#F8FAFC" rx="4" />

      <ellipse cx="180" cy="102" rx="158" ry="88" fill={`url(#${id}-rg)`} stroke="#BFDBFE" strokeWidth="1.2" />
      <ellipse
        cx="180"
        cy="102"
        rx="132"
        ry="72"
        fill="none"
        stroke={`url(#${id}-edge)`}
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeOpacity="0.85"
      />

      <path
        d="M 72 118 Q 180 52 288 118 Q 180 168 72 118"
        fill="none"
        stroke="#1E3A8A"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />

      <circle cx="180" cy="102" r="48" fill="#FFFFFF" fillOpacity="0.75" stroke="#1E3A8A" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx="180" cy="102" r="32" fill="#1E90FF" fillOpacity="0.1" stroke="#1E90FF" strokeOpacity="0.35" strokeWidth="1.2" />
      <circle cx="180" cy="102" r="14" fill="#1F8A70" fillOpacity="0.45" stroke="#166534" strokeOpacity="0.25" strokeWidth="1" />

      {[0, 72, 144, 216, 288].map((deg, i) => {
        const r = ((deg - 90) * Math.PI) / 180;
        const x = 180 + Math.cos(r) * 118;
        const y = 102 + Math.sin(r) * 66;
        return <circle key={i} cx={x} cy={y} r="4" fill="#1E3A8A" fillOpacity="0.35" />;
      })}

      <rect x="138" y="18" width="84" height="20" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <line x1="148" y1="28" x2="212" y2="28" stroke="#1E3A8A" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" />
    </SvgShell>
  );
}

/** Independent verification — scan frame, proof ring, ledger hash strip */
export function TrustVerifyVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');

  return (
    <SvgShell className={className}>
      <defs>
        <linearGradient id={`${id}-v`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>
      </defs>
      <rect width="360" height="200" fill={`url(#${id}-v)`} rx="4" />

      <rect x="42" y="38" width="276" height="124" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" />
      <path d="M 58 54 h 244 M 58 64 h 200 M 58 74 h 220" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />

      <rect x="70" y="52" width="88" height="88" rx="10" fill="none" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M 78 60 h 12 v 12 h -12 z M 150 60 h 12 v 12 h -12 z M 78 132 h 12 v 12 h -12 z M 150 132 h 12 v 12 h -12 z" fill="#1E3A8A" fillOpacity="0.2" />

      <circle cx="114" cy="96" r="36" fill="#1E3A8A" fillOpacity="0.06" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="114" cy="96" r="26" fill="none" stroke="#1E90FF" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 6" />
      <circle cx="114" cy="96" r="16" fill="#FFFFFF" stroke="#1F8A70" strokeOpacity="0.55" strokeWidth="2" />
      <path
        d="M 104 96 l 7 7 16 -16"
        stroke="#1F8A70"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <rect x="188" y="58" width="114" height="76" rx="10" fill="#F8FAFC" stroke="#93C5FD" strokeOpacity="0.5" strokeWidth="1" />
      <path d="M 204 82 h 82 M 204 96 h 64 M 204 110 h 72" stroke="#1E3A8A" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
      <rect x="248" y="118" width="36" height="10" rx="3" fill="#1E3A8A" fillOpacity="0.15" />
      <path d="M 158 96 L 176 96" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </SvgShell>
  );
}

/** Stack integration — multi-source nodes converging into evidence hub */
export function TrustStackVisual({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const tops = [
    { x: 48, y: 36 },
    { x: 108, y: 28 },
    { x: 180, y: 24 },
    { x: 252, y: 28 },
    { x: 312, y: 36 },
  ];

  return (
    <SvgShell className={className}>
      <defs>
        <linearGradient id={`${id}-hub`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#172554" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="360" height="200" fill="#F8FAFC" rx="4" />

      {tops.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="11" fill="#FFFFFF" stroke="#1E3A8A" strokeOpacity="0.4" strokeWidth="1.4" />
          <circle cx={p.x} cy={p.y} r="5" fill="#1E90FF" fillOpacity={0.25 + (i % 3) * 0.12} />
        </g>
      ))}

      {tops.map((p, i) => {
        const tx = 180 + (i - 2) * 22;
        const hubTop = 108;
        return (
          <path
            key={`l-${i}`}
            d={`M ${p.x} ${p.y + 12} Q ${(p.x + tx) / 2} ${86} ${tx} ${hubTop}`}
            stroke="#93C5FD"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            fill="none"
          />
        );
      })}

      <rect x="118" y="108" width="124" height="56" rx="14" fill={`url(#${id}-hub)`} stroke="#1E90FF" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d="M 138 132 h 84 M 138 144 h 56 M 138 156 h 72" stroke="#E2E8F0" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />

      <rect x="154" y="118" width="52" height="14" rx="4" fill="#1F8A70" fillOpacity="0.25" stroke="#1F8A70" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="180" cy="92" r="6" fill="#FFFFFF" stroke="#1E3A8A" strokeOpacity="0.35" strokeWidth="1.5" />
    </SvgShell>
  );
}
