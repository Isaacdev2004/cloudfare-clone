/**
 * Framework globe hero — globe/mesh/connectors in SVG; cloud matches repo `cloud.html` (HTML/CSS layers).
 */
import React, { useId, useState } from "react";
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
  .hero-fw-node {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    transform: translate(-50%, -50%);
    z-index: 20;
    overflow: visible;
    -webkit-font-smoothing: antialiased;
  }
  button.hero-fw-badge {
    width: 62px;
    height: 62px;
    background: #ffffff;
    border-radius: 18px;
    border: 1.5px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    position: relative;
    cursor: pointer;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    appearance: none;
    -webkit-appearance: none;
    overflow: visible;
    isolation: isolate;
  }
  button.hero-fw-badge > svg {
    position: relative;
    z-index: 0;
    flex-shrink: 0;
  }
  button.hero-fw-badge:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #2563EB;
  }
  .hero-fw-node:hover button.hero-fw-badge {
    border-color: #1D4ED8;
    /* 1.04 keeps outer edge inside scene after translate(-50%,-50%) on near-edge nodes */
    transform: scale(1.04);
  }
  button.hero-fw-badge[aria-pressed="true"] {
    border-color: #2563eb;
  }
  /*
   * Inner-edge accent toward globe center. Vertical edges use top/bottom insets = border-radius (18px)
   * so the bar sits on the *flat* side of the rounded rect (ISO left / Privacy right were clipping before).
   */
  button.hero-fw-badge.hero-fw-badge--active::after {
    content: "";
    position: absolute;
    pointer-events: none;
    z-index: 4;
    background: #1d4ed8;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.65);
  }
  button.hero-fw-badge.hero-fw-badge--active.hero-fw-badge--edge-left::after {
    left: 2px;
    top: 18px;
    bottom: 18px;
    width: 5px;
    height: auto;
  }
  button.hero-fw-badge.hero-fw-badge--active.hero-fw-badge--edge-right::after {
    right: 2px;
    top: 18px;
    bottom: 18px;
    width: 5px;
    height: auto;
  }
  button.hero-fw-badge.hero-fw-badge--active.hero-fw-badge--edge-top::after {
    top: 2px;
    left: 18px;
    right: 18px;
    height: 5px;
    width: auto;
  }
  button.hero-fw-badge.hero-fw-badge--active.hero-fw-badge--edge-bottom::after {
    bottom: 2px;
    left: 18px;
    right: 18px;
    height: 5px;
    width: auto;
  }
  .hero-fw-label {
    font-size: 9px;
    font-weight: 700;
    color: #475569;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 0.02em;
    pointer-events: none;
    background: none;
    padding: 0;
    border-radius: 0;
    -webkit-font-smoothing: antialiased;
  }
  .hero-globe-circle { animation: hero-globe-breathe 4s ease-in-out infinite; }

  /* ── Cloud from cloud.html: pill + bumps + masks (accent dots removed) ── */
  .hero-cloud-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(220px, 32vw);
    max-width: 88%;
    aspect-ratio: 220 / 130;
    z-index: 12;
    pointer-events: none;
    overflow: visible;
  }
  .hero-cloud-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
  .hero-cloud-outer {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .hero-cloud-body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 53.846%;
    background: #fff;
    border-radius: 999px;
    box-shadow: 0 0 0 4px #2563eb, 0 0 0 7px #bfdbfe;
  }
  .hero-cloud-bump {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #2563eb, 0 0 0 7px #bfdbfe;
  }
  .hero-cloud-bump1 { width: 34.091%; aspect-ratio: 1; bottom: 30.769%; left: 13.636%; }
  .hero-cloud-bump2 { width: 43.182%; aspect-ratio: 1; bottom: 30.769%; left: 34.091%; }
  .hero-cloud-bump3 { width: 27.273%; aspect-ratio: 1; bottom: 30.769%; right: 12.727%; }
  .hero-cloud-body-over {
    position: absolute;
    bottom: 0;
    left: 1.818%;
    right: 1.818%;
    height: 52.308%;
    background: #fff;
    border-radius: 32px;
    z-index: 2;
  }
  .hero-cloud-bump-mask {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    z-index: 2;
  }
  .hero-cloud-bump-mask1 { width: 29.545%; aspect-ratio: 1; bottom: 33.846%; left: 15.455%; }
  .hero-cloud-bump-mask2 { width: 38.636%; aspect-ratio: 1; bottom: 33.846%; left: 35.909%; }
  .hero-cloud-bump-mask3 { width: 22.727%; aspect-ratio: 1; bottom: 33.846%; right: 14.545%; }
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
    <svg
      width={36}
      height={36}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{ shapeRendering: "geometricPrecision", transform: "translateX(-1px)" }}
    >
      <rect x="5" y="3" width="28" height="35" rx="4" fill="#1E3A8A" stroke="#172554" strokeWidth="0.75" />
      <polygon points="25,3 33,11 25,11" fill="#1D4ED8" />
      <rect x="10" y="16" width="14" height="2.5" rx="1.25" fill="#E4EAFA" opacity="0.85" />
      <rect x="10" y="22" width="18" height="2" rx="1" fill="#E4EAFA" opacity="0.6" />
      <rect x="10" y="28" width="13" height="2" rx="1" fill="#E4EAFA" opacity="0.6" />
      <circle cx="35" cy="35" r="11" fill="#1D4ED8" stroke="#E4EAFA" strokeWidth="1.5" />
      <polyline points="29,35 33,39 42,28" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
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

