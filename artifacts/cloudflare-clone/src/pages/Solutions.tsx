import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import {
  InnerHeroBackdrop,
  CapabilityTile,
  ElevatedCtaBand,
  SectionGridWash,
} from '@/components/layout/InnerPageChrome';
import { CTA, CONTACT_TOPICS } from '@/lib/apexlyn-cta-routes';

const REQUEST_SERVICE_OVERVIEW_HREF = CTA.contactTopic(CONTACT_TOPICS.services);
const EXPLORE_PLATFORMS_HREF = CTA.platforms;

const SOLUTION_BLOCKS: { title: string; body: string; detailHref: string; detailLabel?: string }[] = [
  {
    title: 'Cyber Security Services',
    body:
      'Targeted uplift and operational hardening designed to reduce real exposure, strengthen control reality, and create more defensible security outcomes.',
    detailHref: '/solutions/cyber-security-services',
  },
  {
    title: 'AI Governance Advisory',
    body:
      'Guidance for organisations adopting AI and needing clear boundaries, safer operating models, and governance that leaders can stand behind.',
    detailHref: '/solutions/ai-governance-advisory',
  },
  {
    title: 'Compliance Operations',
    body:
      'Continuous evidence, structured reporting, and governance-ready support designed to reduce manual assurance effort and improve defensibility over time.',
    detailHref: '/solutions/compliance-operations',
  },
  {
    title: 'Governance and Framework Alignment Support',
    body:
      'Translate frameworks into operational requirements, evidence mapping, governance workflows, and stakeholder-ready reporting.',
    detailHref: CTA.contactTopic(CONTACT_TOPICS.frameworkGuide),
    detailLabel: 'Discuss framework alignment',
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Solutions"
          title="Structured Security and AI Governance Services"
          description="Platform-led delivery that reduces compliance friction, strengthens control reality, and makes governance measurable."
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-[17px] leading-relaxed text-slate-600 sm:text-[18px]"
          >
            APEXLyn combines infrastructure with focused services so organisations can reduce operational risk, improve
            governance, and move forward with stronger evidence and clearer next steps.
          </motion.p>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-16 md:py-24">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {SOLUTION_BLOCKS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col"
              >
                <CapabilityTile index={i + 1} title={section.title} body={section.body} className="flex-1" />
                <div className="mt-3 px-1">
                  <Link
                    href={section.detailHref}
                    className="text-sm font-semibold text-[#1E3A8A] underline-offset-2 hover:underline"
                  >
                    {section.detailLabel ?? 'Service detail'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ElevatedCtaBand>
        <Link
          href={REQUEST_SERVICE_OVERVIEW_HREF}
          className="font-sans inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
        >
          Request Service Overview
        </Link>
        <Link
          href={EXPLORE_PLATFORMS_HREF}
          className="font-sans inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50"
        >
          Explore Our Platforms
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
