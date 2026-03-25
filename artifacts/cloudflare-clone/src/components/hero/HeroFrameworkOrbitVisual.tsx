/**
 * Main hero “framework orbit” — matches client hero-v4.html + FrameworkOrbit.tsx.
 * Icons from brand kit (frameworkBrandIcons.tsx).
 */
import React, { useId, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  IconApraCps234,
  IconCisBenchmarks,
  IconEssentialEight,
  IconHealthcare,
  IconIsmEssentials,
  IconIso27001,
  IconNistCsf,
  IconPrivacyApp,
} from "./frameworkBrandIcons";

const SCENE = 660;
const CX = 330;
const CY = 330;
const ORBIT_R = 235;

const FRAMEWORKS = [
  { id: "essential-eight", label: "Essential Eight", angle: 0, Icon: IconEssentialEight },
  { id: "cis-benchmarks", label: "CIS Benchmarks", angle: 45, Icon: IconCisBenchmarks },
  { id: "iso-27001", label: "ISO 27001", angle: 90, Icon: IconIso27001 },
  { id: "nist-csf", label: "NIST CSF 2.0", angle: 135, Icon: IconNistCsf },
  { id: "apra-cps234", label: "APRA CPS 234", angle: 180, Icon: IconApraCps234 },
  { id: "healthcare", label: "Healthcare", angle: 225, Icon: IconHealthcare },
  { id: "privacy-app", label: "Privacy (APP)", angle: 270, Icon: IconPrivacyApp },
  { id: "ism-essentials", label: "ISM Essentials", angle: 315, Icon: IconIsmEssentials },
] as const;

function getPos(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + ORBIT_R * Math.cos(rad),
    y: CY + ORBIT_R * Math.sin(rad),
  };
}

type V3 = [number, number, number];

function normalizeV3(v: V3): V3 {
  const L = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / L, v[1] / L, v[2] / L];
}

const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_VERTS: V3[] = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
].map(normalizeV3);

const ICO_FACES: [number, number, number][] = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1],
];

