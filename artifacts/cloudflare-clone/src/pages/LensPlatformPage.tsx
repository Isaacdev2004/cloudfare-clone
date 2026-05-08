import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Eye,
  Shield,
  Fingerprint,
  Plug,
  ChevronDown,
  Search,
  GitBranch,
  FolderOpen,
  CheckCircle,
  Download,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { CTA } from '@/lib/apexlyn-cta-routes';
import { LensEnforcementLayersDiagram } from '@/components/lens/LensEnforcementLayersDiagram';
import { LensShadowAiVisual } from '@/components/lens/LensShadowAiVisual';

const CONTACT_HREF = CTA.contact;
const PRICING_HREF = '/pricing';
const BASELINE_HREF = CTA.testYourSecurityState;

const OUTCOME_CARDS = [
  {
    Icon: Eye,
    title: 'Sees every AI interaction',
    body:
      'Lens monitors AI use across browsers, endpoints, network gateways, API calls, cloud applications, and internal models. Whether someone pastes client data into ChatGPT or an automated pipeline calls an AI API — Lens sees it.',
  },
  {
    Icon: Shield,
    title: 'Enforces your rules automatically',
    body:
      'Block, warn, redact, educate, or audit — your policies apply across every enforcement layer. Most-restrictive-wins is a hard platform rule. A stronger block cannot be silently overridden by a weaker allow.',
  },
  {
    Icon: Fingerprint,
    title: 'Records forensic-grade evidence',
    body:
      'Every AI interaction that Lens governs is recorded as an immutable evidence record — cryptographically hashed, timestamped, and chained. Not a log entry. Forensic-grade proof that can be used in investigations, insurance claims, and legal proceedings.',
  },
  {
    Icon: Plug,
    title: 'Works with your existing tools',
    body:
      'Already using CrowdStrike, Microsoft Defender, Zscaler, Netskope, Splunk, or ServiceNow? Lens connects to your existing security stack and adds the AI governance and evidence layer they do not have.',
  },
] as const;

const ENFORCEMENT_LAYERS: { label: string; body: React.ReactNode }[] = [
  {
    label: 'Layer 1 — Browser extension',
    body:
      'The browser extension monitors AI interactions happening through web browsers — the most common way employees access AI tools. It provides entitlement-aware inspection, meaning the depth of inspection matches what the organisation\u2019s plan includes. For supported content, the extension parses locally where possible and routes larger files or images through the hosted gateway for deeper inspection. If the extension encounters a temporary failure — service worker restart, stale policy cache, browser storage issue, or classification service unavailability — it follows explicit failsafe behaviour rather than silently allowing uncontrolled AI use.',
  },
  {
    label: 'Layer 2 — Endpoint agent',
    body:
      'The endpoint agent monitors AI activity at the device level — covering applications, processes, and local AI tool usage that never touches the browser. The agent is available on plans that include endpoint protection and provides deeper visibility into how AI tools are used on managed devices, including file-level inspection and application-level monitoring.',
  },
  {
    label: 'Layer 3 — Network gateway',
    body:
      'The hosted network gateway provides a central inspection point for AI-bound traffic. Organisations on plans that include gateway protection route AI traffic through the gateway for classification, policy enforcement, and evidence recording. The gateway handles response inspection, image and file inspection where entitled, and provides consistent enforcement regardless of which browser or device the user is on.',
  },
  {
    label: 'Layer 4 — API interceptor',
    body:
      'The API interceptor governs AI use that never touches a browser — SDK-based AI calls, direct HTTP calls to AI endpoints, orchestration frameworks, CI/CD pipeline AI calls, agentic workflows, and machine-driven AI use. The interception path preserves a three-checkpoint model: data retrieval, pre-LLM prompt, and response. This means Lens can enforce policy and record evidence even for fully automated AI interactions that no human initiates through a user interface.',
  },
  {
    label: 'Layer 5 — Cloud application connectors',
    body:
      'Cloud application connectors provide SaaS-native visibility into AI-related activity within platforms like Microsoft 365 and Google Workspace. These connectors use proper authentication and consent, monitor webhook health, implement retry and resync behaviour, and comply with provider rate limits. For every connector, Lens tracks: connected state, authentication validity, webhook health, event delay, throttled state, re-authentication requirement, and last successful sync.',
  },
  {
    label: 'Layer 6 — AI output inspection',
    body:
      'AI output DLP governs what AI models produce, not just what users send to them. This covers model-generated sensitive data, regurgitated internal content, model-produced regulated data, and prompt-injection effects visible in outputs. Output classification creates separate output-specific evidence and preserves visible input/output linkage — meaning an investigator can trace what went in, what came out, and whether the output contained sensitive material that the input did not.',
  },
  {
    label: 'Layer 7 — Internal LLM API protection',
    body:
      'Internal LLM API protection governs AI endpoints that live inside your organisation — private AI services, self-hosted models, and internal model traffic that never leaves your network. The policy engine supports different policy postures for: public external AI (e.g., ChatGPT), approved external AI (e.g., enterprise Azure OpenAI), internal private AI (e.g., self-hosted models), and high-assurance private AI (e.g., air-gapped or classified environments). This means your policies can be strict for public AI and permissive for approved internal AI — or vice versa — based on your organisation\u2019s risk profile.',
  },
];

