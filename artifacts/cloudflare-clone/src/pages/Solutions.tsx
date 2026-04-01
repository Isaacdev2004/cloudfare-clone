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

const REQUEST_SERVICE_OVERVIEW_HREF = '/company/contact';
const EXPLORE_PLATFORMS_HREF = '/platforms';

const SOLUTION_SECTIONS = [
  {
    title: 'Security Evidence Infrastructure (Track-powered)',
    body:
      'Implement continuous evidence capture, control mapping, framework views, and audit-ready reporting cadence — without manual collection.',
  },
  {
    title: 'Operational Security Uplift (Pulse / Flow / Vault)',
    body:
      'Fix what matters first, stabilise the environment, then prevent drift through structured operational hardening.',
  },
  {
    title: 'AI Governance & DLP Advisory (Lens-powered)',
    body:
      'Define AI usage boundaries, implement enforcement, and reduce sensitive data exposure with governance you can defend.',
  },
  {
    title: 'Governance & Framework Alignment Support',
    body:
      'Translate frameworks into operational requirements, evidence mapping, and stakeholder-ready reporting.',
  },
] as const;

export default function Solutions() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Solutions"
          title="Structured Security & AI Governance Services"
          description="Platform-led delivery that removes compliance friction, strengthens control reality, and makes governance measurable."
          actions={[
            { label: 'Request Service Overview', href: REQUEST_SERVICE_OVERVIEW_HREF, variant: 'primary' },
            { label: 'Explore Our Platforms', href: EXPLORE_PLATFORMS_HREF, variant: 'outline' },
          ]}
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
            className="mb-12 max-w-2xl md:mb-16"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1E3A8A]">Delivery model</p>
            <h2 className="text-[1.65rem] font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Four ways we engage
            </h2>
            <p className="mt-3 text-[15px] text-slate-600 sm:text-base">
              Each line maps to platform and service components you can combine as your programme matures.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {SOLUTION_SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <CapabilityTile index={i + 1} title={section.title} body={section.body} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ElevatedCtaBand>
        <Link
          href={REQUEST_SERVICE_OVERVIEW_HREF}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] font-sans"
        >
          Request Service Overview
        </Link>
        <Link
          href={EXPLORE_PLATFORMS_HREF}
          className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 font-sans"
        >
          Explore Our Platforms
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
