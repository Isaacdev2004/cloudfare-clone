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
const CLOUDFLARE_CAREERS_URL = '/company/careers';
const CLOUDFLARE_PRESS_URL = '/company/press';
const CLOUDFLARE_INVESTORS_URL = '/company/investors';
const CLOUDFLARE_TRUST_URL = '/support/trust-hub';
const CLOUDFLARE_PRIVACY_URL = '/privacy-policy';
const CLOUDFLARE_TERMS_URL = '/terms-of-use';
const CLOUDFLARE_GITHUB_URL = '/developers';
const CLOUDFLARE_RADAR_URL = '/resources/case-studies';
const CLOUDFLARE_SUPPORT_URL = '/support/help-center';

const normalizeHref = (href: string) => {
  if (href === '#') return '/';
  if (href.startsWith('http')) {
    if (href.includes('developers') || href.includes('workers') || href.includes('pages')) return '/developers';
    if (href.includes('enterprise') || href.includes('contact')) return '/enterprise';
    if (href.includes('plans') || href.includes('pricing') || href.includes('dash.cloudflare.com')) return '/pricing';
    if (href.includes('zero-trust') || href.includes('sase')) return '/zero-trust';
    if (href.includes('partners')) return '/solutions';
    return '/why-cloudflare';
  }
  return href;
};

