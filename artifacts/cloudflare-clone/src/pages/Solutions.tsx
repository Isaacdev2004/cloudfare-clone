import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, Rocket, Landmark, ArrowRight, CheckCircle2, Shield, Zap, Lock, Globe } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Link } from 'wouter';
import { subtleLiftHover } from '@/lib/motion';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';

const BY_SIZE = [
  {
    icon: Building2,
    id: 'enterprise',
    title: 'Enterprise',
    headline: 'Enterprise-grade security, performance, and reliability',
    desc: 'Cloudflare gives enterprises a single platform to protect and accelerate every internet-facing application. From zero trust access to global network services — all without the complexity of point solutions.',
    features: ['Dedicated customer success & solutions engineering', 'SLA-backed 100% uptime guarantee', 'Custom contracts and pricing', 'Advanced analytics & SIEM integration', 'FedRAMP High authorized (US Govt)', 'Magic Transit network-layer DDoS protection'],
    cta: 'Talk to sales',
    link: '/enterprise',
    tag: 'Enterprise',
  },
  {
    icon: Store,
    id: 'smb',
    title: 'Small & Medium Business',
    headline: 'Enterprise security and performance — at SMB pricing',
    desc: 'Get the same tools large enterprises use, without an enterprise budget. Cloudflare\'s free and Pro plans give SMBs powerful DDoS protection, a CDN, and SSL — up and running in minutes.',
    features: ['Free Universal SSL certificate', 'Unmetered DDoS mitigation', 'Global CDN with 320+ PoPs', 'Web Application Firewall', 'Email routing (included)', 'Bot fight mode'],
    cta: 'Get started free',
    link: '/pricing',
    tag: 'SMB',
  },
  {
    icon: Rocket,
    id: 'startups',
    title: 'Startups',
    headline: 'Build fast, ship globally, stay secure from day one',
    desc: 'Cloudflare Workers, Pages, R2, and D1 give startups a full serverless stack with zero cold starts and no egress fees. Cloudflare for Startups provides free access for qualifying companies.',
    features: ['Workers & Pages — free tier', 'R2 storage — zero egress fees', 'D1 serverless SQL database', 'Cloudflare for Startups program', 'No credit card required to start', 'Community Discord & support'],
    cta: 'Apply for Startups program',
    link: '/developers',
    tag: 'Startups',
  },
  {
    icon: Landmark,
    id: 'public-sector',
    title: 'Public Sector',
    headline: 'FedRAMP-authorized security for critical infrastructure',
    desc: 'Government agencies trust Cloudflare to protect the most sensitive systems in the world. Project Galileo and the Athenian Project protect at-risk organizations at no cost.',
    features: ['FedRAMP High and Moderate authorization', 'IL4 and IL5 compliant options', 'Project Galileo — free for NGOs', 'Athenian Project — free for elections', 'CISA-recommended DDoS protection', 'Dedicated public sector team'],
    cta: 'Contact public sector team',
    link: '/why-cloudflare',
    tag: 'Government',
  },
];

const BY_INDUSTRY = [
  { icon: Landmark, title: 'Financial Services', desc: 'Protect banking applications and comply with PCI DSS, SOC 2, and GDPR with a single, auditable platform.' },
  { icon: Shield, title: 'Healthcare', desc: 'HIPAA-ready infrastructure to protect patient data and ensure availability for telehealth platforms.' },
  { icon: Store, title: 'Retail & eCommerce', desc: 'Fast, secure shopping experiences with DDoS protection, bot mitigation, and global CDN performance.' },
  { icon: Rocket, title: 'Gaming', desc: 'Ultra-low latency, DDoS protection for game servers, and global anycast for players everywhere.' },
  { icon: Globe, title: 'Media & Entertainment', desc: 'Stream live and on-demand video globally with Cloudflare Stream, CDN caching, and DDoS resilience.' },
  { icon: Building2, title: 'Technology & SaaS', desc: 'Scale SaaS applications globally with Workers, protect APIs, and ship faster with CI/CD via Pages.' },
];

