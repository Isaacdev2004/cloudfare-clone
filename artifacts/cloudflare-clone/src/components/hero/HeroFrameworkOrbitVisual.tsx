/**
 * Framework globe hero — pixel match to repo root `globe-hero-final.html`.
 * Single composed cloud (back + front layers only). White badges, sharp inline SVGs.
 */
import React, { useId } from "react";
import { cn } from "@/lib/utils";

const SCENE = 680;
const CX = 340;
const CY = 340;

const MESH_YS: number[] = (() => {
  const ys: number[] = [];
  for (let y = 52; y <= 626; y += 14) ys.push(y);
  return ys;
})();

const heroCss = `
  @keyframes hero-fw-float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
    50%       { transform: translate(-50%, -50%) translateY(-8px); }
  }
  @keyframes hero-globe-breathe {
    0%, 100% { opacity: 0.97; }
    50%       { opacity: 1; }
  }
  @keyframes hero-conn-line-pulse {
    0%, 100% { stroke-opacity: 0.22; }
    50%       { stroke-opacity: 0.50; }
  }
  .hero-fw-node {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    transform: translate(-50%, -50%);
    cursor: default;
    z-index: 20;
    -webkit-font-smoothing: antialiased;
  }
  .hero-fw-badge {
    width: 62px;
    height: 62px;
    background: #ffffff;
    border-radius: 18px;
    border: 1.5px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 4px 20px rgba(29, 78, 216, 0.15),
      0 1px 4px rgba(0,0,0,0.08);
    transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
  }
  .hero-fw-node:hover .hero-fw-badge {
    border-color: #1D4ED8;
    box-shadow: 0 6px 28px rgba(29, 78, 216, 0.28), 0 2px 8px rgba(0,0,0,0.1);
    transform: scale(1.06);
  }
  .hero-fw-label {
    font-size: 9px;
    font-weight: 700;
    color: #334155;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 0.02em;
    pointer-events: none;
    background: rgba(255,255,255,0.82);
    padding: 2px 7px;
    border-radius: 8px;
    backdrop-filter: blur(4px);
    -webkit-font-smoothing: antialiased;
  }
  .hero-globe-circle { animation: hero-globe-breathe 4s ease-in-out infinite; }
  .hero-conn-line { animation: hero-conn-line-pulse 3s ease-in-out infinite; }
`;

function HorizontalMeshLines() {
  return (
    <>
      {MESH_YS.map((y) => (
        <line key={y} x1={0} y1={y} x2={SCENE} y2={y} />
      ))}
    </>
  );
}

/** Inline icons — viewBox 0 0 48 48, rendered 36×36 per globe-hero-final.html */
function IconBadgeEssentialEight() {
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <polygon points="24,2 38,9 44,24 38,39 24,46 10,39 4,24 10,9" fill="#1D4ED8" />
      <polygon points="24,10 34,15 38,24 34,33 24,38 14,33 10,24 14,15" fill="none" stroke="#E4EAFA" strokeWidth="1.1" opacity="0.5" />
      <text x="24" y="32" textAnchor="middle" fontFamily="-apple-system,sans-serif" fontSize="20" fontWeight="700" fill="white" textRendering="geometricPrecision">
        8
      </text>
    </svg>
  );
}