const NAV_ITEMS = [
  {
    name: 'Platform',
    href: '/products',
    dropdown: {
      columns: [
        {
          title: 'Performance & delivery',
          items: [
            { label: 'CDN', desc: 'Cache and serve from 320+ cities', href: '/products' },
            { label: 'DNS', desc: "The world's fastest DNS resolver", href: '/products' },
            { label: 'Load Balancing', desc: 'Global server load balancing', href: '/products' },
          ],
        },
        {
          title: 'Security & Zero Trust',
          items: [
            { label: 'DDoS Protection', desc: 'Unmetered, always-on protection', href: '/products' },
            { label: 'Web Application Firewall', desc: 'Block threats at the edge', href: '/products' },
            { label: 'Zero Trust', desc: 'Identity-aware access for every user and app', href: '/zero-trust' },
          ],
        },
        {
          title: 'Build at the edge',
          items: [
            { label: 'Workers', desc: 'Serverless at the edge', href: '/developers' },
            { label: 'Pages', desc: 'Deploy JAMstack sites globally', href: '/developers' },
            { label: 'R2 Storage', desc: 'Object storage, no egress fees', href: '/developers' },
          ],
        },
      ],
    },
  },
  {
    name: 'Products',
    href: '/products',
    dropdown: {
      columns: [
        {
          title: 'Application Performance',
          items: [
            { label: 'CDN', desc: 'Cache and serve from 320+ cities', href: '/products' },
            { label: 'DNS', desc: "The world's fastest DNS resolver", href: '/products' },
            { label: 'Load Balancing', desc: 'Global server load balancing', href: '/products' },
            { label: 'Argo Smart Routing', desc: 'Accelerate web traffic', href: '/products' },
            { label: 'Early Hints', desc: 'Speed up page loads', href: '/products' },
            { label: 'Zaraz', desc: 'Fast, privacy-first third parties', href: '/products' },
          ],
        },
        {
          title: 'Application Security',
          items: [
            { label: 'DDoS Protection', desc: 'Unmetered, always-on protection', href: '/products' },
            { label: 'Web Application Firewall', desc: 'Block threats at the edge', href: '/products' },
            { label: 'Bot Management', desc: 'Identify and stop bad bots', href: '/products' },
            { label: 'API Shield', desc: 'Protect your API endpoints', href: '/products' },
            { label: 'Page Shield', desc: 'Monitor for supply chain attacks', href: '/products' },
            { label: 'SSL/TLS', desc: 'Free certificates, auto-renewal', href: '/products' },
          ],
        },
        {
          title: 'Zero Trust & SASE',
          items: [
            { label: 'Access', desc: 'Zero Trust application access', href: '/zero-trust' },
            { label: 'Gateway', desc: 'Secure DNS & web filtering', href: '/zero-trust' },
            { label: 'Browser Isolation', desc: 'Remote browser technology', href: '/zero-trust' },
            { label: 'CASB', desc: 'Cloud app security broker', href: '/zero-trust' },
            { label: 'Data Loss Prevention', desc: 'Stop sensitive data leaks', href: '/zero-trust' },
            { label: 'WARP', desc: 'Secure device connectivity', href: '/zero-trust' },
          ],
        },
        {
          title: 'Developer Platform',
          items: [
            { label: 'Workers', desc: 'Serverless at the edge', href: '/developers' },
            { label: 'Pages', desc: 'Deploy JAMstack sites globally', href: '/developers' },
            { label: 'R2 Storage', desc: 'Object storage, no egress fees', href: '/developers' },
            { label: 'D1 Database', desc: 'SQLite at the edge', href: '/developers' },
            { label: 'KV', desc: 'Global key-value store', href: '/developers' },
            { label: 'AI Gateway', desc: 'AI observability & caching', href: '/developers' },
          ],
        },
      ],
    },
  },
  {
    name: 'Partners',
    href: '/solutions',
    dropdown: {
      columns: [
        {
          title: 'By Business Size',
          items: [
            { label: 'Enterprise', desc: 'For large-scale organizations', href: '/enterprise' },
            { label: 'Small & Medium Business', desc: 'Affordable, powerful security', href: '/solutions' },
            { label: 'Startups', desc: 'Grow fast, stay secure', href: '/solutions' },
            { label: 'Public Sector', desc: 'Government-grade compliance', href: '/solutions' },
          ],
        },
        {
          title: 'By Industry',
          items: [
            { label: 'Technology', desc: 'Performance for SaaS companies', href: '/solutions' },
            { label: 'Financial Services', desc: 'Security for financial data', href: '/solutions' },
            { label: 'Healthcare', desc: 'HIPAA-ready infrastructure', href: '/solutions' },
            { label: 'Retail & eCommerce', desc: 'Speed and security for stores', href: '/solutions' },
            { label: 'Gaming', desc: 'Low latency, high availability', href: '/solutions' },
            { label: 'Media & Entertainment', desc: 'Stream content globally', href: '/solutions' },
          ],
        },
        {
          title: 'By Use Case',
          items: [
            { label: 'Network Security', desc: 'Protect your network perimeter', href: '/solutions' },
            { label: 'Application Security', desc: 'Secure every app and API', href: '/solutions' },
            { label: 'Cloud Connectivity', desc: 'Connect clouds seamlessly', href: '/solutions' },
            { label: 'Zero Trust', desc: 'Verify every user and device', href: '/zero-trust' },
            { label: 'AI Protection', desc: 'Secure your AI workloads', href: '/products' },
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
          title: 'Learn',
          items: [
            { label: 'Blog', desc: 'Product updates and insights', href: CLOUDFLARE_BLOG_URL },
            { label: 'Learning Center', desc: 'Security & performance guides', href: '/resources/documentation' },
            { label: 'Webinars', desc: 'Live and on-demand sessions', href: '/resources/webinars' },
            { label: 'Apexlyn TV', desc: 'Stream our content channel', href: '/resources/blog' },
            { label: 'Analysts & Awards', desc: 'See how analysts rate us', href: '/resources/case-studies' },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'Community Forum', desc: 'Connect with other users', href: CLOUDFLARE_COMMUNITY_URL },
            { label: 'Apexlyn Radar', desc: 'Internet traffic insights', href: CLOUDFLARE_RADAR_URL },
            { label: 'Speed Test', desc: 'Test your network performance', href: '/resources/case-studies' },
            { label: 'Case Studies', desc: 'See customer success stories', href: '/resources/case-studies' },
            { label: 'Trust & Safety', desc: 'Abuse policies and reports', href: '/report-security' },
          ],
        },
        {
          title: 'Develop',
          items: [
            { label: 'Documentation', desc: 'Guides for all Apexlyn products', href: CLOUDFLARE_DOCS_URL },
            { label: 'API Reference', desc: 'Manage Apexlyn via API', href: '/resources/documentation' },
            { label: 'Developer Discord', desc: 'Chat with our dev community', href: '/resources/community' },
            { label: 'Apexlyn Status', desc: 'Real-time system status', href: CLOUDFLARE_STATUS_URL },
            { label: 'Support Portal', desc: 'Get help from our team', href: CLOUDFLARE_SUPPORT_URL },
          ],
        },
      ],
    },
  },
  {
    name: 'Company',
    href: '/company',
    dropdown: {
      columns: [
        {
          title: 'Company',
          items: [
            { label: 'About Apexlyn', desc: 'Our mission and story', href: '/company/about' },
            { label: 'Leadership', desc: 'Meet the executive team', href: '/company/about' },
            { label: 'Careers', desc: 'Join the Apexlyn team', href: CLOUDFLARE_CAREERS_URL },
            { label: 'Press', desc: 'News and press releases', href: CLOUDFLARE_PRESS_URL },
            { label: 'Investor Relations', desc: 'For shareholders and analysts', href: CLOUDFLARE_INVESTORS_URL },
            { label: 'Analyst Reports', desc: 'Third-party evaluations', href: '/resources/case-studies' },
          ],
        },
        {
          title: 'Impact',
          items: [
            { label: 'Impact Report', desc: 'Our commitment to a better Internet', href: '/company/impact' },
            { label: 'Project Galileo', desc: 'Protecting vulnerable voices', href: '/company/impact' },
            { label: 'Athenian Project', desc: 'Securing election infrastructure', href: '/company/impact' },
            { label: 'Apexlyn for Campaigns', desc: 'Protecting political speech', href: '/company/impact' },
            { label: 'Critical Infrastructure Defense', desc: 'Protecting hospitals & utilities', href: '/company/impact' },
          ],
        },
      ],
    },
  },
];

