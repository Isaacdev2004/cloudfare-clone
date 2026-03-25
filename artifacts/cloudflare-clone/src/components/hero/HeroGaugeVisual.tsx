// Speed gauge — Apexlyn palette; no dashed orbit ring or expanding pulse rings
import React, { useId } from "react";
import { cn } from "@/lib/utils";

const styles = `
  @keyframes hg-needleSwing {
    0%   { transform: rotate(-62deg); }
    30%  { transform: rotate(-10deg); }
    55%  { transform: rotate(30deg); }
    75%  { transform: rotate(48deg); }
    85%  { transform: rotate(20deg); }
    100% { transform: rotate(52deg); }
  }
  @keyframes hg-outerGaugePulse {
    0%,100% { opacity:0.4; }
    50%      { opacity:0.9; }
  }
  .hg-needle-group {
    transform-origin: 120px 138px;
    animation: hg-needleSwing 4s ease-in-out infinite alternate;
  }
  .hg-outer-gauge-pulse {
    animation: hg-outerGaugePulse 2.5s ease-in-out infinite;
  }
`;

const RED_TICKS = [-58, -47, -36, -25, -14, -3];
const GREEN_TICKS = [3, 14, 25, 36, 47, 58];

export const HeroGaugeVisual: React.FC<{ className?: string; compact?: boolean }> = ({
  className,
  compact = false,
}) => {
  const rid = useId().replace(/:/g, "");

  return (
    <>
      <style>{styles}</style>
      <div
        className={cn(
          "relative flex items-center justify-center",
          compact ? "h-[220px] w-full min-w-0 max-w-[300px] sm:h-[240px]" : "h-[260px] w-[320px] max-w-full",
          className,
        )}
      >
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center",
            compact && "origin-center scale-[0.92]",
          )}
          style={{ width: 300, height: 260 }}
        >
          <svg
            viewBox="0 0 240 180"
            width={280}
            height={210}
            className="relative z-[2] overflow-visible"
            aria-hidden
          >
            <defs>
              <radialGradient id={`${rid}-gOuter`} cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#dbeafe" />
                <stop offset="40%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </radialGradient>
              <radialGradient id={`${rid}-gInner`} cx="50%" cy="100%" r="70%">
                <stop offset="0%" stopColor="#f0f9ff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </radialGradient>
              <filter id={`${rid}-gShadow`}>
                <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(30, 58, 138, 0.38)" />
              </filter>
              <filter id={`${rid}-nShadow`}>
                <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.35)" />
              </filter>
              <linearGradient id={`${rid}-needleGrad`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#1E90FF" />
              </linearGradient>
            </defs>

            <path
              d="M 8,138 A 112,112 0 0 1 232,138 L 202,138 A 82,82 0 0 0 38,138 Z"
              fill={`url(#${rid}-gOuter)`}
              filter={`url(#${rid}-gShadow)`}
            />
            <path
              d="M 40,138 A 80,80 0 0 1 200,138 L 178,138 A 58,58 0 0 0 62,138 Z"
              fill={`url(#${rid}-gInner)`}
            />
            <path d="M 64,138 A 56,56 0 0 1 176,138 L 162,138 A 42,42 0 0 0 78,138 Z" fill="white" />

            {RED_TICKS.map((angle, i) => (
              <line
                key={`r${i}`}
                x1="120"
                y1="56"
                x2="120"
                y2={i % 2 === 0 ? 66 : 64}
                stroke={i < 3 ? "#fca5a5" : "#D64545"}
                strokeWidth={i % 2 === 0 ? 2 : 1.5}
                transform={`rotate(${angle} 120 138)`}
                strokeLinecap="round"
              />
            ))}

            {GREEN_TICKS.map((angle, i) => (
              <line
                key={`g${i}`}
                x1="120"
                y1="56"
                x2="120"
                y2={i % 2 === 0 ? 66 : 64}
                stroke={i > 2 ? "#6ee7b7" : "#1F8A70"}
                strokeWidth={i % 2 === 0 ? 2 : 1.5}
                transform={`rotate(${angle} 120 138)`}
                strokeLinecap="round"
              />
            ))}

            <g className="hg-needle-group" filter={`url(#${rid}-nShadow)`}>
              <polygon points="114,138 126,138 122,62 118,62" fill={`url(#${rid}-needleGrad)`} opacity="0.9" />
              <polygon points="116,138 124,138 121,55 119,55" fill="#1E90FF" />
              <rect x="113" y="134" width="14" height="8" rx="3" fill="#1E3A8A" />
            </g>

            <circle cx="120" cy="138" r="16" fill="white" stroke="#e5e7eb" strokeWidth="2" />
            <circle cx="120" cy="138" r="11" fill="#d1d5db" />
            <circle cx="120" cy="138" r="6.5" fill="#64748b" />
            <circle cx="120" cy="138" r="2.5" fill="white" />

            <rect x="15" y="136" width="210" height="5" rx="2.5" fill={`url(#${rid}-gOuter)`} opacity={0.3} />

            <path
              d="M 8,138 A 112,112 0 0 1 232,138"
              fill="none"
              stroke="#1E90FF"
              strokeWidth="3"
              className="hg-outer-gauge-pulse"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
