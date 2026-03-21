import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_ITEMS = [
  {
    name: 'Products',
    dropdown: {
      columns: [
        {
          title: 'Application Performance',
          items: [
            { label: 'CDN', desc: 'Cache and serve from 320+ cities' },
            { label: 'DNS', desc: "The world's fastest DNS resolver" },
            { label: 'Load Balancing', desc: 'Global server load balancing' },
            { label: 'Argo Smart Routing', desc: 'Accelerate web traffic' },
            { label: 'Early Hints', desc: 'Speed up page loads' },
            { label: 'Zaraz', desc: 'Fast, privacy-first third parties' },
          ],
        },
        {
          title: 'Application Security',
          items: [
            { label: 'DDoS Protection', desc: 'Unmetered, always-on protection' },
            { label: 'Web Application Firewall', desc: 'Block threats at the edge' },
            { label: 'Bot Management', desc: 'Identify and stop bad bots' },
            { label: 'API Shield', desc: 'Protect your API endpoints' },
            { label: 'Page Shield', desc: 'Monitor for supply chain attacks' },
            { label: 'SSL/TLS', desc: 'Free certificates, auto-renewal' },
          ],
        },
        {
          title: 'Zero Trust & SASE',
          items: [
            { label: 'Access', desc: 'Zero Trust application access' },
            { label: 'Gateway', desc: 'Secure DNS & web filtering' },
            { label: 'Browser Isolation', desc: 'Remote browser technology' },
            { label: 'CASB', desc: 'Cloud app security broker' },
            { label: 'Data Loss Prevention', desc: 'Stop sensitive data leaks' },
            { label: 'WARP', desc: 'Secure device connectivity' },
          ],
        },
        {
          title: 'Developer Platform',
          items: [
            { label: 'Workers', desc: 'Serverless at the edge' },
            { label: 'Pages', desc: 'Deploy JAMstack sites globally' },
            { label: 'R2 Storage', desc: 'Object storage, no egress fees' },
            { label: 'D1 Database', desc: 'SQLite at the edge' },
            { label: 'KV', desc: 'Global key-value store' },
            { label: 'AI Gateway', desc: 'AI observability & caching' },
          ],
        },
      ],
    },
  },
  {
    name: 'Solutions',
    dropdown: {
      columns: [
        {
          title: 'By Business Size',
          items: [
            { label: 'Enterprise', desc: 'For large-scale organizations' },
            { label: 'Small & Medium Business', desc: 'Affordable, powerful security' },
            { label: 'Startups', desc: 'Grow fast, stay secure' },
            { label: 'Public Sector', desc: 'Government-grade compliance' },
          ],
        },
        {
          title: 'By Industry',
          items: [
            { label: 'Technology', desc: 'Performance for SaaS companies' },
            { label: 'Financial Services', desc: 'Security for financial data' },
            { label: 'Healthcare', desc: 'HIPAA-ready infrastructure' },
            { label: 'Retail & eCommerce', desc: 'Speed and security for stores' },
            { label: 'Gaming', desc: 'Low latency, high availability' },
            { label: 'Media & Entertainment', desc: 'Stream content globally' },
          ],
        },
        {
          title: 'By Use Case',
          items: [
            { label: 'Network Security', desc: 'Protect your network perimeter' },
            { label: 'Application Security', desc: 'Secure every app and API' },
            { label: 'Cloud Connectivity', desc: 'Connect clouds seamlessly' },
            { label: 'Zero Trust', desc: 'Verify every user and device' },
            { label: 'AI Protection', desc: 'Secure your AI workloads' },
          ],
        },
      ],
    },
  },
  {
    name: 'Resources',
    dropdown: {
      columns: [
        {
          title: 'Learn',
          items: [
            { label: 'Blog', desc: 'Product updates and insights' },
            { label: 'Learning Center', desc: 'Security & performance guides' },
            { label: 'Webinars', desc: 'Live and on-demand sessions' },
            { label: 'Cloudflare TV', desc: 'Stream our content channel' },
            { label: 'Analysts & Awards', desc: 'See how analysts rate us' },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'Community Forum', desc: 'Connect with other users' },
            { label: 'Cloudflare Radar', desc: 'Internet traffic insights' },
            { label: 'Speed Test', desc: 'Test your network performance' },
            { label: 'Case Studies', desc: 'See customer success stories' },
            { label: 'Trust & Safety', desc: 'Abuse policies and reports' },
          ],
        },
        {
          title: 'Develop',
          items: [
            { label: 'Documentation', desc: 'Guides for all Cloudflare products' },
            { label: 'API Reference', desc: 'Manage Cloudflare via API' },
            { label: 'Developer Discord', desc: 'Chat with our dev community' },
            { label: 'Cloudflare Status', desc: 'Real-time system status' },
            { label: 'Support Portal', desc: 'Get help from our team' },
          ],
        },
      ],
    },
  },
  {
    name: 'Partners',
    dropdown: {
      columns: [
        {
          title: 'Partner Programs',
          items: [
            { label: 'Technology Partners', desc: 'Integrate with Cloudflare' },
            { label: 'Channel Partners', desc: 'Resell Cloudflare products' },
            { label: 'System Integrators', desc: 'Deploy for enterprise clients' },
            { label: 'Referral Program', desc: 'Earn referral rewards' },
          ],
        },
        {
          title: 'Find Help',
          items: [
            { label: 'Partner Directory', desc: 'Find a Cloudflare partner' },
            { label: 'Become a Partner', desc: 'Apply to join our network' },
            { label: 'Authorized Training', desc: 'Get certified in Cloudflare' },
          ],
        },
      ],
    },
  },
  {
    name: 'About',
    dropdown: {
      columns: [
        {
          title: 'Company',
          items: [
            { label: 'About Cloudflare', desc: 'Our mission and story' },
            { label: 'Leadership', desc: 'Meet the executive team' },
            { label: 'Careers', desc: 'Join the Cloudflare team' },
            { label: 'Press', desc: 'News and press releases' },
            { label: 'Investor Relations', desc: 'For shareholders and analysts' },
            { label: 'Analyst Reports', desc: 'Third-party evaluations' },
          ],
        },
        {
          title: 'Impact',
          items: [
            { label: 'Impact Report', desc: 'Our commitment to a better Internet' },
            { label: 'Project Galileo', desc: 'Protecting vulnerable voices' },
            { label: 'Athenian Project', desc: 'Securing election infrastructure' },
            { label: 'Cloudflare for Campaigns', desc: 'Protecting political speech' },
            { label: 'Critical Infrastructure Defense', desc: 'Protecting hospitals & utilities' },
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
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDropdown(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

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
                  className={cn(
                    'flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 select-none',
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
            <a href="#" className="px-3.5 py-2 text-[14px] font-medium text-[#a0aaba] hover:text-white transition-colors whitespace-nowrap">
              Contact Sales
            </a>
            <a href="#" className="px-3.5 py-2 text-[14px] font-medium text-[#a0aaba] hover:text-white transition-colors">
              Log in
            </a>
            <a
              href="#"
              className="ml-2 inline-flex items-center justify-center px-4 py-[7px] rounded text-[14px] font-semibold text-white transition-colors duration-150"
              style={{ backgroundColor: '#f6821f' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d96f18')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f6821f')}
            >
              Sign up
            </a>
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
                            href="#"
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
                                <a
                                  key={sub.label}
                                  href="#"
                                  className="flex flex-col px-1 py-2 rounded hover:bg-white/5"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <span className="text-[14px] text-white/90">{sub.label}</span>
                                  <span className="text-[12px] text-[#6b7280]">{sub.desc}</span>
                                </a>
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
              <a href="#" className="block py-3 text-center text-[14px] font-medium text-white border border-white/20 rounded" onClick={() => setMobileMenuOpen(false)}>
                Log in
              </a>
              <a
                href="#"
                className="block py-3 text-center text-[14px] font-semibold text-white rounded"
                style={{ backgroundColor: '#f6821f' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </a>
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
              { title: 'Products', links: ['Application Services', 'Network Services', 'Zero Trust', 'Developer Platform', 'AI'] },
              { title: 'Solutions', links: ['Enterprise', 'SMB', 'Startups', 'Government', 'Gaming'] },
              { title: 'Resources', links: ['Blog', 'Case Studies', 'Webinars', 'Documentation', 'Community'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Investors', 'Impact'] },
              { title: 'Support', links: ['Help Center', 'System Status', 'Compliance', 'Trust Hub', 'Cookie Preferences'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] font-semibold text-white mb-4 uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[13px] text-[#a0aaba] hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#6b7280]">
            <p>© {new Date().getFullYear()} Cloudflare, Inc. · Privacy Policy · Terms of Use · Report Security Issues</p>
            <div className="flex items-center gap-5">
              {['Twitter / X', 'LinkedIn', 'Facebook', 'YouTube', 'GitHub'].map((s) => (
                <a key={s} href="#" className="hover:text-[#a0aaba] transition-colors text-xs">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
