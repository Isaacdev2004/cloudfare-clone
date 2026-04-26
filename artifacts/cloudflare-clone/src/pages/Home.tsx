import React from 'react';
import { motion } from 'framer-motion';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { HeroFrameworkOrbitVisual } from '@/components/hero/HeroFrameworkOrbitVisual';
import { HeroGaugeVisual } from '@/components/hero/HeroGaugeVisual';
import { Marquee } from '@/components/Marquee';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';
import { brandLogos } from '@/lib/assets';
import { fadeInUp } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';
import { CTA, CONTACT_TOPICS, testYourSecurityStateWithMode } from '@/lib/apexlyn-cta-routes';

const TEST_SECURITY_STATE_URL = CTA.testYourSecurityState;
const REQUEST_SERVICE_OVERVIEW_URL = CTA.contactTopic(CONTACT_TOPICS.services);
const STRATEGIC_CONVERSATION_URL = CTA.contact;
const DISCUSS_AI_GOV_URL = CTA.contactTopic(CONTACT_TOPICS.aiGovernance);

const HERO_VALUE_POINTS = [
  'Replace audit scramble with continuous, defensible proof.',
  'Make control reality visible — not assumed.',
  'Reduce sensitive data exposure through AI before it becomes an incident.',
  'Give leaders reporting they can stand behind.',
  'Scale governance across teams, tenants, and environments.',
];

const PROOF_STRIP_TITLE = 'Built for Serious Operating Environments';
const PROOF_STRIP_ITEMS = [
  'Australian infrastructure posture',
  'Evidence-led architecture',
  'AI governance and security evidence in one company',
  'Built for SMB, enterprise, and MSP environments',
  'Security documentation available on request',
] as const;

const SERVICE_OFFERINGS: {
  title: 'Cyber Security Services' | 'AI Governance Advisory' | 'Compliance Operations';
  body: string;
  ctaLabel: string;
  href: string;
}[] = [
  {
    title: 'Cyber Security Services',
    body:
      'Targeted uplift and operational hardening designed to reduce real exposure, strengthen control reality, and create more defensible security outcomes.',
    ctaLabel: 'Request Service Overview',
    href: REQUEST_SERVICE_OVERVIEW_URL,
  },
  {
    title: 'AI Governance Advisory',
    body:
      'Guidance for organisations adopting AI and needing clear boundaries, safer operating models, and governance that leaders can stand behind.',
    ctaLabel: 'Discuss AI Governance',
    href: DISCUSS_AI_GOV_URL,
  },
  {
    title: 'Compliance Operations',
    body:
      'Continuous evidence, structured reporting, and governance-ready support designed to reduce manual assurance effort and improve defensibility over time.',
    ctaLabel: 'Explore Compliance Support',
    href: '/solutions/compliance-operations',
  },
];

const ENGINEERED_INFRA_BULLETS = [
  'Role-based access control',
  'Structured audit visibility',
  'Evidence integrity focus',
  'Governance-aware workflows',
  'Tenant and partner boundary clarity',
  'Privacy-respectful data handling',
] as const;

const WHAT_APEXLYN_IS_NOT = [
  'A chatbot',
  'A general AI assistant',
  'A browser extension only',
  'A dashboard only',
  'A DLP engine only',
  'A generic security omnibus tool',
  'A general SASE replacement',
  'A compliance checklist app',
  'A consultancy-only business with no real platform',
] as const;

const BUYER_PATH: { title: string; body: string; cta: string; href: string }[] = [
  {
    title: 'I Need Stronger Security Evidence',
    body:
      'For organisations that need continuous control visibility, audit-ready evidence, and reporting leaders can defend.',
    cta: 'Explore Track',
    href: '/platforms/track',
  },
  {
    title: 'I Need AI Governance and AI Exposure Control',
    body:
      'For organisations that need visibility into AI use, prompt-level risk inspection, and enforceable safeguards around sensitive information.',
    cta: 'Explore Lens',
    href: '/platforms/lens',
  },
  {
    title: 'I Operate Under Higher Scrutiny',
    body:
      'For regulated, insurer-sensitive, or governance-heavy environments that need stronger trust, stronger evidence, and stronger control clarity.',
    cta: 'Review Our Architecture',
    href: CTA.architectureOverview,
  },
  {
    title: 'I Manage Multiple Client Environments',
    body:
      'For MSPs and partners that need multi-tenant visibility, evidence-led delivery, and portfolio-level governance at scale.',
    cta: 'Explore MSP / Partner Support',
    href: '/industries/msp-partners',
  },
  {
    title: 'I Need a Combined Baseline',
    body:
      'For organisations that want one starting point across security evidence readiness and AI exposure risk.',
    cta: 'Test Your Security State',
    href: TEST_SECURITY_STATE_URL,
  },
];

