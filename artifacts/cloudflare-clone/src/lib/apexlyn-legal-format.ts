import type { LegalPageSlug } from '@/generated/legal-dates';
import { LEGAL_PAGE_LAST_UPDATED_ISO } from '@/generated/legal-dates';

/** Display like "7 May 2026" (en-AU). */
export function formatLegalDateAU(isoYmd: string): string {
  const [y, m, d] = isoYmd.split('-').map(Number);
  if (!y || !m || !d) return isoYmd;
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getLegalLastUpdated(slug: LegalPageSlug): string {
  return formatLegalDateAU(LEGAL_PAGE_LAST_UPDATED_ISO[slug]);
}

export function getLegalEffectiveDate(): string {
  const env = import.meta.env.VITE_LEGAL_EFFECTIVE_DATE as string | undefined;
  if (env && /^\d{4}-\d{2}-\d{2}$/.test(env.trim())) {
    return formatLegalDateAU(env.trim());
  }
  return formatLegalDateAU(LEGAL_PAGE_LAST_UPDATED_ISO.privacy);
}
