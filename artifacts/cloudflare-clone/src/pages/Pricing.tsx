import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { subtleLiftHover } from '@/lib/motion';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    desc: 'For personal or hobby projects that aren\'t business-critical.',
    cta: 'Sign up',
    ctaStyle: 'outline',
    highlight: false,
    features: {
      cdn: 'Unmetered',
      ddos: 'Unmetered',
      ssl: 'Universal SSL',
      waf: false,
      imageOpt: false,
      pageRules: '3',
      bots: 'Bot Fight Mode',
      analytics: '24 hours',
      support: 'Community',
      email: true,
      apiShield: false,
    },
  },
  {
    name: 'Pro',
    price: '$20',
    period: '/month',
    desc: 'For professional websites, blogs, and portfolios requiring basic security and performance.',
    cta: 'Get Pro',
    ctaStyle: 'primary',
    highlight: true,
    badge: 'Most Popular',
    features: {
      cdn: 'Unmetered',
      ddos: 'Unmetered',
      ssl: 'Universal + Custom',
      waf: 'Core Ruleset',
      imageOpt: 'Polish + Mirage',
      pageRules: '20',
      bots: 'Super Bot Fight Mode',
      analytics: '7 days',
      support: 'Email',
      email: true,
      apiShield: false,
    },
  },
  {
    name: 'Business',
    price: '$200',
    period: '/month',
    desc: 'For small businesses operating online requiring advanced security, performance, and support.',
    cta: 'Get Business',
    ctaStyle: 'outline',
    highlight: false,
    features: {
      cdn: 'Unmetered',
      ddos: 'Unmetered',
      ssl: 'Universal + Custom + Dedicated',
      waf: 'Core + OWASP + Custom',
      imageOpt: 'Polish + Mirage + Resize',
      pageRules: '50',
      bots: 'Bot Analytics',
      analytics: '30 days',
      support: 'Chat 24/7',
      email: true,
      apiShield: 'Basic',
    },
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large organizations and those with mission-critical requirements.',
    cta: 'Contact sales',
    ctaStyle: 'outline',
    highlight: false,
    features: {
      cdn: 'Unmetered + Advanced',
      ddos: 'Advanced + SLA',
      ssl: 'All + mTLS',
      waf: 'Full + Custom + Managed Rules',
      imageOpt: 'All features',
      pageRules: 'Unlimited',
      bots: 'Bot Management',
      analytics: '90 days',
      support: 'Dedicated CSM + TAM',
      email: true,
      apiShield: 'Full suite',
    },
  },
];

const COMPARISON_ROWS = [
  { category: 'Performance', rows: [
    { label: 'Global CDN (320+ cities)', free: true, pro: true, business: true, enterprise: true },
    { label: 'HTTP/3 & QUIC', free: true, pro: true, business: true, enterprise: true },
    { label: 'Argo Smart Routing', free: false, pro: false, business: 'Optional', enterprise: 'Optional' },
    { label: 'Image optimization (Polish)', free: false, pro: true, business: true, enterprise: true },
    { label: 'Mirage (mobile images)', free: false, pro: true, business: true, enterprise: true },
    { label: 'Image Resizing', free: false, pro: false, business: true, enterprise: true },
    { label: 'Rocket Loader', free: true, pro: true, business: true, enterprise: true },
  ]},
  { category: 'Security', rows: [
    { label: 'DDoS protection (unmetered)', free: true, pro: true, business: true, enterprise: true },
    { label: 'Free SSL certificate', free: true, pro: true, business: true, enterprise: true },
    { label: 'Custom SSL certificate', free: false, pro: false, business: true, enterprise: true },
    { label: 'Web Application Firewall', free: false, pro: 'Core rules', business: 'Core + OWASP', enterprise: 'Full + Managed' },
    { label: 'Bot management', free: 'Fight Mode', pro: 'Super Fight Mode', business: 'Bot Analytics', enterprise: 'Full' },
    { label: 'API Shield', free: false, pro: false, business: 'Basic', enterprise: 'Full suite' },
    { label: 'Rate limiting', free: false, pro: false, business: true, enterprise: true },
    { label: 'Page Shield (CSP)', free: false, pro: false, business: true, enterprise: true },
  ]},
  { category: 'Network', rows: [
    { label: 'Cloudflare Tunnel', free: true, pro: true, business: true, enterprise: true },
    { label: 'Email routing', free: true, pro: true, business: true, enterprise: true },
    { label: 'Load balancing', free: false, pro: false, business: 'Optional', enterprise: 'Optional' },
    { label: 'Magic Transit', free: false, pro: false, business: false, enterprise: true },
  ]},
  { category: 'Analytics & Support', rows: [
    { label: 'Web analytics retention', free: '24 hours', pro: '7 days', business: '30 days', enterprise: '90 days' },
    { label: 'Firewall analytics', free: '24 hours', pro: '7 days', business: '30 days', enterprise: '90 days' },
    { label: 'Support', free: 'Community', pro: 'Email', business: '24/7 Chat', enterprise: 'Enterprise + CSM' },
    { label: 'SLA', free: false, pro: false, business: '100% uptime', enterprise: '100% uptime + SLA' },
  ]},
];

function CellValue({ val }: { val: string | boolean }) {
  if (val === true) return <Check className="w-5 h-5 text-[#f6821f] mx-auto" />;
  if (val === false) return <Minus className="w-4 h-4 text-[#374151] mx-auto" />;
  return <span className="text-[13px] text-slate-600 text-center block">{val}</span>;
}

