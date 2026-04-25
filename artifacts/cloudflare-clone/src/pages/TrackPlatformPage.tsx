import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { HeroGaugeVisual } from '@/components/hero/HeroGaugeVisual';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';
import { InnerHeroBackdrop, SectionGridWash } from '@/components/layout/InnerPageChrome';
import { CTA, PLATFORM_ANCHORS, testYourSecurityStateWithMode } from '@/lib/apexlyn-cta-routes';

const TEST_EVIDENCE_READINESS_HREF = testYourSecurityStateWithMode('track');
const STRATEGIC_CONVERSATION_URL = CTA.contact;

const HOW_TRACK_WORKS: { title: string; body: string }[] = [
  {
    title: 'Connect the environment',
    body: 'Establish a verified baseline by connecting identity, device, and security signals.',
  },
  {
    title: 'Capture evidence continuously',
    body: 'Evidence is collected on schedule and through ongoing operational change.',
  },
  {
    title: 'Preserve defensible history',
    body: 'Evidence is recorded in a structured model designed for integrity and traceability.',
  },
  {
    title: 'Normalise into control views',
    body: 'Operational signals are translated into clearer control and governance views.',
  },
  {
    title: 'Support framework alignment',
    body: 'See status through structured views such as Essential Eight, ISO 27001, and NIST support models.',
  },
  {
    title: 'Strengthen governance and reporting',
    body: 'Use the result for review workflows, reporting cadence, and clearer operational accountability.',
  },
];

const FRAMEWORK_BADGES = ['Essential Eight', 'ISO 27001', 'NIST'] as const;

const WHY_TRACK_BULLETS = [
  'Reduce audit overhead',
  'Replace fragmented evidence collection',
  'Increase continuous control visibility',
  'Improve leadership reporting quality',
  'Create stronger governance continuity',
  'Make security reality referenceable under scrutiny',
] as const;

export default function TrackPlatformPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="APEXLyn Track — Security Evidence Infrastructure"
          title="Connect → Track → Evidence → Govern"
          description="APEXLyn Track continuously captures control reality, structures it into defensible records, and turns operational security into reporting and governance that leaders can trust."
          actions={[
            { label: 'Test Your Evidence Readiness', href: TEST_EVIDENCE_READINESS_HREF, variant: 'primary' },
            { label: 'Explore Framework Views', href: PLATFORM_ANCHORS.trackFrameworkAlignment, variant: 'outline' },
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

      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 md:py-24">
        <div className="relative z-[1] mx-auto max-w-[900px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="md:mb-0"
          >
            <h2 className="text-[1.65rem] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[44px]">
              What Track Does
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">
              APEXLyn Track is built for organisations that need more than screenshots, spreadsheets, and audit scramble. It
              creates a structured system of record for operational security by continuously capturing evidence, preserving
              history, and making governance and reporting more defensible over time.
            </p>
          </motion.div>
        </div>
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
            <h2 className="text-[1.65rem] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[44px]">
              How Track Works
            </h2>
          </motion.div>

          <div className="relative">
            <div
              className="absolute left-[22px] top-8 bottom-8 w-px bg-gradient-to-b from-[#1E3A8A] via-[#1E3A8A]/35 to-transparent md:left-[27px]"
              aria-hidden
            />
            <ol className="relative m-0 list-none space-y-5 p-0 md:space-y-6">
              {HOW_TRACK_WORKS.map((step, i) => (
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

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white py-16 md:py-20">
        <div className="mx-auto max-w-[720px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.5rem] font-bold text-slate-900 sm:text-3xl">Why Organisations Choose Track</h2>
            <ul className="mt-8 space-y-3">
              {WHY_TRACK_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section
        id="framework-alignment"
        className="scroll-mt-[calc(108px+1rem)] border-b border-slate-200 bg-white py-16 md:py-20"
      >
        <div className="mx-auto max-w-[720px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.5rem] font-bold text-slate-900 sm:text-3xl">Framework-Aligned by Design</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
              Track is designed to support organisations working toward stronger framework alignment by making evidence
              capture, control views, and reporting more structured over time.
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

      <section className="border-t border-[#0B1320]/10 bg-[#F7F9FC] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.65rem] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[40px]">
              Turn Security Activity Into Defensible Evidence
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">
              Start with a baseline and see where control reality, evidence readiness, and governance gaps need attention
              first.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={TEST_EVIDENCE_READINESS_HREF}
                className="inline-flex items-center justify-center gap-2 rounded px-6 py-3.5 text-base font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
              >
                Test Your Evidence Readiness
              </Link>
              <Link
                href={STRATEGIC_CONVERSATION_URL}
                className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50"
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
