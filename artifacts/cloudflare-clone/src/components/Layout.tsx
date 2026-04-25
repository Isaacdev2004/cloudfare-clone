import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Search, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ApexlynLogo } from '@/components/ApexlynLogo';

const SIGN_UP_URL = '/pricing';
const LOGIN_URL = '/pricing';
const CLOUDFLARE_BLOG_URL = '/resources/blog';
const CLOUDFLARE_DOCS_URL = '/resources/documentation';
const CLOUDFLARE_STATUS_URL = '/support/system-status';
const CLOUDFLARE_COMMUNITY_URL = '/resources/community';
const COMPANY_CAREERS_HREF = '/company/careers';
const CLOUDFLARE_PRESS_URL = '/company/press';
const CLOUDFLARE_INVESTORS_URL = '/company/investors';
const CLOUDFLARE_TRUST_URL = '/support/trust-hub';
const CLOUDFLARE_PRIVACY_URL = '/privacy';
const CLOUDFLARE_TERMS_URL = '/terms';
const CLOUDFLARE_RADAR_URL = '/resources/case-studies';
const CLOUDFLARE_SUPPORT_URL = '/support/help-center';

const NAV_CTA_TEST_SECURITY_HREF = '/test-your-security-state';

const normalizeHref = (href: string) => {
  if (href === '#') return '/';
  if (href.startsWith('http')) {
    if (href.includes('developers') || href.includes('workers') || href.includes('pages')) return '/developers';
    if (href.includes('contact')) return '/contact';
    if (href.includes('enterprise')) return '/enterprise';
    if (href.includes('plans') || href.includes('pricing') || href.includes('dash.cloudflare.com')) return '/pricing';
    if (href.includes('zero-trust') || href.includes('sase')) return '/zero-trust';
    if (href.includes('partners')) return '/solutions';
    return '/why-cloudflare';
  }
  return href;
};

const pathOnly = (path: string) => path.split('?')[0] || '/';

