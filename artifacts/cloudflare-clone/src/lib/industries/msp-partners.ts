import type { IndustryPageConfig } from '@/lib/apexlyn-industry-types';

const CONTACT = '/contact';
const BASELINE = '/baseline';
const PRICING = '/pricing';

export const MSP_PARTNERS_CONFIG: IndustryPageConfig = {
  slug: 'msp-partners',
  posthogPrefix: 'industry_msp',
  hero: {
    eyebrow: 'MSP & Partners',
    h1: 'Compliance evidence and AI governance for your clients, under your brand',
    sub:
      'Your clients need compliance evidence their insurers will accept and AI governance that actually works. You need a platform you can white-label, manage at scale, and deliver profitably. APEXLyn Partner gives you both — your brand on the portal and reports, our evidence integrity underneath.',
    ctas: {
      primaryLabel: 'Talk to us about partnership',
      primaryHref: CONTACT,
      secondaryLabel: 'See pricing',
      secondaryHref: PRICING,
    },
  },
  mspFeatures: [
    {
      icon: 'palette',
      title: 'Your brand everywhere',
      body:
        'Your logo on the portal header, PDF cover page, footer, and contact details. Your clients see your brand. The underlying evidence, hashes, requirement IDs, and assessment statuses are never altered by branding.',
    },
    {
      icon: 'layout-dashboard',
      title: 'Portfolio dashboard',
      body:
        'See all your clients in one view. Hotspots show where attention is needed. Heatmaps show posture across your client base. Trends show improvement over time. Drill from portfolio to tenant to framework to control to evidence proof. Supports 500+ tenants with precomputed snapshots.',
    },
    {
      icon: 'copy',
      title: 'Template propagation',
      body:
        'Create policy templates and framework configurations once. Push them to client tenants. Maintain consistency across your client base without configuring each tenant individually.',
    },
    {
      icon: 'credit-card',
      title: 'Consolidated billing',
      body:
        'One bill for all your clients. Client-level seat accounting. Partner discount and minimum-commit support. Your clients do not receive APEXLyn invoices — billing flows through you.',
    },
    {
      icon: 'user-check',
      title: 'Client onboarding',
      body:
        'Onboard new clients through the partner portal. Guided connector setup, framework selection, and first-report readiness checks. Monitor onboarding progress across your client base.',
    },
    {
      icon: 'arrow-right-left',
      title: 'Direct conversion tracking',
      body:
        'If a client decides to move from MSP-managed to direct, the conversion preserves the same tenant, the same evidence, and the same history. No data loss, no new tenant, no evidence chain break. The transition is tracked and auditable.',
    },
  ],
  track: {
    h2: 'Deliver compliance evidence your clients\u2019 insurers will accept',
    layer1:
      'Your clients need Essential Eight evidence for their cyber insurer. They need ISO 27001 mapping for enterprise contracts. They need Privacy Act compliance for their own customers. Track delivers all of this from the same evidence base — collected automatically from your clients\u2019 systems, locked in tamper-proof storage, and assembled into reports that carry your branding and our evidence integrity.',
    layer2: {
      label: 'What Track gives your MSP practice',
      paragraphs: [
        'Essential Eight at L1, L2, and L3 — selectable per client tenant. The most common compliance requirement your clients face from cyber insurers.',
        'CIS Benchmarks — Microsoft 365, Chrome, Windows 11, Windows Server. Technical baselines you can assess across your client base.',
        'ISO 27001:2022 — for clients with enterprise contracts or international obligations.',
        'APRA CPS 234 — for clients in financial services or insurance.',
        'Privacy Act & all 13 APPs — for all client types handling personal information.',
        'Reports carry your branding but the underlying evidence is cryptographically verifiable and independently auditable. Your client\u2019s insurer can verify a report\u2019s authenticity without contacting you or APEXLyn.',
        'Portfolio-level visibility lets you see which clients are strong, which have gaps, which have stale evidence, and which need attention — across hundreds of tenants in a single dashboard.',
      ],
    },
    summaryCard: {
      title: 'Partner-ready delivery',
      bullets: [
        'White-label reports with verifiable hashes',
        'Per-tenant Essential Eight and framework views',
        'Portfolio drill-down to immutable evidence',
        'Client insurer verification without partner bottleneck',
      ],
      foot: 'Your brand on the surface. Evidence integrity underneath.',
    },
  },
  lens: {
    h2: 'Add AI governance to your service offering',
    body: [
      'Your clients are asking about AI governance. Their employees are using ChatGPT, Copilot, and other AI tools with client data. Lens lets you deliver AI governance as a managed service — monitoring, policy enforcement, and forensic evidence across your client base.',
      'White-label Lens alongside Track and offer a complete security evidence and AI governance package. Same partner portal. Same billing consolidation. Same brand.',
    ],
    lensCtaLabel: 'Talk to us about adding Lens to your MSP offering',
  },
  mspPartnerPricing: {
    h2: 'Partner pricing',
    body:
      'MSP Partner pricing is structured around your client base — consolidated billing, per-client seat accounting, and partner tier discounts based on commitment. Pricing is not published on this page because partner arrangements are tailored to your practice size and growth plan.',
    ctaLabel: 'Request partner pricing details',
    foot: 'We will provide a detailed partner pricing proposal based on your current client count, target growth, and the Track and Lens capabilities you want to deliver.',
  },
  finalCta: {
    h2: 'Your brand. Our evidence integrity. Your clients protected.',
    body:
      'Whether you manage 10 clients or 500, APEXLyn Partner gives you compliance evidence and AI governance you can deliver profitably, at scale, under your own brand — with evidence your clients\u2019 insurers will actually accept.',
    primaryLabel: 'Talk to us about partnership',
    primaryHref: CONTACT,
    secondaryLabel: 'Request your baseline assessment',
    secondaryHref: BASELINE,
  },
};
