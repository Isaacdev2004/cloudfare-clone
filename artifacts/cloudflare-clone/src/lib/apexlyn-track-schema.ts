import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';

/** §28.13 — SoftwareApplication structured data for /track */
export function buildTrackSoftwareApplicationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'APEXLyn Track',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Evidence-led compliance engine. Automated evidence collection, immutable storage, framework mapping, and insurance-grade reporting for Australian organisations.',
    offers: {
      '@type': 'Offer',
      price: '349',
      priceCurrency: 'AUD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/OnlineOnly',
    },
    provider: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
  };
}
