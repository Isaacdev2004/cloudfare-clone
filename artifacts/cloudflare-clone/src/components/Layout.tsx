import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const SIGN_UP_URL = '/pricing';
const LOGIN_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';
const CLOUDFLARE_HOME_URL = '/';
const CLOUDFLARE_BLOG_URL = '/resources/blog';
const CLOUDFLARE_DOCS_URL = '/resources/documentation';
const CLOUDFLARE_STATUS_URL = '/support/system-status';
const CLOUDFLARE_COMMUNITY_URL = '/resources/community';
const CLOUDFLARE_PARTNERS_URL = '/solutions';
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
    name: 'Solutions',
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
    href: '#',
    dropdown: {
      columns: [
        {
          title: 'Learn',
          items: [
            { label: 'Blog', desc: 'Product updates and insights', href: CLOUDFLARE_BLOG_URL },
            { label: 'Learning Center', desc: 'Security & performance guides', href: '/resources/documentation' },
            { label: 'Webinars', desc: 'Live and on-demand sessions', href: '/resources/webinars' },
            { label: 'Cloudflare TV', desc: 'Stream our content channel', href: '/resources/blog' },
            { label: 'Analysts & Awards', desc: 'See how analysts rate us', href: '/resources/case-studies' },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'Community Forum', desc: 'Connect with other users', href: CLOUDFLARE_COMMUNITY_URL },
            { label: 'Cloudflare Radar', desc: 'Internet traffic insights', href: CLOUDFLARE_RADAR_URL },
            { label: 'Speed Test', desc: 'Test your network performance', href: '/resources/case-studies' },
            { label: 'Case Studies', desc: 'See customer success stories', href: '/resources/case-studies' },
            { label: 'Trust & Safety', desc: 'Abuse policies and reports', href: '/report-security' },
          ],
        },
        {
          title: 'Develop',
          items: [
            { label: 'Documentation', desc: 'Guides for all Cloudflare products', href: CLOUDFLARE_DOCS_URL },
            { label: 'API Reference', desc: 'Manage Cloudflare via API', href: '/resources/documentation' },
            { label: 'Developer Discord', desc: 'Chat with our dev community', href: '/resources/community' },
            { label: 'Cloudflare Status', desc: 'Real-time system status', href: CLOUDFLARE_STATUS_URL },
            { label: 'Support Portal', desc: 'Get help from our team', href: CLOUDFLARE_SUPPORT_URL },
          ],
        },
      ],
    },
  },
  {
    name: 'Partners',
    href: '#',
    dropdown: {
      columns: [
        {
          title: 'Partner Programs',
          items: [
            { label: 'Technology Partners', desc: 'Integrate with Cloudflare', href: CLOUDFLARE_PARTNERS_URL },
            { label: 'Channel Partners', desc: 'Resell Cloudflare products', href: CLOUDFLARE_PARTNERS_URL },
            { label: 'System Integrators', desc: 'Deploy for enterprise clients', href: CLOUDFLARE_PARTNERS_URL },
            { label: 'Referral Program', desc: 'Earn referral rewards', href: CLOUDFLARE_PARTNERS_URL },
          ],
        },
        {
          title: 'Find Help',
          items: [
            { label: 'Partner Directory', desc: 'Find a Cloudflare partner', href: CLOUDFLARE_PARTNERS_URL },
            { label: 'Become a Partner', desc: 'Apply to join our network', href: CLOUDFLARE_PARTNERS_URL },
            { label: 'Authorized Training', desc: 'Get certified in Cloudflare', href: CLOUDFLARE_PARTNERS_URL },
          ],
        },
      ],
    },
  },
  {
    name: 'About',
    href: '/why-cloudflare',
    dropdown: {
      columns: [
        {
          title: 'Company',
          items: [
            { label: 'About Cloudflare', desc: 'Our mission and story', href: '/company/about' },
            { label: 'Leadership', desc: 'Meet the executive team', href: '/company/about' },
            { label: 'Careers', desc: 'Join the Cloudflare team', href: CLOUDFLARE_CAREERS_URL },
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
            { label: 'Cloudflare for Campaigns', desc: 'Protecting political speech', href: '/company/impact' },
            { label: 'Critical Infrastructure Defense', desc: 'Protecting hospitals & utilities', href: '/company/impact' },
          ],
        },
      ],
    },
  },
];

