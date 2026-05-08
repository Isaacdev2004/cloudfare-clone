/** §40.12 — FAQPage JSON-LD for /pricing */

export function buildPricingFaqPageJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I switch between Track and Lens, or do I need both?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Track and Lens are independent platforms. You can use either one alone or both together. Many organisations start with Track for compliance evidence and add Lens later when AI governance becomes a priority.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens to my evidence if I downgrade?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Evidence collected under a higher plan remains in your tenant. Downgrading does not delete historical evidence or break your evidence chain. You retain read-only access to historical evidence and reports.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'We do not offer an unassisted free trial. Instead, we offer a baseline assessment — we review your current security environment and provide a structured report showing where your evidence posture is strong and where the gaps are.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the starting price?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'The starting price for each tier includes a base seat allocation, the features listed in the tier card, and the applicable evidence retention period. Additional seats beyond the base allocation are billed at the per-seat overage rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does MSP partner billing work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'MSP Partners receive a single consolidated bill for all their managed client tenants. Billing is structured at the partner level with per-client seat accounting. Partner discounts and minimum-commit arrangements are available.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer government pricing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Government and regulated institution pricing is available under the Sovereign tier. Government contracts support PO-referenced billing, custom invoice schedules, and contract-specific terms. Contact us to discuss government pricing.',
        },
      },
    ],
  };
}
