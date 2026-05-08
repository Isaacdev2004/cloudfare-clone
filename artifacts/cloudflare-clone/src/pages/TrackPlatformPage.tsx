import React, { useState } from 'react';
import { Link } from 'wouter';
import { Link as LinkIcon, Lock, Layers, FileCheck, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { CTA } from '@/lib/apexlyn-cta-routes';
import { TrackEvidenceFlowDiagram } from '@/components/track/TrackEvidenceFlowDiagram';
import { TrackGovernanceVisual } from '@/components/track/TrackGovernanceVisual';

const BASELINE_HREF = CTA.testYourSecurityState;
const PRICING_HREF = '/pricing';
const CONTACT_HREF = CTA.contact;
const MSP_HREF = '/industries/msp-partners';

const OUTCOME_CARDS = [
  {
    Icon: LinkIcon,
    title: 'Automates evidence collection',
    body:
      'Track connects to your systems and collects security evidence on a policy-driven schedule. No one in your team needs to export data, compile spreadsheets, or take screenshots. Evidence arrives automatically.',
  },
  {
    Icon: Lock,
    title: 'Locks evidence permanently',
    body:
      'Every piece of evidence is written to tamper-proof storage and cryptographically chained to the record before it. Evidence cannot be altered, deleted, or disputed after collection — not even by APEXLyn.',
  },
  {
    Icon: Layers,
    title: 'Maps to compliance frameworks',
    body:
      'Track maps your evidence to the frameworks that matter — Essential Eight, ISO 27001, NIST CSF, APRA CPS 234, ASD ISM, healthcare, privacy, and more. One set of evidence satisfies multiple frameworks simultaneously.',
  },
  {
    Icon: FileCheck,
    title: 'Generates verifiable reports',
    body:
      'Track generates insurance-grade and audit-grade reports with executive summaries, risk scorecards, evidence proof, governance records, and chain-of-custody statements. Every report can be independently verified.',
  },
] as const;

const FRAMEWORK_ROWS = [
  {
    framework: 'Essential Eight\n(ACSC)',
    scope: 'All 8 mitigation strategies. Maturity levels L1, L2, L3 selectable per tenant.',
    source: 'Microsoft 365, Active Directory, CIS scanners, AWS, Azure, EDR',
  },
  {
    framework: 'CIS\nBenchmarks',
    scope:
      'Microsoft 365 Foundations, Google Chrome, Windows 11, Windows Server 2022. Profile-based. Version-tracked.',
    source: 'CIS-CAT Pro, Tenable/Nessus, Qualys scan results',
  },
  {
    framework: 'ISO/IEC\n27001:2022',
    scope: 'Clause-level and Annex A control-level.',
    source: 'All connected evidence sources mapped through universal controls',
  },
  {
    framework: 'NIST CSF 2.0',
    scope: 'Function, category, and subcategory level.',
    source: 'All connected evidence sources mapped through universal controls',
  },
  {
    framework: 'APRA CPS 234',
    scope: 'Information security requirements for financial services.',
    source: 'All connected evidence sources plus governance-linked evidence',
  },
  {
    framework: 'Healthcare',
    scope: 'My Health Records Act, RACGP standards, Healthcare Identifiers Act.',
    source: 'Connected sources plus governance-evidence where required',
  },
  {
    framework: 'Privacy Act &\nAPPs',
    scope:
      'All 13 Australian Privacy Principles, OAIC guidelines, NDB scheme. Jurisdiction-aware legal-sector evaluation across all 8 Australian jurisdictions.',
    source: 'Connected sources plus governance-evidence where required',
  },
  {
    framework: 'ASD ISM',
    scope: 'Australian Signals Directorate Information Security Manual, March 2026 release. Government-grade.',
    source: 'Connected sources plus governance-evidence where required',
  },
] as const;

const CONNECTOR_CARDS = [
  {
    heading: 'Microsoft 365',
    body: 'Users, groups, roles, admin assignments, MFA and Conditional Access signals, device and compliance signals.',
  },
  {
    heading: 'Active Directory',
    body: 'Privileged groups, password policies, last logon records, GPO security baselines.',
  },
  {
    heading: 'AWS',
    body: 'Security Hub findings, Config rule evaluations, CloudTrail status, IAM posture evidence.',
  },
  {
    heading: 'Microsoft Azure',
    body: 'Security posture, policy compliance, role assignments, encryption and logging configuration.',
  },
  {
    heading: 'Google Cloud Platform',
    body: 'IAM roles and bindings, Security Command Center findings, logging and encryption posture, organisation policies.',
  },
  {
    heading: 'Google Workspace',
    body: 'Users, groups, admin roles, MFA status, admin console security configuration, Drive sharing settings.',
  },
  {
    heading: 'CIS Scanners',
    body: 'CIS-CAT Pro, Tenable/Nessus, and Qualys scan results. Profile-based ingestion with rule-level pass/fail evaluation.',
  },
  {
    heading: 'Backup Software',
    body: 'Veeam, Datto, and Acronis. Backup job status, retention configuration, restore-test evidence, protected backup posture.',
  },
  {
    heading: 'EDR Platforms',
    body: 'CrowdStrike Falcon, SentinelOne, and Microsoft Defender for Endpoint. Endpoint inventory, health, policy enforcement, and detection telemetry.',
  },
  {
    heading: 'Generic API',
    body: 'Any additional source that produces JSON telemetry conforming to the evidence event format. Tenant-bound, validated, and audit-logged.',
  },
] as const;

const TRACK_PRICING = [
  {
    tier: 'Track Standard',
    price: 'From A$349/month',
    body: 'Automated evidence collection, Essential Eight and CIS mapping, standard reporting, and self-service onboarding.',
  },
  {
    tier: 'Track Professional',
    price: 'From A$899/month',
    body: 'Additional frameworks including APRA CPS 234, assisted onboarding, deeper connectors, and governance workflows.',
  },
  {
    tier: 'Track Enterprise',
    price: 'From A$75,000/year',
    body: 'Full framework access, dedicated support, forensic-grade reporting, legal hold, and enterprise connectors.',
  },
  {
    tier: 'Track Sovereign',
    price: 'Contact us',
    body: 'Isolated deployment, customer-managed keys, ASD ISM, and the highest evidence assurance for government and regulated institutions.',
  },
] as const;

const MSP_CARDS = [
  {
    title: 'Portfolio dashboard',
    body:
      'Multi-tenant portfolio view supporting 500+ tenants with precomputed snapshots. Hotspots, heatmap, and trend views. Drill down from portfolio to tenant to framework to control to immutable evidence.',
  },
  {
    title: 'White-label reporting',
    body:
      'Your brand on the portal header, PDF cover page, footer, and contact details. The underlying evidence, hashes, requirement IDs, and assessment statuses are never altered by branding. Your brand. Our evidence integrity.',
  },
  {
    title: 'Consolidated operations',
    body:
      'Consolidated billing visibility, client-by-client seat accounting, template propagation across client tenants, client onboarding, client monitoring, and direct-conversion tracking when a client moves from MSP-managed to direct.',
  },
] as const;

function TrackExpandable({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) capturePosthogEvent('track_layer2_expanded', { section: label });
  };

  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-[15px] font-medium text-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span className="flex-1">{label}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="mt-3 border-t border-[#E5E7EB] pt-3 text-[15px] font-normal leading-[1.7] text-[#4B5563]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameworkName({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </React.Fragment>
      ))}
    </>
  );
}

