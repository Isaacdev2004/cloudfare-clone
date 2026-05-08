import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  HeartPulse,
  Scale,
  Calculator,
  ShieldCheck,
  Briefcase,
  Network,
  Linkedin,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CTA } from '@/lib/apexlyn-cta-routes';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { HomeHeroEvidenceVisual } from '@/components/home/HomeHeroEvidenceVisual';
import {
  TrustChainVisual,
  TrustRegionVisual,
  TrustVerifyVisual,
  TrustStackVisual,
} from '@/components/home/HomeTrustVisuals';

const BASELINE_HREF = CTA.testYourSecurityState;
const ARCHITECTURE_HREF = CTA.architectureOverview;

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

const FRAMEWORK_CARDS = [
  {
    title: 'Essential Eight',
    body:
      'ACSC Essential Eight at maturity levels L1, L2, and L3. All eight mitigation strategies assessed with automated evidence.',
  },
  {
    title: 'CIS Benchmarks',
    body:
      'Microsoft 365, Google Chrome, Windows 11, and Windows Server. Profile-based assessment from ingested scan results.',
  },
  {
    title: 'ISO/IEC 27001:2022',
    body:
      'Clause-level and Annex A control-level assessment. Mapped to your evidence through universal controls.',
  },
  {
    title: 'NIST CSF 2.0',
    body: 'Function, category, and subcategory assessment. Aligned to your existing security evidence.',
  },
  {
    title: 'APRA CPS 234',
    body:
      'Information security assessment designed for financial services, insurers, and banking. Governance-evidence compatible.',
  },
  {
    title: 'Healthcare',
    body:
      'My Health Records Act, RACGP information security standards, and Healthcare Identifiers obligations.',
  },
  {
    title: 'Privacy Act & APPs',
    body:
      'All 13 Australian Privacy Principles, OAIC guidelines, and the Notifiable Data Breaches scheme. Jurisdiction-aware legal-sector evaluation.',
  },
  {
    title: 'ASD ISM',
    body: 'Australian Signals Directorate Information Security Manual. Government-grade framework assessment.',
  },
] as const;

const INDUSTRY_CARDS = [
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
      'Managed service providers delivering compliance and AI governance to client bases. Whitelabel Track and Lens with your branding, consolidated billing, and portfolio dashboards.',
    href: '/industries/msp-partners',
  },
] as const;

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

const FOUNDER_LINKEDIN_HREF =
  (import.meta.env.VITE_PUBLIC_FOUNDER_LINKEDIN_URL as string | undefined) ||
  'https://www.linkedin.com/company/apexlyn';