function IconBadgeCis() {
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <circle cx="24" cy="24" r="22" fill="#1E3A8A" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="#1D4ED8" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="7" fill="#1D4ED8" />
      <circle cx="24" cy="24" r="3" fill="#E4EAFA" />
      <line x1="24" y1="2" x2="24" y2="9" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="39" x2="24" y2="46" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="24" x2="9" y2="24" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
      <line x1="39" y1="24" x2="46" y2="24" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconBadgeIso() {
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <rect x="5" y="3" width="28" height="35" rx="4" fill="#1E3A8A" />
      <polygon points="25,3 33,11 25,11" fill="#1D4ED8" />
      <rect x="10" y="16" width="14" height="2.5" rx="1.25" fill="#E4EAFA" opacity="0.75" />
      <rect x="10" y="22" width="18" height="2" rx="1" fill="#E4EAFA" opacity="0.48" />
      <rect x="10" y="28" width="13" height="2" rx="1" fill="#E4EAFA" opacity="0.48" />
      <circle cx="35" cy="35" r="11" fill="#1D4ED8" stroke="#E4EAFA" strokeWidth="1.3" />
      <polyline points="29,35 33,39 42,28" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBadgeNist() {
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <polygon points="24,2 44,13 44,35 24,46 4,35 4,13" fill="#1D4ED8" />
      <polygon points="24,9 37,16.5 37,31.5 24,39 11,31.5 11,16.5" fill="none" stroke="#E4EAFA" strokeWidth="1" opacity="0.42" />
      <circle cx="24" cy="11" r="2.2" fill="white" />
      <circle cx="37" cy="18.5" r="2.2" fill="white" />
      <circle cx="37" cy="29.5" r="2.2" fill="white" />
      <circle cx="24" cy="37" r="2.2" fill="white" />
      <circle cx="11" cy="29.5" r="2.2" fill="white" />
      <circle cx="11" cy="18.5" r="2.2" fill="white" />
      <circle cx="24" cy="24" r="4.5" fill="#E4EAFA" />
    </svg>
  );
}

function IconBadgeApra() {
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <rect x="3" y="41" width="42" height="4" rx="2" fill="#1E3A8A" />
      <rect x="6" y="17" width="7" height="24" rx="2" fill="#1D4ED8" />
      <rect x="17" y="17" width="7" height="24" rx="2" fill="#1D4ED8" />
      <rect x="28" y="17" width="7" height="24" rx="2" fill="#1D4ED8" />
      <rect x="39" y="17" width="6" height="24" rx="2" fill="#1D4ED8" />
      <rect x="4" y="12" width="40" height="6" rx="2" fill="#1E3A8A" />
      <polygon points="2,13 24,3 46,13" fill="#1D4ED8" />
      <circle cx="24" cy="29" r="9" fill="#1E3A8A" stroke="#E4EAFA" strokeWidth="1.4" />
      <rect x="20" y="29" width="8" height="6.5" rx="1.5" fill="#E4EAFA" />
      <path
        d="M21.5 29L21.5 26C21.5 23.5 26.5 23.5 26.5 26L26.5 29"
        fill="none"
        stroke="#E4EAFA"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBadgeHealthcare() {
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <path d="M24 3L44 11L44 27C44 38 35 45 24 47C13 45 4 38 4 27L4 11Z" fill="#1D4ED8" />
      <path d="M24 10L38 17L38 27C38 36 32.5 41 24 43C15.5 41 10 36 10 27L10 17Z" fill="#1E3A8A" />
      <rect x="19" y="17" width="10" height="20" rx="3" fill="#E4EAFA" />
      <rect x="14" y="22" width="20" height="10" rx="3" fill="#E4EAFA" />
      <circle cx="24" cy="27" r="3.5" fill="#1D4ED8" />
    </svg>
  );
}

function IconBadgePrivacyGlobe({ rid }: { rid: string }) {
  const cid = `${rid}-gc`;
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <defs>
        <clipPath id={cid}>
          <circle cx="24" cy="24" r="20" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="20" fill="#EEF2F7" />
      <g clipPath={`url(#${cid})`}>
        <ellipse cx="24" cy="24" rx="20" ry="7" fill="none" stroke="#1D4ED8" strokeWidth="1.3" opacity="0.9" />
        <ellipse cx="24" cy="15" rx="15" ry="5" fill="none" stroke="#1D4ED8" strokeWidth="1.1" opacity="0.65" />
        <ellipse cx="24" cy="33" rx="15" ry="5" fill="none" stroke="#1D4ED8" strokeWidth="1.1" opacity="0.65" />
        <ellipse cx="24" cy="24" rx="7" ry="20" fill="none" stroke="#1D4ED8" strokeWidth="1.3" opacity="0.9" />
        <ellipse cx="24" cy="24" rx="14" ry="20" fill="none" stroke="#1D4ED8" strokeWidth="1" opacity="0.6" />
      </g>
      <circle cx="24" cy="24" r="20" fill="none" stroke="#1D4ED8" strokeWidth="2" />
    </svg>
  );
}

