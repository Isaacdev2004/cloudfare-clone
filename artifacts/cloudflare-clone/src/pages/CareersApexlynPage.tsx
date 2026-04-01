import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash, ElevatedCtaBand } from '@/components/layout/InnerPageChrome';
import { Briefcase } from 'lucide-react';

export default function CareersApexlynPage() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Careers"
          title="Build the infrastructure of trust."
          description="We’re building systems that make security evidence defensible and AI risk governable — at a standard global organisations can rely on."
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24 max-w-3xl"
        />
      </section>

      <section className="relative overflow-hidden py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[720px] px-6">
          <motion.div
            id="open-roles"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="scroll-mt-[calc(108px+1rem)] rounded-2xl border-2 border-dashed border-slate-200/90 bg-white/80 px-8 py-14 text-center backdrop-blur-sm"
          >
            <Briefcase className="mx-auto h-10 w-10 text-[#1E3A8A]/70" strokeWidth={1.25} />
            <p className="mt-6 text-[15px] leading-relaxed text-slate-600">
              Open roles are published here as they become available. If none are listed yet, register your interest
              and we will contact you when relevant positions open.
            </p>
          </motion.div>
        </div>
      </section>

      <ElevatedCtaBand>
        <a
          href="#open-roles"
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] font-sans"
        >
          View Open Roles
        </a>
        <Link
          href="/company/contact"
          className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 font-sans"
        >
          Register Interest
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
