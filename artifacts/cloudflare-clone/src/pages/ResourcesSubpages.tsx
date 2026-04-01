import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash, ElevatedCtaBand } from '@/components/layout/InnerPageChrome';
import { FileStack } from 'lucide-react';

const CONTACT_HREF = '/company/contact';

type ResourceDetailProps = {
  title: string;
  subheadline: string;
  emptyState: string;
  ctaLabel: string;
};

function ResourceDetailPage({ title, subheadline, emptyState, ctaLabel }: ResourceDetailProps) {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-16 sm:flex-row sm:items-start sm:py-20 lg:py-24">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex">
            <FileStack className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
          <PageHero
            variant="light"
            eyebrow="Resources"
            title={title}
            description={subheadline}
            className="min-w-0 flex-1 bg-transparent"
            contentClassName="py-0 sm:py-0 max-w-3xl"
          />
        </div>
      </section>
      <div className="relative overflow-hidden py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[560px] px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-200/90 bg-white px-8 py-12 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.18)]"
          >
            <p className="font-sans text-[17px] leading-relaxed text-slate-600">{emptyState}</p>
            <p className="mt-6 font-sans text-sm text-slate-500">
              Prefer email? Use contact and we’ll route your request to the right team.
            </p>
          </motion.div>
        </div>
      </div>
      <ElevatedCtaBand>
        <Link
          href={CONTACT_HREF}
          className="inline-flex items-center justify-center rounded px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
        >
          {ctaLabel}
        </Link>
        <Link
          href="/resources"
          className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 font-sans text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50"
        >
          All resources
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}

export function ResourcesWhitepapersPage() {
  return (
    <ResourceDetailPage
      title="Whitepapers"
      subheadline="Research-backed writing focused on defensible evidence and governance execution."
      emptyState="New releases are publishing soon."
      ctaLabel="Request Early Access"
    />
  );
}

export function ResourcesFrameworkGuidesPage() {
  return (
    <ResourceDetailPage
      title="Framework Guides"
      subheadline="Translate frameworks into operational control reality and evidence mapping."
      emptyState="Guides are being released in stages."
      ctaLabel="Request a Guide"
    />
  );
}

export function ResourcesAIRiskBriefsPage() {
  return (
    <ResourceDetailPage
      title="AI Risk Briefs"
      subheadline="Practical AI governance patterns for visibility, enforcement, and reduced exposure."
      emptyState="Briefs are publishing soon."
      ctaLabel="Request an AI Briefing"
    />
  );
}
