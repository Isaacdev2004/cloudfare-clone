/** Part 9 — pricing tier cards and comparison tables. */

export type PricingPlatform = 'track' | 'lens';

export type PricingCardDef = {
  id: 'standard' | 'professional' | 'enterprise' | 'sovereign';
  tierName: string;
  recommended?: boolean;
  price: string;
  /** null = hide period (Sovereign "Contact us") */
  period: string | null;
  priceNote: string;
  description: string;
  /** Key for intro label */
  featureListKind: 'included' | 'plusStandard' | 'plusProfessional' | 'plusEnterprise';
  features: string[];
  ctaLabel: string;
  ctaStyle: 'primary' | 'secondary';
};

export const TRACK_PRICING_CARDS: PricingCardDef[] = [
  {
    id: 'standard',
    tierName: 'Standard',
    price: 'A$349',
    period: '/month',
    priceNote: 'Excluding GST. Annual billing available.',
    description:
      'Automated compliance evidence for growing businesses. Self-service onboarding. Essential Eight and CIS mapping.',
    featureListKind: 'included',
    features: [
      'Automated evidence collection',
      'Essential Eight (L1, L2, L3)',
      'CIS Benchmarks (M365, Chrome, Windows 11, Windows Server)',
      'Immutable evidence storage',
      'Hash-chained evidence ledger',
      'Standard compliance reports',
      'Report verification (QR + endpoint)',
      'Microsoft 365 connector',
      'Active Directory connector',
      'CIS scan ingestion',
      'Generic API intake',
      'Self-service onboarding',
      'Standard support',
      '12-month evidence retention',
    ],
    ctaLabel: 'Start with Standard',
    ctaStyle: 'secondary',
  },
  {
    id: 'professional',
    tierName: 'Professional',
    price: 'A$899',
    period: '/month',
    priceNote: 'Excluding GST. Annual billing available.',
    description:
      'Deeper frameworks, assisted onboarding, and stronger connectors for organisations with real compliance obligations.',
    featureListKind: 'plusStandard',
    features: [
      'ISO/IEC 27001:2022',
      'NIST CSF 2.0',
      'APRA CPS 234',
      'Privacy Act & all 13 APPs',
      'Healthcare framework pack',
      'AWS posture connector',
      'Azure connector',
      'Google Cloud connector',
      'Google Workspace connector',
      'Backup software connectors (Veeam, Datto, Acronis)',
      'EDR connectors (CrowdStrike, SentinelOne, Defender)',
      'Governance workflows (attestation + risk acceptance)',
      'Insurance-grade report packs',
      'Assisted onboarding',
      'Priority support',
      '24-month evidence retention',
    ],
    ctaLabel: 'Start with Professional',
    ctaStyle: 'secondary',
  },
  {
    id: 'enterprise',
    tierName: 'Enterprise',
    recommended: true,
    price: 'From A$75,000',
    period: '/year',
    priceNote: 'Excluding GST. Contract-based.',
    description:
      'Full platform access with dedicated support, forensic-grade reporting, and legal hold for organisations with dedicated compliance requirements.',
    featureListKind: 'plusProfessional',
    features: [
      'ASD Information Security Manual',
      'Full framework access (all current and future frameworks)',
      'Forensic-grade report packs with chain-of-custody',
      'Legal hold capability',
      'Governance signature events with full proof model',
      'Dedicated enterprise support',
      'Named account manager',
      'Custom evidence retention (up to 7 years)',
      'Enterprise onboarding with dedicated implementation',
    ],
    ctaLabel: 'Contact sales',
    ctaStyle: 'primary',
  },
  {
    id: 'sovereign',
    tierName: 'Sovereign',
    price: 'Contact us',
    period: null,
    priceNote: 'Contract-based. Government and regulated institutions.',
    description:
      'Isolated deployment, customer-managed keys, and the highest evidence assurance for government, banking, and insurance carriers.',
    featureListKind: 'plusEnterprise',
    features: [
      'Isolated deployment environment',
      'Customer-managed encryption keys (CMK)',
      'Government-grade evidence assurance',
      'APRA-grade reporting for regulated financial institutions',
      'ASD ISM alignment for government agencies',
      'Controlled implementation with security review',
      'White-glove support with dedicated team',
      'Custom retention profiles',
      'Sovereign data boundary enforcement',
    ],
    ctaLabel: 'Contact sales',
    ctaStyle: 'secondary',
  },
];

