import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'wouter';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { HUBSPOT_FORM_IDS, submitHubSpotForm, validateAnyEmail } from '@/lib/apexlyn-form-shared';
import type { ResourceRecord } from '@/lib/apexlyn-resources';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';

function startBrowserDownload(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export type PdfGateToast = { message: string } | null;

type Props = {
  open: boolean;
  resource: Pick<ResourceRecord, 'slug' | 'title' | 'pdfUrl' | 'category'> | null;
  onClose: () => void;
  onToast: (t: PdfGateToast) => void;
};

/** §61.7 — PDF download email gate modal. */
export function PdfDownloadGateModal({ open, resource, onClose, onToast }: Props) {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const title = resource?.title ?? '';
  const pdfUrl = resource?.pdfUrl ?? '';
  const canSubmit = open && resource != null && !!pdfUrl;

  useEffect(() => {
    if (!open) return;
    setEmail('');
    setErr(null);
    setBusy(false);
    // Focus close button first; tab cycles only inside modal.
    requestAnimationFrame(() => closeBtnRef.current?.focus());
  }, [open]);

  const focusables = useMemo(() => {
    const arr = [closeBtnRef.current, emailRef.current, submitRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    return arr;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables;
      if (f.length === 0) return;
      const cur = document.activeElement as HTMLElement | null;
      const idx = cur ? f.indexOf(cur) : -1;
      if (e.shiftKey) {
        if (idx <= 0) {
          e.preventDefault();
          f[f.length - 1]?.focus();
        }
      } else {
        if (idx === -1 || idx === f.length - 1) {
          e.preventDefault();
          f[0]?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, focusables, onClose]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    setErr(null);
    const v = validateAnyEmail(email);
    if (v) {
      setErr(v);
      return;
    }
    setBusy(true);
    try {
      await submitHubSpotForm(HUBSPOT_FORM_IDS.apexlyn_pdf_download, [
        { name: 'email', value: email.trim() },
        { name: 'resource_slug', value: resource?.slug ?? '' },
        { name: 'resource_title', value: resource?.title ?? '' },
      ]);
      startBrowserDownload(pdfUrl);
      if (resource) {
        capturePosthogEvent('resource_pdf_downloaded', {
          title: resource.title,
          category: resource.category,
        });
      }
      onClose();
      onToast({ message: 'Download started. Check your email for a copy.' });
    } catch {
      setErr('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10080] flex items-center justify-center bg-black/50 px-4 py-10"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ? `Download: ${title}` : 'Download'}
        className="w-full max-w-[480px] rounded-[12px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-sans text-[20px] font-semibold text-[#0B1320]">Download: {title}</h2>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded p-1 text-[#6B7280] transition-colors hover:bg-slate-100 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/30"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block font-sans text-[14px] font-medium text-[#374151]" htmlFor="pdf-gate-email">
              Work email <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              ref={emailRef}
              id="pdf-gate-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr(null);
              }}
              onBlur={() => setErr(validateAnyEmail(email))}
              aria-required="true"
              aria-invalid={!!err}
              aria-describedby={err ? 'pdf-gate-err' : undefined}
              className={cn(
                'min-h-[48px] w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[16px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#1E3A8A] focus:outline-none focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]',
                err ? 'border-[#D64545] shadow-[0_0_0_3px_rgba(214,69,69,0.12)] focus:border-[#D64545]' : '',
              )}
              placeholder="Work email"
              disabled={busy}
            />
            {err ? (
              <p id="pdf-gate-err" className="mt-1 font-sans text-[13px] text-[#D64545]" aria-live="polite">
                {err}
              </p>
            ) : null}
          </div>

          <button
            ref={submitRef}
            type="submit"
            disabled={busy}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#1E3A8A] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] disabled:opacity-80"
          >
            {busy ? (
              <>
                <Spinner className="text-white" />
                Submitting...
              </>
            ) : (
              'Download'
            )}
          </button>

          <p className="font-sans text-[12px] leading-[1.5] text-[#9CA3AF]">
            By providing your email, you agree to our{' '}
            <Link href="/privacy" className="text-[#1E3A8A] underline">
              Privacy Policy
            </Link>
            . We will send you the PDF and may notify you of related resources.
          </p>
        </form>
      </div>
    </div>
  );
}

