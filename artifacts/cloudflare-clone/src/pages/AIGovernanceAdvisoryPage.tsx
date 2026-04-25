import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop } from '@/components/layout/InnerPageChrome';
import { CTA, CONTACT_TOPICS } from '@/lib/apexlyn-cta-routes';

const DISCUSS_AI_GOVERNANCE_HREF = CTA.contactTopic(CONTACT_TOPICS.aiGovernance);

const KEY_OUTCOMES = [
  'Define acceptable AI usage boundaries',
  'Reduce sensitive-data exposure',
  'Improve AI visibility',
  'Create stronger governance accountability',
  'Support executive and board-level understanding',
] as const;

export default function AIGovernanceAdvisoryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Solutions"
          title="AI Governance That Protects Adoption Without Losing Control"
          description="APEXLyn helps organisations define AI usage boundaries, reduce exposure, and implement governance that can hold up internally."
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
            AI governance is not only about writing policy. It is about visibility, operating boundaries, exposure
            reduction, accountability, and leadership confidence. APEXLyn helps organisations move from uncertainty to
            a more governed operating model.
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
            href={DISCUSS_AI_GOVERNANCE_HREF}
            className="font-sans inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
          >
            Discuss AI Governance
          </Link>
        </div>
      </section>
    </div>
  );
}
