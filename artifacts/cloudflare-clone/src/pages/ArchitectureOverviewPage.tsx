import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';

const REVIEW_ARCHITECTURE_HREF = '/platforms/architecture';
const REQUEST_DOCUMENTATION_HREF = '/trust-center/request-documentation';

const ARCHITECTURE_PILLARS = [
  {
    title: 'Evidence Integrity',
    body: 'Evidence is captured as structured events and preserved as defensible history.',
  },
  {
    title: 'Governance Execution',
    body: 'Ownership, approvals, and exceptions turn policy into operational reality.',
  },
  {
    title: 'Audit-Ready Reporting',
    body: 'Reporting is designed for external verification, not internal optimism.',
  },
  {
    title: 'Tenant Boundaries',
    body: 'Built for organisations and partners managing multiple environments and stakeholders.',
  },
] as const;

export default function ArchitectureOverviewPage() {
  return (
    <div className="flex flex-col apex-page-bg min-h-[calc(100dvh-108px)]">
      <div className="relative bg-[#0B1320] border-b border-white/10 overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-60" />
        <PageHero
          variant="navy"
          title="Architecture Overview"
          description="APEXLyn is engineered to turn security activity and AI oversight into structured, defensible records — designed for scale, scrutiny, and clarity."
          className="relative z-[1] bg-transparent border-0 shadow-none"
          contentClassName="relative z-10 py-16 sm:py-20 lg:py-24"
        />
      </div>

      <section
        id="architecture-pillars"
        className="py-16 md:py-24 bg-[#F7F9FC] border-b border-slate-200 scroll-mt-[calc(108px+1rem)]"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mb-12 md:mb-16"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans">
              What APEXLyn Is Built To Guarantee
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {ARCHITECTURE_PILLARS.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_20px_50px_-28px_rgba(11,19,32,0.35)] ring-1 ring-slate-900/[0.04]"
              >
                <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-[#1E3A8A]" aria-hidden />
                <div className="pl-5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans tracking-tight mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-[15px] sm:text-[17px] leading-relaxed font-sans">
                    {pillar.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-4"
          >
            <Link
              href={REVIEW_ARCHITECTURE_HREF}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded text-[15px] font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors font-sans"
            >
              Review Our Security Architecture
            </Link>
            <Link
              href={REQUEST_DOCUMENTATION_HREF}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded text-[15px] font-semibold text-slate-800 border border-slate-300 bg-white hover:bg-slate-50 transition-colors font-sans"
            >
              Request Security Documentation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
