import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ApexlynLogo } from '@/components/ApexlynLogo';
import { CookieAnalyticsConsent } from '@/components/CookieAnalyticsConsent';
import { GlobalBreadcrumbs } from '@/components/GlobalBreadcrumbs';
import { Spinner } from '@/components/ui/spinner';
import { captureApexPageView, syncPosthogLegalPageMode } from '@/lib/apexlyn-analytics-consent';
import {
  formatHubSpotSubmitError,
  HUBSPOT_FORM_IDS,
  initFormAttributionSession,
  submitHubSpotForm,
  validateWorkEmail,
} from '@/lib/apexlyn-form-shared';
import { getSeoForPathname } from '@/lib/apexlyn-seo';
import { APEXLN_COMPANY } from '@/lib/apexlyn-company';

const SIGN_UP_URL = '/pricing';
const COMPANY_CAREERS_HREF = '/company/careers';
const LEGAL_PRIVACY_HREF = '/privacy';
const LEGAL_TERMS_HREF = '/terms';

/** Internal routes only; legacy placeholder URLs should not remap to non-APEXLyn pages. */
const normalizeHref = (href: string) => {
  if (href === '#') return '/';
  return href;
};

const NAV_CTA_TEST_SECURITY_HREF = '/baseline';

const pathOnly = (path: string) => path.split('?')[0] || '/';

/** §8.4 — top-level group matches current route (for persistent active styling). */
function isRouteInNavGroup(groupName: string, locationPath: string): boolean {
  const p = pathOnly(locationPath);
  switch (groupName) {
    case 'Platforms':
      return (
        p === '/platforms' ||
        p.startsWith('/platforms/') ||
        p === '/architecture-overview' ||
        p === '/track' ||
        p === '/lens' ||
        p === '/architecture'
      );
    case 'Solutions':
      return p === '/solutions' || p.startsWith('/solutions/');
    case 'Industries':
      return p === '/industries' || p.startsWith('/industries/');
    case 'Resources':
      return p === '/resources' || p.startsWith('/resources/');
    case 'Company':
      return p === '/contact' || p === '/about' || p === '/company' || p.startsWith('/company/');
    default:
      return false;
  }
}

/** §8.4 — sub-link (dropdown / drawer) is current page. */
function isActiveNavHref(href: string, locationPath: string): boolean {
  const h = normalizeHref(href);
  const p = pathOnly(locationPath);
  if (h === p) return true;
  if (h.length > 1 && p.startsWith(h.endsWith('/') ? h : `${h}/`)) return true;
  return false;
}

/** §17.3 — hover delays (desktop mega-dropdown). */
const DESKTOP_DROPDOWN_HOVER_OPEN_MS = 150;
const DESKTOP_DROPDOWN_HOVER_CLOSE_MS = 300;

/**
 * Approved mega-nav structure (founder) with v2.0 routes and descriptions.
 * §17.3 Solutions + Industries dropdown copy aligns with canonical URLs.
 */