function IconBadgeIsm() {
  return (
    <svg width={36} height={36} viewBox="0 0 48 48" fill="none" aria-hidden style={{ shapeRendering: "geometricPrecision" }}>
      <path d="M24 3L44 11L44 27C44 38 35 45 24 47C13 45 4 38 4 27L4 11Z" fill="#1E3A8A" />
      <path d="M24 9L41 16.5L41 27C41 36.5 33.5 42 24 44C14.5 42 7 36.5 7 27L7 16.5Z" fill="#1D4ED8" />
      <circle cx="15" cy="21" r="3.2" fill="#E4EAFA" />
      <circle cx="15" cy="30" r="3.2" fill="#E4EAFA" />
      <circle cx="15" cy="39" r="3.2" fill="#E4EAFA" />
      <line x1="21" y1="21" x2="35" y2="21" stroke="#E4EAFA" strokeWidth="2.1" strokeLinecap="round" opacity="0.55" />
      <line x1="21" y1="30" x2="35" y2="30" stroke="#E4EAFA" strokeWidth="2.1" strokeLinecap="round" opacity="0.55" />
      <line x1="21" y1="39" x2="29" y2="39" stroke="#E4EAFA" strokeWidth="2.1" strokeLinecap="round" opacity="0.55" />
      <polyline
        points="12.5,21 14.2,22.6 16.8,19.4"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="12.5,30 14.2,31.6 16.8,28.4"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="12.5,39 14.2,40.6 16.8,37.4"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NodeSpec = {
  key: string;
  left: number;
  top: number;
  label: string;
  floatDur: string;
  floatDelay: string;
  lineDelay: string;
  pulseDur: string;
  pulseBegin: string;
  Icon: React.ComponentType<{ rid: string }>;
  line: { x2: number; y2: number };
  dot: { cx: number; cy: number };
};

const BadgeWrapEe: React.FC<{ rid: string }> = () => <IconBadgeEssentialEight />;
const BadgeWrapCis: React.FC<{ rid: string }> = () => <IconBadgeCis />;
const BadgeWrapIso: React.FC<{ rid: string }> = () => <IconBadgeIso />;
const BadgeWrapNist: React.FC<{ rid: string }> = () => <IconBadgeNist />;
const BadgeWrapApra: React.FC<{ rid: string }> = () => <IconBadgeApra />;
const BadgeWrapHealth: React.FC<{ rid: string }> = () => <IconBadgeHealthcare />;
const BadgeWrapIsm: React.FC<{ rid: string }> = () => <IconBadgeIsm />;

const NODE_SPECS: NodeSpec[] = [
  {
    key: "ee",
    left: 340,
    top: 30,
    label: "Essential Eight",
    floatDur: "5.0s",
    floatDelay: "0s",
    lineDelay: "0s",
    pulseDur: "5.0s",
    pulseBegin: "0s",
    Icon: BadgeWrapEe,
    line: { x2: 340, y2: 42 },
    dot: { cx: 340, cy: 66 },
  },
  {
    key: "cis",
    left: 559,
    top: 121,
    label: "CIS Benchmarks",
    floatDur: "5.3s",
    floatDelay: "0.6s",
    lineDelay: "0.4s",
    pulseDur: "5.3s",
    pulseBegin: "0.6s",
    Icon: BadgeWrapCis,
    line: { x2: 554, y2: 126 },
    dot: { cx: 554, cy: 126 },
  },
  {
    key: "iso",
    left: 650,
    top: 340,
    label: "ISO 27001",
    floatDur: "4.8s",
    floatDelay: "1.2s",
    lineDelay: "0.8s",
    pulseDur: "4.8s",
    pulseBegin: "1.2s",
    Icon: BadgeWrapIso,
    line: { x2: 638, y2: 340 },
    dot: { cx: 614, cy: 340 },
  },
  {
    key: "nist",
    left: 559,
    top: 559,
    label: "NIST CSF 2.0",
    floatDur: "5.6s",
    floatDelay: "1.8s",
    lineDelay: "1.2s",
    pulseDur: "5.6s",
    pulseBegin: "1.8s",
    Icon: BadgeWrapNist,
    line: { x2: 554, y2: 554 },
    dot: { cx: 554, cy: 554 },
  },
  {
    key: "apra",
    left: 340,
    top: 650,
    label: "APRA CPS 234",
    floatDur: "5.1s",
    floatDelay: "2.4s",
    lineDelay: "1.6s",
    pulseDur: "5.1s",
    pulseBegin: "2.4s",
    Icon: BadgeWrapApra,
    line: { x2: 340, y2: 638 },
    dot: { cx: 340, cy: 614 },
  },
  {
    key: "health",
    left: 121,
    top: 559,
    label: "Healthcare",
    floatDur: "4.7s",
    floatDelay: "0.4s",
    lineDelay: "2.0s",
    pulseDur: "4.7s",
    pulseBegin: "0.4s",
    Icon: BadgeWrapHealth,
    line: { x2: 126, y2: 554 },
    dot: { cx: 126, cy: 554 },
  },
  {
    key: "privacy",
    left: 30,
    top: 340,
    label: "Privacy (APP)",
    floatDur: "5.4s",
    floatDelay: "1.0s",
    lineDelay: "2.4s",
    pulseDur: "5.4s",
    pulseBegin: "1.0s",
    Icon: IconBadgePrivacyGlobe,
    line: { x2: 42, y2: 340 },
    dot: { cx: 66, cy: 340 },
  },
  {
    key: "ism",
    left: 121,
    top: 121,
    label: "ISM Essentials",
    floatDur: "4.9s",
    floatDelay: "1.6s",
    lineDelay: "2.8s",
    pulseDur: "4.9s",
    pulseBegin: "1.6s",
    Icon: BadgeWrapIsm,
    line: { x2: 126, y2: 126 },
    dot: { cx: 126, cy: 126 },
  },
];

function GlobeSvgLayer({ rid }: { rid: string }) {
  const sg = `${rid}-sg`;
  const sc = `${rid}-sc`;

  const connectors = NODE_SPECS.map((n) => ({
    ...n.line,
    delay: n.lineDelay,
  }));

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${SCENE} ${SCENE}`}
      fill="none"
      aria-hidden
      style={{ shapeRendering: "geometricPrecision" }}
    >
      <defs>
        <radialGradient id={sg} cx="32%" cy="26%" r="72%">
          <stop offset="0%" stopColor="#CBE4FF" />
          <stop offset="14%" stopColor="#6BAEED" />
          <stop offset="38%" stopColor="#2563EB" />
          <stop offset="65%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#060E2A" />
        </radialGradient>
        <clipPath id={sc}>
          <circle cx={CX} cy={CY} r={274} />
        </clipPath>
      </defs>

      <ellipse cx="344" cy="635" rx="200" ry="18" fill="#1D4ED8" opacity="0.07" />

      <circle className="hero-globe-circle" cx={CX} cy={CY} r={274} fill={`url(#${sg})`} />

      <g clipPath={`url(#${sc})`}>
        <g stroke="white" strokeWidth="0.5" opacity="0.19">
          <HorizontalMeshLines />
        </g>
        <g stroke="white" strokeWidth="0.5" opacity="0.19" transform={`rotate(60 ${CX} ${CY})`}>
          <HorizontalMeshLines />
        </g>
        <g stroke="white" strokeWidth="0.5" opacity="0.19" transform={`rotate(-60 ${CX} ${CY})`}>
          <HorizontalMeshLines />
        </g>
      </g>

      <ellipse cx="242" cy="192" rx="152" ry="92" fill="white" opacity="0.13" clipPath={`url(#${sc})`} />
      <ellipse cx="220" cy="167" rx="85" ry="55" fill="white" opacity="0.2" clipPath={`url(#${sc})`} />
      <ellipse cx="202" cy="148" rx="40" ry="27" fill="white" opacity="0.3" clipPath={`url(#${sc})`} />
      <ellipse cx="190" cy="136" rx="16" ry="11" fill="white" opacity="0.46" clipPath={`url(#${sc})`} />
      <ellipse cx="295" cy="546" rx="48" ry="9" fill="white" opacity="0.26" clipPath={`url(#${sc})`} transform="rotate(-16 295 546)" />
      <ellipse cx="295" cy="546" rx="24" ry="4" fill="white" opacity="0.4" clipPath={`url(#${sc})`} transform="rotate(-16 295 546)" />

      <circle cx={CX} cy={CY} r={274} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />

      {connectors.map((c, i) => (
        <line
          key={i}
          className="hero-conn-line"
          x1={CX}
          y1={CY}
          x2={c.x2}
          y2={c.y2}
          stroke="white"
          strokeWidth={1}
          strokeDasharray="4 5"
          style={{ animationDelay: c.delay }}
        />
      ))}

      {NODE_SPECS.map((n) => (
        <circle key={n.key} cx={n.dot.cx} cy={n.dot.cy} r={4} fill="white" opacity="0.6">
          <animate attributeName="r" values="3;5;3" dur={n.pulseDur} repeatCount="indefinite" begin={n.pulseBegin} />
        </circle>
      ))}

      {/* Single cloud — back + front layers only (globe-hero-final.html) */}
      <rect x="228" y="320" width="155" height="50" rx="25" fill="#7AAEE8" opacity="0.8" />
      <circle cx="256" cy="308" r="34" fill="#8DBCEF" opacity="0.85" />
      <circle cx="304" cy="296" r="43" fill="#A8CCF4" opacity="0.88" />
      <rect x="244" y="330" width="202" height="56" rx="28" fill="white" />
      <circle cx="278" cy="314" r="37" fill="#EEF5FF" />
      <circle cx="338" cy="299" r="50" fill="white" />
      <circle cx="394" cy="315" r="33" fill="#F2F7FF" />
      <rect x="244" y="330" width="202" height="56" rx="28" fill="none" stroke="rgba(190,218,255,0.55)" strokeWidth="1.2" />
      <circle cx="278" cy="314" r="37" fill="none" stroke="rgba(190,218,255,0.4)" strokeWidth="0.9" />
      <circle cx="338" cy="299" r="50" fill="none" stroke="rgba(190,218,255,0.4)" strokeWidth="0.9" />
      <ellipse cx="328" cy="283" rx="23" ry="13" fill="white" opacity="0.95" />
      <ellipse cx="280" cy="304" rx="13" ry="8" fill="white" opacity="0.8" />
    </svg>
  );
}

export const HeroFrameworkOrbitVisual: React.FC<{ className?: string }> = ({ className }) => {
  const rid = useId().replace(/:/g, "");

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[min(100%,680px)]", className)}>
      <style>{heroCss}</style>
      <div className="relative h-full w-full">
        <GlobeSvgLayer rid={rid} />
        {NODE_SPECS.map((n) => {
          const Icon = n.Icon;
          return (
            <div
              key={n.key}
              className="hero-fw-node"
              style={{
                left: `${(n.left / SCENE) * 100}%`,
                top: `${(n.top / SCENE) * 100}%`,
                animation: `hero-fw-float ${n.floatDur} ease-in-out infinite ${n.floatDelay}`,
              }}
            >
              <div className="hero-fw-badge">
                <Icon rid={rid} />
              </div>
              <div className="hero-fw-label">{n.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