const INTEGRATION_CARDS = [
  {
    accent: '#1E3A8A',
    title: 'SIEM & XDR integration',
    subtitle: 'Bidirectional where supported',
    body:
      'Lens sends AI-specific findings, events, and severity classifications directly to your SIEM and XDR. Where supported, data flows both ways — risk-score synchronisation with CrowdStrike Falcon and Microsoft Defender XDR, analytics-rule feedback from Microsoft Sentinel.',
    platforms:
      'Microsoft Sentinel · Splunk · IBM QRadar · LogRhythm · Datadog · Elastic · Sumo Logic · Exabeam · Rapid7 InsightIDR · CrowdStrike Falcon · Microsoft Defender XDR · SentinelOne',
  },
  {
    accent: '#1E90FF',
    title: 'SASE & proxy integration',
    subtitle: 'Via ICAP v1.0',
    body:
      'Enterprise customers running Zscaler, Netskope, Prisma, or equivalent SASE platforms can route AI-relevant traffic to Lens through ICAP for AI-specific inspection and policy enforcement. Lens acts as the AI decisioning layer within your existing traffic-control infrastructure.',
    platforms:
      'ICAP v1.0 (port 1344, REQMOD + RESPMOD) · Compatible with Zscaler, Netskope, and Prisma enterprise paths',
  },
  {
    accent: '#1F8A70',
    title: 'ITSM, alerting & GRC integration',
    subtitle: 'Automated incident and alert routing',
    body:
      'When Lens detects a policy violation or a high-severity AI event, it can automatically create incidents in your ITSM, trigger alerts in your collaboration tools, and feed findings into your GRC platform.',
    platforms:
      'ServiceNow · Jira · PagerDuty · Slack · Microsoft Teams · ServiceNow GRC',
  },
] as const;

const PIPELINE_STAGES = [
  { n: '01', title: 'Preprocessing', desc: 'Content normalisation and format detection before inspection begins.' },
  { n: '02', title: 'Deterministic validation', desc: 'Fast pattern-based checks for known sensitive data types — tax file numbers, credit cards, health identifiers, account numbers.' },
  { n: '03', title: 'Semantic classification', desc: 'Deeper content analysis to identify sensitive information that does not match simple patterns — legal privilege, medical records, financial advice, personally identifiable context.' },
  { n: '04', title: 'Prompt injection detection', desc: 'Detection of prompt injection attempts where an input tries to manipulate the AI model into bypassing controls or revealing protected information.' },
  { n: '05', title: 'Context enrichment', desc: 'Enrichment from connected sources — who is the user, what department, what device, what is the destination AI tool, what tier is the destination classified as.' },
  { n: '06', title: 'File and image inspection', desc: 'Extraction and classification of content within uploaded files and images, where the organisation\u2019s plan includes file and image inspection.' },
  { n: '07', title: 'Output classification', desc: 'Inspection of what the AI model produces — not just what was sent to it. Detects sensitive data in responses, regurgitated internal content, and prompt-injection effects.' },
  { n: '08', title: 'Policy resolution', desc: 'All classification results are packaged into an action envelope and resolved against the organisation\u2019s policy rules. The most-restrictive-wins rule applies. The resolved action — block, warn, redact, educate, audit, or allow — is executed and recorded as evidence.' },
] as const;

