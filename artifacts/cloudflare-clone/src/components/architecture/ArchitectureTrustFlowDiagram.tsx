import React from 'react';

/**
 * Section 17.4 — Trust, control, and evidence flow across the operating model.
 */
export function ArchitectureTrustFlowDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-[#e8effc]/40 p-4 shadow-[0_20px_50px_-26px_rgba(11,19,32,0.12)] sm:p-6 md:p-8">
      <svg
        viewBox="0 0 960 300"
        className="h-auto w-full"
        role="img"
        aria-labelledby="arch-trust-title"
      >
        <title id="arch-trust-title">Trust, control, and evidence flow</title>
        <defs>
          <linearGradient id="arch-flow-arrow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g>
          {[
            { x: 40, label: 'Activity & signals', sub: 'Security & AI use in context' },
            { x: 220, label: 'Control & policy', sub: 'Rules, scope, ownership' },
            { x: 400, label: 'Evidence & records', sub: 'Structured, time-bound proof' },
            { x: 580, label: 'Governance & trust', sub: 'Review, reporting, attestation' },
            { x: 760, label: 'Defensible output', sub: 'Board-ready, audit-aligned' },
          ].map((step, i) => (
            <g key={step.label}>
              <rect
                x={step.x}
                y="64"
                width="168"
                height="160"
                rx="14"
                fill="#fff"
                stroke={i % 2 === 0 ? '#1E3A8A' : '#64748B'}
                strokeWidth="1.5"
              />
              <text
                x={step.x + 84}
                y="108"
                textAnchor="middle"
                className="fill-slate-900"
                style={{ fontSize: 13, fontWeight: 700, fontFamily: 'ui-sans-serif' }}
              >
                {step.label}
              </text>
              <text
                x={step.x + 84}
                y="136"
                textAnchor="middle"
                className="fill-slate-500"
                style={{ fontSize: 11, fontFamily: 'ui-sans-serif' }}
              >
                {step.sub}
              </text>
            </g>
          ))}
        </g>
        {[
          { x1: 208, x2: 220 },
          { x1: 388, x2: 400 },
          { x1: 568, x2: 580 },
          { x1: 748, x2: 760 },
        ].map((a, i) => (
          <line
            key={i}
            x1={a.x1}
            y1={144}
            x2={a.x2}
            y2={144}
            stroke="url(#arch-flow-arrow)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}
        <text x="480" y="270" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 12, fontWeight: 600, fontFamily: 'ui-sans-serif' }}>
          Trust and control are expressed through verifiable evidence — not isolated dashboards.
        </text>
        <text x="480" y="290" textAnchor="middle" className="fill-slate-400" style={{ fontSize: 10, fontFamily: 'ui-sans-serif' }}>
          Conceptual flow — sequence varies by environment
        </text>
      </svg>
    </div>
  );
}
