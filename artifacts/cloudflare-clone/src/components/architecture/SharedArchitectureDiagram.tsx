import React from 'react';

const NEUTRAL = { bg: '#F7F9FC', stroke: '#E5E7EB' };
const TEAL = { bg: '#E1F5EE', stroke: '#0F6E56' };
const BLUE = { bg: '#E6F1FB', stroke: '#185FA5' };
const PURPLE = { bg: '#EEEDFE', stroke: '#534AB7' };
const GREY_INNER = { bg: '#F1EFE8', stroke: '#57534E' };
const GREY_BAR = { bg: '#F1EFE8', stroke: '#5F5E5A' };
const OUT_TEAL = { bg: '#E1F5EE', stroke: '#0F6E56' };
const OUT_PURPLE = { bg: '#EEEDFE', stroke: '#534AB7' };
const OUT_BLUE = { bg: '#E6F1FB', stroke: '#185FA5' };
const ARROW = '#9CA3AF';
const HEAD = '#0B1320';
const SUB = '#4B5563';

/**
 * §30.12 — Shared evidence architecture (Diagram C). SVG; title/desc; dark mode.
 */
export function SharedArchitectureDiagram() {
  return (
    <figure className="mx-auto w-full max-w-[680px]">
      <svg
        role="img"
        viewBox="0 0 420 640"
        className="h-auto w-full text-slate-900 dark:text-slate-100"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="shared-arch-title shared-arch-desc"
      >
        <title id="shared-arch-title">
          APEXLyn shared evidence architecture — Track and Lens built on one evidence infrastructure
        </title>
        <desc id="shared-arch-desc">
          Architecture overview showing Track (compliance evidence) and Lens (AI governance evidence) sharing a common
          immutable evidence infrastructure, with connectors feeding in and verified reports and forensic outputs coming
          out.
        </desc>
        <defs>
          <marker id="shared-arch-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={ARROW} />
          </marker>
          <style>{`
            @media (prefers-color-scheme: dark) {
              .sa-n { fill: #1e293b !important; stroke: #475569 !important; }
              .sa-t { fill: #064e3b !important; stroke: #34d399 !important; }
              .sa-b { fill: #1e3a5f !important; stroke: #38bdf8 !important; }
              .sa-p { fill: #312e81 !important; stroke: #a5b4fc !important; }
              .sa-g { fill: #292524 !important; stroke: #78716c !important; }
              .sa-txt { fill: #e2e8f0 !important; }
              .sa-sub { fill: #94a3b8 !important; }
            }
          `}</style>
        </defs>

        {/* Labels + compliance sources */}
        <text x="92" y="14" textAnchor="middle" fill={SUB} fontSize="9" fontWeight={600} className="sa-sub">
          Compliance sources
        </text>
        {['M365', 'AD', 'AWS', 'CIS'].map((t, i) => (
          <g key={t}>
            <rect
              className="sa-n"
              x={16 + i * 34}
              y="22"
              width="30"
              height="20"
              rx="4"
              fill={NEUTRAL.bg}
              stroke={NEUTRAL.stroke}
              strokeWidth={0.5}
            />
            <text x={31 + i * 34} y="35" textAnchor="middle" fill={HEAD} fontSize="8" fontWeight={500} className="sa-txt">
              {t}
            </text>
          </g>
        ))}

        <text x="318" y="14" textAnchor="middle" fill={SUB} fontSize="9" fontWeight={600} className="sa-sub">
          AI activity sources
        </text>
        {['Browser', 'Endpoint', 'Gateway'].map((t, i) => (
          <g key={t}>
            <rect
              className="sa-n"
              x={246 + i * 52}
              y="22"
              width="48"
              height="20"
              rx="4"
              fill={NEUTRAL.bg}
              stroke={NEUTRAL.stroke}
              strokeWidth={0.5}
            />
            <text x={270 + i * 52} y="35" textAnchor="middle" fill={HEAD} fontSize="7" fontWeight={500} className="sa-txt">
              {t}
            </text>
          </g>
        ))}

        {/* Arrows to Track / Lens */}
        <path d="M 92 48 L 92 62" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />
        <path d="M 318 48 L 318 62" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />

        {/* Track + Lens engines */}
        <rect
          className="sa-t"
          x="22"
          y="66"
          width="138"
          height="78"
          rx="12"
          fill={TEAL.bg}
          stroke={TEAL.stroke}
          strokeWidth={0.5}
        />
        <text x="91" y="86" textAnchor="middle" fill={HEAD} fontSize="12" fontWeight={600} className="sa-txt">
          Track
        </text>
        <text x="91" y="100" textAnchor="middle" fill={SUB} fontSize="8" fontWeight={400} className="sa-sub">
          Compliance evidence engine
        </text>
        <text x="91" y="112" textAnchor="middle" fill={SUB} fontSize="8" fontWeight={400} className="sa-sub">
          8+ frameworks mapped
        </text>
        <text x="91" y="124" textAnchor="middle" fill={SUB} fontSize="8" fontWeight={400} className="sa-sub">
          Confidence-calibrated assessment
        </text>

        <rect
          className="sa-b"
          x="260"
          y="66"
          width="138"
          height="78"
          rx="12"
          fill={BLUE.bg}
          stroke={BLUE.stroke}
          strokeWidth={0.5}
        />
        <text x="329" y="86" textAnchor="middle" fill={HEAD} fontSize="12" fontWeight={600} className="sa-txt">
          Lens
        </text>
        <text x="329" y="100" textAnchor="middle" fill={SUB} fontSize="8" fontWeight={400} className="sa-sub">
          AI governance evidence platform
        </text>
        <text x="329" y="112" textAnchor="middle" fill={SUB} fontSize="8" fontWeight={400} className="sa-sub">
          7 enforcement layers
        </text>
        <text x="329" y="124" textAnchor="middle" fill={SUB} fontSize="8" fontWeight={400} className="sa-sub">
          22 native integrations
        </text>

        {/* To core */}
        <path d="M 91 148 L 91 168 L 210 168" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />
        <path d="M 329 148 L 329 168 L 210 168" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />
        <path d="M 210 168 L 210 178" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />

        {/* Shared core */}
        <rect
          className="sa-p"
          x="28"
          y="180"
          width="364"
          height="132"
          rx="16"
          fill={PURPLE.bg}
          stroke={PURPLE.stroke}
          strokeWidth={0.5}
        />
        <text x="210" y="198" textAnchor="middle" fill={HEAD} fontSize="11" fontWeight={600} className="sa-txt">
          Shared evidence infrastructure
        </text>

        {[
          { x: 44, h1: 'Immutable ledger', h2: 'Hash-chained' },
          { x: 154, h1: 'WORM storage', h2: 'AWS Sydney' },
          { x: 264, h1: 'Governance', h2: 'Attestation + proof' },
        ].map((b) => (
          <g key={b.h1}>
            <rect
              className="sa-g"
              x={b.x}
              y="208"
              width="100"
              height="46"
              rx="6"
              fill={GREY_INNER.bg}
              stroke={GREY_INNER.stroke}
              strokeWidth={0.5}
            />
            <text x={b.x + 50} y="226" textAnchor="middle" fill={HEAD} fontSize="9" fontWeight={500} className="sa-txt">
              {b.h1}
            </text>
            <text x={b.x + 50} y="242" textAnchor="middle" fill={SUB} fontSize="8" fontWeight={400} className="sa-sub">
              {b.h2}
            </text>
          </g>
        ))}

        <text x="210" y="288" textAnchor="middle" fill={SUB} fontSize="7.5" fontWeight={400} className="sa-sub">
          AES-256 at rest · TLS 1.3 in transit · Per-tenant isolation · 7-year retention
        </text>

        {/* From core to outputs */}
        <path d="M 90 312 L 90 332" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />
        <path d="M 210 312 L 210 332" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />
        <path d="M 330 312 L 330 332" stroke={ARROW} strokeWidth={1} fill="none" markerEnd="url(#shared-arch-m)" />

        {/* Outputs */}
        <rect
          className="sa-t"
          x="22"
          y="336"
          width="112"
          height="52"
          rx="8"
          fill={OUT_TEAL.bg}
          stroke={OUT_TEAL.stroke}
          strokeWidth={0.5}
        />
        <text x="78" y="354" textAnchor="middle" fill={HEAD} fontSize="9" fontWeight={500} className="sa-txt">
          Verified reports
        </text>
        <text x="78" y="368" textAnchor="middle" fill={SUB} fontSize="7.5" fontWeight={400} className="sa-sub">
          Insurance + audit grade
        </text>

        <rect
          className="sa-p"
          x="154"
          y="336"
          width="112"
          height="52"
          rx="8"
          fill={OUT_PURPLE.bg}
          stroke={OUT_PURPLE.stroke}
          strokeWidth={0.5}
        />
        <text x="210" y="354" textAnchor="middle" fill={HEAD} fontSize="9" fontWeight={500} className="sa-txt">
          Independent verification
        </text>
        <text x="210" y="368" textAnchor="middle" fill={SUB} fontSize="7.5" fontWeight={400} className="sa-sub">
          QR code + endpoint
        </text>

        <rect
          className="sa-b"
          x="286"
          y="336"
          width="112"
          height="52"
          rx="8"
          fill={OUT_BLUE.bg}
          stroke={OUT_BLUE.stroke}
          strokeWidth={0.5}
        />
        <text x="342" y="354" textAnchor="middle" fill={HEAD} fontSize="9" fontWeight={500} className="sa-txt">
          Forensic evidence
        </text>
        <text x="342" y="368" textAnchor="middle" fill={SUB} fontSize="7.5" fontWeight={400} className="sa-sub">
          Court-ready + eDiscovery
        </text>

        <text x="78" y="404" textAnchor="middle" fill={SUB} fontSize="7" fontWeight={400} className="sa-sub">
          Insurers · Auditors · Boards
        </text>
        <text x="210" y="404" textAnchor="middle" fill={SUB} fontSize="7" fontWeight={400} className="sa-sub">
          External reviewers
        </text>
        <text x="342" y="404" textAnchor="middle" fill={SUB} fontSize="7" fontWeight={400} className="sa-sub">
          Legal · Regulators · Courts
        </text>

        <rect
          className="sa-g"
          x="24"
          y="418"
          width="372"
          height="28"
          rx="6"
          fill={GREY_BAR.bg}
          stroke={GREY_BAR.stroke}
          strokeWidth={0.5}
        />
        <text x="210" y="436" textAnchor="middle" fill={HEAD} fontSize="9" fontWeight={500} className="sa-txt">
          All data stays in AWS Sydney, Australia
        </text>
      </svg>
    </figure>
  );
}
