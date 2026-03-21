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
          items: ['CDN', 'DNS', 'Load Balancing', 'Argo Smart Routing', 'Early Hints', 'Zaraz'],
        },
        {
          title: 'Application Security',
          items: ['DDoS Protection', 'Web Application Firewall', 'Bot Management', 'API Shield', 'Page Shield', 'SSL/TLS'],
        },
        {
          title: 'Zero Trust & SASE',
          items: ['Access', 'Gateway', 'Browser Isolation', 'CASB', 'Data Loss Prevention', 'WARP'],
        },
        {
          title: 'Developer Platform',
          items: ['Workers', 'Pages', 'R2 Storage', 'D1 Database', 'KV', 'AI Gateway'],
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
          items: ['Enterprise', 'Small & Medium Business', 'Startups', 'Public Sector'],
        },
        {
          title: 'By Industry',
          items: ['Technology', 'Financial Services', 'Healthcare', 'Retail & eCommerce', 'Gaming', 'Media'],
        },
        {
          title: 'By Use Case',
          items: ['Network Security', 'Application Security', 'Cloud Connectivity', 'Performance', 'Zero Trust'],
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
          items: ['Blog', 'Learning Center', 'Webinars', 'Cloudflare TV', 'Analysts & Awards'],
        },
        {
          title: 'Connect',
          items: ['Community Forum', 'Cloudflare Radar', 'Speed Test', 'Case Studies', 'Trust & Safety'],
        },
        {
          title: 'Develop',
          items: ['Documentation', 'API', 'Developer Discord', 'Cloudflare Status', 'Support Portal'],
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
          items: ['Technology Partners', 'Channel Partners', 'System Integrators', 'Referral Program'],
        },
        {
          title: 'Find Help',
          items: ['Partner Directory', 'Become a Partner', 'Authorized Training'],
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
          items: ['About Cloudflare', 'Leadership', 'Careers', 'Press', 'Investor Relations', 'Analyst Reports'],
        },
        {
          title: 'Impact',
          items: ['Impact Report', 'Project Galileo', 'Athenian Project', 'Cloudflare for Campaigns', 'Critical Infrastructure Defense'],
        },
      ],
    },
  },
];

