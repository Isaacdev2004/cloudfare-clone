import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';

/** §29.16 — SoftwareApplication structured data for /lens */
export function buildLensSoftwareApplicationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'APEXLyn Lens',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    description:
      'AI security and evidence platform. 7 enforcement layers, forensic workspace, legal hold, and 22 native integrations. Works alongside existing enterprise security tools. Australian-built and hosted.',
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
