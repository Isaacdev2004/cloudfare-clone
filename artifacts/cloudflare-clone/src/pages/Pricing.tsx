import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash, ElevatedCtaBand } from '@/components/layout/InnerPageChrome';
import { type PackageTier } from '@/lib/apexlyn-naming';
import { CTA, CONTACT_TOPICS } from '@/lib/apexlyn-cta-routes';
import { cn } from '@/lib/utils';

const CONTACT_PRICING_HREF = CTA.contactTopic(CONTACT_TOPICS.pricing);
const CONTACT_ENTERPRISE_PARTNER_HREF = CTA.contactTopic(CONTACT_TOPICS.enterprisePartnerPricing);

const HERO_SUBHEAD =
  'APEXLyn packages are designed to support growing businesses, regulated environments, enterprise operating models, and partner-led delivery.';

const HERO_MICROCOPY =
  'We will map the right package to your environment, trust requirements, and operating model.';

const INTRO_BODY =
  'APEXLyn pricing is structured around environment type, governance depth, deployment fit, and operational complexity. The right package depends on what you need to govern, prove, protect, and scale.';

const PUBLIC_MODEL: { tier: PackageTier; body: string }[] = [
  { tier: 'Core', body: 'Establish visibility, baseline control, and a credible starting point.' },
  { tier: 'Control', body: 'Strengthen live governance and reduce real operational exposure.' },
  { tier: 'Assurance', body: 'Support defensible evidence, structured reporting, and stronger accountability.' },
  { tier: 'Sovereign', body: 'Designed for higher-assurance, more sensitive, or more demanding operating environments.' },
  { tier: 'Partner', body: 'Built for MSP and portfolio delivery across multiple client environments.' },
];

const TRACK_PACKAGES: { name: string; body: string }[] = [
  { name: 'Track Core', body: 'Establish evidence visibility and a stronger baseline for control reality.' },
  { name: 'Track Control', body: 'Strengthen operational evidence capture, visibility, and governance structure.' },
  { name: 'Track Assurance', body: 'Support governance-grade reporting and more defensible evidence continuity.' },
  { name: 'Track Sovereign', body: 'Designed for higher-assurance evidence, trust, and operating requirements.' },
  { name: 'Track Partner', body: 'Deliver evidence-led security across client portfolios with greater consistency and visibility.' },
];

const LENS_PACKAGES: { name: string; body: string }[] = [
  { name: 'Lens Core', body: 'Gain AI usage visibility and establish safer baseline governance.' },
  { name: 'Lens Control', body: 'Inspect AI-related risk and reduce sensitive-data exposure in live environments.' },
  { name: 'Lens Assurance', body: 'Support stronger AI governance, reporting, and accountability.' },
  { name: 'Lens Sovereign', body: 'Designed for more sensitive, higher-trust, and higher-assurance AI operating conditions.' },
  { name: 'Lens Partner', body: 'Govern AI exposure across multiple client environments through a partner-ready model.' },
];

const ENTERPRISE_SECTION_BODY =
  'For enterprise, partner, sovereign, and more complex operating environments, pricing follows the required governance depth, deployment model, support profile, and commercial structure.';

const TIER_ACCENT: Record<PackageTier, string> = {
  Core: 'from-sky-500/20 to-cyan-500/5',
  Control: 'from-emerald-500/20 to-teal-500/5',
  Assurance: 'from-violet-500/20 to-indigo-500/5',
  Sovereign: 'from-slate-600/20 to-slate-900/10',
  Partner: 'from-amber-500/20 to-orange-500/5',
};

export default function Pricing() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Commercial"
          title="Packages Aligned to Organisational Scale and Operating Complexity"
          description={HERO_SUBHEAD}
          actions={[{ label: 'Request Pricing Details', href: CONTACT_PRICING_HREF, variant: 'primary' }]}
          primaryMicrocopy={HERO_MICROCOPY}
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24 max-w-3xl"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-12 md:py-16">
        <SectionGridWash className="opacity-50" />
        <div className="relative z-[1] mx-auto max-w-3xl px-6">
          <p className="text-center font-sans text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{INTRO_BODY}</p>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Public Package Model
          </motion.h2>
          <p className="mt-2 text-[15px] text-slate-500">Core, Control, Assurance, Sovereign, and Partner</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PUBLIC_MODEL.map((row, i) => (
              <motion.article
                key={row.tier}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  'rounded-2xl border border-slate-200/90 bg-gradient-to-b p-5 shadow-sm',
                  TIER_ACCENT[row.tier],
                )}
              >
                <h3 className="text-lg font-bold text-slate-900">{row.tier}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">{row.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash className="opacity-40" />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            APEXLyn Track Packages
          </motion.h2>
          <ul className="mt-8 space-y-4">
            {TRACK_PACKAGES.map((pkg) => (
              <li
                key={pkg.name}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_-18px_rgba(11,19,32,0.12)]"
              >
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{pkg.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{pkg.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            APEXLyn Lens Packages
          </motion.h2>
          <ul className="mt-8 space-y-4">
            {LENS_PACKAGES.map((pkg) => (
              <li
                key={pkg.name}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 ring-1 ring-slate-200/80"
              >
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">{pkg.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{pkg.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(30,58,138,0.05),transparent)]" />
        <div className="relative z-[1] mx-auto max-w-[800px] px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-[1.4rem] font-bold text-slate-900 sm:text-2xl md:text-3xl"
          >
            Enterprise, Sovereign, and Partner Pricing
          </motion.h2>
          <p className="mt-5 text-[17px] leading-relaxed text-slate-600">{ENTERPRISE_SECTION_BODY}</p>
          <Link
            href={CONTACT_ENTERPRISE_PARTNER_HREF}
            className="mt-10 inline-flex min-h-[3rem] items-center justify-center rounded-lg bg-[#1E3A8A] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#172554]"
          >
            Request an Enterprise or Partner Proposal
          </Link>
        </div>
      </section>

      <ElevatedCtaBand>
        <Link
          href={CONTACT_PRICING_HREF}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
        >
          Request Pricing Details
        </Link>
        <Link
          href={CONTACT_ENTERPRISE_PARTNER_HREF}
          className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50"
        >
          Request an Enterprise or Partner Proposal
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
