import React from 'react';

/** §28.6 — Abstract governance flow: review → decision → permanent record. */
export function TrackGovernanceVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex min-h-[240px] items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 320 200" className="h-full w-full max-w-[320px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="72" width="72" height="48" rx="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth={1.2} />
        <text x="52" y="100" textAnchor="middle" fill="#0B1320" fontSize="12" fontWeight={600}>
          Review
        </text>
        <path d="M88 96 H120" stroke="#9CA3AF" strokeWidth={1.5} markerEnd="url(#tg-a)" />
        <rect x="124" y="72" width="72" height={48} rx={8} fill="#EEEDFE" stroke="#534AB7" strokeWidth={1.2} />
        <text x={160} y={100} textAnchor="middle" fill="#0B1320" fontSize="12" fontWeight={600}>
          Decision
        </text>
        <path d="M196 96 H228" stroke="#9CA3AF" strokeWidth={1.5} markerEnd="url(#tg-a)" />
        <rect x="232" y="64" width="72" height={64} rx={10} fill="#1E3A8A" fillOpacity={0.15} stroke="#1E3A8A" strokeWidth={1.5} />
        <path
          d="M256 88 L268 100 L296 82"
          stroke="#1F8A70"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x={268} y={118} textAnchor="middle" fill="#0B1320" fontSize="11" fontWeight={500}>
          Record
        </text>
        <defs>
          <marker id="tg-a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="#9CA3AF" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
