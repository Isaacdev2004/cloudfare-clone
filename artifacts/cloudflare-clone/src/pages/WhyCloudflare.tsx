import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Lock, CheckCircle2, ArrowRight, Network, Server } from 'lucide-react';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';

const STATS = [
  { value: '320+', label: 'Cities worldwide', sub: 'In over 120 countries' },
  { value: '13,000+', label: 'Networks connected', sub: 'Peering with every major ISP' },
  { value: '248 Tbps', label: 'Network capacity', sub: 'Largest in the world' },
  { value: '50ms', label: 'To 95% of Internet users', sub: 'Average global latency' },
  { value: '~20%', label: 'Of the web', sub: 'Served through Cloudflare' },
  { value: '3.5B+', label: 'DNS queries per day', sub: '1.1.1.1 resolver' },
];

const REASONS = [
  {
    icon: Globe,
    title: 'The most performant global network',
    desc: 'Cloudflare runs one of the largest, most interconnected networks on earth. With 320+ data centers and 13,000+ network interconnections, we can route your traffic through the fastest possible path — every time.',
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
    desc: 'Unlike point security products that add latency, Cloudflare\'s security runs on the same infrastructure as our CDN. DDoS mitigation, WAF, bot management, and Zero Trust — all in one platform with no performance trade-off.',
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
    desc: 'Every Cloudflare product shares the same global network, the same control plane, and the same intelligence. Security products get smarter because of traffic from performance products. Everything works together.',
    points: [
      'Single dashboard for security, performance, networking, and dev tools',
      'Shared threat intelligence across all customers improves everyone\'s security',
      'No integrations needed between Cloudflare products — they just work',
      'Usage-based pricing — no per-seat fees for most products',
    ],
  },
  {
    icon: Zap,
    title: 'A developer platform without limits',
    desc: 'Cloudflare Workers runs code in 320+ locations globally with zero cold starts. R2 stores data with no egress fees. D1 runs SQLite at the edge. Build full-stack applications without managing infrastructure.',
    points: [
      'Workers: sub-millisecond startup, truly serverless',
      'R2: S3-compatible storage with $0 egress fees',
      'D1: SQLite databases globally replicated',
      'Pages: full-stack app hosting with Git-based deploys',
    ],
  },
];

const TIMELINE = [
  { year: '2009', event: 'Cloudflare founded by Matthew Prince, Lee Holloway, and Michelle Zatlyn' },
  { year: '2010', event: 'Launched publicly at TechCrunch Disrupt, 10,000 customers on day one' },
  { year: '2014', event: 'Project Galileo launched — free protection for at-risk public interest organizations' },
  { year: '2017', event: 'Athenian Project — free protection for state and local election infrastructure' },
  { year: '2019', event: 'IPO on the NYSE. Cloudflare goes public (NET)' },
  { year: '2020', event: 'Cloudflare One launched — SASE platform combining network and Zero Trust' },
  { year: '2022', event: 'Cloudflare Area 1 acquired — industry-leading email security' },
  { year: '2023', event: 'AI week — Workers AI, AI Gateway, Vectorize launched' },
  { year: '2024', event: 'Celebrating 14 years building a better Internet — 20% of the web' },
];

const NETWORK_CITIES = [
  'New York', 'London', 'Tokyo', 'Singapore', 'Frankfurt', 'Sydney', 'São Paulo',
  'Toronto', 'Paris', 'Amsterdam', 'Dubai', 'Mumbai', 'Seoul', 'Chicago', 'Los Angeles',
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyCloudflare() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero */}
      <section className="relative bg-[#1d1f20] border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6821f]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-6 py-24 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl">
            <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Why Cloudflare</p>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              A better Internet<br />is possible.
            </h1>
            <p className="text-[#a0aaba] text-xl leading-relaxed mb-10">
              Cloudflare was built with a simple mission: help build a better Internet. We believe a safe, fast, and reliable Internet is a basic human right — and we've spent 15 years building the infrastructure to make it real.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={SIGN_UP_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
                Get started free <ArrowRight className="w-4 h-4" />
              </a>
              <a href={CONTACT_SALES_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
                Contact sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="border-b border-white/[0.08]">
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
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-[13px] font-medium text-[#f6821f]">{stat.label}</p>
                <p className="text-[12px] text-[#6b7280] mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Reasons */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Why choose Cloudflare?</h2>
          <p className="text-[#6b7280]">Four fundamental reasons organizations pick Cloudflare over alternatives.</p>
        </div>

        <div className="space-y-6">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid lg:grid-cols-2 gap-10 items-start bg-[#1d1f20] border border-white/[0.08] rounded-2xl p-8 lg:p-10 hover:border-[#f6821f]/20 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#f6821f]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#f6821f]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{reason.title}</h3>
                  </div>
                  <p className="text-[#a0aaba] leading-relaxed">{reason.desc}</p>
                </div>
                <div className="space-y-3">
                  {reason.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#f6821f] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#a0aaba]">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Network map visual */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">320+ cities. One network.</h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              Our anycast network automatically directs users to the nearest data center. No configuration needed.
            </p>
          </div>

          {/* City pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {NETWORK_CITIES.map((city) => (
              <span key={city} className="text-xs px-3 py-1.5 rounded-full bg-[#0f172a] border border-white/[0.08] text-[#a0aaba] hover:border-[#f6821f]/40 hover:text-white transition-colors cursor-default">
                {city}
              </span>
            ))}
            <span className="text-xs px-3 py-1.5 rounded-full bg-[#f6821f]/10 border border-[#f6821f]/30 text-[#f6821f]">
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
                <div key={item.label} className="bg-[#0f172a] border border-white/[0.08] rounded-xl p-6">
                  <Icon className="w-6 h-6 text-[#f6821f] mb-3" />
                  <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                  <p className="text-xs text-[#6b7280]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company timeline */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-12">Our story</h2>
        <div className="relative">
          <div className="absolute left-[90px] top-0 bottom-0 w-px bg-white/[0.08] hidden md:block" />
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-6 items-start"
              >
                <div className="text-sm font-bold text-[#f6821f] w-16 shrink-0 pt-0.5">{item.year}</div>
                <div className="hidden md:flex w-4 shrink-0 items-center justify-center pt-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#f6821f] relative z-10" />
                </div>
                <p className="text-[#a0aaba] text-sm leading-relaxed">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact section */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-4">Impact beyond business</h2>
          <p className="text-[#6b7280] max-w-2xl mb-12">
            We believe in giving back. Cloudflare provides free protection to organizations that need it most.
          </p>
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
              <div key={proj.title} className="bg-[#0f172a] border border-white/[0.08] rounded-xl p-6 hover:border-white/20 transition-colors">
                <div className="w-2 h-6 rounded mb-4" style={{ backgroundColor: proj.color }} />
                <h3 className="text-base font-semibold text-white mb-2">{proj.title}</h3>
                <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4">{proj.desc}</p>
                <p className="text-[12px] font-medium" style={{ color: proj.color }}>{proj.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0f172a] border-t border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join millions of Internet properties</h2>
          <p className="text-[#a0aaba] text-lg mb-8 max-w-xl mx-auto">
            It takes about 2 minutes to set up. No credit card required for the Free plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
              Get started for free <ArrowRight className="w-4 h-4" />
            </a>
            <a href={CONTACT_SALES_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
              Contact sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
