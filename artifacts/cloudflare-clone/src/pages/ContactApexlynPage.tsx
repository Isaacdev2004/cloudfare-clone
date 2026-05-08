import React, { FormEvent, useEffect, useState } from 'react';
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
  isFreeEmailDomain,
  scrollFieldIntoView,
  submitHubSpotForm,
  validateMinLength,
  validateOptionalPhone,
  validateWorkEmail,
} from '@/lib/apexlyn-form-shared';
import { cn } from '@/lib/utils';

const INQUIRY_OPTIONS = [
  'Compliance evidence (Track)',
  'AI governance (Lens)',
  'Both platforms',
  'MSP / Partner inquiry',
  'Enterprise or government inquiry',
  'Insurance / underwriting inquiry',
  'General inquiry',
] as const;

function SelectChevronWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
        aria-hidden
      />
    </div>
  );
}

export default function ContactApexlynPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    capturePosthogEvent('contact_page_viewed', {});
  }, []);

  const clearErr = (k: string) => setErrors((e) => ({ ...e, [k]: undefined }));

  function validateField(name: string, value?: string): string | undefined {
    switch (name) {
      case 'firstName':
        return firstName.trim().length >= 2 ? undefined : 'Please enter your first name';
      case 'lastName':
        return lastName.trim().length >= 2 ? undefined : 'Please enter your last name';
      case 'workEmail': {
        const err = validateWorkEmail(workEmail);
        return err ?? undefined;
      }
      case 'phone':
        return validateOptionalPhone(phone) ?? undefined;
      case 'organisation':
        return organisation.trim().length >= 2 ? undefined : 'Please enter your organisation name';
      case 'jobTitle':
        return jobTitle.trim().length > 100 ? 'Job title must be under 100 characters' : undefined;
      case 'inquiryType':
        return inquiryType ? undefined : 'Please select what your inquiry is about';
      case 'message':
        if (message.length > 2000) return 'Message must be under 2000 characters';
        return undefined;
      default:
        return undefined;
    }
  }

  function onBlurField(name: string) {
    const v = validateField(name);
    if (name === 'workEmail' && workEmail.trim() && isFreeEmailDomain(workEmail)) {
      capturePosthogEvent('contact_email_validation_failed', {});
    }
    setErrors((e) => ({ ...e, [name]: v }));
  }

  function validateAll(): boolean {
    const next: Record<string, string> = {};
    const pairs: [string, string][] = [
      ['firstName', 'firstName'],
      ['lastName', 'lastName'],
      ['workEmail', 'workEmail'],
      ['phone', 'phone'],
      ['organisation', 'organisation'],
      ['inquiryType', 'inquiryType'],
      ['message', 'message'],
    ];
    for (const [, key] of pairs) {
      const msg = validateField(key);
      if (msg) next[key] = msg;
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
    try {
      await submitHubSpotForm(HUBSPOT_FORM_IDS.apexlyn_contact, [
        { name: 'first_name', value: firstName.trim() },
        { name: 'last_name', value: lastName.trim() },
        { name: 'email', value: workEmail.trim() },
        { name: 'phone', value: phone.trim() },
        { name: 'organisation', value: organisation.trim() },
        { name: 'job_title', value: jobTitle.trim() },
        { name: 'inquiry_type', value: inquiryType },
        { name: 'message', value: message.trim() },
      ]);
      capturePosthogEvent('contact_form_submitted', { inquiry_type: inquiryType });
      setSuccess(true);
    } catch {
      capturePosthogEvent('contact_form_failed', { error: 'submit' });
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col bg-white">
        <section className="bg-[#0B1320] pt-12 pb-8 text-center lg:pt-20 lg:pb-12">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <h1 className="text-[32px] font-bold leading-tight text-white lg:text-[48px]">Start a conversation</h1>
          </div>
        </section>
        <section className="py-16" role="status" aria-live="polite">
          <div className="mx-auto max-w-[560px] px-4 text-center sm:px-6">
            <p className="text-[17px] font-normal leading-relaxed text-[#1F8A70]">Thank you. We have received your message.</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563]">
              We will respond within one business day to the email address you provided. If your inquiry is urgent, you can
              reach us directly at{' '}
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

  const inputProps = (name: string) => ({
    onBlur: () => onBlurField(name),
    onFocus: (ev: React.FocusEvent<HTMLElement>) => {
      capturePosthogEvent('contact_form_field_focused', { field: name });
      scrollFieldIntoView(ev.target as HTMLElement);
    },
  });

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#0B1320] pt-12 pb-8 text-center lg:pt-20 lg:pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h1 className="mb-4 text-[32px] font-bold leading-tight text-white lg:text-[48px]">Start a conversation</h1>
          <p className="mx-auto max-w-[540px] text-[16px] leading-[1.7] text-white/[0.85] lg:text-[18px]">
            Tell us about your organisation and what you are looking for. We will respond within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 pb-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-4 lg:grid-cols-12 lg:gap-16 sm:px-6">
          <div className="lg:col-span-7">
            <div aria-live="polite" className="sr-only" id="contact-form-status" />

            <form id="apexlyn_contact" name="contact_form" onSubmit={onSubmit} noValidate className="space-y-5">
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
                <p
                  className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[14px] text-[#D64545]"
                  role="alert"
                >
                  Something went wrong. Please try again, or contact us directly at {APEXLN_COMPANY.email}.
                </p>
              ) : null}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={apexFormLabelClass} htmlFor="c-first">
                    First name <span className="text-[#D64545]">*</span>
                  </label>
                  <input
                    id="c-first"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      clearErr('firstName');
                    }}
                    {...inputProps('firstName')}
                    aria-required="true"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'err-c-fn' : undefined}
                    className={cn(apexFormInputClass, errors.firstName && fieldErrorInputClass)}
                    autoComplete="given-name"
                  />
                  <FieldError id="err-c-fn" message={errors.firstName} />
                </div>
                <div>
                  <label className={apexFormLabelClass} htmlFor="c-last">
                    Last name <span className="text-[#D64545]">*</span>
                  </label>
                  <input
                    id="c-last"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      clearErr('lastName');
                    }}
                    {...inputProps('lastName')}
                    aria-required="true"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'err-c-ln' : undefined}
                    className={cn(apexFormInputClass, errors.lastName && fieldErrorInputClass)}
                    autoComplete="family-name"
                  />
                  <FieldError id="err-c-ln" message={errors.lastName} />
                </div>
              </div>

              <div>
                <label className={apexFormLabelClass} htmlFor="c-email">
                  Work email address <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  value={workEmail}
                  onChange={(e) => {
                    setWorkEmail(e.target.value);
                    clearErr('workEmail');
                  }}
                  {...inputProps('workEmail')}
                  aria-required="true"
                  aria-invalid={!!errors.workEmail}
                  aria-describedby={errors.workEmail ? 'err-c-em' : undefined}
                  className={cn(apexFormInputClass, errors.workEmail && fieldErrorInputClass)}
                  autoComplete="email"
                />
                <FieldError id="err-c-em" message={errors.workEmail} />
              </div>

              <div>
                <label className={apexFormLabelClass} htmlFor="c-phone">
                  Phone number (optional)
                </label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearErr('phone');
                  }}
                  {...inputProps('phone')}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'err-c-ph' : undefined}
                  className={cn(apexFormInputClass, errors.phone && fieldErrorInputClass)}
                  autoComplete="tel"
                />
                <FieldError id="err-c-ph" message={errors.phone} />
              </div>

              <div>
                <label className={apexFormLabelClass} htmlFor="c-org">
                  Organisation name <span className="text-[#D64545]">*</span>
                </label>
                <input
                  id="c-org"
                  name="organisation"
                  value={organisation}
                  onChange={(e) => {
                    setOrganisation(e.target.value);
                    clearErr('organisation');
                  }}
                  {...inputProps('organisation')}
                  aria-required="true"
                  aria-invalid={!!errors.organisation}
                  aria-describedby={errors.organisation ? 'err-c-org' : undefined}
                  className={cn(apexFormInputClass, errors.organisation && fieldErrorInputClass)}
                  autoComplete="organization"
                />
                <FieldError id="err-c-org" message={errors.organisation} />
              </div>

              <div>
                <label className={apexFormLabelClass} htmlFor="c-job">
                  Job title (optional)
                </label>
                <input
                  id="c-job"
                  name="job_title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  onFocus={(e) => {
                    capturePosthogEvent('contact_form_field_focused', { field: 'jobTitle' });
                    scrollFieldIntoView(e.target);
                  }}
                  className={apexFormInputClass}
                  autoComplete="organization-title"
                />
              </div>

              <div>
                <label className={apexFormLabelClass} htmlFor="c-inquiry">
                  What is this about? <span className="text-[#D64545]">*</span>
                </label>
                <SelectChevronWrap>
                  <select
                    id="c-inquiry"
                    name="inquiry_type"
                    value={inquiryType}
                    onChange={(e) => {
                      setInquiryType(e.target.value);
                      clearErr('inquiryType');
                    }}
                    {...inputProps('inquiryType')}
                    aria-required="true"
                    aria-invalid={!!errors.inquiryType}
                    aria-describedby={errors.inquiryType ? 'err-c-inq' : undefined}
                    className={cn(apexFormInputClass, 'appearance-none pr-10', errors.inquiryType && fieldErrorInputClass)}
                  >
                    <option value="">Select inquiry type</option>
                    {INQUIRY_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </SelectChevronWrap>
                <FieldError id="err-c-inq" message={errors.inquiryType} />
              </div>

              <div>
                <label className={apexFormLabelClass} htmlFor="c-msg">
                  Tell us about your requirements (optional)
                </label>
                <textarea
                  id="c-msg"
                  name="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearErr('message');
                  }}
                  {...inputProps('message')}
                  maxLength={2000}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'err-c-msg' : undefined}
                  className={cn(apexFormTextareaClass, errors.message && fieldErrorInputClass)}
                />
                <div className="mt-1 flex justify-between text-[12px]">
                  <FieldError id="err-c-msg" message={errors.message} />
                  <span
                    className={cn(
                      'text-[#9CA3AF]',
                      message.length >= 1800 && message.length <= 2000 && 'text-[#F5B700]',
                      message.length > 2000 && 'text-[#D64545]',
                    )}
                  >
                    {message.length} / 2000
                  </span>
                </div>
              </div>

              <p className="text-[12px] leading-[1.5] text-[#9CA3AF]">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-[#1E3A8A] underline">
                  Privacy Policy
                </Link>
                . We use the information you provide to respond to your inquiry and may contact you about relevant APEXLyn
                services. We do not share your information with third parties. You can request access to or deletion of
                your information at any time.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] disabled:opacity-80 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Spinner className="text-white" />
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <h2 className="text-[18px] font-semibold text-[#0B1320]">Contact details</h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#6B7280]">Email</p>
                <a href={`mailto:${APEXLN_COMPANY.email}`} className="mt-1 block text-[16px] text-[#0B1320] underline-offset-2 hover:underline">
                  {APEXLN_COMPANY.email}
                </a>
              </div>
              <div>
                <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#6B7280]">Phone</p>
                <a href={`tel:${APEXLN_COMPANY.phone.replace(/[^\d+]/g, '')}`} className="mt-1 block text-[16px] text-[#0B1320]">
                  {APEXLN_COMPANY.phone}
                </a>
              </div>
              <div>
                <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#6B7280]">Location</p>
                <p className="mt-1 text-[16px] text-[#0B1320]">{APEXLN_COMPANY.location}</p>
              </div>
              <div>
                <p className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#6B7280]">ABN</p>
                <p className="mt-1 text-[16px] text-[#0B1320]">{APEXLN_COMPANY.abn}</p>
              </div>
            </div>

            <hr className="my-8 border-[#E5E7EB]" />
            <div>
              <h3 className="text-[16px] font-semibold text-[#0B1320]">Response time</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4B5563]">
                We respond to all inquiries within one business day. Enterprise, government, and insurance inquiries are
                prioritised.
              </p>
            </div>

            <hr className="my-8 border-[#E5E7EB]" />
            <div>
              <h3 className="text-[16px] font-semibold text-[#0B1320]">Looking for something specific?</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {(
                  [
                    ['Request your baseline assessment', '/baseline'],
                    ['Request security documentation', '/documentation'],
                    ['See pricing', '/pricing'],
                    ['Explore MSP partnership', '/industries/msp-partners'],
                  ] as const
                ).map(([label, dest]) => (
                  <li key={dest}>
                    <Link
                      href={dest}
                      onClick={() => capturePosthogEvent('contact_direct_link_clicked', { link: dest })}
                      className="text-[15px] font-medium text-[#1E3A8A] hover:text-[#172E73]"
                    >
                      {label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
