/**
 * Apexlyn brand tokens (infrastructure UI — not Google-styled).
 * Logo may use Google wordmark colours; UI stays controlled.
 */
export const APEX = {
  navy: "#0B1320",
  secondaryDark: "#111827",
  light: "#F7F9FC",
  primaryBtn: "#1E3A8A",
  primaryBtnHover: "#172554",
  aiAccent: "#1E90FF",
  success: "#1F8A70",
  warning: "#F5B700",
  critical: "#D64545",
} as const;

/** Full logo (symbol + APEXLYn wordmark). Files under public/images/logos/. */
export const LOGO_WORDMARK_CANDIDATES = [
  /* User asset: “apexlyn-logo-bg removal.png” — space → %20 in URL */
  "/images/logos/apexlyn-logo-bg%20removal.png",
  "/images/logos/apexlyn-logo-bg%20removal.jpg",
  "/images/logos/apexlyn-logo-bg-removal.png",
  "/images/logos/apexlyn-logo-bg-removal.jpg",
  "/images/logos/apexlyn-logo.png",
  "/images/logos/APEXLyn-01 (1).png",
  "/images/logos/apexlyn-logo.svg",
  "/images/logos/logo.svg",
  "/images/logos/logo.png",
] as const;

/** Icon-only mark (header compact / favicon source). */
export const LOGO_ICON_CANDIDATES = [
  "/images/logos/apexlyn-icon.png",
  "/images/logos/favicon.png",
  "/images/logos/apexlyn-logo.svg",
] as const;

/** @deprecated use LOGO_WORDMARK_CANDIDATES + ApexlynLogo variant */
export const LOGO_SRC_CANDIDATES = LOGO_WORDMARK_CANDIDATES;

export const FAVICON_HREF = "/images/logos/favicon.png";

export const FAVICON_CANDIDATES = [
  FAVICON_HREF,
  "/images/logos/favicon.ico",
  "/favicon.svg",
] as const;