const POLICY_ACTIONS = [
  { dot: '#D64545', label: 'Block', text: '— prevent the interaction entirely' },
  { dot: '#F5B700', label: 'Warn', text: '— allow but require user acknowledgement' },
  { dot: '#1E90FF', label: 'Redact', text: '— remove sensitive content before it reaches the AI tool' },
  { dot: '#1F8A70', label: 'Educate', text: '— show the user why this matters before proceeding' },
  { dot: '#6B7280', label: 'Audit', text: '— allow and record silently for review' },
  { dot: '#9CA3AF', label: 'Allow', text: '— permit with standard evidence recording' },
] as const;

const FORENSIC_CARDS = [
  {
    Icon: Search,
    title: 'Forensic search',
    body:
      'Search and filter across all AI events by time, user, severity, data classification, destination, policy, action taken, and device. Move from one event to related events to build the full picture.',
  },
  {
    Icon: GitBranch,
    title: 'Linked event traversal',
    body:
      'Trace connected events across input and output, across sessions, and across related interactions. Understand not just what happened, but the chain of events that led to it.',
  },
  {
    Icon: FolderOpen,
    title: 'Case management',
    body:
      'Create formal investigation cases with linked events, case notes, ownership, severity, and auditable status progression. Cases move through defined stages: open, in review, escalated, hold applied, export preparing, and closed.',
  },
  {
    Icon: CheckCircle,
    title: 'Chain verification',
    body:
      'Verify the integrity of the evidence chain for any event or set of events. Confirm that no evidence has been altered since collection. Verification results are themselves recorded.',
  },
  {
    Icon: Download,
    title: 'Export preparation',
    body:
      'Prepare controlled export bundles scoped to specific cases, time ranges, or event selections. Exports are tied to formal export request records, expiry-controlled, and audit-visible. No uncontrolled bulk exports.',
  },
] as const;

const AUDIENCE_CARDS = [
  {
    title: 'Small businesses',
    body:
      'Start with the browser extension on Lens Standard. See where AI is being used, apply basic policies, and start building your evidence trail. No enterprise infrastructure required. No endpoint agent needed. Just install and start governing.',
  },
  {
    title: 'Mid-market and enterprise',
    body:
      'Add the hosted gateway, endpoint agent, deeper classification, forensic workspace, and API interceptor on Lens Professional or Enterprise. Connect to your existing SIEM, XDR, and ITSM. Apply granular policies by department, user group, and destination tier.',
  },
  {
    title: 'Government and regulated',
    body:
      'Lens Sovereign provides isolated deployment, customer-managed encryption keys, and the strongest evidence assurance. Full integration with existing government-approved security infrastructure via ICAP. Government-grade AI governance with forensic evidence that meets the highest standards.',
  },
] as const;

const LENS_PRICING = [
  {
    tier: 'Lens Standard',
    price: 'From A$349/month',
    body: 'Browser-based AI monitoring, basic policy enforcement, evidence recording, and self-service onboarding.',
  },
  {
    tier: 'Lens Professional',
    price: 'From A$899/month',
    body: 'Hosted gateway, deeper classification, forensic workspace, API interceptor, and assisted onboarding. Integrates with your existing SIEM and XDR.',
  },
  {
    tier: 'Lens Enterprise',
    price: 'From A$75,000/year',
    body: 'Full enforcement layers, legal hold, case management, court-ready evidence packs, and dedicated support.',
  },
  {
    tier: 'Lens Sovereign',
    price: 'Contact us',
    body: 'Isolated deployment, customer-managed keys, government-grade AI governance, and the highest evidence assurance.',
  },
] as const;

