/**
 * Framework icons from client brand kit (index.html).
 * Healthcare: center accent dot removed per launch feedback.
 */
import React from "react";

const iconBox = { width: 40, height: 40 };

export function IconEssentialEight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <polygon points="32,3 52,12 61,32 52,52 32,61 12,52 3,32 12,12" fill="#1D4ED8" />
      <polygon
        points="32,11 48,18.5 55,32 48,45.5 32,53 16,45.5 9,32 16,18.5"
        fill="none"
        stroke="#E4EAFA"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontFamily="-apple-system,sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="#FFFFFF"
        textRendering="geometricPrecision"
      >
        8
      </text>
      <circle cx="32" cy="7" r="2" fill="#E4EAFA" opacity="0.8" />
    </svg>
  );
}

export function IconCisBenchmarks(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <circle cx="32" cy="32" r="29" fill="#1E3A8A" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="32" cy="32" r="13" fill="#1D4ED8" />
      <circle cx="32" cy="32" r="5.5" fill="#E4EAFA" />
      <line x1="32" y1="3" x2="32" y2="10" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="54" x2="32" y2="61" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="32" x2="10" y2="32" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
      <line x1="54" y1="32" x2="61" y2="32" stroke="#E4EAFA" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconIso27001(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <rect x="7" y="5" width="40" height="50" rx="5" fill="#1E3A8A" />
      <polygon points="37,5 47,15 37,15" fill="#1D4ED8" />
      <rect x="13" y="20" width="22" height="3" rx="1.5" fill="#E4EAFA" opacity="0.7" />
      <rect x="13" y="27" width="28" height="2.5" rx="1.25" fill="#E4EAFA" opacity="0.45" />
      <rect x="13" y="33" width="24" height="2.5" rx="1.25" fill="#E4EAFA" opacity="0.45" />
      <rect x="13" y="39" width="18" height="2.5" rx="1.25" fill="#E4EAFA" opacity="0.45" />
      <path
        d="M43 37 L57 43 L57 52 C57 57 50.5 60.5 43 63 C35.5 60.5 29 57 29 52 L29 43 Z"
        fill="#1D4ED8"
        stroke="#E4EAFA"
        strokeWidth="1.2"
      />
      <polyline
        points="36,52 41,58 51,45"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconNistCsf(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <polygon points="32,3 56,17 56,47 32,61 8,47 8,17" fill="#1D4ED8" />
      <polygon
        points="32,12 49,22 49,42 32,52 15,42 15,22"
        fill="none"
        stroke="#E4EAFA"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="32" cy="15" r="2.5" fill="#FFFFFF" />
      <circle cx="47" cy="23.5" r="2.5" fill="#FFFFFF" />
      <circle cx="47" cy="40.5" r="2.5" fill="#FFFFFF" />
      <circle cx="32" cy="49" r="2.5" fill="#FFFFFF" />
      <circle cx="17" cy="40.5" r="2.5" fill="#FFFFFF" />
      <circle cx="17" cy="23.5" r="2.5" fill="#FFFFFF" />
      <line x1="32" y1="17.5" x2="32" y2="29" stroke="#E4EAFA" strokeWidth="1" opacity="0.6" />
      <line x1="44.8" y1="25" x2="37" y2="29.5" stroke="#E4EAFA" strokeWidth="1" opacity="0.6" />
      <line x1="44.8" y1="39" x2="37" y2="34.5" stroke="#E4EAFA" strokeWidth="1" opacity="0.6" />
      <line x1="32" y1="46.5" x2="32" y2="35" stroke="#E4EAFA" strokeWidth="1" opacity="0.6" />
      <line x1="19.2" y1="39" x2="27" y2="34.5" stroke="#E4EAFA" strokeWidth="1" opacity="0.6" />
      <line x1="19.2" y1="25" x2="27" y2="29.5" stroke="#E4EAFA" strokeWidth="1" opacity="0.6" />
      <circle cx="32" cy="32" r="4" fill="#E4EAFA" />
    </svg>
  );
}

export function IconApraCps234(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <rect x="5" y="54" width="54" height="5" rx="2.5" fill="#1E3A8A" />
      <rect x="10" y="22" width="8" height="32" rx="2" fill="#1D4ED8" />
      <rect x="23" y="22" width="8" height="32" rx="2" fill="#1D4ED8" />
      <rect x="33" y="22" width="8" height="32" rx="2" fill="#1D4ED8" />
      <rect x="46" y="22" width="8" height="32" rx="2" fill="#1D4ED8" />
      <rect x="7" y="17" width="50" height="6" rx="2" fill="#1E3A8A" />
      <polygon points="4,18 32,5 60,18" fill="#1D4ED8" />
      <circle cx="32" cy="37" r="10" fill="#1E3A8A" stroke="#E4EAFA" strokeWidth="1.5" />
      <rect x="27.5" y="37" width="9" height="7" rx="1.5" fill="#E4EAFA" />
      <path
        d="M29 37 L29 34 C29 31 35 31 35 34 L35 37"
        fill="none"
        stroke="#E4EAFA"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Healthcare cross — center dot removed (client: no overlapping mark) */
export function IconHealthcare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <path
        d="M32 4 L58 14 L58 36 C58 50 46 59 32 63 C18 59 6 50 6 36 L6 14 Z"
        fill="#1D4ED8"
      />
      <path
        d="M32 12 L52 20 L52 36 C52 47 43 54 32 57 C21 54 12 47 12 36 L12 20 Z"
        fill="#1E3A8A"
      />
      <rect x="26" y="22" width="12" height="22" rx="3" fill="#E4EAFA" />
      <rect x="21" y="27" width="22" height="12" rx="3" fill="#E4EAFA" />
    </svg>
  );
}

export function IconPrivacyApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <circle cx="32" cy="32" r="29" fill="#1E3A8A" />
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="4"
        strokeDasharray="10 5"
      />
      <circle cx="32" cy="32" r="18" fill="#1D4ED8" />
      <circle cx="32" cy="25" r="6.5" fill="#E4EAFA" />
      <path d="M18 46 C18 38 24 35 32 35 C40 35 46 38 46 46" fill="#E4EAFA" />
    </svg>
  );
}

export function IconIsmEssentials(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden shapeRendering="geometricPrecision" {...iconBox} {...props}>
      <path
        d="M32 4 L58 14 L58 36 C58 50 46 59 32 63 C18 59 6 50 6 36 L6 14 Z"
        fill="#1E3A8A"
      />
      <path
        d="M32 11 L53 19.5 L53 36 C53 47.5 43.5 55.5 32 58.5 C20.5 55.5 11 47.5 11 36 L11 19.5 Z"
        fill="#1D4ED8"
      />
      <line
        x1="22"
        y1="26"
        x2="42"
        y2="26"
        stroke="#E4EAFA"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <line
        x1="22"
        y1="33"
        x2="42"
        y2="33"
        stroke="#E4EAFA"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <line
        x1="22"
        y1="40"
        x2="36"
        y2="40"
        stroke="#E4EAFA"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="18" cy="26" r="3.5" fill="#E4EAFA" />
      <circle cx="18" cy="33" r="3.5" fill="#E4EAFA" />
      <circle cx="18" cy="40" r="3.5" fill="#E4EAFA" />
      <polyline
        points="15.8,26 17.5,27.8 20.2,24.5"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="15.8,33 17.5,34.8 20.2,31.5"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="15.8,40 17.5,41.8 20.2,38.5"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
