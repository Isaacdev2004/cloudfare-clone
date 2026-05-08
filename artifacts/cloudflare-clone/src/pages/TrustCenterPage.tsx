import React, { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import {
  TRUST_SUMMARY_CARDS,
  TRUST_RESIDENCY_ROWS,
  TRUST_ENCRYPTION_ROWS,
  TRUST_IMMUTABILITY_ROWS,
  TRUST_ISOLATION_ROWS,
  TRUST_AUTH_ROWS,
  TRUST_AUDIT_FIELD_ROWS,
  TRUST_RETENTION_ROWS,
  TRUST_VERIFICATION_FIELDS,
  TRUST_GOVERNANCE_SIG_ROWS,
  TRUST_REPORT_ITEMS,
  TRUST_CANONICAL_STATUS_ROWS,
  TRUST_OPERATIONAL_ROWS,
  TRUST_PRIVACY_ROWS,
  TRUST_AUDITED_ACTIONS,
} from '@/lib/apexlyn-trust-content';

const DOCS_HREF = '/documentation';

function CellLines({ text }: { text: string }) {
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

function PairTable({ colHeaders, rows }: { colHeaders: [string, string]; rows: [string, string][] }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-[#E5E7EB] lg:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#F7F9FC]">
              <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">
                {colHeaders[0]}
              </th>
              <th className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]">
                {colHeaders[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b], i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'}>
                <td className="border border-[#E5E7EB] px-4 py-3 align-top text-[14px] text-[#4B5563]">
                  <CellLines text={a} />
                </td>
                <td className="border border-[#E5E7EB] px-4 py-3 align-top text-[14px] text-[#4B5563]">
                  {b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 lg:hidden">
        {rows.map(([a, b], i) => (
          <article key={i} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.5px] text-[#6B7280]">
              <CellLines text={a} />
            </h4>
            <p className="mt-2 text-[14px] leading-relaxed text-[#4B5563]">{b}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function TripleTable({ colHeaders, rows }: { colHeaders: [string, string, string]; rows: [string, string, string][] }) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-lg border border-[#E5E7EB] lg:block">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-[#F7F9FC]">
              {colHeaders.map((h) => (
                <th
                  key={h}
                  className="border border-[#E5E7EB] px-4 py-3 text-[14px] font-semibold text-[#0B1320]"
                >
                  <CellLines text={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c], i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'}>
                <td className="border border-[#E5E7EB] px-4 py-3 align-top text-[14px] text-[#4B5563]">
                  <CellLines text={a} />
                </td>
                <td className="border border-[#E5E7EB] px-4 py-3 align-top text-[14px] text-[#4B5563]">
                  <CellLines text={b} />
                </td>
                <td className="border border-[#E5E7EB] px-4 py-3 align-top text-[14px] text-[#4B5563]">
                  <CellLines text={c} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 lg:hidden">
        {rows.map(([a, b, c], i) => (
          <article key={i} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
            <h4 className="text-[14px] font-semibold text-[#0B1320]">
              <CellLines text={a} />
            </h4>
            <p className="mt-2 text-[13px] font-medium text-[#374151]">
              <CellLines text={b} />
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#4B5563]">
              <CellLines text={c} />
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

function TrustSection({
  bg,
  sectionKey,
  children,
  className,
}: {
  bg: 'white' | 'muted';
  sectionKey: string;
  children: React.ReactNode;
  className?: string;
}) {
  const tone = bg === 'white' ? 'bg-white' : 'bg-[#F7F9FC]';
  return (
    <section data-trust-section={sectionKey} className={cn(tone, className)}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">{children}</div>
    </section>
  );
}

export default function TrustCenterPage() {
  const pageEnteredAt = useRef<number | null>(null);
  const timeEventSent = useRef(false);
  const sectionsSeen = useRef<Set<string>>(new Set());

  useEffect(() => {
    pageEnteredAt.current = Date.now();
    capturePosthogEvent('trust_page_viewed', {});

    const on30s = window.setTimeout(() => {
      if (timeEventSent.current || pageEnteredAt.current == null) return;
      timeEventSent.current = true;
      const seconds = Math.max(30, Math.round((Date.now() - pageEnteredAt.current) / 1000));
      capturePosthogEvent('trust_time_on_page', { seconds });
    }, 30000);

    return () => window.clearTimeout(on30s);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute('data-trust-section');
          if (!id || sectionsSeen.current.has(id)) continue;
          sectionsSeen.current.add(id);
          capturePosthogEvent('trust_section_viewed', { section: id });
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );

    const t = window.setTimeout(() => {
      document.querySelectorAll('[data-trust-section]').forEach((el) => io.observe(el));
    }, 100);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#0B1320] pt-12 pb-8 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">Trust Center</p>
          <h1 className="mb-6 text-[32px] font-bold leading-tight text-white lg:text-[48px]">Trust Center</h1>
          <p className="mx-auto mb-8 max-w-[640px] text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[17px]">
            This page provides the technical security posture for APEXLyn Track and Lens. It is published for CISOs,
            auditors, insurers, procurement officers, and technical evaluators who need specific detail before making a
            platform decision. Every value on this page reflects the production architecture. If you need detail beyond
            what is published here, you can request security documentation under appropriate review.
          </p>
          <Link
            href={DOCS_HREF}
            onClick={() => capturePosthogEvent('trust_documentation_cta_clicked', { location: 'hero' })}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
          >
            Request security documentation
          </Link>
        </div>
      </section>

      <TrustSection bg="white" sectionKey="Trust overview summary" className="py-16">
        <p className="mb-8 max-w-[720px] text-[16px] leading-relaxed text-[#4B5563]">
          These cards provide an at-a-glance summary. Detailed sections follow below.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_SUMMARY_CARDS.map((card) => (
            <article
              key={card.label}
              className="flex h-full min-h-full flex-col rounded-lg border border-[#E5E7EB] bg-[#F7F9FC] p-5"
            >
              <p className="text-[13px] font-medium uppercase tracking-[0.5px] text-[#6B7280]">{card.label}</p>
              <p className="mt-2 text-[17px] font-semibold leading-snug text-[#0B1320]">{card.value}</p>
            </article>
          ))}
        </div>
      </TrustSection>

      <TrustSection bg="muted" sectionKey="Australian data residency" className="py-12 lg:py-20">
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Australian data residency
        </h2>
        <p className="mb-8 max-w-[720px] text-[16px] leading-[1.7] text-[#4B5563]">
          All data processed and stored by APEXLyn Track and Lens remains in Australia. This is enforced at the
          infrastructure level through technical controls — not by policy alone. The following controls are in
          production.
        </p>
        <PairTable colHeaders={['Control area', 'Implementation detail']} rows={TRUST_RESIDENCY_ROWS} />
        <p className="mt-4 text-[14px] leading-relaxed text-[#6B7280]">
          If future regional deployments are launched, each region maintains its own database, its own evidence
          storage, its own ledger continuity, and its own tenant isolation. No cross-region evidence replication occurs.
        </p>
      </TrustSection>

      <TrustSection bg="white" sectionKey="Encryption" className="py-12 lg:py-20">
        <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Encryption
        </h2>
        <TripleTable colHeaders={['Layer', 'Standard', 'Implementation']} rows={TRUST_ENCRYPTION_ROWS} />
        <p className="mt-4 text-[14px] leading-relaxed text-[#6B7280]">
          KMS keys are region-locked to ap-southeast-2. Key rotation is scheduled and enforced. Separation of duties
          ensures that no single role can both manage keys and access the data they protect.
        </p>
      </TrustSection>

      <TrustSection bg="muted" sectionKey="Evidence immutability and integrity" className="py-12 lg:py-20">
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Evidence immutability and integrity
        </h2>
        <p className="mb-8 max-w-[720px] text-[16px] leading-[1.7] text-[#4B5563]">
          Both platforms treat evidence as permanent, tamper-evident proof. Once evidence is committed, it cannot be
          altered or deleted at any layer of the system. This is enforced simultaneously at the storage level, the
          database level, and the application level.
        </p>
        <PairTable colHeaders={['Mechanism', 'Detail']} rows={TRUST_IMMUTABILITY_ROWS} />
        <p className="mt-4 text-[14px] leading-relaxed text-[#6B7280]">
          Tampering detection: if any record in the hash chain is altered after commitment, all subsequent block hashes
          become invalid. This makes tampering mathematically detectable without requiring trust in APEXLyn.
        </p>
      </TrustSection>

      <TrustSection bg="white" sectionKey="Tenant isolation" className="py-12 lg:py-20">
        <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Tenant isolation
        </h2>
        <PairTable colHeaders={['Isolation layer', 'Implementation']} rows={TRUST_ISOLATION_ROWS} />
        <p className="mt-4 text-[14px] leading-relaxed text-[#6B7280]">
          Automated isolation testing is part of the release process. Tests include: tenant A cannot read tenant B objects
          (including via JOIN queries), MSP can only view assigned tenants, injection and abuse attempts are rejected and
          logged. All failed isolation tests block release.
        </p>
      </TrustSection>

      <TrustSection bg="muted" sectionKey="Access control and authentication" className="py-12 lg:py-20">
        <h2 className="mb-10 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Access control and authentication
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h3 className="mb-4 text-[18px] font-semibold text-[#0B1320]">Role hierarchy</h3>
            <p className="mb-4 text-[15px] leading-[1.7] text-[#4B5563]">
              <span className="font-semibold text-[#0B1320]">Platform hierarchy:</span>
            </p>
            <p className="mb-6 text-[15px] leading-[1.7] text-[#4B5563]">
              Super-Admin (Platform Owner) → MSP (Partner) → Client (Business) → User (Employee)
            </p>
            <p className="mb-3 text-[15px] font-semibold text-[#0B1320]">Tenant-level RBAC roles:</p>
            <ul className="space-y-3 text-[15px] leading-[1.7] text-[#4B5563]">
              <li>
                <span className="font-semibold text-[#0B1320]">Viewer</span> — read-only access to dashboards, framework
                views, evidence timeline, and generated reports.
              </li>
              <li>
                <span className="font-semibold text-[#0B1320]">Reviewer</span> — review evidence, findings, and report
                previews. Initiate review requests.
              </li>
              <li>
                <span className="font-semibold text-[#0B1320]">Approver</span> — perform attestation, submit risk
                acceptance, approve governance actions. Requires MFA re-check.
              </li>
              <li>
                <span className="font-semibold text-[#0B1320]">Admin</span> — configure tenant scope, manage connectors,
                manage users, generate reports, view audit logs.
              </li>
            </ul>
            <p className="mt-6 text-[15px] leading-[1.7] text-[#4B5563]">
              Authorisation model: deny-by-default. Every endpoint and every action must explicitly allow a role. If a
              role is not explicitly allowed, access is denied. All authorisation decisions are server-side — the UI
              presents what the server authorises but does not make authorisation decisions.
            </p>
          </div>
          <div className="lg:col-span-6">
            <h3 className="mb-4 text-[18px] font-semibold text-[#0B1320]">Authentication</h3>
            <PairTable colHeaders={['Control', 'Specification']} rows={TRUST_AUTH_ROWS} />
          </div>
        </div>
      </TrustSection>

      <TrustSection bg="white" sectionKey="Audit logging" className="py-12 lg:py-20">
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Audit logging
        </h2>
        <p className="mb-8 max-w-[720px] text-[16px] leading-[1.7] text-[#4B5563]">
          All security-relevant actions across both platforms are recorded in an immutable, Australian-resident audit
          log. Audit events cannot be altered or deleted after recording.
        </p>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-4 text-[18px] font-semibold text-[#0B1320]">Audited actions</h3>
            <ul className="space-y-3 text-[15px] leading-[1.7] text-[#4B5563]">
              {TRUST_AUDITED_ACTIONS.map(({ label, text }) => (
                <li key={label}>
                  <span className="font-semibold text-[#0B1320]">{label}</span> — {text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-[18px] font-semibold text-[#0B1320]">Audit event fields</h3>
            <PairTable colHeaders={['Field', 'Description']} rows={TRUST_AUDIT_FIELD_ROWS} />
          </div>
        </div>
        <p className="mt-6 text-[14px] leading-relaxed text-[#6B7280]">
          Audit log storage: immutable (stored as a separate ledger stream or WORM log store). Australian-resident only.
          Default retention: 7 years, configurable per tenant where policy requires longer retention.
        </p>
      </TrustSection>

      <TrustSection bg="muted" sectionKey="Retention and legal hold" className="py-12 lg:py-20">
        <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Retention and legal hold
        </h2>
        <PairTable colHeaders={['Aspect', 'Detail']} rows={TRUST_RETENTION_ROWS} />
      </TrustSection>

      <TrustSection bg="white" sectionKey="Report verification" className="py-12 lg:py-20">
        <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Report verification
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-[16px] leading-[1.7] text-[#4B5563]">
              Every report generated by Track or Lens has its hash recorded in the evidence ledger at the time of
              generation. The report verification endpoint allows authorised reviewers to confirm that a report is
              genuine and unaltered — without platform access and without trusting APEXLyn.
            </p>
            <h3 className="mb-3 mt-8 text-[18px] font-semibold text-[#0B1320]">Verification endpoint response</h3>
            <p className="mb-3 text-[15px] text-[#4B5563]">When queried with a valid report identifier, the endpoint returns:</p>
            <ul className="space-y-2">
              {TRUST_VERIFICATION_FIELDS.map(({ name, desc }) => (
                <li key={name} className="text-[14px] leading-relaxed text-[#4B5563]">
                  <span className="font-['JetBrains_Mono',monospace] text-[14px] text-[#1E3A8A]">{name}</span>
                  {' — '}
                  {desc}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-8 lg:col-span-6">
            <h3 className="text-[18px] font-semibold text-[#0B1320]">Who can verify</h3>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-[#4B5563]">
              <div>
                <p className="font-semibold text-[#0B1320]">Authenticated tenant users</p>
                <p className="mt-1">
                  Users within the tenant can verify any report generated for their tenant.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#0B1320]">Public verification (optional)</p>
                <p className="mt-1">
                  Reports can optionally include a QR code containing a read-only, time-limited public verification token.
                  External reviewers — insurers, auditors, regulators — scan the QR code and receive the verification
                  result without platform access.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#0B1320]">Security constraint</p>
                <p className="mt-1">
                  The verification endpoint does not return tenant data, evidence records, governance details, user
                  information, or any content beyond the verification metadata listed above. A public verification token
                  cannot be used to browse the platform or access tenant data.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </TrustSection>

      <TrustSection bg="muted" sectionKey="Governance proof" className="py-12 lg:py-20">
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Governance proof
        </h2>
        <p className="mb-8 max-w-[720px] text-[16px] leading-[1.7] text-[#4B5563]">
          Human governance decisions — attestation, risk acceptance, policy approval — are not recorded as database
          entries alone. They are recorded as immutable signature events in the evidence ledger, with the same proof
          model applied to technical evidence.
        </p>
        <PairTable colHeaders={['Field', 'Description']} rows={TRUST_GOVERNANCE_SIG_ROWS} />
        <p className="mt-4 text-[14px] leading-relaxed text-[#6B7280]">
          Risk acceptance includes: reason (plain English), owner, expiry date, and review date. Reminders are sent before
          expiry at 30 days, 15 days, 3 days, and 1 day. When a risk acceptance expires, the exception status is
          automatically removed and the underlying assessment result takes effect. Terminating a risk acceptance creates a
          new governance event — it does not delete the original acceptance record.
        </p>
      </TrustSection>

      <TrustSection bg="white" sectionKey="Report structure" className="py-12 lg:py-20">
        <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Report structure
        </h2>
        <p className="mb-8 max-w-[720px] text-[16px] leading-[1.7] text-[#4B5563]">
          Every report generated by Track follows a fixed structure designed for insurance-grade and audit-grade review.
          Reports support two readability modes from the same evidence base.
        </p>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h3 className="mb-4 text-[18px] font-semibold text-[#0B1320]">Readability modes</h3>
            <div className="space-y-4 text-[15px] leading-[1.7] text-[#4B5563]">
              <div>
                <p className="font-semibold text-[#0B1320]">Executive / Insurer view (default)</p>
                <p className="mt-1">
                  Plain English. Minimal jargon. Designed for board members, executives, insurers, and non-technical
                  reviewers. Technical identifiers appear only when referenced in the Evidence Appendix.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#0B1320]">Technical Appendix view</p>
                <p className="mt-1">
                  Full evidence proof: cryptographic hashes, timestamps, event IDs, device identity, ledger references.
                  Designed for auditors, CISOs, and technical reviewers who need to verify the evidence chain.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <h3 className="mb-4 text-[18px] font-semibold text-[#0B1320]">What every report includes</h3>
            <ul className="space-y-2 text-[14px] leading-relaxed text-[#4B5563]">
              {TRUST_REPORT_ITEMS.map((line) => (
                <li key={line}>— {line}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-[14px] leading-relaxed text-[#6B7280]">
          Every finding includes: (1) what failed, in plain English; (2) why it matters, expressed as risk; (3) what to do
          next, with specific remediation guidance tied to the control record; and (4) evidence reference with
          cryptographic hash and event ID. Reports are generated server-side only — never in the browser. The generated
          PDF is stored in AU-region storage and its hash is recorded as a governance or evidence event.
        </p>
      </TrustSection>

      <TrustSection bg="muted" sectionKey="Confidence-calibrated assessment" className="py-12 lg:py-20">
        <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Confidence-calibrated assessment
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-[16px] leading-[1.7] text-[#4B5563]">
              Track does not produce binary pass/fail results from incomplete or questionable evidence. Every control
              assessment includes a confidence evaluation.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-[#4B5563]">
              A control produces PASS only when confidence is HIGH — meaning:
            </p>
            <ul className="mt-3 list-none space-y-2 pl-0 text-[16px] leading-[1.7] text-[#4B5563]">
              <li>— Evidence is present</li>
              <li>— Evidence is fresh (within the defined validity window for that control)</li>
              <li>— Evidence is complete (all required evidence types are present)</li>
              <li>— Evidence is structurally valid</li>
              <li>— Evidence is from the correct source</li>
              <li>— Evidence is within scope</li>
            </ul>
            <p className="mt-4 text-[16px] leading-[1.7] text-[#4B5563]">
              If any of those conditions is not met, the output is UNKNOWN (insufficient evidence), not PASS. Missing
              required evidence never produces a passing result. This is a hard platform rule that cannot be overridden.
            </p>
            <p className="mt-4 text-[16px] leading-[1.7] text-[#4B5563]">
              NOT_ASSESSED is used only for intentional scope exclusions — controls that are deliberately out of scope for
              the tenant&apos;s configuration. NOT_ASSESSED is never used to hide insufficient evidence.
            </p>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-8 lg:col-span-6">
            <h3 className="mb-6 text-[18px] font-semibold text-[#0B1320]">Canonical status values</h3>
            <TripleTable
              colHeaders={['Status', 'Meaning', 'Compliance\nlabel']}
              rows={TRUST_CANONICAL_STATUS_ROWS}
            />
            <p className="mt-4 text-[13px] leading-relaxed text-[#6B7280]">
              UNKNOWN means &quot;we cannot prove this.&quot; NOT_ASSESSED means &quot;we were not asked to assess
              this.&quot; These are different and the platform enforces the distinction.
            </p>
          </div>
        </div>
      </TrustSection>

      <TrustSection bg="white" sectionKey="Operational security" className="py-12 lg:py-20">
        <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Operational security
        </h2>
        <PairTable colHeaders={['Area', 'Detail']} rows={TRUST_OPERATIONAL_ROWS} />
      </TrustSection>

      <TrustSection bg="muted" sectionKey="Data handling and privacy" className="py-12 lg:py-20">
        <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
          Data handling and privacy
        </h2>
        <PairTable colHeaders={['Area', 'Detail']} rows={TRUST_PRIVACY_ROWS} />
      </TrustSection>

      <section data-trust-section="Framework disclaimer" className="border-t border-[#E5E7EB] bg-white py-12">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <p className="text-[14px] leading-[1.7] text-[#6B7280]">
            Framework alignment notice: APEXLyn Track does not claim certification, accreditation, or formal compliance
            on behalf of any organisation. Track does not replace qualified professional advice. Assessment outputs are
            evidence-based, confidence-calibrated, and version-bound. They should be reviewed by qualified professionals
            for formal compliance, audit, regulatory, and legal decisions.
          </p>
          <p className="mt-4 text-[14px] leading-[1.7] text-[#6B7280]">
            Where a framework requirement depends on policies, training records, contracts, consents, attestations, or
            other governance evidence not automatically collected through approved technical evidence paths, the
            platform does not treat that requirement as PASS. It surfaces it as UNKNOWN (insufficient evidence) or blocks
            assessment scope where required.
          </p>
        </div>
      </section>

      <section data-trust-section="Need more detail?" className="bg-[#0B1320] py-12 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl">Need more detail?</h2>
          <p className="mx-auto mb-8 max-w-[640px] text-[17px] leading-relaxed text-white/80">
            If you are evaluating APEXLyn for an enterprise, government, insurance, or regulated-industry deployment and
            need detail beyond what is published on this page — including architecture schemas, evidence field
            specifications, connector permission sets, assessment methodology, and operational controls — we can provide
            it under appropriate review.
          </p>
          <Link
            href={DOCS_HREF}
            onClick={() => capturePosthogEvent('trust_documentation_cta_clicked', { location: 'bottom' })}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
          >
            Request security documentation
          </Link>
          <p className="mt-6 text-[14px] text-white/50">
            Available to qualified evaluators. Response within 2 business days.
          </p>
        </div>
      </section>
    </div>
  );
}
