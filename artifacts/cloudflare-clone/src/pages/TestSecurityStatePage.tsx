import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { InnerHeroBackdrop, SectionGridWash, NavySignalBand } from '@/components/layout/InnerPageChrome';
import { Link } from 'wouter';
import { ClipboardCheck } from 'lucide-react';

const TRUST_POINTS = [
  'No disruption to start',
  'Clear output you can share internally',
  'Built for Australian operating conditions',
] as const;

const MODE_OPTIONS = [
  {
    id: 'track',
    label: 'Evidence Readiness (Track)',
    detail: 'Audit readiness • Control evidence • Framework views',
  },
  {
    id: 'lens',
    label: 'AI Exposure (Lens)',
    detail: 'AI visibility • Prompt risk • Leakage prevention',
  },
  {
    id: 'full',
    label: 'Full Baseline',
    detail: 'Combined signal across Track + Lens',
  },
] as const;

const INDUSTRY_OPTIONS = [
  'Healthcare',
  'Legal',
  'Accounting',
  'Insurance',
  'MSP / Partners',
  'Professional Services',
  'Other',
] as const;

const SIZE_OPTIONS = ['1–50', '51–200', '201–1000', '1000+'] as const;

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[15px] text-slate-900 font-sans placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/25 focus:border-[#1E3A8A]';
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700 font-sans';

export default function TestSecurityStatePage() {
  const [mode, setMode] = useState<(typeof MODE_OPTIONS)[number]['id']>('full');
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-16 sm:flex-row sm:items-start sm:py-20 lg:py-24">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm sm:flex">
            <ClipboardCheck className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <PageHero
              variant="light"
              eyebrow="Baseline"
              title="Test Your Security State"
              description="Get a fast baseline across security evidence readiness and AI exposure risk — with clear next steps."
              className="bg-transparent"
              contentClassName="py-0 sm:py-0 max-w-3xl"
            />
            <ul className="mt-8 flex flex-col gap-3 text-[15px] text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {TRUST_POINTS.map((tp) => (
                <li key={tp} className="flex items-center gap-2 font-sans">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden />
                  {tp}
                </li>
              ))}
            </ul>
          </div>
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
            className="mb-10"
          >
            <h2 className="mb-4 font-sans text-lg font-bold text-slate-900">Choose your baseline</h2>
            <div className="space-y-3" role="radiogroup" aria-label="Baseline mode">
              {MODE_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    'flex cursor-pointer flex-col rounded-2xl border p-4 shadow-sm transition-all',
                    mode === opt.id
                      ? 'border-[#1E3A8A] bg-white ring-2 ring-[#1E3A8A]/20 shadow-[0_12px_40px_-24px_rgba(30,58,138,0.45)]'
                      : 'border-slate-200/90 bg-white/90 backdrop-blur-sm hover:border-slate-300 hover:shadow-md',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="baseline-mode"
                      value={opt.id}
                      checked={mode === opt.id}
                      onChange={() => setMode(opt.id)}
                      className="mt-1 text-[#1E3A8A]"
                    />
                    <span>
                      <span className="block font-sans font-semibold text-slate-900">{opt.label}</span>
                      <span className="font-sans text-sm text-slate-600">{opt.detail}</span>
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="mb-1 font-sans text-lg font-bold text-slate-900">Security Baseline Entry</h2>
            <p className="mb-6 font-sans text-sm text-slate-500">
              This produces a structured baseline signal and recommended next actions.
            </p>

            {submitted ? (
              <p className="rounded-2xl border border-slate-200 bg-white p-8 font-sans text-[15px] text-slate-600 shadow-lg">
                Baseline request recorded for this demo. Wire this form to your intake workflow to generate the live signal.
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.18)]"
              >
                <input type="hidden" name="baseline_mode" value={mode} />
                <div>
                  <label className={labelClass} htmlFor="ts-work-email">
                    Work email (Required)
                  </label>
                  <input id="ts-work-email" name="work_email" type="email" className={inputClass} required autoComplete="email" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="ts-organisation">
                    Organisation (Required)
                  </label>
                  <input id="ts-organisation" name="organisation" className={inputClass} required autoComplete="organization" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="ts-industry">
                    Industry (Required)
                  </label>
                  <select id="ts-industry" name="industry" className={inputClass} required defaultValue="">
                    <option value="" disabled>
                      Select industry
                    </option>
                    {INDUSTRY_OPTIONS.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="ts-org-size">
                    Organisation size (Required)
                  </label>
                  <select id="ts-org-size" name="organisation_size" className={inputClass} required defaultValue="">
                    <option value="" disabled>
                      Select size
                    </option>
                    {SIZE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="ts-objective">
                    Primary objective (Required)
                  </label>
                  <input id="ts-objective" name="primary_objective" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass} htmlFor="ts-notes">
                    Current constraints / notes (Optional)
                  </label>
                  <textarea id="ts-notes" name="constraints_notes" className={`${inputClass} min-h-[100px] resize-y`} />
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="mb-2 font-sans text-sm font-semibold text-slate-900">Privacy note</p>
                  <p className="font-sans text-sm leading-relaxed text-slate-600">
                    We use your responses only to generate your baseline and follow up on your request. We do not sell your data.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] sm:w-auto"
                >
                  Generate Baseline Signal
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <NavySignalBand>
        <Link
          href="/platforms"
          className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 font-sans text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Explore platforms
        </Link>
        <Link
          href="/company/contact"
          className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Talk to us
        </Link>
      </NavySignalBand>
    </div>
  );
}
