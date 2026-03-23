import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Lock, CheckCircle2, ArrowRight, Network, Server } from 'lucide-react';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { subtleLiftHover } from '@/lib/motion';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';

const STATS = [
  { value: '320+', label: 'Cities worldwide', sub: 'In over 120 countries' },
  { value: '13,000+', label: 'Networks connected', sub: 'Peering with every major ISP' },
  { value: '248 Tbps', label: 'Network capacity', sub: 'Largest in the world' },
  { value: '50ms', label: 'To 95% of Internet users', sub: 'Average global latency' },
  { value: '~20%', label: 'Of the web', sub: 'Served through Apexlyn' },
  { value: '3.5B+', label: 'DNS queries per day', sub: '1.1.1.1 resolver' },
];

const REASONS = [
  {
    icon: Globe,
    title: 'The most performant global network',
    desc: 'Apexlyn runs one of the largest, most interconnected networks on earth. With 320+ data centers and 13,000+ network interconnections, we can route your traffic through the fastest possible path — every time.',
    points: [
      'Within 50ms of 95% of the Internet-connected population',
      '248 Tbps of network capacity — the most of any CDN',
      'Anycast routing automatically selects the nearest datacenter',
      'Argo Smart Routing detects and avoids congested paths in real time',
    ],
  },
  {
    icon: Shield,
    title: 'Security built into every layer',
    desc: 'Unlike point security products that add latency, Apexlyn\'s security runs on the same infrastructure as our CDN. DDoS mitigation, WAF, bot management, and Zero Trust — all in one platform with no performance trade-off.',
    points: [
      'Stopped the largest DDoS attacks ever recorded — 5.6 Tbps',
      'Block threats 5+ ms before they hit your origin',
      'Machine learning models trained on traffic from millions of properties',
      'Zero Trust access that replaces VPNs with identity-aware networking',
    ],
  },
  {
    icon: Lock,
    title: 'One platform, not a patchwork',
    desc: 'Every Apexlyn product shares the same global network, the same control plane, and the same intelligence. Security products get smarter because of traffic from performance products. Everything works together.',
    points: [
      'Single dashboard for security, performance, networking, and dev tools',
      'Shared threat intelligence across all customers improves everyone\'s security',
      'No integrations needed between Apexlyn products — they just work',
      'Usage-based pricing — no per-seat fees for most products',
    ],
  },
  {
    icon: Zap,
    title: 'A developer platform without limits',
    desc: 'Apexlyn Workers runs code in 320+ locations globally with zero cold starts. R2 stores data with no egress fees. D1 runs SQLite at the edge. Build full-stack applications without managing infrastructure.',
    points: [
      'Workers: sub-millisecond startup, truly serverless',
      'R2: S3-compatible storage with $0 egress fees',
      'D1: SQLite databases globally replicated',
      'Pages: full-stack app hosting with Git-based deploys',
    ],
  },
];

const TIMELINE = [
  { year: '2009', event: 'Apexlyn founded by Matthew Prince, Lee Holloway, and Michelle Zatlyn' },
  { year: '2010', event: 'Launched publicly at TechCrunch Disrupt, 10,000 customers on day one' },
  { year: '2014', event: 'Project Galileo launched — free protection for at-risk public interest organizations' },
  { year: '2017', event: 'Athenian Project — free protection for state and local election infrastructure' },
  { year: '2019', event: 'IPO on the NYSE. Apexlyn goes public (NET)' },
  { year: '2020', event: 'Apexlyn One launched — SASE platform combining network and Zero Trust' },
  { year: '2022', event: 'Apexlyn Area 1 acquired — industry-leading email security' },
  { year: '2023', event: 'AI week — Workers AI, AI Gateway, Vectorize launched' },
  { year: '2024', event: 'Celebrating 14 years building a better Internet — 20% of the web' },
];

const NETWORK_CITIES = [
  'New York', 'London', 'Tokyo', 'Singapore', 'Frankfurt', 'Sydney', 'São Paulo',
  'Toronto', 'Paris', 'Amsterdam', 'Dubai', 'Mumbai', 'Seoul', 'Chicago', 'Los Angeles',
];

