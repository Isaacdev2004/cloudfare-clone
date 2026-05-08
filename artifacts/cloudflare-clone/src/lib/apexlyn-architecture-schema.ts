import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';

/** §30.14 — TechArticle structured data for /architecture */
export function buildArchitectureTechArticleJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'APEXLyn Architecture — How Our Evidence Infrastructure Works',
    description:
      'Two platforms, one evidence architecture. Track and Lens share an immutable, hash-chained evidence infrastructure hosted in AWS Sydney. Automated collection, tamper-proof storage, and independent verification.',
    author: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
    inLanguage: 'en-AU',
    about: [
      'cybersecurity compliance evidence',
      'AI governance evidence',
      'immutable evidence ledger',
      'Australian data residency',
    ],
  };
}
