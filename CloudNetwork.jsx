// CloudNetwork.jsx  — Cloudflare-accurate circular mesh globe
// Usage: <CloudNetwork />
// No external dependencies — pure React + inline SVG + CSS keyframes

import React from "react";

/* ─── CSS keyframes ─── */
const CSS = `
  @keyframes bobFloat {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes spinDash {
    to { transform: rotate(360deg); }
  }
  @keyframes cloudPulse {
    0%,100% { transform: scale(1);    opacity: 1;   }
    50%      { transform: scale(1.05); opacity: 0.9; }
  }
  @keyframes ripple {
    0%   { r: 52;  opacity: 0.65; stroke-width: 1.5; }
    100% { r: 135; opacity: 0;    stroke-width: 0.5; }
  }
  @keyframes lineDraw {
    0%   { stroke-dashoffset: 180; opacity: 0;   }
    20%  { opacity: 1; }
    60%  { stroke-dashoffset: 0;   opacity: 1;   }
    90%  { stroke-dashoffset: 0;   opacity: 0.3; }
    100% { stroke-dashoffset: 0;   opacity: 0;   }
  }
  @keyframes nodePop {
    0%,100% { transform: scale(1);   opacity: 0.7; }
    50%      { transform: scale(1.5); opacity: 1;   }
  }
  @keyframes colorDotBlink {
    0%,100% { r: 2.5; opacity: 0.3; }
    50%      { r: 4.5; opacity: 1;   }
  }
  .cf-dash-ring {
    transform-origin: 160px 160px;
    animation: spinDash 30s linear infinite;
  }
  .cf-cloud-center {
    transform-origin: 160px 158px;
    animation: cloudPulse 3s ease-in-out infinite;
  }
  .cf-network-svg {
    animation: bobFloat 4s ease-in-out infinite;
  }
`;

/* ─── Geometry helpers ─── */
const CX = 160, CY = 160, MESH_R = 118;