export default function TrackPlatformPage() {
  const { ref: frameworkTableRef } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) capturePosthogEvent('track_framework_table_viewed', {});
    },
  });

  const { ref: connectorGridRef } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) capturePosthogEvent('track_connector_card_viewed', {});
    },
  });

  return (
    <div className="flex flex-col bg-white">
      {/* §28.1 Hero */}
      <section className="bg-[#0B1320] pb-12 pt-16 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">APEXLyn Track</p>
              <h1 className="mb-6 text-[32px] font-bold leading-[1.2] text-white lg:text-[48px]">
                Compliance evidence that stands up
              </h1>
              <p className="mb-8 max-w-[540px] text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[18px]">
                Track collects security evidence automatically from your existing systems, locks it in tamper-proof
                storage the moment it arrives, maps it to the compliance frameworks your insurer and auditor actually
                ask for, and generates reports that can be independently verified. No spreadsheets. No screenshots. No
                manual uploads.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={BASELINE_HREF}
                  onClick={() =>
                    capturePosthogEvent('track_hero_cta_clicked', { cta_label: 'Request your baseline assessment' })
                  }
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
                >
                  Request your baseline assessment
                </Link>
                <Link
                  href={PRICING_HREF}
                  onClick={() => capturePosthogEvent('track_hero_cta_clicked', { cta_label: 'See pricing' })}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
                >
                  See pricing
                </Link>
              </div>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <TrackEvidenceFlowDiagram variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* §28.2 What Track does */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-12 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            What Track does for your organisation
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOME_CARDS.map(({ Icon, title, body }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:p-8"
              >
                <Icon className="mb-4 h-8 w-8 text-[#1E3A8A]" strokeWidth={1.75} aria-hidden />
                <h3 className="mb-3 text-[18px] font-semibold text-[#0B1320]">{title}</h3>
                <p className="text-[15px] font-normal leading-relaxed text-[#4B5563]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §28.3 Evidence chain */}
      <section className="bg-[#F7F9FC] py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            The evidence chain — how Track turns data into proof
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Track follows a strict, deterministic sequence every time evidence is collected. This is not a process that can
            be skipped, reordered, or overridden. If any step fails, the evidence is not considered committed.
          </p>
          <div className="mb-12 flex justify-center">
            <TrackEvidenceFlowDiagram variant="section" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TrackExpandable label="How automated collection works">
              <p className="mb-4">
                Track connects to your systems through secure, tenant-bound connectors. Each connector is authorised with
                the minimum permissions required and bound to your specific tenant — no connector can access another
                organisation&apos;s data. Evidence is collected on a policy-driven schedule: a full baseline at
                onboarding, then recurring collection at defined intervals. Delta collection runs where the source system
                supports it. If a connector fails or a source is temporarily unavailable, the gap is recorded honestly —
                Track never fabricates evidence to fill a gap.
              </p>
              <p>
                Supported connectors include: Microsoft 365 (Graph API), Active Directory (LDAP/Agent), AWS (Security Hub,
                Config, CloudTrail, IAM), Microsoft Azure, Google Cloud Platform (Security Command Center), Google Workspace,
                CIS scan ingestion (CIS-CAT Pro, Tenable/Nessus, Qualys), backup software (Veeam, Datto, Acronis), EDR
                platforms (CrowdStrike, SentinelOne, Microsoft Defender for Endpoint), and a generic API intake for
                additional sources.
              </p>
            </TrackExpandable>
            <TrackExpandable label="How tamper-proof storage works">
              <p>
                Every evidence record is written to WORM storage (Write Once, Read Many). WORM storage physically prevents
                modification or deletion of stored objects. This is not a software setting that can be turned off — it is an
                infrastructure-level guarantee provided by the underlying storage service. Evidence is stored in AWS Sydney
                (ap-southeast-2) and does not leave Australia. Each stored object is individually locked at the time of
                writing.
              </p>
            </TrackExpandable>
            <TrackExpandable label="How cryptographic chaining works">
              <p className="mb-4">
                After evidence is written to WORM storage, a SHA-256 hash is computed from the evidence payload. This hash is
                then combined with the previous record&apos;s hash to create a new ledger block in a per-tenant hash chain.
                Each tenant has its own independent chain — no cross-tenant chaining exists. The chain is append-only: there
                is no update operation and no delete operation at any layer. If any record in the chain were altered, all
                subsequent hashes would become invalid, making tampering immediately detectable.
              </p>
              <p>
                Device identity fields — including device ID, hostname, IP address, and MAC address where available — are
                included in the hashed evidence packet. This means the evidence is cryptographically bound to the specific
                device context at the time of collection.
              </p>
            </TrackExpandable>
            <TrackExpandable label="How framework mapping works">
              <p className="mb-4">
                Track maintains a set of universal controls that are stable and framework-independent. Compliance frameworks
                — Essential Eight, ISO 27001, NIST CSF 2.0, APRA CPS 234, ASD ISM, and others — are views mapped onto these
                universal controls. This means adding a new framework requires loading requirement definitions and mapping
                rules, not rebuilding the engine. A single universal control (such as &quot;MFA enforced for all
                users&quot;) can map to multiple framework requirements simultaneously across Essential Eight, ISO 27001,
                NIST, and CIS.
              </p>
              <p>
                Framework assessment is confidence-calibrated. A control can only produce a PASS result when confidence is high
                — meaning the evidence is present, fresh, complete, structurally valid, from the correct source, and within
                scope. If any of those conditions is not met, the output is UNKNOWN (insufficient evidence), never PASS.
                Missing evidence never produces a passing result.
              </p>
            </TrackExpandable>
            <TrackExpandable label="How insurance-grade reporting works">
              <p className="mb-4">
                Track generates PDF report packs with a fixed structure designed for insurers, auditors, boards, and
                regulators. Every report includes: an executive summary in plain English, risk scorecards with RAG
                (red/amber/green) status per framework, a findings table with plain-language explanations and remediation
                guidance for every non-passing control, an evidence proof appendix with cryptographic hashes, timestamps,
                event IDs, and device identity, a governance appendix with attestation records and risk acceptance history, a
                data residency and integrity statement, and a chain-of-custody statement.
              </p>
              <p>
                Every report prints the exact framework version, mapping rules version, control rules version, and
                assessment date it is bound to. Reports are generated server-side only — never in the browser. The generated
                report&apos;s hash is recorded in the evidence ledger, creating a verifiable proof that the report existed in
                its exact form at the time of generation.
              </p>
            </TrackExpandable>
            <TrackExpandable label="How independent verification works">
              <p className="mb-4">
                Every report generated by Track can be independently verified through a dedicated verification endpoint. The
                endpoint accepts a report identifier and returns: the report hash, generation timestamp, framework versions
                and scope, and confirmation that the report hash is recorded in the evidence ledger. The verification
                response confirms whether the report is valid or invalid without revealing any tenant data beyond the
                verification metadata.
              </p>
              <p>
                Reports can optionally include a QR code that links directly to the verification endpoint. An insurer,
                auditor, or regulator receiving a Track report can scan the QR code and confirm independently that the report
                is genuine and unaltered — without needing APEXLyn platform access and without needing to trust APEXLyn.
              </p>
            </TrackExpandable>
          </div>
        </div>
      </section>

      {/* §28.4 Frameworks */}
      <section
        id="framework-alignment"
        className="scroll-mt-[calc(108px+1rem)] bg-white py-16 lg:py-20"
        ref={frameworkTableRef}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Frameworks that matter for Australian organisations
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Track does not assess against generic checklists. It maps your real evidence to specific, version-tracked
            compliance frameworks using a confidence-calibrated engine. If the evidence is insufficient, the result is
            &quot;insufficient evidence&quot; — never a false pass.
          </p>

          <div className="hidden overflow-hidden rounded-lg border border-[#E5E7EB] lg:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F7F9FC]">
                  <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">Framework</th>
                  <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">Scope</th>
                  <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">
                    Evidence source
                  </th>
                </tr>
              </thead>
              <tbody>
                {FRAMEWORK_ROWS.map((row, i) => (
                  <tr key={row.framework} className={i % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'}>
                    <td className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-normal text-[#4B5563]">
                      <FrameworkName text={row.framework} />
                    </td>
                    <td className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-normal text-[#4B5563]">
                      {row.scope}
                    </td>
                    <td className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-normal text-[#4B5563]">
                      {row.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 lg:hidden">
            {FRAMEWORK_ROWS.map((row) => (
              <article key={row.framework} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
                <h3 className="mb-3 text-[16px] font-semibold text-[#0B1320]">
                  <FrameworkName text={row.framework} />
                </h3>
                <p className="mb-2 text-[14px] leading-relaxed text-[#4B5563]">
                  <span className="font-medium text-[#0B1320]">Scope: </span>
                  {row.scope}
                </p>
                <p className="text-[14px] leading-relaxed text-[#4B5563]">
                  <span className="font-medium text-[#0B1320]">Evidence source: </span>
                  {row.source}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-[14px] font-normal text-[#6B7280]">
            All frameworks map to the same universal controls. Evidence collected once satisfies multiple frameworks
            simultaneously. Adding new frameworks requires no platform changes.
          </p>
          <p className="mx-auto mt-4 max-w-[680px] text-center text-[13px] font-normal text-[#9CA3AF]">
            Framework alignment reflects how Track maps collected evidence to published framework requirements. Track does
            not claim certification, accreditation, or formal compliance on behalf of any organisation. Assessment outputs
            are evidence-based and should be reviewed by qualified professionals for formal compliance decisions.
          </p>
        </div>
      </section>

      {/* §28.5 Connected systems */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20" ref={connectorGridRef}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Connects to the systems you already use
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Track collects evidence automatically through secure, tenant-bound connectors. Each connector uses the minimum
            permissions required and is bound to your specific organisation. No manual data exports.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONNECTOR_CARDS.map((c) => (
              <article key={c.heading} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
                <h3 className="mb-2 text-[16px] font-semibold text-[#0B1320]">{c.heading}</h3>
                <p className="text-[13px] font-normal leading-[1.5] text-[#4B5563]">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §28.6 Governance */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem] xl:text-[2.25rem]">
                Governance that leaves a permanent record
              </h2>
              <p className="mb-6 text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">
                Track does not just collect evidence — it records the human decisions made about that evidence. When an
                approver attests that evidence is correct, or accepts a risk with a documented reason and expiry date, that
                governance action is written to the immutable ledger alongside the evidence it relates to.
              </p>
              <TrackExpandable label="Governance detail">
                <p className="mb-4">
                  The governance workflow operates as follows: when a report is generated, the system sends an automated
                  review request to the designated approver. The approver receives a secure link that is one-time use,
                  time-limited (default 60 minutes, configurable per tenant), and bound to the specific user and tenant.
                  Accessing the secure link requires MFA re-verification.
                </p>
                <p className="mb-4">
                  The approver reviews non-compliant items and completes one of two actions: attestation (&quot;I certify
                  this evidence is correct&quot;) or risk acceptance (&quot;I accept the risk of this finding for documented
                  reasons&quot;). Risk acceptance requires a reason in plain English, an owner, an expiry date, and a review
                  date.
                </p>
                <p className="mb-4">
                  Every governance action writes a signature event to the immutable ledger containing: the actor&apos;s
                  identity and role, timestamp, IP address, user agent, the evidence records referenced, their cryptographic
                  hashes, ledger block references, and the scope context (framework, version, assessment date). This
                  signature event is permanent and independently verifiable.
                </p>
                <p>
                  When a risk acceptance expires, the exception status is automatically removed and the underlying assessment
                  result takes effect. The system sends reminders before expiry at 30 days, 15 days, 3 days, and 1 day.
                </p>
              </TrackExpandable>
            </div>
            <div className="flex justify-center lg:col-span-6 lg:justify-end">
              <TrackGovernanceVisual className="w-full max-w-[360px]" />
            </div>
          </div>
        </div>
      </section>

      {/* §28.7 MSP */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Built for MSPs managing multiple clients
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Track is designed for managed service providers who deliver compliance evidence to their client base. White-label
            the platform with your branding. Manage hundreds of clients from a single portfolio dashboard. Drill from
            portfolio overview down to individual tenant, framework, control, and evidence proof.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {MSP_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:p-8"
              >
                <h4 className="mb-3 text-[20px] font-semibold text-[#0B1320]">{card.title}</h4>
                <p className="text-[15px] font-normal leading-relaxed text-[#4B5563]">{card.body}</p>
              </article>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href={MSP_HREF}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-[#1E3A8A] bg-transparent px-6 text-[15px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#1E3A8A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
            >
              See MSP &amp; Partners details
            </Link>
          </div>
        </div>
      </section>

      {/* §28.8 Insurance */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1000px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Evidence your insurer can actually use
          </h2>
          <p className="mx-auto mb-4 max-w-[680px] text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Cyber insurance underwriting in Australia still relies heavily on self-assessment questionnaires. Your organisation
            ticks boxes. Nobody verifies the answers.
          </p>
          <p className="mx-auto mb-4 max-w-[680px] text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Track changes this. Instead of claiming your MFA is enabled, Track provides cryptographic proof that MFA was
            enabled on specific systems, on specific devices, at specific times — with an unbroken chain of evidence that your
            insurer can independently verify.
          </p>
          <p className="mx-auto mb-4 max-w-[680px] text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Every Track report includes an assertion statement describing exactly what was assessed and a non-assertion
            statement describing what was not. The report says precisely what it can prove and explicitly disclaims what it
            cannot. No ambiguity. No overclaiming.
          </p>
          <p className="mx-auto mb-10 max-w-[680px] text-[17px] font-normal leading-relaxed text-[#4B5563]">
            If your insurer, auditor, or board reviewer receives a Track report, they can verify it is genuine by checking
            the report hash against the evidence ledger — through a QR code on the report or through the verification
            endpoint. They do not need platform access. They do not need to trust APEXLyn. They verify the mathematics.
          </p>
          <Link
            href={CONTACT_HREF}
            onClick={() => capturePosthogEvent('track_insurance_cta_clicked', {})}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
          >
            Talk to us about evidence for insurance
          </Link>
        </div>
      </section>

      {/* §28.9 Pricing preview */}
      <section className="bg-[#F7F9FC] py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
          <h2 className="mb-4 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">Track pricing</h2>
          <p className="mx-auto mb-8 max-w-[640px] text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Start where your organisation is today. Scale as your evidence requirements grow.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACK_PRICING.map((row) => (
              <article
                key={row.tier}
                className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 text-left shadow-[0_1px_0_rgba(11,19,32,0.06)]"
              >
                <h3 className="text-[18px] font-semibold text-[#0B1320]">{row.tier}</h3>
                <p className="mt-2 text-[20px] font-semibold text-[#1E3A8A]">{row.price}</p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#4B5563]">{row.body}</p>
                <Link
                  href={PRICING_HREF}
                  onClick={() => capturePosthogEvent('track_pricing_card_clicked', { tier: row.tier })}
                  className="mt-6 inline-flex text-[15px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
                >
                  See full pricing →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §28.10 Final CTA */}
      <section className="bg-[#0B1320] py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
            Start collecting evidence that stands up
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] text-[17px] font-normal leading-relaxed text-white/80">
            Whether you need Essential Eight evidence for your insurer, ISO 27001 mapping for your auditor, or APRA CPS 234
            reporting for your regulator — Track turns compliance from a claim into a proof.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={BASELINE_HREF}
              onClick={() =>
                capturePosthogEvent('track_final_cta_clicked', { cta_label: 'Request your baseline assessment' })
              }
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Request your baseline assessment
            </Link>
            <Link
              href={CONTACT_HREF}
              onClick={() => capturePosthogEvent('track_final_cta_clicked', { cta_label: 'Start a conversation' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
