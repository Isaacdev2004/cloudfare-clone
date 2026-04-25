import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop } from '@/components/layout/InnerPageChrome';
import { CTA, CONTACT_TOPICS } from '@/lib/apexlyn-cta-routes';

const REQUEST_SERVICE_OVERVIEW_HREF = CTA.contactTopic(CONTACT_TOPICS.services);

const KEY_OUTCOMES = [
  'Reduce real operational exposure',
  'Stabilise control reality',
  'Improve governance discipline',
  'Support clearer evidence outcomes',
  'Create stronger reporting readiness',
] as const;

export default function CyberSecurityServicesPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Solutions"
          title="Structured Security Uplift for Environments That Need Clarity, Control, and Continuity"
          description="APEXLyn helps organisations reduce real exposure, strengthen operational discipline, and build a more defensible security posture over time."
          className="relative z-[1] border-0 bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="border-b border-slate-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-[17px] leading-relaxed text-slate-600 sm:text-[18px]"
          >
            These services are designed for organisations that need more than reactive fixes. We support environments
            that need targeted uplift, stronger control execution, and better operational visibility without creating more
            manual overhead.
          </motion.p>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Key Outcomes</h2>
            <ul className="mt-6 space-y-3">
              {KEY_OUTCOMES.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[#0B1320]/8 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center sm:text-left">
          <Link
            href={REQUEST_SERVICE_OVERVIEW_HREF}
            className="font-sans inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
          >
            Request Service Overview
          </Link>
        </div>
      </section>
    </div>
  );
}
