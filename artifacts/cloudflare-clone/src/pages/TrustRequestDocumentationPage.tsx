import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash, NavySignalBand } from '@/components/layout/InnerPageChrome';
import { FileKey } from 'lucide-react';
import { CTA } from '@/lib/apexlyn-cta-routes';
import { FieldError, fieldErrorInputClass } from '@/components/forms/FieldError';
import { S9, isValidWorkEmail, shouldSimulateSubmitFailure } from '@/lib/apexlyn-form-copy';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[15px] text-slate-900 font-sans placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/25 focus:border-[#1E3A8A]';
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700 font-sans';
const HERO_SUBHEAD =
  'For serious evaluation processes, we can provide security and trust documentation through the appropriate review path.';
const INTRO_BODY =
  'If you are evaluating APEXLyn for a serious operating environment, use this request path to access relevant security and trust materials. Availability may depend on your stage, environment, and review need.';

type DocField = 'workEmail' | 'organisation' | 'role' | 'reviewObjective' | 'environmentType';
type DocErrors = Partial<Record<DocField, string>>;

function validateDocForm(
  workEmail: string,
  organisation: string,
  role: string,
  reviewObjective: string,
  environmentType: string,
): DocErrors {
  const e: DocErrors = {};
  const em = workEmail.trim();
  if (!em) e.workEmail = S9.emailEmpty;
  else if (!isValidWorkEmail(em)) e.workEmail = S9.emailInvalid;
  if (!organisation.trim()) e.organisation = S9.organisationEmpty;
  if (!role.trim()) e.role = S9.roleEmpty;
  if (!reviewObjective.trim()) e.reviewObjective = S9.reviewObjectiveEmpty;
  if (!environmentType.trim()) e.environmentType = S9.environmentTypeEmpty;
  return e;
}

export default function TrustRequestDocumentationPage() {
  const [workEmail, setWorkEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [role, setRole] = useState('');
  const [reviewObjective, setReviewObjective] = useState('');
  const [environmentType, setEnvironmentType] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<DocErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  function clearError(field: DocField) {
    setFieldErrors((f) => ({ ...f, [field]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(false);
    const errors = validateDocForm(workEmail, organisation, role, reviewObjective, environmentType);
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
          <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-16 sm:py-20 lg:py-24">
            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex" aria-hidden>
              <FileKey className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
            </div>
            <PageHero
              variant="light"
              eyebrow="Trust Center"
              title="Request Security Documentation"
              description={HERO_SUBHEAD}
              className="min-w-0 flex-1 bg-transparent"
              contentClassName="py-0 sm:py-0 max-w-3xl"
            />
          </div>
        </section>
        <div className="relative overflow-hidden py-12 md:py-16">
          <SectionGridWash />
          <div className="relative z-[1] mx-auto max-w-[640px] px-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 text-center font-sans text-[15px] leading-relaxed text-slate-700 shadow-lg"
              role="status"
            >
              {S9.submitSuccess}
            </motion.p>
            <Link
              href="/trust-center"
              className="mt-8 block text-center text-sm font-semibold text-[#1E3A8A] underline-offset-2 hover:underline"
            >
              Back to Trust Center
            </Link>
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
            href={CTA.architectureOverview}
            className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Architecture
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
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex">
            <FileKey className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
          <PageHero
            variant="light"
            eyebrow="Trust Center"
            title="Request Security Documentation"
            description={HERO_SUBHEAD}
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
            className="mb-8 font-sans text-[15px] leading-relaxed text-slate-600"
          >
            <p>{INTRO_BODY}</p>
          </motion.div>

          {serverError ? (
            <p
              className="mb-5 rounded-lg border border-[#D64545]/30 bg-[#D64545]/[0.06] px-4 py-3 font-sans text-[15px] leading-relaxed text-slate-800"
              role="alert"
            >
              {S9.submitFailed}
            </p>
          ) : null}

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            noValidate
            onSubmit={onSubmit}
            className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.18)] sm:p-10 space-y-5"
            aria-describedby="doc-form-summary"
          >
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl" id="doc-form-title">
              Security Documentation Request
            </h2>
            <p className="text-[15px] leading-relaxed text-slate-600" id="doc-form-summary">
              Tell us about your environment, review objective, and timeline so we can respond through the right path.
            </p>

            <div>
              <label className={labelClass} htmlFor="doc-work-email">
                Work email (Required)
              </label>
              <input
                id="doc-work-email"
                name="work_email"
                type="email"
                autoComplete="email"
                value={workEmail}
                onChange={(ev) => {
                  setWorkEmail(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.workEmail) clearError('workEmail');
                }}
                aria-invalid={!!fieldErrors.workEmail}
                aria-describedby={fieldErrors.workEmail ? 'err-doc-email' : undefined}
                className={cn(inputClass, fieldErrors.workEmail && fieldErrorInputClass)}
              />
              <FieldError id="err-doc-email" message={fieldErrors.workEmail} />
            </div>
            <div>
              <label className={labelClass} htmlFor="doc-organisation">
                Organisation (Required)
              </label>
              <input
                id="doc-organisation"
                name="organisation"
                autoComplete="organization"
                value={organisation}
                onChange={(ev) => {
                  setOrganisation(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.organisation) clearError('organisation');
                }}
                aria-invalid={!!fieldErrors.organisation}
                aria-describedby={fieldErrors.organisation ? 'err-doc-org' : undefined}
                className={cn(inputClass, fieldErrors.organisation && fieldErrorInputClass)}
              />
              <FieldError id="err-doc-org" message={fieldErrors.organisation} />
            </div>
            <div>
              <label className={labelClass} htmlFor="doc-role">
                Role (Required)
              </label>
              <input
                id="doc-role"
                name="role"
                autoComplete="organization-title"
                value={role}
                onChange={(ev) => {
                  setRole(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.role) clearError('role');
                }}
                aria-invalid={!!fieldErrors.role}
                aria-describedby={fieldErrors.role ? 'err-doc-role' : undefined}
                className={cn(inputClass, fieldErrors.role && fieldErrorInputClass)}
              />
              <FieldError id="err-doc-role" message={fieldErrors.role} />
            </div>
            <div>
              <label className={labelClass} htmlFor="doc-review-objective">
                Review objective (Required)
              </label>
              <textarea
                id="doc-review-objective"
                name="review_objective"
                value={reviewObjective}
                onChange={(ev) => {
                  setReviewObjective(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.reviewObjective) clearError('reviewObjective');
                }}
                rows={3}
                aria-invalid={!!fieldErrors.reviewObjective}
                aria-describedby={fieldErrors.reviewObjective ? 'err-doc-objective' : undefined}
                className={cn(`${inputClass} min-h-[88px] resize-y`, fieldErrors.reviewObjective && fieldErrorInputClass)}
              />
              <FieldError id="err-doc-objective" message={fieldErrors.reviewObjective} />
            </div>
            <div>
              <label className={labelClass} htmlFor="doc-environment-type">
                Environment type (Required)
              </label>
              <input
                id="doc-environment-type"
                name="environment_type"
                value={environmentType}
                onChange={(ev) => {
                  setEnvironmentType(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.environmentType) clearError('environmentType');
                }}
                placeholder="e.g. regulated, enterprise, government, partner…"
                aria-invalid={!!fieldErrors.environmentType}
                aria-describedby={fieldErrors.environmentType ? 'err-doc-env' : undefined}
                className={cn(inputClass, fieldErrors.environmentType && fieldErrorInputClass)}
              />
              <FieldError id="err-doc-env" message={fieldErrors.environmentType} />
            </div>
            <div>
              <label className={labelClass} htmlFor="doc-notes">
                Notes
              </label>
              <textarea
                id="doc-notes"
                name="notes"
                value={notes}
                onChange={(ev) => {
                  setNotes(ev.target.value);
                  setServerError(false);
                }}
                placeholder="Optional — timeline, confidentiality, preferred channel, or other context"
                className={cn(inputClass, 'min-h-[120px] resize-y')}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full min-h-[3rem] items-center justify-center rounded-lg bg-[#1E3A8A] px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[#172554] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? S9.submitting : 'Request Documentation'}
            </button>
          </motion.form>
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
          href={CTA.architectureOverview}
          className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Architecture
        </Link>
      </NavySignalBand>
    </div>
  );
}
