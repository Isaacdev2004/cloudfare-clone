/**
 * Main hero “framework orbit” — matches client hero-v4.html + FrameworkOrbit.tsx.
 * Icons from brand kit (frameworkBrandIcons.tsx).
 */
import React, { useId } from "react";
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

function CloudLayer() {
  return (
    <>
      <rect x="186" y="318" width="148" height="58" rx="29" fill="#8fb8ee" opacity="0.7" />
      <circle cx="220" cy="308" r="36" fill="#9dc4f0" opacity="0.72" />
      <circle cx="284" cy="285" r="46" fill="#b0d0f4" opacity="0.76" />
      <rect x="214" y="334" width="194" height="58" rx="29" fill="#eef5ff" />
      <circle cx="252" cy="318" r="38" fill="#e6f0ff" />
      <circle cx="322" cy="296" r="52" fill="#f0f6ff" />
      <circle cx="382" cy="316" r="34" fill="#eaf2ff" />
      <ellipse cx="310" cy="272" rx="24" ry="16" fill="white" opacity="0.72" />
      <ellipse cx="252" cy="304" rx="14" ry="10" fill="white" opacity="0.48" />
      <ellipse cx="308" cy="372" rx="120" ry="11" fill="#3B6FD4" opacity="0.26" />
      <ellipse cx="308" cy="374" rx="88" ry="7" fill="#4A90E2" opacity="0.16" />
    </>
  );
}

const ACCENT_DOTS = [
  { left: "64.8%", top: "29.7%", size: 8, color: "#F5B700", delay: "0s", dur: "2.2s" },
  { left: "77.9%", top: "50.3%", size: 8, color: "#1F8A70", delay: "0.5s", dur: "2.6s" },
  { left: "65.5%", top: "70.6%", size: 7, color: "#a855f7", delay: "1.0s", dur: "2.0s" },
  { left: "29.3%", top: "68.2%", size: 8, color: "#06b6d4", delay: "1.5s", dur: "2.4s" },
  { left: "28.9%", top: "30.2%", size: 7, color: "#f97316", delay: "0.3s", dur: "1.9s" },
  { left: "50.0%", top: "39.3%", size: 6, color: "#c8dcff", delay: "2.0s", dur: "2.8s" },
];

const FLOAT_DURATIONS = [5.0, 5.3, 4.8, 5.5, 5.1, 4.7, 5.4, 4.9];
const FLOAT_DELAYS = [0.0, 0.65, 1.3, 1.95, 2.6, 0.35, 1.0, 1.65];

const heroStyles = `
  @keyframes hero-fw-breathe {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
  }
  @keyframes hero-fw-dot-pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(2.1); }
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
        {/* Deep radial glow — hero-v4 */}
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
              "radial-gradient(ellipse, rgba(29,78,216,.38) 0%, rgba(20,60,190,.14) 40%, rgba(10,30,120,.05) 65%, transparent 80%)",
            animation: "hero-fw-breathe 3.6s ease-in-out infinite",
            transform: "translate(-50%, -50%)",
          }}
        />

        <svg
          className="absolute inset-0 z-[2] h-full w-full overflow-visible"
          viewBox={`0 0 ${SCENE} ${SCENE}`}
          fill="none"
          aria-hidden
        >
          <defs>
            <radialGradient id={`${rid}-ringGlow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#1D4ED8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="330" cy="374" rx="150" ry="32" fill={`url(#${rid}-ringGlow)`} />

          <circle
            cx={CX}
            cy={CY}
            r={ORBIT_R}
            stroke="rgba(100,155,255,0.23)"
            strokeWidth="1.3"
            strokeDasharray="5 9"
          />

          <MeshLines />
          <CloudLayer />
        </svg>

        {[
          { left: "92%", top: "13%" },
          { left: "79%", top: "90%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="pointer-events-none z-[5]"
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              width: 9,
              height: 9,
              background: "rgba(29,78,216,.38)",
              border: "1.5px solid rgba(74,144,226,.38)",
              transform: "translate(-50%, -50%) rotate(45deg)",
            }}
          />
        ))}

        {ACCENT_DOTS.map((dot, i) => (
          <div
            key={i}
            className="pointer-events-none z-[10]"
            style={{
              position: "absolute",
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: dot.color,
              transform: "translate(-50%, -50%)",
              animation: `hero-fw-dot-pulse ${dot.dur} ease-in-out infinite ${dot.delay}`,
            }}
          />
        ))}

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
                className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl border border-[rgba(29,78,216,0.42)] bg-[#071526] shadow-[0_3px_14px_rgba(0,0,0,0.55),0_0_10px_rgba(29,78,216,0.1)] transition-[border-color,box-shadow] duration-200 hover:border-[rgba(29,78,216,0.85)] hover:shadow-[0_3px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(29,78,216,0.32)]"
              >
                <Icon width={40} height={40} />
              </div>
              <span
                className="pointer-events-none max-w-[88px] text-center text-[9px] font-semibold leading-tight text-[rgba(155,190,255,0.58)] sm:max-w-none sm:whitespace-nowrap"
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
