/**
 * Part 7 — Industry SEO + WebPage JSON-LD fields (title/description verbatim where specified).
 */

export type IndustrySeoRow = {
  title: string;
  metaDescription: string;
  webJsonName: string;
  jsonAboutThing: string;
};

export const INDUSTRY_SEO_ROWS: Record<string, IndustrySeoRow> = {
  healthcare: {
    title: 'Healthcare Security Evidence | APEXLyn',
    metaDescription:
      'Compliance evidence and AI governance for medical practices, hospitals, aged care, and allied health. Track maps to My Health Records Act and RACGP standards. Lens protects patient data from AI exposure. Australian-built and hosted.',
    webJsonName: 'Healthcare Security Evidence | APEXLyn',
    jsonAboutThing: 'Healthcare cybersecurity compliance and AI governance',
  },
  legal: {
    title: 'Legal Practice Security Evidence | APEXLyn',
    metaDescription:
      'Compliance evidence and AI governance for Australian law firms. Track assesses Privacy Act obligations with jurisdiction-aware evaluation across all 8 Australian jurisdictions. Lens prevents privileged information from reaching AI tools.',
    webJsonName: 'Legal Practice Security Evidence | APEXLyn',
    jsonAboutThing: 'Legal sector cybersecurity compliance and AI governance',
  },
  accounting: {
    title: 'Accounting & Finance Security Evidence | APEXLyn',
    metaDescription:
      'Compliance evidence and AI governance for accounting firms, financial advisors, and bookkeepers. Track maps to ISO 27001 and Essential Eight. Lens governs AI use with client financial data. Australian-built.',
    webJsonName: 'Accounting & Finance Security Evidence | APEXLyn',
    jsonAboutThing: 'Accounting and finance cybersecurity compliance and AI governance',
  },
  insurance: {
    title: 'Insurance Security Evidence | APEXLyn',
    metaDescription:
      'Compliance evidence for insurers, brokers, and underwriters. Track maps to APRA CPS 234 and generates evidence packs for cyber underwriting. Lens governs AI in claims and policy processing. Australian-built.',
    webJsonName: 'Insurance Security Evidence | APEXLyn',
    jsonAboutThing: 'Insurance industry cybersecurity compliance and AI governance',
  },
  'professional-services': {
    title: 'Professional Services Security Evidence | APEXLyn',
    metaDescription:
      'Compliance evidence and AI governance for consulting firms, engineering practices, and recruitment agencies. Track provides compliance evidence. Lens prevents client data leaking into AI tools.',
    webJsonName: 'Professional Services Security Evidence | APEXLyn',
    jsonAboutThing: 'Professional services cybersecurity compliance and AI governance',
  },
  'msp-partners': {
    title: 'MSP & Partners — White-Label Compliance Evidence | APEXLyn',
    metaDescription:
      'White-label compliance evidence and AI governance for managed service providers. Portfolio dashboard for 500+ clients. Your brand, our evidence integrity. Consolidated billing and template propagation.',
    webJsonName: 'MSP & Partners — White-Label Compliance Evidence | APEXLyn',
    jsonAboutThing: 'MSP and partner cybersecurity compliance and AI governance',
  },
};
