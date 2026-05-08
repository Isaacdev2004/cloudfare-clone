import React from 'react';

const NEUTRAL_BG = '#F7F9FC';
const NEUTRAL_BORDER = '#E5E7EB';
const TEAL_BG = '#E1F5EE';
const TEAL_BORDER = '#0F766E';
const BLUE_BG = '#E6F1FB';
const BLUE_BORDER = '#185FA5';
const PURPLE_BG = '#EEEDFE';
const PURPLE_BORDER = '#534AB7';
const ARROW = '#9CA3AF';
const MUTED_TEXT = '#4B5563';
const MUTED_LABEL = '#6B7280';

type TrackFlowVariant = 'hero' | 'section';

/**
 * §28.12 — Track evidence flow (Diagram A). SVG only; accessible title/desc.
 * Hero: ~450–600px wide; section: up to ~680px.
 */
export function TrackEvidenceFlowDiagram({ variant }: { variant: TrackFlowVariant }) {
  const maxClass = variant === 'section' ? 'max-w-[680px]' : 'max-w-[min(100%,600px)] lg:max-w-[450px]';
  const minHClass = variant === 'hero' ? 'min-h-0 lg:min-h-[520px] lg:flex lg:items-center' : '';

  return (
    <figure className={`mx-auto w-full ${maxClass} ${minHClass}`}>
      <svg
        role="img"
        viewBox="0 0 400 720"
        className="h-auto w-full text-slate-900 dark:text-slate-100"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="track-flow-title track-flow-desc"
      >
        <title id="track-flow-title">Track evidence commit chain — from connected systems through immutable ledger to verified reports</title>
        <desc id="track-flow-desc">
          A flowchart showing how Track collects evidence from connected systems, commits it to an immutable hash-chained
          ledger with WORM storage, maps it to compliance frameworks, and generates independently verifiable reports.
        </desc>
        <defs>
          <marker id="track-flow-arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={ARROW} />
          </marker>
          <style>{`
            @media (prefers-color-scheme: dark) {
              .tf-box-n { fill: #1e293b !important; stroke: #475569 !important; }
              .tf-box-txt { fill: #e2e8f0 !important; }
              .tf-box-sub { fill: #94a3b8 !important; }
              .tf-ann { fill: #94a3b8 !important; }
              .tf-foot { fill: #94a3b8 !important; }
            }
          `}</style>
        </defs>

        {/* Stage 1 — five connectors */}
        <g>
          <rect className="tf-box-n" x={8} y={16} width={72} height={42} rx={6} fill={NEUTRAL_BG} stroke={NEUTRAL_BORDER} strokeWidth={1} />
          <text x={44} y={34} textAnchor="middle" fill="#0B1320" fontSize="9" fontWeight={500}>
            <tspan x={44} dy="0">Microsoft</tspan>
            <tspan x={44} dy="11">365</tspan>
          </text>
        </g>
        <g>
          <rect className="tf-box-n" x={82} y={16} width={72} height={42} rx={6} fill={NEUTRAL_BG} stroke={NEUTRAL_BORDER} strokeWidth={1} />
          <text x={118} y={34} textAnchor="middle" fill="#0B1320" fontSize="9" fontWeight={500}>
            <tspan x={118} dy="0">Active</tspan>
            <tspan x={118} dy="11">Directory</tspan>
          </text>
        </g>
        <g>
          <rect className="tf-box-n" x={156} y={16} width={72} height={42} rx={6} fill={NEUTRAL_BG} stroke={NEUTRAL_BORDER} strokeWidth={1} />
          <text x={192} y={34} textAnchor="middle" fill="#0B1320" fontSize="9" fontWeight={500}>
            <tspan x={192} dy="0">AWS /</tspan>
            <tspan x={192} dy="11">Azure</tspan>
          </text>
        </g>
        <g>
          <rect className="tf-box-n" x={230} y={16} width={72} height={42} rx={6} fill={NEUTRAL_BG} stroke={NEUTRAL_BORDER} strokeWidth={1} />
          <text x={266} y={34} textAnchor="middle" fill="#0B1320" fontSize="9" fontWeight={500}>
            <tspan x={266} dy="0">CIS</tspan>
            <tspan x={266} dy="11">scanners</tspan>
          </text>
        </g>
        <g>
          <rect className="tf-box-n" x={304} y={16} width={72} height={42} rx={6} fill={NEUTRAL_BG} stroke={NEUTRAL_BORDER} strokeWidth={1} />
          <text x={340} y={34} textAnchor="middle" fill="#0B1320" fontSize="9" fontWeight={500}>
            <tspan x={340} dy="0">EDR /</tspan>
            <tspan x={340} dy="11">Backup</tspan>
          </text>
        </g>

        {/* converge to stage 2 */}
        <path
          d="M200 58 L200 82"
          stroke={ARROW}
          strokeWidth={1.2}
          fill="none"
          markerEnd="url(#track-flow-arrowhead)"
        />

        {/* Stage 2 */}
        <rect x={48} y={86} width={304} height={52} rx={8} fill={TEAL_BG} stroke={TEAL_BORDER} strokeWidth={1.2} />
        <text x={200} y={108} textAnchor="middle" fill="#0B1320" fontSize="14" fontWeight={500}>
          Automated collection
        </text>
        <text x={200} y={126} textAnchor="middle" className="tf-box-sub" fill={MUTED_TEXT} fontSize="12" fontWeight={400}>
          No manual uploads. Event-driven.
        </text>

        <path
          d="M200 142 L200 166"
          stroke={ARROW}
          strokeWidth={1.2}
          fill="none"
          markerEnd="url(#track-flow-arrowhead)"
        />

        {/* Stage 3 — WORM emphasised */}
        <rect x={40} y={170} width={320} height={58} rx={8} fill={BLUE_BG} stroke={BLUE_BORDER} strokeWidth={2} />
        <text x={200} y={194} textAnchor="middle" fill="#0B1320" fontSize="14" fontWeight={600}>
          Written to tamper-proof storage
        </text>
        <text x={200} y={214} textAnchor="middle" fill={MUTED_TEXT} fontSize="12" fontWeight={400}>
          WORM — cannot be altered or deleted
        </text>

        <path
          d="M200 232 L200 256"
          stroke={ARROW}
          strokeWidth={1.2}
          fill="none"
          markerEnd="url(#track-flow-arrowhead)"
        />

        {/* Stage 4 + side annotation */}
        <rect x={48} y={260} width={304} height={52} rx={8} fill={PURPLE_BG} stroke={PURPLE_BORDER} strokeWidth={1.2} />
        <text x={200} y={282} textAnchor="middle" fill="#0B1320" fontSize="14" fontWeight={500}>
          Hash-chained to evidence ledger
        </text>
        <text x={200} y={300} textAnchor="middle" className="tf-box-sub" fill={MUTED_TEXT} fontSize="12" fontWeight={400}>
          Each record linked to the previous
        </text>

        <path
          d="M328 286 L360 286"
          stroke="#CBD5E1"
          strokeWidth={0.75}
          strokeDasharray="3 3"
          fill="none"
        />
        <text className="tf-ann" x={362} y={282} fill={MUTED_LABEL} fontSize="12" fontWeight={400}>
          PASS requires
        </text>
        <text className="tf-ann" x={362} y={296} fill={MUTED_LABEL} fontSize="12" fontWeight={400}>
          HIGH confidence
        </text>

        <path
          d="M200 316 L200 340"
          stroke={ARROW}
          strokeWidth={1.2}
          fill="none"
          markerEnd="url(#track-flow-arrowhead)"
        />

        {/* Stage 5 */}
        <rect x={48} y={344} width={304} height={52} rx={8} fill={TEAL_BG} stroke={TEAL_BORDER} strokeWidth={1.2} />
        <text x={200} y={366} textAnchor="middle" fill="#0B1320" fontSize="14" fontWeight={500}>
          Mapped to compliance frameworks
        </text>
        <text x={200} y={384} textAnchor="middle" className="tf-box-sub" fill={MUTED_TEXT} fontSize="12" fontWeight={400}>
          E8, ISO 27001, NIST, APRA, ISM, more
        </text>

        {/* split to stage 6 */}
        <path d="M200 400 L200 424 M200 424 L120 424 M200 424 L280 424" stroke={ARROW} strokeWidth={1.2} fill="none" />
        <path d="M120 424 L120 448" stroke={ARROW} strokeWidth={1.2} fill="none" markerEnd="url(#track-flow-arrowhead)" />
        <path d="M280 424 L280 448" stroke={ARROW} strokeWidth={1.2} fill="none" markerEnd="url(#track-flow-arrowhead)" />

        <rect x={40} y={452} width={160} height={56} rx={8} fill={BLUE_BG} stroke={BLUE_BORDER} strokeWidth={1.2} />
        <text x={120} y={474} textAnchor="middle" fill="#0B1320" fontSize="13" fontWeight={500}>
          Insurance-grade reports
        </text>
        <text x={120} y={494} textAnchor="middle" className="tf-box-sub" fill={MUTED_TEXT} fontSize="11" fontWeight={400}>
          Chain-of-custody included
        </text>

        <rect x={200} y={452} width={160} height={56} rx={8} fill={PURPLE_BG} stroke={PURPLE_BORDER} strokeWidth={1.2} />
        <text x={280} y={474} textAnchor="middle" fill="#0B1320" fontSize="13" fontWeight={500}>
          Independent verification
        </text>
        <text x={280} y={494} textAnchor="middle" className="tf-box-sub" fill={MUTED_TEXT} fontSize="11" fontWeight={400}>
          QR code or endpoint
        </text>

        <text className="tf-foot" x={200} y={548} textAnchor="middle" fill={MUTED_LABEL} fontSize="12" fontWeight={400}>
          Evidence locked. Reports verifiable. Tampering detectable.
        </text>
      </svg>
      {variant === 'section' ? null : (
        <figcaption className="sr-only">Diagram A — Track evidence flow from systems to verified outputs.</figcaption>
      )}
    </figure>
  );
}
