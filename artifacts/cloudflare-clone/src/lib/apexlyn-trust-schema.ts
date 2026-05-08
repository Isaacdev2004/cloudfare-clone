import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';

const TRUST_WEBPAGE_DESCRIPTION =
  'Full technical security posture for APEXLyn Track and Lens. Australian data residency, encryption, immutable evidence, tenant isolation, access control, audit logging, and report verification.';

/** §39.19 — WebPage JSON-LD for Trust Center. */
export function buildTrustWebPageJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Trust Center — Security Posture & Architecture Detail | APEXLyn',
    description: TRUST_WEBPAGE_DESCRIPTION,
    url: `${SITE_ORIGIN}/trust`,
    audience: {
      '@type': 'Audience',
      audienceType: 'CISO, IT Security, Compliance, Audit, Insurance Underwriting, Government Procurement',
    },
    provider: {
      '@type': 'Organization',
      name: 'APEXLyn',
      url: SITE_ORIGIN,
    },
  };
}

/** §39.19 — FAQPage JSON-LD derived from key evaluator questions. */
export function buildTrustFaqPageJsonLd(): object {
  const mainEntity = [
    {
      '@type': 'Question',
      name: 'Where is APEXLyn data hosted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'All data processed and stored by APEXLyn Track and Lens remains in Australia. Primary hosting is AWS Sydney (ap-southeast-2), with secondary or DR in AWS Melbourne (ap-southeast-4) where applicable. Cross-region replication outside Australia is blocked.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is evidence protected from tampering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Evidence uses S3 Object Lock in Compliance mode (WORM), an append-only evidence ledger with per-tenant SHA-256 hash chains, and a strict commit order. Altering any committed record invalidates subsequent block hashes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What encryption standards does APEXLyn use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Data at rest uses AES-256 via SSE-KMS for evidence objects, RDS encryption with KMS for databases, and KMS-encrypted secrets. AWS KMS keys are region-locked to ap-southeast-2. Data in transit uses TLS 1.3 for external traffic and TLS 1.3 or mTLS for sensitive internal paths.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the default evidence retention period?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Default evidence retention is 7 years, tenant-configurable where legal or organisational policy requires different periods. Legal hold types override retention-driven deletion when active.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can an external reviewer verify a report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Each report hash is recorded in the evidence ledger. Authorised tenant users can use the verification endpoint. Optionally, reports may include a QR code with a read-only, time-limited public verification token so insurers or auditors can verify without platform access.',
      },
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}