const CloudflareLogo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={Math.round(size * 1.29)} viewBox="0 0 109 141" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M74.5 50.4c-2.6-9.4-11.2-16.3-21.4-16.3-1.8 0-3.6.2-5.3.7-3.6-7.6-11.4-12.9-20.4-12.9C12.9 21.9 3.5 31.3 3.5 42.8c0 2 .3 4 .8 5.8C1.7 50.8 0 53.9 0 57.4c0 6.9 5.6 12.5 12.5 12.5h62c6.9 0 12.5-5.6 12.5-12.5 0-3.8-1.7-7.2-4.4-9.5l-8.1 2.5z" fill="#FBAD41"/>
    <path d="M109 88.5c0-11.9-9.6-21.5-21.5-21.5-2.4 0-4.7.4-6.9 1.1C77 60.3 69 55 59.6 55c-13.5 0-24.4 10.9-24.4 24.4 0 .8 0 1.6.1 2.4-7 1.8-12.2 8.2-12.2 15.8 0 9 7.3 16.3 16.3 16.3H97c6.6 0 12-5.4 12-12z" fill="#F6821F"/>
  </svg>
);

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
    <div className="min-h-screen flex flex-col bg-background">

      {/* ── Header ── */}
      <header ref={headerRef} className="fixed top-0 w-full z-50 bg-[#1d1f20] border-b border-white/[0.08]" style={{ height: 64 }}>
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">

          {/* Left: Logo + Nav */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 mr-8 shrink-0" onClick={() => setActiveDropdown(null)}>
              <CloudflareLogo size={28} />
              <span className="text-[17px] font-semibold text-white tracking-[-0.01em]">Cloudflare</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onMouseEnter={() => openDropdown(item.name)}
                  onMouseLeave={startCloseTimer}
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  aria-expanded={activeDropdown === item.name}
                  aria-label={`${item.name} menu`}
                  className={cn(
                    'flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6821f]/60 rounded',
                    activeDropdown === item.name ? 'text-white' : 'text-[#a0aaba] hover:text-white'
                  )}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200 mt-px',
                      activeDropdown === item.name ? 'rotate-180 text-[#f6821f]' : ''
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>

          {/* Right: CTAs */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href={CONTACT_SALES_URL} className="px-3.5 py-2 text-[14px] font-medium text-[#a0aaba] hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6821f]/60 rounded">
              Contact Sales
            </Link>
            <Link href={LOGIN_URL} className="px-3.5 py-2 text-[14px] font-medium text-[#a0aaba] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6821f]/60 rounded">
              Log in
            </Link>
            <Link
              href={SIGN_UP_URL}
              className="ml-2 inline-flex items-center justify-center px-4 py-[7px] rounded text-[14px] font-semibold text-white transition-colors duration-150 bg-[#f6821f] hover:bg-[#d96f18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6821f]/60"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed left-0 right-0 z-40 bg-[#1d1f20] border-b border-white/[0.08] shadow-2xl"
            style={{ top: 64 }}
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
                    <p className="text-[11px] font-semibold text-[#f6821f] uppercase tracking-widest mb-4">
                      {col.title}
                    </p>
                    <ul className="space-y-0.5">
                      {col.items.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={normalizeHref(sub.href || '#')}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex flex-col py-2 px-2 rounded-md hover:bg-white/[0.05] transition-colors duration-100"
                          >
                            <span className="text-[14px] font-medium text-white/90 group-hover:text-white">
                              {sub.label}
                            </span>
                            <span className="text-[12px] text-[#6b7280] group-hover:text-[#9ca3af] mt-0.5 leading-snug">
                              {sub.desc}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-[2px] bg-gradient-to-r from-[#f6821f]/0 via-[#f6821f]/40 to-[#f6821f]/0" />
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
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px]"
            style={{ top: 64 }}
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
            className="fixed inset-0 z-40 bg-[#1d1f20] pt-16 overflow-y-auto lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <CloudflareLogo size={22} />
                <span className="text-base font-semibold text-white">Cloudflare</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="px-4 py-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="border-b border-white/[0.08]">
                  <button
                    className="w-full flex items-center justify-between py-4 text-[15px] font-medium text-white"
                    onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                    aria-expanded={mobileExpanded === item.name}
                    aria-label={`${item.name} mobile menu`}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn('w-4 h-4 text-[#6b7280] transition-transform duration-200',
                        mobileExpanded === item.name ? 'rotate-180' : ''
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
                        <div className="pb-6 space-y-5">
                          {item.dropdown.columns.map((col) => (
                            <div key={col.title}>
                              <p className="text-[10px] font-semibold text-[#f6821f] uppercase tracking-widest mb-2 px-1">
                                {col.title}
                              </p>
                              {col.items.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={normalizeHref(sub.href)}
                                  className="flex flex-col px-1 py-2 rounded hover:bg-white/5"
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileExpanded(null);
                                  }}
                                >
                                  <span className="text-[14px] text-white/90">{sub.label}</span>
                                  <span className="text-[12px] text-[#6b7280]">{sub.desc}</span>
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

            <div className="px-4 pt-6 pb-8 flex flex-col gap-3">
              <Link href={LOGIN_URL} className="block py-3 text-center text-[14px] font-medium text-white border border-white/20 rounded" onClick={() => setMobileMenuOpen(false)}>
                Log in
              </Link>
              <Link
                href={SIGN_UP_URL}
                className="block py-3 text-center text-[14px] font-semibold text-white rounded bg-[#f6821f] hover:bg-[#d96f18] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-grow pt-16">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-[#1d1f20] border-t border-white/[0.08] pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-5">
                <CloudflareLogo size={22} />
                <span className="text-base font-semibold text-white">Cloudflare</span>
              </Link>
              <p className="text-[#a0aaba] text-sm leading-relaxed">Building a better Internet.</p>
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
                      <Link href={normalizeHref(link.href)} className="text-[13px] text-[#a0aaba] hover:text-white transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#6b7280]">
            <p>© {new Date().getFullYear()} Cloudflare, Inc. · <Link href={normalizeHref(CLOUDFLARE_PRIVACY_URL)} className="hover:text-[#a0aaba] transition-colors">Privacy Policy</Link> · <Link href={normalizeHref(CLOUDFLARE_TERMS_URL)} className="hover:text-[#a0aaba] transition-colors">Terms of Use</Link> · <Link href="/report-security" className="hover:text-[#a0aaba] transition-colors">Report Security Issues</Link></p>
            <div className="flex items-center gap-5">
              {[
                { label: 'Twitter / X', href: '/resources/community' },
                { label: 'LinkedIn', href: '/resources/community' },
                { label: 'Facebook', href: '/resources/community' },
                { label: 'YouTube', href: '/resources/community' },
                { label: 'GitHub', href: CLOUDFLARE_GITHUB_URL },
              ].map((s) => (
                <Link key={s.label} href={normalizeHref(s.href)} className="hover:text-[#a0aaba] transition-colors text-xs">{s.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
