import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { FieldError, fieldErrorInputClass } from '@/components/forms/FieldError';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { APEXLN_COMPANY } from '@/lib/apexlyn-company';
import {
  HUBSPOT_FORM_IDS,
  isFreeEmailDomain,
  apexFormInputClass,
  apexFormLabelClass,
  apexFormTextareaClass,
  honeypotInputClass,
  scrollFieldIntoView,
  submitHubSpotForm,
  validateMinLength,
  validateOptionalPhone,
  validateWorkEmail,
} from '@/lib/apexlyn-form-shared';
import { cn } from '@/lib/utils';

const INDUSTRIES = [
  'Healthcare',
  'Legal',
  'Accounting & Finance',
  'Insurance',
  'Professional Services',
  'Government',
  'Education',
  'Retail',
  'Technology',
  'Other',
] as const;

const SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+'] as const;

const COMPLIANCE = [
  'We have cyber insurance',
  'We are assessed against Essential Eight',
  'We have ISO 27001 certification',
  'We report to APRA',
  'We handle health records',
  'We are a government entity',
  'None of these',
  'Not sure',
] as const;

const CLOUDS = ['AWS', 'Microsoft Azure', 'Google Cloud', 'None', 'Other'] as const;

const SECURITY_TOOLS = [
  'Endpoint protection (CrowdStrike, Defender, SentinelOne, etc.)',
  'SIEM (Sentinel, Splunk, etc.)',
  'Backup software (Veeam, Datto, Acronis, etc.)',
  'SASE / web proxy (Zscaler, Netskope, etc.)',
  'None of these',
  'Not sure',
] as const;

const ENV_TYPES = ['Microsoft 365', 'Google Workspace', 'Hybrid (both)', 'Other'] as const;

const AI_TOOLS = [
  'Yes, with governance in place',
  'Yes, without governance',
  'Not sure',
  'No',
] as const;

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" aria-hidden />
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 rounded border-[1.5px] border-[#D1D5DB] text-[#1E3A8A] focus:ring-[#1E3A8A]"
      />
      <span className="text-[15px] text-[#374151]">{label}</span>
    </label>
  );
}

