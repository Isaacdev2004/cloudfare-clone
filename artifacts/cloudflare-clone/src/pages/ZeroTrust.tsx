import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Globe, Monitor, Eye, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';

const PRODUCTS = [
  { icon: Lock, name: 'Access', tag: 'Zero Trust Network Access', desc: 'Replace your VPN with identity-aware, Zero Trust access to any application. Works with any IdP.', link: '#' },
  { icon: Shield, name: 'Gateway', tag: 'Secure Web Gateway', desc: 'Filter DNS, HTTP, and network traffic to stop threats and enforce corporate security policies everywhere.', link: '#' },
  { icon: Globe, name: 'Browser Isolation', tag: 'Remote Browser', desc: 'Execute browser code in the cloud. Users see pixels, attackers can\'t get in. Stop malware at the browser.', link: '#' },
  { icon: Eye, name: 'CASB', tag: 'Cloud Access Security Broker', desc: 'Scan SaaS apps for misconfigurations, shadow IT, and data exposures — automatically, continuously.', link: '#' },
  { icon: Shield, name: 'DLP', tag: 'Data Loss Prevention', desc: 'Detect and block sensitive data from leaving your organization across web, SaaS, and email.', link: '#' },
  { icon: Monitor, name: 'DEX', tag: 'Digital Experience Monitoring', desc: 'Understand and improve employee experience for every app — from anywhere, on any device.', link: '#' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Connect your identity provider', desc: 'Cloudflare integrates with Okta, Azure AD, Google Workspace, and 30+ other IdPs. Get SSO for all apps instantly.' },
  { step: '02', title: 'Define your policies', desc: 'Set access policies based on identity, device posture, location, and risk score. Apply them to every app in minutes.' },
  { step: '03', title: 'Deploy WARP to devices', desc: 'The lightweight WARP client routes all device traffic through Cloudflare Gateway for inspection and filtering.' },
  { step: '04', title: 'Monitor and remediate', desc: 'Unified logs, SIEM integration, and digital experience monitoring give you full visibility into every user and device.' },
];

const VS_VPN = [
  { feature: 'Network exposure', vpn: 'Puts entire network at risk', zt: 'App-by-app access only' },
  { feature: 'User experience', vpn: 'Slow, unreliable tunnels', zt: 'Fast, direct to app' },
  { feature: 'Deployment', vpn: 'Hardware + complex setup', zt: 'SaaS, deploy in hours' },
  { feature: 'Visibility', vpn: 'Limited logging', zt: 'Full user + device logs' },
  { feature: 'Performance impact', vpn: 'Backhauling traffic', zt: 'Local breakout via PoP' },
  { feature: 'Device health', vpn: 'No posture checks', zt: 'Continuous posture checks' },
];

export default function ZeroTrust() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero */}
      <section className="bg-[#1d1f20] border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Zero Trust & SASE</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
              Replace your VPN.<br />Secure every user,<br />app, and device.
            </h1>
            <p className="text-[#a0aaba] text-xl leading-relaxed max-w-2xl mb-10">
              Cloudflare One is the industry's most complete Zero Trust / SASE platform — delivered as a service on our global network. No hardware. Deploy in days, not months.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
                Start for free <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
                Talk to sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-2">The complete Zero Trust platform</h2>
        <p className="text-[#6b7280] mb-12">Every product shares our global network — no stitching together third-party tools.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.a
                key={product.name}
                href={product.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -2 }}
                className="group flex flex-col bg-[#1d1f20] border border-white/[0.08] rounded-xl p-6 hover:border-[#f6821f]/40 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f6821f]/10 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#f6821f]" />
                </div>
                <div className="mb-3">
                  <h3 className="text-[15px] font-semibold text-white group-hover:text-[#f6821f] transition-colors">{product.name}</h3>
                  <p className="text-[11px] text-[#6b7280] uppercase tracking-wider mt-0.5">{product.tag}</p>
                </div>
                <p className="text-[13px] text-[#6b7280] leading-relaxed flex-grow">{product.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-[13px] text-[#f6821f] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-2">How Cloudflare One works</h2>
          <p className="text-[#6b7280] mb-12">From pilot to full deployment in days.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl font-black text-[#f6821f]/20 mb-3">{step.step}</div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#6b7280] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VPN comparison */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-2">Zero Trust vs. traditional VPN</h2>
        <p className="text-[#6b7280] mb-10">Why thousands of organizations are replacing their VPNs with Cloudflare.</p>
        <div className="border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr] bg-[#1d1f20] border-b border-white/[0.08]">
            <div className="px-6 py-4 text-[12px] font-semibold text-[#6b7280] uppercase tracking-widest">Feature</div>
            <div className="px-4 py-4 text-[12px] font-semibold text-[#6b7280] uppercase tracking-widest text-center">Legacy VPN</div>
            <div className="px-4 py-4 text-[12px] font-semibold text-[#f6821f] uppercase tracking-widest text-center">Cloudflare Zero Trust</div>
          </div>
          {VS_VPN.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-[2fr_1fr_1fr] border-b border-white/[0.04] last:border-b-0 ${i % 2 === 0 ? 'bg-[#0f172a]' : 'bg-[#1d1f20]'}`}>
              <div className="px-6 py-4 text-sm text-[#a0aaba]">{row.feature}</div>
              <div className="px-4 py-4 text-[13px] text-[#6b7280] text-center">{row.vpn}</div>
              <div className="px-4 py-4 text-[13px] text-[#4ade80] text-center flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                {row.zt}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Start your Zero Trust journey</h2>
          <p className="text-[#a0aaba] mb-8 max-w-lg mx-auto">
            Free for up to 50 users. No hardware. No hidden setup fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
              Start for free <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
              Talk to sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
