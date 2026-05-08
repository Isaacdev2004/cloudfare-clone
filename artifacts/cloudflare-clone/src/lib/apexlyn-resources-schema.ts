import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';

const RESOURCES_TITLE = 'Resources — Security Evidence & AI Governance Insights';
const RESOURCES_DESCRIPTION =
  'Whitepapers, framework guides, and AI risk briefs from APEXLyn. Practical insights on compliance evidence, Essential Eight, AI governance, and security for Australian organisations.';

/** §47.8 — CollectionPage for /resources */
export function buildResourcesCollectionPageJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: RESOURCES_TITLE,
    description: RESOURCES_DESCRIPTION,
    url: `${SITE_ORIGIN}/resources`,
    provider: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
  };
}

/** §49.2 — TechArticle for resource detail pages. */
export function buildResourceTechArticleJsonLd(opts: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string | null;
  urlPath: string;
}): object {
  const pageUrl = `${SITE_ORIGIN}${opts.urlPath}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.png`,
      },
    },
    inLanguage: 'en-AU',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}
