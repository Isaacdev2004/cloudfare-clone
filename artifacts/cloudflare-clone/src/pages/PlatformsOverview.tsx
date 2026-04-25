import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, GradientTopCard, SectionGridWash } from '@/components/layout/InnerPageChrome';
import { Layers, Radar } from 'lucide-react';
import { CTA, testYourSecurityStateWithMode } from '@/lib/apexlyn-cta-routes';

const TEST_SECURITY_STATE_URL = CTA.testYourSecurityState;
const STRATEGIC_CONVERSATION_URL = CTA.contact;

const PLATFORM_CARDS = [
  {
    title: 'APEXLyn Track Platform',
    subtitle: 'Security Evidence Infrastructure',
    body:
      'Continuously capture control reality, structure defensible evidence, support governance workflows, and produce reporting that stands up under scrutiny.',
    cta: { label: 'Test Your Evidence Readiness', href: testYourSecurityStateWithMode('track') },
    gradientClass: 'from-[#1E3A8A] via-sky-500 to-cyan-400',
    Icon: Layers,
  },
  {
    title: 'APEXLyn Lens Platform',
    subtitle: 'AI Governance & AI Risk Infrastructure',
    body:
      'Gain visibility into AI usage, inspect prompt and response risk, reduce sensitive-data exposure, and enforce structured governance at scale.',
    cta: { label: 'Assess Your AI Exposure', href: testYourSecurityStateWithMode('lens') },
    gradientClass: 'from-violet-600 via-indigo-600 to-[#1E3A8A]',
    Icon: Radar,
  },
] as const;

export default function PlatformsOverview() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Platforms"
          title="Infrastructure for Continuous Security and AI Governance"
          description="APEXLyn delivers two flagship platforms designed to transform operational security and AI oversight into structured, defensible systems."
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 md:py-24">
        <SectionGridWash className="opacity-25" />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 max-w-3xl md:mb-16"
          >
            <h2 className="text-[1.65rem] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[44px] lg:text-[52px]">
              Two Platforms. Equal Importance. Distinct Outcomes.
            </h2>
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">
              Track and Lens solve different problems, serve different entry points, and create stronger results together.
              One proves security reality through evidence. The other governs AI usage and reduces AI-driven exposure in
              real environments.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {PLATFORM_CARDS.map((card, i) => {
              const Icon = card.Icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GradientTopCard gradientClass={card.gradientClass}>
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/[0.04] ring-1 ring-slate-200/80">
                        <Icon className="h-6 w-6 text-[#1E3A8A]" strokeWidth={1.75} />
                      </div>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">{card.subtitle}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{card.title}</h3>
                    <p className="mt-4 flex-grow text-[17px] leading-relaxed text-slate-600">{card.body}</p>
                    <Link
                      href={card.cta.href}
                      className="mt-8 inline-flex w-full items-center justify-center rounded px-5 py-3 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] sm:w-auto"
                    >
                      {card.cta.label}
                    </Link>
                  </GradientTopCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#0B1320]/10 bg-[#F7F9FC] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.65rem] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[40px]">
              One Company. Two Platforms. One Higher Standard of Trust.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">
              Whether your first priority is security evidence or AI governance, APEXLyn is designed to make operational
              truth visible, defensible, and easier to act on.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={TEST_SECURITY_STATE_URL}
                className="inline-flex items-center justify-center gap-2 rounded px-6 py-3.5 text-base font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
              >
                Test Your Security State
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
