import React, { useCallback, useState } from 'react';
import { Link } from 'wouter';
import {
  Briefcase,
  Calculator,
  ChevronDown,
  HeartPulse,
  Linkedin,
  Network,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { HeroHomePlatformVisual } from '@/components/hero/HeroHomePlatformVisual';
import {
  HomeLensPlatformCardVisual,
  HomeTrackPlatformCardVisual,
} from '@/components/home/HomePlatformCardVisuals';
import {
  TrustChainVisual,
  TrustRegionVisual,
  TrustStackVisual,
  TrustVerifyVisual,
} from '@/components/home/HomeTrustVisuals';
import { cn } from '@/lib/utils';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { FOUNDER_LINKEDIN_URL } from '@/lib/apexlyn-company';

/** §27 — Homepage copy verbatim from APEXLyn Public Website — Complete Build Specification v2.0 (Part 3). */

const POSITIONING_ITEMS = [
  'Australian-built',
  'Evidence infrastructure',
  'Two platforms',
  'SMB to government',
  'Compliance + AI governance',
  'Designed as infrastructure-grade',
] as const;

const HOW_STEPS = [
  {
    n: '01',
    title: 'Connect your systems',
    body:
      'Track connects to Microsoft 365, Active Directory, AWS, Azure, Google Cloud, CIS scanners, backup tools, and EDR platforms. Lens monitors browsers, endpoints, gateways, APIs, and cloud apps. No manual uploads.',
  },
  {
    n: '02',
    title: 'Evidence collected automatically',
    body:
      'Both platforms collect evidence on a policy-driven schedule. Every piece of evidence is a structured, timestamped record bound to the source system and tenant.',
  },
  {
    n: '03',
    title: 'Locked in tamper-proof storage',
    body:
      'Evidence is written to permanent storage that cannot be altered or deleted. Each record is cryptographically linked to the previous record, creating an unbroken chain of proof.',
  },
  {
    n: '04',
    title: 'Mapped to frameworks and policies',
    body:
      'Track maps evidence to compliance frameworks — Essential Eight, ISO 27001, NIST, APRA CPS 234, and more. Lens applies your AI usage policies across every enforcement layer.',
  },
  {
    n: '05',
    title: 'Reports you can verify',
    body:
      'Generate insurance-grade and audit-grade reports backed by cryptographic proof. Every report can be independently verified — including via QR code — without needing platform access.',
  },
] as const;

const FRAMEWORK_CARDS: { title: string; body: string }[] = [
  {
    title: 'Essential Eight',
    body: 'ACSC Essential Eight at maturity levels L1, L2, and L3. All eight mitigation strategies assessed with automated evidence.',
  },
  {
    title: 'CIS Benchmarks',
    body: 'Microsoft 365, Google Chrome, Windows 11, and Windows Server. Profile-based assessment from ingested scan results.',
  },
  {
    title: 'ISO/IEC 27001:2022',
    body: 'Clause-level and Annex A control-level assessment. Mapped to your evidence through universal controls.',
  },
  {
    title: 'NIST CSF 2.0',
    body: 'Function, category, and subcategory assessment. Aligned to your existing security evidence.',
  },
  {
    title: 'APRA CPS 234',
    body: 'Information security assessment designed for financial services, insurers, and banking. Governance-evidence compatible.',
  },
  {
    title: 'Healthcare',
    body: 'My Health Records Act, RACGP information security standards, and Healthcare Identifiers obligations.',
  },
  {
    title: 'Privacy Act & APPs',
    body: 'All 13 Australian Privacy Principles, OAIC guidelines, and the Notifiable Data Breaches scheme. Jurisdiction-aware legal-sector evaluation.',
  },
  {
    title: 'ASD ISM',
    body: 'Australian Signals Directorate Information Security Manual. Government-grade framework assessment.',
  },
];

const INDUSTRY_CARDS: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  href: string;
}[] = [
  {
    icon: HeartPulse,
    title: 'Healthcare',
    body:
      'Medical practices, hospitals, aged care, and allied health. Track maps to My Health Records Act and RACGP standards. Lens protects patient data from AI exposure.',
    href: '/industries/healthcare',
  },
  {
    icon: Scale,
    title: 'Legal',
    body:
      'Law firms and legal practices across all Australian jurisdictions. Track assesses Privacy Act obligations with jurisdiction-aware evaluation. Lens prevents privileged information from reaching AI tools.',
    href: '/industries/legal',
  },
  {
    icon: Calculator,
    title: 'Accounting & Finance',
    body:
      'Accounting firms, financial advisors, and bookkeepers. Track maps to ISO 27001 and Essential Eight. Lens governs AI use with client financial data.',
    href: '/industries/accounting',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance',
    body:
      'Insurers, brokers, and underwriters. Track maps directly to APRA CPS 234 and generates evidence packs for underwriting. Lens governs AI in claims and policy processing.',
    href: '/industries/insurance',
  },
  {
    icon: Briefcase,
    title: 'Professional Services',
    body:
      'Consulting firms, engineering practices, and recruitment agencies. Track provides compliance evidence for client-facing obligations. Lens prevents sensitive client data from leaking into AI tools.',
    href: '/industries/professional-services',
  },
  {
    icon: Network,
    title: 'MSP & Partners',
    body:
      'Managed service providers delivering compliance and AI governance to client bases. White-label Track and Lens with your branding, consolidated billing, and portfolio dashboards.',
    href: '/industries/msp-partners',
  },
];

