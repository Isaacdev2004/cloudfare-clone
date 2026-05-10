/**
 * §12 / §20 — SEO, titles, descriptions. OG mirrors page meta; default image §21.
 */

import { INDUSTRY_SEO_ROWS } from '@/lib/apexlyn-seo-industry';
import { getPublishedResource } from '@/lib/apexlyn-resources';

export type SeoConfig = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImagePath?: string;
};

const SUFFIX = ' | APEXLyn — Where Security Becomes Evidence';

/** §20.1 — homepage title (no duplicate suffix). */
export const HOME_TITLE = 'APEXLyn — Where Security Becomes Evidence';

function pageTitle(specific: string): string {
  return `${specific}${SUFFIX}`;
}

function d(text: string): string {
  const t = text.trim();
  if (t.length >= 140 && t.length <= 160) return t;
  if (t.length > 160) return t.slice(0, 157).trimEnd() + '…';
  let u = t;
  while (u.length < 140) u = `${u} Australian evidence-led security.`;
  return u.slice(0, 160);
}

/** §27 — Homepage meta (Part 3); verbatim where length allows §20.2. */
const HOME_META_DESCRIPTION =
  'Australian cybersecurity and AI governance platforms. Track turns compliance into provable evidence. Lens governs AI use with forensic-grade proof. From small business to government.';

export const DEFAULT_SEO: SeoConfig = {
  title: HOME_TITLE,
  description: HOME_META_DESCRIPTION,
  ogTitle: HOME_TITLE,
  ogDescription: HOME_META_DESCRIPTION,
  ogImagePath: '/og/default.png',
};

function clipMeta(text: string, max = 160): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + '…';
}

const ROUTES: Record<string, { title: string; description: string }> = {
  '/': {
    title: HOME_TITLE,
    description: HOME_META_DESCRIPTION,
  },
  '/track': {
    title: 'Track — Evidence-Led Compliance Engine | APEXLyn',
    description:
      'Automated compliance evidence that cannot be altered or deleted. Track maps to Essential Eight, ISO 27001, NIST, APRA CPS 234, ASD ISM, and more. Insurance-grade reports with independent verification. Australian-built and hosted.',
  },
  '/lens': {
    title: 'Lens — AI Security & Evidence Platform | APEXLyn',
    description:
      'See and control how AI is used across your organisation. 7 enforcement layers. Forensic-grade evidence. Works alongside your existing security tools. Australian-built, Australian-hosted.',
  },
  '/architecture': {
    title: 'Architecture — How Our Evidence Infrastructure Works | APEXLyn',
    description:
      'Two platforms, one evidence architecture. Track and Lens share an immutable, hash-chained evidence infrastructure hosted in AWS Sydney. See how automated collection, tamper-proof storage, and independent verification work together.',
  },
  '/trust': {
    title: 'Trust Center — Security Posture & Architecture Detail | APEXLyn',
    description:
      'Full technical security posture for APEXLyn Track and Lens. Australian data residency in AWS Sydney. AES-256 encryption. Immutable evidence storage. Per-tenant isolation. 7-year retention. Published for CISOs, auditors, insurers, and government evaluators.',
  },
  '/pricing': {
    title: 'Pricing — Standard to Sovereign | APEXLyn',
    description:
      'APEXLyn Track and Lens pricing from A$349/month. Four tiers — Standard, Professional, Enterprise, and Sovereign. Compliance evidence and AI governance for Australian organisations from small business to government.',
  },
  '/about': {
    title: 'About APEXLyn — Australian Cybersecurity & AI Governance | APEXLyn',
    description: clipMeta(
      'APEXLyn is an Australian cybersecurity and AI governance company. Two platforms — Track for compliance evidence and Lens for AI governance — built on one immutable evidence architecture. Founded by Vishwa Teja Mardha. Based in Sydney, Australia.',
    ),
  },
  '/contact': {
    title: 'Contact APEXLyn | APEXLyn',
    description: clipMeta(
      'Get in touch with APEXLyn. Start a conversation about compliance evidence, AI governance, enterprise deployment, MSP partnership, or government requirements. Based in Sydney, Australia.',
    ),
  },
  '/industries': {
    title: pageTitle('Industries — Regulated Sectors'),
    description: d(
      'APEXLyn industry guidance for healthcare, legal, accounting, insurance, professional services, and MSP partners — evidence-led security tailored to sector risk.',
    ),
  },
  '/baseline': {
    title: 'Test Your Security State — Baseline Assessment | APEXLyn',
    description: clipMeta(
      "Request a structured baseline assessment of your organisation's security evidence posture. We review your environment and show you where your evidence is strong and where the gaps are. No obligation.",
    ),
  },
  '/documentation': {
    title: 'Request Security Documentation | APEXLyn',
    description: clipMeta(
      'Request detailed security documentation for APEXLyn Track and Lens. Available for qualified evaluators including enterprise, government, insurance, and regulated-industry assessments. Covers architecture, data handling, evidence schemas, and operational controls.',
    ),
  },
  '/resources': {
    title: 'Resources — Security Evidence & AI Governance Insights | APEXLyn',
    description: clipMeta(
      'Whitepapers, framework guides, and AI risk briefs from APEXLyn. Practical insights on compliance evidence, Essential Eight, AI governance, and security for Australian organisations.',
    ),
  },
  '/resources/whitepapers': {
    title: 'Whitepapers | Resources | APEXLyn',
    description: clipMeta(
      'In-depth analysis of compliance evidence, security posture, and evidence infrastructure for Australian organisations. Published by the APEXLyn team.',
    ),
  },
  '/resources/framework-guides': {
    title: 'Framework Guides | Resources | APEXLyn',
    description: clipMeta(
      'Practical guides to Essential Eight, ISO 27001, APRA CPS 234, and other compliance frameworks. What they require, what evidence looks like, and how to prepare.',
    ),
  },
  '/resources/ai-risk-briefs': {
    title: 'AI Risk Briefs | Resources | APEXLyn',
    description: clipMeta(
      'Focused briefings on AI governance risks, regulatory developments, and practical steps for managing AI use across Australian organisations.',
    ),
  },
  '/privacy': {
    title: 'Privacy Policy | APEXLyn',
    description:
      'How APEXLyn collects, uses, stores, and protects your personal information. Compliant with the Privacy Act 1988 and the Australian Privacy Principles. APEXLyn Pty Ltd, Sydney, Australia.',
  },
  '/terms': {
    title: 'Terms of Use | APEXLyn',
    description:
      'Terms of use for the APEXLyn website. Governs your access to and use of www.apexlyn.com.au. APEXLyn Pty Ltd, Sydney, Australia. Governed by the laws of New South Wales.',
  },
  '/cookies': {
    title: 'Cookie Policy | APEXLyn',
    description:
      'How APEXLyn uses cookies and analytics on www.apexlyn.com.au. Privacy-focused analytics hosted in Australia. No advertising cookies. No third-party trackers. Full transparency.',
  },
  '/disclaimer': {
    title: 'Disclaimer | APEXLyn',
    description:
      'Important disclaimers for the APEXLyn website. Information provided for general purposes only. Not professional advice. Framework alignment is evidence-based, not certification.',
  },
  '/404': {
    title: 'Page Not Found | APEXLyn',
    description: '',
  },
};