function subdivideIcosahedron(verts: V3[], faces: [number, number, number][]): { verts: V3[]; faces: [number, number, number][] } {
  const nextVerts = [...verts];
  const midCache = new Map<string, number>();

  function getMid(i: number, j: number): number {
    const key = i < j ? `${i},${j}` : `${j},${i}`;
    const existing = midCache.get(key);
    if (existing !== undefined) return existing;
    const a = nextVerts[i];
    const b = nextVerts[j];
    const m = normalizeV3([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
    nextVerts.push(m);
    const idx = nextVerts.length - 1;
    midCache.set(key, idx);
    return idx;
  }

  const newFaces: [number, number, number][] = [];
  for (const [i, j, k] of faces) {
    const ij = getMid(i, j);
    const jk = getMid(j, k);
    const ki = getMid(k, i);
    newFaces.push([i, ij, ki], [j, jk, ij], [k, ki, jk], [ij, jk, ki]);
  }
  return { verts: nextVerts, faces: newFaces };
}

function rotateX(v: V3, rad: number): V3 {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

function buildGeodesicWireframe(): { lines: { x1: number; y1: number; x2: number; y2: number }[] } {
  const step1 = subdivideIcosahedron(ICO_VERTS, ICO_FACES);
  const { verts, faces } = subdivideIcosahedron(step1.verts, step1.faces);
  const tilt = -0.35;
  const rotated = verts.map((p) => rotateX(p, tilt));
  const R = 108;
  const edgeKeys = new Set<string>();
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  function addEdge(a: number, b: number) {
    const i = Math.min(a, b);
    const j = Math.max(a, b);
    const key = `${i},${j}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    const p1 = rotated[i];
    const p2 = rotated[j];
    const zMin = -0.12;
    if (p1[2] < zMin && p2[2] < zMin) return;
    const proj = (p: V3) => ({
      x: CX + R * p[0],
      y: CY - R * p[1],
    });
    const A = proj(p1);
    const B = proj(p2);
    lines.push({ x1: A.x, y1: A.y, x2: B.x, y2: B.y });
  }

  for (const [i, j, k] of faces) {
    addEdge(i, j);
    addEdge(j, k);
    addEdge(k, i);
  }

  return { lines };
}

/** Full blue geodesic globe (wireframe + fill) */
function GeodesicGlobe({ rid }: { rid: string }) {
  const { lines } = useMemo(() => buildGeodesicWireframe(), []);

  return (
    <g shapeRendering="geometricPrecision">
      <defs>
        <radialGradient id={`${rid}-globeFill`} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="45%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <clipPath id={`${rid}-globeClip`}>
          <circle cx={CX} cy={CY} r={108} />
        </clipPath>
      </defs>
      <circle cx={CX} cy={CY} r={108} fill={`url(#${rid}-globeFill)`} stroke="#1d4ed8" strokeWidth="1.2" />
      <g clipPath={`url(#${rid}-globeClip)`} opacity={0.92}>
        {lines.map((ln, i) => (
          <line
            key={i}
            x1={ln.x1}
            y1={ln.y1}
            x2={ln.x2}
            y2={ln.y2}
            stroke="#e0f2fe"
            strokeWidth={0.85}
            strokeLinecap="round"
          />
        ))}
      </g>
      {/* Bright arcs on the right — reference globe */}
      <path
        d={`M ${CX + 52} ${CY - 62} A 88 88 0 0 1 ${CX + 98} ${CY + 8}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={2.4}
        strokeLinecap="round"
        opacity={0.92}
      />
      <path
        d={`M ${CX + 38} ${CY + 18} A 72 72 0 0 1 ${CX + 86} ${CY + 72}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.88}
      />
    </g>
  );
}

function MeshLines() {
  const positions = FRAMEWORKS.map((f) => getPos(f.angle));

  const spokes = positions.map((p, i) => (
    <line
      key={`spoke-${i}`}
      x1={CX}
      y1={CY}
      x2={p.x}
      y2={p.y}
      stroke="#4A90E2"
      strokeWidth="0.6"
      opacity="0.16"
    />
  ));

  const octagon = (
    <polygon
      points={positions.map((p) => `${p.x},${p.y}`).join(" ")}
      fill="none"
      stroke="#4A90E2"
      strokeWidth="0.75"
      opacity="0.13"
    />
  );

  const crossPairs = [
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ] as const;
  const crosses = crossPairs.map(([a, b], i) => (
    <line
      key={`cross-${i}`}
      x1={positions[a].x}
      y1={positions[a].y}
      x2={positions[b].x}
      y2={positions[b].y}
      stroke="#4A90E2"
      strokeWidth="0.5"
      opacity="0.09"
    />
  ));

  const skipPairs = [
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 6],
    [4, 7],
    [5, 0],
    [6, 1],
    [7, 2],
  ] as const;
  const skips = skipPairs.map(([a, b], i) => (
    <line
      key={`skip-${i}`}
      x1={positions[a].x}
      y1={positions[a].y}
      x2={positions[b].x}
      y2={positions[b].y}
      stroke="#4A90E2"
      strokeWidth="0.4"
      opacity="0.07"
    />
  ));

  return (
    <>
      {spokes}
      {octagon}
      {crosses}
      {skips}
    </>
  );
}

const FLOAT_DURATIONS = [5.0, 5.3, 4.8, 5.5, 5.1, 4.7, 5.4, 4.9];
const FLOAT_DELAYS = [0.0, 0.65, 1.3, 1.95, 2.6, 0.35, 1.0, 1.65];

const heroStyles = `
  @keyframes hero-fw-breathe {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
  }
  @keyframes hero-fw-float-0 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
  @keyframes hero-fw-float-1 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
  @keyframes hero-fw-float-2 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
  @keyframes hero-fw-float-3 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
  @keyframes hero-fw-float-4 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
  @keyframes hero-fw-float-5 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
  @keyframes hero-fw-float-6 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
  @keyframes hero-fw-float-7 { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-7px)} }
`;

export const HeroFrameworkOrbitVisual: React.FC<{ className?: string }> = ({ className }) => {
  const rid = useId().replace(/:/g, "");

  return (
    <div className={cn("relative mx-auto w-full max-w-[min(100%,680px)] aspect-square", className)}>
      <style>{heroStyles}</style>

      <div className="absolute inset-0 overflow-visible">
        {/* Soft blue halo behind globe */}
        <div
          className="pointer-events-none z-[1]"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${(420 / SCENE) * 100}%`,
            height: `${(320 / SCENE) * 100}%`,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,.22) 0%, rgba(29,78,216,.08) 45%, transparent 72%)",
            animation: "hero-fw-breathe 3.6s ease-in-out infinite",
            transform: "translate(-50%, -50%)",
          }}
        />

        <svg
          className="absolute inset-0 z-[2] h-full w-full overflow-visible"
          viewBox={`0 0 ${SCENE} ${SCENE}`}
          fill="none"
          aria-hidden
          style={{ shapeRendering: "geometricPrecision" }}
        >
          <defs>
            <radialGradient id={`${rid}-groundGlow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#2563eb" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="330" cy="382" rx="132" ry="30" fill={`url(#${rid}-groundGlow)`} />

          <circle
            cx={CX}
            cy={CY}
            r={ORBIT_R}
            stroke="rgba(100,155,255,0.23)"
            strokeWidth="1.3"
            strokeDasharray="5 9"
          />

          <MeshLines />
          <GeodesicGlobe rid={rid} />
        </svg>

        {FRAMEWORKS.map((fw, i) => {
          const pos = getPos(fw.angle);
          const Icon = fw.Icon;
          return (
            <div
              key={fw.id}
              className="z-[15] flex cursor-default flex-col items-center gap-1.5"
              style={{
                position: "absolute",
                left: `${(pos.x / SCENE) * 100}%`,
                top: `${(pos.y / SCENE) * 100}%`,
                transform: "translate(-50%, -50%)",
                animation: `hero-fw-float-${i} ${FLOAT_DURATIONS[i]}s ease-in-out infinite ${FLOAT_DELAYS[i]}s`,
              }}
            >
              <div
                className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-[rgba(29,78,216,0.5)] bg-[#0c1929] shadow-[0_2px_8px_rgba(15,23,42,0.28)] transition-[border-color,box-shadow] duration-200 hover:border-[rgba(29,78,216,0.85)] hover:shadow-[0_4px_14px_rgba(15,23,42,0.35)] [isolation:isolate]"
              >
                <Icon width={46} height={46} className="block shrink-0" style={{ shapeRendering: "geometricPrecision" }} />
              </div>
              <span
                className="pointer-events-none max-w-[88px] text-center text-[9px] font-semibold leading-tight text-[#1E3A8A] sm:max-w-none sm:whitespace-nowrap"
                style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              >
                {fw.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
