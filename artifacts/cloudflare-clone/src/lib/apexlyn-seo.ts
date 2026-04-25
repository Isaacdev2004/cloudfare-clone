/**
 * §12 — SEO and metadata. OG title/description match SEO at launch; default social image: /og-default.svg
 */

const BRAND = 'APEXLyn';
const DEFAULT_TITLE = `${BRAND} | Evidence-Led Security & AI Governance`;
const DEFAULT_DESCRIPTION =
  'Australian-built security evidence and AI governance infrastructure. APEXLyn Track and APEXLyn Lens for defensible control visibility, not theatre.';

export type SeoConfig = {
  title: string;
  description: string;
  /** If omitted, matches title and description (§12.1) */
  ogTitle?: string;
  ogDescription?: string;
  /** Path under site origin, e.g. /og-default.svg */
  ogImagePath?: string;
};

export const DEFAULT_SEO: SeoConfig = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  ogTitle: DEFAULT_TITLE,
  ogDescription: DEFAULT_DESCRIPTION,
  ogImagePath: '/og-default.svg',
};

function withBrand(title: string): string {
  if (title.includes(BRAND) && title.length < 80) return title;
  return `${title} | ${BRAND}`;
}

const ROUTES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'APEXLyn | Evidence-Led Security & AI Governance Infrastructure',
    description:
      'APEXLyn helps organisations prove security reality continuously and govern AI use safely through evidence-led infrastructure, structured oversight, and defensible reporting.',
  },
  '/platforms': {
    title: 'Platforms | APEXLyn Track and APEXLyn Lens',
    description:
      'Explore APEXLyn Track and APEXLyn Lens — two flagship platforms built for security evidence infrastructure and AI governance infrastructure.',
  },
  '/platforms/track': {
    title: 'APEXLyn Track | Security Evidence Infrastructure',
    description:
      'APEXLyn Track continuously captures control reality, structures defensible evidence, and supports governance and reporting under scrutiny.',
  },
  '/platforms/lens': {
    title: 'APEXLyn Lens | AI Governance & AI Risk Infrastructure',
    description:
      'APEXLyn Lens provides AI usage visibility, prompt risk inspection, sensitive-data exposure control, and structured AI governance.',
  },
  '/architecture-overview': {
    title: 'Architecture Overview | APEXLyn',
    description:
      'See how APEXLyn is engineered to turn security activity and AI oversight into structured, defensible records designed for scale and scrutiny.',
  },
  '/platforms/architecture': {
    title: 'Architecture Overview | APEXLyn',
    description:
      'See how APEXLyn is engineered to turn security activity and AI oversight into structured, defensible records designed for scale and scrutiny.',
  },
  '/products': {
    title: withBrand('Product Catalog'),
    description: 'Browse APEXLyn product and platform information aligned to the public site.',
  },
  '/pricing': {
    title: 'Pricing | APEXLyn Packages',
    description:
      'Explore APEXLyn package paths for growing teams, regulated environments, enterprise operations, and partner delivery.',
  },
  '/plans': {
    title: 'Pricing | APEXLyn Packages',
    description:
      'Explore APEXLyn package paths for growing teams, regulated environments, enterprise operations, and partner delivery.',
  },
  '/solutions': {
    title: 'Solutions | APEXLyn',
    description:
      'Explore APEXLyn’s structured security and AI governance services built around evidence, governance, and operational clarity.',
  },
  '/solutions/cyber-security-services': {
    title: 'Cyber Security Services | APEXLyn',
    description:
      'APEXLyn provides structured security uplift and operational hardening designed to reduce exposure and improve control reality.',
  },
  '/solutions/ai-governance-advisory': {
    title: 'AI Governance Advisory | APEXLyn',
    description:
      'APEXLyn helps organisations define AI usage boundaries, reduce exposure, and create governance that leadership can trust.',
  },
  '/solutions/compliance-operations': {
    title: 'Compliance Operations | APEXLyn',
    description:
      'APEXLyn helps organisations replace manual assurance with structured evidence, reporting, and governance support.',
  },
  '/why-cloudflare': {
    title: withBrand('Why APEXLyn'),
    description: 'Positioning and rationale for evidence-led security and AI governance on APEXLyn.',
  },
  '/enterprise': {
    title: withBrand('Enterprise'),
    description: 'Enterprise patterns for APEXLyn — governance, trust, and operating requirements at scale.',
  },
  '/zero-trust': {
    title: withBrand('Zero Trust'),
    description: 'Zero trust concepts and how they relate to APEXLyn security evidence and governance posture.',
  },
  '/cloudflare-one': {
    title: withBrand('Zero Trust'),
    description: 'Zero trust concepts and how they relate to APEXLyn security evidence and governance posture.',
  },
  '/developers': {
    title: withBrand('Developers'),
    description: 'Developer-relevant information for the APEXLyn public site.',
  },
  '/privacy': {
    title: 'Privacy | APEXLyn',
    description:
      'Read how APEXLyn handles website inquiries, submitted information, and public-site privacy expectations.',
  },
  '/privacy-policy': {
    title: 'Privacy | APEXLyn',
    description:
      'Read how APEXLyn handles website inquiries, submitted information, and public-site privacy expectations.',
  },
  '/terms': {
    title: 'Terms | APEXLyn',
    description: 'Read the website use terms for the APEXLyn public website.',
  },
  '/terms-of-use': {
    title: 'Terms | APEXLyn',
    description: 'Read the website use terms for the APEXLyn public website.',
  },
  '/report-security': {
    title: withBrand('Report a Security Issue'),
    description: 'How to report a security concern related to APEXLyn.',
  },
  '/resources': {
    title: 'Resources | APEXLyn',
    description: 'Read evidence-led security and AI governance guidance written for serious operators.',
  },
  '/resources/whitepapers': {
    title: 'Whitepapers | APEXLyn',
    description: 'Read APEXLyn whitepapers on evidence integrity, governance execution, and operational trust.',
  },
  '/resources/framework-guides': {
    title: 'Framework Guides | APEXLyn',
    description:
      'Explore APEXLyn framework guides designed to translate frameworks into operational evidence and governance.',
  },
  '/resources/ai-risk-briefs': {
    title: 'AI Risk Briefs | APEXLyn',
    description: 'Read practical APEXLyn AI risk briefs on governance, visibility, and exposure reduction.',
  },
  '/resources/blog': {
    title: withBrand('Blog'),
    description: 'Updates and analysis from the APEXLyn team.',
  },
  '/resources/case-studies': {
    title: withBrand('Case Studies'),
    description: 'How organisations use APEXLyn-style evidence and governance.',
  },
  '/resources/webinars': {
    title: withBrand('Webinars'),
    description: 'Sessions and replays from APEXLyn.',
  },
  '/resources/documentation': {
    title: withBrand('Documentation'),
    description: 'Public documentation and reference material for APEXLyn.',
  },
  '/resources/community': {
    title: withBrand('Community'),
    description: 'Community links and public channels for APEXLyn.',
  },
  '/contact': {
    title: 'Contact APEXLyn',
    description:
      'Start a strategic conversation with APEXLyn about security evidence, AI governance, and your operating constraints.',
  },
  '/company/contact': {
    title: 'Contact APEXLyn',
    description:
      'Start a strategic conversation with APEXLyn about security evidence, AI governance, and your operating constraints.',
  },
  '/company': {
    title: withBrand('Company'),
    description: 'About APEXLyn, careers, and company information.',
  },
  '/company/about': {
    title: 'About APEXLyn',
    description:
      'Learn why APEXLyn was founded to turn operational security and AI usage into defensible evidence and governance.',
  },
  '/company/careers': {
    title: 'Careers | APEXLyn',
    description:
      'Join APEXLyn and help build infrastructure that makes security evidence defensible and AI risk governable.',
  },
  '/company/press': {
    title: withBrand('Press'),
    description: 'Press information for APEXLyn.',
  },
  '/company/investors': {
    title: withBrand('Investors'),
    description: 'Investor information for APEXLyn.',
  },
  '/company/impact': {
    title: withBrand('Impact'),
    description: 'Impact and responsibility at APEXLyn.',
  },
  '/support': {
    title: withBrand('Support'),
    description: 'Help, status, and support resources for APEXLyn.',
  },
  '/support/help-center': {
    title: withBrand('Help Center'),
    description: 'Get help with APEXLyn products and the public site.',
  },
  '/support/system-status': {
    title: withBrand('System Status'),
    description: 'Operational status for APEXLyn services and the public site.',
  },
  '/support/compliance': {
    title: withBrand('Compliance'),
    description: 'Compliance-related information and resources from APEXLyn.',
  },
  '/support/trust-hub': {
    title: withBrand('Trust Hub'),
    description: 'Trust, security, and transparency resources for APEXLyn.',
  },
  '/support/cookie-preferences': {
    title: withBrand('Cookie Preferences'),
    description: 'Manage cookie preferences for the APEXLyn public site.',
  },
  '/industries': {
    title: 'Industries | APEXLyn',
    description:
      'APEXLyn supports healthcare, legal, accounting, insurance, MSP, and professional services environments with evidence-led security and AI governance.',
  },
  '/trust-center': {
    title: 'Trust Center | APEXLyn',
    description:
      'Review APEXLyn’s trust posture across data residency, access controls, evidence integrity, privacy, and Australian operating conditions.',
  },
  '/request-security-documentation': {
    title: 'Request Security Documentation | APEXLyn',
    description:
      'Request relevant APEXLyn security and trust documentation for serious evaluation and review processes.',
  },
  '/trust-center/request-documentation': {
    title: 'Request Security Documentation | APEXLyn',
    description:
      'Request relevant APEXLyn security and trust documentation for serious evaluation and review processes.',
  },
  '/test-your-security-state': {
    title: 'Test Your Security State | APEXLyn',
    description:
      'Get a fast baseline across security evidence readiness and AI exposure risk with clear next steps.',
  },
  '/test-security-state': {
    title: 'Test Your Security State | APEXLyn',
    description:
      'Get a fast baseline across security evidence readiness and AI exposure risk with clear next steps.',
  },
  '/404': {
    title: 'Page Not Found | APEXLyn',
    description: 'The page you requested could not be found.',
  },
};

