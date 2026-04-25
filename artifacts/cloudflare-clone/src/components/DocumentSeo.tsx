import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { getSeoForPathname, toSeoConfig, getAbsoluteUrl } from '@/lib/apexlyn-seo';

function ensureMeta(
  isProperty: boolean,
  key: string,
  content: string
): void {
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

/**
 * §12 — Updates document title, meta description, and Open Graph / Twitter tags from the current route.
 * Must render under Wouter <Router />.
 */
export function DocumentSeo() {
  const [location] = useLocation();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    const pathOnly = (location || '/').split('?')[0] || '/';
    const config = toSeoConfig(getSeoForPathname(pathOnly));
    const origin = window.location.origin;

    document.title = config.title;
    ensureMeta(false, 'description', config.description);
    ensureMeta(true, 'og:title', config.ogTitle);
    ensureMeta(true, 'og:description', config.ogDescription);
    const imageAbs = getAbsoluteUrl(config.ogImage, origin, base);
    ensureMeta(true, 'og:image', imageAbs);
    ensureMeta(true, 'og:type', 'website');
    const canonical = window.location.href.split('#')[0];
    ensureMeta(true, 'og:url', canonical);
    ensureMeta(false, 'twitter:card', 'summary_large_image');
    ensureMeta(false, 'twitter:title', config.ogTitle);
    ensureMeta(false, 'twitter:description', config.ogDescription);
    ensureMeta(false, 'twitter:image', imageAbs);
  }, [location, base]);

  return null;
}