const HOW_IT_WORKS: { body: string }[] = [
  { body: 'Connect the relevant environment, toolset, or workflow.' },
  { body: 'Capture signals, activity, and operational evidence continuously.' },
  { body: 'Apply visibility, policy, and governance logic where it matters.' },
  { body: 'Structure outcomes into records leaders, operators, and reviewers can trust.' },
  { body: 'Use the result for reporting, governance, investigation, and operational improvement.' },
];

const PLATFORM_OVERVIEW = {
  title: 'Two Platforms. Distinct Capabilities. Shared Trust Foundation.',
  intro:
    'APEXLyn delivers two purpose-built platforms designed to strengthen operational security, govern AI usage, and turn activity into structured, defensible records.',
} as const;

const PLATFORM_ROWS = [
  {
    title: 'APEXLyn Track Platform',
    subtitle: 'Security Evidence Infrastructure',
    accent: 'navy' as const,
    body:
      'APEXLyn Track continuously captures control reality, structures evidence over time, and turns operational security into defensible reporting, governance, and verification.',
    bullets: [
      'Automated evidence ingestion',
      'Structured control visibility',
      'Framework-aligned evidence views',
      'Governance and reporting workflows',
      'Defensible evidence history',
    ],
    cta: { label: 'Test Your Evidence Readiness', href: testYourSecurityStateWithMode('track') },
    related: [] as { label: string; href: string }[],
    visual: 'gauge' as const,
  },
  {
    title: 'APEXLyn Lens Platform',
    subtitle: 'AI Governance & AI Risk Infrastructure',
    accent: 'lens' as const,
    body:
      'APEXLyn Lens provides AI usage visibility, prompt-level risk inspection, sensitive-data exposure control, and enforceable governance across users, teams, and environments.',
    bullets: [
      'AI tool visibility',
      'Prompt and response risk inspection',
      'Sensitive data leakage reduction',
      'AI policy enforcement',
      'Governance-grade exposure reporting',
    ],
    cta: { label: 'Assess Your AI Exposure', href: testYourSecurityStateWithMode('lens') },
    related: [] as { label: string; href: string }[],
    visual: 'globe' as const,
  },
];

const connectivityLinkClass =
  'font-sans text-[15px] font-medium text-[#1E3A8A] underline underline-offset-[5px] decoration-slate-300 hover:text-[#172554] hover:decoration-[#1E3A8A] antialiased transition-colors';

