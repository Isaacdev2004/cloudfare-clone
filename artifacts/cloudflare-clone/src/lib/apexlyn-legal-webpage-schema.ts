import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';

export function buildLegalWebPageJsonLd(opts: {
  name: string;
  path: string;
  description: string;
  dateModifiedIso: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    url: `${SITE_ORIGIN}${opts.path}`,
    description: opts.description,
    inLanguage: 'en-AU',
    publisher: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
    dateModified: opts.dateModifiedIso,
  };
}
