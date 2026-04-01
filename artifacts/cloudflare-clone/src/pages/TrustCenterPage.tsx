import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { InnerHeroBackdrop, SectionGridWash, NavySignalBand } from '@/components/layout/InnerPageChrome';
import { Shield } from 'lucide-react';

const REVIEW_ARCHITECTURE_HREF = '/platforms/architecture';
const REQUEST_DOCS_HREF = '/trust-center/request-documentation';

const SECTIONS = [
  {
    title: 'Data Residency & Storage',
    bullets: [
      'Primary data hosting region',
      'Backup region',
      'Data segregation model',
      'Encryption at rest',
      'Encryption in transit',
    ],
    body:
      'We state clearly where customer data is stored, how it is protected, and how tenancy is separated. Security documentation is available on request.',
  },
  {
    title: 'Access & Identity Controls',
    bullets: [
      'Role-based access control',
      'Least-privilege architecture',
      'MFA enforcement',
      'Privileged activity logging',
    ],
    body:
      'Access is designed around least privilege. Privileged actions are logged for accountability and auditability.',
  },
  {
    title: 'Evidence Integrity & Immutability',
    bullets: [
      'Append-only evidence model',
      'Immutable audit trail',
      'Hash validation',
      'Timestamp integrity',
    ],
    body:
      'Evidence integrity is a core design goal. Records are structured to preserve history and to support verification under scrutiny.',
  },
  {
    title: 'Privacy & Data Usage',
    bullets: [
      'What data we collect',
      'What data we do not collect',
      'How customer-submitted information is processed',
      'AI prompt inspection boundaries',
      'Data retention model',
    ],
    body:
      'We make data boundaries explicit. Customers control what is connected, what is inspected, and what is retained under the agreed model.',
  },
  {
    title: 'Regulatory Alignment (Australia-Focused)',
    bullets: [
      'Essential Eight alignment',
      'Privacy Act (Australia) awareness',
      'AI governance awareness',
      'Data breach response posture',
    ],
    body: null as string | null,
    disclaimer:
      'We do not claim compliance. APEXLyn is designed to support alignment and governance outcomes.',
  },
] as const;

export default function TrustCenterPage() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-16 sm:flex-row sm:items-start sm:py-20 lg:py-24">
          <div className="hidden shrink-0 sm:flex sm:w-14 lg:w-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm lg:h-16 lg:w-16">
              <Shield className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
            </div>
          </div>
          <PageHero
            variant="light"
            eyebrow="Trust Center"
            title="Trust is Engineered. Not Assumed."
            description="Apexlyn is built with structured security architecture, transparent governance controls, and privacy-respectful data handling aligned to Australian regulatory expectations."
            className="min-w-0 flex-1 bg-transparent"
            contentClassName="py-0 sm:py-0 max-w-3xl"
          />
        </div>
      </section>

      <div className="relative border-b border-slate-200 bg-gradient-to-b from-[#f8fafc] to-white py-14 md:py-20">
        <SectionGridWash className="opacity-30" />
        <div className="relative z-[1] mx-auto max-w-[960px] space-y-8 px-6 md:space-y-10">
          {SECTIONS.map((block, i) => (
            <motion.article
              key={block.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.18)] sm:p-9"
            >
              <div className="absolute right-6 top-6 text-5xl font-black tabular-nums text-slate-100 sm:text-6xl">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h2 className="relative max-w-[90%] text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                {block.title}
              </h2>
              <ul className="relative mt-5 space-y-2.5 text-[15px] leading-relaxed text-slate-700">
                {block.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {block.body ? (
                <p className="relative mt-6 border-t border-slate-100 pt-6 text-[15px] leading-relaxed text-slate-600">
                  {block.body}
                </p>
              ) : null}
              {'disclaimer' in block && block.disclaimer ? (
                <p className="relative mt-5 rounded-lg border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm leading-relaxed text-slate-600">
                  {block.disclaimer}
                </p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>

      <NavySignalBand>
        <Link
          href={REVIEW_ARCHITECTURE_HREF}
          className="inline-flex items-center justify-center rounded px-5 py-3 text-[15px] font-semibold text-[#0B1320] transition-colors bg-white hover:bg-slate-100 font-sans"
        >
          Review Our Security Architecture
        </Link>
        <Link
          href={REQUEST_DOCS_HREF}
          className="inline-flex items-center justify-center rounded border border-white/25 bg-transparent px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 font-sans"
        >
          Request Security Documentation
        </Link>
      </NavySignalBand>
    </div>
  );
}
