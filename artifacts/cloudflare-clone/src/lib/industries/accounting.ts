import type { IndustryPageConfig } from '@/lib/apexlyn-industry-types';

const CONTACT = '/contact';
const BASELINE = '/baseline';

export const ACCOUNTING_CONFIG: IndustryPageConfig = {
  slug: 'accounting',
  posthogPrefix: 'industry_accounting',
  hero: {
    eyebrow: 'Accounting & Finance',
    h1: 'Security evidence for accounting and finance',
    sub:
      'Accounting firms manage client financial data that is subject to professional obligations, privacy requirements, and increasingly strict cyber insurance expectations. APEXLyn provides the compliance evidence and AI governance that accounting practices need to satisfy insurers, regulators, and clients — automatically.',
    ctas: {
      primaryLabel: 'Start a conversation',
      primaryHref: CONTACT,
      secondaryLabel: 'Request your baseline',
      secondaryHref: BASELINE,
    },
  },
  problem: {
    maxWidthClass: 'max-w-[1000px]',
    h2: 'Client financial data demands provable security',
    paragraphs: [
      'Accounting firms hold tax file numbers, financial statements, payroll records, bank account details, and business-critical client data. The professional and regulatory expectations around this data are increasing — driven by the Privacy Act reforms, Essential Eight adoption by insurers, and client expectations shaped by high-profile breaches.',
      'At the same time, accounting professionals are adopting AI tools for tax analysis, financial modelling, report generation, and client communication. Client financial data entering AI tools without governance creates compliance risk, privacy risk, and professional liability risk.',
      'Most accounting firms prove their security posture through annual self-assessments. This is no longer sufficient for many cyber insurers and increasingly insufficient for client expectations.',
    ],
  },
  track: {
    h2: 'Track — compliance evidence for accounting',
    layer1:
      'Track connects to the systems your firm already uses and collects security evidence automatically. That evidence is mapped to the compliance frameworks relevant to accounting — ISO 27001, Essential Eight, Privacy Act — and assembled into reports your insurer can independently verify.',
    layer2: {
      label: 'Accounting frameworks in Track',
      paragraphs: [
        'ISO/IEC 27001:2022 — the international standard for information security management, commonly expected by larger clients and increasingly by professional bodies.',
        'Essential Eight (L1–L3) — the ACSC Essential Eight mitigation strategies, increasingly required by cyber insurers for accounting firms.',
        'Privacy Act 1988 and all 13 APPs — privacy obligations for firms handling client personal and financial information.',
        'NIST CSF 2.0 — relevant for firms with international clients or cross-border operations.',
        'CIS Benchmarks — technical security baselines for Microsoft 365, Windows, and browser configurations.',
      ],
    },
    summaryCard: {
      title: 'What Track collects for accounting firms',
      bullets: [
        'MFA and privileged access evidence',
        'Device compliance and endpoint protection',
        'Cloud security and encryption configuration',
        'Backup job status and restore-test evidence',
        'Password policies and access management',
        'CIS benchmark results against your systems',
        'Endpoint detection and response health',
      ],
      foot: 'Evidence mapped to ISO 27001, Essential Eight, and Privacy Act.',
    },
  },
  lens: {
    h2: 'Lens — AI governance for accounting',
    body: [
      'Staff are using AI tools for tax research, report drafting, financial analysis, and client communication. Lens monitors AI use across your firm and enforces your policies — blocking, warning, or recording when client financial data enters AI tools without appropriate controls.',
      'Lens works alongside your existing security tools. If your firm uses Microsoft 365 security or endpoint protection, Lens adds AI-specific governance without replacing anything.',
    ],
    lensCtaLabel: 'Talk to us about AI governance for accounting',
  },
  frameworksTable: {
    h2: 'Frameworks relevant to accounting',
    rows: [
      { framework: 'ISO/IEC 27001:2022', relevance: 'Information security management — expected by larger clients' },
      { framework: 'Essential Eight (L1–L3)', relevance: 'Cyber insurance requirements' },
      { framework: 'Privacy Act & all 13 APPs', relevance: 'Privacy obligations for client personal and financial data' },
      { framework: 'NIST CSF 2.0', relevance: 'International cybersecurity framework alignment' },
      { framework: 'CIS Benchmarks', relevance: 'Technical baselines for Microsoft 365 and Windows' },
    ],
  },
  howItWorks: {
    h2: 'How it works for your firm',
    maxWidthClass: 'max-w-[800px]',
    steps: [
      {
        n: '01',
        title: 'Connect your systems',
        body:
          'Track connects to your Microsoft 365, Active Directory, cloud infrastructure, and endpoint protection. Lens monitors AI use across browsers and endpoints.',
      },
      {
        n: '02',
        title: 'Evidence collected automatically',
        body:
          'Track collects compliance evidence on a recurring schedule. Lens monitors AI interactions in real time. No manual exports.',
      },
      {
        n: '03',
        title: 'Mapped to accounting frameworks',
        body:
          'Track maps your evidence to ISO 27001, Essential Eight, Privacy Act, and CIS Benchmarks. Lens applies your AI usage policies and records enforcement actions.',
      },
      {
        n: '04',
        title: 'Reports ready for your insurer and clients',
        body:
          'When your cyber insurer or a key client asks for evidence, Track generates a verified report. When your practice manager asks about AI governance, Lens provides the proof.',
      },
    ],
  },
  finalCta: {
    h2: 'Protect client data. Prove your security.',
    body:
      'Whether you are a sole practitioner, a mid-size firm, or a national practice — if you handle client financial data, you need compliance evidence and AI governance that works automatically.',
    primaryLabel: 'Start a conversation',
    primaryHref: CONTACT,
    secondaryLabel: 'Request your baseline assessment',
    secondaryHref: BASELINE,
  },
};