export default function Pricing() {
  const [openCategory, setOpenCategory] = useState<string | null>('Performance');

  return (
    <div className="min-h-screen cf-page-bg">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <PageHero
          eyebrow="Plans & Pricing"
          title="Simple, transparent pricing"
          description="From personal projects to global enterprises — a plan that grows with you. No hidden fees."
          className="bg-transparent"
          contentClassName="py-20 text-center"
        />
      </section>

      {/* Plan cards */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={subtleLiftHover}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.highlight
                  ? 'border-[#f6821f] bg-white shadow-[0_10px_35px_-20px_rgba(246,130,31,0.35)]'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f6821f] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h2>
                <p className="text-[13px] text-slate-500 leading-snug h-10">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 text-sm mb-1">{plan.period}</span>}
                </div>
              </div>

              <Link
                href={plan.name === 'Enterprise' ? CONTACT_SALES_URL : SIGN_UP_URL}
                className={`w-full py-2.5 rounded text-sm font-semibold text-center block mb-8 transition-colors ${
                  plan.ctaStyle === 'primary'
                    ? 'text-white bg-[#f6821f] hover:bg-[#d96f18]'
                    : 'border border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3 text-sm text-slate-600 flex-grow">
                <p className="text-[11px] font-semibold text-slate-900 uppercase tracking-widest mb-3">Highlights</p>
                {[
                  `CDN: ${plan.features.cdn}`,
                  `DDoS: ${plan.features.ddos}`,
                  `SSL: ${plan.features.ssl}`,
                  plan.features.waf ? `WAF: ${plan.features.waf}` : null,
                  `Page rules: ${plan.features.pageRules}`,
                  `Analytics: ${plan.features.analytics}`,
                  `Support: ${plan.features.support}`,
                ].filter(Boolean).map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#f6821f] shrink-0 mt-0.5" />
                    <span className="text-[13px]">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add-ons section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <SectionHeading
            title="Available add-ons"
            description="Extend any plan with additional capabilities."
            className="mb-10"
            titleClassName="text-2xl"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Argo Smart Routing', price: 'Usage-based', desc: 'Route traffic via the fastest Cloudflare paths.' },
              { name: 'Image Resizing', price: '$0.006/resize', desc: 'On-the-fly image resizing and optimization.' },
              { name: 'Load Balancing', price: 'From $5/mo', desc: 'Health-aware traffic distribution across origins.' },
              { name: 'Rate Limiting', price: '$0.05 / 10k req', desc: 'Configurable request rate controls.' },
            ].map((addon) => (
              <motion.div key={addon.name} whileHover={subtleLiftHover} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#f6821f]/30 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{addon.name}</h3>
                <p className="text-[#f6821f] text-sm font-medium mb-2">{addon.price}</p>
                <p className="text-[12px] text-slate-500">{addon.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <SectionHeading
          title="Full feature comparison"
          description="See exactly what's included in each plan."
          className="mb-10"
          titleClassName="text-2xl"
        />

        {/* Header row */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-0 mb-2 bg-slate-50 rounded-t-xl border border-b-0 border-slate-200 p-4">
          <div />
          {['Free', 'Pro', 'Business', 'Enterprise'].map(p => (
            <div key={p} className="text-center">
              <p className="text-sm font-semibold text-slate-900">{p}</p>
            </div>
          ))}
        </div>

        <div className="border border-slate-200 rounded-b-xl overflow-hidden">
          {COMPARISON_ROWS.map((cat) => (
            <div key={cat.category} className="border-b border-slate-200 last:border-b-0">
              {/* Category header */}
              <button
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-slate-50 transition-colors"
                onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
              >
                <span className="text-[13px] font-semibold text-[#f6821f] uppercase tracking-widest">{cat.category}</span>
                {openCategory === cat.category
                  ? <ChevronUp className="w-4 h-4 text-slate-500" />
                  : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>

              {openCategory === cat.category && (
                <div>
                  {cat.rows.map((row, ri) => (
                    <div key={ri} className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-0 px-5 py-3 border-t border-slate-100 ${ri % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      <div className="text-[13px] text-slate-600 flex items-center">{row.label}</div>
                      <div className="flex items-center justify-center"><CellValue val={row.free} /></div>
                      <div className="flex items-center justify-center"><CellValue val={row.pro} /></div>
                      <div className="flex items-center justify-center"><CellValue val={row.business} /></div>
                      <div className="flex items-center justify-center"><CellValue val={row.enterprise} /></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeading title="Frequently asked questions" className="mb-10" titleClassName="text-2xl" />
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl">
            {[
              { q: 'Is the free plan really free forever?', a: 'Yes. Our Free plan has no time limit and no credit card required. You can use it indefinitely for personal projects.' },
              { q: 'What counts as a "website" on my plan?', a: 'Each Cloudflare zone (domain) requires its own plan. If you have multiple domains, each needs its own subscription.' },
              { q: 'Can I change plans at any time?', a: 'Yes. You can upgrade or downgrade at any time from your dashboard. Changes take effect immediately.' },
              { q: 'Do you offer nonprofit or educational discounts?', a: 'Yes. Through Project Galileo and the Athenian Project, we provide free service to at-risk organizations.' },
              { q: 'How does Enterprise pricing work?', a: 'Enterprise pricing is custom, based on your traffic volume, product mix, and support requirements. Contact our sales team.' },
              { q: 'Is there a trial period?', a: 'The Free plan itself is a permanent trial. You can test Pro or Business features by upgrading and downgrading within 30 days for a full refund.' },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Start for free today</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">No credit card needed. Upgrade anytime. Cancel anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors">
              Sign up free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={CONTACT_SALES_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors">
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