/** Wireframe globe — light blue fill only (no near-white) to avoid fringing on white badges */
function IconBadgePrivacyGlobe({ rid: _rid }: { rid: string }) {
  void _rid;
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{ shapeRendering: "geometricPrecision", transform: "translateX(1px)" }}
    >
      <circle cx="24" cy="24" r="19" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.9" />
      <ellipse cx="24" cy="24" rx="17.5" ry="6.2" fill="none" stroke="#1D4ED8" strokeWidth="1.15" />
      <ellipse cx="24" cy="24" rx="17.5" ry="11.5" fill="none" stroke="#1D4ED8" strokeWidth="1" opacity="0.88" />
      <line x1="24" y1="5.5" x2="24" y2="42.5" stroke="#1D4ED8" strokeWidth="1.15" strokeLinecap="round" />
      <path
        d="M 8.5 24 Q 24 14 39.5 24 Q 24 34 8.5 24"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.9"
      />
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
  Icon: React.ComponentType<{ rid: string }>;
  line: { x2: number; y2: number };
};

const BadgeWrapEe: React.FC<{ rid: string }> = () => <IconBadgeEssentialEight />;
const BadgeWrapCis: React.FC<{ rid: string }> = () => <IconBadgeCis />;
const BadgeWrapIso: React.FC<{ rid: string }> = () => <IconBadgeIso />;
const BadgeWrapNist: React.FC<{ rid: string }> = () => <IconBadgeNist />;
const BadgeWrapApra: React.FC<{ rid: string }> = () => <IconBadgeApra />;
const BadgeWrapHealth: React.FC<{ rid: string }> = () => <IconBadgeHealthcare />;
const BadgeWrapIsm: React.FC<{ rid: string }> = () => <IconBadgeIsm />;

/** Side of the badge tile that faces the globe center (for active-state inner accent). */
type InnerEdge = "left" | "right" | "top" | "bottom";

function innerEdgeFacingCenter(left: number, top: number): InnerEdge {
  const dx = CX - left;
  const dy = CY - top;
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx > 0 ? "right" : "left";
  }
  return dy > 0 ? "bottom" : "top";
}

const NODE_SPECS: NodeSpec[] = [
  {
    key: "ee",
    left: 340,
    top: 30,
    label: "Essential Eight",
    floatDur: "5.0s",
    floatDelay: "0s",
    Icon: BadgeWrapEe,
    line: { x2: 340, y2: 42 },
  },
  {
    key: "cis",
    left: 559,
    top: 121,
    label: "CIS Benchmarks",
    floatDur: "5.3s",
    floatDelay: "0.6s",
    Icon: BadgeWrapCis,
    line: { x2: 554, y2: 126 },
  },
  {
    key: "iso",
    left: 642,
    top: 340,
    label: "ISO 27001",
    floatDur: "4.8s",
    floatDelay: "1.2s",
    Icon: BadgeWrapIso,
    line: { x2: 630, y2: 340 },
  },
  {
    key: "nist",
    left: 559,
    top: 559,
    label: "NIST CSF 2.0",
    floatDur: "5.6s",
    floatDelay: "1.8s",
    Icon: BadgeWrapNist,
    line: { x2: 554, y2: 554 },
  },
  {
    key: "apra",
    left: 340,
    top: 650,
    label: "APRA CPS 234",
    floatDur: "5.1s",
    floatDelay: "2.4s",
    Icon: BadgeWrapApra,
    line: { x2: 340, y2: 638 },
  },
  {
    key: "health",
    left: 121,
    top: 559,
    label: "Healthcare",
    floatDur: "4.7s",
    floatDelay: "0.4s",
    Icon: BadgeWrapHealth,
    line: { x2: 126, y2: 554 },
  },
  {
    key: "privacy",
    left: 38,
    top: 340,
    label: "Privacy (APP)",
    floatDur: "5.4s",
    floatDelay: "1.0s",
    Icon: IconBadgePrivacyGlobe,
    line: { x2: 50, y2: 340 },
  },
  {
    key: "ism",
    left: 121,
    top: 121,
    label: "ISM Essentials",
    floatDur: "4.9s",
    floatDelay: "1.6s",
    Icon: BadgeWrapIsm,
    line: { x2: 126, y2: 126 },
  },
];

