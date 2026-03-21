import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Shield, Zap, Lock, Network, Globe, Building2 } from 'lucide-react';

const CONTACT_SALES_URL = '/enterprise';
const CASE_STUDIES_URL = '/why-cloudflare';

const LOGOS = ['Microsoft', 'Shopify', 'DoorDash', 'Discord', 'Garmin', 'L\'Oréal', 'Zendesk', 'Thomson Reuters'];

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
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero */}
      <section className="relative bg-[#1d1f20] border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6821f]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-24 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="w-4 h-4 text-[#f6821f]" />
              <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest">Enterprise</p>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Security and performance<br />at enterprise scale
            </h1>
            <p className="text-[#a0aaba] text-xl leading-relaxed mb-10">
              Protect and accelerate your entire enterprise — applications, networks, and workforce — from a single, unified platform. No hardware. No agents. Just results.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={CONTACT_SALES_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
                Talk to sales <ArrowRight className="w-4 h-4" />
              </a>
              <a href={CASE_STUDIES_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
                View case studies
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer logos */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <p className="text-[#6b7280] text-sm text-center mb-8">Trusted by the world's leading organizations</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {LOGOS.map((logo) => (
              <span key={logo} className="text-[#6b7280] font-semibold text-sm hover:text-[#a0aaba] transition-colors">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-2">Full-stack enterprise platform</h2>
        <p className="text-[#6b7280] mb-12">Every product, on one network, from one vendor.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1d1f20] border border-white/[0.08] rounded-xl p-8 hover:border-[#f6821f]/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#f6821f]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#f6821f]" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{cap.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#f6821f] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#a0aaba]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Compliance */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-2">Compliance, built in</h2>
          <p className="text-[#6b7280] mb-12">Cloudflare is audited and certified across the major compliance frameworks.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COMPLIANCE.map((c) => (
              <div key={c.label} className="bg-[#0f172a] border border-white/[0.08] rounded-xl p-5 hover:border-[#f6821f]/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#f6821f] mb-3" />
                <p className="text-sm font-semibold text-white">{c.label}</p>
                <p className="text-xs text-[#6b7280] mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-12">Enterprise includes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Dedicated customer success manager', desc: 'A named CSM who understands your architecture and is your advocate inside Cloudflare.' },
            { title: 'Technical account manager (TAM)', desc: 'A senior engineer embedded with your team for architecture reviews and escalations.' },
            { title: '100% uptime SLA', desc: 'Financially-backed uptime guarantee. If we miss it, you receive service credits.' },
            { title: 'Custom contracts', desc: 'Tailored pricing, committed use discounts, and multi-year agreements available.' },
            { title: 'Advanced analytics', desc: '90-day retention, SIEM integration, GraphQL API, and custom dashboards.' },
            { title: 'Priority support queue', desc: '24/7 access to enterprise support engineers with guaranteed response SLAs.' },
          ].map((item) => (
            <div key={item.title} className="bg-[#1d1f20] border border-white/[0.08] rounded-xl p-6">
              <div className="w-1 h-6 rounded bg-[#f6821f] mb-4" />
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#6b7280] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to secure your enterprise?</h2>
          <p className="text-[#a0aaba] mb-8 max-w-lg mx-auto">Our solutions engineers will design a custom architecture for your organization.</p>
          <a href={CONTACT_SALES_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded text-base font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
            Talk to our enterprise team <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