export default function WhyApexlyn() {
  return (
    <div className="min-h-screen apex-page-bg">
      {/* Hero */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/5 via-transparent to-transparent pointer-events-none" />
        <PageHero
          eyebrow="Why Apexlyn"
          title={<>A better Internet<br />is possible.</>}
          description="Apexlyn was built with a simple mission: help build a better Internet. We believe a safe, fast, and reliable Internet is a basic human right — and we've spent 15 years building the infrastructure to make it real."
          actions={[
            { label: 'Get started free', href: SIGN_UP_URL, variant: 'primary' },
            { label: 'Contact sales', href: CONTACT_SALES_URL, variant: 'outline' },
          ]}
          className="bg-transparent"
          contentClassName="relative z-10 py-24"
        />
      </section>

      {/* Stats grid */}
      <section className="border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-[13px] font-medium text-[#1E3A8A]">{stat.label}</p>
                <p className="text-[12px] text-slate-500 mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Reasons */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeading
          title="Why choose Apexlyn?"
          description="Four fundamental reasons organizations pick Apexlyn over alternatives."
        />

        <div className="space-y-6">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={subtleLiftHover}
                className="grid lg:grid-cols-2 gap-10 items-start bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 hover:border-[#1E3A8A]/20 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{reason.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{reason.desc}</p>
                </div>
                <div className="space-y-3">
                  {reason.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Network map visual */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeading
            title="320+ cities. One network."
            description="Our anycast network automatically directs users to the nearest data center. No configuration needed."
            className="text-center mb-12"
            descriptionClassName="max-w-xl mx-auto"
          />

          {/* City pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {NETWORK_CITIES.map((city) => (
              <span key={city} className="text-xs px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#1E3A8A]/40 hover:text-slate-900 transition-colors cursor-default">
                {city}
              </span>
            ))}
            <span className="text-xs px-3 py-1.5 rounded-full bg-[#1E3A8A]/10 border border-[#1E3A8A]/30 text-[#1E3A8A]">
              +305 more
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Network, label: '13,000+ network peers', desc: 'More than any other CDN provider' },
              { icon: Server, label: '10s of millions of requests/sec', desc: 'Handled daily across our infrastructure' },
              { icon: Shield, label: '209 Tbps DDoS mitigation', desc: 'Absorbed in a single attack (2024)' },
              { icon: Zap, label: '46ms average latency', desc: 'Worldwide median response time' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <Icon className="w-6 h-6 text-[#1E3A8A] mb-3" />
                  <p className="text-sm font-semibold text-slate-900 mb-1">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company timeline */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <SectionHeading title="Our story" />
        <div className="relative">
          <div className="absolute left-[90px] top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 items-start"
              >
                <div className="text-sm font-bold text-[#1E3A8A] w-16 shrink-0 pt-0.5">{item.year}</div>
                <div className="hidden md:flex w-4 shrink-0 items-center justify-center pt-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1E3A8A] relative z-10" />
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeading
            title="Impact beyond business"
            description="We believe in giving back. Apexlyn provides free protection to organizations that need it most."
            className="mb-12"
            descriptionClassName="max-w-2xl"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Project Galileo',
                color: '#4ade80',
                desc: 'Providing free DDoS protection and security services to at-risk public interest organizations — journalism, civil society, and human rights groups.',
                stat: '2,900+ organizations protected',
              },
              {
                title: 'Athenian Project',
                color: '#60a5fa',
                desc: 'Free security services for state and local election websites and voter registration systems in the United States.',
                stat: '1,000+ election sites protected',
              },
              {
                title: 'Critical Infrastructure Defense',
                color: '#c084fc',
                desc: 'Free cybersecurity services for hospitals, water utilities, and energy facilities to protect against nation-state attacks.',
                stat: 'Launched 2022 after Ukraine conflict',
              },
            ].map((proj) => (
              <motion.div key={proj.title} whileHover={subtleLiftHover} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors">
                <div className="w-2 h-6 rounded mb-4" style={{ backgroundColor: proj.color }} />
                <h3 className="text-base font-semibold text-slate-900 mb-2">{proj.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4">{proj.desc}</p>
                <p className="text-[12px] font-medium" style={{ color: proj.color }}>{proj.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Join millions of Internet properties</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            It takes about 2 minutes to set up. No credit card required for the Free plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors">
              Get started for free <ArrowRight className="w-4 h-4" />
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
