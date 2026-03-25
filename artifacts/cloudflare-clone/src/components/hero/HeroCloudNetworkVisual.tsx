// Cloud network hero — plain central globe; perimeter icons + spokes; Apexlyn colors
import React, { useId } from "react";
import { cn } from "@/lib/utils";

const CSS = `
  @keyframes cf-bobFloat {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes cf-cloudPulse {
    0%,100% { transform: scale(1);    opacity: 1;   }
    50%      { transform: scale(1.05); opacity: 0.9; }
  }
  @keyframes cf-lineDraw {
    0%   { stroke-dashoffset: 180; opacity: 0;   }
    20%  { opacity: 1; }
    60%  { stroke-dashoffset: 0;   opacity: 1;   }
    90%  { stroke-dashoffset: 0;   opacity: 0.3; }
    100% { stroke-dashoffset: 0;   opacity: 0;   }
  }
  .cf-cloud-center {
    transform-origin: 160px 160px;
    animation: cf-cloudPulse 3s ease-in-out infinite;
  }
  .cf-network-svg {
    animation: cf-bobFloat 4s ease-in-out infinite;
  }
`;

const CX = 160,
  CY = 160,
  MESH_R = 118;
/** Orbit radius: even spacing from mesh edge; fits tallest/widest icons in 320×320 viewBox */
const ICON_R = MESH_R + 10;

type NetworkTheme = {
  iconStroke: string;
  packageCloudStroke: string;
  buildingFill: string;
  meshGrad: { off: string; color: string; opacity: string }[];
  dropShadow: string;
  motionStroke: string;
  cloudOutline: string;
  cloudInnerStroke: string;
  iconCloudFill: string;
};

const THEME_LIGHT: NetworkTheme = {
  iconStroke: "#1E3A8A",
  packageCloudStroke: "#60a5fa",
  buildingFill: "#bfdbfe",
  meshGrad: [
    { off: "0%", color: "#e0f2fe", opacity: "0.98" },
    { off: "55%", color: "#93c5fd", opacity: "0.78" },
    { off: "100%", color: "#60a5fa", opacity: "0.52" },
  ],
  dropShadow: "rgba(30, 144, 255, 0.32)",
  motionStroke: "#1E90FF",
  cloudOutline: "#1E3A8A",
  cloudInnerStroke: "#93c5fd",
  iconCloudFill: "#ffffff",
};

const THEME_DARK: NetworkTheme = {
  iconStroke: "#1E90FF",
  packageCloudStroke: "#7dd3fc",
  buildingFill: "rgba(30, 144, 255, 0.28)",
  meshGrad: [
    { off: "0%", color: "#38bdf8", opacity: "0.42" },
    { off: "58%", color: "#1E3A8A", opacity: "0.62" },
    { off: "100%", color: "#0B1320", opacity: "0.88" },
  ],
  dropShadow: "rgba(30, 144, 255, 0.5)",
  motionStroke: "#60a5fa",
  cloudOutline: "#1E90FF",
  cloudInnerStroke: "rgba(147, 197, 253, 0.55)",
  iconCloudFill: "#ffffff",
};

function polarPt(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

/** Six icons at equal 60° steps (polarPt: 0° = top of circle) */
const ICON_POSITIONS = [
  { angle: 0, label: "cloud2" as const },
  { angle: 60, label: "globe" as const },
  { angle: 120, label: "package" as const },
  { angle: 180, label: "home" as const },
  { angle: 240, label: "building" as const },
  { angle: 300, label: "user" as const },
];

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

/** Plain globe: outer + inner ring only (no graticule) */
function GlobeIcon({ x, y, stroke, fill }: { x: number; y: number; stroke: string; fill: string }) {
  const r = 18;
  return (
    <g>
      <circle cx={x} cy={y} r={r + 3} fill={fill} stroke={stroke} strokeWidth="2" />
      <circle cx={x} cy={y} r={r} fill="none" stroke={stroke} strokeWidth="2" />
    </g>
  );
}

function BuildingIcon({ x, y, stroke, windowFill }: { x: number; y: number; stroke: string; windowFill: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-16" y="-20" width="32" height="40" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
      {[
        [-8, -16],
        [4, -16],
        [-8, -6],
        [4, -6],
      ].map(([px, py], i) => (
        <rect key={i} x={px} y={py} width="8" height="7" rx="1" fill={windowFill} stroke={stroke} strokeWidth="1" />
      ))}
      {[
        [-10, 22, 7, 16],
        [-1, 16, 7, 22],
        [8, 10, 7, 28],
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
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-22" y="-8" width="44" height="34" rx="3" fill={t.iconCloudFill} stroke={t.iconStroke} strokeWidth="2" />
      <rect x="-12" y={0} width="12" height="12" rx="2" fill="none" stroke={t.iconStroke} strokeWidth="1.8" />
      <line x1="-22" y1={5} x2="22" y2={5} stroke={t.iconStroke} strokeWidth="1.4" />
      <CloudIcon x={0} y={-30} size={30} stroke={t.packageCloudStroke} fill={t.iconCloudFill} />
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
        <svg
          className="cf-network-svg h-full w-full"
          viewBox="0 0 320 320"
          aria-hidden
        >
          <defs>
            <radialGradient id={`${rid}-meshBg`} cx="50%" cy="50%" r="50%">
              {t.meshGrad.map((s, i) => (
                <stop key={i} offset={s.off} stopColor={s.color} stopOpacity={s.opacity} />
              ))}
            </radialGradient>
            <filter id={`${rid}-cloudDrop`}>
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={t.dropShadow} />
            </filter>
          </defs>

          {/* Plain globe: smooth fill only (no mesh, ripples, or inner nodes) */}
          <circle cx={CX} cy={CY} r={MESH_R} fill={`url(#${rid}-meshBg)`} />

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
