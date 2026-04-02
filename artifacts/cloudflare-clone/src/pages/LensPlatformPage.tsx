import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import {
  Search,
  ScanLine,
  FileWarning,
  Shield,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';
import { InnerHeroBackdrop, NavySignalBand, SectionGridWash } from '@/components/layout/InnerPageChrome';
import { cn } from '@/lib/utils';

const ASSESS_AI_EXPOSURE_HREF = '/test-security-state';

const CAPABILITY_BLOCKS: { id?: string; title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: 'AI Usage Discovery',
    body: 'Identify where AI tools are used, by whom, and in what context — so governance starts from reality.',
    Icon: Search,
  },
  {
    title: 'Prompt-Level Monitoring',
    body: 'Inspect risk at the moment it occurs, not after the damage is done.',
    Icon: ScanLine,
  },
  {
    title: 'Sensitive Data Detection',
    body: 'Detect regulated and business-critical data types to reduce exposure through AI interactions.',
    Icon: FileWarning,
  },
  {
    id: 'policy-enforcement',
    title: 'Policy Enforcement',
    body: 'Enforce rules that protect sensitive information — with structured exceptions and clear accountability.',
    Icon: Shield,
  },
  {
    title: 'Executive Risk Dashboard',
    body: 'Translate AI exposure into governance-grade reporting leaders can act on.',
    Icon: LayoutDashboard,
  },
];

export default function LensPlatformPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="APEXLyn Lens"
          title="Discover → Inspect → Enforce → Protect"
          description="Apexlyn Lens provides continuous AI usage visibility, detects prompt-level data exposure, and enforces structured governance controls across users and environments."
          actions={[
            { label: 'Assess Your AI Exposure', href: ASSESS_AI_EXPOSURE_HREF, variant: 'primary' },
            { label: 'See How Policy Enforcement Works', href: '#policy-enforcement', variant: 'outline' },
          ]}
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24"
          aside={
            <div className="flex items-center justify-center py-4 lg:py-0">
              <div className="relative w-full max-w-[min(100%,400px)] rounded-2xl border border-slate-200/90 bg-white p-3 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.2)] sm:p-5">
                <HeroCloudNetworkVisual compact />
              </div>
            </div>
          }
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-16 md:py-24">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1100px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12 max-w-2xl"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1E3A8A]">Capability stack</p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">From signal to enforcement</h2>
          </motion.div>

          <div className="flex flex-col gap-8 lg:gap-10">
            {CAPABILITY_BLOCKS.map((block, i) => {
              const Icon = block.Icon;
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={block.title}
                  id={block.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'scroll-mt-[calc(108px+1rem)] lg:max-w-[88%]',
                    alignRight && 'lg:ml-auto lg:mr-0',
                    !alignRight && 'lg:mr-auto lg:ml-0',
                  )}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_20px_48px_-30px_rgba(30,27,75,0.2)] sm:p-8">
                    <div
                      className={cn(
                        'pointer-events-none absolute -top-12 h-32 w-32 rounded-full blur-3xl',
                        alignRight ? 'right-0 bg-violet-500/10' : 'left-0 bg-[#1E3A8A]/10',
                      )}
                    />
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/10 to-[#1E3A8A]/10 ring-1 ring-slate-200/80">
                        <Icon className="h-6 w-6 text-[#1E3A8A]" strokeWidth={1.65} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-[26px]">{block.title}</h2>
                        <p className="mt-3 text-[17px] leading-relaxed text-slate-600">{block.body}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={ASSESS_AI_EXPOSURE_HREF}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-base font-semibold text-[#0B1320] transition-colors bg-white hover:bg-slate-100"
        >
          Assess Your AI Exposure
        </Link>
      </NavySignalBand>
    </div>
  );
}