export const LENS_PRICING_CARDS: PricingCardDef[] = [
  {
    id: 'standard',
    tierName: 'Standard',
    price: 'A$349',
    period: '/month',
    priceNote: 'Excluding GST. Annual billing available.',
    description:
      'Browser-based AI monitoring, basic policy enforcement, and evidence recording. Self-service onboarding. See where AI is being used.',
    featureListKind: 'included',
    features: [
      'Browser extension enforcement',
      'AI interaction monitoring',
      'Basic policy enforcement (block, warn, allow, audit)',
      'Immutable evidence recording',
      'Hash-chained evidence ledger',
      'Shadow AI discovery',
      'Internal AI inventory',
      'Standard AI governance reports',
      'Report verification (QR + endpoint)',
      'Self-service onboarding',
      'Standard support',
      '12-month evidence retention',
    ],
    ctaLabel: 'Start with Standard',
    ctaStyle: 'secondary',
  },
  {
    id: 'professional',
    tierName: 'Professional',
    price: 'A$899',
    period: '/month',
    priceNote: 'Excluding GST. Annual billing available.',
    description:
      'Hosted gateway, deeper classification, forensic workspace, and API interceptor. Integrates with your existing SIEM and XDR.',
    featureListKind: 'plusStandard',
    features: [
      'Hosted network gateway enforcement',
      'Endpoint agent enforcement',
      'API interceptor enforcement',
      'Cloud application connectors (M365, Google)',
      'Full classification pipeline (8-stage)',
      'Semantic classification + prompt injection detection',
      'Redact and educate policy actions',
      'Forensic workspace (search, filtering, linked events)',
      'Case management (create, track, close)',
      'AI output inspection',
      'SIEM integration (Sentinel, Splunk, QRadar)',
      'XDR/EDR integration (CrowdStrike, Defender)',
      'SASE integration (Zscaler, Netskope, Prisma via ICAP)',
      'ITSM integration (ServiceNow, Jira)',
      'Assisted onboarding',
      'Priority support',
      '24-month evidence retention',
    ],
    ctaLabel: 'Start with Professional',
    ctaStyle: 'secondary',
  },
  {
    id: 'enterprise',
    tierName: 'Enterprise',
    recommended: true,
    price: 'From A$75,000',
    period: '/year',
    priceNote: 'Excluding GST. Contract-based.',
    description:
      'Full enforcement layers, legal hold, court-ready evidence packs, and dedicated support for organisations with serious AI governance requirements.',
    featureListKind: 'plusProfessional',
    features: [
      'Internal LLM API protection (Layer 7)',
      'Legal hold (case hold, tenant hold, external hold)',
      'Court-ready evidence packs with chain-of-custody',
      'eDiscovery package generation',
      'Insurance-grade incident packs',
      'Regulator-grade submission packs',
      'Chain verification in forensic workspace',
      'Export preparation with controlled bundles',
      'File and image inspection',
      'Response inspection',
      'Dedicated enterprise support',
      'Named account manager',
      'Custom evidence retention (up to 7 years)',
      'Enterprise onboarding with dedicated implementation',
    ],
    ctaLabel: 'Contact sales',
    ctaStyle: 'primary',
  },
  {
    id: 'sovereign',
    tierName: 'Sovereign',
    price: 'Contact us',
    period: null,
    priceNote: 'Contract-based. Government and regulated institutions.',
    description:
      'Isolated deployment, customer-managed keys, and sovereign AI governance for government, banking, and insurance carriers.',
    featureListKind: 'plusEnterprise',
    features: [
      'Isolated deployment environment',
      'Customer-managed encryption keys (CMK)',
      'Sovereign AI boundary enforcement',
      'Government-grade AI governance',
      'Controlled implementation with security review',
      'White-glove support with dedicated team',
      'Custom retention profiles',
      'Sovereign data boundary enforcement',
      'All 7 enforcement layers in isolated environment',
    ],
    ctaLabel: 'Contact sales',
    ctaStyle: 'secondary',
  },
];

/** true = ✓, false = —, string = verbatim cell text */
export type CompareCell = boolean | string;

export type CompareRowDef = {
  feature: string;
  standard: CompareCell;
  professional: CompareCell;
  enterprise: CompareCell;
  sovereign: CompareCell;
};

export type CompareCategoryDef = {
  title: string;
  rows: CompareRowDef[];
};

