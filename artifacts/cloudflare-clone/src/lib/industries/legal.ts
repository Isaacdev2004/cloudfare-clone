import type { IndustryPageConfig } from '@/lib/apexlyn-industry-types';

const CONTACT = '/contact';
const BASELINE = '/baseline';

export const LEGAL_CONFIG: IndustryPageConfig = {
  slug: 'legal',
  posthogPrefix: 'industry_legal',
  hero: {
    eyebrow: 'Legal',
    h1: 'Security evidence for legal practices',
    sub:
      'Legal practices handle information that carries privilege, confidentiality obligations, and regulatory expectations that few other industries face. Client files, case records, trust account data, and privileged communications demand security controls that can be proven — not just claimed. APEXLyn provides that proof for law firms across every Australian jurisdiction.',
    subMaxWidthClass: 'max-w-[620px]',
    ctas: {
      primaryLabel: 'Start a conversation',
      primaryHref: CONTACT,
      secondaryLabel: 'Request your baseline',
      secondaryHref: BASELINE,
    },
  },
  problem: {
    maxWidthClass: 'max-w-[1000px]',
    h2: 'Legal privilege and AI do not mix well without governance',
    paragraphs: [
      'Australian solicitors operate under conduct rules that require protection of client information across every jurisdiction — NSW, VIC, QLD, SA, WA, TAS, ACT, and NT. The confidentiality obligations are not optional and they do not have exceptions for convenience.',
      'At the same time, legal professionals are adopting AI tools rapidly — for research, drafting, case analysis, document review, and client communication. Every time privileged information enters an AI tool without governance, the practice risks breaching its confidentiality obligations in ways that may not be discoverable until litigation or a complaint.',
      'Most legal practices cannot demonstrate their information security posture beyond a checklist completed annually. Insurers, regulators, and clients are beginning to expect more.',
    ],
  },
  track: {
    h2: 'Track — compliance evidence for legal practices',
    layer1:
      'Track collects security evidence automatically from your practice\u2019s systems and maps it to the compliance frameworks that matter for Australian law firms. Evidence is locked in tamper-proof storage and reports can be independently verified by your insurer, your professional indemnity provider, or your regulatory body.',
    layer2: {
      label: 'Legal-sector frameworks in Track',
      paragraphs: [
        'Track includes a Privacy/APP-Aligned Framework Pack specifically designed for legal-sector obligations:',
        'Privacy Act 1988 and all 13 Australian Privacy Principles — assessed against your actual technical controls, not a self-assessment questionnaire.',
        'OAIC Australian Privacy Principles Guidelines — aligned to the OAIC APP Guidelines compilation.',
        'Notifiable Data Breaches scheme — obligations under Part IIIC of the Privacy Act.',
        'Australian Solicitors Conduct Rules — confidentiality and client-information protection obligations with jurisdiction-aware evaluation. During tenant configuration, your practice selects its jurisdiction (NSW, VIC, QLD, SA, WA, TAS, ACT, or NT), and Track evaluates against the applicable conduct rules for that jurisdiction.',
        'Essential Eight (L1–L3) — increasingly required by professional indemnity insurers.',
        'ISO/IEC 27001:2022 — relevant for larger firms or firms with international clients.',
        'Where an obligation requires documentary evidence — privacy policies, training records, client consents, contractual provisions — that Track cannot collect through technical connectors, the platform reports it as insufficient evidence. Track never infers a pass from missing governance documentation.',
      ],
    },
    summaryCard: {
      title: 'What Track collects for legal practices',
      bullets: [
        'MFA and privileged access controls',
        'Device compliance and endpoint security',
        'Cloud security configuration and encryption',
        'Backup and data recovery evidence',
        'Password policies and access management',
        'Endpoint detection and response status',
        'Network and perimeter security posture',
      ],
      foot: 'Evidence is mapped to legal-sector conduct rules on a per-jurisdiction basis.',
    },
  },
  lens: {
    h2: 'Lens — AI governance for legal practices',
    body: [
      'Lawyers and support staff are using AI for research, drafting, case summarisation, and document analysis. Lens monitors every way AI tools are used across your practice — browsers, desktop applications, internal tools — and enforces your rules automatically.',
      'If a solicitor attempts to paste a privileged communication into ChatGPT, Lens can block the interaction, warn the solicitor, redact the privileged content, or record the action for review by the practice\u2019s compliance officer. The practice\u2019s AI policy is not a document in a folder — it is a live enforcement system.',
      'Lens integrates with your existing security tools. If your practice uses Microsoft 365 security, Lens adds AI-specific governance without replacing what you already have.',
    ],
    lensCtaLabel: 'Talk to us about AI governance for legal practices',
  },
  frameworksTable: {
    h2: 'Frameworks relevant to legal',
    rows: [
      { framework: 'Privacy Act & all 13 APPs', relevance: 'Core privacy obligations for legal practices' },
      {
        framework: 'Australian Solicitors\nConduct Rules',
        relevance:
          'Confidentiality and client-information protection. Jurisdiction-aware — NSW, VIC, QLD, SA, WA, TAS, ACT, NT.',
      },
      {
        framework: 'Notifiable Data Breaches\nscheme',
        relevance: 'Breach notification obligations under Part IIIC',
      },
      { framework: 'OAIC APP Guidelines', relevance: 'Practical guidance on APP compliance' },
      { framework: 'Essential Eight (L1–L3)', relevance: 'Professional indemnity and cyber insurance requirements' },
      { framework: 'ISO/IEC 27001:2022', relevance: 'Information security management for larger or international firms' },
    ],
  },
  howItWorks: {
    h2: 'How it works for your practice',
    maxWidthClass: 'max-w-[800px]',
    steps: [
      {
        n: '01',
        title: 'Connect your systems',
        body:
          'Track connects to your Microsoft 365, Active Directory, cloud infrastructure, and endpoint protection. Lens monitors AI use across browsers and endpoints. Your practice selects its jurisdiction during setup.',
      },
      {
        n: '02',
        title: 'Evidence collected automatically',
        body:
          'Track collects compliance evidence on a recurring schedule. Lens monitors AI interactions continuously. No one in your practice needs to export data or compile evidence manually.',
      },
      {
        n: '03',
        title: 'Mapped to legal-sector frameworks',
        body:
          'Track maps your evidence to the Privacy Act, Australian Solicitors Conduct Rules (jurisdiction-specific), Essential Eight, and other relevant frameworks. Lens enforces your AI usage policy and records every governed interaction.',
      },
      {
        n: '04',
        title: 'Reports ready for your insurer and regulator',
        body:
          'When your professional indemnity insurer or the legal services commissioner asks for evidence, Track generates a verified report backed by cryptographic proof. Lens provides forensic evidence of AI governance across your practice.',
      },
    ],
  },
  finalCta: {
    h2: 'Protect client privilege. Prove your security posture.',
    body:
      'Whether you are a sole practitioner, a suburban firm, or a national practice — if you handle client information subject to legal privilege, you need evidence that your security controls work and your AI governance is real.',
    primaryLabel: 'Start a conversation',
    primaryHref: CONTACT,
    secondaryLabel: 'Request your baseline assessment',
    secondaryHref: BASELINE,
  },
};
