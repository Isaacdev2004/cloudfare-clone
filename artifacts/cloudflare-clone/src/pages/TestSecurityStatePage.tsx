import React, { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { InnerHeroBackdrop, SectionGridWash, NavySignalBand } from '@/components/layout/InnerPageChrome';
import { Link, useLocation } from 'wouter';
import { CTA } from '@/lib/apexlyn-cta-routes';
import { ClipboardCheck } from 'lucide-react';
import { FieldError, fieldErrorInputClass } from '@/components/forms/FieldError';
import { S9, isValidWorkEmail, shouldSimulateSubmitFailure } from '@/lib/apexlyn-form-copy';
import {
  type BaselineMode,
  getPrimaryObjectivesForMode,
  MODE_CARDS,
  MODE_HELPER_TEXT,
  readBaselineModeFromSearch,
} from '@/lib/apexlyn-test-security-state-modes';

const HERO_SUBHEAD =
  'Get a fast baseline across security evidence readiness and AI exposure risk — with clearer next steps.';
const SUCCESS_HEADLINE = 'Your Baseline Request Has Been Received';
const SUCCESS_BODY =
  'We will review your inputs and respond with a structured baseline signal and recommended next steps.';

const TRUST_POINTS = [
  'No disruption to start',
  'Clear output you can share internally',
  'Built for Australian operating conditions',
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

type FieldKey = 'workEmail' | 'organisation' | 'industry' | 'orgSize' | 'primaryObjective';

type FieldErrors = Partial<Record<FieldKey, string>>;

function validateTestForm(values: {
  workEmail: string;
  organisation: string;
  industry: string;
  orgSize: string;
  primaryObjective: string;
}): FieldErrors {
  const e: FieldErrors = {};
  const email = values.workEmail.trim();
  if (!email) e.workEmail = S9.emailEmpty;
  else if (!isValidWorkEmail(email)) e.workEmail = S9.emailInvalid;
  if (!values.organisation.trim()) e.organisation = S9.organisationEmpty;
  if (!values.industry) e.industry = S9.industryEmpty;
  if (!values.orgSize) e.orgSize = S9.orgSizeEmpty;
  if (!values.primaryObjective) e.primaryObjective = S9.primaryObjectiveEmpty;
  return e;
}

export default function TestSecurityStatePage() {
  const [path, setLocation] = useLocation();
  const [mode, setMode] = useState<BaselineMode>(() => readBaselineModeFromSearch());
  const [workEmail, setWorkEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [industry, setIndustry] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [primaryObjective, setPrimaryObjective] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    setMode(readBaselineModeFromSearch());
  }, [path]);

  /** §10.3 / §10.5 — when mode changes, reset primary objective (options are mode-specific) */
  useEffect(() => {
    setPrimaryObjective('');
    setFieldErrors((f) => ({ ...f, primaryObjective: undefined }));
  }, [mode]);

  const selectMode = (id: BaselineMode) => {
    setMode(id);
    setLocation(`${CTA.testYourSecurityState}?${new URLSearchParams({ mode: id }).toString()}`);
  };

  const clearServerError = () => setServerError(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(false);
    const errors = validateTestForm({ workEmail, organisation, industry, orgSize, primaryObjective });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      if (shouldSimulateSubmitFailure()) {
        setServerError(true);
        return;
      }
      setSuccess(true);
    } catch {
      setServerError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen apex-page-bg">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <InnerHeroBackdrop />
          <div className="relative z-[1] mx-auto max-w-[1280px] px-6 py-16 sm:py-20 lg:py-24">
            <PageHero
              variant="light"
              eyebrow="Baseline"
              title={SUCCESS_HEADLINE}
              description={SUCCESS_BODY}
              className="bg-transparent"
              contentClassName="py-0 sm:py-0 max-w-3xl mx-auto"
            />
          </div>
        </section>
        <NavySignalBand>
          <Link
            href={CTA.platforms}
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 font-sans text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
          >
            Explore platforms
          </Link>
          <Link
            href={CTA.contact}
            className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to us
          </Link>
        </NavySignalBand>
      </div>
    );
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
              description={HERO_SUBHEAD}
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
            <h2 className="mb-4 font-sans text-lg font-bold text-slate-900">Choose Your Baseline</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4" role="group" aria-label="Baseline mode">
              {MODE_CARDS.map((card) => {
                const selected = mode === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => selectMode(card.id)}
                    className={cn(
                      'flex min-h-[120px] flex-col rounded-2xl border p-4 text-left shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/35 focus-visible:ring-offset-2',
                      selected
                        ? 'border-[#1E3A8A] bg-white ring-2 ring-[#1E3A8A]/20 shadow-[0_12px_32px_-20px_rgba(30,58,138,0.35)]'
                        : 'border-slate-200/90 bg-white/90 hover:border-slate-300 hover:shadow-md',
                    )}
                    aria-pressed={selected}
                    aria-label={
                      selected ? `${card.title} — currently selected` : `Select ${card.title}`
                    }
                  >
                    <span className="font-sans text-[15px] font-semibold text-slate-900">{card.title}</span>
                    <span className="mt-1.5 font-sans text-sm leading-snug text-slate-600">{card.subtitle}</span>
                  </button>
                );
              })}
            </div>
            <p
              id="ts-mode-helper"
              className="mt-4 font-sans text-[15px] leading-relaxed text-slate-600"
              aria-live="polite"
            >
              {MODE_HELPER_TEXT[mode]}
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="mb-1 font-sans text-lg font-bold text-slate-900">Security Baseline Entry</h2>
            <p className="mb-6 font-sans text-sm text-slate-500">
              This produces a structured baseline signal and recommended next actions.
            </p>

            {serverError ? (
              <p
                className="mb-5 rounded-lg border border-[#D64545]/30 bg-[#D64545]/[0.06] px-4 py-3 font-sans text-[15px] leading-relaxed text-slate-800"
                role="alert"
              >
                {S9.submitFailed}
              </p>
            ) : null}

            <form
              noValidate
              onSubmit={onSubmit}
              className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.18)]"
            >
              <input type="hidden" name="baseline_mode" value={mode} />
              <div>
                <label className={labelClass} htmlFor="ts-work-email">
                  Work email (Required)
                </label>
                <input
                  id="ts-work-email"
                  name="work_email"
                  type="email"
                  autoComplete="email"
                  value={workEmail}
                  onChange={(ev) => {
                    setWorkEmail(ev.target.value);
                    clearServerError();
                    if (fieldErrors.workEmail) setFieldErrors((f) => ({ ...f, workEmail: undefined }));
                  }}
                  aria-invalid={!!fieldErrors.workEmail}
                  aria-describedby={fieldErrors.workEmail ? 'err-ts-email' : undefined}
                  className={cn(
                    inputClass,
                    fieldErrors.workEmail && fieldErrorInputClass,
                  )}
                />
                <FieldError id="err-ts-email" message={fieldErrors.workEmail} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ts-organisation">
                  Organisation (Required)
                </label>
                <input
                  id="ts-organisation"
                  name="organisation"
                  autoComplete="organization"
                  value={organisation}
                  onChange={(ev) => {
                    setOrganisation(ev.target.value);
                    clearServerError();
                    if (fieldErrors.organisation) setFieldErrors((f) => ({ ...f, organisation: undefined }));
                  }}
                  aria-invalid={!!fieldErrors.organisation}
                  aria-describedby={fieldErrors.organisation ? 'err-ts-org' : undefined}
                  className={cn(
                    inputClass,
                    fieldErrors.organisation && fieldErrorInputClass,
                  )}
                />
                <FieldError id="err-ts-org" message={fieldErrors.organisation} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ts-industry">
                  Industry (Required)
                </label>
                <select
                  id="ts-industry"
                  name="industry"
                  value={industry}
                  onChange={(ev) => {
                    setIndustry(ev.target.value);
                    clearServerError();
                    if (fieldErrors.industry) setFieldErrors((f) => ({ ...f, industry: undefined }));
                  }}
                  aria-invalid={!!fieldErrors.industry}
                  aria-describedby={fieldErrors.industry ? 'err-ts-ind' : undefined}
                  className={cn(
                    inputClass,
                    fieldErrors.industry && fieldErrorInputClass,
                  )}
                >
                  <option value="" disabled>
                    Select industry
                  </option>
                  {INDUSTRY_OPTIONS.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                <FieldError id="err-ts-ind" message={fieldErrors.industry} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ts-org-size">
                  Organisation size (Required)
                </label>
                <select
                  id="ts-org-size"
                  name="organisation_size"
                  value={orgSize}
                  onChange={(ev) => {
                    setOrgSize(ev.target.value);
                    clearServerError();
                    if (fieldErrors.orgSize) setFieldErrors((f) => ({ ...f, orgSize: undefined }));
                  }}
                  aria-invalid={!!fieldErrors.orgSize}
                  aria-describedby={fieldErrors.orgSize ? 'err-ts-size' : undefined}
                  className={cn(
                    inputClass,
                    fieldErrors.orgSize && fieldErrorInputClass,
                  )}
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  {SIZE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <FieldError id="err-ts-size" message={fieldErrors.orgSize} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ts-objective">
                  Primary objective (Required)
                </label>
                <select
                  id="ts-objective"
                  name="primary_objective"
                  value={primaryObjective}
                  onChange={(ev) => {
                    setPrimaryObjective(ev.target.value);
                    clearServerError();
                    if (fieldErrors.primaryObjective) setFieldErrors((f) => ({ ...f, primaryObjective: undefined }));
                  }}
                  aria-invalid={!!fieldErrors.primaryObjective}
                  aria-describedby={fieldErrors.primaryObjective ? 'err-ts-obj' : undefined}
                  className={cn(
                    inputClass,
                    fieldErrors.primaryObjective && fieldErrorInputClass,
                  )}
                >
                  <option value="" disabled>
                    Select your primary objective
                  </option>
                  {getPrimaryObjectivesForMode(mode).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <FieldError id="err-ts-obj" message={fieldErrors.primaryObjective} />
              </div>
              <div>
                <label className={labelClass} htmlFor="ts-notes">
                  Current constraints / notes (Optional)
                </label>
                <textarea
                  id="ts-notes"
                  name="constraints_notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${inputClass} min-h-[100px] resize-y`}
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="mb-2 font-sans text-sm font-semibold text-slate-900">Privacy Note</h3>
                <p className="font-sans text-sm leading-relaxed text-slate-600">
                  We use your responses only to generate your baseline and follow up on your request. We do not sell
                  your data.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full min-h-[3rem] items-center justify-center rounded-lg px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? S9.submitting : 'Generate Baseline Signal'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <NavySignalBand>
        <Link
          href={CTA.platforms}
          className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 font-sans text-[15px] font-semibold text-[#0B1320] transition-colors hover:bg-slate-100"
        >
          Explore platforms
        </Link>
        <Link
          href={CTA.contact}
          className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Talk to us
        </Link>
      </NavySignalBand>
    </div>
  );
}