const BY_USECASE = [
  {
    icon: Shield,
    title: 'Network Security',
    desc: 'Replace hardware firewalls with Magic Transit and Magic Firewall. Protect entire IP ranges from DDoS and threat actors at the network layer.',
    products: ['Magic Transit', 'Magic Firewall', 'DDoS Protection', 'Spectrum'],
  },
  {
    icon: Lock,
    title: 'Zero Trust / SASE',
    desc: 'Replace your VPN with Cloudflare Access, filter web traffic with Gateway, and secure devices with WARP — all from one dashboard.',
    products: ['Access', 'Gateway', 'Browser Isolation', 'WARP'],
  },
  {
    icon: Zap,
    title: 'Application Performance',
    desc: 'Speed up any website or API with our global CDN, smart routing, image optimization, and HTTP/3 — no code changes needed.',
    products: ['CDN', 'Argo Smart Routing', 'Polish', 'Zaraz'],
  },
  {
    icon: Globe,
    title: 'Multi-Cloud Connectivity',
    desc: 'Cloudflare Network Interconnect and Magic WAN connect your clouds, offices, and data centers with a software-defined WAN.',
    products: ['Magic WAN', 'Network Interconnect', 'Cloudflare Tunnel', 'BYOIP'],
  },
];

export default function Solutions() {
  const [activeSize, setActiveSize] = useState('enterprise');
  const selected = BY_SIZE.find(s => s.id === activeSize) || BY_SIZE[0];

  return (
    <div className="min-h-screen cf-page-bg">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <PageHero
          eyebrow="Solutions"
          title={<>Cloudflare for every<br />organization</>}
          description="Whether you're an individual developer or a Fortune 500 enterprise, Cloudflare has solutions tailored to your needs, budget, and compliance requirements."
          actions={[
            { label: 'Get started free', href: SIGN_UP_URL, variant: 'primary' },
            { label: 'Contact sales', href: CONTACT_SALES_URL, variant: 'outline' },
          ]}
          contentClassName="py-24"
          className="bg-transparent"
        />
      </section>

      {/* By Business Size */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeading
          title="By business size"
          description="Solutions designed for where you are today and where you're going."
          className="mb-10"
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="flex flex-row lg:flex-col gap-2">
            {BY_SIZE.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSize(s.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full transition-all ${
                    activeSize === s.id
                      ? 'bg-[#f6821f]/10 border border-[#f6821f]/30 text-slate-900'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${activeSize === s.id ? 'text-[#f6821f]' : ''}`} />
                  <span className="text-sm font-medium">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <motion.div
            key={activeSize}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl p-8"
          >
            <span className="inline-block text-[11px] font-semibold text-[#f6821f] uppercase tracking-widest border border-[#f6821f]/30 rounded-full px-3 py-1 mb-5">
              {selected.tag}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{selected.headline}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">{selected.desc}</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {selected.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f6821f] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href={selected.link}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors"
            >
              {selected.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* By Industry */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeading
            title="By industry"
            description="Industry-specific guidance and compliance frameworks built in."
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BY_INDUSTRY.map((ind) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.title}
                  whileHover={subtleLiftHover}
                  className="group"
                >
                  <Link href="/solutions" className="block bg-white border border-slate-200 hover:border-[#f6821f]/30 rounded-xl p-6 transition-all h-full">
                    <div className="w-10 h-10 rounded-lg bg-[#f6821f]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#f6821f]" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-slate-900 mb-2 group-hover:text-[#f6821f] transition-colors">{ind.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{ind.desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-[13px] text-[#f6821f] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* By Use Case */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeading
          title="By use case"
          description="Solve specific problems with the right combination of Cloudflare products."
          className="mb-10"
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {BY_USECASE.map((uc) => {
            const Icon = uc.icon;
            return (
              <motion.div key={uc.title} whileHover={subtleLiftHover} className="bg-white border border-slate-200 rounded-xl p-8 hover:border-[#f6821f]/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#f6821f]/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#f6821f]" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{uc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{uc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.products.map((p) => (
                    <Link key={p} href="/products" className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors">
                      {p}
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Not sure where to start?</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            Our solutions engineers will help you design the right architecture for your organization.
          </p>
          <Link href={CONTACT_SALES_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded text-base font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors">
            Talk to an expert <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
