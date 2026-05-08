import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';
import { getCanonicalPath } from '@/lib/apexlyn-seo';
import { getPublishedResource } from '@/lib/apexlyn-resources';

export type BreadcrumbItem = { label: string; href: string };

const HOME: BreadcrumbItem = { label: 'Home', href: '/' };

/** Visible breadcrumb trail (§23) — homepage returns []. */
export function getBreadcrumbsForPath(pathname: string): BreadcrumbItem[] {
  const raw = pathname.split('?')[0] || '/';
  const norm = getCanonicalPath(raw);
  if (norm === '/' || norm === '') return [];

  if (norm === '/track') return [HOME, { label: 'Track', href: '/track' }];
  if (norm === '/lens') return [HOME, { label: 'Lens', href: '/lens' }];
  if (norm === '/architecture') return [HOME, { label: 'Architecture', href: '/architecture' }];
  if (norm === '/trust') return [HOME, { label: 'Trust Center', href: '/trust' }];
  if (norm === '/pricing') return [HOME, { label: 'Pricing', href: '/pricing' }];
  if (norm === '/about') return [HOME, { label: 'About', href: '/about' }];
  if (norm === '/contact') return [HOME, { label: 'Contact', href: '/contact' }];
  if (norm === '/baseline') return [HOME, { label: 'Test Your Security State', href: '/baseline' }];
  if (norm === '/documentation') return [HOME, { label: 'Request Documentation', href: '/documentation' }];
  if (norm === '/resources') return [HOME, { label: 'Resources', href: '/resources' }];
  if (norm === '/industries') return [HOME, { label: 'Industries', href: '/industries' }];
  if (norm === '/privacy') return [HOME, { label: 'Privacy Policy', href: '/privacy' }];
  if (norm === '/terms') return [HOME, { label: 'Terms of Use', href: '/terms' }];
  if (norm === '/cookies') return [HOME, { label: 'Cookie Policy', href: '/cookies' }];
  if (norm === '/disclaimer') return [HOME, { label: 'Disclaimer', href: '/disclaimer' }];
  if (norm === '/404') return [HOME, { label: 'Not Found', href: '/404' }];

  if (norm.startsWith('/industries/')) {
    const slug = norm.split('/')[2];
    const labelMap: Record<string, string> = {
      healthcare: 'Healthcare',
      legal: 'Legal',
      accounting: 'Accounting & Finance',
      insurance: 'Insurance',
      'professional-services': 'Professional Services',
      'msp-partners': 'MSP & Partners',
    };
    const cur = labelMap[slug ?? ''] ?? (slug ?? 'Industry').replace(/-/g, ' ');
    return [HOME, { label: 'Industries', href: '/industries' }, { label: cur, href: norm }];
  }

  const articleMatch = /^\/resources\/(whitepapers|framework-guides|ai-risk-briefs)\/([^/]+)$/.exec(norm);
  if (articleMatch) {
    const cat = articleMatch[1];
    const slug = articleMatch[2];
    if (cat && slug) {
      const r = getPublishedResource(cat, slug);
      const catLabel =
        cat === 'whitepapers' ? 'Whitepapers' : cat === 'framework-guides' ? 'Framework guides' : 'AI risk briefs';
      if (r && r.content?.trim().length >= 20) {
        return [
          HOME,
          { label: 'Resources', href: '/resources' },
          { label: catLabel, href: `/resources#${cat}` },
          { label: r.title, href: norm },
        ];
      }
    }
  }

  if (norm.startsWith('/resources/')) {
    const slug = norm.split('/')[2];
    const labelMap: Record<string, string> = {
      whitepapers: 'Whitepapers',
      'framework-guides': 'Framework Guides',
      'ai-risk-briefs': 'AI Risk Briefs',
      blog: 'Blog',
      'case-studies': 'Case Studies',
      webinars: 'Webinars',
      documentation: 'Documentation',
      community: 'Community',
    };
    const cur =
      labelMap[slug ?? ''] ??
      (slug ?? 'Resources')
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    return [HOME, { label: 'Resources', href: '/resources' }, { label: cur, href: norm }];
  }

  return [HOME, { label: 'Page', href: norm }];
}

/** JSON-LD BreadcrumbList (§20.8) — null on homepage. */
export function buildBreadcrumbJsonLd(pathname: string): object | null {
  const raw = pathname.split('?')[0] || '/';
  const pathCanon = getCanonicalPath(raw);
  const items = getBreadcrumbsForPath(pathCanon);
  if (items.length === 0) return null;
  const elements = items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    item: `${SITE_ORIGIN}${it.href === '/' ? '' : it.href}`,
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: elements,
  };
}

export function buildOrganizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'APEXLyn',
    legalName: 'APEXLyn Pty Ltd',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/logo.png`,
    description:
      'Australian cybersecurity and AI governance company. Two platforms — Track for compliance evidence and Lens for AI governance evidence.',
    foundingDate: '2026',
    founder: {
      '@type': 'Person',
      name: 'Vishwa Teja Mardha',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    email: 'hello@apexlyn.com.au',
    telephone: '[PHONE NUMBER]',
    sameAs: ['https://www.linkedin.com/company/apexlyn'],
    knowsAbout: [
      'cybersecurity compliance',
      'AI governance',
      'evidence infrastructure',
      'Essential Eight',
      'ISO 27001',
      'APRA CPS 234',
      'Australian Privacy Principles',
    ],
  };
}

export function buildWebSiteJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'APEXLyn',
    url: SITE_ORIGIN,
  };
}
