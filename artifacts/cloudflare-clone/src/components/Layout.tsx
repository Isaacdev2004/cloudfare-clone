import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getSeoForPathname } from '@/lib/apexlyn-seo';
import { initFormAttributionSession } from '@/lib/apexlyn-form-shared';
import { ApexlynLogo } from '@/components/ApexlynLogo';
import { GlobalBreadcrumbs } from '@/components/GlobalBreadcrumbs';
import { CookieAnalyticsConsent } from '@/components/CookieAnalyticsConsent';
import { Spinner } from '@/components/ui/spinner';
import { HUBSPOT_FORM_IDS, submitHubSpotForm, validateAnyEmail } from '@/lib/apexlyn-form-shared';
import { captureApexPageView, syncPosthogLegalPageMode } from '@/lib/apexlyn-analytics-consent';

const DESKTOP_OPEN_MS = 150;
const DESKTOP_CLOSE_MS = 300;

const pathOnly = (path: string) => path.split('?')[0] || '/';

const SOLUTIONS_ITEMS: Array<{ label: string; href: string; desc: string }> = [
  { label: 'APEXLyn Track', href: '/track', desc: 'Evidence-led compliance engine' },
  { label: 'APEXLyn Lens', href: '/lens', desc: 'AI security and evidence platform' },
  { label: 'Architecture', href: '/architecture', desc: 'How our evidence infrastructure works' },
];

const INDUSTRY_ITEMS: Array<{ label: string; href: string }> = [
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Legal', href: '/industries/legal' },
  { label: 'Accounting & Finance', href: '/industries/accounting' },
  { label: 'Insurance', href: '/industries/insurance' },
  { label: 'Professional Services', href: '/industries/professional-services' },
  { label: 'MSP & Partners', href: '/industries/msp-partners' },
];