const DropdownMenu: React.FC<{ item: typeof NAV_ITEMS[0]; onClose: () => void }> = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-3 z-50"
      style={{ minWidth: item.dropdown.columns.length > 3 ? 780 : 560 }}
    >
      <div className="bg-[#1d1f20] border border-white/10 rounded-lg shadow-2xl p-6">
        <div
          className="grid gap-x-8 gap-y-1"
          style={{ gridTemplateColumns: `repeat(${item.dropdown.columns.length}, 1fr)` }}
        >
          {item.dropdown.columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold text-[#f6821f] uppercase tracking-wider mb-3">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.items.map((subItem) => (
                  <li key={subItem}>
                    <a
                      href="#"
                      onClick={onClose}
                      className="text-sm text-[#a0aaba] hover:text-white transition-colors duration-150 block py-0.5"
                    >
                      {subItem}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [location] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-[#1d1f20] border-b border-white/[0.08]" style={{ height: 64 }}>
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">

          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mr-8 shrink-0">
              {/* Cloudflare flame logo */}
              <svg width="28" height="36" viewBox="0 0 109 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M74.5 50.4c-2.6-9.4-11.2-16.3-21.4-16.3-1.8 0-3.6.2-5.3.7-3.6-7.6-11.4-12.9-20.4-12.9C12.9 21.9 3.5 31.3 3.5 42.8c0 2 .3 4 .8 5.8C1.7 50.8 0 53.9 0 57.4c0 6.9 5.6 12.5 12.5 12.5h62c6.9 0 12.5-5.6 12.5-12.5 0-3.8-1.7-7.2-4.4-9.5l-8.1 2.5z" fill="#FBAD41"/>
                <path d="M109 88.5c0-11.9-9.6-21.5-21.5-21.5-2.4 0-4.7.4-6.9 1.1C77 60.3 69 55 59.6 55c-13.5 0-24.4 10.9-24.4 24.4 0 .8 0 1.6.1 2.4-7 1.8-12.2 8.2-12.2 15.8 0 9 7.3 16.3 16.3 16.3H97c6.6 0 12-5.4 12-12z" fill="#F6821F"/>
              </svg>
              <span className="text-[17px] font-semibold text-white tracking-[-0.01em]">Cloudflare</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center" onMouseLeave={handleMouseLeave}>
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium transition-colors duration-150',
                      activeDropdown === item.name ? 'text-white' : 'text-[#a0aaba] hover:text-white'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === item.name ? 'rotate-180 text-[#f6821f]' : ''
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <DropdownMenu item={item} onClose={() => setActiveDropdown(null)} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>

          {/* Right: CTA buttons */}
          <div className="hidden lg:flex items-center gap-1">
            <a
              href="#"
              className="px-3.5 py-2 text-[14px] font-medium text-[#a0aaba] hover:text-white transition-colors"
            >
              Contact Sales
            </a>
            <a
              href="#"
              className="px-3.5 py-2 text-[14px] font-medium text-[#a0aaba] hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="ml-2 inline-flex items-center justify-center px-4 py-2 rounded text-[14px] font-semibold text-white transition-all duration-150"
              style={{ backgroundColor: '#f6821f' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e07010')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f6821f')}
            >
              Sign up
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#1d1f20] pt-16 overflow-y-auto lg:hidden"
          >
            <nav className="px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="border-b border-white/10">
                  <button
                    className="w-full flex items-center justify-between py-4 text-sm font-medium text-white"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.name ? null : item.name)
                    }
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-[#a0aaba] transition-transform',
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
                        className="overflow-hidden pb-4"
                      >
                        {item.dropdown.columns.map((col) => (
                          <div key={col.title} className="mb-4">
                            <p className="text-[11px] font-semibold text-[#f6821f] uppercase tracking-wider mb-2 px-2">
                              {col.title}
                            </p>
                            {col.items.map((sub) => (
                              <a
                                key={sub}
                                href="#"
                                className="block px-2 py-1.5 text-sm text-[#a0aaba] hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub}
                              </a>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-6 flex flex-col gap-3">
                <a
                  href="#"
                  className="block py-3 text-center text-sm font-medium text-white border border-white/20 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="block py-3 text-center text-sm font-semibold text-white rounded"
                  style={{ backgroundColor: '#f6821f' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </a>
              </div>
            </nav>
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
              <Link href="/" className="flex items-center gap-2 mb-5">
                <svg width="22" height="28" viewBox="0 0 109 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M74.5 50.4c-2.6-9.4-11.2-16.3-21.4-16.3-1.8 0-3.6.2-5.3.7-3.6-7.6-11.4-12.9-20.4-12.9C12.9 21.9 3.5 31.3 3.5 42.8c0 2 .3 4 .8 5.8C1.7 50.8 0 53.9 0 57.4c0 6.9 5.6 12.5 12.5 12.5h62c6.9 0 12.5-5.6 12.5-12.5 0-3.8-1.7-7.2-4.4-9.5l-8.1 2.5z" fill="#FBAD41"/>
                  <path d="M109 88.5c0-11.9-9.6-21.5-21.5-21.5-2.4 0-4.7.4-6.9 1.1C77 60.3 69 55 59.6 55c-13.5 0-24.4 10.9-24.4 24.4 0 .8 0 1.6.1 2.4-7 1.8-12.2 8.2-12.2 15.8 0 9 7.3 16.3 16.3 16.3H97c6.6 0 12-5.4 12-12z" fill="#F6821F"/>
                </svg>
                <span className="text-base font-semibold text-white">Cloudflare</span>
              </Link>
              <p className="text-[#a0aaba] text-sm leading-relaxed">
                Building a better Internet, together.
              </p>
            </div>

            {[
              {
                title: 'Products',
                links: ['Application Services', 'Network Services', 'Zero Trust', 'Developer Platform', 'AI'],
              },
              {
                title: 'Solutions',
                links: ['Enterprise', 'SMB', 'Startups', 'Government', 'Gaming'],
              },
              {
                title: 'Resources',
                links: ['Blog', 'Case Studies', 'Webinars', 'Documentation', 'Community'],
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Investors', 'Impact'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'System Status', 'Compliance', 'Trust Hub', 'Cookie Preferences'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[13px] font-semibold text-white mb-4 uppercase tracking-wide">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#a0aaba] hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a0aaba]">
            <p>© {new Date().getFullYear()} Cloudflare, Inc. · Privacy Policy · Terms of Use · Report Security Issues</p>
            <div className="flex items-center gap-5">
              {['Twitter', 'LinkedIn', 'Facebook', 'YouTube', 'GitHub'].map((s) => (
                <a key={s} href="#" className="hover:text-white transition-colors text-xs">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
