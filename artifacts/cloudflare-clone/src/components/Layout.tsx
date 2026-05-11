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
            { label: 'MSP / Partners', desc: 'Scale security services for customers', href: '/industries/msp-partners' },
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

      {/* §17.2 + approved mega-nav — heights, border, scroll shadow */}
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 inset-x-0 z-50 w-full border-b border-[#E5E7EB] bg-white apex-site-header',
          headerScrolled && 'shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
        )}
      >
        <div className="mx-auto flex h-16 min-h-[4rem] w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:min-h-[72px]">
          <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6">
            <Link
              href="/"
              className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/30 rounded"
              onClick={dismissDesktopDropdown}
              aria-label="Apexlyn home"
            >
              <ApexlynLogo
                variant="wordmark"
                forDarkBackground={false}
                align="start"
                height={HEADER_LOGO_DESKTOP_PX}
                priority
                className="w-auto max-w-[min(85vw,420px)] [&_img]:h-full [&_img]:max-h-[36px] [&_img]:w-auto lg:[&_img]:max-h-[44px] [&_img]:max-w-full [&_img]:object-contain [&_img]:object-left"
              />
            </Link>

            <nav className="hidden min-w-0 flex-wrap items-center justify-end gap-x-0.5 gap-y-1 lg:flex" aria-label="Primary">
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
                    'flex items-center gap-0.5 border-b-2 border-transparent px-2 py-2 text-[15px] font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 xl:px-2.5',
                    navItemOpen || navItemRoute
                      ? 'border-[#1E3A8A] text-[#0B1320]'
                      : 'text-[#4B5563] hover:text-[#0B1320]',
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 text-[#4B5563] transition-transform duration-200',
                      navItemOpen ? 'rotate-180 text-[#1E3A8A]' : '',
                      !navItemOpen && navItemRoute ? 'text-[#1E3A8A]' : '',
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
                  'border-b-2 px-2 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 xl:px-2.5',
                  pathOnly(location) === '/trust' || pathOnly(location) === '/trust-center'
                    ? 'border-[#1E3A8A] text-[#0B1320]'
                    : 'border-transparent text-[#4B5563] hover:text-[#0B1320]',
                )}
              >
                Trust Center
              </Link>
              <Link
                href="/pricing"
                onClick={dismissDesktopDropdown}
                aria-current={pathOnly(location) === '/pricing' ? 'page' : undefined}
                className={cn(
                  'border-b-2 px-2 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 xl:px-2.5',
                  pathOnly(location) === '/pricing'
                    ? 'border-[#1E3A8A] text-[#0B1320]'
                    : 'border-transparent text-[#4B5563] hover:text-[#0B1320]',
                )}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                onClick={dismissDesktopDropdown}
                aria-current={pathOnly(location) === '/about' ? 'page' : undefined}
                className={cn(
                  'border-b-2 px-2 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 xl:px-2.5',
                  pathOnly(location) === '/about'
                    ? 'border-[#1E3A8A] text-[#0B1320]'
                    : 'border-transparent text-[#4B5563] hover:text-[#0B1320]',
                )}
              >
                About
              </Link>
              <Link
                href={NAV_CTA_TEST_SECURITY_HREF}
                onClick={dismissDesktopDropdown}
                aria-current={
                  pathOnly(location) === '/baseline' ||
                  pathOnly(location) === '/test-your-security-state' ||
                  pathOnly(location) === '/test-security-state'
                    ? 'page'
                    : undefined
                }
                className={cn(
                  'mx-0.5 inline-flex items-center rounded-lg border-2 border-[#1E3A8A] px-3 py-2 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2',
                  pathOnly(location) === '/baseline' ||
                    pathOnly(location) === '/test-your-security-state' ||
                    pathOnly(location) === '/test-security-state'
                    ? 'border-[#1E3A8A] bg-[#1E3A8A]/10 text-[#1E3A8A]'
                    : 'border-[#1E3A8A] bg-transparent text-[#1E3A8A] hover:bg-[#1E3A8A]/5',
                )}
              >
                Test your security state
              </Link>
              <Link
                href="/contact"
                onClick={dismissDesktopDropdown}
                className="ml-1 inline-flex items-center rounded-lg bg-[#1E3A8A] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
              >
                Start a conversation
              </Link>
            </nav>
          </div>

          <div className="flex shrink-0 items-center lg:hidden">
            <button
              type="button"
              className="-mr-1 shrink-0 p-2 text-[#0B1320]"
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

      {/* ── Full-width Mega Dropdown ── */}
      <AnimatePresence>
        {activeDropdown && activeItem && (
          <motion.div
            key={activeDropdown}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="fixed left-0 right-0 top-16 z-40 border-b border-white/10 bg-[#111827] shadow-[0_8px_24px_rgba(0,0,0,0.15)] lg:top-[72px]"
            onMouseEnter={() => {
              cancelCloseTimer();
              clearOpenDelay();
            }}
            onMouseLeave={startCloseTimer}
          >
            <div className="mx-auto max-w-[1200px] rounded-b-xl px-4 py-4 sm:px-6">
              <div
                className="grid gap-x-10"
                style={{ gridTemplateColumns: `repeat(${activeItem.dropdown.columns.length}, 1fr)` }}
              >
                {activeItem.dropdown.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-white/50">
                      {col.title}
                    </p>
                    <ul className="space-y-0.5">
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
                              'group flex flex-col rounded-xl px-3 py-2.5 transition-colors duration-100',
                              subActive
                                ? 'bg-white/[0.12] ring-1 ring-white/20'
                                : 'hover:bg-white/[0.08]',
                            )}
                          >
                            <span
                              className={cn(
                                'text-[15px] font-normal',
                                subActive ? 'text-white' : 'text-white group-hover:text-white',
                              )}
                            >
                              {sub.label}
                            </span>
                            <span
                              className={cn(
                                'mt-0.5 text-[13px] leading-snug text-white/60',
                              )}
                            >
                              {sub.desc}
                            </span>
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

      {/* Backdrop overlay when dropdown is open (dims page content) */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 bg-black/20 backdrop-blur-[1px] lg:top-[72px]"
            onClick={dismissDesktopDropdown}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Menu — §17.4 Deep Navy drawer (mega-nav content retained) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="site-mobile-nav-panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#0B1320] pt-16 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <Link
                href="/"
                className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Apexlyn home"
              >
                <ApexlynLogo
                  variant="wordmark"
                  forDarkBackground
                  align="start"
                  height={40}
                  priority
                  className="h-10 w-auto max-w-[min(88vw,400px)] [&_img]:h-full [&_img]:max-h-10 [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain [&_img]:object-left"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>

            <nav className="px-4 py-2" aria-label="Primary mobile">
              {NAV_ITEMS.map((item) => {
                const sectionOpen = mobileExpanded === item.name;
                const sectionRoute = isRouteInNavGroup(item.name, location);
                const flatMenu = item.name === 'Solutions' || item.name === 'Industries';

                if (flatMenu) {
                  return (
                    <div key={item.name} className="border-b border-white/10 py-4">
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/50">{item.name}</p>
                      <div className="flex flex-col gap-1">
                        {item.dropdown.columns[0].items.map((sub) => {
                          const mActive = isActiveNavHref(sub.href, location);
                          return (
                            <Link
                              key={sub.label}
                              href={normalizeHref(sub.href)}
                              aria-current={mActive ? 'page' : undefined}
                              className={cn(
                                'flex flex-col rounded-lg px-2 py-3',
                                mActive ? 'bg-white/10' : 'hover:bg-white/[0.06]',
                              )}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileExpanded(null);
                              }}
                            >
                              <span className="text-[20px] font-medium leading-snug text-white">{sub.label}</span>
                              {sub.desc ? (
                                <span className="mt-1 text-[14px] font-normal leading-snug text-white/60">{sub.desc}</span>
                              ) : null}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.name} className="border-b border-white/10">
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between py-4 text-left text-[20px] font-medium',
                        sectionOpen ? 'text-white' : sectionRoute ? 'text-[#93C5FD]' : 'text-white',
                      )}
                      onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                      aria-expanded={sectionOpen}
                      aria-label={`${item.name} menu${sectionRoute ? ', current section' : ''}`}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-white/70 transition-transform duration-200',
                          sectionOpen ? 'rotate-180 text-white' : '',
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
                          <div className="space-y-4 pb-6">
                            {item.dropdown.columns.map((col) => (
                              <div key={col.title}>
                                <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">
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
                                        mActive ? 'bg-white/10' : 'hover:bg-white/[0.06]',
                                      )}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setMobileExpanded(null);
                                      }}
                                    >
                                      <span className={cn('text-[15px] font-medium', mActive ? 'text-white' : 'text-white')}>
                                        {sub.label}
                                      </span>
                                      <span className="mt-0.5 text-[13px] text-white/60">{sub.desc}</span>
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

              <div className="mt-1 border-b border-white/10">
                <Link
                  href="/trust"
                  aria-current={
                    pathOnly(location) === '/trust' || pathOnly(location) === '/trust-center' ? 'page' : undefined
                  }
                  className={cn(
                    'block py-4 text-[20px] font-medium text-white',
                    pathOnly(location) === '/trust' || pathOnly(location) === '/trust-center' ? 'text-[#93C5FD]' : '',
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
                    'block py-4 text-[20px] font-medium text-white',
                    pathOnly(location) === '/pricing' ? 'text-[#93C5FD]' : '',
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
                    'block py-4 text-[20px] font-medium text-white',
                    pathOnly(location) === '/about' ? 'text-[#93C5FD]' : '',
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
                    'block border border-white/35 py-4 text-center text-[16px] font-semibold text-white',
                    pathOnly(location) === '/baseline' ||
                      pathOnly(location) === '/test-your-security-state' ||
                      pathOnly(location) === '/test-security-state'
                      ? 'rounded-lg bg-white/10'
                      : 'rounded-lg hover:bg-white/[0.06]',
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

            <div className="flex flex-col gap-4 px-4 pb-10 pt-6">
              <Link
                href="/contact"
                className="block w-full rounded-lg bg-[#1E3A8A] py-3.5 text-center text-[16px] font-semibold text-white transition-colors hover:bg-[#172E73]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start a conversation
              </Link>
              <Link
                href={SIGN_UP_URL}
                className="block py-2 text-center text-[14px] font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                View pricing
              </Link>
            </div>
          </motion.div>
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