const SLUG_INDUSTRY: Record<string, string> = {
  healthcare: 'Healthcare',
  legal: 'Legal',
  accounting: 'Accounting',
  insurance: 'Insurance',
  'msp-partners': 'MSP / Partners',
  'professional-services': 'Professional Services',
};

/** Section 23+ per-slug SEO where it differs from the generic industry template. */
const INDUSTRY_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  healthcare: {
    title: 'Security & Governance for Healthcare Providers | APEXLyn',
    description:
      'APEXLyn helps healthcare providers improve security evidence, reduce AI exposure, and strengthen defensible governance.',
  },
  legal: {
    title: 'Security & Governance for Legal Practices | APEXLyn',
    description:
      'APEXLyn helps legal practices reduce exposure, govern AI use, and support defensible evidence and reporting.',
  },
  accounting: {
    title: 'Security & Governance for Accounting Firms | APEXLyn',
    description:
      'APEXLyn helps accounting firms improve evidence continuity, reduce AI exposure, and strengthen governance under client pressure.',
  },
  insurance: {
    title: 'Security & Governance for Insurance Organisations | APEXLyn',
    description:
      'APEXLyn helps insurance organisations improve defensible governance, reduce AI exposure, and strengthen evidence-led reporting.',
  },
  'msp-partners': {
    title: 'Evidence-Led Security for MSPs & Partners | APEXLyn',
    description:
      'APEXLyn helps MSPs and partners deliver evidence-led security and AI governance across multiple client environments.',
  },
  'professional-services': {
    title: 'Security & AI Governance for Professional Services | APEXLyn',
    description:
      'APEXLyn helps professional services firms reduce exposure, prove control reality, and govern AI usage with stronger evidence.',
  },
};