function isPathActive(href: string, loc: string): boolean {
  const p = pathOnly(loc);
  const h = href.split('?')[0] || '/';
  if (h === p) return true;
  if (h !== '/' && h.length > 1 && (p === h || p.startsWith(`${h}/`))) return true;
  return false;
}

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location] = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<'solutions' | 'industries' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openDelayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);

  const dismissDropdowns = useCallback(() => {
    if (openDelayTimer.current) {
      clearTimeout(openDelayTimer.current);
      openDelayTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveDropdown(null);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
    dismissDropdowns();
    const p = pathOnly(location);
    const is404 = getSeoForPathname(p).title === 'Page Not Found | APEXLyn';
    captureApexPageView({
      path: p,
      attemptedPath: p,
      is404,
    });
    syncPosthogLegalPageMode(pathOnly(location));
  }, [location, dismissDropdowns]);

  useEffect(() => {
    initFormAttributionSession();
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissDropdowns();
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dismissDropdowns]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!activeDropdown) return;
    const onDown = (e: MouseEvent) => {
      const el = desktopNavRef.current;
      if (!el?.contains(e.target as Node)) dismissDropdowns();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [activeDropdown, dismissDropdowns]);

  const scheduleOpen = (name: 'solutions' | 'industries') => {
    if (openDelayTimer.current) clearTimeout(openDelayTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openDelayTimer.current = setTimeout(() => {
      openDelayTimer.current = null;
      setActiveDropdown(name);
    }, DESKTOP_OPEN_MS);
  };

  const startClose = () => {
    if (openDelayTimer.current) {
      clearTimeout(openDelayTimer.current);
      openDelayTimer.current = null;
    }
    closeTimer.current = setTimeout(() => setActiveDropdown(null), DESKTOP_CLOSE_MS);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const onTrayKey = (e: React.KeyboardEvent, id: 'solutions' | 'industries') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveDropdown((p) => (p === id ? null : id));
    }
  };

  const navLinkClass = (href: string, exactOnly = false) => {
    const active = exactOnly
      ? pathOnly(location) === pathOnly(href)
      : isPathActive(href, location);
    return cn(
      'inline-flex items-center border-b-2 px-1.5 pb-1 text-[15px] font-medium transition-colors',
      active ? 'border-[#1E3A8A] text-[#0B1320]' : 'border-transparent text-[#4B5563] hover:text-[#0B1320]',
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FC]">
      <a href="#main-content" className="apex-skip-link">
        Skip to main content
      </a>

      <header
        className={cn(
          'apex-site-header fixed inset-x-0 top-0 z-50 h-16 w-full border-b border-[#E5E7EB] bg-white transition-shadow duration-200 lg:h-[72px]',
          scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.06)]' : 'shadow-none',
        )}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 rounded"
            onClick={dismissDropdowns}
            aria-label="APEXLyn home"
          >
            <ApexlynLogo
              variant="wordmark"
              forDarkBackground={false}
              align="start"
              height={36}
              priority
              className="max-h-9 w-auto max-w-[min(52vw,220px)] lg:max-h-10 [&_img]:max-h-9 lg:[&_img]:max-h-10"
            />
          </Link>

          <div ref={desktopNavRef} className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
            <Link href="/track" className={navLinkClass('/track')} onClick={dismissDropdowns}>
              Track
            </Link>
            <Link href="/lens" className={navLinkClass('/lens')} onClick={dismissDropdowns}>
              Lens
            </Link>

            <div
              className="relative"
              onMouseEnter={() => scheduleOpen('solutions')}
              onMouseLeave={startClose}
            >
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-1 border-b-2 px-1.5 pb-1 text-[15px] font-medium transition-colors',
                  activeDropdown === 'solutions' || SOLUTIONS_ITEMS.some((i) => isPathActive(i.href, location))
                    ? 'border-[#1E3A8A] text-[#0B1320]'
                    : 'border-transparent text-[#4B5563] hover:text-[#0B1320]',
                )}
                aria-expanded={activeDropdown === 'solutions'}
                aria-haspopup="menu"
                onMouseEnter={() => scheduleOpen('solutions')}
                onFocus={() => scheduleOpen('solutions')}
                onBlur={() => startClose()}
                onClick={() => {
                  cancelClose();
                  setActiveDropdown((p) => (p === 'solutions' ? null : 'solutions'));
                }}
                onKeyDown={(e) => onTrayKey(e, 'solutions')}
              >
                Solutions
                <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
              </button>
              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.14 }}
                    className="absolute left-1/2 top-full z-[60] mt-2 w-[min(100vw-32px,360px)] -translate-x-1/2 rounded-[12px] border border-white/10 bg-[#111827] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                    role="menu"
                    onMouseEnter={cancelClose}
                  >
                    <ul className="space-y-1">
                      {SOLUTIONS_ITEMS.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            role="menuitem"
                            className="block rounded-lg px-2 py-2 text-[15px] font-normal text-white transition-colors hover:bg-white/[0.08]"
                            onClick={dismissDropdowns}
                          >
                            <span>{item.label}</span>
                            <span className="mt-0.5 block text-[13px] font-normal text-white/60">{item.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => scheduleOpen('industries')}
              onMouseLeave={startClose}
            >
              <button
                type="button"
                className={cn(
                  'inline-flex items-center gap-1 border-b-2 px-1.5 pb-1 text-[15px] font-medium transition-colors',
                  activeDropdown === 'industries' || pathOnly(location).startsWith('/industries')
                    ? 'border-[#1E3A8A] text-[#0B1320]'
                    : 'border-transparent text-[#4B5563] hover:text-[#0B1320]',
                )}
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="menu"
                onMouseEnter={() => scheduleOpen('industries')}
                onFocus={() => scheduleOpen('industries')}
                onBlur={() => startClose()}
                onClick={() => {
                  cancelClose();
                  setActiveDropdown((p) => (p === 'industries' ? null : 'industries'));
                }}
                onKeyDown={(e) => onTrayKey(e, 'industries')}
              >
                Industries
                <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
              </button>
              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.14 }}
                    className="absolute left-1/2 top-full z-[60] mt-2 w-[min(100vw-32px,280px)] -translate-x-1/2 rounded-[12px] border border-white/10 bg-[#111827] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                    role="menu"
                    onMouseEnter={cancelClose}
                  >
                    <ul className="space-y-0.5">
                      {INDUSTRY_ITEMS.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            role="menuitem"
                            className="block rounded-lg px-2 py-2 text-[15px] font-normal text-white transition-colors hover:bg-white/[0.08]"
                            onClick={dismissDropdowns}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className={navLinkClass('/pricing', true)} onClick={dismissDropdowns}>
              Pricing
            </Link>
            <Link href="/trust" className={navLinkClass('/trust', true)} onClick={dismissDropdowns}>
              Trust Center
            </Link>
            <Link href="/about" className={navLinkClass('/about', true)} onClick={dismissDropdowns}>
              About
            </Link>
          </div>

          <div className="hidden shrink-0 items-center lg:flex">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#1E3A8A] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
              onClick={dismissDropdowns}
            >
              Start a Conversation
            </Link>
          </div>

          <button
            type="button"
            className="-mr-1 p-2 text-[#0B1320] lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="site-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-[#0B1320] lg:hidden"
          >
            <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
              <Link
                href="/"
                className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                onClick={() => setMobileOpen(false)}
                aria-label="APEXLyn home"
              >
                <ApexlynLogo variant="wordmark" forDarkBackground align="start" height={36} className="max-h-9 w-auto max-w-[200px]" />
              </Link>
              <button
                type="button"
                className="p-2 text-white"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <nav className="flex flex-col gap-4 px-6 pb-28 pt-2" aria-label="Primary mobile">
              <Link
                href="/track"
                className="text-[20px] font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Track
              </Link>
              <Link href="/lens" className="text-[20px] font-medium text-white" onClick={() => setMobileOpen(false)}>
                Lens
              </Link>

              <div className="flex flex-col gap-3" style={{ gap: '16px' }}>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-white/50">Solutions</p>
                {SOLUTIONS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[20px] font-medium leading-snug text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="block">{item.label}</span>
                    <span className="mt-1 block text-[13px] font-normal text-white/60">{item.desc}</span>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col" style={{ gap: '16px' }}>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-white/50">Industries</p>
                {INDUSTRY_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[20px] font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/pricing"
                className="text-[20px] font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link href="/trust" className="text-[20px] font-medium text-white" onClick={() => setMobileOpen(false)}>
                Trust Center
              </Link>
              <Link href="/about" className="text-[20px] font-medium text-white" onClick={() => setMobileOpen(false)}>
                About
              </Link>
            </nav>

            <div className="sticky bottom-0 mt-auto border-t border-white/10 bg-[#0B1320] px-6 py-6">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-md bg-[#1E3A8A] py-3.5 text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73]"
                onClick={() => setMobileOpen(false)}
              >
                Start a Conversation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-grow flex-col">
        <div className="apex-header-spacer h-16 w-full shrink-0 lg:h-[72px]" aria-hidden />
        <GlobalBreadcrumbs />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          {children}
        </main>
      </div>

      <CookieAnalyticsConsent />

      <footer className="apex-site-footer bg-[#0B1320] text-white">
        <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded">
                <ApexlynLogo variant="wordmark" forDarkBackground align="start" height={40} className="mb-5 [&_img]:max-w-[220px]" />
              </Link>
              <p className="text-[20px] font-semibold leading-snug text-white">Where Security Becomes Evidence</p>
              <p className="mt-3 text-[14px] font-normal leading-relaxed text-white/70">
                Australian cybersecurity and AI governance.
              </p>
              <p className="mt-2 text-[14px] font-normal text-white/70">Two platforms. One evidence standard.</p>
              <p className="mt-4 text-[14px] text-white/70">ABN: [ABN NUMBER]</p>
            </div>

            <div>
              <h3 className="mb-4 text-[14px] font-semibold text-white">Platforms</h3>
              <ul className="space-y-2.5 text-[14px] font-normal text-white/70">
                <li>
                  <Link href="/track" className="transition-colors hover:text-white">
                    Track — Compliance Evidence
                  </Link>
                </li>
                <li>
                  <Link href="/lens" className="transition-colors hover:text-white">
                    Lens — AI Governance
                  </Link>
                </li>
                <li>
                  <Link href="/architecture" className="transition-colors hover:text-white">
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="transition-colors hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/trust" className="transition-colors hover:text-white">
                    Trust Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[14px] font-semibold text-white">Industries</h3>
              <ul className="space-y-2.5 text-[14px] font-normal text-white/70">
                {INDUSTRY_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[14px] font-semibold text-white">Company</h3>
              <ul className="space-y-2.5 text-[14px] font-normal text-white/70">
                <li>
                  <Link href="/about" className="transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="transition-colors hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
              <h4 className="mb-3 mt-6 text-[14px] font-semibold text-white">Legal</h4>
              <ul className="space-y-2.5 text-[14px] font-normal text-white/70">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="transition-colors hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="transition-colors hover:text-white">
                    Disclaimer
                  </Link>
                </li>
              </ul>
              <p className="mt-6 text-[14px] text-white/70">
                Email:{' '}
                <a href="mailto:hello@apexlyn.com.au" className="underline-offset-2 hover:text-white hover:underline">
                  hello@apexlyn.com.au
                </a>
              </p>
              <p className="mt-2 text-[14px] text-white/70">
                Phone:{' '}
                <a href="tel:+611300000000" className="underline-offset-2 hover:text-white hover:underline">
                  [PHONE NUMBER]
                </a>
              </p>
              <p className="mt-2 text-[14px] text-white/70">Location: Sydney, Australia</p>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-xl text-[15px] font-normal leading-relaxed text-white">
                Stay informed on security evidence and AI governance in Australia.
              </p>
              <div className="w-full lg:w-auto lg:min-w-[420px]">
              <form
                className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (newsletterDone || newsletterBusy) return;
                  setNewsletterError(null);
                  const err = validateAnyEmail(newsletterEmail);
                  if (err) {
                    setNewsletterError(err);
                    return;
                  }
                  setNewsletterBusy(true);
                  try {
                    await submitHubSpotForm(HUBSPOT_FORM_IDS.apexlyn_newsletter, [
                      { name: 'email', value: newsletterEmail.trim() },
                      { name: 'signup_source', value: 'footer_newsletter' },
                      { name: 'page_url', value: typeof window !== 'undefined' ? window.location.href : '' },
                    ], { includeMarketingFields: false });
                    setNewsletterDone(true);
                  } catch {
                    setNewsletterError('Something went wrong. Please try again.');
                  } finally {
                    setNewsletterBusy(false);
                  }
                }}
              >
                {newsletterDone ? (
                  <p className="text-[14px] font-normal text-[#1F8A70]" role="status">
                    Subscribed. We will be in touch.
                  </p>
                ) : (
                  <>
                    <label className="sr-only" htmlFor="footer-newsletter-email">
                      Email
                    </label>
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Your work email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        setNewsletterError(null);
                      }}
                      onBlur={() => setNewsletterError(validateAnyEmail(newsletterEmail))}
                      disabled={newsletterBusy}
                      aria-required="true"
                      className="h-11 w-full min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-3 text-[15px] text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-70"
                    />
                    <button
                      type="submit"
                      disabled={newsletterBusy}
                      className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-white/40 bg-transparent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-70"
                    >
                      {newsletterBusy ? (
                        <>
                          <Spinner className="mr-2 text-white" />
                          Subscribing…
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </>
                )}
              </form>
              {newsletterDone ? null : newsletterError ? (
                <p className="mt-2 text-[13px] font-normal text-[#D64545]" role="alert">
                  {newsletterError}
                </p>
              ) : null}
              </div>
            </div>
            <p className="mt-3 text-[12px] font-normal text-white/50">
              We send occasional updates. No spam. Unsubscribe at any time.
            </p>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-[13px] font-normal text-white/50">
                © 2026 APEXLyn Pty Ltd. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-normal text-white/60 sm:justify-end">
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
                <span aria-hidden className="text-white/40">
                  ·
                </span>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of Use
                </Link>
                <span aria-hidden className="text-white/40">
                  ·
                </span>
                <Link href="/cookies" className="transition-colors hover:text-white">
                  Cookie Policy
                </Link>
                <span aria-hidden className="text-white/40">
                  ·
                </span>
                <Link href="/disclaimer" className="transition-colors hover:text-white">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
