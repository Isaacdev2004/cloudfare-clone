import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { InnerHeroBackdrop, SectionGridWash } from '@/components/layout/InnerPageChrome';

const ACCENTS = [
  'from-[#1E3A8A]/20 to-transparent',
  'from-violet-500/15 to-transparent',
  'from-sky-500/15 to-transparent',
  'from-indigo-600/15 to-transparent',
  'from-emerald-600/12 to-transparent',
  'from-slate-600/12 to-transparent',
] as const;

const INDUSTRY_LINKS = [
  {
    href: '/industries/healthcare',
    label: 'Healthcare',
    desc: 'Security and compliance for care delivery',
  },
  {
    href: '/industries/legal',
    label: 'Legal',
    desc: 'Protect matter data and client trust',
  },
  {
    href: '/industries/accounting',
    label: 'Accounting',
    desc: 'Safeguard financial and client records',
  },
  {
    href: '/industries/insurance',
    label: 'Insurance',
    desc: 'Resilience for policyholder data',
  },
  {
    href: '/industries/msp-partners',
    label: 'MSP / Partners',
    desc: 'Scale security services for customers',
  },
  {
    href: '/industries/professional-services',
    label: 'Professional Services',
    desc: 'Confidentiality across client work',
  },
] as const;

export default function IndustriesIndexPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title="Designed for Organisations Operating Under Heightened Data Sensitivity and Oversight"
          description="Evidence-led security and AI governance built for environments where assumptions become liability."
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-16 md:py-24">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-lg font-semibold text-slate-900">Sectors</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Select a vertical to see how APEXLyn maps evidence, AI governance, and services to your operating context.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_LINKS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={item.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1E3A8A]/25 hover:shadow-[0_28px_60px_-28px_rgba(30,58,138,0.15)] sm:p-7"
                >
                  <div
                    className={cn(
                      'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90',
                      ACCENTS[i % ACCENTS.length],
                    )}
                  />
                  <div className="relative">
                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-[#1E3A8A]">
                      {item.label}
                    </h3>
                    <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-600">{item.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A]">
                      View industry <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
