import React from 'react';

const TEAL_WRAP = { fill: '#E1F5EE', stroke: '#0F6E56' };
const BLUE_LAYER = { fill: '#E6F1FB', stroke: '#185FA5' };
const PURPLE_LEDGER = { fill: '#EEEDFE', stroke: '#534AB7' };
const PILL = { fill: '#F1EFE8', stroke: '#D1CFC7' };
const GREY_WRAP = { fill: '#F1EFE8', stroke: '#5F5E5A' };
const CORAL_BOX = { fill: '#FAECE7', stroke: '#993C1D' };
const ARROW = '#9CA3AF';
const TEXT_DARK = '#0B1320';
const TEXT_MUTED = '#6B7280';

type LensDiagramVariant = 'hero' | 'section';

const LAYERS = [
  'Browser extension',
  'Endpoint agent',
  'Network gateway',
  'API interceptor',
  'Cloud application connectors',
  'AI output inspection',
  'Internal LLM API protection',
] as const;

const STACK = [
  { title: 'SIEM', sub: 'Sentinel, Splunk, QRadar' },
  { title: 'XDR / EDR', sub: 'CrowdStrike, Defender' },
  { title: 'SASE / Proxy', sub: 'Zscaler, Netskope, Prisma' },
  { title: 'ITSM', sub: 'ServiceNow, Jira' },
  { title: 'Alerting', sub: 'Slack, Teams, PagerDuty' },
  { title: 'GRC', sub: 'ServiceNow GRC' },
] as const;

const PILLS = ['Block', 'Warn', 'Redact', 'Audit', 'Allow'] as const;

/**
 * §29.14 — Lens enforcement layers + existing stack. SVG only; accessible title/desc.
 */