export default function Home() {
  return (
    <div className="flex flex-col apex-page-bg">
      <PageHero
        variant="light"
        layout="home"
        title="The Evidence-Led Security & AI Governance Infrastructure."
        description="Prove security reality continuously. Govern AI use safely. Replace assumptions, screenshots, and fragmented tooling with defensible evidence and enforceable oversight."
        eyebrow="WHERE SECURITY BECOMES EVIDENCE"
        valuePoints={HERO_VALUE_POINTS}
        primaryMicrocopy="Guided entry • Defensible baseline signal • Clear next steps"
        positioningParagraph="APEXLyn builds security and AI governance as infrastructure — not manual process, not fragmented tooling, and not assumption-driven reporting. We help organisations understand what is protected, what is drifting, what is exposed, and what can be defended under scrutiny."
        actions={[
          { label: 'Test Your Security State', href: TEST_SECURITY_STATE_URL, variant: 'primary' },
          { label: 'Explore Our Platforms', href: CTA.platforms, variant: 'outline' },
        ]}
        className="min-h-[100dvh] lg:min-h-screen flex items-center bg-white border-b border-[#0B1320]/10"
        contentClassName="relative z-10 w-full"
        aside={(
          <div className="relative min-w-0 w-full overflow-visible h-[min(54vh,460px)] sm:h-[500px] lg:h-[640px] flex items-center justify-center px-1 sm:px-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center overflow-visible"
            >
              <HeroFrameworkOrbitVisual />
            </motion.div>
          </div>
        )}
      />

      {/* §6.7 — Proof strip: one horizontal row */}
      <section className="apex-section-light apex-frame-y border-[#0B1320]/10">
        <div className="max-w-[1280px] mx-auto px-6 py-8 md:py-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500 font-sans mb-6 md:mb-8 text-center sm:text-left">
            {PROOF_STRIP_TITLE}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-4">
            {PROOF_STRIP_ITEMS.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-slate-700 text-[15px] sm:text-[16px] leading-snug font-sans"
              >
                <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 bg-white apex-frame-t border-[#0B1320]/8">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Leading companies rely on Apexlyn
        </p>
        <Marquee>
          {brandLogos.map((logo) => (
            <div key={logo.name} className="h-11 w-[180px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200">
              <img src={logo.src} alt={logo.name} className="max-h-11 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* Platforms — two equal cards (§6.7) */}
      <section id="our-platforms" className="py-16 md:py-24 bg-[#F7F9FC] border-t border-[#0B1320]/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mb-12 md:mb-14"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans">
              {PLATFORM_OVERVIEW.title}
            </h2>
            <p className="mt-5 text-slate-600 text-[17px] sm:text-[18px] leading-relaxed font-sans max-w-3xl">
              {PLATFORM_OVERVIEW.intro}
            </p>
          </motion.div>

          <div className="mx-auto flex max-w-3xl flex-col gap-8 lg:gap-10">
            {PLATFORM_ROWS.map((row) => (
              <motion.article
                key={row.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex flex-col h-full min-h-0 rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(11,19,32,0.06)] overflow-hidden"
              >
                <div className="relative h-[min(44vw,300px)] sm:h-[300px] lg:h-[320px] border-b border-slate-200/80 bg-[#F7F9FC] flex items-center justify-center p-4">
                  {row.visual === 'gauge' ? (
                    <div className="relative flex h-full w-full min-h-[220px] items-center justify-center">
                      <HeroGaugeVisual compact />
                    </div>
                  ) : (
                    <div className="relative flex h-full w-full min-h-[220px] items-center justify-center">
                      <HeroCloudNetworkVisual compact />
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <p
                    className={
                      row.accent === 'lens'
                        ? 'text-xs font-semibold uppercase tracking-widest text-[#1E90FF] mb-2 font-sans'
                        : 'text-xs font-semibold uppercase tracking-widest text-[#1E3A8A] mb-2 font-sans'
                    }
                  >
                    {row.subtitle}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 leading-[1.12] tracking-[-0.02em] font-sans">
                    {row.title}
                  </h3>
                  <p className="text-slate-600 text-[16px] sm:text-[17px] leading-relaxed mb-5 font-sans flex-1">
                    {row.body}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {row.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-slate-600 text-[15px] sm:text-[16px] leading-snug font-sans">
                        <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link
                      href={row.cta.href}
                      className="font-sans inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
                    >
                      {row.cta.label}
                    </Link>
                  </div>
                  {row.related.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-slate-200/80">
                      <p className="text-sm font-semibold text-slate-900 mb-3 font-sans">Related</p>
                      <div className="flex flex-wrap gap-6">
                        {row.related.map((item) => (
                          <Link key={item.label} href={item.href} className={connectivityLinkClass}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer path — 3 + 2 (§6.7) */}
      <section className="py-16 md:py-24 bg-white border-t border-[#0B1320]/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mb-10 md:mb-12"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans">
              Choose the Path That Matches Your Environment
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-6">
            {BUYER_PATH.slice(0, 3).map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="md:col-span-2 flex flex-col rounded-xl border border-slate-200/90 bg-[#F7F9FC] p-6 sm:p-7"
              >
                <h3 className="text-lg font-bold text-slate-900 font-sans mb-2">{card.title}</h3>
                <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed font-sans flex-1 mb-5">{card.body}</p>
                <Link
                  href={card.href}
                  className="mt-auto font-sans inline-flex w-fit items-center text-sm font-semibold text-[#1E3A8A] underline-offset-2 hover:underline"
                >
                  {card.cta}
                </Link>
              </motion.div>
            ))}
            {BUYER_PATH.slice(3, 5).map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (3 + i) * 0.04, duration: 0.4 }}
                className="md:col-span-3 flex flex-col rounded-xl border border-slate-200/90 bg-[#F7F9FC] p-6 sm:p-7"
              >
                <h3 className="text-lg font-bold text-slate-900 font-sans mb-2">{card.title}</h3>
                <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed font-sans flex-1 mb-5">{card.body}</p>
                <Link
                  href={card.href}
                  className="mt-auto font-sans inline-flex w-fit items-center text-sm font-semibold text-[#1E3A8A] underline-offset-2 hover:underline"
                >
                  {card.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — vertical steps (§6.7) */}
      <section className="py-16 md:py-24 bg-[#F7F9FC] border-t border-[#0B1320]/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mb-10 md:mb-12"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans">
              How APEXLyn Works
            </h2>
            <p className="mt-4 text-slate-600 text-[17px] sm:text-[18px] leading-relaxed font-sans">
              APEXLyn helps organisations move from fragmented activity to structured control, evidence, and governance.
            </p>
          </motion.div>

          <ol className="max-w-3xl list-none p-0 m-0 space-y-0" role="list">
            {HOW_IT_WORKS.map((step, index) => {
              const isLast = index === HOW_IT_WORKS.length - 1;
              return (
                <li key={index} className="flex gap-4 md:gap-5">
                  <div className="flex w-8 shrink-0 flex-col items-center md:w-9" aria-hidden>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0B1320] bg-white text-[11px] font-bold text-[#0B1320] font-sans md:h-8 md:w-8 md:text-xs">
                      {index + 1}
                    </span>
                    {!isLast ? (
                      <span className="mt-1 w-px min-h-[1.5rem] flex-1 grow bg-[#0B1320]/15 md:min-h-[1.75rem]" />
                    ) : null}
                  </div>
                  <p
                    className={
                      isLast
                        ? 'text-slate-600 text-[15px] sm:text-[16px] leading-relaxed font-sans pb-0'
                        : 'text-slate-600 text-[15px] sm:text-[16px] leading-relaxed font-sans pb-8 md:pb-10'
                    }
                  >
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Solutions — three cards */}
      <section
        id="solutions"
        className="py-16 md:py-24 bg-white border-t border-[#0B1320]/8"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mb-12 md:mb-16"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans mb-5">
              Platform-Led Security and Governance Services
            </h2>
            <p className="text-slate-600 text-[17px] sm:text-[18px] leading-relaxed font-sans max-w-4xl">
              APEXLyn combines product infrastructure with focused delivery support so organisations can reduce
              operational risk, improve governance, and move forward with stronger evidence and clearer next steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {SERVICE_OFFERINGS.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="rounded-xl border border-slate-200/90 bg-[#F7F9FC] p-7 sm:p-8 flex flex-col h-full"
              >
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mb-3">{col.title}</h3>
                <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed font-sans flex-1 mb-6">{col.body}</p>
                <div className="mt-auto">
                  <Link
                    href={col.href}
                    className="font-sans inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
                  >
                    {col.ctaLabel}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience — wide text (§6.7) */}
      <section className="py-16 md:py-24 bg-[#F7F9FC] border-t border-[#0B1320]/8">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans mb-6 md:mb-8">
              Designed for Organisations That Cannot Afford Assumptions
            </h2>
            <p className="text-slate-600 text-[17px] sm:text-[18px] leading-relaxed font-sans">
              From healthcare providers to legal practices, from accounting firms to insurers, from growing businesses to
              partner-led delivery environments — APEXLyn is built for organisations that need control reality, AI
              governance, and evidence they can defend.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust — two columns (§6.7) */}
      <section className="py-16 md:py-24 bg-white border-t border-[#0B1320]/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-[1.65rem] sm:text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1] tracking-[-0.02em] font-sans mb-8">
                Engineered for Defensible Infrastructure
              </h2>
              <ul className="space-y-3 mb-8">
                {ENGINEERED_INFRA_BULLETS.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-600 text-[15px] sm:text-[16px] leading-snug font-sans">
                    <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-700 text-[16px] sm:text-[17px] leading-relaxed font-sans border-l-4 border-[#1E3A8A] pl-5 py-1">
                Built to produce records that can be referenced — not just screenshots that can be debated.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-[1.35rem] sm:text-2xl font-bold tracking-tight text-slate-900 font-sans mb-3">
                What APEXLyn is not
              </h2>
              <p className="mb-6 font-sans text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
                APEXLyn is evidence-led infrastructure — not a lightweight point product. The public site does not position it as:
              </p>
              <ul className="space-y-2.5">
                {WHAT_APEXLYN_IS_NOT.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 font-sans text-[15px] leading-snug text-slate-700 sm:text-[16px]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA — centered, minimal decoration (§6) */}
      <section className="py-20 md:py-28 bg-[#F7F9FC] border-t border-[#0B1320]/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-slate-900 mb-6 leading-[1.1] tracking-[-0.02em] font-sans">
              Security Without Assumptions. Governance Without Blind Spots.
            </h2>
            <p className="text-slate-600 text-[17px] sm:text-[18px] leading-relaxed font-sans mb-10 max-w-2xl mx-auto">
              Start with a baseline. Understand what matters first. Move forward with clearer evidence, clearer
              governance, and clearer next steps.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={TEST_SECURITY_STATE_URL}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
              >
                Test Your Security State
              </Link>
              <Link
                href={STRATEGIC_CONVERSATION_URL}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-slate-800 border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
              >
                Start a Strategic Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
