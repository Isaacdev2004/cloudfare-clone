/** Part 7 — Industry page structure (shared + MSP/insurance variants). */

export type IndustrySlug =
  | 'healthcare'
  | 'legal'
  | 'accounting'
  | 'insurance'
  | 'professional-services'
  | 'msp-partners';

export type HeroCta = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type TrackBlock = {
  h2: string;
  layer1: string;
  layer2?: { label: string; paragraphs: string[] };
  /** Omitted on pages where the spec defines Track as a single column (e.g. insurance own-compliance). */
  summaryCard?: { title: string; bullets: string[]; foot: string };
};

export type LensBlock = {
  h2: string;
  body: string[];
  lensCtaLabel: string;
  showHealthcareVisual?: boolean;
};

export type FrameworkRow = { framework: string; relevance: string };

export type HowStep = { n: string; title: string; body: string };

export type MspFeatureCard = {
  icon: 'palette' | 'layout-dashboard' | 'copy' | 'credit-card' | 'user-check' | 'arrow-right-left';
  title: string;
  body: string;
};

export type InsuranceUnderwriting = {
  h2: string;
  intro: string[];
  listIntro: string;
  listItems: string[];
  closing: string;
  ctaLabel: string;
};

export type IndustryPageConfig = {
  slug: IndustrySlug;
  posthogPrefix: string;
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    subMaxWidthClass?: string;
    ctas: HeroCta;
  };
  problem?: { h2: string; paragraphs: string[]; maxWidthClass?: string };
  mspFeatures?: MspFeatureCard[];
  track: TrackBlock;
  insuranceUnderwriting?: InsuranceUnderwriting;
  lens: LensBlock;
  frameworksTable?: { h2: string; rows: FrameworkRow[] };
  howItWorks?: { h2: string; steps: HowStep[]; maxWidthClass?: string };
  mspPartnerPricing?: { h2: string; body: string; ctaLabel: string; foot: string };
  finalCta: {
    h2: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};
