import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';
import NotFound from '@/pages/not-found';
import { InnerHeroBackdrop, SectionGridWash, NavySignalBand } from '@/components/layout/InnerPageChrome';

const ASSESS_SECURITY_STATE_HREF = '/test-security-state';
const DISCUSS_REQUIREMENTS_HREF = '/company/contact';

const RISK_LANDSCAPE_TITLE = 'Industry Risk Landscape';

/** Shared hero subheadline (Industries index §7.1) for all industry detail pages. */
const INDUSTRY_HERO_SUBHEADLINE =
  'Evidence-led security and AI governance built for environments where assumptions become liability.';

const PRESSURE_TITLE = 'Governance Pressure';
const PRESSURE_BULLETS = [
  'Regulatory oversight',
  'Insurance requirements',
  'Client data protection expectations',
  'Board reporting expectations',
] as const;

const SUPPORT_TITLE = 'How Apexlyn Supports Your Organisation';

const SUPPORT_BLOCKS = [
  {
    title: 'Apexlyn Track (Security Evidence)',
    body:
      'Continuous evidence capture and framework views that replace manual audits with defensible proof.',
  },
  {
    title: 'Apexlyn Lens (AI Governance)',
    body:
      'AI usage visibility, prompt-level exposure detection, and enforceable policies to prevent sensitive data leakage.',
  },
  {
    title: 'Cyber Security Services (Pulse / Flow / Vault)',
    body: 'Structured uplift and operational hardening to stabilise the environment and keep it stable.',
  },
] as const;

const CAPABILITIES_TITLE = 'Platform Capabilities';
const CAPABILITY_BULLETS = [
  'Continuous evidence tracking',
  'Immutable audit records',
  'AI risk visibility',
  'Role-based governance',
] as const;

const INDUSTRY_COPY: Record<string, { heroH1: string; riskBody: string }> = {
  healthcare: {
    heroH1: 'Security & Governance for Healthcare Providers',
    riskBody:
      'Healthcare environments carry high consequence: sensitive patient information, interconnected systems, third-party dependencies, and operational pressure that leaves little room for manual compliance overhead. APEXLyn helps you prove controls continuously and reduce exposure without disrupting care.',
  },
  legal: {
    heroH1: 'Security & Governance for Legal Practices',
    riskBody:
      'Legal organisations hold high-value confidential information where disclosure risk is existential. APEXLyn is built to create defensible evidence of control reality and to reduce AI-driven exposure of sensitive matters and client data.',
  },
  accounting: {
    heroH1: 'Security & Governance for Accounting Firms',
    riskBody:
      'Accounting firms handle financial records, identity documents, and client platforms — often under seasonal spikes and strict client assurance expectations. APEXLyn replaces manual assurance with continuous evidence and reduces AI exposure risk across teams.',
  },
  insurance: {
    heroH1: 'Security & Governance for Insurance Organisations',
    riskBody:
      'Insurers operate with deep data sensitivity, supply chain exposure, and high scrutiny. APEXLyn helps you standardise defensible governance signals and reduce data exposure risk as AI becomes embedded in operations.',
  },
  'msp-partners': {
    heroH1: 'Evidence-Led Security for MSPs & Partners',
    riskBody:
      'MSPs carry portfolio risk across many client environments. The challenge isn’t only improving security — it’s proving outcomes consistently and efficiently at scale. APEXLyn provides structured evidence and governance designed for multi-tenant delivery.',
  },
  'professional-services': {
    heroH1: 'Security & AI Governance for Professional Services',
    riskBody:
      'Professional services firms run on collaboration and trust across many tools and stakeholders. APEXLyn helps you reduce exposure, prove control reality, and govern AI usage without slowing delivery.',
  },
};

type IndustryPageProps = {
  params: { slug?: string };
};

export default function IndustryPage({ params }: IndustryPageProps) {
  const slug = params?.slug ?? '';
  const industry = INDUSTRY_COPY[slug];

  if (!industry) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col apex-page-bg min-h-[calc(100dvh-108px)]">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title={industry.heroH1}
          description={INDUSTRY_HERO_SUBHEADLINE}
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24 max-w-4xl"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.15)] sm:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1E3A8A]">Context</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{RISK_LANDSCAPE_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{industry.riskBody}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{PRESSURE_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {PRESSURE_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash className="opacity-40" />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]"
          >
            {SUPPORT_TITLE}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SUPPORT_BLOCKS.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-sky-500" />
                <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{CAPABILITIES_TITLE}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {CAPABILITY_BULLETS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-[15px] text-slate-600"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={ASSESS_SECURITY_STATE_HREF}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-[#0B1320] transition-colors bg-white hover:bg-slate-100 font-sans"
        >
          Assess Your Organisation&apos;s Security State
        </Link>
        <Link
          href={DISCUSS_REQUIREMENTS_HREF}
          className="inline-flex items-center justify-center rounded border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 font-sans"
        >
          Discuss Industry Requirements
        </Link>
      </NavySignalBand>
    </div>
  );
}
