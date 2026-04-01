import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';
import {
  InnerHeroBackdrop,
  GradientTopCard,
  SectionGridWash,
  ElevatedCtaBand,
} from '@/components/layout/InnerPageChrome';

const CONTACT_PRICING_HREF = '/company/contact';

const PACKAGES = [
  {
    id: 'flow',
    title: 'Flow',
    gradientClass: 'from-emerald-600 via-teal-600 to-[#1E3A8A]',
    oneLiner: 'Establish continuous visibility and baseline control reality.',
    bullets: [
      'Evidence cadence foundations',
      'Structured visibility across core control areas',
      'Designed for growing environments',
    ],
    includedAnchor: '#package-flow',
  },
  {
    id: 'verify',
    title: 'Verify',
    gradientClass: 'from-violet-600 via-indigo-600 to-[#1E3A8A]',
    oneLiner: 'Strengthen defensibility with governance-grade evidence and reporting.',
    bullets: [
      'Evidence integrity posture',
      'Framework views and reporting cadence',
      'Designed for higher scrutiny',
    ],
    includedAnchor: '#package-verify',
  },
  {
    id: 'vault',
    title: 'Vault',
    gradientClass: 'from-slate-700 via-slate-800 to-[#0B1320]',
    oneLiner: 'Scale governance, accountability, and assurance across complex operations.',
    bullets: [
      'Governance workflows and approvals',
      'Exception handling and ownership model',
      'Designed for enterprise and partners',
    ],
    includedAnchor: '#package-vault',
  },
] as const;

export default function Pricing() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Commercial"
          title="Pricing"
          description="Transparent pricing aligned to organisational scale and operational complexity."
          actions={[{ label: 'Request Pricing Details', href: CONTACT_PRICING_HREF, variant: 'primary' }]}
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24 max-w-3xl"
        />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6 pb-10 -mt-2">
          <p className="max-w-xl text-sm text-slate-500 font-sans border-l-2 border-[#1E3A8A]/30 pl-4">
            We’ll map the right package to your environment and requirements.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-16 md:py-24">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <div className="grid gap-8 md:grid-cols-3 lg:gap-8">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                id={`package-${pkg.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="scroll-mt-[calc(108px+1rem)]"
              >
                <GradientTopCard gradientClass={pkg.gradientClass} className="h-full">
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Package</div>
                  <h2 className="text-3xl font-bold text-slate-900">{pkg.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{pkg.oneLiner}</p>
                  <ul className="mt-8 flex-grow space-y-2.5">
                    {pkg.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[14px] text-slate-600 sm:text-[15px]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={CONTACT_PRICING_HREF}
                      className="inline-flex w-full items-center justify-center rounded px-5 py-3 text-center text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
                    >
                      Request Package Pricing
                    </Link>
                    <a
                      href={pkg.includedAnchor}
                      className="text-center text-sm font-semibold text-[#1E3A8A] underline-offset-4 hover:underline"
                    >
                      See What’s Included
                    </a>
                  </div>
                </GradientTopCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(30,58,138,0.06),transparent)]" />
        <div className="relative z-[1] mx-auto max-w-[720px] px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.5rem] font-bold text-slate-900 sm:text-2xl md:text-3xl">
              Enterprise & MSP Pricing
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600">
              Built for multi-tenant delivery, portfolio reporting, or custom governance requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <ElevatedCtaBand>
        <Link
          href={CONTACT_PRICING_HREF}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
        >
          Request an Enterprise Proposal
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
