import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { CheckCircle2 } from 'lucide-react';
import NotFound from '@/pages/not-found';
import { InnerHeroBackdrop, SectionGridWash, NavySignalBand } from '@/components/layout/InnerPageChrome';

import { CTA, CONTACT_TOPICS } from '@/lib/apexlyn-cta-routes';

const ASSESS_SECURITY_STATE_HREF = CTA.testYourSecurityState;
const DISCUSS_REQUIREMENTS_HREF = CTA.contactTopic(CONTACT_TOPICS.industry);
const DISCUSS_PARTNER_DELIVERY_HREF = CTA.contactTopic(CONTACT_TOPICS.enterprisePartnerPricing);
const EXPLORE_MSP_SUPPORT_HREF = CTA.contactTopic(CONTACT_TOPICS.services);

const RISK_LANDSCAPE_TITLE = 'Industry Risk Landscape';

const PRESSURE_TITLE = 'Governance Pressure';

// --- Section 23 — Healthcare ---
const HEALTHCARE_RISK_BODY =
  'Healthcare environments carry high consequence: sensitive patient information, interconnected systems, third-party dependencies, and operational pressure that leaves little room for manual compliance overhead. APEXLyn helps healthcare organisations prove control reality continuously and reduce exposure without disrupting care.';

const HEALTHCARE_PRESSURE_BULLETS = [
  'Regulatory oversight',
  'Privacy sensitivity',
  'Third-party risk',
  'Executive accountability',
  'Stronger reporting expectations',
] as const;

const HOW_APEXLYN_HELPS_TITLE = 'How APEXLyn Helps';
const HEALTHCARE_HOW_BLOCKS = [
  {
    title: 'Track',
    body:
      'Continuously capture control evidence and support stronger reporting without depending on manual collection.',
  },
  {
    title: 'Lens',
    body:
      'Increase visibility into AI usage and reduce sensitive-data exposure through more structured governance.',
  },
  {
    title: 'Services',
    body:
      'Support security uplift and governance discipline in environments where operational continuity matters.',
  },
] as const;

const WHY_MATTERS_NOW_TITLE = 'Why This Matters Now';
const HEALTHCARE_WHY_BODY =
  'Healthcare organisations are under pressure to maintain trust while managing growing operational complexity.';
const HEALTHCARE_WHY_BULLETS = [
  'More scrutiny, less tolerance for assumption',
  'More digital and AI use across sensitive workflows',
  'More pressure for reporting that leaders can defend',
] as const;

// --- Section 24 — Legal ---
const LEGAL_RISK_BODY =
  'Legal organisations hold highly confidential information where disclosure risk is existential. APEXLyn helps legal practices create defensible evidence of control reality and reduce AI-driven exposure across sensitive matters and client data.';

const LEGAL_PRESSURE_BULLETS = [
  'Client confidentiality expectations',
  'Disclosure risk',
  'Governance accountability',
  'Insurance sensitivity',
  'Operational trust pressure',
] as const;

const LEGAL_HOW_BLOCKS = [
  {
    title: 'Track',
    body: 'Create stronger evidence continuity and reporting across sensitive legal operating environments.',
  },
  {
    title: 'Lens',
    body: 'Reduce the risk of confidential matters being exposed through uncontrolled AI usage.',
  },
  {
    title: 'Services',
    body: 'Strengthen operational governance and support defensible security improvement.',
  },
] as const;

const LEGAL_WHY_BULLETS = [
  'More use of AI in legal working environments',
  'Higher client sensitivity around confidential information',
  'More need for trust signals that can stand up under scrutiny',
] as const;

// --- Section 25 — Accounting ---
const ACCOUNTING_RISK_BODY =
  'Accounting firms handle financial records, identity data, and client platforms — often under seasonal pressure and strict client assurance expectations. APEXLyn replaces fragmented assurance with continuous evidence and helps reduce AI exposure risk across teams.';