function polarPt(cx, cy, r, angleDeg) {
  const a = (angleDeg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function ringPoints(cx, cy, r, count, startAngle = 0) {
  return Array.from({ length: count }, (_, i) =>
    polarPt(cx, cy, r, startAngle + (360 / count) * i)
  );
}

function ringEdges(pts) {
  return pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
}

function crossEdges(ring1, ring2) {
  const edges = [];
  const ratio = ring2.length / ring1.length;
  ring1.forEach((p, i) => {
    const j = Math.round(i * ratio) % ring2.length;
    edges.push([p, ring2[j]]);
    edges.push([p, ring2[(j + 1) % ring2.length]]);
  });
  return edges;
}

const outerPts = ringPoints(CX, CY, MESH_R,        12, 0);
const midPts   = ringPoints(CX, CY, MESH_R * 0.62, 10, 18);
const innerPts = ringPoints(CX, CY, MESH_R * 0.32,  7, 10);
const CENTER   = [CX, CY];

const ALL_EDGES = [
  ...ringEdges(outerPts),
  ...ringEdges(midPts),
  ...ringEdges(innerPts),
  ...crossEdges(outerPts, midPts),
  ...crossEdges(midPts, innerPts),
  ...innerPts.map(p => [p, CENTER]),
];

/* Icon positions matching Cloudflare's layout */
const ICON_POSITIONS = [
  { angle: 340, label: "cloud2"   },
  { angle:  60, label: "globe"    },
  { angle: 130, label: "package"  },
  { angle: 210, label: "home"     },
  { angle: 265, label: "building" },
  { angle: 300, label: "user"     },
];
const ICON_R = MESH_R + 28;

const SPOKES = ICON_POSITIONS.map((ip, i) => {
  const [x2, y2] = polarPt(CX, CY, MESH_R - 10, ip.angle);
  return { x1: CX, y1: CY, x2, y2, delay: `${i * 0.55}s` };
});

const NODE_DOTS = [
  { cx: CX, cy: CY - MESH_R * 0.62, fill: "#f97316", delay: "0s" },
  ...midPts.slice(0, 4).map((p, i) => ({
    cx: p[0], cy: p[1],
    fill: ["#eab308", "#22c55e", "#3b82f6", "#f43f5e"][i],
    delay: `${i * 0.4}s`,
  })),
];

const ACCENT_DOTS = [
  { cx: CX + MESH_R + 14, cy: CY - 30,         fill: "#f97316", d: "0s"   },
  { cx: CX - MESH_R - 10, cy: CY + 20,          fill: "#22c55e", d: "0.3s" },
  { cx: CX + 20,          cy: CY - MESH_R - 16, fill: "#3b82f6", d: "0.6s" },
  { cx: CX - 25,          cy: CY + MESH_R + 12, fill: "#eab308", d: "0.9s" },
  { cx: CX + MESH_R + 5,  cy: CY + 45,          fill: "#a855f7", d: "1.2s" },
];

/* ─── Icons ─── */
function CloudIcon({ x, y, size = 44, stroke = "#f97316" }) {
  const s = size / 44;
  return (
    <g transform={`translate(${x - size / 2},${y - size / 2}) scale(${s})`}>
      <rect x="4"  y="22" width="36" height="18" rx="9"  fill="white" stroke={stroke} strokeWidth="2.2" />
      <circle cx="12" cy="22" r="9"  fill="white" stroke={stroke} strokeWidth="2.2" />
      <circle cx="22" cy="16" r="12" fill="white" stroke={stroke} strokeWidth="2.2" />
      <circle cx="33" cy="21" r="8"  fill="white" stroke={stroke} strokeWidth="2.2" />
    </g>
  );
}

function GlobeIcon({ x, y }) {
  const r = 18;
  return (
    <g>
      <circle cx={x} cy={y} r={r + 3} fill="white" stroke="#f97316" strokeWidth="2" />
      <circle cx={x} cy={y} r={r}     fill="none"  stroke="#f97316" strokeWidth="2" />
      <ellipse cx={x} cy={y} rx={r * 0.5} ry={r} fill="none" stroke="#f97316" strokeWidth="1.5" />
      <line x1={x - r} y1={y}              x2={x + r} y2={y}              stroke="#f97316" strokeWidth="1.5" />
      <line x1={x - r + 3} y1={y - r * 0.5} x2={x + r - 3} y2={y - r * 0.5} stroke="#f97316" strokeWidth="1" />
      <line x1={x - r + 3} y1={y + r * 0.5} x2={x + r - 3} y2={y + r * 0.5} stroke="#f97316" strokeWidth="1" />
    </g>
  );
}

function BuildingIcon({ x, y }) {
  const bx = x - 20, by = y - 26;
  return (
    <g transform={`translate(${bx},${by})`}>
      <rect x="4" y="0" width="32" height="40" rx="2" fill="none" stroke="#f97316" strokeWidth="2" />
      {[[8, 4], [20, 4], [8, 14], [20, 14]].map(([px, py], i) => (
        <rect key={i} x={px} y={py} width="8" height="7" rx="1" fill="#bfdbfe" stroke="#f97316" strokeWidth="1" />
      ))}
      {[[-2, 40, 7, 18], [8, 34, 7, 24], [17, 28, 7, 30]].map(([px, py, w, h], i) => (
        <rect key={i} x={px} y={py} width={w} height={h} fill="none" stroke="#f97316" strokeWidth="1.5" />
      ))}
    </g>
  );
}

function UserIcon({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r={21} fill="white" stroke="#f97316" strokeWidth="2" />
      <circle cx={x} cy={y - 5} r={7} fill="none" stroke="#f97316" strokeWidth="1.8" />
      <path d={`M${x-13},${y+13} Q${x-13},${y+4} ${x},${y+4} Q${x+13},${y+4} ${x+13},${y+13}`}
            fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  );
}

function HomeIcon({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r={21} fill="white" stroke="#f97316" strokeWidth="2" />
      <polygon points={`${x},${y-12} ${x-13},${y-2} ${x+13},${y-2}`} fill="none" stroke="#f97316" strokeWidth="1.8" />
      <rect x={x - 9} y={y - 2} width="18" height="14" rx="1" fill="none" stroke="#f97316" strokeWidth="1.5" />
      <rect x={x - 5} y={y + 2} width="10" height="10" rx="1" fill="none" stroke="#f97316" strokeWidth="1.5" />
    </g>
  );
}

function PackageIcon({ x, y }) {
  return (
    <g>
      <rect x={x-22} y={y-16} width="44" height="34" rx="3" fill="white" stroke="#f97316" strokeWidth="2" />
      <rect x={x-12} y={y-8}  width="12" height="12" rx="2" fill="none"  stroke="#f97316" strokeWidth="1.8" />
      <line x1={x-22} y1={y-3} x2={x+22} y2={y-3} stroke="#f97316" strokeWidth="1.4" />
      <CloudIcon x={x} y={y - 22} size={30} stroke="#fb923c" />
    </g>
  );
}

function renderIcon(label, x, y) {
  const map = { cloud2: CloudIcon, globe: GlobeIcon, building: BuildingIcon, user: UserIcon, home: HomeIcon, package: PackageIcon };
  const Icon = map[label];
  return Icon ? <Icon x={x} y={y} /> : null;
}

/* ─── Main export ─── */
export default function CloudNetwork() {
  const SIZE = 360;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>

        {/* corner diamonds */}
        <div style={{ position:"absolute",top:6,left:10,width:11,height:11,border:"1.5px solid #f97316",transform:"rotate(45deg)",opacity:0.45 }} />
        <div style={{ position:"absolute",bottom:6,right:10,width:11,height:11,border:"1.5px solid #f97316",transform:"rotate(45deg)",opacity:0.45 }} />

        <svg className="cf-network-svg" viewBox="0 0 320 320" width={SIZE} height={SIZE}>
          <defs>
            <radialGradient id="meshBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#fde9c8" stopOpacity="0.95" />
              <stop offset="70%"  stopColor="#fdba74" stopOpacity="0.7"  />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.55" />
            </radialGradient>
            <clipPath id="circleClip">
              <circle cx={CX} cy={CY} r={MESH_R} />
            </clipPath>
            <filter id="cloudDrop">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(249,115,22,0.3)" />
            </filter>
          </defs>

          {/* rotating dashed orbit ring */}
          <circle className="cf-dash-ring"
            cx={CX} cy={CY} r={MESH_R + 16}
            fill="none" stroke="#d1d5db" strokeWidth="1.4" strokeDasharray="5 5" />

          {/* accent dots outside ring */}
          {ACCENT_DOTS.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={4} fill={d.fill}
              style={{ animation:"colorDotBlink 2s ease-in-out infinite", animationDelay:d.d }} />
          ))}

          {/* filled circle body */}
          <circle cx={CX} cy={CY} r={MESH_R} fill="url(#meshBg)" />

          {/* geodesic mesh clipped to circle */}
          <g clipPath="url(#circleClip)" stroke="#e86a18" strokeWidth="0.55" opacity="0.38">
            {ALL_EDGES.map(([a, b], i) => (
              <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
            ))}
          </g>

          {/* ripple rings */}
          <circle cx={CX} cy={CY} r={52} fill="none" stroke="#f97316" strokeWidth="1.2"
            style={{ animation:"ripple 3s ease-out infinite" }} />
          <circle cx={CX} cy={CY} r={52} fill="none" stroke="#f97316" strokeWidth="0.8"
            style={{ animation:"ripple 3s ease-out infinite", animationDelay:"1.1s" }} />

          {/* animated spoke lines */}
          {SPOKES.map((s, i) => (
            <line key={i}
              x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
              stroke="#f97316" strokeWidth="1.4"
              strokeDasharray="180" strokeDashoffset="180"
              style={{ animation:"lineDraw 3.5s ease-in-out infinite", animationDelay:s.delay }} />
          ))}

          {/* node dots */}
          {NODE_DOTS.map((n, i) => (
            <g key={i} style={{ transformOrigin:`${n.cx}px ${n.cy}px`, animation:"nodePop 2s ease-in-out infinite", animationDelay:n.delay }}>
              <circle cx={n.cx} cy={n.cy} r={5} fill={n.fill} />
            </g>
          ))}

          {/* data-flow beads */}
          {[0, 0.3, 0.6].map((delay, i) => {
            const [ex, ey] = polarPt(CX, CY, MESH_R - 12, 60);
            return <circle key={i} cx={CX+(ex-CX)*0.35*(i+1)} cy={CY+(ey-CY)*0.35*(i+1)} r={3.5} fill="#f97316"
              style={{ animation:"colorDotBlink 1.6s ease-in-out infinite", animationDelay:`${delay}s` }} />;
          })}
          {[0, 0.3, 0.6].map((delay, i) => {
            const [ex, ey] = polarPt(CX, CY, MESH_R - 12, 265);
            return <circle key={i} cx={CX+(ex-CX)*0.35*(i+1)} cy={CY+(ey-CY)*0.35*(i+1)} r={3.5} fill="#f97316"
              style={{ animation:"colorDotBlink 1.6s ease-in-out infinite", animationDelay:`${delay+0.5}s` }} />;
          })}

          {/* icons around circumference */}
          {ICON_POSITIONS.map((ip, i) => {
            const [ix, iy] = polarPt(CX, CY, ICON_R, ip.angle);
            return <g key={i}>{renderIcon(ip.label, ix, iy)}</g>;
          })}

          {/* center cloud */}
          <g className="cf-cloud-center" filter="url(#cloudDrop)">
            <rect x="86"  y="145" width="148" height="54" rx="27" fill="white" stroke="#f97316" strokeWidth="2.8" />
            <circle cx="114" cy="145" r="27" fill="white" stroke="#f97316" strokeWidth="2.8" />
            <circle cx="148" cy="128" r="37" fill="white" stroke="#f97316" strokeWidth="2.8" />
            <circle cx="184" cy="141" r="25" fill="white" stroke="#f97316" strokeWidth="2.8" />
            <rect x="94" y="152" width="132" height="40" rx="20" fill="white" stroke="#fed7aa" strokeWidth="1.2" />
          </g>

        </svg>
      </div>
    </>
  );
}
