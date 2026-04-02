import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { HeroGaugeVisual } from '@/components/hero/HeroGaugeVisual';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';
import { InnerHeroBackdrop, ElevatedCtaBand, SectionGridWash } from '@/components/layout/InnerPageChrome';

const TEST_EVIDENCE_READINESS_HREF = '/test-security-state';

const HOW_IT_WORKS_STEPS = [
  {
    title: 'Connect Environment',
    body:
      'Establish a verified baseline by connecting identity, device, and security signals.',
  },
  {
    title: 'Automated Evidence Ingestion',
    body: 'Evidence is collected continuously on schedule and on change.',
  },
  {
    title: 'Immutable Ledger Storage',
    body: 'Evidence history is preserved in an append-only model designed for integrity.',
  },
  {
    title: 'Universal Control Mapping',
    body: 'Evidence is normalised into a structured control register.',
  },
  {
    title: 'Framework Views',
    body: 'See status through the lens of Essential Eight / ISO 27001 / NIST views.',
  },
  {
    title: 'Governance & Reporting',
    body: 'Produce audit-ready reporting and structured review workflows.',
  },
] as const;

const FRAMEWORK_BADGES = ['Essential Eight', 'ISO 27001', 'NIST'] as const;

const OUTCOME_BULLETS = [
  'Reduced audit overhead',
  'Continuous control visibility',
  'Executive-ready reporting',
  'Lower operational exposure',
] as const;

export default function TrackPlatformPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="APEXLyn Track"
          title="Connect → Track → Evidence → Govern"
          description="Apexlyn Track automatically collects, records, and governs security control states across your environment — transforming operational activity into audit-ready evidence over time."
          actions={[
            { label: 'Test Your Evidence Readiness', href: TEST_EVIDENCE_READINESS_HREF, variant: 'primary' },
            { label: 'Explore Framework Views', href: '#framework-alignment', variant: 'outline' },
          ]}
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24"
          aside={
            <div className="flex items-center justify-center py-4 lg:py-0">
              <div className="relative w-full max-w-[400px] rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.2)] sm:p-7">
                <HeroGaugeVisual compact />
              </div>
            </div>
          }
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-16 md:py-24">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[900px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 md:mb-14"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1E3A8A]">Operating model</p>
            <h2 className="text-[1.65rem] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[44px]">
              How It Works
            </h2>
          </motion.div>

          <div className="relative">
            <div
              className="absolute left-[22px] top-8 bottom-8 w-px bg-gradient-to-b from-[#1E3A8A] via-[#1E3A8A]/35 to-transparent md:left-[27px]"
              aria-hidden
            />
            <ol className="relative m-0 list-none space-y-5 p-0 md:space-y-6">
              {HOW_IT_WORKS_STEPS.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative flex gap-5 pl-2 md:gap-7 md:pl-0"
                >
                  <div className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1E3A8A] text-sm font-bold text-white shadow-lg shadow-[#1E3A8A]/25 md:h-14 md:w-14 md:text-base">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.14)] md:p-8">
                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">{step.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="framework-alignment"
        className="scroll-mt-[calc(108px+1rem)] border-b border-slate-200 bg-white py-16 md:py-20"
      >
        <div className="mx-auto max-w-[720px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.5rem] font-bold text-slate-900 sm:text-3xl">Framework Alignment</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
              Designed to support alignment with leading frameworks.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {FRAMEWORK_BADGES.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-8 border-l-4 border-[#1E3A8A]/40 pl-4 text-sm leading-relaxed text-slate-500">
              Alignment support does not constitute certification or compliance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white py-16 md:py-20">
        <div className="mx-auto max-w-[720px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.5rem] font-bold text-slate-900 sm:text-3xl">Enterprise Outcomes</h2>
            <ul className="mt-8 space-y-3">
              {OUTCOME_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <ElevatedCtaBand>
        <Link
          href={TEST_EVIDENCE_READINESS_HREF}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
        >
          Test Your Evidence Readiness
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