type TrustRow = {
  key: string;
  h3: string;
  layer1: string;
  layer2Label: string;
  layer2: string;
  visual: React.ReactNode;
  visualLeft: boolean;
};

const TRUST_ROWS: TrustRow[] = [
  {
    key: 'immutable',
    h3: 'Evidence that cannot be changed',
    layer1:
      'When Track or Lens collects a piece of evidence, it is written to tamper-proof storage immediately. Each record is cryptographically linked to the one before it, creating an unbroken chain. If anyone attempts to alter evidence after the fact, the chain breaks and the tampering is detected automatically.',
    layer2Label: 'How this works',
    layer2:
      'Evidence is committed to WORM storage (Write Once, Read Many). A SHA-256 hash is computed for each evidence record, and each hash is chained to the previous record in a per-tenant ledger. The evidence ledger is append-only — there is no update and no delete at any layer of the system. Reports generated from this evidence carry the chain reference and can be independently verified through a verification endpoint.',
    visual: <TrustChainVisual />,
    visualLeft: false,
  },
  {
    key: 'residency',
    h3: 'All data stays in Australia',
    layer1:
      'Both platforms are hosted in AWS Sydney. Your evidence, reports, audit logs, and governance records do not leave Australia. This is enforced at the infrastructure level, not just by policy.',
    layer2Label: 'Technical detail',
    layer2:
      'All data resides in AWS Sydney (ap-southeast-2). No cross-region replication is permitted. Storage policies enforce region-locked access. Database instances run in private subnets with no public internet exposure. Logging and monitoring stay within the Australian region. Encryption at rest uses AES-256 via AWS KMS. Encryption in transit uses TLS 1.3.',
    visual: <TrustRegionVisual />,
    visualLeft: true,
  },
  {
    key: 'verify',
    h3: 'Reports anyone can verify',
    layer1:
      'Every report generated by Track includes a cryptographic proof trail. Insurers, auditors, and regulators can verify that a report is genuine and unaltered — without needing platform access and without trusting APEXLyn.',
    layer2Label: 'How verification works',
    layer2:
      "Each report's hash is recorded in the evidence ledger at the time of generation. A verification endpoint allows any authorised reviewer to check the report hash against the ledger and confirm its authenticity. Reports can optionally include a QR code that links directly to the verification endpoint. The verification response confirms the report is valid without revealing any tenant data beyond the verification metadata.",
    visual: <TrustVerifyVisual />,
    visualLeft: false,
  },
  {
    key: 'stack',
    h3: 'Adds to your security stack — does not replace it',
    layer1:
      'Already using Microsoft, CrowdStrike, Zscaler, Netskope, Splunk, or ServiceNow? APEXLyn connects to your existing security tools and adds the evidence layer they do not have. Your tools keep working. APEXLyn makes them provable.',
    layer2Label: 'Integration detail',
    layer2:
      'Track ingests evidence from Microsoft 365, Active Directory, AWS, Azure, Google Cloud, CIS scanners (CIS-CAT Pro, Tenable, Qualys), backup software (Veeam, Datto, Acronis), and EDR platforms (CrowdStrike, SentinelOne, Microsoft Defender). Lens integrates natively with 22 enterprise security platforms across SIEM (Sentinel, Splunk, QRadar), XDR/EDR (CrowdStrike Falcon, Microsoft Defender XDR), SASE (Zscaler, Netskope, Prisma via ICAP), ITSM (ServiceNow, Jira), and alerting (Slack, Teams, PagerDuty). Data exchange is bidirectional where supported.',
    visual: <TrustStackVisual />,
    visualLeft: true,
  },
];