export const TRACK_COMPARE_CATEGORIES: CompareCategoryDef[] = [
  {
    title: 'Evidence & storage',
    rows: [
      { feature: 'Automated evidence collection', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Immutable WORM storage', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Hash-chained evidence ledger', standard: true, professional: true, enterprise: true, sovereign: true },
      {
        feature: 'Evidence retention',
        standard: '12 months',
        professional: '24 months',
        enterprise: 'Up to 7 years',
        sovereign: 'Custom',
      },
      {
        feature: 'Extended retention packs',
        standard: false,
        professional: 'Available',
        enterprise: 'Included',
        sovereign: 'Custom',
      },
    ],
  },
  {
    title: 'Frameworks',
    rows: [
      { feature: 'Essential Eight (L1, L2, L3)', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'CIS Benchmarks (4 profiles)', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'ISO/IEC 27001:2022', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'NIST CSF 2.0', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'APRA CPS 234', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Healthcare framework pack', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Privacy Act & all 13 APPs', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'ASD ISM', standard: false, professional: false, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Connectors',
    rows: [
      { feature: 'Microsoft 365', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Active Directory', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'CIS scan ingestion', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Generic API intake', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'AWS posture', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Microsoft Azure', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Google Cloud Platform', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Google Workspace', standard: false, professional: true, enterprise: true, sovereign: true },
      {
        feature: 'Backup software (Veeam, Datto, Acronis)',
        standard: false,
        professional: true,
        enterprise: true,
        sovereign: true,
      },
      {
        feature: 'EDR (CrowdStrike, SentinelOne, Defender)',
        standard: false,
        professional: true,
        enterprise: true,
        sovereign: true,
      },
    ],
  },
  {
    title: 'Reporting',
    rows: [
      { feature: 'Standard compliance reports', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Insurance-grade report packs', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Forensic-grade report packs', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Chain-of-custody statements', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Evidence proof appendix', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Governance appendix', standard: false, professional: true, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Governance',
    rows: [
      { feature: 'Attestation workflows', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Risk acceptance with expiry', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Governance signature events', standard: false, professional: true, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Security & access',
    rows: [
      { feature: 'MFA (TOTP)', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'MFA (WebAuthn/FIDO2)', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Tenant isolation (RLS)', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Confidence-calibrated assessment', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Customer-managed keys (CMK)', standard: false, professional: false, enterprise: false, sovereign: true },
      { feature: 'Isolated deployment', standard: false, professional: false, enterprise: false, sovereign: true },
    ],
  },
  {
    title: 'Onboarding & support',
    rows: [
      { feature: 'Self-service onboarding', standard: true, professional: false, enterprise: false, sovereign: false },
      { feature: 'Assisted onboarding', standard: false, professional: true, enterprise: false, sovereign: false },
      { feature: 'Dedicated enterprise onboarding', standard: false, professional: false, enterprise: true, sovereign: false },
      { feature: 'Controlled implementation', standard: false, professional: false, enterprise: false, sovereign: true },
      { feature: 'Standard support', standard: true, professional: false, enterprise: false, sovereign: false },
      { feature: 'Priority support', standard: false, professional: true, enterprise: false, sovereign: false },
      { feature: 'Dedicated support', standard: false, professional: false, enterprise: true, sovereign: false },
      { feature: 'White-glove support', standard: false, professional: false, enterprise: false, sovereign: true },
    ],
  },
  {
    title: 'Billing',
    rows: [
      { feature: 'Monthly billing', standard: true, professional: true, enterprise: false, sovereign: false },
      { feature: 'Annual billing (15% discount)', standard: true, professional: true, enterprise: false, sovereign: false },
      { feature: 'Contract-based billing', standard: false, professional: false, enterprise: true, sovereign: true },
    ],
  },
];

export const LENS_COMPARE_CATEGORIES: CompareCategoryDef[] = [
  {
    title: 'Enforcement layers',
    rows: [
      { feature: 'Browser extension', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Endpoint agent', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Network gateway', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'API interceptor', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Cloud application connectors', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'AI output inspection', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Internal LLM API protection', standard: false, professional: false, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Classification & policy',
    rows: [
      { feature: 'Deterministic pattern matching', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Semantic classification', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Prompt injection detection', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'File and image inspection', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Response inspection', standard: false, professional: false, enterprise: true, sovereign: true },
      {
        feature: 'Policy actions: block, warn, allow, audit',
        standard: true,
        professional: true,
        enterprise: true,
        sovereign: true,
      },
      { feature: 'Policy actions: redact, educate', standard: false, professional: true, enterprise: true, sovereign: true },
      {
        feature: 'Policy templates (industry-specific)',
        standard: true,
        professional: true,
        enterprise: true,
        sovereign: true,
      },
    ],
  },
  {
    title: 'Evidence & storage',
    rows: [
      { feature: 'Immutable evidence recording', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Hash-chained evidence ledger', standard: true, professional: true, enterprise: true, sovereign: true },
      {
        feature: 'Evidence retention',
        standard: '12 months',
        professional: '24 months',
        enterprise: 'Up to 7 years',
        sovereign: 'Custom',
      },
      { feature: 'Legal hold', standard: false, professional: false, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Forensics & case management',
    rows: [
      { feature: 'Shadow AI discovery', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Internal AI inventory', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Forensic search & filtering', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Linked event traversal', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Case management', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Chain verification', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Export preparation', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Court-ready evidence packs', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'eDiscovery packages', standard: false, professional: false, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Integrations',
    rows: [
      { feature: 'SIEM (Sentinel, Splunk, QRadar, others)', standard: false, professional: true, enterprise: true, sovereign: true },
      {
        feature: 'XDR/EDR (CrowdStrike, Defender, SentinelOne)',
        standard: false,
        professional: true,
        enterprise: true,
        sovereign: true,
      },
      {
        feature: 'SASE/Proxy (Zscaler, Netskope, Prisma via ICAP)',
        standard: false,
        professional: true,
        enterprise: true,
        sovereign: true,
      },
      { feature: 'ITSM (ServiceNow, Jira)', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Alerting (Slack, Teams, PagerDuty)', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'GRC (ServiceNow GRC)', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Webhook (HMAC-SHA256 signed)', standard: false, professional: true, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Reporting',
    rows: [
      { feature: 'Standard AI governance reports', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Technical governance reports', standard: false, professional: true, enterprise: true, sovereign: true },
      { feature: 'Insurance-grade incident packs', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Audit-grade framework packs', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Regulator-grade submission packs', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Report verification (QR + endpoint)', standard: true, professional: true, enterprise: true, sovereign: true },
    ],
  },
  {
    title: 'Security & access',
    rows: [
      { feature: 'MFA (TOTP)', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'MFA (WebAuthn/FIDO2)', standard: false, professional: false, enterprise: true, sovereign: true },
      { feature: 'Tenant isolation (RLS)', standard: true, professional: true, enterprise: true, sovereign: true },
      { feature: 'Customer-managed keys (CMK)', standard: false, professional: false, enterprise: false, sovereign: true },
      { feature: 'Isolated deployment', standard: false, professional: false, enterprise: false, sovereign: true },
      { feature: 'Sovereign AI boundary', standard: false, professional: false, enterprise: false, sovereign: true },
    ],
  },
  {
    title: 'Onboarding & support',
    rows: [
      { feature: 'Self-service onboarding', standard: true, professional: false, enterprise: false, sovereign: false },
      { feature: 'Assisted onboarding', standard: false, professional: true, enterprise: false, sovereign: false },
      { feature: 'Dedicated enterprise onboarding', standard: false, professional: false, enterprise: true, sovereign: false },
      { feature: 'Controlled implementation', standard: false, professional: false, enterprise: false, sovereign: true },
      { feature: 'Standard support', standard: true, professional: false, enterprise: false, sovereign: false },
      { feature: 'Priority support', standard: false, professional: true, enterprise: false, sovereign: false },
      { feature: 'Dedicated support', standard: false, professional: false, enterprise: true, sovereign: false },
      { feature: 'White-glove support', standard: false, professional: false, enterprise: false, sovereign: true },
    ],
  },
  {
    title: 'Billing',
    rows: [
      { feature: 'Monthly billing', standard: true, professional: true, enterprise: false, sovereign: false },
      { feature: 'Annual billing (15% discount)', standard: true, professional: true, enterprise: false, sovereign: false },
      { feature: 'Contract-based billing', standard: false, professional: false, enterprise: true, sovereign: true },
    ],
  },
];

export const PRICING_BILLING_BLOCKS: { label: string; body: string }[] = [
  {
    label: 'Billing cycles',
    body:
      'Standard and Professional plans are available with monthly or annual billing. Annual plans are billed upfront and include a 15% discount off the monthly rate. Enterprise and Sovereign plans are contract-based with custom billing schedules, including annual prepay, quarterly, and custom invoice arrangements. Government contracts support PO-referenced billing.',
  },
  {
    label: 'Seats and pricing model',
    body:
      'The primary billable unit is one protected named human user equals one billable seat. Service accounts, shared mailboxes, break-glass admin identities, dormant identities not assigned to the protection scope, and excluded non-human identities are not billable by default. Each plan includes a base number of seats. Additional seats beyond the included allocation are billed at the seat overage rate for that plan. Mid-term seat increases are prorated. Seat decreases are applied at the next renewal boundary.',
  },
  {
    label: 'Upgrades and downgrades',
    body:
      'Plan upgrades are applied immediately. When you upgrade mid-term, the new plan takes effect right away and billing is prorated for the remainder of the current period. Plan downgrades are applied at the next term boundary. You retain access to your current plan features until the end of the current billing period, then transition to the new plan at renewal. Evidence collected under the higher plan remains in your tenant — downgrading does not delete historical evidence.',
  },
  {
    label: 'GST and taxation',
    body:
      'All prices displayed on this page are in Australian dollars (AUD) excluding GST. GST is applied as a separate line item on invoices for Australian customers. APEXLyn Pty Ltd is registered for GST. ABN: [ABN NUMBER].',
  },
  {
    label: 'Enterprise and government contracts',
    body:
      'Enterprise, Sovereign, and Government plans are contract-based. Contract terms include: annual contract value (ACV), included seat allocation, additional seat pricing, implementation fee where applicable, contract-specific entitlements, retention profile assignment, support profile assignment, invoice schedule, PO reference support, and renewal tracking. Contact our sales team to discuss contract terms.',
  },
  {
    label: 'Cancellation and offboarding',
    body:
      'Cancellation follows a structured offboarding process. After cancellation, your tenant enters a defined lifecycle: active through end of term, then read-only exit period for data export, then retained-only state where evidence is preserved according to your retention profile. Evidence is not deleted on cancellation — it is retained per your retention policy and any applicable legal hold. Offboarding does not destroy historical evidence, governance proof, or report verification continuity. Your historical reports remain verifiable through the verification endpoint even after your subscription ends, subject to retention policy.',
  },
];

export const PRICING_FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: 'Can I switch between Track and Lens, or do I need both?',
    answer:
      'Track and Lens are independent platforms. You can use either one alone or both together. Many organisations start with Track for compliance evidence and add Lens later when AI governance becomes a priority. The platforms share the same tier structure and the same evidence architecture, so adding the second platform is straightforward.',
  },
  {
    question: 'What happens to my evidence if I downgrade?',
    answer:
      'Evidence collected under a higher plan remains in your tenant. Downgrading does not delete historical evidence or break your evidence chain. You retain read-only access to historical evidence and reports. Framework assessments that require features from the higher plan will show as not assessed on the lower plan, but the underlying evidence remains.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'We do not offer an unassisted free trial. Instead, we offer a baseline assessment — we review your current security environment and provide a structured report showing where your evidence posture is strong and where the gaps are. This gives you a clear picture before committing. Request your baseline assessment at no obligation.',
  },
  {
    question: 'What is included in the starting price?',
    answer:
      'The starting price for each tier includes a base seat allocation, the features listed in the tier card, and the applicable evidence retention period. Additional seats beyond the base allocation are billed at the per-seat overage rate. Extended retention packs are available for Professional and above. Add-ons such as additional export packs or webhook packs are available where applicable.',
  },
  {
    question: 'How does MSP partner billing work?',
    answer:
      'MSP Partners receive a single consolidated bill for all their managed client tenants. Billing is structured at the partner level with per-client seat accounting. Partner discounts and minimum-commit arrangements are available based on your total client count and growth plan. Your clients do not receive APEXLyn invoices — billing flows through you.',
  },
  {
    question: 'Do you offer government pricing?',
    answer:
      'Yes. Government and regulated institution pricing is available under the Sovereign tier. Government contracts support PO-referenced billing, custom invoice schedules, and contract-specific terms. Sovereign deployment includes isolated infrastructure, customer-managed encryption keys, and controlled implementation with security review. Contact us to discuss government pricing.',
  },
];

export function featureListLabel(kind: PricingCardDef['featureListKind']): string {
  switch (kind) {
    case 'included':
      return 'Included:';
    case 'plusStandard':
      return 'Everything in Standard, plus:';
    case 'plusProfessional':
      return 'Everything in Professional, plus:';
    case 'plusEnterprise':
      return 'Everything in Enterprise, plus:';
    default:
      return 'Included:';
  }
}
