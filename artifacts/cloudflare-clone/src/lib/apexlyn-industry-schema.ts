import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';
import type { IndustrySlug } from '@/lib/apexlyn-industry-types';
import { INDUSTRY_SEO_ROWS } from '@/lib/apexlyn-seo-industry';

/** §38 — WebPage JSON-LD for industry routes. */
export function buildIndustryWebPageJsonLd(slug: IndustrySlug): object | null {
  const row = INDUSTRY_SEO_ROWS[slug];
  if (!row) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: row.webJsonName,
    description: row.metaDescription,
    url: `${SITE_ORIGIN}/industries/${slug}`,
    provider: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
    about: {
      '@type': 'Thing',
      name: row.jsonAboutThing,
    },
  };
}

export const INDUSTRY_WEBPAGE_SLUGS: IndustrySlug[] = [
  'healthcare',
  'legal',
  'accounting',
  'insurance',
  'professional-services',
  'msp-partners',
];

export function isIndustryWebPageSlug(s: string): s is IndustrySlug {
  return (INDUSTRY_WEBPAGE_SLUGS as string[]).includes(s);
}