const ACCOUNTING_PRESSURE_BULLETS = [
  'Financial-data sensitivity',
  'Client assurance expectations',
  'Seasonal operational pressure',
  'Governance and reporting needs',
  'Exposure through modern collaboration and AI use',
] as const;

const ACCOUNTING_HOW_BLOCKS = [
  {
    title: 'Track',
    body: 'Support continuous evidence capture, stronger control visibility, and more defensible reporting.',
  },
  {
    title: 'Lens',
    body: 'Reduce AI-related exposure of confidential and financially sensitive information.',
  },
  {
    title: 'Services',
    body: 'Provide structured uplift and operational hardening that supports stable long-term security posture.',
  },
] as const;

const ACCOUNTING_WHY_BULLETS = [
  'More tool sprawl across client-facing workflows',
  'Greater pressure to prove operational discipline',
  'Rising AI usage across high-sensitivity working environments',
] as const;

// --- Section 26 — Insurance ---
const INSURANCE_RISK_BODY =
  'Insurance environments operate with deep data sensitivity, partner complexity, and high scrutiny. APEXLyn helps insurers standardise stronger governance signals, support defensible evidence, and reduce exposure as AI becomes embedded in operations.';

const INSURANCE_PRESSURE_BULLETS = [
  'Sensitive data handling',
  'Partner and supply-chain complexity',
  'Executive and board scrutiny',
  'Governance pressure',
  'Stronger reporting expectations',
] as const;

const INSURANCE_HOW_BLOCKS = [
  {
    title: 'Track',
    body: 'Create stronger evidence continuity and clearer operational reporting for environments under scrutiny.',
  },
  {
    title: 'Lens',
    body: 'Increase visibility into AI-related exposure and support stronger governance of sensitive data usage.',
  },
  {
    title: 'Services',
    body: 'Support operational hardening and governance discipline in complex operating environments.',
  },
] as const;

const INSURANCE_WHY_BULLETS = [
  'AI adoption is increasing across data-sensitive processes',
  'Leadership needs better visibility into governance reality',
  'Insurers face stronger pressure for clear assurance and defensible reporting',
] as const;

// --- Section 27 — MSP / Partners ---
const MSP_RISK_BODY =
  'MSPs carry portfolio risk across many client environments. The challenge is not only improving security — it is proving outcomes consistently, efficiently, and at scale. APEXLyn supports structured evidence, governance, and portfolio visibility designed for multi-tenant delivery.';

const MSP_PRESSURE_BULLETS = [
  'Multi-tenant delivery pressure',
  'Client assurance expectations',
  'Governance across many environments',
  'Reporting consistency',
  'Portfolio-level risk visibility',
] as const;

const MSP_HOW_BLOCKS = [
  {
    title: 'Track',
    body: 'Support evidence-led security delivery across client environments with clearer reporting and stronger governance continuity.',
  },
  {
    title: 'Lens',
    body: 'Provide AI governance visibility and exposure reduction across multiple client estates.',
  },
  {
    title: 'Services',
    body: 'Support structured rollout, partner delivery enablement, and governance consistency at portfolio scale.',
  },
] as const;

const MSP_WHY_BULLETS = [
  'Clients expect stronger proof, not only verbal assurance',
  'Multi-tenant governance is harder with fragmented tooling',
  'AI exposure across many client environments is becoming a portfolio risk',
] as const;

// --- Section 28 — Professional Services ---
const PROFESSIONAL_SERVICES_RISK_BODY =
  'Professional services firms operate across many tools, stakeholders, and high-trust client relationships. APEXLyn helps reduce exposure, prove control reality, and govern AI usage without slowing delivery.';

const PROFESSIONAL_SERVICES_PRESSURE_BULLETS = [
  'Client trust expectations',
  'Sensitive working documents',
  'Distributed collaboration tools',
  'AI adoption without governance maturity',
  'Executive and client reporting pressure',
] as const;

const PROFESSIONAL_SERVICES_HOW_BLOCKS = [
  {
    title: 'Track',
    body: 'Support stronger evidence, reporting, and governance continuity across fast-moving working environments.',
  },
  {
    title: 'Lens',
    body: 'Reduce AI-driven exposure and support more controlled adoption of AI across teams.',
  },
  {
    title: 'Services',
    body: 'Provide targeted security uplift and governance support without creating unnecessary friction.',
  },
] as const;

