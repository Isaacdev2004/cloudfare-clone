import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash, NavySignalBand } from '@/components/layout/InnerPageChrome';
import { FileKey } from 'lucide-react';

export default function TrustRequestDocumentationPage() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-16 sm:flex-row sm:items-start sm:py-20 lg:py-24">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex">
            <FileKey className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
          <PageHero
            variant="light"
            eyebrow="Trust Center"
            title="Request Security Documentation"
            description="Use the contact channel below to request security, privacy, and architecture documentation applicable to your review process. Include your organisation name, intended use of the materials, and any confidentiality requirements."
            className="min-w-0 flex-1 bg-transparent"
            contentClassName="py-0 sm:py-0 max-w-3xl"
          />
        </div>
      </section>
      <div className="relative overflow-hidden py-12 md:py-16">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[640px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.18)] sm:p-10"
          >
            <p className="font-sans text-[15px] leading-relaxed text-slate-600">
              We respond to documentation requests through our standard contact workflow. For sensitive threads, state your preferred secure channel in your message.
            </p>
            <Link
              href="/company/contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554]"
            >
              Go to contact
            </Link>
          </motion.div>
        </div>
      </div>
      <NavySignalBand>
        <Link
          href="/trust-center"
          className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 font-sans text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Trust Center overview
        </Link>
        <Link
          href="/platforms/architecture"
          className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Architecture
        </Link>
      </NavySignalBand>
    </div>
  );
}