/** Fixed header height for dropdown / main offset (Cloudflare-style two-tier right cluster) */
const HEADER_HEIGHT_PX = 80;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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

  const openDropdown = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const startCloseTimer = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const cancelCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const activeItem = NAV_ITEMS.find((i) => i.name === activeDropdown);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">

      {/* ── Header — Cloudflare-style white bar, two-tier utilities + CTAs ── */}
      <header
        ref={headerRef}
        className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white"
        style={{ height: HEADER_HEIGHT_PX }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-5 lg:gap-8">
            <Link
              href="/"
              className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded"
              onClick={() => setActiveDropdown(null)}
              aria-label="Apexlyn home"
            >
              <ApexlynLogo
                variant="wordmark"
                forDarkBackground={false}
                align="start"
                height={52}
                className="w-auto max-w-[min(78vw,300px)] sm:max-w-[360px] lg:max-w-[min(100%,440px)] [&_img]:max-w-full"
              />
            </Link>

            <nav className="hidden min-w-0 items-center lg:flex">
              {NAV_ITEMS.slice(0, 2).map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onMouseEnter={() => openDropdown(item.name)}
                  onMouseLeave={startCloseTimer}
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  aria-expanded={activeDropdown === item.name}
                  aria-label={`${item.name} menu`}
                  className={cn(
                    'flex items-center gap-0.5 px-3 py-2 text-[15px] font-medium text-black transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 rounded',
                    activeDropdown === item.name ? 'text-black' : 'text-black hover:text-slate-600',
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      activeDropdown === item.name ? 'rotate-180' : '',
                    )}
                  />
                </button>
              ))}
              <Link
                href="/developers"
                onClick={() => setActiveDropdown(null)}
                className={cn(
                  'px-3 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 rounded',
                  location === '/developers' ? 'text-black' : 'text-black hover:text-slate-600',
                )}
              >
                Developers
              </Link>
              {NAV_ITEMS.slice(2).map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onMouseEnter={() => openDropdown(item.name)}
                  onMouseLeave={startCloseTimer}
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  aria-expanded={activeDropdown === item.name}
                  aria-label={`${item.name} menu`}
                  className={cn(
                    'flex items-center gap-0.5 px-3 py-2 text-[15px] font-medium text-black transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 rounded',
                    activeDropdown === item.name ? 'text-black' : 'text-black hover:text-slate-600',
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      activeDropdown === item.name ? 'rotate-180' : '',
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>

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
              <Link
                href="/report-security"
                className="inline-flex items-center justify-center rounded bg-[#1E3A8A] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#172554] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]/50"
              >
                Under attack?
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="-mr-1 shrink-0 p-2 text-slate-900 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={startCloseTimer}
          >
            {/* Full-page backdrop to catch mouse-out */}
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
                      {col.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={normalizeHref(sub.href || '#')}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex flex-col rounded-md px-2 py-2 transition-colors duration-100 hover:bg-slate-50"
                          >
                            <span className="text-[14px] font-medium text-slate-900 group-hover:text-black">
                              {sub.label}
                            </span>
                            <span className="mt-0.5 text-[12px] leading-snug text-slate-500 group-hover:text-slate-600">
                              {sub.desc}
                            </span>
                          </Link>
                        </li>
                      ))}
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
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-white lg:hidden"
            style={{ paddingTop: HEADER_HEIGHT_PX }}
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
                  height={52}
                  className="h-[52px] w-auto max-w-[min(88vw,380px)] [&_img]:max-w-full"
                />
              </Link>
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-900" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-4 py-2">
              <div className="mb-1 border-b border-slate-200 pb-2">
                <Link
                  href="/developers"
                  className="block py-3 text-[15px] font-medium text-slate-900 hover:text-black"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Developers
                </Link>
                <Link
                  href="/enterprise"
                  className="block py-3 text-[15px] font-medium text-slate-900 hover:text-black"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Enterprise
                </Link>
                <Link
                  href="/pricing"
                  className="block py-3 text-[15px] font-medium text-slate-900 hover:text-black"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  Pricing
                </Link>
              </div>
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="border-b border-slate-200">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-slate-900"
                    onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                    aria-expanded={mobileExpanded === item.name}
                    aria-label={`${item.name} mobile menu`}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-slate-500 transition-transform duration-200',
                        mobileExpanded === item.name ? 'rotate-180' : '',
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === item.name && (
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
                              {col.items.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={normalizeHref(sub.href)}
                                  className="flex flex-col rounded px-1 py-2 hover:bg-slate-50"
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileExpanded(null);
                                  }}
                                >
                                  <span className="text-[14px] text-slate-900">{sub.label}</span>
                                  <span className="text-[12px] text-slate-500">{sub.desc}</span>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex flex-col gap-3 px-4 pb-8 pt-6">
              <Link
                href={LOGIN_URL}
                className="block rounded border border-slate-300 bg-white py-3 text-center text-[14px] font-semibold text-black hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/report-security"
                className="block rounded bg-[#1E3A8A] py-3 text-center text-[14px] font-semibold text-white transition-colors hover:bg-[#172554]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Under attack?
              </Link>
              <Link
                href={SIGN_UP_URL}
                className="block py-3 text-center text-[14px] font-semibold text-[#1E3A8A] hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col items-start text-left">
              <Link href="/" className="inline-flex items-center justify-start mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E90FF]/40 rounded w-full" aria-label="Apexlyn home">
                <ApexlynLogo variant="wordmark" forDarkBackground align="start" height={44} className="h-11 w-auto max-w-full [&_img]:max-w-[min(100%,280px)]" />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed">Infrastructure you can trust.</p>
            </div>

            {[
              {
                title: 'Products',
                links: [
                  { label: 'Application Services', href: '/products' },
                  { label: 'Network Services', href: '/products' },
                  { label: 'Zero Trust', href: '/zero-trust' },
                  { label: 'Developer Platform', href: '/developers' },
                  { label: 'AI', href: '/products' },
                ],
              },
              {
                title: 'Solutions',
                links: [
                  { label: 'Enterprise', href: '/enterprise' },
                  { label: 'SMB', href: '/solutions' },
                  { label: 'Startups', href: '/solutions' },
                  { label: 'Government', href: '/solutions' },
                  { label: 'Gaming', href: '/solutions' },
                ],
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Blog', href: CLOUDFLARE_BLOG_URL },
                  { label: 'Case Studies', href: '/resources/case-studies' },
                  { label: 'Webinars', href: '/resources/webinars' },
                  { label: 'Documentation', href: CLOUDFLARE_DOCS_URL },
                  { label: 'Community', href: CLOUDFLARE_COMMUNITY_URL },
                ],
              },
              {
                title: 'Company',
                links: [
                  { label: 'About Us', href: '/company/about' },
                  { label: 'Careers', href: CLOUDFLARE_CAREERS_URL },
                  { label: 'Press', href: CLOUDFLARE_PRESS_URL },
                  { label: 'Investors', href: CLOUDFLARE_INVESTORS_URL },
                  { label: 'Impact', href: '/company/impact' },
                ],
              },
              {
                title: 'Support',
                links: [
                  { label: 'Help Center', href: CLOUDFLARE_SUPPORT_URL },
                  { label: 'System Status', href: CLOUDFLARE_STATUS_URL },
                  { label: 'Compliance', href: CLOUDFLARE_TRUST_URL },
                  { label: 'Trust Hub', href: CLOUDFLARE_TRUST_URL },
                  { label: 'Cookie Preferences', href: '/support/cookie-preferences' },
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

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-slate-500">
            <p>© {new Date().getFullYear()} Apexlyn · <Link href={normalizeHref(CLOUDFLARE_PRIVACY_URL)} className="hover:text-slate-300 transition-colors">Privacy Policy</Link> · <Link href={normalizeHref(CLOUDFLARE_TERMS_URL)} className="hover:text-slate-300 transition-colors">Terms of Use</Link> · <Link href="/report-security" className="hover:text-slate-300 transition-colors">Report Security Issues</Link></p>
            <div className="flex items-center gap-5">
              {[
                { label: 'Twitter / X', href: '/resources/community' },
                { label: 'LinkedIn', href: '/resources/community' },
                { label: 'Facebook', href: '/resources/community' },
                { label: 'YouTube', href: '/resources/community' },
                { label: 'GitHub', href: CLOUDFLARE_GITHUB_URL },
              ].map((s) => (
                <Link key={s.label} href={normalizeHref(s.href)} className="hover:text-slate-300 transition-colors text-xs">{s.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
