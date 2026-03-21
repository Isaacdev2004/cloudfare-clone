import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from './ui/button';
import { Menu, X, ChevronDown, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Products', path: '/products' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Why Cloudflare', path: '/why-cloudflare' },
  { name: 'Pricing', path: '/pricing' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Navbar */}
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-lg" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Flame className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold tracking-tight text-white">Cloudflare</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-white hover:bg-white/5",
                    location === link.path ? "text-white bg-white/10" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-primary transition-colors">
              Log in
            </Link>
            <Button variant="default" size="sm" onClick={() => window.location.href = '/signup'}>
              Sign Up
            </Button>
          </div>

          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-4 flex flex-col lg:hidden"
          >
            <nav className="flex flex-col gap-4 text-lg">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="py-3 border-b border-white/10 text-white font-medium flex justify-between items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronDown className="w-5 h-5 opacity-50 -rotate-90" />
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Button variant="outline" className="w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
                Log in
              </Button>
              <Button className="w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-[80px]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <Flame className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold tracking-tight text-white">Cloudflare</span>
              </Link>
              <p className="text-muted-foreground text-sm mb-6">
                Building a better Internet.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Products</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Application Services</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Network Services</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Zero Trust</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Developer Platform</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Solutions</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Small Business</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Startups</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Government</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Investors</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Cloudflare, Inc.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
