import type { IndustryPageConfig } from '@/lib/apexlyn-industry-types';

const CONTACT = '/contact';
const BASELINE = '/baseline';

export const INSURANCE_CONFIG: IndustryPageConfig = {
  slug: 'insurance',
  posthogPrefix: 'industry_insurance',
  hero: {
    eyebrow: 'Insurance',
    h1: 'Security evidence for the insurance industry',
    sub:
      'Insurers, brokers, and underwriters operate under APRA prudential standards that demand provable information security. At the same time, AI is entering claims processing, underwriting, and customer communications faster than governance can keep up. APEXLyn provides the compliance evidence and AI governance the insurance industry needs — for your own organisation and for the organisations you insure.',
    ctas: {
      primaryLabel: 'Start a conversation',
      primaryHref: CONTACT,
      secondaryLabel: 'Request your baseline',
      secondaryHref: BASELINE,
    },
  },
  problem: {
    maxWidthClass: 'max-w-[1000px]',
    h2: 'Insurance operates on two sides of the evidence problem',
    paragraphs: [
      'On one side, insurers are regulated entities. APRA CPS 234 requires information security capabilities that are maintained and aligned to the size and extent of threats. APRA expects evidence, not assertions. Board reporting requires defensible posture statements.',
      'On the other side, insurers are underwriting cyber risk for their customers. Current underwriting relies heavily on self-assessment questionnaires — the insured ticks boxes, nobody independently verifies the answers, and when a claim arrives, the insurer discovers that the MFA they were told was enabled was never actually configured.',
      'APEXLyn addresses both sides. Track provides compliance evidence for the insurer\u2019s own APRA obligations. And Track provides independently verifiable evidence that can transform how insurers assess the security posture of prospective and existing insureds.',
    ],
  },
  track: {
    h2: 'Track for your own compliance',
    layer1:
      'Track collects security evidence from your own systems automatically and maps it to APRA CPS 234, Essential Eight, ISO 27001, and other relevant frameworks. Evidence is locked in tamper-proof storage and reports are generated with chain-of-custody statements, governance attestation records, and independent verification capability.',
    layer2: {
      label: 'APRA CPS 234 in Track',
      paragraphs: [
        'APRA CPS 234 requires regulated entities to maintain information security capabilities commensurate with the size and extent of threats to their information assets. Track maps your technical evidence to CPS 234 requirement areas including:',
        '— Information security capability',
        '— Policy framework evidence',
        '— Information asset identification evidence',
        '— Access control and privilege management evidence',
        '— Incident management posture evidence',
        '— Testing evidence where exposed through connected systems',
        'Track generates reports suitable for APRA regulatory purposes, board reporting, and internal audit review. Reports include plain-English executive summaries, risk scorecards, and technical evidence appendices — satisfying both board-level and technical audiences from the same evidence base.',
        'Where CPS 234 requirements depend on governance documentation, policies, or board attestations not automatically collected through technical connectors, Track surfaces these honestly as insufficient evidence rather than inferring a pass.',
      ],
    },
  },
  insuranceUnderwriting: {
    h2: 'Track for cyber underwriting — a different class of evidence',
    intro: [
      'Current cyber insurance underwriting relies on self-assessment. The prospective insured fills in a questionnaire. The underwriter takes their word for it. When a claim arrives, the gap between the questionnaire answers and reality is often significant.',
      'Track changes this dynamic. Instead of asking "do you have MFA enabled?" and accepting a checkbox answer, Track provides cryptographic proof that MFA was enabled on specific systems, on specific devices, at specific times — with an unbroken evidence chain that the underwriter can independently verify.',
      'Every Track report includes:',
    ],
    listIntro: '',
    listItems: [
      'An assertion statement describing exactly what was assessed',
      'A non-assertion statement describing what was not',
      'A chain-of-custody statement',
      'Cryptographic hash proof for every piece of evidence referenced',
      'Independent verification via QR code or verification endpoint',
    ],
    closing:
      'An underwriter receiving a Track report does not need to trust APEXLyn\u2019s claims. They verify the mathematics. The report either matches the evidence ledger or it does not. There is no ambiguity. If your organisation is interested in how Track evidence could integrate with your underwriting workflow, we would welcome a conversation.',
    ctaLabel: 'Talk to us about Track for underwriting',
  },
  lens: {
    h2: 'Lens — AI governance for insurance operations',
    body: [
      'AI is entering claims processing, underwriting automation, customer correspondence, and policy analysis. Lens monitors how AI tools are used across your organisation, applies your governance policies automatically, and records every governed interaction as forensic-grade evidence.',
      'If a claims handler pastes policyholder data into an unsanctioned AI tool, Lens enforces your rules — block, warn, redact, or record. If an automated underwriting pipeline calls an AI API with sensitive customer data, Lens governs the interaction even though no human initiated it through a browser.',
      'Lens integrates with your existing security infrastructure — SIEM, XDR, SASE, ITSM — and adds the AI governance layer on top.',
    ],
    lensCtaLabel: 'Talk to us about AI governance for insurance',
  },
  frameworksTable: {
    h2: 'Frameworks relevant to insurance',
    rows: [
      { framework: 'APRA CPS 234', relevance: 'Information security requirements for APRA-regulated entities' },
      {
        framework: 'Essential Eight (L1–L3)',
        relevance: 'Cybersecurity maturity — relevant for own posture and insured assessment',
      },
      { framework: 'ISO/IEC 27001:2022', relevance: 'Information security management standard' },
      { framework: 'Privacy Act & all 13\nAPPs', relevance: 'Privacy obligations for policyholder and claimant data' },
      { framework: 'NIST CSF 2.0', relevance: 'Cybersecurity framework for international operations' },
    ],
  },
  finalCta: {
    h2: 'Evidence for both sides of the insurance equation',
    body:
      'Whether you need APRA CPS 234 evidence for your own compliance, independently verifiable evidence from your insureds, or AI governance across your claims and underwriting operations — APEXLyn provides the proof.',
    primaryLabel: 'Start a conversation',
    primaryHref: CONTACT,
    secondaryLabel: 'Request your baseline assessment',
    secondaryHref: BASELINE,
  },
};