function ExpandableShell({
  trigger,
  open,
  onToggle,
  children,
}: {
  trigger: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-[15px] font-medium text-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span className="flex-1">{trigger}</span>
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

function LensEnforcementExpandable({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) capturePosthogEvent('lens_enforcement_layer_expanded', { layer: label });
  };
  return (
    <ExpandableShell trigger={label} open={open} onToggle={toggle}>
      {children}
    </ExpandableShell>
  );
}

function LensDetailExpandable({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) capturePosthogEvent('lens_layer2_expanded', { section: label });
  };
  return (
    <ExpandableShell trigger={label} open={open} onToggle={toggle}>
      {children}
    </ExpandableShell>
  );
}

export default function LensPlatformPage() {
  const { ref: integrationRef } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    onChange: (v) => {
      if (v) capturePosthogEvent('lens_integration_card_viewed', {});
    },
  });

  const { ref: pipelineRef } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    onChange: (v) => {
      if (v) capturePosthogEvent('lens_pipeline_viewed', {});
    },
  });

  const { ref: forensicRef } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    onChange: (v) => {
      if (v) capturePosthogEvent('lens_forensic_card_viewed', {});
    },
  });

  return (
    <div className="flex flex-col bg-white">
      {/* §29.1 Hero */}
      <section className="bg-[#0B1320] pb-12 pt-16 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#1E90FF]">APEXLyn Lens</p>
              <h1 className="mb-6 text-[32px] font-bold leading-[1.2] text-white lg:text-[48px]">
                AI governance with evidence, not just policy
              </h1>
              <p className="mb-8 max-w-[560px] text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[18px]">
                Most organisations govern AI with policies nobody enforces. Lens is different. It watches every way AI gets
                used across your business — browsers, endpoints, APIs, cloud apps, internal models — applies your rules
                automatically, and records every action as forensic-grade evidence. And it works alongside your existing
                security tools, not instead of them.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={CONTACT_HREF}
                  onClick={() => capturePosthogEvent('lens_hero_cta_clicked', { cta_label: 'Start a conversation' })}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
                >
                  Start a conversation
                </Link>
                <Link
                  href={PRICING_HREF}
                  onClick={() => capturePosthogEvent('lens_hero_cta_clicked', { cta_label: 'See pricing' })}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
                >
                  See pricing
                </Link>
              </div>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <LensEnforcementLayersDiagram variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* §29.2 Outcomes */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-12 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            What Lens does for your organisation
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

      {/* §29.3 Seven layers */}
      <section className="bg-[#F7F9FC] py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Seven layers of AI governance — not one
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Most AI governance tools rely on a single control point. Lens operates across seven enforcement layers so that AI
            use is governed no matter how it happens — through a browser, an app, an API, a developer pipeline, or an
            internal model.
          </p>
          <div className="mb-12 flex justify-center">
            <LensEnforcementLayersDiagram variant="section" />
          </div>
          <div className="mx-auto flex max-w-[720px] flex-col gap-6">
            {ENFORCEMENT_LAYERS.map(({ label, body }) => (
              <LensEnforcementExpandable key={label} label={label}>
                <p>{body}</p>
              </LensEnforcementExpandable>
            ))}
          </div>
        </div>
      </section>

      {/* §29.4 Integrations */}
      <section className="bg-white py-20 lg:py-24" ref={integrationRef}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            Your security tools keep working. Lens makes them smarter about AI.
          </h2>
          <p className="mx-auto mb-12 max-w-[720px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Lens is not a replacement for your SASE, your endpoint management, or your SIEM. It is the AI-specific governance
            and evidence layer that your existing stack does not have. Lens integrates with your current tools and adds
            what they are missing — AI visibility, AI policy enforcement, and forensic-grade AI evidence.
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {INTEGRATION_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:p-8"
                style={{ borderLeftWidth: 3, borderLeftColor: card.accent, borderLeftStyle: 'solid' }}
              >
                <h3 className="text-[20px] font-semibold text-[#0B1320]">{card.title}</h3>
                <p className="mt-1 text-[14px] font-medium text-[#1E3A8A]">{card.subtitle}</p>
                <p className="mt-4 text-[14px] font-normal leading-relaxed text-[#4B5563]">{card.body}</p>
                <p className="mt-4 text-[13px] font-normal leading-snug text-[#6B7280]">{card.platforms}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-[14px] text-[#6B7280]">
            Lens also supports generic HMAC-SHA256 signed webhooks for any destination not covered by the native integration
            catalog.
          </p>
        </div>
      </section>

      {/* §29.5 Classification pipeline */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20" ref={pipelineRef}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            How Lens classifies AI interactions
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Lens does not rely on simple keyword matching. It uses a staged classification pipeline that applies multiple
            inspection methods in sequence — from fast deterministic checks to deeper semantic analysis — before making a
            policy decision.
          </p>
          <div className="relative mx-auto max-w-[680px] pl-2">
            <div
              className="absolute left-[9px] top-3 bottom-3 w-0.5 bg-[#E5E7EB] sm:left-[11px]"
              aria-hidden
            />
            <ol className="relative m-0 list-none space-y-5 p-0 sm:space-y-5">
              {PIPELINE_STAGES.map((stage) => (
                <li key={stage.n} className="relative flex gap-4 pl-8 sm:pl-10">
                  <span
                    className="absolute left-[7px] top-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A] ring-4 ring-[#F7F9FC] sm:left-[9px]"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[14px] font-bold text-[#1E3A8A]">{stage.n}</span>
                      <span className="text-[16px] font-semibold text-[#0B1320]">{stage.title}</span>
                    </div>
                    <p className="mt-1 pl-9 text-[14px] leading-relaxed text-[#4B5563]">{stage.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* §29.6 Policy engine */}
      <section id="policy-enforcement" className="scroll-mt-[calc(108px+1rem)] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
                Policies that enforce themselves
              </h2>
              <p className="mb-6 text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">
                Lens policies are not documents that sit in a folder. They are versioned, enforced rules that apply
                automatically across every enforcement layer. When a policy changes, a new version is created, approval is
                recorded, the compiled ruleset is distributed to all control layers, and the old version is preserved for
                historical reference.
              </p>
              <LensDetailExpandable label="Policy engine detail">
                <p className="mb-4">
                  The policy engine evaluates AI interactions against multiple condition dimensions simultaneously: data
                  classification result, destination tier (public AI, approved AI, internal AI, high-assurance AI), specific
                  destination tool, user group, tenant type, device posture, deployment mode, time conditions, connector
                  context, whether the interaction is input or response, and whether the user or device is managed or
                  unmanaged.
                </p>
                <p className="mb-4">
                  Available actions are: allow, allow with audit, warn, redact, educate, and block. Each action defines
                  user-facing behaviour, evidence behaviour, severity behaviour, and escalation behaviour.
                </p>
                <p className="mb-4">
                  Most-restrictive-wins is a hard platform rule. If multiple policy rules apply to an interaction, the most
                  restrictive action takes precedence. Block overrides warn. Warn overrides allow. Redact overrides allow where
                  redaction is the safer path. An approval-based allow cannot silently defeat a stronger hard-block rule
                  unless an explicit override class exists and is fully audited.
                </p>
                <p>
                  Policy templates are available for common industry configurations — healthcare, legal, financial services,
                  government — so organisations do not need to build policies from scratch.
                </p>
              </LensDetailExpandable>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-xl bg-[#0B1320] p-8">
                <h3 className="text-[18px] font-semibold text-white">Six policy actions</h3>
                <ul className="mt-6 space-y-3">
                  {POLICY_ACTIONS.map((a) => (
                    <li key={a.label} className="flex gap-2 text-[15px] text-white">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: a.dot }} aria-hidden />
                      <span>
                        <span className="font-medium">{a.label}</span> {a.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[13px] text-white/60">Most-restrictive-wins. Always.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §29.7 Forensic workspace */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20" ref={forensicRef}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-6 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2.25rem]">
            From incident to investigation to evidence — in one platform
          </h2>
          <p className="mx-auto mb-12 max-w-[680px] text-center text-[17px] font-normal leading-relaxed text-[#4B5563]">
            When something happens, Lens does not just alert you. It gives you the tools to investigate, build a case,
            verify the evidence chain, and prepare export bundles for legal, compliance, or insurance review — all within the
            platform.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {FORENSIC_CARDS.slice(0, 3).map(({ Icon: Ic, title, body }) => (
              <article
                key={title}
                className="flex flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:col-span-2 lg:p-8"
              >
                <Ic className="mb-4 h-6 w-6 text-[#1E3A8A]" strokeWidth={1.75} aria-hidden />
                <h3 className="mb-3 text-[18px] font-semibold text-[#0B1320]">{title}</h3>
                <p className="text-[15px] leading-relaxed text-[#4B5563]">{body}</p>
              </article>
            ))}
            {FORENSIC_CARDS.slice(3).map(({ Icon: Ic, title, body }, i) => (
              <article
                key={title}
                className={cn(
                  'flex flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_1px_0_rgba(11,19,32,0.06)] lg:col-span-2 lg:p-8',
                  i === 0 && 'lg:col-start-2',
                )}
              >
                <Ic className="mb-4 h-6 w-6 text-[#1E3A8A]" strokeWidth={1.75} aria-hidden />
                <h3 className="mb-3 text-[18px] font-semibold text-[#0B1320]">{title}</h3>
                <p className="text-[15px] leading-relaxed text-[#4B5563]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §29.8 Legal hold */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
                Evidence that survives litigation
              </h2>
              <p className="mb-6 text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">
                When legal proceedings, regulatory investigations, or insurance claims require AI-related evidence, Lens
                provides formal legal hold and structured evidence export capabilities. Held evidence cannot be deleted or
                purged, regardless of retention schedules or account status. When the matter is resolved, hold release requires
                explicit approval and the release itself is recorded.
              </p>
              <LensDetailExpandable label="Legal hold and export detail">
                <p className="mb-4">
                  Lens supports three types of legal hold: case hold (preserving evidence linked to a specific investigation
                  case), tenant hold (preserving all evidence for an entire tenant), and external hold (preserving evidence
                  in response to an external legal or regulatory request).
                </p>
                <p className="mb-4">
                  Every hold includes a matter name, matter reference, reason, scope definition, creation record, approval
                  record, and review date. Creating a hold requires an authorised role. Releasing a hold requires explicit
                  approval from an authorised role, a release reason, and generates a permanent audit event. An MSP cannot
                  unilaterally release a client tenant&apos;s hold.
                </p>
                <p className="mb-4">
                  While a legal hold is active: retention expiry does not purge in-scope data, deletion requests do not purge
                  in-scope data, backups and restore logic respect the hold scope, and export rights follow the standard
                  authorisation model.
                </p>
                <p className="mb-4">
                  For legal proceedings, Lens generates structured eDiscovery packages containing: evidence manifest, scope
                  definition, event records, case records where applicable, verification results, hash manifest,
                  chain-of-custody records, and a human-readable PDF companion. The package is structured for legal review, not
                  as a loose file dump.
                </p>
                <p>
                  For court-ready evidence needs, Lens generates evidence packs with: platform digital signature,
                  chain-of-custody attestation, investigator signature field, verified entry hashes, and evidence scope
                  statement.
                </p>
              </LensDetailExpandable>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] p-8">
                <h3 className="text-[18px] font-semibold text-[#0B1320]">Three hold types</h3>
                <ul className="mt-6 space-y-5">
                  <li>
                    <p className="text-[16px] font-semibold text-[#0B1320]">Case hold</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#4B5563]">
                      Preserves evidence linked to a specific investigation.
                    </p>
                  </li>
                  <li>
                    <p className="text-[16px] font-semibold text-[#0B1320]">Tenant hold</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#4B5563]">
                      Preserves all evidence for an entire organisation.
                    </p>
                  </li>
                  <li>
                    <p className="text-[16px] font-semibold text-[#0B1320]">External hold</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#4B5563]">
                      Preserves evidence for external legal or regulatory proceedings.
                    </p>
                  </li>
                </ul>
                <p className="mt-8 text-[14px] font-medium text-[#1E3A8A]">Hold overrides deletion. Always.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §29.9 Shadow AI */}
      <section className="bg-[#F7F9FC] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="order-2 flex justify-center lg:order-1 lg:col-span-5">
              <LensShadowAiVisual className="w-full max-w-[320px]" />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl lg:text-[2rem]">
                Find the AI your organisation does not know about
              </h2>
              <p className="mb-4 text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">
                Shadow AI is AI tool usage that happens without organisational knowledge or approval. Employees trying new
                AI tools. Teams adopting AI assistants without IT involvement. Developers using AI APIs in side projects. Lens
                discovers and surfaces this usage so your organisation can make informed decisions about what to allow, what
                to govern, and what to block.
              </p>
              <p className="mb-8 text-[15px] font-normal leading-relaxed text-[#4B5563] lg:text-[16px]">
                Lens also maintains an Internal AI Inventory — a register of AI tools and services that your organisation has
                approved, deployed, or is evaluating. Together, shadow AI discovery and internal AI inventory give you a
                complete picture of AI activity across your organisation.
              </p>
              <Link
                href={CONTACT_HREF}
                onClick={() => capturePosthogEvent('lens_shadow_ai_cta_clicked', {})}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-[#1E3A8A] bg-transparent px-6 text-[15px] font-semibold text-[#1E3A8A] transition-colors hover:bg-[#1E3A8A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
              >
                Start a conversation about AI governance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* §29.10 Sovereign AI boundary */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">Your data stays sovereign</h2>
          <p className="text-[17px] font-normal leading-[1.7] text-[#4B5563]">
            Lens uses a sovereign AI architecture. The platform&apos;s internal AI capabilities — classification, forensic
            search assistance, compliance narrative generation — run within a restricted boundary. The sovereign AI is used
            only for narrow, approved APEXLyn functions. It is never exposed as a free-form assistant, never creates a general
            chat surface, and never routes your organisation&apos;s content to external public AI APIs in the data path.
          </p>
          <p className="mt-4 text-[17px] font-normal leading-[1.7] text-[#4B5563]">
            All evidence, reports, audit logs, and governance records are hosted in AWS Sydney. No cross-region replication. No
            offshore processing. Encryption at rest uses AES-256. Encryption in transit uses TLS 1.3. This is enforced at the
            infrastructure level.
          </p>
        </div>
      </section>

      {/* §29.11 Audience cards */}
      <section className="bg-[#0B1320] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-12 text-center text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
            Lens adapts to how your organisation uses AI
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {AUDIENCE_CARDS.map((card) => (
              <article
                key={card.title}
                className="rounded-xl border border-white/10 bg-white/[0.06] p-8 shadow-sm backdrop-blur-sm"
              >
                <h3 className="text-[20px] font-semibold text-white">{card.title}</h3>
                <p className="mt-4 text-[15px] font-normal leading-[1.7] text-white/75">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §29.12 Pricing */}
      <section className="bg-[#F7F9FC] py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
          <h2 className="mb-4 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">Lens pricing</h2>
          <p className="mx-auto mb-8 max-w-[640px] text-[17px] font-normal leading-relaxed text-[#4B5563]">
            Start where your organisation is today. Scale as your AI governance requirements grow.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LENS_PRICING.map((row) => (
              <article
                key={row.tier}
                className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 text-left shadow-[0_1px_0_rgba(11,19,32,0.06)]"
              >
                <h3 className="text-[18px] font-semibold text-[#0B1320]">{row.tier}</h3>
                <p className="mt-2 text-[20px] font-semibold text-[#1E3A8A]">{row.price}</p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#4B5563]">{row.body}</p>
                <Link
                  href={PRICING_HREF}
                  onClick={() => capturePosthogEvent('lens_pricing_card_clicked', { tier: row.tier })}
                  className="mt-6 inline-flex text-[15px] font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
                >
                  See full pricing →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §29.13 Final CTA */}
      <section className="bg-[#0B1320] py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl lg:text-[2.25rem]">
            Start governing AI with evidence, not just policy
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] text-[17px] font-normal leading-relaxed text-white/80">
            Whether employees use AI in browsers, APIs with sensitive data, or internal models processing regulated information
            — Lens gives you visibility, control, and proof.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={CONTACT_HREF}
              onClick={() => capturePosthogEvent('lens_final_cta_clicked', { cta_label: 'Start a conversation' })}
              className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-6 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Start a conversation
            </Link>
            <Link
              href={BASELINE_HREF}
              onClick={() =>
                capturePosthogEvent('lens_final_cta_clicked', { cta_label: 'Request your baseline assessment' })
              }
              className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/50 bg-transparent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1320]"
            >
              Request your baseline assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
