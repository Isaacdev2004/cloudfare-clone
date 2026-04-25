import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash, ElevatedCtaBand } from '@/components/layout/InnerPageChrome';
import { Crosshair, Layers } from 'lucide-react';
import { CTA } from '@/lib/apexlyn-cta-routes';

const HERO_BODY =
  'APEXLyn was founded to eliminate manual assurance, modernise governance, and turn operational security and AI usage into defensible evidence. We believe security should be provable, AI should be governable, and reporting should reflect reality — not effort.';

const MISSION_BODY =
  'To operationalise security and AI governance through structured, defensible evidence and infrastructure-grade control.';

const BUILDING_BODY =
  'APEXLyn is building two flagship platforms — one for security evidence infrastructure and one for AI governance and AI risk infrastructure — under one higher standard of trust, clarity, and defensibility.';

export default function AboutApexlynPage() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Company"
          title="About APEXLyn"
          description={HERO_BODY}
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24 max-w-3xl"
        />
      </section>

      <section className="relative overflow-hidden py-12 md:py-16">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[720px] space-y-8 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.2)] sm:p-10"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#1E3A8A]/[0.06] blur-2xl" />
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900/[0.04] ring-1 ring-slate-200">
                <Crosshair className="h-6 w-6 text-[#1E3A8A]" strokeWidth={1.65} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Mission</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-slate-600">{MISSION_BODY}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.2)] sm:p-10"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-500/[0.06] blur-2xl" />
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900/[0.04] ring-1 ring-slate-200">
                <Layers className="h-6 w-6 text-[#1E3A8A]" strokeWidth={1.65} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">What We Are Building</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-slate-600">{BUILDING_BODY}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ElevatedCtaBand>
        <Link
          href={CTA.contact}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] font-sans"
        >
          Start a Strategic Conversation
        </Link>
        <Link
          href={CTA.platforms}
          className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 font-sans"
        >
          Explore Our Platforms
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
