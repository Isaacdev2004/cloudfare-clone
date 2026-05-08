import React, { useState } from 'react';
import { Link } from 'wouter';
import { Lock, Link2, CheckCircle2, BotOff, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { CTA } from '@/lib/apexlyn-cta-routes';
import { SharedArchitectureDiagram } from '@/components/architecture/SharedArchitectureDiagram';

const TRACK_HREF = '/track';
const LENS_HREF = '/lens';
const CONTACT_HREF = CTA.contact;
const DOCUMENTATION_HREF = CTA.requestSecurityDocumentation;

const PRINCIPLES = [
  {
    Icon: Lock,
    title: 'Immutable by design',
    body:
      'Evidence is written once and cannot be changed. There is no update operation and no delete operation at any layer. If evidence needs correction, a new record is appended — the original is never modified. This is enforced at the storage level, the database level, and the application level simultaneously.',
  },
  {
    Icon: Link2,
    title: 'Cryptographically chained',
    body:
      'Every evidence record is hashed and linked to the previous record in a per-tenant chain. Each tenant has its own independent chain. If any record in the chain were altered, all subsequent hashes would become invalid. Tampering is mathematically detectable.',
  },
  {
    Icon: CheckCircle2,
    title: 'Independently verifiable',
    body:
      'Reports generated from evidence carry the chain reference and can be verified through a dedicated endpoint. Verification does not require platform access or trust in APEXLyn. It requires mathematics. An insurer scanning a QR code on a report can confirm its authenticity independently.',
  },
  {
    Icon: BotOff,
    title: 'Automated, not manual',
    body:
      'Neither platform accepts manual uploads for technical evidence. Evidence arrives through secure, tenant-bound connectors on policy-driven schedules. If a connector fails or evidence is unavailable, the gap is recorded honestly as insufficient evidence — never fabricated to fill a hole.',
  },
] as const;

const LIFECYCLE_STAGES = [
  {
    n: '01',
    title: 'Collection',
    body:
      'Evidence is collected automatically through secure, tenant-bound connectors. Each connector uses the minimum permissions required. Collection runs on a policy-driven schedule — baseline at onboarding, then recurring at defined intervals. No manual uploads for technical evidence.',
  },
  {
    n: '02',
    title: 'Commitment',
    body:
      'Collected evidence is committed through a strict, deterministic sequence. The raw payload is written to WORM storage first. Then a SHA-256 hash is computed. Then the evidence record is created. Then the hash is chained to the per-tenant ledger. Only when all steps complete successfully is the evidence considered committed. If any step fails, the evidence is not recorded as committed.',
  },
  {
    n: '03',
    title: 'Evaluation',
    body:
      'Committed evidence is evaluated against controls and policies. Track evaluates against universal controls mapped to compliance frameworks with confidence calibration — PASS requires HIGH confidence. Lens evaluates against AI governance policies with a staged classification pipeline. Both produce canonical status outputs.',
  },
  {
    n: '04',
    title: 'Governance',
    body:
      'Human decisions about evidence — attestation, risk acceptance, policy approval — are recorded as immutable governance signature events in the evidence ledger. Each signature event contains the signer\u2019s identity, the evidence it relates to, and the scope context. Governance events are permanent and verifiable.',
  },
  {
    n: '05',
    title: 'Reporting',
    body:
      'Evidence, assessment results, and governance records are assembled into structured reports. Each report\u2019s hash is recorded in the evidence ledger at the time of generation. Reports include assertion statements describing what was assessed and non-assertion statements describing what was not. Reports carry chain-of-custody statements and can be independently verified.',
  },
  {
    n: '06',
    title: 'Verification and legal use',
    body:
      'Reports can be verified by any authorised reviewer through the verification endpoint or QR code. Evidence can be exported in controlled bundles for legal proceedings, regulatory submissions, insurance claims, and audit reviews. Legal hold preserves evidence beyond normal retention when required by law or litigation. Court-ready evidence packs include digital signatures, chain-of-custody attestation, and verified entry hashes.',
  },
] as const;

const RESIDENCY_ROWS: { control: string; impl: string }[] = [
  { control: 'Primary region', impl: 'AWS Sydney (ap-southeast-2)' },
  { control: 'Cross-region\nreplication', impl: 'Blocked entirely' },
  {
    control: 'Evidence storage',
    impl: 'Region-locked WORM storage with bucket policies enforcing ap-southeast-2',
  },
  { control: 'Database', impl: 'Private subnets only. No public internet exposure.' },
  { control: 'Database access', impl: 'VPC endpoint access where feasible' },
  {
    control: 'Logging and\nmonitoring',
    impl: 'Australian-region only (CloudWatch in-region)',
  },
  { control: 'Audit logs', impl: 'Australian-resident. Immutable. 7-year retention.' },
  {
    control: 'Third-party\nprocessing',
    impl: 'No out-of-Australia processing unless explicitly approved and recorded as a governance event',
  },
  {
    control: 'CI/CD artifacts',
    impl: 'Any artifact containing customer data remains AU-resident',
  },
  { control: 'Encryption at rest', impl: 'AES-256 via AWS KMS' },
  { control: 'Encryption in transit', impl: 'TLS 1.3' },
];

const ACCESS_ROWS: { control: string; spec: string }[] = [
  { control: 'MFA', spec: 'Required for all tiers. TOTP and WebAuthn/FIDO2 supported.' },
  {
    control: 'MFA re-check',
    spec: 'Required for: exports, approvals and attestations, connector changes, scope changes.',
  },
  { control: 'Session idle\ntimeout', spec: '15 minutes' },
  { control: 'Absolute session\nlifetime', spec: '8 hours' },
  { control: 'Refresh token\nmax lifetime', spec: '24 hours' },
  {
    control: 'Token rotation',
    spec: 'On every refresh. Immediate family invalidation on reuse detection.',
  },
  {
    control: 'Break-glass\naccess',
    spec: 'Maximum 2 accounts. FIDO2 hardware key required. Default 60-minute window. Maximum 4 hours. Audit-logged with high-severity event.',
  },
  {
    control: 'MSP suspension',
    spec: 'Immediate access revocation across all assigned tenants.',
  },
  {
    control: 'Audit logging',
    spec:
      'Immutable. Australian-resident. 7-year retention. Covers: authentication, session lifecycle, role changes, connector changes, evidence ingestion, export generation, governance actions.',
  },
];

function MultilineCell({ text }: { text: string }) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 ? <br /> : null}
      {line}
    </React.Fragment>
  ));
}

