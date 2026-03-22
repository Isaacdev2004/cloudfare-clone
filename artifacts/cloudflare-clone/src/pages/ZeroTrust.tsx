import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Globe, Monitor, Eye, CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { subtleLiftHover } from '@/lib/motion';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';

const PRODUCTS = [
  { icon: Lock, name: 'Access', tag: 'Zero Trust Network Access', desc: 'Replace your VPN with identity-aware, Zero Trust access to any application. Works with any IdP.', link: '/zero-trust' },
  { icon: Shield, name: 'Gateway', tag: 'Secure Web Gateway', desc: 'Filter DNS, HTTP, and network traffic to stop threats and enforce corporate security policies everywhere.', link: '/zero-trust' },
  { icon: Globe, name: 'Browser Isolation', tag: 'Remote Browser', desc: 'Execute browser code in the cloud. Users see pixels, attackers can\'t get in. Stop malware at the browser.', link: '/zero-trust' },
  { icon: Eye, name: 'CASB', tag: 'Cloud Access Security Broker', desc: 'Scan SaaS apps for misconfigurations, shadow IT, and data exposures — automatically, continuously.', link: '/zero-trust' },
  { icon: Shield, name: 'DLP', tag: 'Data Loss Prevention', desc: 'Detect and block sensitive data from leaving your organization across web, SaaS, and email.', link: '/zero-trust' },
  { icon: Monitor, name: 'DEX', tag: 'Digital Experience Monitoring', desc: 'Understand and improve employee experience for every app — from anywhere, on any device.', link: '/zero-trust' },
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
    <div className="min-h-screen cf-page-bg">
      {/* Hero */}
      <section className="bg-[#1d1f20] border-b border-white/[0.08]">
        <PageHero
          eyebrow="Zero Trust & SASE"
          title={<>Replace your VPN.<br />Secure every user,<br />app, and device.</>}
          description="Cloudflare One is the industry's most complete Zero Trust / SASE platform — delivered as a service on our global network. No hardware. Deploy in days, not months."
          actions={[
            { label: 'Start for free', href: SIGN_UP_URL, variant: 'primary' },
            { label: 'Talk to sales', href: CONTACT_SALES_URL, variant: 'outline' },
          ]}
          className="bg-transparent"
          contentClassName="py-24"
        />
      </section>

      {/* Products */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeading
          title="The complete Zero Trust platform"
          description="Every product shares our global network — no stitching together third-party tools."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={subtleLiftHover}
                className="group"
              >
                <Link href={product.link} className="flex flex-col bg-[#1d1f20] border border-white/[0.08] rounded-xl p-6 hover:border-[#f6821f]/40 transition-all h-full">
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
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeading
            title="How Cloudflare One works"
            description="From pilot to full deployment in days."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
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
        <SectionHeading
          title="Zero Trust vs. traditional VPN"
          description="Why thousands of organizations are replacing their VPNs with Cloudflare."
          className="mb-10"
        />
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
            <Link href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors">
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={CONTACT_SALES_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
