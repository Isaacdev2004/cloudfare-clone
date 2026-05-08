import { shouldSimulateSubmitFailure, S9 } from '@/lib/apexlyn-form-copy';

/** §45.3 — Blocked consumer email domains (work email only on lead forms). */
export const FREE_EMAIL_MESSAGE =
  'Please use your work email address. We respond to business inquiries only.';

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com',
  'yandex.com',
  'zoho.com',
]);

export function getEmailDomain(email: string): string {
  const t = email.trim().toLowerCase();
  const at = t.lastIndexOf('@');
  if (at === -1 || at === t.length - 1) return '';
  return t.slice(at + 1);
}

export function isFreeEmailDomain(email: string): boolean {
  return FREE_EMAIL_DOMAINS.has(getEmailDomain(email));
}

const EMAIL_FORMAT_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_FORMAT_RE.test(email.trim());
}

/** Returns error message or null if OK (format + not free provider). */
export function validateWorkEmail(value: string): string | null {
  const t = value.trim();
  if (!t) return S9.requiredField;
  if (!isValidEmailFormat(t)) return 'Please enter a valid work email address';
  if (isFreeEmailDomain(t)) return FREE_EMAIL_MESSAGE;
  return null;
}

/** Returns error message or null if OK (format only). */
export function validateAnyEmail(value: string): string | null {
  const t = value.trim();
  if (!t) return S9.requiredField;
  if (!isValidEmailFormat(t)) return 'Please enter a valid email address';
  return null;
}

export function minLengthMessage(min: number): string {
  return `Enter at least ${min} characters.`;
}

export function validateMinLength(value: string, min: number, label: string): string | null {
  const t = value.trim();
  if (!t) return S9.requiredField;
  if (t.length < min) return minLengthMessage(min);
  return null;
}

export function validateOptionalMinLength(value: string, min: number): string | null {
  const t = value.trim();
  if (!t) return null;
  if (t.length < min) return minLengthMessage(min);
  return null;
}

/** Optional phone: allow digits, spaces, + ( ) - . */
const PHONE_RE = /^[\d+\s().\-]{6,32}$/;

export function validateOptionalPhone(phone: string): string | null {
  const t = phone.trim();
  if (!t) return null;
  return PHONE_RE.test(t) ? null : 'Please enter a valid phone number';
}

const ATTR_KEY = 'apexlyn_form_attribution_v1';

type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  referrer_url: string;
  landing_page: string;
};

function safeReadAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(ATTR_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

function safeWriteAttribution(a: Attribution): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(ATTR_KEY, JSON.stringify(a));
  } catch {
    /* ignore */
  }
}

/**
 * §62.6 — Capture UTM + referrer + landing page once per session.
 * Call on page load (Layout) to keep attribution consistent across pages.
 */
export function initFormAttributionSession(): void {
  if (typeof window === 'undefined') return;
  const existing = safeReadAttribution();
  if (existing) return;

  const p = new URLSearchParams(window.location.search);
  const a: Attribution = {
    utm_source: p.get('utm_source') ?? '',
    utm_medium: p.get('utm_medium') ?? '',
    utm_campaign: p.get('utm_campaign') ?? '',
    utm_term: p.get('utm_term') ?? '',
    utm_content: p.get('utm_content') ?? '',
    referrer_url: document.referrer || '',
    landing_page: window.location.href,
  };
  safeWriteAttribution(a);
}

export function buildMarketingHiddenFields(): { name: string; value: string }[] {
  if (typeof window === 'undefined') return [];
  const a =
    safeReadAttribution() ?? {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      referrer_url: document.referrer || '',
      landing_page: window.location.href,
    };

  // Always include keys, even if empty (per spec).
  return [
    { name: 'utm_source', value: a.utm_source },
    { name: 'utm_medium', value: a.utm_medium },
    { name: 'utm_campaign', value: a.utm_campaign },
    { name: 'utm_term', value: a.utm_term },
    { name: 'utm_content', value: a.utm_content },
    { name: 'referrer_url', value: a.referrer_url },
    { name: 'landing_page', value: a.landing_page },
  ];
}

export function isHoneypotTriggered(honeypotValue: string): boolean {
  return honeypotValue.trim().length > 0;
}

export type HubSpotField = { name: string; value: string };

/**
 * HubSpot Forms API v3 — configure VITE_HUBSPOT_PORTAL_ID and per-form GUID env vars.
 * Without env, simulates success (after delay) unless ?simulateSubmit=fail.
 */
export async function submitHubSpotForm(
  formGuid: string | undefined,
  fields: HubSpotField[],
  opts?: { includeMarketingFields?: boolean },
): Promise<void> {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID as string | undefined;
  const includeMarketingFields = opts?.includeMarketingFields ?? true;
  const allFields = includeMarketingFields ? [...fields, ...buildMarketingHiddenFields()] : [...fields];

  if (!portalId || !formGuid) {
    await new Promise((r) => setTimeout(r, 650));
    if (shouldSimulateSubmitFailure()) throw new Error('simulated_failure');
    return;
  }

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: allFields,
        context: {
          pageUri: typeof window !== 'undefined' ? window.location.href : '',
          pageName: typeof document !== 'undefined' ? document.title : '',
        },
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`hubspot_${res.status}:${text.slice(0, 120)}`);
  }
}

export const HUBSPOT_FORM_IDS = {
  apexlyn_contact: import.meta.env.VITE_HUBSPOT_FORM_APEXLYN_CONTACT as string | undefined,
  apexlyn_baseline: import.meta.env.VITE_HUBSPOT_FORM_APEXLYN_BASELINE as string | undefined,
  apexlyn_documentation: import.meta.env.VITE_HUBSPOT_FORM_APEXLYN_DOCUMENTATION as string | undefined,
  apexlyn_newsletter: import.meta.env.VITE_HUBSPOT_FORM_APEXLYN_NEWSLETTER as string | undefined,
  /** §47.3–47.5 — Interest capture; map `resource_interest_tag` in HubSpot. */
  apexlyn_resource_interest: import.meta.env.VITE_HUBSPOT_FORM_APEXLYN_RESOURCE_INTEREST as string | undefined,
  apexlyn_pdf_download: import.meta.env.VITE_HUBSPOT_FORM_APEXLYN_PDF_DOWNLOAD as string | undefined,
} as const;

/** §45.4 — Honeypot: visually hidden, not display:none */
export const honeypotInputClass =
  'absolute -left-[9999px] -top-[9999px] m-0 h-px w-px overflow-hidden whitespace-nowrap border-0 p-0';

/** §42.2 / §45 — Shared field chrome */
export const apexFormInputClass =
  'min-h-[48px] w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[16px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#1E3A8A] focus:outline-none focus:shadow-[0_0_0_3px_rgba(30,58,138,0.1)]';

export const apexFormLabelClass = 'mb-1.5 block text-[14px] font-medium text-[#374151]';

export const apexFormTextareaClass = `${apexFormInputClass} min-h-[120px] resize-y`;

export function scrollFieldIntoView(el: HTMLElement | null): void {
  if (!el || typeof window === 'undefined') return;
  requestAnimationFrame(() => {
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
}