function TrustRow({
  heading,
  layer1,
  layer2Label,
  layer2,
  visual,
  reverse,
}: {
  heading: string;
  layer1: string;
  layer2Label: string;
  layer2: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) capturePosthogEvent('homepage_layer2_expanded', { section: heading });
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12',
        reverse && 'lg:flex-row-reverse',
      )}
    >
      <div className="flex-1 lg:w-1/2">
        <h3 className="mb-4 text-[20px] font-semibold leading-snug text-[#0B1320] lg:text-[22px]">{heading}</h3>
        <p className="text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">{layer1}</p>
        <button
          type="button"
          onClick={toggle}
          className="mt-4 inline-flex items-center gap-2 text-left text-[15px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
          aria-expanded={open}
        >
          {layer2Label}
          <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform duration-300', open && 'rotate-180')} aria-hidden />
        </button>
        <div
          className={cn(
            'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="min-h-0">
            <p className="mt-4 border-l-2 border-[#1E3A8A] pl-4 text-[14px] font-normal leading-relaxed text-[#4B5563]">
              {layer2}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center lg:w-1/2 lg:justify-center">{visual}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col bg-[#F7F9FC]">
      {/* §27.1 Hero */}
      <section className="bg-[#0B1320] pb-12 pt-16 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">
                Australian Cybersecurity &amp; AI Governance
              </p>
              <h1 className="mb-6 text-[32px] font-bold leading-[1.2] text-white lg:text-[48px]">
                Where security becomes evidence
              </h1>
              <p className="mb-8 max-w-[540px] text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[18px]">
                APEXLyn builds evidence infrastructure for Australian organisations. Two platforms — Track for compliance
                and Lens for AI governance — make your security posture provable, not just claimed. From small business to
                government, across every industry.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={BASELINE_HREF}
                  onClick={() =>
                    capturePosthogEvent('homepage_hero_cta_clicked', { cta_label: 'Test your security state' })
                  }
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
                >
                  Test your security state
                </Link>
                <Link
                  href={ARCHITECTURE_HREF}
                  onClick={() =>
                    capturePosthogEvent('homepage_hero_cta_clicked', { cta_label: 'See how it works' })
                  }
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
                >
                  See how it works
                </Link>
              </div>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <HomeHeroEvidenceVisual />
            </div>
          </div>
        </div>
      </section>

      {/* §27.2 Positioning strip */}
      <section className="border-b border-[#E5E7EB] bg-white py-6">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <ul className="m-0 grid list-none grid-cols-3 gap-x-2 gap-y-4 px-0 py-0 text-center sm:gap-x-4 lg:flex lg:items-center lg:justify-between lg:gap-0">
            {POSITIONING_ITEMS.map((label) => (
              <li
                key={label}
                className="relative flex min-h-[2.75rem] items-center justify-center px-1 text-[14px] font-medium text-[#4B5563] lg:flex-1 lg:px-4 after:pointer-events-none after:hidden after:h-5 after:w-px after:bg-[#E5E7EB] lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:block lg:after:-translate-y-1/2 last:lg:after:hidden"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §27.3 Two platforms */}
      <section className="border-b border-[#E5E7EB]/80 bg-[#F7F9FC] py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-[720px] text-center">
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-[#0B1320] lg:text-[36px]">
              Two platforms. One evidence standard.
            </h2>
            <p className="mt-4 text-[17px] font-normal leading-relaxed text-[#4B5563]">
              APEXLyn operates two platforms that share a common evidence architecture. Track makes compliance provable.
              Lens makes AI governance provable. Together, they give your organisation evidence infrastructure that
              insurers, auditors, regulators, and boards can trust.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <article className="flex flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:p-8">
              <h3 className="text-[24px] font-semibold text-[#0B1320]">APEXLyn Track</h3>
              <p className="mt-1 text-[15px] font-normal text-[#1E3A8A]">Evidence-Led Compliance Engine</p>
              <p className="mt-4 text-[15px] font-normal leading-[1.7] text-[#4B5563]">
                Your security evidence is collected automatically from your existing systems, committed to tamperproof
                storage, and mapped to the compliance frameworks your insurer and auditor actually ask for. Evidence is
                locked the moment it is collected. No one can alter it, delete it, or dispute it — not even us.
              </p>
              <Link
                href="/track"
                onClick={() => capturePosthogEvent('homepage_platform_card_clicked', { platform: 'track' })}
                className="mt-6 inline-flex items-center text-[15px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
              >
                Explore Track →
              </Link>
            </article>
            <article className="flex flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E90FF] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:p-8">
              <h3 className="text-[24px] font-semibold text-[#0B1320]">APEXLyn Lens</h3>
              <p className="mt-1 text-[15px] font-normal text-[#1E3A8A]">AI Security &amp; Evidence Platform</p>
              <p className="mt-4 text-[15px] font-normal leading-[1.7] text-[#4B5563]">
                Know what your people are putting into AI tools — and control it before it becomes a breach. Lens watches
                every way AI gets used across your business, applies your rules automatically, and records every action as
                forensic-grade evidence. Works alongside your existing security tools, not instead of them.
              </p>
              <Link
                href="/lens"
                onClick={() => capturePosthogEvent('homepage_platform_card_clicked', { platform: 'lens' })}
                className="mt-6 inline-flex items-center text-[15px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
              >
                Explore Lens →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* §27.4 How evidence infrastructure works */}
      <section className="border-b border-[#E5E7EB] bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <h2 className="text-[28px] font-bold leading-tight text-[#0B1320] lg:text-[36px]">
              How evidence infrastructure works
            </h2>
            <p className="mt-4 text-[17px] font-normal leading-relaxed text-[#4B5563]">
              Both platforms follow the same principle: collect evidence automatically, lock it permanently, map it to
              what matters, and make it independently verifiable.
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
            {HOW_STEPS.map((step, index) => (
              <React.Fragment key={step.n}>
                <div className="flex flex-1 flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 lg:min-w-0">
                  <p className="text-[14px] font-bold text-[#1E3A8A]">{step.n}</p>
                  <h4 className="mt-2 text-[18px] font-semibold text-[#0B1320]">{step.title}</h4>
                  <p className="mt-3 flex-1 text-[14px] font-normal leading-[1.6] text-[#4B5563]">{step.body}</p>
                </div>
                {index < HOW_STEPS.length - 1 ? (
                  <>
                    <div
                      className="flex items-center justify-center py-1 text-[20px] leading-none text-[#CBD5E1] lg:hidden"
                      aria-hidden
                    >
                      ↓
                    </div>
                    <div
                      className="hidden w-6 shrink-0 items-center justify-center self-center text-[20px] leading-none text-[#CBD5E1] lg:flex"
                      aria-hidden
                    >
                      →
                    </div>
                  </>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* §27.5 Framework coverage */}
      <section className="border-b border-white/10 bg-[#0B1320] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <h2 className="text-[28px] font-bold leading-tight text-white lg:text-[36px]">
              Compliance frameworks built in — not bolted on
            </h2>
            <p className="mt-4 text-[17px] font-normal leading-relaxed text-white/[0.8]">
              Track maps your evidence to the frameworks that matter for Australian organisations. Adding new frameworks
              requires no platform changes — the engine is designed so frameworks are configuration, not code.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FRAMEWORK_CARDS.map((card) => (
              <article
                key={card.title}
                className="rounded-xl border border-white/10 bg-white/[0.06] p-6 shadow-sm backdrop-blur-sm"
              >
                  <h3 className="text-[18px] font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-[14px] font-normal leading-[1.6] text-white/[0.75]">{card.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[720px] text-center text-[14px] font-normal text-white/[0.6] lg:mt-10">
            All frameworks map to the same universal controls. Evidence collected once satisfies multiple frameworks
            simultaneously.
          </p>
        </div>
      </section>

      {/* §27.6 Industry targeting */}
      <section className="border-b border-[#E5E7EB] bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-[680px] text-center">
            <h2 className="text-[28px] font-bold leading-tight text-[#0B1320] lg:text-[36px]">
              Designed for organisations that handle sensitive data
            </h2>
            <p className="mt-4 text-[17px] font-normal leading-relaxed text-[#4B5563]">
              Whether you manage patient records, client files, financial data, or policy information — if your
              organisation needs to prove its security posture, APEXLyn is designed for you.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="flex flex-col rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-6 shadow-[0_1px_0_rgba(11,19,32,0.04)] lg:p-7"
                >
                  <Icon className="h-6 w-6 text-[#1E3A8A]" strokeWidth={1.75} aria-hidden />
                  <h4 className="mt-4 text-[20px] font-semibold text-[#0B1320]">{card.title}</h4>
                  <p className="mt-3 flex-1 text-[15px] font-normal leading-relaxed text-[#4B5563]">
                    {card.body}
                  </p>
                  <Link
                    href={card.href}
                    onClick={() =>
                      capturePosthogEvent('homepage_industry_card_clicked', { industry: card.title })
                    }
                    className="mt-5 inline-flex text-[15px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
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
      <section className="border-b border-[#E5E7EB]/80 bg-[#F7F9FC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-12 text-center text-[28px] font-bold leading-tight text-[#0B1320] lg:mb-12 lg:text-[36px]">
            What makes APEXLyn different
          </h2>
          <div className="flex flex-col gap-16 lg:gap-20">
            <TrustRow
              heading="Evidence that cannot be changed"
              layer1="When Track or Lens collects a piece of evidence, it is written to tamper-proof storage immediately. Each record is cryptographically linked to the one before it, creating an unbroken chain. If anyone attempts to alter evidence after the fact, the chain breaks and the tampering is detected automatically."
              layer2Label="How this works"
              layer2="Evidence is committed to WORM storage (Write Once, Read Many). A SHA-256 hash is computed for each evidence record, and each hash is chained to the previous record in a per-tenant ledger. The evidence ledger is append-only — there is no update and no delete at any layer of the system. Reports generated from this evidence carry the chain reference and can be independently verified through a verification endpoint."
              visual={<TrustChainVisual />}
            />
            <TrustRow
              heading="All data stays in Australia"
              layer1="Both platforms are hosted in AWS Sydney. Your evidence, reports, audit logs, and governance records do not leave Australia. This is enforced at the infrastructure level, not just by policy."
              layer2Label="Technical detail"
              layer2="All data resides in AWS Sydney (ap-southeast-2). No cross-region replication is permitted. Storage policies enforce region-locked access. Database instances run in private subnets with no public internet exposure. Logging and monitoring stay within the Australian region. Encryption at rest uses AES-256 via AWS KMS. Encryption in transit uses TLS 1.3."
              visual={<TrustRegionVisual />}
              reverse
            />
            <TrustRow
              heading="Reports anyone can verify"
              layer1="Every report generated by Track includes a cryptographic proof trail. Insurers, auditors, and regulators can verify that a report is genuine and unaltered — without needing platform access and without trusting APEXLyn."
              layer2Label="How verification works"
              layer2="Each report's hash is recorded in the evidence ledger at the time of generation. A verification endpoint allows any authorised reviewer to check the report hash against the ledger and confirm its authenticity. Reports can optionally include a QR code that links directly to the verification endpoint. The verification response confirms the report is valid without revealing any tenant data beyond the verification metadata."
              visual={<TrustVerifyVisual />}
            />
            <TrustRow
              heading="Adds to your security stack — does not replace it"
              layer1="Already using Microsoft, CrowdStrike, Zscaler, Netskope, Splunk, or ServiceNow? APEXLyn connects to your existing security tools and adds the evidence layer they do not have. Your tools keep working. APEXLyn makes them provable."
              layer2Label="Integration detail"
              layer2="Track ingests evidence from Microsoft 365, Active Directory, AWS, Azure, Google Cloud, CIS scanners (CIS-CAT Pro, Tenable, Qualys), backup software (Veeam, Datto, Acronis), and EDR platforms (CrowdStrike, SentinelOne, Microsoft Defender). Lens integrates natively with 22 enterprise security platforms across SIEM (Sentinel, Splunk, QRadar), XDR/EDR (CrowdStrike Falcon, Microsoft Defender XDR), SASE (Zscaler, Netskope, Prisma via ICAP), ITSM (ServiceNow, Jira), and alerting (Slack, Teams, PagerDuty). Data exchange is bidirectional where supported."
              visual={<TrustStackVisual />}
              reverse
            />
          </div>
        </div>
      </section>

      {/* §27.8 Baseline CTA */}
      <section className="border-b border-[#E5E7EB] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="text-[28px] font-bold leading-tight text-[#0B1320] lg:text-[32px]">Find out where you stand</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Answer a few questions about your organisation and security environment. Our team reviews your inputs and
            delivers a structured baseline assessment showing where your evidence posture is strong and where the gaps
            are.
          </p>
          <Link
            href={BASELINE_HREF}
            onClick={() => capturePosthogEvent('homepage_baseline_cta_clicked', { location: 'baseline_section' })}
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
          >
            Request your baseline assessment
          </Link>
          <p className="mt-6 text-center text-[14px] font-normal text-[#6B7280]">
            No obligation. No sales pitch. Just a clear picture of where you are.
          </p>
        </div>
      </section>

      {/* §27.9 Pricing preview */}
      <section className="border-b border-[#E5E7EB]/80 bg-[#F7F9FC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-[600px] text-center">
            <h2 className="text-[28px] font-bold leading-tight text-[#0B1320] lg:text-[36px]">Straightforward pricing</h2>
            <p className="mt-4 text-[17px] font-normal leading-relaxed text-[#4B5563]">
              Both platforms use the same tier structure. Start where you are and scale as your evidence requirements
              grow.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_PREVIEW.map((row) => (
              <article
                key={row.tier}
                className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)]"
              >
                <h3 className="text-[20px] font-bold text-[#0B1320]">{row.tier}</h3>
                <p className="mt-2 text-[17px] font-semibold text-[#1E3A8A]">{row.price}</p>
                <p className="mt-3 flex-1 text-[14px] font-normal leading-relaxed text-[#4B5563]">{row.desc}</p>
                <Link
                  href="/pricing"
                  onClick={() => capturePosthogEvent('homepage_pricing_card_clicked', { tier: row.tier })}
                  className="mt-5 inline-flex text-[14px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
                >
                  See pricing →
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-[14px] font-normal text-[#6B7280]">
            MSP and partner pricing available. See our{' '}
            <Link href="/industries/msp-partners" className="font-medium text-[#1E3A8A] underline-offset-2 hover:underline">
              MSP &amp; Partners page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* §27.10 Founder */}
      <section className="border-b border-[#E5E7EB] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="text-[28px] font-bold leading-tight text-[#0B1320] lg:text-[32px]">
            Built by someone who understands the problem
          </h2>
          <p className="mt-6 text-[17px] font-normal leading-[1.7] text-[#4B5563]">
            APEXLyn was founded by Vishwa Teja Mardha in Australia with a clear conviction: organisations should not have
            to guess whether their security controls are working. They should be able to prove it — with evidence that
            is automated, immutable, and independently verifiable.
          </p>
          <p className="mt-4 text-[17px] font-normal leading-[1.7] text-[#4B5563]">
            Track and Lens exist because compliance should not depend on spreadsheets and screenshots, and AI governance
            should not depend on policies that nobody enforces.
          </p>
          <a
            href={FOUNDER_LINKEDIN_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
          >
            <Linkedin className="h-5 w-5 shrink-0" aria-hidden />
            Connect on LinkedIn
          </a>
        </div>
      </section>

      {/* §27.11 Final CTA */}
      <section className="bg-[#0B1320] py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="text-[28px] font-bold leading-tight text-white lg:text-[32px]">
            Ready to make your security provable?
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[17px] font-normal leading-relaxed text-white/[0.8]">
            Start a conversation about what evidence infrastructure could look like for your organisation. No obligation,
            no pressure — just a clear discussion about where you are and where you could be.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              onClick={() =>
                capturePosthogEvent('homepage_final_cta_clicked', { cta_label: 'Start a conversation' })
              }
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-white px-8 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Start a conversation
            </Link>
            <Link
              href={BASELINE_HREF}
              onClick={() =>
                capturePosthogEvent('homepage_final_cta_clicked', { cta_label: 'Request your baseline' })
              }
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-white/50 bg-transparent px-8 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Request your baseline
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