const PRICING_PREVIEW = [
  {
    tier: 'Standard',
    price: 'From A$349/month',
    desc: 'Automated evidence collection and compliance mapping for growing businesses.',
  },
  {
    tier: 'Professional',
    price: 'From A$899/month',
    desc: 'Deeper frameworks, assisted onboarding, and stronger connectors for organisations with real compliance obligations.',
  },
  {
    tier: 'Enterprise',
    price: 'From A$75,000/year',
    desc: 'Full platform access, dedicated support, forensic workspace, and legal hold for organisations with dedicated compliance requirements.',
  },
  {
    tier: 'Sovereign',
    price: 'Contact us',
    desc: 'Isolated deployment, customer-managed keys, and the highest evidence assurance for government, banking, and insurance carriers.',
  },
] as const;

const container = 'max-w-[1200px] mx-auto px-6 sm:px-8';

export default function Home() {
  const [openTrust, setOpenTrust] = useState<string | null>(null);

  const toggleTrust = useCallback(
    (key: string, sectionHeading: string) => {
      setOpenTrust((prev) => {
        const next = prev === key ? null : key;
        if (next === key && prev !== key) {
          capturePosthogEvent('homepage_layer2_expanded', { section: sectionHeading });
        }
        return next;
      });
    },
    [],
  );

  return (
    <div className="flex flex-col bg-white">
      {/* §27.1 — Single hero visual (right column); hidden below lg per PDF. Track/Lens art: §27.3 cards. */}
      <section className="relative overflow-x-clip bg-[#0B1320] text-white">
        <div className={cn(container, 'pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20')}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">
                Australian Cybersecurity &amp; AI Governance
              </p>
              <h1 className="mb-6 text-[32px] font-bold leading-[1.2] text-white lg:text-[48px]">
                Where security becomes evidence
              </h1>
              <p className="mb-8 max-w-[540px] text-[16px] leading-[1.7] text-white/85 lg:text-[18px]">
                APEXLyn builds evidence infrastructure for Australian organisations. Two platforms — Track for compliance
                and Lens for AI governance — make your security posture provable, not just claimed. From small business to
                government, across every industry.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/baseline"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-[16px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB]"
                  onClick={() =>
                    capturePosthogEvent('homepage_hero_cta_clicked', { cta_label: 'Test your security state' })
                  }
                >
                  Test your security state
                </Link>
                <Link
                  href="/architecture"
                  className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-white/40 px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-white/10"
                  onClick={() => capturePosthogEvent('homepage_hero_cta_clicked', { cta_label: 'See how it works' })}
                >
                  See how it works
                </Link>
              </div>
            </div>
            <div className="relative hidden min-h-0 min-w-0 flex-col items-center justify-center lg:col-span-5 lg:flex lg:min-h-[min(54vh,460px)]">
              <div className="flex h-full w-full max-w-[520px] flex-1 items-center justify-center">
                <HeroHomePlatformVisual className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §27.2 Positioning strip */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className={cn(container, 'py-6')}>
          <div className="flex flex-wrap items-center justify-center gap-y-4 text-center sm:justify-between">
            {POSITIONING_ITEMS.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && (
                  <span
                    className="mx-2 hidden h-5 w-px bg-[#E5E7EB] lg:inline-block"
                    aria-hidden
                  />
                )}
                <span className="w-[calc(50%-8px)] text-[14px] font-medium text-[#4B5563] sm:w-auto">{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* §27.3 — padding 96px vertical per PDF */}
      <section className="border-t border-[#E5E7EB] bg-[#F7F9FC] py-24">
        <div className={container}>
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <h2 className="mb-5 text-[26px] font-bold leading-[1.25] text-[#111827] md:text-[36px]">
              Two platforms. One evidence standard.
            </h2>
            <p className="text-[17px] leading-[1.7] text-[#4B5563]">
              APEXLyn operates two platforms that share a common evidence architecture. Track makes compliance provable.
              Lens makes AI governance provable. Together, they give your organisation evidence infrastructure that insurers,
              auditors, regulators, and boards can trust.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] motion-reduce:hover:translate-y-0 lg:p-8 border-l-[3px] border-l-[#1E3A8A]">
              <HomeTrackPlatformCardVisual />
              <h3 className="text-[24px] font-semibold text-[#0B1320]">APEXLyn Track</h3>
              <p className="mt-2 text-[15px] text-[#1E3A8A]">Evidence-Led Compliance Engine</p>
              <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-[#4B5563]">
                Your security evidence is collected automatically from your existing systems, committed to tamper-proof
                storage, and mapped to the compliance frameworks your insurer and auditor actually ask for. Evidence is
                locked the moment it is collected. No one can alter it, delete it, or dispute it — not even us.
              </p>
              <Link
                href="/track"
                className="mt-6 inline-flex text-[15px] font-medium text-[#1E3A8A] hover:underline"
                onClick={() => capturePosthogEvent('homepage_platform_card_clicked', { platform: 'track' })}
              >
                Explore Track →
              </Link>
            </article>
            <article className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] motion-reduce:hover:translate-y-0 lg:p-8 border-l-[3px] border-l-[#1E90FF]">
              <HomeLensPlatformCardVisual />
              <h3 className="text-[24px] font-semibold text-[#0B1320]">APEXLyn Lens</h3>
              <p className="mt-2 text-[15px] text-[#1E3A8A]">AI Security &amp; Evidence Platform</p>
              <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-[#4B5563]">
                Know what your people are putting into AI tools — and control it before it becomes a breach. Lens watches
                every way AI gets used across your business, applies your rules automatically, and records every action as
                forensic-grade evidence. Works alongside your existing security tools, not instead of them.
              </p>
              <Link
                href="/lens"
                className="mt-6 inline-flex text-[15px] font-medium text-[#1E3A8A] hover:underline"
                onClick={() => capturePosthogEvent('homepage_platform_card_clicked', { platform: 'lens' })}
              >
                Explore Lens →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* §27.4 How evidence infrastructure works */}
      <section className="border-t border-[#E5E7EB] bg-white py-16 md:py-24">
        <div className={container}>
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <h2 className="mb-5 text-[26px] font-bold leading-[1.25] text-[#111827] md:text-[36px]">
              How evidence infrastructure works
            </h2>
            <p className="text-[17px] leading-[1.7] text-[#4B5563]">
              Both platforms follow the same principle: collect evidence automatically, lock it permanently, map it to what
              matters, and make it independently verifiable.
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-2">
            {HOW_STEPS.map((step, idx) => (
              <React.Fragment key={step.n}>
                <div className="flex flex-1 flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <p className="text-[14px] font-bold text-[#1E3A8A]">{step.n}</p>
                  <h4 className="mt-2 text-[18px] font-semibold text-[#0B1320]">{step.title}</h4>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-[#4B5563]">{step.body}</p>
                </div>
                {idx < HOW_STEPS.length - 1 && (
                  <div
                    className="hidden flex-none items-center justify-center text-[#CBD5E1] lg:flex"
                    aria-hidden
                  >
                    <span className="text-xl">→</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* §27.5 Framework coverage */}
      <section className="border-t border-[#E5E7EB] bg-[#0B1320] py-16 md:py-20">
        <div className={container}>
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <h2 className="mb-5 text-[26px] font-bold leading-[1.25] text-white md:text-[36px]">
              Compliance frameworks built in — not bolted on
            </h2>
            <p className="text-[17px] leading-[1.7] text-white/80">
              Track maps your evidence to the frameworks that matter for Australian organisations. Adding new frameworks
              requires no platform changes — the engine is designed so frameworks are configuration, not code.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FRAMEWORK_CARDS.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <h4 className="text-[18px] font-semibold text-white">{c.title}</h4>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/75">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[680px] text-center text-[14px] text-white/60">
            All frameworks map to the same universal controls. Evidence collected once satisfies multiple frameworks
            simultaneously.
          </p>
        </div>
      </section>

      {/* §27.6 Industries */}
      <section className="border-t border-[#E5E7EB] bg-white py-16 md:py-24">
        <div className={container}>
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <h2 className="mb-5 text-[26px] font-bold leading-[1.25] text-[#111827] md:text-[36px]">
              Designed for organisations that handle sensitive data
            </h2>
            <p className="text-[17px] leading-[1.7] text-[#4B5563]">
              Whether you manage patient records, client files, financial data, or policy information — if your organisation
              needs to prove its security posture, APEXLyn is designed for you.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                >
                  <Icon className="mb-4 h-6 w-6 text-[#1E3A8A]" aria-hidden />
                  <h4 className="text-[20px] font-semibold text-[#0B1320]">{card.title}</h4>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-[#4B5563]">{card.body}</p>
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex text-[15px] font-medium text-[#1E3A8A] hover:underline"
                    onClick={() =>
                      capturePosthogEvent('homepage_industry_card_clicked', { industry: card.title })
                    }
                  >
                    Learn more →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* §27.7 Trust signals */}
      <section className="border-t border-[#E5E7EB] bg-[#F7F9FC] py-16 md:py-20">
        <div className={container}>
          <h2 className="mb-12 text-center text-[26px] font-bold text-[#111827] md:text-[36px]">
            What makes APEXLyn different
          </h2>
          <div className="space-y-16">
            {TRUST_ROWS.map((row) => (
              <div key={row.key} className="grid gap-10 md:grid-cols-2 md:items-center">
                <div className={row.visualLeft ? 'md:order-2' : undefined}>
                  <h3 className="text-[24px] font-semibold text-[#0B1320]">{row.h3}</h3>
                  <p className="mt-4 text-[17px] leading-[1.7] text-[#4B5563]">{row.layer1}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1 text-left text-[15px] font-medium text-[#1E3A8A] hover:underline"
                    onClick={() => toggleTrust(row.key, row.h3)}
                    aria-expanded={openTrust === row.key}
                  >
                    {row.layer2Label}{' '}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform', openTrust === row.key && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                  {openTrust === row.key && (
                    <div className="mt-4 border-l-2 border-[#1E3A8A] pl-4 pt-1 text-[15px] leading-[1.7] text-[#4B5563]">
                      {row.layer2}
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    'flex justify-center rounded-xl border border-[#E5E7EB] bg-white p-6',
                    row.visualLeft ? 'md:order-1' : 'md:order-2',
                  )}
                >
                  {row.visual}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §27.8 Baseline CTA */}
      <section className="border-t border-[#E5E7EB] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[800px] px-6 text-center sm:px-8">
          <h2 className="text-[26px] font-bold text-[#111827] md:text-[36px]">Find out where you stand</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-[1.7] text-[#4B5563]">
            Answer a few questions about your organisation and security environment. Our team reviews your inputs and
            delivers a structured baseline assessment showing where your evidence posture is strong and where the gaps are.
          </p>
          <Link
            href="/baseline"
            className="mx-auto mt-8 inline-flex items-center justify-center rounded-lg bg-[#1E3A8A] px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#172E73]"
            onClick={() => capturePosthogEvent('homepage_baseline_cta_clicked', { location: 'baseline_section' })}
          >
            Request your baseline assessment
          </Link>
          <p className="mt-6 text-[14px] text-[#6B7280]">No obligation. No sales pitch. Just a clear picture of where you are.</p>
        </div>
      </section>

      {/* §27.9 Pricing preview */}
      <section className="border-t border-[#E5E7EB] bg-[#F7F9FC] py-16 md:py-20">
        <div className={container}>
          <div className="mx-auto mb-12 max-w-[600px] text-center">
            <h2 className="mb-5 text-[26px] font-bold text-[#111827] md:text-[36px]">Straightforward pricing</h2>
            <p className="text-[17px] leading-[1.7] text-[#4B5563]">
              Both platforms use the same tier structure. Start where you are and scale as your evidence requirements grow.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_PREVIEW.map((p) => (
              <article
                key={p.tier}
                className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <h4 className="text-[20px] font-bold text-[#0B1320]">{p.tier}</h4>
                <p className="mt-2 text-[17px] font-semibold text-[#1E3A8A]">{p.price}</p>
                <p className="mt-4 flex-1 text-[14px] leading-[1.6] text-[#4B5563]">{p.desc}</p>
                <Link
                  href="/pricing"
                  className="mt-6 inline-flex text-[14px] font-medium text-[#1E3A8A] hover:underline"
                  onClick={() => capturePosthogEvent('homepage_pricing_card_clicked', { tier: p.tier })}
                >
                  See pricing →
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-[14px] text-[#6B7280]">
            MSP and partner pricing available.{' '}
            <Link href="/industries/msp-partners" className="font-normal text-[#1E3A8A] underline-offset-2 hover:underline">
              See our MSP &amp; Partners page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* §27.10 Founder */}
      <section className="border-t border-[#E5E7EB] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[800px] px-6 text-center sm:px-8">
          <h2 className="text-[26px] font-bold text-[#111827] md:text-[36px]">Built by someone who understands the problem</h2>
          <p className="mt-6 text-[17px] leading-[1.7] text-[#4B5563]">
            APEXLyn was founded by Vishwa Teja Mardha in Australia with a clear conviction: organisations should not have to
            guess whether their security controls are working. They should be able to prove it — with evidence that is
            automated, immutable, and independently verifiable.
          </p>
          <p className="mt-5 text-[17px] leading-[1.7] text-[#4B5563]">
            Track and Lens exist because compliance should not depend on spreadsheets and screenshots, and AI governance
            should not depend on policies that nobody enforces.
          </p>
          <a
            href={FOUNDER_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 text-[15px] font-medium text-[#1E3A8A] hover:underline"
          >
            <Linkedin className="h-5 w-5 shrink-0" aria-hidden />
            Connect on LinkedIn
          </a>
        </div>
      </section>

      {/* §27.11 Final CTA */}
      <section className="border-t border-[#E5E7EB] bg-[#0B1320] py-16 md:py-20">
        <div className="mx-auto max-w-[800px] px-6 text-center sm:px-8">
          <h2 className="text-[26px] font-bold text-white md:text-[36px]">Ready to make your security provable?</h2>
          <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.7] text-white/80">
            Start a conversation about what evidence infrastructure could look like for your organisation. No obligation, no
            pressure — just a clear discussion about where you are and where you could be.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-lg bg-white px-8 py-3.5 text-[16px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] sm:w-auto"
              onClick={() => capturePosthogEvent('homepage_final_cta_clicked', { cta_label: 'Start a conversation' })}
            >
              Start a conversation
            </Link>
            <Link
              href="/baseline"
              className="inline-flex w-full items-center justify-center rounded-lg border-[1.5px] border-white/40 px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              onClick={() =>
                capturePosthogEvent('homepage_final_cta_clicked', { cta_label: 'Request your baseline' })
              }
            >
              Request your baseline
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
