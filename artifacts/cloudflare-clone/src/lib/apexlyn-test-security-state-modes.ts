/**
 * §10 — Test Your Security State: mode cards, helper copy, primary objective options.
 */

export const BASELINE_MODES = ['track', 'lens', 'full'] as const;
export type BaselineMode = (typeof BASELINE_MODES)[number];

export const DEFAULT_BASELINE_MODE: BaselineMode = 'full';

/** §10.1 — Card titles (selectable cards, not tabs-only / not radios-only) */
export const MODE_CARDS: {
  id: BaselineMode;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'track',
    title: 'Evidence Readiness (Track)',
    subtitle: 'Audit readiness • Control evidence • Governance visibility',
  },
  {
    id: 'lens',
    title: 'AI Exposure (Lens)',
    subtitle: 'AI visibility • Prompt risk • Leakage reduction',
  },
  {
    id: 'full',
    title: 'Full Baseline',
    subtitle: 'Combined signal across Track and Lens',
  },
];

/** §10.4 — Shown when each mode is selected (helper text updates). */
export const MODE_HELPER_TEXT: Record<BaselineMode, string> = {
  track: 'Focused on audit readiness, control evidence, and governance visibility.',
  lens: 'Focused on AI visibility, prompt risk, and leakage reduction.',
  full: 'Focused on combined signal across Track and Lens.',
};

/** §10.5 */
export const PRIMARY_OBJECTIVES_BY_MODE: Record<BaselineMode, readonly string[]> = {
  track: [
    'Improve audit readiness',
    'Improve evidence continuity',
    'Improve governance reporting',
    'Replace manual assurance',
    'Understand security state',
  ],
  lens: [
    'Understand AI usage',
    'Reduce sensitive-data exposure',
    'Improve AI governance',
    'Control prompt risk',
    'Create executive AI visibility',
  ],
  full: [
    'Understand overall security and AI state',
    'Identify highest-priority gaps',
    'Prepare for governance review',
    'Compare evidence and AI exposure together',
    'Get clear next steps',
  ],
};

export function getPrimaryObjectivesForMode(mode: BaselineMode): readonly string[] {
  return PRIMARY_OBJECTIVES_BY_MODE[mode];
}

export function readBaselineModeFromSearch(): BaselineMode {
  if (typeof window === 'undefined') return DEFAULT_BASELINE_MODE;
  const m = new URLSearchParams(window.location.search).get('mode');
  if (m === 'track' || m === 'lens' || m === 'full') return m;
  return DEFAULT_BASELINE_MODE;
}
