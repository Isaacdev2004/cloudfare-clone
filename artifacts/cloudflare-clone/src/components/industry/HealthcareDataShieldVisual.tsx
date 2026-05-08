import React from 'react';

/** §32.4 — Abstract data protection around sensitive information (no literal medical imagery). */
export function HealthcareDataShieldVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`flex min-h-[200px] items-center justify-center ${className}`} aria-hidden>
      <svg viewBox="0 0 240 200" className="h-full w-full max-w-[240px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hds-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6F1FB" />
            <stop offset="100%" stopColor="#E1F5EE" />
          </linearGradient>
        </defs>
        <rect x="32" y="48" width="176" height="112" rx="12" fill="url(#hds-g)" stroke="#185FA5" strokeWidth={1} />
        <rect x="56" y="72" width="128" height="64" rx="8" fill="white" fillOpacity={0.85} stroke="#E5E7EB" strokeWidth={1} />
        <circle cx="120" cy="104" r="22" stroke="#1E3A8A" strokeWidth={2} fill="#F7F9FC" />
        <path
          d="M112 104 L118 110 L132 96"
          stroke="#1F8A70"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="200" cy="40" rx="28" ry="12" fill="#93C5FD" fillOpacity={0.35} />
        <ellipse cx="44" cy="160" rx="36" ry="14" fill="#1E90FF" fillOpacity={0.12} />
      </svg>
    </div>
  );
}