export function LensEnforcementLayersDiagram({ variant }: { variant: LensDiagramVariant }) {
  const idP = variant === 'hero' ? 'lens-diag-h' : 'lens-diag-s';
  const maxClass =
    variant === 'section' ? 'max-w-[680px]' : 'max-w-[min(100%,500px)] lg:max-w-[500px]';
  const minHClass = variant === 'hero' ? 'min-h-0 lg:min-h-[480px] lg:flex lg:items-center' : '';

  return (
    <figure className={`mx-auto w-full ${maxClass} ${minHClass}`}>
      <svg
        role="img"
        viewBox="0 0 560 520"
        className="h-auto w-full text-slate-900 dark:text-slate-100"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby={`${idP}-title ${idP}-desc`}
      >
        <title id={`${idP}-title`}>Lens 7 enforcement layers with existing security stack integration</title>
        <desc id={`${idP}-desc`}>
          A structural diagram showing Lens operating across 7 AI governance enforcement layers while integrating with the
          customer&apos;s existing security tools including SIEM, XDR, EDR, and ITSM platforms.
        </desc>
        <defs>
          <marker id={`${idP}-m`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={ARROW} />
          </marker>
          <marker id={`${idP}-mr`} markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6 z" fill={ARROW} />
          </marker>
          <style>{`
            @media (prefers-color-scheme: dark) {
              .ld-wrap-l { fill: #0f172a !important; stroke: #0f766e !important; }
              .ld-wrap-r { fill: #1e293b !important; stroke: #78716c !important; }
              .ld-layer { fill: #1e3a5f !important; stroke: #38bdf8 !important; }
              .ld-ledg { fill: #312e81 !important; stroke: #818cf8 !important; }
              .ld-pill { fill: #292524 !important; stroke: #57534e !important; }
              .ld-coral { fill: #431407 !important; stroke: #f97316 !important; }
              .ld-t { fill: #e2e8f0 !important; }
              .ld-st { fill: #94a3b8 !important; }
              .ld-ft { fill: #94a3b8 !important; }
            }
          `}</style>
        </defs>

        {/* Left — Lens enforcement layers */}
        <rect
          className="ld-wrap-l"
          x="8"
          y="8"
          width="248"
          height="392"
          rx="20"
          fill={TEAL_WRAP.fill}
          stroke={TEAL_WRAP.stroke}
          strokeWidth={0.5}
        />
        <text x="132" y="32" textAnchor="middle" fill={TEXT_DARK} fontSize="12" fontWeight={600} className="ld-t">
          Lens enforcement layers
        </text>

        {LAYERS.map((label, i) => {
          const y = 48 + i * 28;
          return (
            <g key={label}>
              <rect
                className="ld-layer"
                x="20"
                y={y}
                width="224"
                height="24"
                rx="6"
                fill={BLUE_LAYER.fill}
                stroke={BLUE_LAYER.stroke}
                strokeWidth={0.5}
              />
              <text x="132" y={y + 16} textAnchor="middle" fill={TEXT_DARK} fontSize="10" fontWeight={500} className="ld-t">
                {label}
              </text>
            </g>
          );
        })}

        <rect
          className="ld-ledg"
          x="20"
          y="252"
          width="224"
          height="44"
          rx="8"
          fill={PURPLE_LEDGER.fill}
          stroke={PURPLE_LEDGER.stroke}
          strokeWidth={0.5}
        />
        <text x="132" y="272" textAnchor="middle" fill={TEXT_DARK} fontSize="11" fontWeight={600} className="ld-t">
          Forensic evidence ledger
        </text>
        <text x="132" y="288" textAnchor="middle" fill={TEXT_MUTED} fontSize="9" fontWeight={400} className="ld-st">
          Immutable. Hash-chained. Verified.
        </text>

        {PILLS.map((p, i) => {
          const pw = 38;
          const pg = 3;
          const rowW = PILLS.length * pw + (PILLS.length - 1) * pg;
          const x0 = 20 + (224 - rowW) / 2 + i * (pw + pg);
          return (
            <g key={p}>
              <rect
                className="ld-pill"
                x={x0}
                y="308"
                width={pw}
                height="18"
                rx="9"
                fill={PILL.fill}
                stroke={PILL.stroke}
                strokeWidth={0.5}
              />
              <text x={x0 + pw / 2} y="320" textAnchor="middle" fill={TEXT_DARK} fontSize="8" fontWeight={500} className="ld-t">
                {p}
              </text>
            </g>
          );
        })}

        {/* Right — Your existing stack */}
        <rect
          className="ld-wrap-r"
          x="304"
          y="8"
          width="248"
          height="392"
          rx="20"
          fill={GREY_WRAP.fill}
          stroke={GREY_WRAP.stroke}
          strokeWidth={0.5}
        />
        <text x="428" y="32" textAnchor="middle" fill={TEXT_DARK} fontSize="12" fontWeight={600} className="ld-t">
          Your existing stack
        </text>

        {STACK.map((row, i) => {
          const y = 48 + i * 52;
          return (
            <g key={row.title}>
              <rect
                className="ld-coral"
                x="316"
                y={y}
                width="224"
                height="44"
                rx="6"
                fill={CORAL_BOX.fill}
                stroke={CORAL_BOX.stroke}
                strokeWidth={0.5}
              />
              <text x="428" y={y + 18} textAnchor="middle" fill={TEXT_DARK} fontSize="11" fontWeight={600} className="ld-t">
                {row.title}
              </text>
              <text x="428" y={y + 34} textAnchor="middle" fill={TEXT_MUTED} fontSize="9" fontWeight={400} className="ld-st">
                {row.sub}
              </text>
            </g>
          );
        })}

        {/* Connectors — x from left panel edge to right */}
        {/* SIEM — bidirectional ~ y 70 */}
        <path
          d="M 256 68 L 308 68"
          stroke={ARROW}
          strokeWidth={1}
          fill="none"
          markerEnd={`url(#${idP}-m)`}
          markerStart={`url(#${idP}-mr)`}
        />
        <text x="282" y="62" textAnchor="middle" fill={TEXT_MUTED} fontSize="8" className="ld-st">
          Bidirectional
        </text>
        {/* XDR — bidirectional ~ y 122 */}
        <path
          d="M 256 120 L 308 120"
          stroke={ARROW}
          strokeWidth={1}
          fill="none"
          markerEnd={`url(#${idP}-m)`}
          markerStart={`url(#${idP}-mr)`}
        />
        <text x="282" y="114" textAnchor="middle" fill={TEXT_MUTED} fontSize="8" className="ld-st">
          Bidirectional
        </text>
        {/* SASE — via ICAP one way */}
        <path
          d="M 256 172 L 308 172"
          stroke={ARROW}
          strokeWidth={1}
          fill="none"
          markerEnd={`url(#${idP}-m)`}
        />
        <text x="282" y="166" textAnchor="middle" fill={TEXT_MUTED} fontSize="8" className="ld-st">
          via ICAP
        </text>
        {/* ITSM */}
        <path d="M 256 224 L 308 224" stroke={ARROW} strokeWidth={1} fill="none" markerEnd={`url(#${idP}-m)`} />
        {/* Alerting */}
        <path d="M 256 276 L 308 276" stroke={ARROW} strokeWidth={1} fill="none" markerEnd={`url(#${idP}-m)`} />
        {/* GRC */}
        <path d="M 256 328 L 308 328" stroke={ARROW} strokeWidth={1} fill="none" markerEnd={`url(#${idP}-m)`} />

        <text x="280" y="408" textAnchor="middle" fill={TEXT_MUTED} fontSize="11" fontWeight={400} className="ld-ft">
          Lens adds AI governance to your existing security infrastructure.
        </text>
        <text x="280" y="424" textAnchor="middle" fill={TEXT_MUTED} fontSize="11" fontWeight={400} className="ld-ft">
          Your tools keep working. Lens makes them smarter about AI.
        </text>
      </svg>
    </figure>
  );
}
