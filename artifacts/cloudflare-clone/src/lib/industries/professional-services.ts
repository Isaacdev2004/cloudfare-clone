import type { IndustryPageConfig } from '@/lib/apexlyn-industry-types';

const CONTACT = '/contact';
const BASELINE = '/baseline';

export const PROFESSIONAL_SERVICES_CONFIG: IndustryPageConfig = {
  slug: 'professional-services',
  posthogPrefix: 'industry_professional',
  hero: {
    eyebrow: 'Professional Services',
    h1: 'Security evidence for professional services',
    sub:
      'Consulting firms, engineering practices, recruitment agencies, and professional service providers handle sensitive client data across every engagement. Your clients expect security. Your insurers demand evidence. APEXLyn provides the compliance proof and AI governance that professional services organisations need.',
    ctas: {
      primaryLabel: 'Start a conversation',
      primaryHref: CONTACT,
      secondaryLabel: 'Request your baseline',
      secondaryHref: BASELINE,
    },
  },
  problem: {
    maxWidthClass: 'max-w-[1000px]',
    h2: 'Client data flows through professional services every day',
    paragraphs: [
      'Professional services firms handle sensitive client information as a core part of operations — project details, financial data, personnel records, strategic plans, intellectual property, and confidential business information. This data is subject to contractual confidentiality obligations, privacy requirements, and increasingly to cyber insurance expectations.',
      'Staff across consulting, engineering, recruitment, and other professional services are adopting AI tools for analysis, report writing, candidate assessment, project management, and client communication. Without governance, client data is entering AI tools in ways that breach confidentiality obligations and create liability exposure.',
      'Most professional services firms cannot demonstrate their security posture beyond a basic questionnaire. This is increasingly insufficient for enterprise clients who require vendor security evidence before engagement.',
    ],
  },
  track: {
    h2: 'Track — compliance evidence for professional services',
    layer1:
      'Track collects security evidence automatically and maps it to ISO 27001, Essential Eight, Privacy Act, and other frameworks relevant to professional services. Evidence is locked in tamper-proof storage and reports can be verified independently — giving your clients and your insurer the confidence they need.',
    layer2: {
      label: 'Professional services frameworks',
      paragraphs: [
        'ISO/IEC 27001:2022 — the standard most commonly requested by enterprise clients evaluating vendor security.',
        'Essential Eight (L1–L3) — cyber insurance baseline increasingly expected for professional services.',
        'Privacy Act & all 13 APPs — privacy obligations for handling client personal information.',
        'NIST CSF 2.0 — relevant for firms with international clients or projects.',
      ],
    },
    summaryCard: {
      title: 'What Track collects',
      bullets: [
        'MFA and access control evidence',
        'Device and endpoint compliance',
        'Cloud security and encryption configuration',
        'Backup and recovery evidence',
        'Password and privileged access posture',
        'EDR health and CIS benchmark results',
      ],
      foot: 'Mapped to ISO 27001, Essential Eight, Privacy Act, and NIST CSF.',
    },
  },
  lens: {
    h2: 'Lens — AI governance for professional services',
    body: [
      'Lens monitors AI use across your firm and enforces your policies. If a consultant pastes client strategy documents into an AI tool, or a recruiter uploads candidate CVs to an AI platform, Lens governs the interaction — blocking, warning, redacting, or recording it based on your rules.',
      'Lens works alongside your existing security tools and does not require replacing anything you already use.',
    ],
    lensCtaLabel: 'Talk to us about AI governance',
  },
  frameworksTable: {
    h2: 'Frameworks relevant to professional services',
    rows: [
      { framework: 'ISO/IEC 27001:2022', relevance: 'Enterprise client vendor assurance' },
      { framework: 'Essential Eight (L1–L3)', relevance: 'Cyber insurance baseline' },
      { framework: 'Privacy Act & all 13 APPs', relevance: 'Client personal information' },
      { framework: 'NIST CSF 2.0', relevance: 'International or multi-jurisdictional clients' },
    ],
  },
  howItWorks: {
    h2: 'How it works for your organisation',
    maxWidthClass: 'max-w-[800px]',
    steps: [
      {
        n: '01',
        title: 'Connect your systems',
        body: 'Track connects to Microsoft 365, Active Directory, cloud, and endpoints. Lens monitors AI across browsers and devices.',
      },
      {
        n: '02',
        title: 'Evidence collected automatically',
        body: 'Recurring compliance evidence and continuous AI monitoring — no manual compilation.',
      },
      {
        n: '03',
        title: 'Mapped to the frameworks that matter',
        body: 'ISO 27001, Essential Eight, Privacy Act, and NIST CSF views — plus enforced AI policies.',
      },
      {
        n: '04',
        title: 'Prove posture to clients and insurers',
        body: 'Verified Track reports and Lens forensic records when stakeholders ask for proof.',
      },
    ],
  },
  finalCta: {
    h2: 'Prove your security to your clients and your insurer',
    body:
      'Whether you are a boutique consulting firm, an engineering practice, or a national recruitment agency — if you handle client data, your security posture needs to be provable.',
    primaryLabel: 'Start a conversation',
    primaryHref: CONTACT,
    secondaryLabel: 'Request your baseline assessment',
    secondaryHref: BASELINE,
  },
};
