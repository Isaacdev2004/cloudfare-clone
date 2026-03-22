import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Shield, Zap, Lock, Network, Globe } from 'lucide-react';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { brandLogos } from '@/lib/assets';
import { subtleLiftHover } from '@/lib/motion';

const CONTACT_SALES_URL = '/enterprise';
const CASE_STUDIES_URL = '/why-cloudflare';

const CAPABILITIES = [
  {
    icon: Shield,
    title: 'Enterprise-grade security',
    items: ['Advanced DDoS mitigation with custom SLA', 'Full WAF with managed ruleset + custom rules', 'Bot Management with ML-based detection', 'API Shield with schema validation + mTLS', 'Data Loss Prevention across all traffic'],
  },
  {
    icon: Lock,
    title: 'Zero Trust / SASE',
    items: ['Cloudflare Access — replace VPN across all apps', 'Gateway — SWG + DNS filtering at scale', 'Cloud Access Security Broker (CASB)', 'Browser Isolation for third-party access', 'Digital Experience Monitoring'],
  },
  {
    icon: Network,
    title: 'Network services',
    items: ['Magic Transit — DDoS for entire IP ranges', 'Magic WAN — software-defined enterprise WAN', 'Network Interconnect — private peering', 'Cloudflare Tunnel — no public IPs needed', 'Magic Firewall — network-level rules'],
  },
  {
    icon: Zap,
    title: 'Performance & reliability',
    items: ['100% uptime SLA with financial backing', 'Argo Smart Routing for fastest paths', 'Advanced Cache Rules + Tiered Cache', 'Global load balancing across origins', 'HTTP/3, QUIC, Early Hints'],
  },
];

const COMPLIANCE = [
  { label: 'SOC 2 Type II', desc: 'Annual third-party audit' },
  { label: 'ISO 27001', desc: 'Information security management' },
  { label: 'PCI DSS Level 1', desc: 'Payment card industry' },
  { label: 'FedRAMP High', desc: 'US Federal Government' },
  { label: 'HIPAA', desc: 'Healthcare data compliance' },
  { label: 'GDPR', desc: 'EU data protection' },
  { label: 'FIPS 140-2', desc: 'Cryptographic standards' },
  { label: 'CSA STAR', desc: 'Cloud security assurance' },
];

export default function Enterprise() {
  return (
    <div className="min-h-screen cf-page-bg">
      {/* Hero */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6821f]/5 to-transparent pointer-events-none" />
        <PageHero
          eyebrow="Enterprise"
          title={<>Security and performance<br />at enterprise scale</>}
          description="Protect and accelerate your entire enterprise — applications, networks, and workforce — from a single, unified platform. No hardware. No agents. Just results."
          actions={[
            { label: 'Talk to sales', href: CONTACT_SALES_URL, variant: 'primary' },
            { label: 'View case studies', href: CASE_STUDIES_URL, variant: 'outline' },
          ]}
          className="bg-transparent"
          contentClassName="relative z-10 py-24"
        />
      </section>

      {/* Customer logos */}
      <section className="border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <p className="text-slate-500 text-sm text-center mb-8">Trusted by the world's leading organizations</p>
          <div className="flex flex-wrap gap-5 justify-center">
            {brandLogos.map((logo) => (
              <div key={logo.name} className="h-11 w-[180px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                <img src={logo.src} alt={logo.name} className="max-h-11 w-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeading
          title="Full-stack enterprise platform"
          description="Every product, on one network, from one vendor."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={subtleLiftHover}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:border-[#f6821f]/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#f6821f]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#f6821f]" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{cap.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#f6821f] shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Compliance */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeading
            title="Compliance, built in"
            description="Cloudflare is audited and certified across the major compliance frameworks."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COMPLIANCE.map((c) => (
              <motion.div key={c.label} whileHover={subtleLiftHover} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#f6821f]/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#f6821f] mb-3" />
                <p className="text-sm font-semibold text-slate-900">{c.label}</p>
                <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeading title="Enterprise includes" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Dedicated customer success manager', desc: 'A named CSM who understands your architecture and is your advocate inside Cloudflare.' },
            { title: 'Technical account manager (TAM)', desc: 'A senior engineer embedded with your team for architecture reviews and escalations.' },
            { title: '100% uptime SLA', desc: 'Financially-backed uptime guarantee. If we miss it, you receive service credits.' },
            { title: 'Custom contracts', desc: 'Tailored pricing, committed use discounts, and multi-year agreements available.' },
            { title: 'Advanced analytics', desc: '90-day retention, SIEM integration, GraphQL API, and custom dashboards.' },
            { title: 'Priority support queue', desc: '24/7 access to enterprise support engineers with guaranteed response SLAs.' },
          ].map((item) => (
            <motion.div key={item.title} whileHover={subtleLiftHover} className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="w-1 h-6 rounded bg-[#f6821f] mb-4" />
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to secure your enterprise?</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">Our solutions engineers will design a custom architecture for your organization.</p>
          <Link href={CONTACT_SALES_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded text-base font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors">
            Talk to our enterprise team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