/** Map legacy URLs to canonical path for SEO resolution. */
const LEGACY_CANONICAL_PATH: Record<string, string> = {
  '/platforms/track': '/track',
  '/platforms/lens': '/lens',
  '/platforms/architecture': '/architecture',
  '/architecture-overview': '/architecture',
  '/trust-center': '/trust',
  '/company/about': '/about',
  '/test-your-security-state': '/baseline',
  '/test-security-state': '/baseline',
  '/request-security-documentation': '/documentation',
  '/trust-center/request-documentation': '/documentation',
  '/privacy-policy': '/privacy',
  '/terms-of-use': '/terms',
};

function normalizePathname(pathname: string): string {
  let p = (pathname.split('?')[0] || '/').trim() || '/';
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

export function getSeoForPathname(pathname: string): SeoConfig {
  let p = normalizePathname(pathname);
  p = LEGACY_CANONICAL_PATH[p] ?? p;

  const resourceArticleMatch = /^\/resources\/(whitepapers|framework-guides|ai-risk-briefs)\/([^/]+)$/.exec(p);
  if (resourceArticleMatch) {
    const cat = resourceArticleMatch[1];
    const slug = resourceArticleMatch[2];
    if (cat && slug) {
      const r = getPublishedResource(cat, slug);
      if (r && r.content.trim().length >= 20) {
        const title = `${r.title} | APEXLyn`;
        const desc = clipMeta(r.description, 155);
        return {
          title,
          description: desc,
          ogTitle: title,
          ogDescription: desc,
          ogImagePath: DEFAULT_SEO.ogImagePath,
        };
      }
    }
  }

  if (p.startsWith('/industries/') && p !== '/industries') {
    const slug = p.split('/')[2] ?? '';
    const row = INDUSTRY_SEO_ROWS[slug];
    if (row) {
      return {
        title: row.title,
        description: row.metaDescription,
        ogTitle: row.title,
        ogDescription: row.metaDescription,
        ogImagePath: DEFAULT_SEO.ogImagePath,
      };
    }
    const label = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const t = pageTitle(`${label} — Industries`);
    const desc = d(
      `Security evidence and AI governance for ${label.toLowerCase()} organisations — APEXLyn industry guidance, controls, and assurance patterns for Australia.`,
    );
    return { title: t, description: desc, ogTitle: t, ogDescription: desc, ogImagePath: DEFAULT_SEO.ogImagePath };
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

  // §57. / §58.5 — Unknown routes render a 404 page and must not be indexed.
  const nf = ROUTES['/404'];
  return {
    title: nf.title,
    description: nf.description,
    ogTitle: nf.title,
    ogDescription: nf.description,
    ogImagePath: DEFAULT_SEO.ogImagePath,
  };
}

export function getCanonicalPath(pathname: string): string {
  let p = normalizePathname(pathname);
  p = LEGACY_CANONICAL_PATH[p] ?? p;
  return p;
}

export function getAbsoluteUrl(path: string, origin: string, base: string): string {
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!b || b === '') return `${origin}${p}`;
  return `${origin}${b}${p}`;
}

export function toSeoConfig(base: SeoConfig): {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
} {
  return {
    title: base.title,
    description: base.description,
    ogTitle: base.ogTitle ?? base.title,
    ogDescription: base.ogDescription ?? base.description,
    ogImage: base.ogImagePath ?? '/og/default.png',
  };
}
