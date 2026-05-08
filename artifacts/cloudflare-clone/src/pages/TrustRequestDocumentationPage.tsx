import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { FieldError, fieldErrorInputClass } from '@/components/forms/FieldError';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import { APEXLN_COMPANY } from '@/lib/apexlyn-company';
import {
  HUBSPOT_FORM_IDS,
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

const ORG_TYPES = [
  'Enterprise',
  'Government agency',
  'Insurance / APRA-regulated',
  'Healthcare',
  'Legal',
  'Financial services',
  'MSP / Partner',
  'Consulting / Advisory',
  'Other',
] as const;

const PLATFORM_INTEREST = ['Track (Compliance Evidence)', 'Lens (AI Governance)', 'Both platforms'] as const;

const DOC_OPTIONS = [
  'Architecture and data flow',
  'Evidence handling and schemas',
  'Encryption and key management',
  'Tenant isolation and access control',
  'Assessment methodology',
  'Connector specifications',
  'Reporting and verification',
  'Retention and legal hold',
  'Operational controls',
  'Compliance and regulatory alignment',
  'Other (please specify in notes)',
] as const;

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" aria-hidden />
    </div>
  );
}

function DocCheck({
  id,
  label,
  checked,
  onToggle,
  onBlur,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
  onBlur?: () => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        onBlur={onBlur}
        className="mt-0.5 size-4 shrink-0 rounded border-[1.5px] border-[#D1D5DB] accent-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/30"
      />
      <span className="text-[15px] text-[#374151]">{label}</span>
    </label>
  );
}

