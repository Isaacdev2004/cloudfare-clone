// Cloudflare-style circular mesh globe — colors match Apexlyn tokens (index.css)
import React, { useId } from "react";
import { cn } from "@/lib/utils";

const CSS = `
  @keyframes cf-bobFloat {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes cf-spinDash {
    to { transform: rotate(360deg); }
  }
  @keyframes cf-cloudPulse {
    0%,100% { transform: scale(1);    opacity: 1;   }
    50%      { transform: scale(1.05); opacity: 0.9; }
  }
  @keyframes cf-ripple {
    0%   { r: 52;  opacity: 0.65; stroke-width: 1.5; }
    100% { r: 135; opacity: 0;    stroke-width: 0.5; }
  }
  @keyframes cf-lineDraw {
    0%   { stroke-dashoffset: 180; opacity: 0;   }
    20%  { opacity: 1; }
    60%  { stroke-dashoffset: 0;   opacity: 1;   }
    90%  { stroke-dashoffset: 0;   opacity: 0.3; }
    100% { stroke-dashoffset: 0;   opacity: 0;   }
  }
  @keyframes cf-nodePop {
    0%,100% { transform: scale(1);   opacity: 0.7; }
    50%      { transform: scale(1.5); opacity: 1;   }
  }
  @keyframes cf-colorDotBlink {
    0%,100% { r: 2.5; opacity: 0.3; }
    50%      { r: 4.5; opacity: 1;   }
  }
  .cf-dash-ring {
    transform-origin: 160px 160px;
    animation: cf-spinDash 30s linear infinite;
  }
  .cf-cloud-center {
    transform-origin: 160px 158px;
    animation: cf-cloudPulse 3s ease-in-out infinite;
  }
  .cf-network-svg {
    animation: cf-bobFloat 4s ease-in-out infinite;
  }
`;

const CX = 160,
  CY = 160,
  MESH_R = 118;

/** Light cards (compact) vs navy hero */
type NetworkTheme = {
  iconStroke: string;
  packageCloudStroke: string;
  buildingFill: string;
  diamondBorder: string;
  meshGrad: { off: string; color: string; opacity: string }[];
  dropShadow: string;
  dashRing: string;
  meshEdge: string;
  meshEdgeOpacity: number;
  motionStroke: string;
  cloudOutline: string;
  cloudInnerStroke: string;
  iconCloudFill: string;
  nodeFills: string[];
  accentFills: string[];
};

const THEME_LIGHT: NetworkTheme = {
  iconStroke: "#1E3A8A",
  packageCloudStroke: "#60a5fa",
  buildingFill: "#bfdbfe",
  diamondBorder: "#1E90FF",
  meshGrad: [
    { off: "0%", color: "#e0f2fe", opacity: "0.98" },
    { off: "55%", color: "#93c5fd", opacity: "0.78" },
    { off: "100%", color: "#60a5fa", opacity: "0.52" },
  ],
  dropShadow: "rgba(30, 144, 255, 0.32)",
  dashRing: "#cbd5e1",
  meshEdge: "#1E3A8A",
  meshEdgeOpacity: 0.26,
  motionStroke: "#1E90FF",
  cloudOutline: "#1E3A8A",
  cloudInnerStroke: "#93c5fd",
  iconCloudFill: "#ffffff",
  nodeFills: ["#1E90FF", "#F5B700", "#1F8A70", "#60a5fa", "#D64545"],
  accentFills: ["#1E90FF", "#1F8A70", "#60a5fa", "#F5B700", "#a78bfa"],
};

const THEME_DARK: NetworkTheme = {
  iconStroke: "#1E90FF",
  packageCloudStroke: "#7dd3fc",
  buildingFill: "rgba(30, 144, 255, 0.28)",
  diamondBorder: "#1E90FF",
  meshGrad: [
    { off: "0%", color: "#38bdf8", opacity: "0.42" },
    { off: "58%", color: "#1E3A8A", opacity: "0.62" },
    { off: "100%", color: "#0B1320", opacity: "0.88" },
  ],
  dropShadow: "rgba(30, 144, 255, 0.5)",
  dashRing: "rgba(148, 163, 184, 0.48)",
  meshEdge: "#7dd3fc",
  meshEdgeOpacity: 0.38,
  motionStroke: "#60a5fa",
  cloudOutline: "#1E90FF",
  cloudInnerStroke: "rgba(147, 197, 253, 0.55)",
  iconCloudFill: "#ffffff",
  nodeFills: ["#1E90FF", "#F5B700", "#34d399", "#60a5fa", "#a78bfa"],
  accentFills: ["#1E90FF", "#34d399", "#60a5fa", "#F5B700", "#a78bfa"],
};

