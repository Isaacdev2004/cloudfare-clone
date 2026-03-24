// GaugeComponent.jsx
// Cloudflare-style animated speedometer gauge
// Usage: <GaugeComponent />

import React from "react";

const styles = `
  @keyframes needleSwing {
    0%   { transform: rotate(-62deg); }
    30%  { transform: rotate(-10deg); }
    55%  { transform: rotate(30deg); }
    75%  { transform: rotate(48deg); }
    85%  { transform: rotate(20deg); }
    100% { transform: rotate(52deg); }
  }
  @keyframes orbitRing {
    to { transform: rotate(360deg); }
  }
  @keyframes pulseRingOut {
    0%   { r: 16; opacity: 0.9; }
    100% { r: 55; opacity: 0; }
  }
  @keyframes outerGaugePulse {
    0%,100% { opacity:0.4; }
    50%      { opacity:0.9; }
  }
  .needle-group {
    transform-origin: 120px 138px;
    animation: needleSwing 4s ease-in-out infinite alternate;
  }
  .orbit-ring-svg {
    position: absolute;
    top: -18px;
    left: 8px;
    width: 290px;
    height: 290px;
    overflow: visible;
    pointer-events: none;
    animation: orbitRing 18s linear infinite;
  }
  .pulse-ring-1 {
    animation: pulseRingOut 2s ease-out infinite;
  }
  .pulse-ring-2 {
    animation: pulseRingOut 2s ease-out infinite;
    animation-delay: 0.7s;
  }
  .outer-gauge-pulse {
    animation: outerGaugePulse 2.5s ease-in-out infinite;
  }
`;

const RED_TICKS   = [-58, -47, -36, -25, -14, -3];
const GREEN_TICKS = [3, 14, 25, 36, 47, 58];

export default function GaugeComponent() {
  return (
    <>
      <style>{styles}</style>
      <div style={{ position: "relative", width: 300, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Orbiting dashed ring */}
        <svg className="orbit-ring-svg" viewBox="0 0 290 290">
          <circle cx="145" cy="145" r="140" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="6 5" />
          <circle cx="145" cy="5" r="4.5" fill="#3b82f6" />
        </svg>

        {/* Corner diamonds */}
        <div style={{ position:"absolute", top:"8px",  left:"18px", width:10, height:10, border:"1.5px solid #f97316", transform:"rotate(45deg)", opacity:0.5 }} />
        <div style={{ position:"absolute", bottom:"8px",right:"18px",width:10, height:10, border:"1.5px solid #f97316", transform:"rotate(45deg)", opacity:0.5 }} />

        {/* Main SVG */}
        <svg viewBox="0 0 240 180" width="280" height="210" overflow="visible" style={{ position:"relative", zIndex:2 }}>
          <defs>
            <radialGradient id="gOuter" cx="50%" cy="100%" r="80%">
              <stop offset="0%"   stopColor="#fed7aa" />
              <stop offset="45%"  stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
            <radialGradient id="gInner" cx="50%" cy="100%" r="70%">
              <stop offset="0%"   stopColor="#fff7ed" />
              <stop offset="100%" stopColor="#ffedd5" />
            </radialGradient>
            <filter id="gShadow">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(194,65,12,0.4)" />
            </filter>
            <filter id="nShadow">
              <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.35)" />
            </filter>
            <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          {/* Arcs */}
          <path d="M 8,138 A 112,112 0 0 1 232,138 L 202,138 A 82,82 0 0 0 38,138 Z"
                fill="url(#gOuter)" filter="url(#gShadow)" />
          <path d="M 40,138 A 80,80 0 0 1 200,138 L 178,138 A 58,58 0 0 0 62,138 Z"
                fill="url(#gInner)" />
          <path d="M 64,138 A 56,56 0 0 1 176,138 L 162,138 A 42,42 0 0 0 78,138 Z"
                fill="white" />

          {/* Red ticks */}
          {RED_TICKS.map((angle, i) => (
            <line key={`r${i}`}
              x1="120" y1="56" x2="120" y2={i % 2 === 0 ? 66 : 64}
              stroke={i < 3 ? "#fca5a5" : "#ef4444"}
              strokeWidth={i % 2 === 0 ? 2 : 1.5}
              transform={`rotate(${angle} 120 138)`}
              strokeLinecap="round"
            />
          ))}

          {/* Green ticks */}
          {GREEN_TICKS.map((angle, i) => (
            <line key={`g${i}`}
              x1="120" y1="56" x2="120" y2={i % 2 === 0 ? 66 : 64}
              stroke={i > 2 ? "#86efac" : "#22c55e"}
              strokeWidth={i % 2 === 0 ? 2 : 1.5}
              transform={`rotate(${angle} 120 138)`}
              strokeLinecap="round"
            />
          ))}

          {/* Needle */}
          <g className="needle-group" filter="url(#nShadow)">
            <polygon points="114,138 126,138 122,62 118,62" fill="url(#needleGrad)" opacity="0.9" />
            <polygon points="116,138 124,138 121,55 119,55" fill="#f97316" />
            <rect x="113" y="134" width="14" height="8" rx="3" fill="#dc2626" />
          </g>

          {/* Center hub */}
          <circle cx="120" cy="138" r="16" fill="white" stroke="#e5e7eb" strokeWidth="2" />
          <circle cx="120" cy="138" r="11" fill="#d1d5db" />
          <circle cx="120" cy="138" r="6.5" fill="#6b7280" />
          <circle cx="120" cy="138" r="2.5" fill="white" />

          {/* Pulse rings */}
          <circle cx="120" cy="138" r="16" fill="none" stroke="#f97316" strokeWidth="1.5" className="pulse-ring-1" />
          <circle cx="120" cy="138" r="16" fill="none" stroke="#f97316" strokeWidth="1"   className="pulse-ring-2" />

          {/* Base line */}
          <rect x="15" y="136" width="210" height="5" rx="2.5" fill="url(#gOuter)" opacity="0.3" />

          {/* Outer arc pulse */}
          <path d="M 8,138 A 112,112 0 0 1 232,138"
                fill="none" stroke="#fb923c" strokeWidth="3"
                className="outer-gauge-pulse" />
        </svg>
      </div>
    </>
  );
}