const NAV_ITEMS = [
  {
    name: 'Platforms',
    href: '/platforms',
    dropdown: {
      columns: [
        {
          title: 'Platforms',
          items: [
            { label: 'APEXLyn Track', desc: 'Evidence-led compliance engine', href: '/track' },
            { label: 'APEXLyn Lens', desc: 'AI security and evidence platform', href: '/lens' },
            { label: 'Architecture', desc: 'How our evidence infrastructure works', href: '/architecture' },
          ],
        },
      ],
    },
  },
  {
    name: 'Solutions',
    href: '/solutions',
    dropdown: {
      columns: [
        {
          title: 'Solutions',
          items: [
            { label: 'Cyber Security Services', desc: 'Operational uplift and control stabilisation', href: '/solutions/cyber-security-services' },
            { label: 'AI Governance Advisory', desc: 'Policies, controls, and safe AI operating models', href: '/solutions/ai-governance-advisory' },
            { label: 'Compliance Operations', desc: 'Frameworks, evidence mapping, and review cadence', href: '/solutions/compliance-operations' },
          ],
        },
      ],
    },
  },
  {
    name: 'Industries',
    href: '/industries',
    dropdown: {
      columns: [
        {
          title: 'Industries',
          items: [
            { label: 'Healthcare', desc: 'Security and compliance for care delivery', href: '/industries/healthcare' },
            { label: 'Legal', desc: 'Protect matter data and client trust', href: '/industries/legal' },
            { label: 'Accounting & Finance', desc: 'Safeguard financial and client records', href: '/industries/accounting' },
            { label: 'Insurance', desc: 'Resilience for policyholder data', href: '/industries/insurance' },
            { label: 'MSP & Partners', desc: 'Scale security services for customers', href: '/industries/msp-partners' },
            { label: 'Professional Services', desc: 'Confidentiality across client work', href: '/industries/professional-services' },
          ],
        },
      ],
    },
  },
  {
    name: 'Resources',
    href: '/resources',
    dropdown: {
      columns: [
        {
          title: 'Resources',
          items: [
            { label: 'Whitepapers', desc: 'Research and architecture depth', href: '/resources/whitepapers' },
            { label: 'Framework Guides', desc: 'Map controls to the standards you use', href: '/resources/framework-guides' },
            { label: 'AI Risk Briefs', desc: 'Concise guidance on AI risk', href: '/resources/ai-risk-briefs' },
          ],
        },
      ],
    },
  },
  {
    name: 'Company',
    href: '/about',
    dropdown: {
      columns: [
        {
          title: 'Company',
          items: [
            { label: 'About', desc: 'Who we are and what we build', href: '/about' },
            { label: 'Careers', desc: 'Join the APEXLyn team', href: COMPANY_CAREERS_HREF },
            { label: 'Contact', desc: 'Speak with our team', href: '/contact' },
          ],
        },
      ],
    },
  },
];

/** §17.2 — 64px mobile / 72px desktop; logo scaled to fit. */
const HEADER_LOGO_DESKTOP_PX = 44;