const PROFESSIONAL_SERVICES_WHY_BULLETS = [
  'Collaboration speed often outpaces governance discipline',
  'AI use is rising in client-facing environments',
  'Trust and defensibility are becoming stronger buying factors',
] as const;

type IndustryPageProps = {
  params: { slug?: string };
};

function HealthcareIndustryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title="Security and Governance for Healthcare Providers"
          className="relative z-[1] border-0 bg-transparent"
          contentClassName="relative z-[1] max-w-4xl py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.15)] sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{RISK_LANDSCAPE_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{HEALTHCARE_RISK_BODY}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{PRESSURE_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {HEALTHCARE_PRESSURE_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
            className="max-w-3xl text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]"
          >
            {HOW_APEXLYN_HELPS_TITLE}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HEALTHCARE_HOW_BLOCKS.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-sky-500" />
                <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{WHY_MATTERS_NOW_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{HEALTHCARE_WHY_BODY}</p>
            <ul className="mt-6 space-y-3">
              {HEALTHCARE_WHY_BULLETS.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={ASSESS_SECURITY_STATE_HREF}
          className="font-sans inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Assess Your Organisation&apos;s Security State
        </Link>
        <Link
          href={DISCUSS_REQUIREMENTS_HREF}
          className="font-sans inline-flex items-center justify-center rounded border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Discuss Healthcare Requirements
        </Link>
      </NavySignalBand>
    </div>
  );
}

function LegalIndustryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title="Security and Governance for Legal Practices"
          className="relative z-[1] border-0 bg-transparent"
          contentClassName="relative z-[1] max-w-4xl py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.15)] sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{RISK_LANDSCAPE_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{LEGAL_RISK_BODY}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{PRESSURE_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {LEGAL_PRESSURE_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
            className="max-w-3xl text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]"
          >
            {HOW_APEXLYN_HELPS_TITLE}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {LEGAL_HOW_BLOCKS.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-sky-500" />
                <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{WHY_MATTERS_NOW_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {LEGAL_WHY_BULLETS.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={ASSESS_SECURITY_STATE_HREF}
          className="font-sans inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Assess Your Organisation&apos;s Security State
        </Link>
        <Link
          href={DISCUSS_REQUIREMENTS_HREF}
          className="font-sans inline-flex items-center justify-center rounded border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Discuss Legal Requirements
        </Link>
      </NavySignalBand>
    </div>
  );
}

function AccountingIndustryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title="Security and Governance for Accounting Firms"
          className="relative z-[1] border-0 bg-transparent"
          contentClassName="relative z-[1] max-w-4xl py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.15)] sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{RISK_LANDSCAPE_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{ACCOUNTING_RISK_BODY}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{PRESSURE_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {ACCOUNTING_PRESSURE_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
            className="max-w-3xl text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]"
          >
            {HOW_APEXLYN_HELPS_TITLE}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ACCOUNTING_HOW_BLOCKS.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-sky-500" />
                <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{WHY_MATTERS_NOW_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {ACCOUNTING_WHY_BULLETS.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={ASSESS_SECURITY_STATE_HREF}
          className="font-sans inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Assess Your Organisation&apos;s Security State
        </Link>
        <Link
          href={DISCUSS_REQUIREMENTS_HREF}
          className="font-sans inline-flex items-center justify-center rounded border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Discuss Accounting Requirements
        </Link>
      </NavySignalBand>
    </div>
  );
}

function InsuranceIndustryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title="Security and Governance for Insurance Organisations"
          className="relative z-[1] border-0 bg-transparent"
          contentClassName="relative z-[1] max-w-4xl py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.15)] sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{RISK_LANDSCAPE_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{INSURANCE_RISK_BODY}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{PRESSURE_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {INSURANCE_PRESSURE_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
            className="max-w-3xl text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]"
          >
            {HOW_APEXLYN_HELPS_TITLE}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {INSURANCE_HOW_BLOCKS.map((block, i) => (
              <motion.div
                key={`${block.title}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-sky-500" />
                <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{WHY_MATTERS_NOW_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {INSURANCE_WHY_BULLETS.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={ASSESS_SECURITY_STATE_HREF}
          className="font-sans inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Assess Your Organisation&apos;s Security State
        </Link>
        <Link
          href={DISCUSS_REQUIREMENTS_HREF}
          className="font-sans inline-flex items-center justify-center rounded border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Discuss Insurance Requirements
        </Link>
      </NavySignalBand>
    </div>
  );
}

function MspPartnersIndustryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title="Evidence-Led Security and AI Governance for MSPs and Partners"
          className="relative z-[1] border-0 bg-transparent"
          contentClassName="relative z-[1] max-w-4xl py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.15)] sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{RISK_LANDSCAPE_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{MSP_RISK_BODY}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{PRESSURE_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {MSP_PRESSURE_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
            className="max-w-3xl text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]"
          >
            {HOW_APEXLYN_HELPS_TITLE}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MSP_HOW_BLOCKS.map((block, i) => (
              <motion.div
                key={`${block.title}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-sky-500" />
                <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{WHY_MATTERS_NOW_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {MSP_WHY_BULLETS.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={DISCUSS_PARTNER_DELIVERY_HREF}
          className="font-sans inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Discuss Partner Delivery
        </Link>
        <Link
          href={EXPLORE_MSP_SUPPORT_HREF}
          className="font-sans inline-flex items-center justify-center rounded border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Explore MSP Support
        </Link>
      </NavySignalBand>
    </div>
  );
}

function ProfessionalServicesIndustryPage() {
  return (
    <div className="flex min-h-[calc(100dvh-108px)] flex-col apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Industries"
          title="Security and AI Governance for Professional Services"
          className="relative z-[1] border-0 bg-transparent"
          contentClassName="relative z-[1] max-w-4xl py-16 sm:py-20 lg:py-24"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_20px_50px_-32px_rgba(11,19,32,0.15)] sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{RISK_LANDSCAPE_TITLE}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{PROFESSIONAL_SERVICES_RISK_BODY}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{PRESSURE_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {PROFESSIONAL_SERVICES_PRESSURE_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
            className="max-w-3xl text-xl font-bold text-slate-900 sm:text-2xl md:text-[28px]"
          >
            {HOW_APEXLYN_HELPS_TITLE}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROFESSIONAL_SERVICES_HOW_BLOCKS.map((block, i) => (
              <motion.div
                key={`${block.title}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.12)] sm:p-7"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-sky-500" />
                <h3 className="text-base font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{WHY_MATTERS_NOW_TITLE}</h2>
            <ul className="mt-6 space-y-3">
              {PROFESSIONAL_SERVICES_WHY_BULLETS.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-slate-600 sm:text-[16px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <NavySignalBand>
        <Link
          href={ASSESS_SECURITY_STATE_HREF}
          className="font-sans inline-flex items-center justify-center rounded bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Assess Your Organisation&apos;s Security State
        </Link>
        <Link
          href={DISCUSS_REQUIREMENTS_HREF}
          className="font-sans inline-flex items-center justify-center rounded border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Discuss Professional Services Requirements
        </Link>
      </NavySignalBand>
    </div>
  );
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const slug = params?.slug ?? '';

  if (slug === 'healthcare') {
    return <HealthcareIndustryPage />;
  }
  if (slug === 'legal') {
    return <LegalIndustryPage />;
  }
  if (slug === 'accounting') {
    return <AccountingIndustryPage />;
  }
  if (slug === 'insurance') {
    return <InsuranceIndustryPage />;
  }
  if (slug === 'msp-partners') {
    return <MspPartnersIndustryPage />;
  }
  if (slug === 'professional-services') {
    return <ProfessionalServicesIndustryPage />;
  }

  return <NotFound />;
}
