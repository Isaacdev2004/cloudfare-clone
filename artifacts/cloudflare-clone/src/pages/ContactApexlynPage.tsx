import React, { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash } from '@/components/layout/InnerPageChrome';
import { Mail } from 'lucide-react';
import { contactTopicLabel } from '@/lib/apexlyn-cta-routes';
import { FieldError, fieldErrorInputClass } from '@/components/forms/FieldError';
import { S9, isValidWorkEmail, shouldSimulateSubmitFailure } from '@/lib/apexlyn-form-copy';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[15px] text-slate-900 font-sans placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/25 focus:border-[#1E3A8A]';
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700 font-sans';

const HERO_SUBHEAD =
  'Tell us what you need to prove, what you need to protect, and what your constraints are. We will respond with a clearer path forward.';

const SUPPORT_LINE = 'Clear answers • No pressure • Built for serious operators';

type CField =
  | 'workEmail'
  | 'organisation'
  | 'role'
  | 'primaryArea'
  | 'environmentType'
  | 'currentChallenge';
type CErrors = Partial<Record<CField, string>>;

function readTopicFromSearch(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('topic');
}

function validateContact(
  workEmail: string,
  organisation: string,
  role: string,
  primaryArea: string,
  environmentType: string,
  currentChallenge: string,
): CErrors {
  const e: CErrors = {};
  const em = workEmail.trim();
  if (!em) e.workEmail = S9.emailEmpty;
  else if (!isValidWorkEmail(em)) e.workEmail = S9.emailInvalid;
  if (!organisation.trim()) e.organisation = S9.organisationEmpty;
  if (!role.trim()) e.role = S9.roleEmpty;
  if (!primaryArea.trim()) e.primaryArea = S9.primaryAreaEmpty;
  if (!environmentType.trim()) e.environmentType = S9.environmentTypeEmpty;
  if (!currentChallenge.trim()) e.currentChallenge = S9.currentChallengeEmpty;
  return e;
}

export default function ContactApexlynPage() {
  const [path] = useLocation();
  const [workEmail, setWorkEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [role, setRole] = useState('');
  const [primaryArea, setPrimaryArea] = useState('');
  const [environmentType, setEnvironmentType] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState<CErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setTopic(readTopicFromSearch());
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [path]);

  const topicLine = contactTopicLabel(topic);

  function clearField(field: CField) {
    setFieldErrors((f) => ({ ...f, [field]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(false);
    const errors = validateContact(workEmail, organisation, role, primaryArea, environmentType, currentChallenge);
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
              <Mail className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
            </div>
            <PageHero
              variant="light"
              eyebrow="Contact"
              title="Start a Strategic Conversation"
              description={HERO_SUBHEAD}
              className="min-w-0 flex-1 bg-transparent"
              contentClassName="py-0 sm:py-0 max-w-3xl"
            />
          </div>
        </section>
        <div className="relative overflow-hidden py-12 md:py-16">
          <SectionGridWash />
          <div className="relative z-[1] mx-auto max-w-[560px] px-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 text-center font-sans text-[15px] leading-relaxed text-slate-700 shadow-lg"
              role="status"
            >
              {S9.submitSuccess}
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-16 sm:flex-row sm:items-start sm:py-20 lg:py-24">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex">
            <Mail className="h-7 w-7 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1 max-w-3xl">
            <PageHero
              variant="light"
              eyebrow="Contact"
              title="Start a Strategic Conversation"
              description={HERO_SUBHEAD}
              className="bg-transparent"
              contentClassName="py-0 sm:py-0"
            />
            <p className="mt-6 font-sans text-sm font-medium tracking-wide text-slate-600 sm:text-[15px]">{SUPPORT_LINE}</p>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden py-12 md:py-16">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[560px] px-6">
          {topicLine ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-6 rounded-lg border border-[#1E3A8A]/20 bg-[#1E3A8A]/[0.05] px-4 py-3 text-center"
              role="status"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">Request context</p>
              <p className="mt-1 text-[15px] font-medium text-slate-800">{topicLine}</p>
            </motion.div>
          ) : null}

          {serverError ? (
            <p
              className="mb-5 rounded-lg border border-[#D64545]/30 bg-[#D64545]/[0.06] px-4 py-3 text-center font-sans text-[15px] leading-relaxed text-slate-800"
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
            className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.18)]"
            aria-labelledby="contact-form-title"
          >
            {topic ? <input type="hidden" name="topic" value={topic} /> : null}
            <h2 id="contact-form-title" className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Secure Inquiry
            </h2>

            <div>
              <label className={labelClass} htmlFor="contact-email">
                Work email (Required)
              </label>
              <input
                id="contact-email"
                name="work_email"
                type="email"
                autoComplete="email"
                value={workEmail}
                onChange={(ev) => {
                  setWorkEmail(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.workEmail) clearField('workEmail');
                }}
                aria-invalid={!!fieldErrors.workEmail}
                aria-describedby={fieldErrors.workEmail ? 'err-c-email' : undefined}
                className={cn(inputClass, fieldErrors.workEmail && fieldErrorInputClass)}
              />
              <FieldError id="err-c-email" message={fieldErrors.workEmail} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-organisation">
                Organisation (Required)
              </label>
              <input
                id="contact-organisation"
                name="organisation"
                autoComplete="organization"
                value={organisation}
                onChange={(ev) => {
                  setOrganisation(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.organisation) clearField('organisation');
                }}
                aria-invalid={!!fieldErrors.organisation}
                aria-describedby={fieldErrors.organisation ? 'err-c-org' : undefined}
                className={cn(inputClass, fieldErrors.organisation && fieldErrorInputClass)}
              />
              <FieldError id="err-c-org" message={fieldErrors.organisation} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-role">
                Role (Required)
              </label>
              <input
                id="contact-role"
                name="role"
                autoComplete="organization-title"
                value={role}
                onChange={(ev) => {
                  setRole(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.role) clearField('role');
                }}
                aria-invalid={!!fieldErrors.role}
                aria-describedby={fieldErrors.role ? 'err-c-role' : undefined}
                className={cn(inputClass, fieldErrors.role && fieldErrorInputClass)}
              />
              <FieldError id="err-c-role" message={fieldErrors.role} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-primary-area">
                Primary area of interest (Required)
              </label>
              <textarea
                id="contact-primary-area"
                name="primary_area_of_interest"
                value={primaryArea}
                onChange={(ev) => {
                  setPrimaryArea(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.primaryArea) clearField('primaryArea');
                }}
                rows={3}
                aria-invalid={!!fieldErrors.primaryArea}
                aria-describedby={fieldErrors.primaryArea ? 'err-c-area' : undefined}
                className={cn(`${inputClass} min-h-[88px] resize-y`, fieldErrors.primaryArea && fieldErrorInputClass)}
                placeholder="e.g. Track, Lens, services, compliance, partner programme…"
              />
              <FieldError id="err-c-area" message={fieldErrors.primaryArea} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-environment">
                Environment type (Required)
              </label>
              <input
                id="contact-environment"
                name="environment_type"
                value={environmentType}
                onChange={(ev) => {
                  setEnvironmentType(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.environmentType) clearField('environmentType');
                }}
                placeholder="e.g. regulated, enterprise, mid-market, government…"
                aria-invalid={!!fieldErrors.environmentType}
                aria-describedby={fieldErrors.environmentType ? 'err-c-env' : undefined}
                className={cn(inputClass, fieldErrors.environmentType && fieldErrorInputClass)}
              />
              <FieldError id="err-c-env" message={fieldErrors.environmentType} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-challenge">
                Current challenge (Required)
              </label>
              <textarea
                id="contact-challenge"
                name="current_challenge"
                value={currentChallenge}
                onChange={(ev) => {
                  setCurrentChallenge(ev.target.value);
                  setServerError(false);
                  if (fieldErrors.currentChallenge) clearField('currentChallenge');
                }}
                rows={4}
                aria-invalid={!!fieldErrors.currentChallenge}
                aria-describedby={fieldErrors.currentChallenge ? 'err-c-challenge' : undefined}
                className={cn(`${inputClass} min-h-[120px] resize-y`, fieldErrors.currentChallenge && fieldErrorInputClass)}
              />
              <FieldError id="err-c-challenge" message={fieldErrors.currentChallenge} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-notes">
                Notes
              </label>
              <textarea
                id="contact-notes"
                name="notes"
                value={notes}
                onChange={(ev) => {
                  setNotes(ev.target.value);
                  setServerError(false);
                }}
                placeholder="Optional — timeline, confidentiality, or other context"
                className={cn(inputClass, 'min-h-[100px] resize-y')}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[3rem] rounded-lg px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? S9.submitting : 'Send a Secure Inquiry'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
