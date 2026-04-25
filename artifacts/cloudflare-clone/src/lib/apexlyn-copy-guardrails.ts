/**
 * Section 44 — Final copy guardrails (APEXLyn public site).
 * Use preferred phrasing; avoid the listed terms in user-facing copy, SEO, and nav labels.
 * For narrative North Star (infrastructure company, Track/Lens, Australia, buyers), see `apexlyn-build-instruction.ts`.
 */

export const COPY_AVOID = [
  'best-in-class',
  'world-leading',
  'guaranteed compliance',
  'fully compliant',
  'military-grade',
  'next-generation AI',
  'revolutionary',
  'all-in-one cybersecurity platform',
  'zero-risk',
  'fully autonomous',
] as const;

/**
 * Suggested phrasing (examples — not an exhaustive list of allowed text).
 */
export const COPY_PREFERRED = [
  'designed to support',
  'built to help',
  'structured to preserve',
  'designed for',
  'supports stronger',
  'reduces friction',
  'improves visibility',
  'creates defensible evidence',
  'strengthens governance',
] as const;

export type CopyAvoidPhrase = (typeof COPY_AVOID)[number];
export type CopyPreferredPhrase = (typeof COPY_PREFERRED)[number];
