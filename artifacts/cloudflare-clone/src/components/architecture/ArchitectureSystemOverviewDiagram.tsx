import React from 'react';

/**
 * Section 17.4 — Premium system overview: platforms, control plane, and defensible records.
 */
export function ArchitectureSystemOverviewDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 via-white to-[#f0f4fc] p-4 shadow-[0_24px_60px_-28px_rgba(11,19,32,0.18)] sm:p-6 md:p-8">
      <svg
        viewBox="0 0 960 420"
        className="h-auto w-full"
        role="img"
        aria-labelledby="arch-sys-title"
      >
        <title id="arch-sys-title">APEXLyn system overview — platforms, control plane, and records</title>
        <defs>
          <linearGradient id="arch-sys-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0B1320" stopOpacity="0.06" />
          </linearGradient>
          <filter id="arch-sys-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1E3A8A" floodOpacity="0.15" />
          </filter>
        </defs>
        <rect x="24" y="20" width="912" height="380" rx="20" fill="url(#arch-sys-grad)" stroke="#E2E8F0" strokeWidth="1" />
        {/* Environments & identity */}
        <g filter="url(#arch-sys-glow)">
          <rect x="56" y="64" width="200" height="100" rx="12" fill="#fff" stroke="#1E3A8A" strokeWidth="1.5" />
          <text x="156" y="98" textAnchor="middle" className="fill-slate-900" style={{ fontSize: 15, fontWeight: 700, fontFamily: 'ui-sans-serif' }}>
            Environments
          </text>
          <text x="156" y="124" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 12, fontFamily: 'ui-sans-serif' }}>
            Endpoints, apps, data paths
          </text>
          <rect x="56" y="188" width="200" height="80" rx="12" fill="#fff" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="156" y="224" textAnchor="middle" className="fill-slate-900" style={{ fontSize: 14, fontWeight: 600, fontFamily: 'ui-sans-serif' }}>
            Identity & signals
          </text>
        </g>
        {/* Core plane */}
        <rect x="300" y="100" width="360" height="180" rx="16" fill="#0B1320" stroke="#1E3A8A" strokeWidth="2" />
        <text x="480" y="142" textAnchor="middle" fill="#F8FAFC" style={{ fontSize: 18, fontWeight: 700, fontFamily: 'ui-sans-serif' }}>
          APEXLyn control plane
        </text>
        <text x="480" y="168" textAnchor="middle" fill="#94A3B8" style={{ fontSize: 12, fontFamily: 'ui-sans-serif' }}>
          Evidence, governance, policy execution
        </text>
        <rect x="332" y="200" width="140" height="56" rx="10" fill="#1E3A8A" />
        <text x="402" y="234" textAnchor="middle" fill="#fff" style={{ fontSize: 13, fontWeight: 600, fontFamily: 'ui-sans-serif' }}>
          APEXLyn Track
        </text>
        <rect x="488" y="200" width="140" height="56" rx="10" fill="#1D4ED8" />
        <text x="558" y="234" textAnchor="middle" fill="#fff" style={{ fontSize: 13, fontWeight: 600, fontFamily: 'ui-sans-serif' }}>
          APEXLyn Lens
        </text>
        {/* Records */}
        <rect x="300" y="300" width="360" height="64" rx="12" fill="#fff" stroke="#1E3A8A" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="480" y="330" textAnchor="middle" className="fill-slate-800" style={{ fontSize: 14, fontWeight: 600, fontFamily: 'ui-sans-serif' }}>
          Defensible records &amp; evidence history
        </text>
        <text x="480" y="352" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 11, fontFamily: 'ui-sans-serif' }}>
          Structured, reviewable, audit-aligned outputs
        </text>
        {/* Stakeholders */}
        <g filter="url(#arch-sys-glow)">
          <rect x="704" y="64" width="200" height="100" rx="12" fill="#fff" stroke="#1E3A8A" strokeWidth="1.5" />
          <text x="804" y="98" textAnchor="middle" className="fill-slate-900" style={{ fontSize: 15, fontWeight: 700, fontFamily: 'ui-sans-serif' }}>
            Reporting
          </text>
          <text x="804" y="124" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 12, fontFamily: 'ui-sans-serif' }}>
            Boards, assurance, partners
          </text>
          <rect x="704" y="188" width="200" height="80" rx="12" fill="#fff" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="804" y="230" textAnchor="middle" className="fill-slate-900" style={{ fontSize: 14, fontWeight: 600, fontFamily: 'ui-sans-serif' }}>
            Regulators &amp; review
          </text>
        </g>
        {/* Connectors */}
        <path
          d="M256 124 L300 150"
          fill="none"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <path d="M256 220 L300 200" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 2" />
        <path
          d="M660 150 L700 130"
          fill="none"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <path d="M660 200 L700 200" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="480" y="410" textAnchor="middle" className="fill-slate-400" style={{ fontSize: 10, fontFamily: 'ui-sans-serif' }}>
          Illustrative system overview — not a network topology
        </text>
      </svg>
    </div>
  );
}
