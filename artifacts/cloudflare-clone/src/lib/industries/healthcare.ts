import type { IndustryPageConfig } from '@/lib/apexlyn-industry-types';

const CONTACT = '/contact';
const BASELINE = '/baseline';

export const HEALTHCARE_CONFIG: IndustryPageConfig = {
  slug: 'healthcare',
  posthogPrefix: 'industry_healthcare',
  hero: {
    eyebrow: 'Healthcare',
    h1: 'Security evidence for healthcare organisations',
    sub:
      'Your patients trust you with their most sensitive information. Your insurer, your regulator, and the OAIC expect you to prove you are protecting it. APEXLyn gives you that proof — automated compliance evidence and AI governance that works for medical practices, hospitals, aged care facilities, and allied health providers.',
    subMaxWidthClass: 'max-w-[600px]',
    ctas: {
      primaryLabel: 'Start a conversation',
      primaryHref: CONTACT,
      secondaryLabel: 'Request your baseline',
      secondaryHref: BASELINE,
    },
  },
  problem: {
    maxWidthClass: 'max-w-[1000px]',
    h2: 'Healthcare faces a compliance problem that spreadsheets cannot solve',
    paragraphs: [
      'Australian healthcare organisations are governed by the My Health Records Act, the Privacy Act and all 13 Australian Privacy Principles, RACGP information security standards, and increasingly by cyber insurance requirements tied to the Essential Eight.',
      'Most practices and facilities prove their compliance by filling in questionnaires, exporting screenshots, and assembling evidence manually before each audit or insurance renewal. This process is slow, error-prone, and produces evidence that nobody can independently verify.',
      'At the same time, clinical and administrative staff are beginning to use AI tools — for referral letters, clinical notes, patient communication, and administrative tasks. Patient data entering AI tools without governance creates privacy risk, regulatory risk, and reputational risk that most healthcare organisations are not yet equipped to manage.',
    ],
  },
  track: {
    h2: 'Track — compliance evidence for healthcare',
    layer1:
      'Track connects to the systems your practice or facility already uses — Microsoft 365, Active Directory, cloud infrastructure, endpoint protection — and collects security evidence automatically. That evidence is locked in tamper-proof storage, mapped to the compliance frameworks relevant to healthcare, and assembled into reports your insurer and auditor can independently verify. No spreadsheets. No screenshots. No manual compilation before each audit cycle.',
    layer2: {
      label: 'Healthcare frameworks in Track',
      paragraphs: [
        'Track maps your evidence to the frameworks that matter for Australian healthcare:',
        'My Health Records Act 2012 — security and access obligations for organisations participating in the My Health Record system.',
        'RACGP Standards (5th edition, Criterion C6.4) — information security requirements for general practices, including the RACGP Information Security in General Practice guidance.',
        'Healthcare Identifiers Act 2010 — identifier and privacy obligations for organisations handling Healthcare Identifiers.',
        'Privacy Act 1988 and all 13 Australian Privacy Principles — privacy obligations including the Notifiable Data Breaches scheme.',
        'Essential Eight — the ACSC Essential Eight at maturity levels L1, L2, and L3, increasingly required by cyber insurers for healthcare organisations.',
        'Where a healthcare framework requirement depends on policies, training records, contracts, consents, or other governance evidence not automatically collected through technical connectors, Track does not treat that requirement as a pass. It reports it honestly as insufficient evidence so your practice knows exactly where manual governance action is still needed.',
      ],
    },
    summaryCard: {
      title: 'What Track collects for healthcare',
      bullets: [
        'MFA and access control evidence from your identity systems',
        'Device compliance and endpoint protection status',
        'Password policies and privileged access configurations',
        'Cloud security posture and encryption settings',
        'Backup job status, retention, and restore-test evidence',
        'CIS benchmark scan results against your systems',
        'Endpoint detection and response health',
      ],
      foot: 'Collected automatically. Locked permanently. Mapped to healthcare frameworks.',
    },
  },
  lens: {
    h2: 'Lens — AI governance for healthcare',
    showHealthcareVisual: true,
    body: [
      'Clinical staff are using AI tools for referral letters, discharge summaries, patient communication, and clinical decision support. Administrative staff are using AI for billing, rostering, and correspondence. Some of this use is sanctioned. Much of it is not.',
      'Lens monitors how AI tools are used across your organisation — browsers, endpoints, internal tools — and applies your rules automatically. If a staff member attempts to paste patient data into an unsanctioned AI tool, Lens can block it, warn them, redact the sensitive content, or record it for review. Every action is recorded as forensic-grade evidence.',
      'Lens does not replace your existing security tools. If you are using Microsoft 365 security, endpoint protection, or a SASE platform, Lens adds the AI-specific governance layer on top.',
    ],
    lensCtaLabel: 'Talk to us about AI governance in healthcare',
  },
  frameworksTable: {
    h2: 'Frameworks relevant to healthcare',
    rows: [
      {
        framework: 'My Health Records Act\n2012',
        relevance: 'Security and access policy obligations for My Health Record participants',
      },
      {
        framework: 'RACGP Standards (5th ed,\nC6.4)',
        relevance: 'Information security requirements for general practices',
      },
      {
        framework: 'Healthcare Identifiers Act\n2010',
        relevance: 'Identifier and privacy obligations for Healthcare Identifier holders',
      },
      {
        framework: 'Privacy Act & all 13 APPs',
        relevance: 'Privacy obligations including the Notifiable Data Breaches scheme',
      },
      {
        framework: 'Essential Eight (L1–L3)',
        relevance: 'Increasingly required by cyber insurers for healthcare organisations',
      },
      {
        framework: 'ISO/IEC 27001:2022',
        relevance: 'Information security management — relevant for larger health services',
      },
      {
        framework: 'NIST CSF 2.0',
        relevance:
          'Cybersecurity framework alignment for health organisations with\ninternational operations',
      },
    ],
  },
  howItWorks: {
    h2: 'How it works for your practice or facility',
    maxWidthClass: 'max-w-[800px]',
    steps: [
      {
        n: '01',
        title: 'Connect your systems',
        body:
          'Track connects to your Microsoft 365, Active Directory, cloud infrastructure, endpoint protection, and backup systems. Lens monitors AI usage across browsers and endpoints. Setup is assisted — our team guides you through it.',
      },
      {
        n: '02',
        title: 'Evidence collected automatically',
        body:
          'Track collects compliance evidence on a recurring schedule. Lens monitors AI interactions in real time. No one in your team needs to export anything or compile reports manually.',
      },
      {
        n: '03',
        title: 'Mapped to healthcare frameworks',
        body:
          'Track maps your evidence to My Health Records Act, RACGP standards, Essential Eight, Privacy Act, and other relevant frameworks. Lens applies your AI usage policies and records enforcement actions.',
      },
      {
        n: '04',
        title: 'Reports ready for your insurer and auditor',
        body:
          'When your insurer or auditor asks for evidence, Track generates a verified report backed by cryptographic proof. When your board or management asks about AI governance, Lens provides forensic evidence of what happened and what was done about it.',
      },
    ],
  },
  finalCta: {
    h2: 'Protect your patients. Prove your security.',
    body:
      'Whether you run a single GP practice, a specialist clinic, a hospital, or an aged care facility — if you handle patient data, you need evidence that your security controls are working. Not a questionnaire. Not a spreadsheet. Evidence.',
    primaryLabel: 'Start a conversation',
    primaryHref: CONTACT,
    secondaryLabel: 'Request your baseline assessment',
    secondaryHref: BASELINE,
  },
};
