import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, GradientTopCard, SectionGridWash } from '@/components/layout/InnerPageChrome';
import { Layers, Radar } from 'lucide-react';

const PLATFORM_CARDS = [
  {
    title: 'APEXLyn Track Platform',
    subtitle: 'Security Evidence Infrastructure',
    body:
      'Continuous control evidence, framework views, and audit-ready reporting — built as a system of record.',
    cta: { label: 'Test Your Evidence Readiness', href: '/platforms/track' },
    gradientClass: 'from-[#1E3A8A] via-sky-500 to-cyan-400',
    Icon: Layers,
  },
  {
    title: 'APEXLyn Lens Platform',
    subtitle: 'AI Governance & AI Risk Infrastructure',
    body:
      'AI usage discovery, prompt-level risk inspection, and policy enforcement to reduce sensitive data exposure.',
    cta: { label: 'Assess Your AI Exposure', href: '/platforms/lens' },
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
          title="Infrastructure for Continuous Security & AI Governance"
          description="APEXLyn delivers two purpose-built platforms designed to transform operational security and AI oversight into structured, defensible systems."
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
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1E3A8A]">Capability map</p>
            <h2 className="text-[1.65rem] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[44px] lg:text-[52px]">
              Two Platforms. Distinct Capabilities.
            </h2>
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
    </div>
  );
}