export default function TestSecurityStatePage() {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [orgSize, setOrgSize] = useState('');
  const [compliance, setCompliance] = useState<string[]>([]);
  const [envType, setEnvType] = useState('');
  const [clouds, setClouds] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [aiUse, setAiUse] = useState('');
  const [concern, setConcern] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const seenSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    capturePosthogEvent('baseline_page_viewed', {});
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id.replace('baseline-section-', '');
          if (!id || seenSections.current.has(id)) continue;
          seenSections.current.add(id);
          capturePosthogEvent('baseline_form_section_reached', {
            section: id as 'details' | 'organisation' | 'environment',
          });
        }
      },
      { threshold: 0.2 },
    );
    ['baseline-section-details', 'baseline-section-organisation', 'baseline-section-environment'].forEach((sid) => {
      const el = document.getElementById(sid);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const clearErr = (k: string) => setErrors((e) => ({ ...e, [k]: undefined }));

  function toggleArr(arr: string[], value: string, setFn: (v: string[]) => void) {
    setFn(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
  }

  function validateAll(): boolean {
    const next: Record<string, string> = {};
    if (fullName.trim().length < 2) next.fullName = 'Please enter your full name';
    const em = validateWorkEmail(workEmail);
    if (em) next.workEmail = em;
    const ph = validateOptionalPhone(phone);
    if (ph) next.phone = ph;
    if (organisation.trim().length < 2) next.organisation = 'Please enter your organisation name';
    if (!industry) next.industry = 'Please select your industry';
    if (!orgSize) next.orgSize = 'Please select your organisation size';
    if (!envType) next.envType = 'Please select your primary environment';
    if (concern.length > 1000) next.concern = 'Message must be under 1000 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(false);
    if (honeypot.trim()) return;
    if (!validateAll()) return;

    setSubmitting(true);
    try {
      await submitHubSpotForm(HUBSPOT_FORM_IDS.apexlyn_baseline, [
        { name: 'full_name', value: fullName.trim() },
        { name: 'email', value: workEmail.trim() },
        { name: 'phone', value: phone.trim() },
        { name: 'organisation', value: organisation.trim() },
        { name: 'job_title', value: jobTitle.trim() },
        { name: 'industry', value: industry },
        { name: 'org_size', value: orgSize },
        { name: 'current_compliance', value: compliance.join('; ') },
        { name: 'environment_type', value: envType },
        { name: 'cloud_platforms', value: clouds.join('; ') },
        { name: 'security_tools', value: tools.join('; ') },
        { name: 'ai_tools', value: aiUse },
        { name: 'primary_concern', value: concern.trim() },
      ]);
      capturePosthogEvent('baseline_form_submitted', {
        industry,
        org_size: orgSize,
        environment: envType,
      });
      setSuccess(true);
    } catch {
      capturePosthogEvent('baseline_form_failed', { error: 'submit' });
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const focusProps = (field: string) => ({
    onFocus: (ev: React.FocusEvent<HTMLElement>) => {
      capturePosthogEvent('baseline_form_field_focused', { field });
      scrollFieldIntoView(ev.target as HTMLElement);
    },
  });

  if (success) {
    return (
      <div className="flex flex-col bg-white">
        <section className="bg-[#0B1320] pt-12 pb-8 text-center lg:pt-20 lg:pb-12">
          <h1 className="text-[32px] font-bold text-white lg:text-[48px]">Test your security state</h1>
        </section>
        <section className="py-16" role="status" aria-live="polite">
          <div className="mx-auto max-w-[640px] px-4 sm:px-6">
            <p className="text-center text-[20px] font-semibold text-[#1F8A70]">
              Your baseline assessment request has been received.
            </p>
            <p className="mt-4 text-center text-[16px] leading-relaxed text-[#4B5563]">
              Our team will review your inputs and prepare a structured baseline assessment for your organisation. You
              will receive your baseline at the email address you provided within 3 business days. If you have questions in
              the meantime, contact us at{' '}
              <a className="text-[#1E3A8A] underline" href={`mailto:${APEXLN_COMPANY.email}`}>
                {APEXLN_COMPANY.email}
              </a>{' '}
              or {APEXLN_COMPANY.phone}.
            </p>
            <h2 className="mt-10 text-[16px] font-semibold text-[#0B1320]">What to expect:</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[#4B5563]">
              Your baseline assessment will show where your security evidence posture is strong and where the gaps are. It
              is not a sales pitch — it is a structured, honest picture of where you stand today.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#0B1320] pt-12 pb-8 text-center lg:pt-20 lg:pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h1 className="mb-4 text-[32px] font-bold leading-tight text-white lg:text-[48px]">Test your security state</h1>
          <p className="mx-auto max-w-[600px] text-[16px] leading-[1.7] text-white/[0.85] lg:text-[18px]">
            Answer a few questions about your organisation and security environment. Our team reviews your inputs and
            delivers a structured baseline assessment showing where your evidence posture is strong and where the gaps are.
          </p>
          <p className="mt-4 text-[14px] font-medium text-white/60">
            5 minutes to complete · Reviewed by our team · Baseline delivered within 3 business days
          </p>
        </div>
      </section>

      <section className="py-16 pb-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-4 lg:grid-cols-12 lg:gap-16 sm:px-6">
          <div className="lg:col-span-7">
            <form id="apexlyn_baseline" name="baseline_form" onSubmit={onSubmit} noValidate className="space-y-6">
              <input
                type="text"
                name="website_url"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                className={honeypotInputClass}
                aria-hidden
              />

              {serverError ? (
                <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[14px] text-[#D64545]" role="alert">
                  Something went wrong submitting your request. Please try again, or contact us directly at{' '}
                  {APEXLN_COMPANY.email}.
                </p>
              ) : null}

              <div id="baseline-section-details" className="space-y-5 scroll-mt-24">
                <h2 className="text-[18px] font-semibold text-[#0B1320]">Your details</h2>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-name">
                    Full name <span className="text-[#D64545]">*</span>
                  </label>
                  <input
                    id="b-name"
                    name="full_name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      clearErr('fullName');
                    }}
                    onBlur={() => setErrors((e) => ({ ...e, fullName: validateMinLength(fullName, 2, 'x') ?? undefined }))}
                    {...focusProps('fullName')}
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'err-b-n' : undefined}
                    className={cn(apexFormInputClass, errors.fullName && fieldErrorInputClass)}
                    autoComplete="name"
                  />
                  <FieldError id="err-b-n" message={errors.fullName} />
                </div>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-email">
                    Work email address <span className="text-[#D64545]">*</span>
                  </label>
                  <input
                    id="b-email"
                    name="email"
                    type="email"
                    value={workEmail}
                    onChange={(e) => {
                      setWorkEmail(e.target.value);
                      clearErr('workEmail');
                    }}
                    onBlur={() => {
                      const err = validateWorkEmail(workEmail);
                      setErrors((e) => ({ ...e, workEmail: err ?? undefined }));
                      if (workEmail.trim() && isFreeEmailDomain(workEmail)) {
                        capturePosthogEvent('baseline_email_validation_failed', {});
                      }
                    }}
                    {...focusProps('email')}
                    aria-required="true"
                    aria-invalid={!!errors.workEmail}
                    aria-describedby={errors.workEmail ? 'err-b-e' : undefined}
                    className={cn(apexFormInputClass, errors.workEmail && fieldErrorInputClass)}
                    autoComplete="email"
                  />
                  <FieldError id="err-b-e" message={errors.workEmail} />
                </div>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-phone">
                    Phone number (optional)
                  </label>
                  <input
                    id="b-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearErr('phone');
                    }}
                    onBlur={() => setErrors((e) => ({ ...e, phone: validateOptionalPhone(phone) ?? undefined }))}
                    {...focusProps('phone')}
                    className={cn(apexFormInputClass, errors.phone && fieldErrorInputClass)}
                    autoComplete="tel"
                  />
                  <FieldError id="err-b-p" message={errors.phone} />
                </div>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-org">
                    Organisation name <span className="text-[#D64545]">*</span>
                  </label>
                  <input
                    id="b-org"
                    name="organisation"
                    value={organisation}
                    onChange={(e) => {
                      setOrganisation(e.target.value);
                      clearErr('organisation');
                    }}
                    onBlur={() =>
                      setErrors((e) => ({ ...e, organisation: validateMinLength(organisation, 2, 'x') ?? undefined }))
                    }
                    {...focusProps('organisation')}
                    aria-required="true"
                    className={cn(apexFormInputClass, errors.organisation && fieldErrorInputClass)}
                    autoComplete="organization"
                  />
                  <FieldError id="err-b-o" message={errors.organisation} />
                </div>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-role">
                    Your role (optional)
                  </label>
                  <input
                    id="b-role"
                    name="job_title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    {...focusProps('jobTitle')}
                    className={apexFormInputClass}
                    autoComplete="organization-title"
                  />
                </div>
              </div>

              <div id="baseline-section-organisation" className="scroll-mt-24 space-y-5 border-t border-[#E5E7EB] pt-8">
                <h2 className="text-[18px] font-semibold text-[#0B1320]">About your organisation</h2>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-ind">
                    Primary industry <span className="text-[#D64545]">*</span>
                  </label>
                  <SelectWrap>
                    <select
                      id="b-ind"
                      name="industry"
                      value={industry}
                      onChange={(e) => {
                        setIndustry(e.target.value);
                        clearErr('industry');
                      }}
                      {...focusProps('industry')}
                      aria-required="true"
                      className={cn(apexFormInputClass, 'appearance-none pr-10', errors.industry && fieldErrorInputClass)}
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </SelectWrap>
                  <FieldError id="err-b-i" message={errors.industry} />
                </div>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-size">
                    Organisation size (employees) <span className="text-[#D64545]">*</span>
                  </label>
                  <SelectWrap>
                    <select
                      id="b-size"
                      name="organisation_size"
                      value={orgSize}
                      onChange={(e) => {
                        setOrgSize(e.target.value);
                        clearErr('orgSize');
                      }}
                      {...focusProps('orgSize')}
                      aria-required="true"
                      className={cn(apexFormInputClass, 'appearance-none pr-10', errors.orgSize && fieldErrorInputClass)}
                    >
                      <option value="">Select size</option>
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </SelectWrap>
                  <FieldError id="err-b-s" message={errors.orgSize} />
                </div>
                <fieldset>
                  <legend className={cn(apexFormLabelClass, 'mb-2')}>
                    Which of these apply to your organisation? (select all that apply)
                  </legend>
                  <div className="flex flex-col gap-2.5">
                    {COMPLIANCE.map((c) => (
                      <CheckRow
                        key={c}
                        id={`comp-${c}`}
                        label={c}
                        checked={compliance.includes(c)}
                        onChange={() => toggleArr(compliance, c, setCompliance)}
                      />
                    ))}
                  </div>
                </fieldset>
              </div>

              <div id="baseline-section-environment" className="scroll-mt-24 space-y-5 border-t border-[#E5E7EB] pt-8">
                <h2 className="text-[18px] font-semibold text-[#0B1320]">Your security environment</h2>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-env">
                    Primary environment <span className="text-[#D64545]">*</span>
                  </label>
                  <SelectWrap>
                    <select
                      id="b-env"
                      name="environment_type"
                      value={envType}
                      onChange={(e) => {
                        setEnvType(e.target.value);
                        clearErr('envType');
                      }}
                      {...focusProps('environment_type')}
                      aria-required="true"
                      className={cn(apexFormInputClass, 'appearance-none pr-10', errors.envType && fieldErrorInputClass)}
                    >
                      <option value="">Select environment</option>
                      {ENV_TYPES.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </SelectWrap>
                  <FieldError id="err-b-env" message={errors.envType} />
                </div>
                <fieldset>
                  <legend className={cn(apexFormLabelClass, 'mb-2')}>Cloud platforms used (select all that apply)</legend>
                  <div className="flex flex-col gap-2.5">
                    {CLOUDS.map((c) => (
                      <CheckRow
                        key={c}
                        id={`cloud-${c}`}
                        label={c}
                        checked={clouds.includes(c)}
                        onChange={() => toggleArr(clouds, c, setClouds)}
                      />
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={cn(apexFormLabelClass, 'mb-2')}>Current security tools (select all that apply)</legend>
                  <div className="flex flex-col gap-2.5">
                    {SECURITY_TOOLS.map((c) => (
                      <CheckRow
                        key={c}
                        id={`tool-${c.slice(0, 24)}`}
                        label={c}
                        checked={tools.includes(c)}
                        onChange={() => toggleArr(tools, c, setTools)}
                      />
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-ai">
                    Are employees using AI tools?
                  </label>
                  <SelectWrap>
                    <select
                      id="b-ai"
                      name="ai_tools"
                      value={aiUse}
                      onChange={(e) => setAiUse(e.target.value)}
                      {...focusProps('ai_tools')}
                      className={cn(apexFormInputClass, 'appearance-none pr-10')}
                    >
                      <option value="">Select</option>
                      {AI_TOOLS.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </SelectWrap>
                </div>
                <div>
                  <label className={apexFormLabelClass} htmlFor="b-concern">
                    What is your main security or compliance concern right now? (optional)
                  </label>
                  <textarea
                    id="b-concern"
                    name="primary_concern"
                    value={concern}
                    maxLength={1000}
                    onChange={(e) => {
                      setConcern(e.target.value);
                      clearErr('concern');
                    }}
                    {...focusProps('primary_concern')}
                    className={cn(apexFormTextareaClass, errors.concern && fieldErrorInputClass)}
                  />
                  <div
                    className={cn(
                      'mt-1 flex justify-end text-[12px] text-[#9CA3AF]',
                      concern.length >= 900 && concern.length <= 1000 && 'text-[#F5B700]',
                      concern.length > 1000 && 'text-[#D64545]',
                    )}
                  >
                    {concern.length} / 1000
                  </div>
                  <FieldError id="err-b-c" message={errors.concern} />
                </div>
              </div>

              <p className="text-[12px] leading-relaxed text-[#9CA3AF]">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-[#1E3A8A] underline">
                  Privacy Policy
                </Link>
                . We use the information you provide to prepare your baseline assessment and may contact you about
                relevant APEXLyn services. We do not share your information with third parties.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white hover:bg-[#172E73] disabled:opacity-80"
              >
                {submitting ? (
                  <>
                    <Spinner className="text-white" />
                    Submitting...
                  </>
                ) : (
                  'Request your baseline assessment'
                )}
              </button>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <h2 className="text-[18px] font-semibold text-[#0B1320]">What you will receive</h2>
            <p className="mt-4 text-[15px] font-normal leading-relaxed text-[#4B5563]">A structured baseline assessment showing:</p>
            <ul className="mt-3 space-y-2 text-[15px] text-[#4B5563]">
              {[
                'Which compliance frameworks are relevant to your organisation',
                'Where your current evidence collection is strong',
                'Where the gaps are in your evidence posture',
                'What your insurer or auditor would see if they reviewed your posture today',
                'Recommended next steps based on your environment',
              ].map((line) => (
                <li key={line}>— {line}</li>
              ))}
            </ul>
            <hr className="my-8 border-[#E5E7EB]" />
            <h3 className="text-[16px] font-semibold text-[#0B1320]">No obligation</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4B5563]">
              This is not a sales exercise. If your organisation is in good shape, we will tell you. If there are gaps, we
              will show you exactly where they are and what would close them. The baseline assessment is provided at no
              cost and with no obligation.
            </p>
            <hr className="my-8 border-[#E5E7EB]" />
            <h3 className="text-[16px] font-semibold text-[#0B1320]">Who reviews your inputs</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4B5563]">
              Your baseline is reviewed by the APEXLyn team — not by an automated tool. We assess your inputs against the
              compliance frameworks relevant to your industry, your environment, and your obligations.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