/**
 * Resolves metadata for a pathname (no query string).
 */
function normalizePathname(pathname: string): string {
  let p = (pathname.split('?')[0] || '/').trim() || '/';
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

export function getSeoForPathname(pathname: string): SeoConfig {
  const p = normalizePathname(pathname);

  if (p.startsWith('/industries/') && p !== '/industries') {
    const parts = p.split('/').filter(Boolean);
    const slug = parts[1] ?? '';
    const override = INDUSTRY_SEO_OVERRIDES[slug];
    if (override) {
      return {
        title: override.title,
        description: override.description,
        ogTitle: override.title,
        ogDescription: override.description,
        ogImagePath: DEFAULT_SEO.ogImagePath,
      };
    }
    const label = SLUG_INDUSTRY[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: withBrand(`${label} — Industries`),
      description: `Security, evidence, and AI governance for ${label.toLowerCase()} — APEXLyn industry guidance.`,
      ogTitle: withBrand(`${label} — Industries`),
      ogDescription: `Security, evidence, and AI governance for ${label.toLowerCase()} — APEXLyn industry guidance.`,
      ogImagePath: DEFAULT_SEO.ogImagePath,
    };
  }

  const row = ROUTES[p];
  if (row) {
    return {
      title: row.title,
      description: row.description,
      ogTitle: row.title,
      ogDescription: row.description,
      ogImagePath: DEFAULT_SEO.ogImagePath,
    };
  }

  return {
    title: 'Page Not Found | APEXLyn',
    description: 'The page you requested could not be found.',
    ogTitle: 'Page Not Found | APEXLyn',
    ogDescription: 'The page you requested could not be found.',
    ogImagePath: DEFAULT_SEO.ogImagePath,
  };
}

export function getAbsoluteUrl(path: string, origin: string, base: string): string {
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!b || b === '') return `${origin}${p}`;
  return `${origin}${b}${p}`;
}

export function toSeoConfig(base: SeoConfig): { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string } {
  return {
    title: base.title,
    description: base.description,
    ogTitle: base.ogTitle ?? base.title,
    ogDescription: base.ogDescription ?? base.description,
    ogImage: base.ogImagePath ?? '/og-default.svg',
  };
}