/** Standard marketing nav: quiet links + pill hover; tighter at lg so one row avoids overlap. */
const desktopNavTrigger = cn(
  'inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium transition-colors duration-150',
  'xl:gap-1 xl:px-3 xl:py-2 xl:text-[15px]',
  'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/35 focus-visible:ring-offset-2',
);
const desktopNavTriggerActive = 'bg-slate-100 text-slate-900 shadow-sm';
const desktopNavLink = cn(
  'shrink-0 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium transition-colors duration-150',
  'xl:px-3 xl:py-2 xl:text-[15px]',
  'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/35 focus-visible:ring-offset-2',
);
const desktopNavLinkActive = 'bg-slate-100 text-slate-900';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openDelayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    initFormAttributionSession();
    syncPosthogLegalPageMode(pathOnly(location));
    const p = pathOnly(location);
    const seo = getSeoForPathname(p);
    const is404 = seo?.title === 'Page Not Found | APEXLyn';
    captureApexPageView({ path: p, attemptedPath: is404 ? p : undefined, is404 });
    if (openDelayTimer.current) {
      clearTimeout(openDelayTimer.current);
      openDelayTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openDelayTimer.current) {
          clearTimeout(openDelayTimer.current);
          openDelayTimer.current = null;
        }
        if (closeTimer.current) {
          clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setMobileExpanded(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const clearOpenDelay = () => {
    if (openDelayTimer.current) {
      clearTimeout(openDelayTimer.current);
      openDelayTimer.current = null;
    }
  };

  /** §8.2 — open on hover after short delay (not instant) */
  const scheduleOpenDropdown = (name: string) => {
    clearOpenDelay();
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openDelayTimer.current = setTimeout(() => {
      openDelayTimer.current = null;
      setActiveDropdown(name);
    }, DESKTOP_DROPDOWN_HOVER_OPEN_MS);
  };

  /** §8.2 — click: open/close immediately (a11y); only one section open at a time */
  const onDesktopNavClick = (name: string) => {
    clearOpenDelay();
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const startCloseTimer = () => {
    clearOpenDelay();
    closeTimer.current = setTimeout(() => setActiveDropdown(null), DESKTOP_DROPDOWN_HOVER_CLOSE_MS);
  };

  const cancelCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  /** Dismiss any pending open/close animation timers (used when navigating away). */
  const dismissDesktopDropdown = () => {
    clearOpenDelay();
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(null);
  };

  const activeItem = NAV_ITEMS.find((i) => i.name === activeDropdown);

  const onSubmitNewsletter = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (newsletterBusy || newsletterDone) return;

      const email = newsletterEmail.trim();
      const v = validateWorkEmail(email);
      if (v) {
        setNewsletterError(v);
        return;
      }

      setNewsletterBusy(true);
      setNewsletterError(null);
      try {
        await submitHubSpotForm(HUBSPOT_FORM_IDS.apexlyn_newsletter, [{ name: 'email', value: email }]);
        setNewsletterDone(true);
      } catch (err) {
        setNewsletterError(formatHubSpotSubmitError(err));
      } finally {
        setNewsletterBusy(false);
      }
    },
    [newsletterBusy, newsletterDone, newsletterEmail],
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">

      {/* §17.2 — standard SaaS-style bar: white, subtle border, centered nav, light dropdowns */}
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 inset-x-0 z-50 w-full border-b border-slate-200/90 bg-white apex-site-header',
          headerScrolled && 'shadow-sm shadow-slate-900/5',
        )}
      >
        <div className="mx-auto grid h-16 min-h-[4rem] w-full max-w-[1280px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:h-[72px] lg:min-h-[72px] lg:gap-4 lg:px-6">
          <div className="flex min-w-0 items-center justify-self-start">
            <Link
              href="/"
              className="flex max-w-[min(52vw,220px)] items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/35 focus-visible:ring-offset-2 sm:max-w-[min(60vw,280px)] lg:max-w-[min(42vw,260px)] xl:max-w-[min(72vw,380px)]"
              onClick={dismissDesktopDropdown}
              aria-label="APEXLyn home"
            >
              <ApexlynLogo
                variant="wordmark"
                forDarkBackground={false}
                align="start"
                height={HEADER_LOGO_DESKTOP_PX}
                priority
                className="w-auto min-w-0 [&_img]:h-full [&_img]:max-h-[34px] [&_img]:w-auto lg:[&_img]:max-h-[44px] [&_img]:max-w-full [&_img]:object-contain [&_img]:object-left"
              />
            </Link>
          </div>

          <nav
            className="hidden min-w-0 justify-self-stretch overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] lg:block [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            <div className="flex min-w-full justify-center py-0.5">
              <div className="inline-flex flex-nowrap items-center gap-0 pr-0.5 xl:gap-0.5">
            {NAV_ITEMS.map((item) => {
              const navItemOpen = activeDropdown === item.name;
              const navItemRoute = isRouteInNavGroup(item.name, location);
              return (
                <button
                  key={item.name}
                  type="button"
                  onMouseEnter={() => scheduleOpenDropdown(item.name)}
                  onMouseLeave={startCloseTimer}
                  onClick={() => onDesktopNavClick(item.name)}
                  aria-expanded={navItemOpen}
                  aria-haspopup="true"
                  aria-label={`${item.name} menu${navItemRoute ? ', current section' : ''}`}
                  className={cn(
                    desktopNavTrigger,
                    (navItemOpen || navItemRoute) && desktopNavTriggerActive,
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200',
                      navItemOpen && 'rotate-180 text-slate-600',
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
            <Link
              href="/trust"
              onClick={dismissDesktopDropdown}
              aria-current={
                pathOnly(location) === '/trust' || pathOnly(location) === '/trust-center' ? 'page' : undefined
              }
              className={cn(
                desktopNavLink,
                (pathOnly(location) === '/trust' || pathOnly(location) === '/trust-center') && desktopNavLinkActive,
              )}
            >
              <span className="xl:hidden">Trust</span>
              <span className="hidden xl:inline">Trust Center</span>
            </Link>
            <Link
              href="/pricing"
              onClick={dismissDesktopDropdown}
              aria-current={pathOnly(location) === '/pricing' ? 'page' : undefined}
              className={cn(desktopNavLink, pathOnly(location) === '/pricing' && desktopNavLinkActive)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              onClick={dismissDesktopDropdown}
              aria-current={pathOnly(location) === '/about' ? 'page' : undefined}
              className={cn(desktopNavLink, pathOnly(location) === '/about' && desktopNavLinkActive)}
            >
              About
            </Link>
              </div>
            </div>
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2">
            <Link
              href={NAV_CTA_TEST_SECURITY_HREF}
              onClick={dismissDesktopDropdown}
              aria-label="Test your security state"
              aria-current={
                pathOnly(location) === '/baseline' ||
                pathOnly(location) === '/test-your-security-state' ||
                pathOnly(location) === '/test-security-state'
                  ? 'page'
                  : undefined
              }
              className={cn(
                'hidden min-h-[44px] items-center justify-center whitespace-nowrap rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 lg:inline-flex xl:px-3.5 xl:text-[14px]',
                (pathOnly(location) === '/baseline' ||
                  pathOnly(location) === '/test-your-security-state' ||
                  pathOnly(location) === '/test-security-state') &&
                  'border-[#1E3A8A] bg-[#1E3A8A]/[0.06] text-[#1E3A8A]',
              )}
            >
              <span className="xl:hidden">Security check</span>
              <span className="hidden xl:inline">Test your security state</span>
            </Link>
            <Link
              href="/contact"
              onClick={dismissDesktopDropdown}
              aria-label="Start a conversation with APEXLyn"
              className="hidden min-h-[44px] items-center justify-center whitespace-nowrap rounded-lg bg-[#1E3A8A] px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#172E73] lg:inline-flex xl:px-4 xl:text-[14px]"
            >
              <span className="xl:hidden">Contact us</span>
              <span className="hidden xl:inline">Start a conversation</span>
            </Link>
            <button
              type="button"
              className="-mr-1 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-800 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'site-mobile-nav-panel' : undefined}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* Light dropdown panel — standard product-site pattern */}
      <AnimatePresence>
        {activeDropdown && activeItem && (
          <motion.div
            key={activeDropdown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 top-16 z-40 border-b border-slate-200 bg-white shadow-[0_16px_48px_-12px_rgba(15,23,42,0.12)] lg:top-[72px]"
            onMouseEnter={() => {
              cancelCloseTimer();
              clearOpenDelay();
            }}
            onMouseLeave={startCloseTimer}
          >
            <div className="mx-auto max-w-[1280px] px-3 py-6 sm:px-5 lg:px-6">
              <div
                className="grid gap-8 lg:gap-12"
                style={{ gridTemplateColumns: `repeat(${activeItem.dropdown.columns.length}, minmax(0, 1fr))` }}
              >
                {activeItem.dropdown.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {col.title}
                    </p>
                    <ul className="space-y-1">
                      {col.items.map((sub) => {
                        const subHref = normalizeHref(sub.href || '#');
                        const subActive = isActiveNavHref(sub.href || '#', location);
                        return (
                          <li key={sub.label}>
                            <Link
                              href={subHref}
                              onClick={dismissDesktopDropdown}
                              aria-current={subActive ? 'page' : undefined}
                              className={cn(
                                'group flex flex-col rounded-lg px-3 py-2.5 transition-colors',
                                subActive ? 'bg-slate-100 ring-1 ring-slate-200/80' : 'hover:bg-slate-50',
                              )}
                            >
                              <span className="text-[15px] font-medium text-slate-900">{sub.label}</span>
                              <span className="mt-0.5 text-[13px] leading-snug text-slate-500">{sub.desc}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-16 z-30 bg-slate-900/[0.08] backdrop-blur-[1px] lg:top-[72px]"
            onClick={dismissDesktopDropdown}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Mobile — white drawer, standard app pattern */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="site-mobile-nav-panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[60] flex w-[min(100%,400px)] flex-col border-l border-slate-200 bg-white shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
              <Link
                href="/"
                className="flex min-w-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/35 focus-visible:ring-offset-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="APEXLyn home"
              >
                <ApexlynLogo
                  variant="wordmark"
                  forDarkBackground={false}
                  align="start"
                  height={36}
                  priority
                  className="h-9 w-auto max-w-[min(70vw,280px)] [&_img]:h-full [&_img]:max-h-9 [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain [&_img]:object-left"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-2" aria-label="Primary mobile">
              {NAV_ITEMS.map((item) => {
                const sectionOpen = mobileExpanded === item.name;
                const sectionRoute = isRouteInNavGroup(item.name, location);
                const flatMenu = item.name === 'Solutions' || item.name === 'Industries';

                if (flatMenu) {
                  return (
                    <div key={item.name} className="border-b border-slate-100 py-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {item.name}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {item.dropdown.columns[0].items.map((sub) => {
                          const mActive = isActiveNavHref(sub.href, location);
                          return (
                            <Link
                              key={sub.label}
                              href={normalizeHref(sub.href)}
                              aria-current={mActive ? 'page' : undefined}
                              className={cn(
                                'flex flex-col rounded-lg px-3 py-3',
                                mActive ? 'bg-slate-100' : 'hover:bg-slate-50',
                              )}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileExpanded(null);
                              }}
                            >
                              <span className="text-[16px] font-medium leading-snug text-slate-900">{sub.label}</span>
                              {sub.desc ? (
                                <span className="mt-1 text-[14px] font-normal leading-snug text-slate-500">{sub.desc}</span>
                              ) : null}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.name} className="border-b border-slate-100">
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-1 py-3.5 text-left text-[16px] font-medium text-slate-900',
                        sectionRoute && 'text-[#1E3A8A]',
                      )}
                      onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                      aria-expanded={sectionOpen}
                      aria-label={`${item.name} menu${sectionRoute ? ', current section' : ''}`}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200',
                          sectionOpen && 'rotate-180 text-slate-600',
                        )}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence>
                      {sectionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pb-4 pl-1">
                            {item.dropdown.columns.map((col) => (
                              <div key={col.title}>
                                <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                                  {col.title}
                                </p>
                                {col.items.map((sub) => {
                                  const mActive = isActiveNavHref(sub.href, location);
                                  return (
                                    <Link
                                      key={sub.label}
                                      href={normalizeHref(sub.href)}
                                      aria-current={mActive ? 'page' : undefined}
                                      className={cn(
                                        'flex flex-col rounded-lg px-2 py-2.5',
                                        mActive ? 'bg-slate-100' : 'hover:bg-slate-50',
                                      )}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setMobileExpanded(null);
                                      }}
                                    >
                                      <span className="text-[15px] font-medium text-slate-900">{sub.label}</span>
                                      <span className="mt-0.5 text-[13px] text-slate-500">{sub.desc}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="border-b border-slate-100 py-1">
                <Link
                  href="/trust"
                  aria-current={
                    pathOnly(location) === '/trust' || pathOnly(location) === '/trust-center' ? 'page' : undefined
                  }
                  className={cn(
                    'block rounded-lg px-2 py-3.5 text-[16px] font-medium text-slate-900 hover:bg-slate-50',
                    (pathOnly(location) === '/trust' || pathOnly(location) === '/trust-center') && 'bg-slate-100 text-[#1E3A8A]',
                  )}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Trust Center
                </Link>
                <Link
                  href="/pricing"
                  aria-current={pathOnly(location) === '/pricing' ? 'page' : undefined}
                  className={cn(
                    'block rounded-lg px-2 py-3.5 text-[16px] font-medium text-slate-900 hover:bg-slate-50',
                    pathOnly(location) === '/pricing' && 'bg-slate-100 text-[#1E3A8A]',
                  )}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  aria-current={pathOnly(location) === '/about' ? 'page' : undefined}
                  className={cn(
                    'block rounded-lg px-2 py-3.5 text-[16px] font-medium text-slate-900 hover:bg-slate-50',
                    pathOnly(location) === '/about' && 'bg-slate-100 text-[#1E3A8A]',
                  )}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  About
                </Link>
                <Link
                  href={NAV_CTA_TEST_SECURITY_HREF}
                  aria-current={
                    pathOnly(location) === '/baseline' ||
                    pathOnly(location) === '/test-your-security-state' ||
                    pathOnly(location) === '/test-security-state'
                      ? 'page'
                      : undefined
                  }
                  className={cn(
                    'mx-2 mb-2 mt-1 block rounded-lg border border-slate-300 py-3 text-center text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50',
                    (pathOnly(location) === '/baseline' ||
                      pathOnly(location) === '/test-your-security-state' ||
                      pathOnly(location) === '/test-security-state') &&
                      'border-[#1E3A8A] bg-[#1E3A8A]/[0.06] text-[#1E3A8A]',
                  )}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Test your security state
                </Link>
              </div>
            </nav>

            <div className="shrink-0 space-y-3 border-t border-slate-200 bg-slate-50/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href="/contact"
                className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1E3A8A] text-[16px] font-semibold text-white shadow-sm transition-colors hover:bg-[#172E73]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start a conversation
              </Link>
              <Link
                href={SIGN_UP_URL}
                className="block py-2 text-center text-[14px] font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                View pricing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay behind drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-slate-900/25 lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-grow pt-16 lg:pt-[72px]">
        <GlobalBreadcrumbs className="apex-global-breadcrumbs" />
        {children}
      </main>

      <CookieAnalyticsConsent />

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 bg-[#0B1320] pt-16 pb-12 apex-site-footer">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <motion.div className="flex flex-col items-start text-left">
              <Link
                href="/"
                className="mb-5 inline-flex w-full items-center justify-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E90FF]/40"
                aria-label="APEXLyn home"
              >
                <ApexlynLogo variant="wordmark" forDarkBackground align="start" height={44} className="h-11 w-auto max-w-full [&_img]:max-w-[min(100%,280px)]" />
              </Link>
              <p className="text-[14px] leading-relaxed text-white/70">
                Where Security Becomes Evidence
                <br />
                Australian cybersecurity and AI governance.
                <br />
                Two platforms. One evidence standard.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/70">ABN: {APEXLN_COMPANY.abn}</p>
            </motion.div>

            <div>
              <h4 className="mb-4 text-[14px] font-medium text-white">Platforms</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Track — Compliance Evidence', href: '/track' },
                  { label: 'Lens — AI Governance', href: '/lens' },
                  { label: 'Architecture', href: '/architecture' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Trust Center', href: '/trust' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={normalizeHref(link.href)}
                      className="text-[14px] text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[14px] font-medium text-white">Industries</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Healthcare', href: '/industries/healthcare' },
                  { label: 'Legal', href: '/industries/legal' },
                  { label: 'Accounting & Finance', href: '/industries/accounting' },
                  { label: 'Insurance', href: '/industries/insurance' },
                  { label: 'Professional Services', href: '/industries/professional-services' },
                  { label: 'MSP & Partners', href: '/industries/msp-partners' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={normalizeHref(link.href)}
                      className="text-[14px] text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[14px] font-medium text-white">Company</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Resources', href: '/resources' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Use', href: '/terms' },
                  { label: 'Cookie Policy', href: '/cookies' },
                  { label: 'Disclaimer', href: '/disclaimer' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={normalizeHref(link.href)}
                      className="text-[14px] text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-relaxed text-white/70">
                Email:{' '}
                <a href={`mailto:${APEXLN_COMPANY.email}`} className="text-white/70 hover:text-white">
                  {APEXLN_COMPANY.email}
                </a>
                <br />
                Phone:{' '}
                {(() => {
                  const tel = APEXLN_COMPANY.phone.replace(/[^\d+]/g, '');
                  return tel.length >= 8 ? (
                    <a href={`tel:${tel}`} className="text-white/70 hover:text-white">
                      {APEXLN_COMPANY.phone}
                    </a>
                  ) : (
                    <span>{APEXLN_COMPANY.phone}</span>
                  );
                })()}
                <br />
                Location: Sydney, Australia
              </p>
            </div>
          </motion.div>

          <div className="mb-8 border-t border-white/10 pt-8">
            <p className="mb-4 text-[14px] leading-relaxed text-white/70">
              Stay informed on security evidence and AI governance in Australia.
            </p>
            {newsletterDone ? (
              <p className="text-[14px] text-white/70">Thanks — you&apos;re subscribed.</p>
            ) : (
              <form onSubmit={onSubmitNewsletter} className="max-w-[640px]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <label className="sr-only" htmlFor="footer-newsletter-email">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setNewsletterError(null);
                    }}
                    placeholder="Your work email"
                    className="min-h-[44px] flex-1 rounded-lg border border-white/20 bg-white/5 px-4 text-[16px] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/40"
                    aria-invalid={newsletterError ? true : undefined}
                    aria-describedby={newsletterError ? 'footer-newsletter-error' : undefined}
                    disabled={newsletterBusy}
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/40 bg-transparent px-6 text-[16px] font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
                    disabled={newsletterBusy}
                  >
                    {newsletterBusy ? <Spinner className="h-4 w-4" /> : null}
                    Subscribe
                  </button>
                </div>
                {newsletterError ? (
                  <p id="footer-newsletter-error" className="mt-2 text-[12px] text-rose-200">
                    {newsletterError}
                  </p>
                ) : null}
                <p className="mt-3 text-[12px] leading-relaxed text-white/50">
                  We send occasional updates. No spam. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] text-white/50 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} APEXLyn Pty Ltd. All rights reserved.</p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link href={LEGAL_PRIVACY_HREF} className="transition-colors hover:text-white/80">
                Privacy Policy
              </Link>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <Link href={LEGAL_TERMS_HREF} className="transition-colors hover:text-white/80">
                Terms of Use
              </Link>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <Link href="/cookies" className="transition-colors hover:text-white/80">
                Cookie Policy
              </Link>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <Link href="/disclaimer" className="transition-colors hover:text-white/80">
                Disclaimer
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