function polarPt(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function ringPoints(cx: number, cy: number, r: number, count: number, startAngle = 0): [number, number][] {
  return Array.from({ length: count }, (_, i) => polarPt(cx, cy, r, startAngle + (360 / count) * i));
}

function ringEdges(pts: [number, number][]): [[number, number], [number, number]][] {
  return pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
}

function crossEdges(
  ring1: [number, number][],
  ring2: [number, number][],
): [[number, number], [number, number]][] {
  const edges: [[number, number], [number, number]][] = [];
  const ratio = ring2.length / ring1.length;
  ring1.forEach((p, i) => {
    const j = Math.round(i * ratio) % ring2.length;
    edges.push([p, ring2[j]]);
    edges.push([p, ring2[(j + 1) % ring2.length]]);
  });
  return edges;
}

const outerPts = ringPoints(CX, CY, MESH_R, 12, 0);
const midPts = ringPoints(CX, CY, MESH_R * 0.62, 10, 18);
const innerPts = ringPoints(CX, CY, MESH_R * 0.32, 7, 10);
const CENTER: [number, number] = [CX, CY];

const ALL_EDGES: [[number, number], [number, number]][] = [
  ...ringEdges(outerPts),
  ...ringEdges(midPts),
  ...ringEdges(innerPts),
  ...crossEdges(outerPts, midPts),
  ...crossEdges(midPts, innerPts),
  ...innerPts.map((p) => [p, CENTER] as [[number, number], [number, number]]),
];

const ICON_POSITIONS = [
  { angle: 340, label: "cloud2" as const },
  { angle: 60, label: "globe" as const },
  { angle: 130, label: "package" as const },
  { angle: 210, label: "home" as const },
  { angle: 265, label: "building" as const },
  { angle: 300, label: "user" as const },
];
const ICON_R = MESH_R + 28;

const SPOKES = ICON_POSITIONS.map((ip, i) => {
  const [x2, y2] = polarPt(CX, CY, MESH_R - 10, ip.angle);
  return { x1: CX, y1: CY, x2, y2, delay: `${i * 0.55}s` };
});

function CloudIcon({
  x,
  y,
  size = 44,
  stroke,
  fill,
}: {
  x: number;
  y: number;
  size?: number;
  stroke: string;
  fill: string;
}) {
  const s = size / 44;
  return (
    <g transform={`translate(${x - size / 2},${y - size / 2}) scale(${s})`}>
      <rect x="4" y="22" width="36" height="18" rx="9" fill={fill} stroke={stroke} strokeWidth="2.2" />
      <circle cx="12" cy="22" r="9" fill={fill} stroke={stroke} strokeWidth="2.2" />
      <circle cx="22" cy="16" r="12" fill={fill} stroke={stroke} strokeWidth="2.2" />
      <circle cx="33" cy="21" r="8" fill={fill} stroke={stroke} strokeWidth="2.2" />
    </g>
  );
}

function GlobeIcon({ x, y, stroke, fill }: { x: number; y: number; stroke: string; fill: string }) {
  const r = 18;
  return (
    <g>
      <circle cx={x} cy={y} r={r + 3} fill={fill} stroke={stroke} strokeWidth="2" />
      <circle cx={x} cy={y} r={r} fill="none" stroke={stroke} strokeWidth="2" />
      <ellipse cx={x} cy={y} rx={r * 0.5} ry={r} fill="none" stroke={stroke} strokeWidth="1.5" />
      <line x1={x - r} y1={y} x2={x + r} y2={y} stroke={stroke} strokeWidth="1.5" />
      <line x1={x - r + 3} y1={y - r * 0.5} x2={x + r - 3} y2={y - r * 0.5} stroke={stroke} strokeWidth="1" />
      <line x1={x - r + 3} y1={y + r * 0.5} x2={x + r - 3} y2={y + r * 0.5} stroke={stroke} strokeWidth="1" />
    </g>
  );
}

function BuildingIcon({ x, y, stroke, windowFill }: { x: number; y: number; stroke: string; windowFill: string }) {
  const bx = x - 20,
    by = y - 26;
  return (
    <g transform={`translate(${bx},${by})`}>
      <rect x="4" y="0" width="32" height="40" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
      {[
        [8, 4],
        [20, 4],
        [8, 14],
        [20, 14],
      ].map(([px, py], i) => (
        <rect key={i} x={px} y={py} width="8" height="7" rx="1" fill={windowFill} stroke={stroke} strokeWidth="1" />
      ))}
      {[
        [-2, 40, 7, 18],
        [8, 34, 7, 24],
        [17, 28, 7, 30],
      ].map(([px, py, w, h], i) => (
        <rect key={i} x={px} y={py} width={w} height={h} fill="none" stroke={stroke} strokeWidth="1.5" />
      ))}
    </g>
  );
}

function UserIcon({ x, y, stroke, fill }: { x: number; y: number; stroke: string; fill: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={21} fill={fill} stroke={stroke} strokeWidth="2" />
      <circle cx={x} cy={y - 5} r={7} fill="none" stroke={stroke} strokeWidth="1.8" />
      <path
        d={`M${x - 13},${y + 13} Q${x - 13},${y + 4} ${x},${y + 4} Q${x + 13},${y + 4} ${x + 13},${y + 13}`}
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  );
}

function HomeIcon({ x, y, stroke, fill }: { x: number; y: number; stroke: string; fill: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={21} fill={fill} stroke={stroke} strokeWidth="2" />
      <polygon points={`${x},${y - 12} ${x - 13},${y - 2} ${x + 13},${y - 2}`} fill="none" stroke={stroke} strokeWidth="1.8" />
      <rect x={x - 9} y={y - 2} width="18" height="14" rx="1" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x={x - 5} y={y + 2} width="10" height="10" rx="1" fill="none" stroke={stroke} strokeWidth="1.5" />
    </g>
  );
}

function PackageIcon({ x, y, t }: { x: number; y: number; t: NetworkTheme }) {
  return (
    <g>
      <rect x={x - 22} y={y - 16} width="44" height="34" rx="3" fill={t.iconCloudFill} stroke={t.iconStroke} strokeWidth="2" />
      <rect x={x - 12} y={y - 8} width="12" height="12" rx="2" fill="none" stroke={t.iconStroke} strokeWidth="1.8" />
      <line x1={x - 22} y1={y - 3} x2={x + 22} y2={y - 3} stroke={t.iconStroke} strokeWidth="1.4" />
      <CloudIcon x={x} y={y - 22} size={30} stroke={t.packageCloudStroke} fill={t.iconCloudFill} />
    </g>
  );
}

function renderIcon(label: (typeof ICON_POSITIONS)[number]["label"], x: number, y: number, t: NetworkTheme) {
  switch (label) {
    case "cloud2":
      return <CloudIcon x={x} y={y} stroke={t.iconStroke} fill={t.iconCloudFill} />;
    case "globe":
      return <GlobeIcon x={x} y={y} stroke={t.iconStroke} fill={t.iconCloudFill} />;
    case "building":
      return <BuildingIcon x={x} y={y} stroke={t.iconStroke} windowFill={t.buildingFill} />;
    case "user":
      return <UserIcon x={x} y={y} stroke={t.iconStroke} fill={t.iconCloudFill} />;
    case "home":
      return <HomeIcon x={x} y={y} stroke={t.iconStroke} fill={t.iconCloudFill} />;
    case "package":
      return <PackageIcon x={x} y={y} t={t} />;
    default:
      return null;
  }
}

export const HeroCloudNetworkVisual: React.FC<{ className?: string; compact?: boolean }> = ({
  className,
  compact = false,
}) => {
  const rid = useId().replace(/:/g, "");
  const t = compact ? THEME_LIGHT : THEME_DARK;
  const maxSize = compact ? 352 : 412;

  const accentDots = [
    { cx: CX + MESH_R + 14, cy: CY - 30, fill: t.accentFills[0], d: "0s" },
    { cx: CX - MESH_R - 10, cy: CY + 20, fill: t.accentFills[1], d: "0.3s" },
    { cx: CX + 20, cy: CY - MESH_R - 16, fill: t.accentFills[2], d: "0.6s" },
    { cx: CX - 25, cy: CY + MESH_R + 12, fill: t.accentFills[3], d: "0.9s" },
    { cx: CX + MESH_R + 5, cy: CY + 45, fill: t.accentFills[4], d: "1.2s" },
  ];

  const nodeDots = [
    { cx: CX, cy: CY - MESH_R * 0.62, fill: t.nodeFills[0], delay: "0s" },
    ...midPts.slice(0, 4).map((p, i) => ({
      cx: p[0],
      cy: p[1],
      fill: t.nodeFills[i + 1],
      delay: `${i * 0.4}s`,
    })),
  ];

  return (
    <>
      <style>{CSS}</style>
      <div
        className={cn(
          "relative mx-auto flex aspect-square w-full items-center justify-center",
          className,
        )}
        style={{ maxWidth: maxSize, maxHeight: maxSize }}
      >
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 10,
            width: 11,
            height: 11,
            border: `1.5px solid ${t.diamondBorder}`,
            transform: "rotate(45deg)",
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: 10,
            width: 11,
            height: 11,
            border: `1.5px solid ${t.diamondBorder}`,
            transform: "rotate(45deg)",
            opacity: 0.45,
          }}
        />

        <svg className="cf-network-svg h-full w-full" viewBox="0 0 320 320" aria-hidden>
          <defs>
            <radialGradient id={`${rid}-meshBg`} cx="50%" cy="50%" r="50%">
              {t.meshGrad.map((s, i) => (
                <stop key={i} offset={s.off} stopColor={s.color} stopOpacity={s.opacity} />
              ))}
            </radialGradient>
            <clipPath id={`${rid}-circleClip`}>
              <circle cx={CX} cy={CY} r={MESH_R} />
            </clipPath>
            <filter id={`${rid}-cloudDrop`}>
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={t.dropShadow} />
            </filter>
          </defs>

          <circle
            className="cf-dash-ring"
            cx={CX}
            cy={CY}
            r={MESH_R + 16}
            fill="none"
            stroke={t.dashRing}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />

          {accentDots.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={4}
              fill={d.fill}
              style={{
                animation: "cf-colorDotBlink 2s ease-in-out infinite",
                animationDelay: d.d,
              }}
            />
          ))}

          <circle cx={CX} cy={CY} r={MESH_R} fill={`url(#${rid}-meshBg)`} />

          <g clipPath={`url(#${rid}-circleClip)`} stroke={t.meshEdge} strokeWidth="0.55" opacity={t.meshEdgeOpacity}>
            {ALL_EDGES.map(([a, b], i) => (
              <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
            ))}
          </g>

          <circle
            cx={CX}
            cy={CY}
            r={52}
            fill="none"
            stroke={t.motionStroke}
            strokeWidth="1.2"
            style={{ animation: "cf-ripple 3s ease-out infinite" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r={52}
            fill="none"
            stroke={t.motionStroke}
            strokeWidth="0.8"
            style={{ animation: "cf-ripple 3s ease-out infinite", animationDelay: "1.1s" }}
          />

          {SPOKES.map((s, i) => (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke={t.motionStroke}
              strokeWidth="1.4"
              strokeDasharray="180"
              strokeDashoffset="180"
              style={{
                animation: "cf-lineDraw 3.5s ease-in-out infinite",
                animationDelay: s.delay,
              }}
            />
          ))}

          {nodeDots.map((n, i) => (
            <g
              key={i}
              style={{
                transformOrigin: `${n.cx}px ${n.cy}px`,
                animation: "cf-nodePop 2s ease-in-out infinite",
                animationDelay: n.delay,
              }}
            >
              <circle cx={n.cx} cy={n.cy} r={5} fill={n.fill} />
            </g>
          ))}

          {[0, 0.3, 0.6].map((delay, i) => {
            const [ex, ey] = polarPt(CX, CY, MESH_R - 12, 60);
            return (
              <circle
                key={`a-${i}`}
                cx={CX + (ex - CX) * 0.35 * (i + 1)}
                cy={CY + (ey - CY) * 0.35 * (i + 1)}
                r={3.5}
                fill={t.motionStroke}
                style={{
                  animation: "cf-colorDotBlink 1.6s ease-in-out infinite",
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
          {[0, 0.3, 0.6].map((delay, i) => {
            const [ex, ey] = polarPt(CX, CY, MESH_R - 12, 265);
            return (
              <circle
                key={`b-${i}`}
                cx={CX + (ex - CX) * 0.35 * (i + 1)}
                cy={CY + (ey - CY) * 0.35 * (i + 1)}
                r={3.5}
                fill={t.motionStroke}
                style={{
                  animation: "cf-colorDotBlink 1.6s ease-in-out infinite",
                  animationDelay: `${delay + 0.5}s`,
                }}
              />
            );
          })}

          {ICON_POSITIONS.map((ip, i) => {
            const [ix, iy] = polarPt(CX, CY, ICON_R, ip.angle);
            return <g key={i}>{renderIcon(ip.label, ix, iy, t)}</g>;
          })}

          <g className="cf-cloud-center" filter={`url(#${rid}-cloudDrop)`}>
            <rect x="86" y="145" width="148" height="54" rx="27" fill={t.iconCloudFill} stroke={t.cloudOutline} strokeWidth="2.8" />
            <circle cx="114" cy="145" r="27" fill={t.iconCloudFill} stroke={t.cloudOutline} strokeWidth="2.8" />
            <circle cx="148" cy="128" r="37" fill={t.iconCloudFill} stroke={t.cloudOutline} strokeWidth="2.8" />
            <circle cx="184" cy="141" r="25" fill={t.iconCloudFill} stroke={t.cloudOutline} strokeWidth="2.8" />
            <rect x="94" y="152" width="132" height="40" rx="20" fill={t.iconCloudFill} stroke={t.cloudInnerStroke} strokeWidth="1.2" />
          </g>
        </svg>
      </div>
    </>
  );
};
