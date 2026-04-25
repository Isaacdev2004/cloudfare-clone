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
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { InnerHeroBackdrop, SectionGridWash } from '@/components/layout/InnerPageChrome';
import { cn } from '@/lib/utils';
import { CTA, PLATFORM_ANCHORS, testYourSecurityStateWithMode } from '@/lib/apexlyn-cta-routes';

const ASSESS_AI_EXPOSURE_HREF = testYourSecurityStateWithMode('lens');
const STRATEGIC_CONVERSATION_URL = CTA.contact;

const CAPABILITY_BLOCKS: { id?: string; title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: 'AI Usage Discovery',
    body: 'Identify where AI tools are being used, by whom, and in what context — so governance starts from reality, not policy optimism.',
    Icon: Search,
  },
  {
    title: 'Prompt and Response Risk Inspection',
    body: 'Inspect AI-related interactions at the moment risk appears, not after the damage is already done.',
    Icon: ScanLine,
  },
  {
    title: 'Sensitive Data Detection',
    body: 'Reduce exposure of regulated, confidential, privileged, and business-critical information across AI interactions.',
    Icon: FileWarning,
  },
  {
    id: 'policy-enforcement',
    title: 'Policy Enforcement',
    body: 'Apply structured rules that guide, warn, restrict, or block where necessary — with clearer accountability and more defensible governance.',
    Icon: Shield,
  },
  {
    title: 'Executive AI Risk Visibility',
    body: 'Translate AI usage and exposure into governance-grade reporting leaders can understand, question, and act on.',
    Icon: LayoutDashboard,
  },
];

const WHY_LENS_BULLETS = [
  'Increase AI usage visibility',
  'Reduce sensitive-data leakage through AI',
  'Apply governance where it matters',
  'Support safer AI adoption',
  'Improve executive-level AI oversight',
  'Create defensible records of AI-related exposure and action',
] as const;

export default function LensPlatformPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="APEXLyn Lens — AI Governance & AI Risk Infrastructure"
          title="Discover → Inspect → Enforce → Protect"
          description="APEXLyn Lens gives organisations continuous AI usage visibility, prompt-level and response-level risk inspection, sensitive-data exposure control, and structured governance across real working environments."
          actions={[
            { label: 'Assess Your AI Exposure', href: ASSESS_AI_EXPOSURE_HREF, variant: 'primary' },
            { label: 'See How Policy Enforcement Works', href: PLATFORM_ANCHORS.lensPolicyEnforcement, variant: 'outline' },
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
            <h2 className="text-[1.65rem] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[44px]">
              What Lens Does
            </h2>
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
                        <h3 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-[26px]">{block.title}</h3>
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

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white py-16 md:py-20">
        <div className="mx-auto max-w-[720px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.5rem] font-bold text-slate-900 sm:text-3xl">Why Organisations Choose Lens</h2>
            <ul className="mt-8 space-y-3">
              {WHY_LENS_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-[#0B1320]/10 bg-[#F7F9FC] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.65rem] font-bold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-4xl md:text-[40px]">
              Govern AI Use Without Losing Operational Control
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">
              Start with a baseline and identify where AI usage, sensitive-data exposure, and policy gaps need attention
              first.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={ASSESS_AI_EXPOSURE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded px-6 py-3.5 text-base font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
              >
                Assess Your AI Exposure
              </Link>
              <Link
                href={STRATEGIC_CONVERSATION_URL}
                className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Start a Strategic Conversation
              </Link>
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-left text-[17px] leading-relaxed text-slate-600 sm:text-center sm:text-[18px]">
              APEXLyn Lens is built for organisations that need AI adoption without governance blind spots. It helps teams
              understand where AI is being used, what exposure is being created, what policy should apply, and how to
              reduce risk without relying on guesswork.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
