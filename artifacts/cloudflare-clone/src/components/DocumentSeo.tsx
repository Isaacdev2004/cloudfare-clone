import { useEffect } from 'react';
import { useLocation } from 'wouter';
import {
  getSeoForPathname,
  toSeoConfig,
  getAbsoluteUrl,
  getCanonicalPath,
} from '@/lib/apexlyn-seo';
import { SITE_ORIGIN } from '@/lib/apexlyn-site-origin';
import {
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from '@/lib/apexlyn-jsonld-breadcrumbs';
import { buildTrackSoftwareApplicationJsonLd } from '@/lib/apexlyn-track-schema';
import { buildLensSoftwareApplicationJsonLd } from '@/lib/apexlyn-lens-schema';
import { buildArchitectureTechArticleJsonLd } from '@/lib/apexlyn-architecture-schema';
import { buildIndustryWebPageJsonLd, isIndustryWebPageSlug } from '@/lib/apexlyn-industry-schema';
import { buildTrustFaqPageJsonLd, buildTrustWebPageJsonLd } from '@/lib/apexlyn-trust-schema';
import { buildPricingFaqPageJsonLd } from '@/lib/apexlyn-pricing-schema';
import {
  buildResourcesCollectionPageJsonLd,
  buildResourceTechArticleJsonLd,
} from '@/lib/apexlyn-resources-schema';
import { getPublishedResource } from '@/lib/apexlyn-resources';
import { buildLegalWebPageJsonLd } from '@/lib/apexlyn-legal-webpage-schema';
import { LEGAL_PAGE_LAST_UPDATED_ISO, type LegalPageSlug } from '@/generated/legal-dates';

function ensureMeta(isProperty: boolean, key: string, content: string): void {
  const attr = isProperty ? 'property' : 'name';
  const query = isProperty
    ? `meta[property="${key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`
    : `meta[name="${key}"]`;
  let el = document.head.querySelector(query) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureLinkRel(rel: string, href: string): void {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function ensureJsonLd(id: string, data: object | null): void {
  if (data == null) {
    document.getElementById(id)?.remove();
    return;
  }
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeMetaByName(name: string): void {
  document.head.querySelectorAll(`meta[name="${name}"]`).forEach((n) => n.remove());
}

/**
 * §12 / §20 / §21 — Title, description, canonical, Open Graph, Twitter, JSON-LD.
 * Must render under Wouter <Router />.
 */
export function DocumentSeo() {
  const [location] = useLocation();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    const pathOnly = (location || '/').split('?')[0] || '/';
    const pathNorm = getCanonicalPath(pathOnly);
    const config = toSeoConfig(getSeoForPathname(pathOnly));
    const origin = typeof window !== 'undefined' ? window.location.origin : SITE_ORIGIN;

    document.title = config.title;
    const is404 = pathNorm === '/404' || config.title === 'Page Not Found | APEXLyn';
    if (is404) {
      removeMetaByName('description');
      ensureMeta(false, 'robots', 'noindex, nofollow');
    } else {
      removeMetaByName('robots');
      ensureMeta(false, 'description', config.description);
    }

    const canonicalUrl = `${SITE_ORIGIN}${pathNorm === '/' ? '' : pathNorm}`;
    ensureLinkRel('canonical', canonicalUrl);

    ensureMeta(true, 'og:site_name', 'APEXLyn');
    ensureMeta(true, 'og:type', 'website');
    ensureMeta(true, 'og:locale', 'en_AU');
    ensureMeta(true, 'og:url', canonicalUrl);
    ensureMeta(true, 'og:title', config.ogTitle);
    ensureMeta(true, 'og:description', config.ogDescription);
    const imageAbs = getAbsoluteUrl(config.ogImage, origin, base);
    ensureMeta(true, 'og:image', imageAbs);
    ensureMeta(true, 'og:image:width', '1200');
    ensureMeta(true, 'og:image:height', '630');

    ensureMeta(false, 'twitter:card', 'summary_large_image');
    ensureMeta(false, 'twitter:title', config.ogTitle);
    ensureMeta(false, 'twitter:description', config.ogDescription);
    ensureMeta(false, 'twitter:image', imageAbs);

    const industrySlugMatch = /^\/industries\/([^/]+)$/.exec(pathNorm);
    const industrySlug = industrySlugMatch?.[1] ?? '';

    ensureJsonLd('apexlyn-jsonld-org', buildOrganizationJsonLd());
    ensureJsonLd('apexlyn-jsonld-bc', pathNorm === '/' ? null : buildBreadcrumbJsonLd(pathOnly));
    ensureJsonLd('apexlyn-jsonld-site', pathNorm === '/' ? buildWebSiteJsonLd() : null);
    ensureJsonLd(
      'apexlyn-jsonld-track-app',
      pathNorm === '/track' ? buildTrackSoftwareApplicationJsonLd() : null,
    );
    ensureJsonLd(
      'apexlyn-jsonld-lens-app',
      pathNorm === '/lens' ? buildLensSoftwareApplicationJsonLd() : null,
    );
    ensureJsonLd(
      'apexlyn-jsonld-arch-techarticle',
      pathNorm === '/architecture' ? buildArchitectureTechArticleJsonLd() : null,
    );
    ensureJsonLd(
      'apexlyn-jsonld-industry-webpage',
      industrySlug && isIndustryWebPageSlug(industrySlug) ? buildIndustryWebPageJsonLd(industrySlug) : null,
    );
    ensureJsonLd('apexlyn-jsonld-trust-webpage', pathNorm === '/trust' ? buildTrustWebPageJsonLd() : null);
    ensureJsonLd('apexlyn-jsonld-trust-faq', pathNorm === '/trust' ? buildTrustFaqPageJsonLd() : null);
    ensureJsonLd('apexlyn-jsonld-pricing-faq', pathNorm === '/pricing' ? buildPricingFaqPageJsonLd() : null);

    const resourceArticleMatch =
      /^\/resources\/(whitepapers|framework-guides|ai-risk-briefs)\/([^/]+)$/.exec(pathNorm);
    let resourceArticleLd: object | null = null;
    if (resourceArticleMatch) {
      const cat = resourceArticleMatch[1];
      const slug = resourceArticleMatch[2];
      if (cat && slug) {
        const r = getPublishedResource(cat, slug);
        if (r && r.content.trim().length >= 20) {
          resourceArticleLd = buildResourceTechArticleJsonLd({
            title: r.title,
            description: r.description,
            datePublished: r.publishedDate,
            dateModified: r.updatedDate,
            urlPath: pathNorm,
          });
        }
      }
    }
    ensureJsonLd(
      'apexlyn-jsonld-resources-collection',
      pathNorm === '/resources' ? buildResourcesCollectionPageJsonLd() : null,
    );
    ensureJsonLd('apexlyn-jsonld-resource-article', resourceArticleLd);

    const LEGAL_PAGE_SLUG: Partial<Record<string, LegalPageSlug>> = {
      '/privacy': 'privacy',
      '/terms': 'terms',
      '/cookies': 'cookies',
      '/disclaimer': 'disclaimer',
    };
    const legalSlug = LEGAL_PAGE_SLUG[pathNorm];
    ensureJsonLd(
      'apexlyn-jsonld-legal-webpage',
      legalSlug != null
        ? buildLegalWebPageJsonLd({
            name: config.title,
            path: pathNorm,
            description: config.description,
            dateModifiedIso: LEGAL_PAGE_LAST_UPDATED_ISO[legalSlug],
          })
        : null,
    );
  }, [location, base]);

  return null;
}