function ArchExpandableShell({
  label,
  onExpand,
  children,
}: {
  label: string;
  onExpand?: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) onExpand?.();
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

export default function ArchitectureOverviewPage() {
  const { ref: diagramRef } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    onChange: (v) => {
      if (v) capturePosthogEvent('arch_diagram_viewed', {});
    },
  });

  const { ref: residencyRef } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    onChange: (v) => {
      if (v) capturePosthogEvent('arch_residency_table_viewed', {});
    },
  });

  const { ref: verificationRef } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    onChange: (v) => {
      if (v) capturePosthogEvent('arch_verification_viewed', {});
    },
  });

  return (
    <div className="flex flex-col bg-white">
      {/* §30.1 Hero */}
      <section className="bg-[#0B1320] pb-12 pt-16 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">Architecture Overview</p>
          <h1 className="mx-auto mb-6 max-w-[720px] text-[32px] font-bold leading-[1.2] text-white lg:text-[48px]">
            Two platforms. One evidence architecture.
          </h1>
          <p className="mx-auto mb-8 max-w-[640px] text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[18px]">
            Track and Lens are different platforms solving different problems — compliance evidence and AI governance
            evidence. But they share the same foundational architecture: automated collection, tamper-proof storage,
            cryptographic chaining, and independent verification. This shared evidence infrastructure is what makes both
            platforms provable, not just functional.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={TRACK_HREF}
              onClick={() => capturePosthogEvent('arch_hero_cta_clicked', { cta_label: 'Explore Track' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Explore Track
            </Link>
            <Link
              href={LENS_HREF}
              onClick={() => capturePosthogEvent('arch_hero_cta_clicked', { cta_label: 'Explore Lens' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Explore Lens
            </Link>
          </div>
        </div>
      </section>

      {/* §30.2 Design principles */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            What we mean by evidence infrastructure
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Evidence infrastructure is not a marketing term. It describes a specific set of architectural decisions that
            make security evidence trustworthy enough for insurers, auditors, regulators, and courts — not just internal
            dashboards.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(({ Icon, title, body }) => (
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

      {/* §30.3 Shared architecture + expandables */}
      <section className="bg-[#F7F9FC] py-20 lg:py-24" ref={diagramRef}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            How Track and Lens share one evidence core
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Both platforms collect evidence from different sources, process it through their own engines, and commit it to
            the same class of immutable evidence infrastructure. The shared architecture means shared trust, shared
            verification, and shared proof standards.
          </p>
          <div className="mb-12 flex justify-center">
            <SharedArchitectureDiagram />
          </div>
          <div className="mx-auto flex max-w-[800px] flex-col gap-6">
            <ArchExpandableShell
              label="How evidence flows through Track"
              onExpand={() => capturePosthogEvent('arch_layer2_expanded', { section: 'How evidence flows through Track' })}
            >
              <p className="mb-4">
                Track collects compliance evidence from connected systems — Microsoft 365, Active Directory, AWS, Azure,
                Google Cloud, CIS scanners, backup software, EDR platforms, and Google Workspace. Each connector is
                tenant-bound and uses the minimum required permissions. Evidence is collected on a policy-driven schedule: a
                full baseline at onboarding, then recurring collection at defined intervals.
              </p>
              <p className="mb-4">
                Collected evidence passes through the Track compliance engine, which evaluates it against universal controls
                using versioned control rules. Controls are stable and framework-independent — frameworks are views mapped
                onto these controls. The engine produces a canonical status for each control (PASS, FAIL, UNKNOWN,
                NOT_ASSESSED, or EXCEPTION) with confidence calibration: PASS requires HIGH confidence based on evidence
                presence, freshness, completeness, structural validity, source validity, and scope match.
              </p>
              <p className="mb-4">
                Framework mapping then renders the control results as framework-specific posture: Essential Eight maturity
                levels, ISO 27001 clause compliance, NIST CSF subcategory status, APRA CPS 234 requirement status, and so on.
                Adding a new framework requires loading requirement definitions and mapping rules — not changing the platform
                code. The engine commits all evidence and assessment results to the immutable evidence infrastructure.
              </p>
            </ArchExpandableShell>
            <ArchExpandableShell
              label="How evidence flows through Lens"
              onExpand={() => capturePosthogEvent('arch_layer2_expanded', { section: 'How evidence flows through Lens' })}
            >
              <p className="mb-4">
                Lens collects AI governance evidence across seven enforcement layers: browser extension, endpoint agent,
                network gateway, API interceptor, cloud application connectors, AI output inspection, and internal LLM API
                protection. Each layer monitors a different way AI tools can be accessed.
              </p>
              <p className="mb-4">
                When an AI interaction is detected, it passes through an eight-stage classification pipeline: preprocessing,
                deterministic validation, semantic classification, prompt injection detection, context enrichment, file and
                image inspection, output classification, and policy resolution. The resolved action — block, warn, redact,
                educate, audit, or allow — is executed immediately.
              </p>
              <p className="mb-4">
                Every governed interaction produces a forensic evidence record containing: tenant identity, event identity,
                timestamp, source layer, user reference, action taken, severity, policy reference, data classification
                results, destination summary, hash references, and lineage. This evidence is committed to the immutable
                evidence infrastructure using the same proof model as Track — WORM storage, SHA-256 hashing, and per-tenant
                hash chaining.
              </p>
              <p>
                Lens also integrates bidirectionally with existing security platforms (SIEM, XDR, EDR, ITSM, alerting,
                GRC), sending AI-specific findings to the customer&apos;s existing tools while receiving risk signals back where
                supported.
              </p>
            </ArchExpandableShell>
            <ArchExpandableShell
              label="What they share at the infrastructure level"
              onExpand={() =>
                capturePosthogEvent('arch_layer2_expanded', { section: 'What they share at the infrastructure level' })
              }
            >
              <p className="mb-4 font-medium text-[#0B1320]">Track and Lens share the following architectural foundations:</p>
              <p className="mb-4">
                <strong className="text-[#0B1320]">Immutable storage:</strong> Both platforms write evidence to WORM (Write
                Once, Read Many) storage. Once written, evidence cannot be altered or deleted at the storage level. This is an
                infrastructure guarantee, not an application-level restriction.
              </p>
              <p className="mb-4">
                <strong className="text-[#0B1320]">Cryptographic hash chaining:</strong> Both platforms maintain per-tenant
                hash chains where each evidence record includes the hash of the previous record. Chains are independent per
                tenant — no cross-tenant chaining exists. Tampering with any record invalidates all subsequent hashes.
              </p>
              <p className="mb-4">
                <strong className="text-[#0B1320]">Governance proof model:</strong> Both platforms record governance actions
                (attestation, risk acceptance, policy approval) as immutable signature events in the evidence ledger. Each
                signature event contains the actor&apos;s identity, role, timestamp, IP address, related evidence references,
                and scope context.
              </p>
              <p className="mb-4">
                <strong className="text-[#0B1320]">Report verification:</strong> Both platforms generate reports whose hashes are
                recorded in the evidence ledger. Reports can be independently verified through a verification endpoint or QR
                code without platform access.
              </p>
              <p className="mb-4">
                <strong className="text-[#0B1320]">Australian data residency:</strong> Both platforms host all data in AWS
                Sydney (ap-southeast-2). No cross-region replication. No offshore processing.
              </p>
              <p className="mb-4">
                <strong className="text-[#0B1320]">Tenant isolation:</strong> Both platforms enforce tenant isolation at the
                database level. Evidence chains are per-tenant. Connectors are tenant-bound. No tenant&apos;s data can be
                accessed by another tenant.
              </p>
              <p>
                <strong className="text-[#0B1320]">Retention and legal hold:</strong> Both platforms support 7-year default
                retention (tenant-configurable) and legal hold that overrides deletion.
              </p>
            </ArchExpandableShell>
          </div>
        </div>
      </section>

      {/* §30.4 Evidence lifecycle */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Evidence lifecycle — from collection to court
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Evidence in both platforms follows a defined lifecycle. Each stage adds trust. No stage can be skipped or
            reversed.
          </p>
          <div className="relative mx-auto max-w-[800px] pl-2">
            <div className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-[#E5E7EB] sm:left-[9px]" aria-hidden />
            <ol className="relative m-0 list-none space-y-6 p-0">
              {LIFECYCLE_STAGES.map((stage) => (
                <li key={stage.n} className="relative pl-9 sm:pl-10">
                  <span
                    className="absolute left-[7px] top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#1E3A8A] ring-4 ring-white sm:left-[9px]"
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[14px] font-bold text-[#1E3A8A]">{stage.n}</span>
                    <span className="text-[16px] font-semibold text-[#0B1320]">{stage.title}</span>
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.7] text-[#4B5563]">{stage.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* §30.5 Residency */}
      <section className="bg-[#0B1320] py-16 lg:py-20" ref={residencyRef}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-8 text-center text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
            Australian data residency — enforced, not just promised
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="text-[15px] font-normal leading-[1.7] text-white/[0.85] lg:col-span-6 lg:text-[16px]">
              <p className="mb-4">
                Both platforms are hosted entirely in AWS Sydney (ap-southeast-2). This is not a configuration option that can
                be toggled off. It is enforced at the infrastructure level through technical controls that prevent data from
                leaving the Australian region.
              </p>
              <p>
                This matters because Australian organisations — particularly in healthcare, legal, financial services,
                insurance, and government — are increasingly expected to demonstrate that their data remains in Australian
                jurisdiction. Self-certification is no longer sufficient for many regulated industries. APEXLyn provides
                infrastructure-level enforcement that can be independently verified.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/10 lg:col-span-6">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/10 px-4 py-3 text-[14px] font-semibold text-white">Control</th>
                    <th className="border border-white/10 px-4 py-3 text-[14px] font-semibold text-white">
                      Implementation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RESIDENCY_ROWS.map((row, i) => (
                    <tr key={row.control} className={i % 2 === 1 ? 'bg-white/[0.03]' : 'bg-transparent'}>
                      <td className="border border-white/10 px-4 py-3 text-[14px] text-white/80">
                        <MultilineCell text={row.control} />
                      </td>
                      <td className="border border-white/10 px-4 py-3 text-[14px] text-white/80">{row.impl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* §30.6 Tenant isolation */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
                Tenant isolation — your data is yours alone
              </h2>
              <p className="mb-4 text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">
                Every organisation on APEXLyn operates in a fully isolated tenant. Your evidence, your assessments, your
                governance records, your reports, and your configuration are completely separated from every other
                organisation on the platform.
              </p>
              <p className="mb-6 text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">
                This isolation is not enforced by application logic alone. It is enforced at the database level, the storage
                level, the evidence chain level, and the API level simultaneously. A failure in any single layer does not
                compromise isolation because multiple independent enforcement mechanisms operate together.
              </p>
              <ArchExpandableShell
                label="Isolation detail"
                onExpand={() => capturePosthogEvent('arch_isolation_expanded', {})}
              >
                <p className="mb-4">
                  <strong className="text-[#0B1320]">Database isolation:</strong> Row-level security (RLS) is enforced at
                  the PostgreSQL database layer. Every query is scoped to the authenticated tenant. Cross-tenant data access
                  is rejected and logged.
                </p>
                <p className="mb-4">
                  <strong className="text-[#0B1320]">Evidence chain isolation:</strong> Each tenant has its own independent
                  hash chain. No cross-tenant chaining exists. Evidence from one organisation never enters another
                  organisation&apos;s chain.
                </p>
                <p className="mb-4">
                  <strong className="text-[#0B1320]">Connector isolation:</strong> Every connector instance is bound to a
                  specific tenant. Connector credentials and tokens are stored per-tenant and isolated.
                </p>
                <p className="mb-4">
                  <strong className="text-[#0B1320]">API isolation:</strong> Tenant context is derived from authenticated
                  claims (JWT/session), not from client-provided identifiers. Any request attempting cross-tenant access is
                  rejected and logged.
                </p>
                <p className="mb-4">
                  <strong className="text-[#0B1320]">MSP isolation:</strong> MSP access to client tenants is explicitly assigned
                  per client. No MSP has default access to all tenants. If an MSP is suspended, access is revoked immediately
                  across all assigned tenants.
                </p>
                <p>
                  <strong className="text-[#0B1320]">Audit isolation:</strong> All tenant-scoped actions are audit-logged with
                  tenant context. The audit trail is immutable and Australian-resident.
                </p>
              </ArchExpandableShell>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-8">
                <h3 className="text-[18px] font-semibold text-[#0B1320]">Five layers of isolation</h3>
                <ul className="mt-6 space-y-3 text-[15px] text-[#4B5563]">
                  <li>Database — row-level security per tenant</li>
                  <li>Storage — per-tenant evidence chains</li>
                  <li>Connectors — tenant-bound credentials</li>
                  <li>API — server-derived tenant context</li>
                  <li>MSP — explicitly assigned, instantly revocable</li>
                </ul>
                <p className="mt-8 text-[13px] text-[#6B7280]">
                  Cross-tenant access is rejected and audit-logged at every layer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §30.7 Access control */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Access control — deny by default
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Both platforms enforce a zero-trust access model. No action is permitted unless explicitly authorised. Every
            sensitive action requires MFA re-verification. Every access is logged.
          </p>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <h3 className="mb-4 text-[18px] font-semibold text-[#0B1320]">Role hierarchy</h3>
              <p className="mb-4 text-[15px] leading-[1.7] text-[#4B5563]">
                <span className="font-medium text-[#0B1320]">Platform hierarchy:</span>
                <br />
                Super-Admin (Platform Owner) → MSP (Partner) → Client (Business) → User (Employee)
              </p>
              <p className="mb-4 text-[15px] leading-[1.7] text-[#4B5563]">
                <span className="font-medium text-[#0B1320]">RBAC roles within a tenant:</span>
                <br />
                Admin · Approver · Reviewer · Viewer
              </p>
              <p className="text-[15px] leading-[1.7] text-[#4B5563]">
                All authorisation decisions are server-side. The UI presents what the server authorises — it does not decide
                what to show based on client-side logic. Deny-by-default means every endpoint and every action must explicitly
                allow a role. If a role is not explicitly allowed, access is denied.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white lg:col-span-6">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F7F9FC]">
                    <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">Control</th>
                    <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">
                      Specification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ACCESS_ROWS.map((row, i) => (
                    <tr key={row.control} className={i % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'}>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#4B5563]">
                        <MultilineCell text={row.control} />
                      </td>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-[14px] text-[#4B5563]">{row.spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* §30.8 Verification */}
      <section className="bg-white py-16 lg:py-20" ref={verificationRef}>
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Report verification — trust mathematics, not marketing
          </h2>
          <p className="mb-6 text-[16px] leading-[1.7] text-[#4B5563]">
            Every report generated by Track or Lens can be independently verified. The verification process does not require
            the reviewer to trust APEXLyn. It requires the reviewer to trust mathematics.
          </p>
          <p className="mb-10 text-[16px] leading-[1.7] text-[#4B5563]">
            When a report is generated, its hash is recorded in the evidence ledger. The verification endpoint accepts a
            report identifier and returns metadata confirming whether the report is genuine and unaltered. The reviewer does
            not need platform access, does not need an account, and does not see any tenant data beyond the verification
            result.
          </p>
          <h3 className="mt-8 text-[20px] font-semibold text-[#0B1320] lg:mt-10">What the verification endpoint returns</h3>
          <p className="mb-4 mt-3 text-[16px] leading-[1.7] text-[#4B5563]">
            When queried with a valid report identifier, the verification endpoint returns:
          </p>
          <ul className="mb-6 list-none space-y-2 text-[16px] leading-[1.7] text-[#4B5563]">
            <li>
              — <span className="font-apex-mono text-[14px] text-[#1E3A8A]">report_id</span>
            </li>
            <li>
              — report hash (<span className="font-apex-mono text-[14px] text-[#1E3A8A]">SHA-256</span>)
            </li>
            <li>— generation timestamp</li>
            <li>— framework versions and assessment scope</li>
            <li>— confirmation that the report hash is recorded in the evidence ledger</li>
            <li>— ledger reference</li>
            <li>— valid / invalid status</li>
          </ul>
          <p className="text-[16px] leading-[1.7] text-[#4B5563]">
            The endpoint does not return: tenant data, evidence records, governance details, user information, or any content
            beyond verification metadata.
          </p>
          <h3 className="mt-8 text-[20px] font-semibold text-[#0B1320] lg:mt-10">Access policy</h3>
          <p className="mb-4 mt-3 text-[16px] leading-[1.7] text-[#4B5563]">
            The verification endpoint is accessible via:
          </p>
          <ul className="mb-6 list-none space-y-2 text-[16px] leading-[1.7] text-[#4B5563]">
            <li>— authenticated users within the tenant</li>
            <li>
              — an optional read-only public verification token embedded in a <span className="font-apex-mono text-[14px] text-[#1E3A8A]">QR code</span> on the report (time-limited)
            </li>
          </ul>
          <p className="text-[16px] leading-[1.7] text-[#4B5563]">
            The public verification token allows external reviewers — insurers, auditors, regulators — to verify report
            authenticity without platform access. The token is time-limited and returns only the verification result.
          </p>
          <h3 className="mt-8 text-[20px] font-semibold text-[#0B1320] lg:mt-10">
            What this means for insurers and auditors
          </h3>
          <p className="mb-4 mt-3 text-[16px] leading-[1.7] text-[#4B5563]">
            An insurer receiving a Track report can scan the QR code and receive independent confirmation that the report was
            generated by the platform at the stated time with the stated scope and has not been altered since generation. The
            insurer does not need to trust APEXLyn&apos;s claims. The insurer verifies the cryptographic proof.
          </p>
          <p className="text-[16px] leading-[1.7] text-[#4B5563]">
            An auditor reviewing evidence can verify that specific evidence records exist in the immutable ledger, that their
            hashes match, that the chain is intact, and that the report correctly references those records. The audit trail is
            mathematical, not testimonial.
          </p>
        </div>
      </section>

      {/* §30.9 Framework engine */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <h2 className="mb-8 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Frameworks are configuration, not code
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.7] text-[#4B5563]">
            <p>
              Track does not hard-code compliance frameworks into the platform. Instead, it maintains a set of universal
              controls — stable, framework-independent evaluation points. Compliance frameworks are views mapped onto these
              controls.
            </p>
            <p>This architecture means:</p>
            <p>
              A single universal control — such as &quot;MFA enforced for all users&quot; — can simultaneously satisfy
              requirements in Essential Eight, ISO 27001, NIST CSF, CIS Benchmarks, and APRA CPS 234. The control is evaluated
              once against the evidence. The result is rendered through each framework&apos;s lens.
            </p>
            <p>
              Adding a new framework — a new version of the ISM, a new APRA guideline, or an international SOC 2 — requires
              loading requirement definitions and mapping rules into the engine. It does not require changing platform code
              or rebuilding the assessment engine.
            </p>
            <p>
              Framework versions are tracked and reports are bound to the exact framework version, mapping rules version,
              and control rules version active at the time of assessment. Historical reports remain bound to the versions they
              were generated under, even as frameworks are updated. This means a report generated in March 2026 against ISM
              March 2026 remains valid and interpretable regardless of future ISM updates.
            </p>
            <p>
              Assessment is confidence-calibrated. A control produces PASS only when the confidence level is HIGH — meaning
              the evidence is present, fresh, complete, structurally valid, from the correct source, and within scope. If any
              condition is not met, the result is UNKNOWN (insufficient evidence), never PASS. Missing evidence never
              produces a passing result. This is a hard platform rule that cannot be overridden.
            </p>
          </div>
        </div>
      </section>

      {/* §30.10 Documentation CTA */}
      <section className="border-t border-[#E5E7EB] bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-4 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">Need more technical detail?</h2>
          <p className="mx-auto mb-6 max-w-[600px] text-[17px] leading-relaxed text-[#4B5563]">
            If you are evaluating APEXLyn for an enterprise, government, insurance, or regulated-industry deployment and
            need detailed security documentation beyond what is published here, we can provide it under appropriate review.
          </p>
          <Link
            href={DOCUMENTATION_HREF}
            onClick={() => capturePosthogEvent('arch_documentation_cta_clicked', {})}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
          >
            Request security documentation
          </Link>
          <p className="mx-auto mt-6 max-w-[560px] text-[14px] text-[#6B7280]">
            Available to qualified evaluators. Covers: detailed architecture, data handling, evidence schemas, connector
            specifications, assessment methodology, and operational controls.
          </p>
        </div>
      </section>

      {/* §30.11 Final CTA */}
      <section className="bg-[#0B1320] py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
            Evidence infrastructure for Australian organisations
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] text-[17px] font-normal leading-relaxed text-white/80">
            From a 10-person medical practice to a federal government agency. From Essential Eight to ASD ISM. From basic
            compliance evidence to court-ready forensic proof. One architecture. Two platforms. Designed for Australian
            operating conditions.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-3">
            <Link
              href={CONTACT_HREF}
              onClick={() => capturePosthogEvent('arch_final_cta_clicked', { cta_label: 'Start a conversation' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Start a conversation
            </Link>
            <Link
              href={TRACK_HREF}
              onClick={() => capturePosthogEvent('arch_final_cta_clicked', { cta_label: 'Explore Track' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Explore Track
            </Link>
            <Link
              href={LENS_HREF}
              onClick={() => capturePosthogEvent('arch_final_cta_clicked', { cta_label: 'Explore Lens' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Explore Lens
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