export default function TrustRequestDocumentationPage() {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [orgType, setOrgType] = useState('');
  const [platformInterest, setPlatformInterest] = useState('');
  const [docNeeded, setDocNeeded] = useState<string[]>([]);
  const docNeededRef = useRef<string[]>([]);
  const [evalContext, setEvalContext] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    capturePosthogEvent('documentation_page_viewed', {});
  }, []);

  useEffect(() => {
    docNeededRef.current = docNeeded;
  }, [docNeeded]);

  const clearErr = (k: string) => setErrors((e) => ({ ...e, [k]: undefined }));

  function toggleDoc(label: string) {
    setDocNeeded((d) => {
      const next = d.includes(label) ? d.filter((x) => x !== label) : [...d, label];
      if (next.length > 0) {
        setErrors((e) => ({ ...e, docNeeded: undefined }));
      }
      return next;
    });
  }

  function validateField(name: string): string | undefined {
    switch (name) {
      case 'fullName':
        return fullName.trim().length >= 2 ? undefined : 'Please enter your full name';
      case 'workEmail':
        return validateWorkEmail(workEmail) ?? undefined;
      case 'phone':
        return validateOptionalPhone(phone) ?? undefined;
      case 'organisation':
        return organisation.trim().length >= 2 ? undefined : 'Please enter your organisation name';
      case 'jobTitle':
        return jobTitle.trim().length >= 2 ? undefined : 'Please enter your job title';
      case 'orgType':
        return orgType ? undefined : 'Please select your organisation type';
      case 'platformInterest':
        return platformInterest ? undefined : 'Please select which platform you are evaluating';
      case 'docNeeded':
        return docNeeded.length === 0 ? 'Please select at least one documentation type' : undefined;
      case 'evalContext':
        return evalContext.length > 1000 ? 'Message must be under 1000 characters' : undefined;
      default:
        return undefined;
    }
  }

  function onBlurField(name: string) {
    const v = validateField(name);
    setErrors((e) => ({ ...e, [name]: v }));
  }

  function onBlurDocGroup() {
    const d = docNeededRef.current;
    setErrors((e) => ({
      ...e,
      docNeeded: d.length === 0 ? 'Please select at least one documentation type' : undefined,
    }));
  }

  function validateAll(): boolean {
    const next: Record<string, string> = {};
    const keys = [
      'fullName',
      'workEmail',
      'phone',
      'organisation',
      'jobTitle',
      'orgType',
      'platformInterest',
      'docNeeded',
      'evalContext',
    ] as const;
    for (const k of keys) {
      const msg = validateField(k);
      if (msg) next[k] = msg;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(false);
    if (honeypot.trim()) return;
    if (!validateAll()) return;

    setSubmitting(true);
    const docTypes = docNeeded.join('; ');
    try {
      await submitHubSpotForm(HUBSPOT_FORM_IDS.apexlyn_documentation, [
        { name: 'full_name', value: fullName.trim() },
        { name: 'email', value: workEmail.trim() },
        { name: 'phone', value: phone.trim() },
        { name: 'organisation', value: organisation.trim() },
        { name: 'job_title', value: jobTitle.trim() },
        { name: 'org_type', value: orgType },
        { name: 'platform_interest', value: platformInterest },
        { name: 'doc_types', value: docTypes },
        { name: 'evaluation_context', value: evalContext.trim() },
      ]);
      capturePosthogEvent('documentation_form_submitted', {
        org_type: orgType,
        platform: platformInterest,
        doc_types: docTypes,
      });
      setSuccess(true);
    } catch {
      capturePosthogEvent('documentation_form_failed', { error: 'submit' });
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const inputProps = (name: string) => ({
    onBlur: () => onBlurField(name),
    onFocus: (ev: React.FocusEvent<HTMLElement>) => scrollFieldIntoView(ev.target as HTMLElement),
  });

  if (success) {
    return (
      <div className="flex flex-col bg-white">
        <section className="bg-[#0B1320] pt-12 pb-8 text-center lg:pt-20 lg:pb-12">
          <h1 className="text-[32px] font-bold text-white lg:text-[48px]">Request security documentation</h1>
        </section>
        <section className="py-16" role="status" aria-live="polite">
          <div className="mx-auto max-w-[640px] px-4 text-center sm:px-6">
            <p className="text-[20px] font-semibold text-[#1F8A70]">Your documentation request has been received.</p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#4B5563]">
              We will review your request and respond within 2 business days. Depending on the documentation requested, we
              may ask you to sign a non-disclosure agreement before providing certain materials. If you have questions in
              the meantime, contact us at{' '}
              <a className="text-[#1E3A8A] underline" href={`mailto:${APEXLN_COMPANY.email}`}>
                {APEXLN_COMPANY.email}
              </a>{' '}
              or {APEXLN_COMPANY.phone}.
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
          <h1 className="mb-4 text-[32px] font-bold leading-tight text-white lg:text-[48px]">
            Request security documentation
          </h1>
          <p className="mx-auto max-w-[640px] text-[16px] leading-[1.7] text-white/[0.85] lg:text-[18px]">
            If you are evaluating APEXLyn for an enterprise, government, insurance, or regulated-industry deployment, we
            can provide detailed security documentation under appropriate review. This includes architecture detail, data
            handling specifications, evidence schemas, assessment methodology, and operational controls beyond what is
            published in our Trust Center.
          </p>
        </div>
      </section>

      <section className="py-16 pb-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-4 lg:grid-cols-12 lg:gap-16 sm:px-6">
          <div className="lg:col-span-7">
            <div aria-live="polite" className="sr-only" id="documentation-form-status" />

            <form id="apexlyn_documentation" name="documentation_form" onSubmit={onSubmit} noValidate className="space-y-5">
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
                  Something went wrong. Please try again, or contact us directly at {APEXLN_COMPANY.email}.
                </p>
              ) : null}

              <div>
                <label className={apexFormLabelClass} htmlFor="d-name">
                  Full name <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="d-name"
                  name="full_name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    clearErr('fullName');
                  }}
                  {...inputProps('fullName')}
                  aria-required="true"
                  aria-invalid={errors.fullName ? true : undefined}
                  aria-describedby={errors.fullName ? 'err-d-n' : undefined}
                  className={cn(apexFormInputClass, errors.fullName && fieldErrorInputClass)}
                  autoComplete="name"
                />
                <FieldError id="err-d-n" message={errors.fullName} />
              </div>
              <div>
                <label className={apexFormLabelClass} htmlFor="d-email">
                  Work email address <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="d-email"
                  name="email"
                  type="email"
                  value={workEmail}
                  onChange={(e) => {
                    setWorkEmail(e.target.value);
                    clearErr('workEmail');
                  }}
                  {...inputProps('workEmail')}
                  aria-required="true"
                  aria-invalid={errors.workEmail ? true : undefined}
                  aria-describedby={errors.workEmail ? 'err-d-e' : undefined}
                  className={cn(apexFormInputClass, errors.workEmail && fieldErrorInputClass)}
                  autoComplete="email"
                />
                <FieldError id="err-d-e" message={errors.workEmail} />
              </div>
              <div>
                <label className={apexFormLabelClass} htmlFor="d-phone">
                  Phone number (optional)
                </label>
                <input
                  id="d-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearErr('phone');
                  }}
                  {...inputProps('phone')}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? 'err-d-p' : undefined}
                  className={cn(apexFormInputClass, errors.phone && fieldErrorInputClass)}
                  autoComplete="tel"
                />
                <FieldError id="err-d-p" message={errors.phone} />
              </div>
              <div>
                <label className={apexFormLabelClass} htmlFor="d-org">
                  Organisation name <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="d-org"
                  name="organisation"
                  value={organisation}
                  onChange={(e) => {
                    setOrganisation(e.target.value);
                    clearErr('organisation');
                  }}
                  {...inputProps('organisation')}
                  aria-required="true"
                  aria-invalid={errors.organisation ? true : undefined}
                  aria-describedby={errors.organisation ? 'err-d-o' : undefined}
                  className={cn(apexFormInputClass, errors.organisation && fieldErrorInputClass)}
                  autoComplete="organization"
                />
                <FieldError id="err-d-o" message={errors.organisation} />
              </div>
              <div>
                <label className={apexFormLabelClass} htmlFor="d-job">
                  Job title <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="d-job"
                  name="job_title"
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                    clearErr('jobTitle');
                  }}
                  {...inputProps('jobTitle')}
                  aria-required="true"
                  aria-invalid={errors.jobTitle ? true : undefined}
                  aria-describedby={errors.jobTitle ? 'err-d-j' : undefined}
                  className={cn(apexFormInputClass, errors.jobTitle && fieldErrorInputClass)}
                  autoComplete="organization-title"
                />
                <FieldError id="err-d-j" message={errors.jobTitle} />
              </div>
              <div>
                <label className={apexFormLabelClass} htmlFor="d-otype">
                  Organisation type <span className="text-[#D64545]">*</span>
                </label>
                <SelectWrap>
                  <select
                    id="d-otype"
                    name="organisation_type"
                    value={orgType}
                    onChange={(e) => {
                      setOrgType(e.target.value);
                      clearErr('orgType');
                    }}
                    onBlur={() => onBlurField('orgType')}
                    onFocus={(ev) => scrollFieldIntoView(ev.target as HTMLElement)}
                    aria-required="true"
                    aria-invalid={errors.orgType ? true : undefined}
                    aria-describedby={errors.orgType ? 'err-d-ot' : undefined}
                    className={cn(apexFormInputClass, 'appearance-none pr-10', errors.orgType && fieldErrorInputClass)}
                  >
                    <option value="">Select type</option>
                    {ORG_TYPES.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </SelectWrap>
                <FieldError id="err-d-ot" message={errors.orgType} />
              </div>
              <div>
                <label className={apexFormLabelClass} htmlFor="d-plat">
                  Which platform? <span className="text-[#D64545]">*</span>
                </label>
                <SelectWrap>
                  <select
                    id="d-plat"
                    name="platform_interest"
                    value={platformInterest}
                    onChange={(e) => {
                      setPlatformInterest(e.target.value);
                      clearErr('platformInterest');
                    }}
                    onBlur={() => onBlurField('platformInterest')}
                    onFocus={(ev) => scrollFieldIntoView(ev.target as HTMLElement)}
                    aria-required="true"
                    aria-invalid={errors.platformInterest ? true : undefined}
                    aria-describedby={errors.platformInterest ? 'err-d-pl' : undefined}
                    className={cn(
                      apexFormInputClass,
                      'appearance-none pr-10',
                      errors.platformInterest && fieldErrorInputClass,
                    )}
                  >
                    <option value="">Select platform</option>
                    {PLATFORM_INTEREST.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </SelectWrap>
                <FieldError id="err-d-pl" message={errors.platformInterest} />
              </div>
              <fieldset aria-describedby={errors.docNeeded ? 'err-d-doc' : undefined}>
                <legend className={cn(apexFormLabelClass, 'mb-2')}>
                  What documentation do you need? <span className="text-[#D64545]">*</span>
                </legend>
                <div className="flex flex-col gap-[10px]">
                  {DOC_OPTIONS.map((opt, i) => (
                    <DocCheck
                      key={opt}
                      id={`documentation-doc-${i}`}
                      label={opt}
                      checked={docNeeded.includes(opt)}
                      onToggle={() => toggleDoc(opt)}
                      onBlur={onBlurDocGroup}
                    />
                  ))}
                </div>
                <FieldError id="err-d-doc" message={errors.docNeeded} />
              </fieldset>
              <div>
                <label className={apexFormLabelClass} htmlFor="d-ctx">
                  Context for your evaluation (optional)
                </label>
                <textarea
                  id="d-ctx"
                  name="evaluation_context"
                  value={evalContext}
                  maxLength={1000}
                  onChange={(e) => {
                    setEvalContext(e.target.value);
                    clearErr('evalContext');
                  }}
                  {...inputProps('evalContext')}
                  aria-invalid={errors.evalContext ? true : undefined}
                  aria-describedby={errors.evalContext ? 'err-d-ctx' : undefined}
                  className={cn(apexFormTextareaClass, errors.evalContext && fieldErrorInputClass)}
                />
                <div
                  className={cn(
                    'mt-1 flex justify-end text-[12px] text-[#9CA3AF]',
                    evalContext.length >= 900 && evalContext.length <= 1000 && 'text-[#F5B700]',
                    evalContext.length > 1000 && 'text-[#D64545]',
                  )}
                >
                  {evalContext.length} / 1000
                </div>
                <FieldError id="err-d-ctx" message={errors.evalContext} />
              </div>

              <p className="text-[12px] leading-relaxed text-[#9CA3AF]">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-[#1E3A8A] underline">
                  Privacy Policy
                </Link>
                . We use the information you provide to process your documentation request and may contact you about
                relevant APEXLyn services. Documentation is provided under appropriate review and may require a
                non-disclosure agreement for certain materials.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] disabled:opacity-80 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Spinner className="text-white" />
                    Submitting...
                  </>
                ) : (
                  'Request documentation'
                )}
              </button>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <h2 className="text-[18px] font-semibold text-[#0B1320]">What we can provide</h2>
            <p className="mt-4 text-[15px] text-[#4B5563]">Available security documentation includes:</p>
            <ul className="mt-3 space-y-2 text-[15px] text-[#4B5563]">
              {[
                'Platform architecture and data flow diagrams',
                'Evidence handling and schema specifications',
                'Encryption standards and key management detail',
                'Tenant isolation architecture and RLS implementation',
                'Assessment methodology and confidence model',
                'Connector permission sets and API scope requirements',
                'Report structure and verification endpoint specification',
                'Retention profiles and legal hold architecture',
                'Operational controls, incident response, and change management',
                'Compliance framework alignment methodology',
                'Data sovereignty enforcement controls',
              ].map((line) => (
                <li key={line}>— {line}</li>
              ))}
            </ul>
            <hr className="my-8 border-[#E5E7EB]" />
            <h3 className="text-[16px] font-semibold text-[#0B1320]">Who this is for</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-[#4B5563]">
              {[
                'Enterprise IT and security teams',
                'Government procurement and security assessors',
                'Insurance and APRA-regulated institution evaluators',
                'Healthcare and legal practice compliance officers',
                'MSP and partner technical evaluators',
                'Audit firms and compliance advisors',
              ].map((line) => (
                <li key={line}>— {line}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563]">
              If you are a general visitor interested in our security posture, our{' '}
              <Link
                href="/trust"
                onClick={() => capturePosthogEvent('documentation_trust_center_link_clicked', {})}
                className="font-medium text-[#1E3A8A] underline"
              >
                Trust Center
              </Link>{' '}
              provides published technical detail that may be sufficient for your needs.
            </p>
            <hr className="my-8 border-[#E5E7EB]" />
            <h3 className="text-[16px] font-semibold text-[#0B1320]">Response time</h3>
            <p className="mt-2 text-[15px] text-[#4B5563]">
              We respond to documentation requests within 2 business days. Enterprise, government, and insurance evaluations
              are prioritised.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