function HeroCloudFromHtml() {
  return (
    <div className="hero-cloud-card" aria-hidden>
      <div className="hero-cloud-wrap">
        <div className="hero-cloud-outer">
          <div className="hero-cloud-bump hero-cloud-bump1" />
          <div className="hero-cloud-bump hero-cloud-bump2" />
          <div className="hero-cloud-bump hero-cloud-bump3" />
          <div className="hero-cloud-body" />
          <div className="hero-cloud-bump-mask hero-cloud-bump-mask1" />
          <div className="hero-cloud-bump-mask hero-cloud-bump-mask2" />
          <div className="hero-cloud-bump-mask hero-cloud-bump-mask3" />
          <div className="hero-cloud-body-over" />
        </div>
      </div>
    </div>
  );
}

function GlobeSvgLayer({ rid }: { rid: string }) {
  const sg = `${rid}-sg`;
  const sc = `${rid}-sc`;

  const connectors = NODE_SPECS.map((n) => n.line);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${SCENE} ${SCENE}`}
      fill="none"
      aria-hidden
      style={{ shapeRendering: "geometricPrecision" }}
    >
      <defs>
        {/* Blue-only sphere: smooth light → dark blue, no white / off-white highlight */}
        <radialGradient id={sg} cx="32%" cy="28%" r="100%">
          <stop offset="0%" stopColor="#7EBBF2" />
          <stop offset="20%" stopColor="#5CA8EB" />
          <stop offset="40%" stopColor="#3B82F6" />
          <stop offset="58%" stopColor="#2563EB" />
          <stop offset="76%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#070D1A" />
        </radialGradient>
        <clipPath id={sc}>
          <circle cx={CX} cy={CY} r={274} />
        </clipPath>
      </defs>

      <circle className="hero-globe-circle" cx={CX} cy={CY} r={274} fill={`url(#${sg})`} />

      <g clipPath={`url(#${sc})`}>
        <g stroke="#BFDBFE" strokeWidth="0.5" opacity="0.22">
          <HorizontalMeshLines />
        </g>
        <g stroke="#BFDBFE" strokeWidth="0.5" opacity="0.22" transform={`rotate(60 ${CX} ${CY})`}>
          <HorizontalMeshLines />
        </g>
        <g stroke="#BFDBFE" strokeWidth="0.5" opacity="0.22" transform={`rotate(-60 ${CX} ${CY})`}>
          <HorizontalMeshLines />
        </g>
      </g>

      <circle cx={CX} cy={CY} r={274} fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="1.5" />

      {connectors.map((c, i) => (
        <line
          key={i}
          x1={CX}
          y1={CY}
          x2={c.x2}
          y2={c.y2}
          stroke="white"
          strokeWidth={1}
          strokeOpacity={0.38}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export const HeroFrameworkOrbitVisual: React.FC<{ className?: string }> = ({ className }) => {
  const rid = useId().replace(/:/g, "");
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[min(100%,680px)] overflow-visible", className)}>
      <style>{heroCss}</style>
      <div className="relative h-full w-full overflow-visible">
        <GlobeSvgLayer rid={rid} />
        <HeroCloudFromHtml />
        {NODE_SPECS.map((n) => {
          const Icon = n.Icon;
          const edge = innerEdgeFacingCenter(n.left, n.top);
          const active = activeKey === n.key;
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
              <button
                type="button"
                aria-pressed={active}
                aria-label={n.label}
                className={cn(
                  "hero-fw-badge",
                  active && "hero-fw-badge--active",
                  active && `hero-fw-badge--edge-${edge}`,
                )}
                onClick={() => setActiveKey((k) => (k === n.key ? null : n.key))}
              >
                <Icon rid={rid} />
              </button>
              <div className="hero-fw-label">{n.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
