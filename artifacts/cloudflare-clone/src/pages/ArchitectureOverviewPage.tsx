import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { CTA } from '@/lib/apexlyn-cta-routes';
import { ArchitectureSystemOverviewDiagram } from '@/components/architecture/ArchitectureSystemOverviewDiagram';
import { ArchitectureTrustFlowDiagram } from '@/components/architecture/ArchitectureTrustFlowDiagram';

const REVIEW_ARCHITECTURE_HREF = `${CTA.architectureOverview}#architecture-system-overview`;
const REQUEST_DOCUMENTATION_HREF = CTA.requestSecurityDocumentation;

const ARCHITECTURE_PILLARS = [
  {
    title: 'Evidence Integrity',
    body: 'Evidence is structured to preserve operational meaning and historical defensibility over time.',
  },
  {
    title: 'Governance Execution',
    body: 'Ownership, review, and accountability turn policy into operational reality.',
  },
  {
    title: 'Audit-Ready Reporting',
    body: 'Reporting is designed to hold up under scrutiny, not just look clean internally.',
  },
  {
    title: 'Tenant and Partner Boundaries',
    body: 'Built for organisations and partners operating across multiple environments, stakeholders, and trust requirements.',
  },
  {
    title: 'Australian Operating Conditions',
    body: 'Designed for organisations operating under Australian regulatory expectations, data sensitivity, and governance pressure.',
  },
] as const;

export default function ArchitectureOverviewPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <div className="relative overflow-hidden border-b border-white/10 bg-[#0B1320] text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/25 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
        <PageHero
          variant="navy"
          title="Architecture Overview"
          description="APEXLyn is engineered to turn security activity and AI oversight into structured, defensible records designed for scale, scrutiny, and operational clarity."
          className="relative z-[1] border-0 bg-transparent shadow-none"
          contentClassName="relative z-10 py-16 sm:py-20 lg:py-24"
        />
      </div>

      <section
        id="architecture-intro"
        className="scroll-mt-[calc(108px+1rem)] border-b border-slate-200 bg-white py-16 md:py-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-[17px] leading-relaxed text-slate-600 sm:text-[18px]"
          >
            APEXLyn is not built as a collection of loose tools. It is built as infrastructure. That means security
            evidence, AI governance, reporting, verification, and trust are treated as system behavior — not optional
            add-ons.
          </motion.p>
        </div>
      </section>

      <section
        id="architecture-pillars"
        className="scroll-mt-[calc(108px+1rem)] border-b border-slate-200 bg-[#F7F9FC] py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 max-w-4xl md:mb-16"
          >
            <h2 className="text-[1.65rem] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[44px] lg:text-[52px]">
              What APEXLyn Is Designed to Support
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-6">
            {ARCHITECTURE_PILLARS.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={
                  i === 4
                    ? 'relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_20px_50px_-28px_rgba(11,19,32,0.35)] ring-1 ring-slate-900/[0.04] sm:col-span-2 sm:mx-auto sm:max-w-2xl'
                    : 'relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_20px_50px_-28px_rgba(11,19,32,0.35)] ring-1 ring-slate-900/[0.04]'
                }
              >
                <div className="absolute bottom-8 left-0 top-8 w-1 rounded-full bg-[#1E3A8A]" aria-hidden />
                <div className="pl-5">
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] font-sans leading-relaxed text-slate-600 sm:text-[17px]">{pillar.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="architecture-diagrams"
        className="scroll-mt-[calc(108px+1rem)] border-b border-slate-200 bg-white py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10 max-w-3xl md:mb-14"
          >
            <h2 className="text-[1.5rem] font-bold text-slate-900 sm:text-2xl md:text-3xl">Diagrams</h2>
          </motion.div>

          <div className="flex flex-col gap-14 md:gap-16">
            <motion.div
              id="architecture-system-overview"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-[calc(108px+1.5rem)]"
            >
              <h3 className="mb-4 text-base font-bold tracking-tight text-slate-900 sm:text-lg">System overview</h3>
              <ArchitectureSystemOverviewDiagram />
            </motion.div>
            <motion.div
              id="architecture-trust-flow"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-[calc(108px+1.5rem)]"
            >
              <h3 className="mb-4 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Trust, control, and evidence flow
              </h3>
              <ArchitectureTrustFlowDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F7F9FC] py-14 md:py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col flex-wrap items-stretch justify-center gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href={REVIEW_ARCHITECTURE_HREF}
              className="font-sans inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
            >
              Review Our Security Architecture
            </Link>
            <Link
              href={REQUEST_DOCUMENTATION_HREF}
              className="font-sans inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              Request Security Documentation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