/** §8.4 — top-level group matches current route (for persistent active styling). */
function isRouteInNavGroup(groupName: string, locationPath: string): boolean {
  const p = pathOnly(locationPath);
  switch (groupName) {
    case 'Platforms':
      return p === '/platforms' || p.startsWith('/platforms/') || p === '/architecture-overview';
    case 'Solutions':
      return p === '/solutions' || p.startsWith('/solutions/');
    case 'Industries':
      return p === '/industries' || p.startsWith('/industries/');
    case 'Resources':
      return p === '/resources' || p.startsWith('/resources/');
    case 'Company':
      return p === '/contact' || p === '/company' || p.startsWith('/company/');
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

const DESKTOP_DROPDOWN_HOVER_OPEN_MS = 120;
const DESKTOP_DROPDOWN_HOVER_CLOSE_MS = 150;

/** Section 4 — top nav + dropdowns (master specification). */
const NAV_ITEMS = [
  {
    name: 'Platforms',
    href: '/platforms',
    dropdown: {
      columns: [
        {
          title: 'Platforms',
          items: [
            { label: 'APEXLyn Track Platform', desc: 'Security Evidence Infrastructure', href: '/platforms/track' },
            { label: 'APEXLyn Lens Platform', desc: 'AI Governance & AI Risk Infrastructure', href: '/platforms/lens' },
            { label: 'Architecture Overview', desc: 'How Track and Lens fit your stack', href: '/architecture-overview' },
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
            { label: 'Accounting', desc: 'Safeguard financial and client records', href: '/industries/accounting' },
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
    href: '/company/about',
    dropdown: {
      columns: [
        {
          title: 'Company',
          items: [
            { label: 'About', desc: 'Who we are and what we build', href: '/company/about' },
            { label: 'Careers', desc: 'Join the APEXLyn team', href: COMPANY_CAREERS_HREF },
            { label: 'Contact', desc: 'Speak with our team', href: '/contact' },
          ],
        },
      ],
    },
  },
];

/** Fixed header height for dropdown / main offset — tall enough for a prominent wordmark */
const HEADER_HEIGHT_PX = 108;
/** Logo mark height (px); icon + word scale together for visibility */
const HEADER_LOGO_HEIGHT_PX = 88;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openDelayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">

      {/* §8.1 — header stays at top of viewport (fixed = sticky site chrome) on all breakpoints */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90"
        style={{ height: HEADER_HEIGHT_PX }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-5 lg:gap-8">
            <Link
              href="/"
              className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded"
              onClick={dismissDesktopDropdown}
              aria-label="Apexlyn home"
            >
              <ApexlynLogo
                variant="wordmark"
                forDarkBackground={false}
                align="start"
                height={HEADER_LOGO_HEIGHT_PX}
                priority
                className="w-auto max-w-[min(92vw,560px)] sm:max-w-[min(100%,520px)] lg:max-w-[min(100%,640px)] [&_img]:h-full [&_img]:max-h-[72px] sm:[&_img]:max-h-[80px] lg:[&_img]:max-h-[88px] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain [&_img]:object-left"
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
                    'flex items-center gap-0.5 px-2.5 py-2 text-[15px] font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/30 rounded xl:px-3',
                    navItemOpen
                      ? 'bg-slate-100 text-[#0B1320] ring-1 ring-slate-200/90'
                      : navItemRoute
                        ? 'text-[#1E3A8A] font-semibold'
                        : 'text-slate-800 hover:text-slate-900',
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 text-slate-500 transition-transform duration-200',
                      navItemOpen ? 'rotate-180 text-[#1E3A8A]' : '',
                      !navItemOpen && navItemRoute ? 'text-[#1E3A8A]/80' : '',
                    )}
                    aria-hidden
                  />
                </button>
                );
              })}
              <Link
                href="/trust-center"
                onClick={dismissDesktopDropdown}
                aria-current={pathOnly(location) === '/trust-center' ? 'page' : undefined}
                className={cn(
                  'px-2.5 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/30 rounded xl:px-3',
                  pathOnly(location) === '/trust-center'
                    ? 'bg-slate-100 font-semibold text-[#0B1320] ring-1 ring-slate-200/90'
                    : 'text-slate-800 hover:text-slate-900',
                )}
              >
                Trust Center
              </Link>
              <Link
                href="/pricing"
                onClick={dismissDesktopDropdown}
                aria-current={pathOnly(location) === '/pricing' ? 'page' : undefined}
                className={cn(
                  'px-2.5 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/30 rounded xl:px-3',
                  pathOnly(location) === '/pricing'
                    ? 'bg-slate-100 font-semibold text-[#0B1320] ring-1 ring-slate-200/90'
                    : 'text-slate-800 hover:text-slate-900',
                )}
              >
                Pricing
              </Link>
              <Link
                href={NAV_CTA_TEST_SECURITY_HREF}
                onClick={dismissDesktopDropdown}
                aria-current={
                  pathOnly(location) === '/test-your-security-state' || pathOnly(location) === '/test-security-state'
                    ? 'page'
                    : undefined
                }
                className={cn(
                  'px-2.5 py-2 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/30 rounded hover:text-[#172554] xl:px-3',
                  pathOnly(location) === '/test-your-security-state' || pathOnly(location) === '/test-security-state'
                    ? 'bg-[#1E3A8A] text-white ring-1 ring-[#1E3A8A] shadow-sm'
                    : 'text-[#1E3A8A] hover:text-[#172554]',
                )}
              >
                Test Your Security State
              </Link>
            </nav>
          </div>

          {/*
            §7.2 + §8.1 — mobile: logo, compact CTA, menu; header fixed on all viewports.
            §7.3 + §8.3 — one accordion section at a time; tap toggles (second tap closes).
          */}
          <div className="hidden shrink-0 flex-col items-end justify-center gap-1.5 lg:flex">
            <div className="flex items-center gap-5 text-[13px] font-medium text-slate-700">
              <Link
                href="/resources/documentation"
                className="flex items-center justify-center rounded p-1 text-slate-800 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
                aria-label="Search documentation"
              >
                <Search className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href={CLOUDFLARE_SUPPORT_URL} className="hover:text-black">
                Support
              </Link>
              <span className="hidden text-slate-600 xl:inline">Sales: +1 (888) 555-0199</span>
              <button
                type="button"
                className="flex items-center gap-1 text-slate-800 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 rounded"
                aria-label="Language"
              >
                <Globe className="h-4 w-4" strokeWidth={2} />
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={LOGIN_URL}
                className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-4 py-2 text-[14px] font-semibold text-black transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
            <Link
              href={NAV_CTA_TEST_SECURITY_HREF}
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileExpanded(null);
              }}
              className="inline-flex max-w-[min(42vw,180px)] items-center justify-center rounded-md bg-[#1E3A8A] px-2.5 py-2 text-center text-[11px] font-semibold leading-tight text-white transition-colors hover:bg-[#172554] sm:px-3 sm:text-xs"
            >
              Test security
            </Link>
            <button
              type="button"
              className="-mr-1 shrink-0 p-2 text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'site-mobile-nav-panel' : undefined}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="fixed left-0 right-0 z-40 border-b border-slate-200 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12)]"
            style={{ top: HEADER_HEIGHT_PX }}
            onMouseEnter={() => {
              cancelCloseTimer();
              clearOpenDelay();
            }}
            onMouseLeave={startCloseTimer}
          >
            <div className="max-w-[1280px] mx-auto px-6 py-8">
              <div
                className="grid gap-x-10"
                style={{ gridTemplateColumns: `repeat(${activeItem.dropdown.columns.length}, 1fr)` }}
              >
                {activeItem.dropdown.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
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
                              'group flex flex-col rounded-md px-2 py-2 transition-colors duration-100',
                              subActive
                                ? 'bg-[#1E3A8A]/8 ring-1 ring-[#1E3A8A]/20'
                                : 'hover:bg-slate-50',
                            )}
                          >
                            <span
                              className={cn(
                                'text-[14px] font-medium',
                                subActive ? 'text-[#1E3A8A]' : 'text-slate-900 group-hover:text-black',
                              )}
                            >
                              {sub.label}
                            </span>
                            <span
                              className={cn(
                                'mt-0.5 text-[12px] leading-snug',
                                subActive ? 'text-slate-700' : 'text-slate-500 group-hover:text-slate-600',
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
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
            style={{ top: HEADER_HEIGHT_PX }}
            onClick={dismissDesktopDropdown}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="site-mobile-nav-panel"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-white lg:hidden"
            style={{ paddingTop: HEADER_HEIGHT_PX }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <Link
                href="/"
                className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Apexlyn home"
              >
                <ApexlynLogo
                  variant="wordmark"
                  forDarkBackground={false}
                  align="start"
                  height={72}
                  priority
                  className="h-[72px] w-auto max-w-[min(92vw,520px)] [&_img]:h-full [&_img]:max-h-[72px] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain [&_img]:object-left"
                />
              </Link>
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-900" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-4 py-2" aria-label="Primary mobile">
              {NAV_ITEMS.map((item) => {
                const sectionOpen = mobileExpanded === item.name;
                const sectionRoute = isRouteInNavGroup(item.name, location);
                return (
                  <div key={item.name} className="border-b border-slate-200">
                    {/* §8.3 — tap opens; second tap on same row closes */}
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between py-4 text-left text-[15px] font-medium',
                        sectionOpen
                          ? 'bg-slate-50 text-[#0B1320]'
                          : sectionRoute
                            ? 'text-[#1E3A8A] font-semibold'
                            : 'text-slate-900',
                      )}
                      onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                      aria-expanded={sectionOpen}
                      aria-label={`${item.name} menu${sectionRoute ? ', current section' : ''}`}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200',
                          sectionOpen ? 'rotate-180 text-[#1E3A8A]' : '',
                          !sectionOpen && sectionRoute ? 'text-[#1E3A8A]/80' : '',
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
                          <div className="space-y-5 pb-6">
                            {item.dropdown.columns.map((col) => (
                              <div key={col.title}>
                                <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
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
                                        'flex flex-col rounded px-1 py-2',
                                        mActive
                                          ? 'bg-[#1E3A8A]/8 ring-1 ring-[#1E3A8A]/15'
                                          : 'hover:bg-slate-50',
                                      )}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setMobileExpanded(null);
                                      }}
                                    >
                                      <span
                                        className={cn(
                                          'text-[14px] font-medium',
                                          mActive ? 'text-[#1E3A8A]' : 'text-slate-900',
                                        )}
                                      >
                                        {sub.label}
                                      </span>
                                      <span className={cn('text-[12px]', mActive ? 'text-slate-600' : 'text-slate-500')}>
                                        {sub.desc}
                                      </span>
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

              <div className="mb-1 mt-1 border-b border-slate-200">
                <Link
                  href="/trust-center"
                  aria-current={pathOnly(location) === '/trust-center' ? 'page' : undefined}
                  className={cn(
                    'block py-3 text-[15px] font-medium',
                    pathOnly(location) === '/trust-center'
                      ? 'font-semibold text-[#0B1320] bg-slate-50 -mx-4 px-4 rounded-md'
                      : 'text-slate-900 hover:text-black',
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
                    'block py-3 text-[15px] font-medium',
                    pathOnly(location) === '/pricing'
                      ? 'font-semibold text-[#0B1320] bg-slate-50 -mx-4 px-4 rounded-md'
                      : 'text-slate-900 hover:text-black',
                  )}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Pricing
                </Link>
                <Link
                  href={NAV_CTA_TEST_SECURITY_HREF}
                  aria-current={
                    pathOnly(location) === '/test-your-security-state' || pathOnly(location) === '/test-security-state'
                      ? 'page'
                      : undefined
                  }
                  className={cn(
                    'block py-3 text-[15px] font-semibold',
                    pathOnly(location) === '/test-your-security-state' || pathOnly(location) === '/test-security-state'
                      ? 'rounded-md bg-[#1E3A8A] text-white -mx-4 px-4'
                      : 'text-[#1E3A8A] hover:text-[#172554]',
                  )}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Test Your Security State
                </Link>
              </div>
            </nav>

            <div className="flex flex-col gap-3 px-4 pb-8 pt-4">
              <Link
                href={LOGIN_URL}
                className="block rounded border border-slate-300 bg-white py-3 text-center text-[14px] font-semibold text-black hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href={SIGN_UP_URL}
                className="block py-3 text-center text-[14px] font-semibold text-[#1E3A8A] hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                View pricing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-grow" style={{ paddingTop: HEADER_HEIGHT_PX }}>
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#111827] border-t border-white/10 pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col items-start text-left">
              <Link href="/" className="inline-flex items-center justify-start mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E90FF]/40 rounded w-full" aria-label="Apexlyn home">
                <ApexlynLogo variant="wordmark" forDarkBackground align="start" height={44} className="h-11 w-auto max-w-full [&_img]:max-w-[min(100%,280px)]" />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed">The Evidence-Led Security & AI Governance Infrastructure.</p>
            </div>

            {[
              {
                title: 'Platforms',
                links: [
                  { label: 'APEXLyn Track Platform', href: '/platforms/track' },
                  { label: 'APEXLyn Lens Platform', href: '/platforms/lens' },
                  { label: 'Architecture Overview', href: '/architecture-overview' },
                ],
              },
              {
                title: 'Solutions',
                links: [
                  { label: 'Cyber Security Services', href: '/solutions/cyber-security-services' },
                  { label: 'AI Governance Advisory', href: '/solutions/ai-governance-advisory' },
                  { label: 'Compliance Operations', href: '/solutions/compliance-operations' },
                ],
              },
              {
                title: 'Industries',
                links: [
                  { label: 'Healthcare', href: '/industries/healthcare' },
                  { label: 'Legal', href: '/industries/legal' },
                  { label: 'Accounting', href: '/industries/accounting' },
                  { label: 'Insurance', href: '/industries/insurance' },
                  { label: 'MSP / Partners', href: '/industries/msp-partners' },
                  { label: 'Professional Services', href: '/industries/professional-services' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Whitepapers', href: '/resources/whitepapers' },
                  { label: 'Framework Guides', href: '/resources/framework-guides' },
                  { label: 'AI Risk Briefs', href: '/resources/ai-risk-briefs' },
                ],
              },
              {
                title: 'Trust',
                links: [
                  { label: 'Trust Center', href: '/trust-center' },
                  { label: 'Request Security Documentation', href: '/request-security-documentation' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', href: '/company/about' },
                  { label: 'Careers', href: COMPANY_CAREERS_HREF },
                  { label: 'Contact', href: '/contact' },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] font-semibold text-white mb-4 uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={normalizeHref(link.href)} className="text-[13px] text-slate-400 hover:text-white transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 text-[13px] text-slate-500">
            <p>© APEXLyn. All rights reserved.</p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link href={normalizeHref(CLOUDFLARE_PRIVACY_URL)} className="hover:text-slate-300 transition-colors">
                Privacy
              </Link>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <Link href={normalizeHref(CLOUDFLARE_TERMS_URL)} className="hover:text-slate-300 transition-colors">
                Terms
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
