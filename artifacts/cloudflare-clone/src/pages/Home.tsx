import React from 'react';
import { motion } from 'framer-motion';
import { NetworkGlobe } from '@/components/NetworkGlobe';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Marquee } from '@/components/Marquee';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Link } from 'wouter';
import { brandLogos } from '@/lib/assets';
import { fadeInUp, subtleLiftHover } from '@/lib/motion';
import {
  ShieldCheck, Network, LockKeyhole, Code2, BrainCircuit, Zap,
  CheckCircle2, ArrowRight, Globe, Users, ChevronRight
} from 'lucide-react';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';
const CASE_STUDIES_URL = '/why-cloudflare';

const PRODUCTS = [
  {
    icon: ShieldCheck,
    title: 'Application Services',
    color: '#f6821f',
    desc: 'Speed up and protect websites, APIs, and SaaS apps with CDN, WAF, DDoS, and SSL — all from one platform.',
    link: '/products',
    items: ['CDN', 'Web Application Firewall', 'DDoS Protection', 'Bot Management'],
  },
  {
    icon: Network,
    title: 'Network Services',
    color: '#60a5fa',
    desc: 'Connect offices, data centers, and clouds with a secure, high-performance software-defined network.',
    link: '/products',
    items: ['Magic Transit', 'Magic WAN', 'Network Interconnect', 'Spectrum'],
  },
  {
    icon: LockKeyhole,
    title: 'Zero Trust',
    color: '#a78bfa',
    desc: 'Replace your VPN and secure every user, device, and app with identity-aware, context-based policies.',
    link: '/zero-trust',
    items: ['Access', 'Gateway', 'Browser Isolation', 'CASB'],
  },
  {
    icon: Code2,
    title: 'Developer Platform',
    color: '#34d399',
    desc: 'Deploy serverless code with zero cold starts, store data without egress fees, build at global scale.',
    link: '/developers',
    items: ['Workers', 'Pages', 'R2 Storage', 'D1 Database'],
  },
  {
    icon: BrainCircuit,
    title: 'AI',
    color: '#f472b6',
    desc: 'Run inference on serverless GPUs, observe and cache AI requests, build RAG pipelines at the edge.',
    link: '/products',
    items: ['Workers AI', 'AI Gateway', 'Vectorize', 'AutoRAG'],
  },
  {
    icon: Zap,
    title: 'Cloudflare One',
    color: '#fb923c',
    desc: 'The industry\'s most complete SASE platform — Zero Trust + network services from a single control plane.',
    link: '/cloudflare-one',
    items: ['SASE', 'Zero Trust Network Access', 'SWG', 'DEM'],
  },
];

const CASE_STUDIES = [
  { company: 'Shopify', desc: 'Protected millions of eCommerce stores during peak sales periods with Cloudflare\'s DDoS mitigation.' },
  { company: 'Discord', desc: 'Handles billions of messages daily — Cloudflare Workers power real-time features at global scale.' },
  { company: 'DoorDash', desc: 'Reduced latency by 60% and improved API security across all delivery markets worldwide.' },
];

const CONNECTIVITY_ROWS = [
  {
    title: 'Connect your workforce, AI agents, apps, and infrastructure',
    body: 'Cloudflare One is agile SASE. Take the fast path to safe AI adoption and zero trust access with our composable, programmable platform.',
    primary: { label: 'Contact sales', href: '/enterprise' },
    secondary: { label: 'Learn more', href: '/zero-trust' },
    related: [
      { label: 'SASE demo hub', href: '/resources/webinars' },
      { label: '10-step SASE journey', href: '/resources/documentation' },
    ],
    visual: 'globe',
  },
  {
    title: 'Protect and accelerate websites and AI-enabled apps',
    body: 'Use our industry-leading WAF, DDoS, and bot protection to secure websites, APIs, and AI workloads while accelerating performance with our global CDN.',
    primary: { label: 'Start for free', href: SIGN_UP_URL },
    secondary: { label: 'Compare plans', href: '/pricing' },
    related: [{ label: 'Cloudflare named a Leader in WAF', href: '/resources/case-studies' }],
    visual: 'gauge',
  },
];

const SpeedGauge = () => (
  <svg viewBox="0 0 420 250" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f6821f" />
        <stop offset="100%" stopColor="#f9a54c" />
      </linearGradient>
    </defs>
    {/* Outer gray ring */}
    <path d="M30 200 A180 180 0 0 1 390 200" fill="none" stroke="rgba(15,23,42,0.10)" strokeWidth="20" />
    {/* Orange ring, perfectly concentric and slightly inset */}
    <path d="M48 200 A162 162 0 0 1 342 106" fill="none" stroke="url(#arcGlow)" strokeWidth="22" strokeLinecap="round" />
    {/* Inner dashed helper arc */}
    <path d="M70 200 A140 140 0 0 1 350 200" fill="none" stroke="rgba(15,23,42,0.14)" strokeWidth="2.5" strokeDasharray="6 8">
      <animate attributeName="stroke-dashoffset" values="0;24" dur="2.2s" repeatCount="indefinite" />
    </path>
    {/* Center hub */}
    <circle cx="210" cy="200" r="18" fill="#ffffff" stroke="#f6821f" strokeWidth="5" />
    <circle cx="210" cy="200" r="5" fill="#f6821f" />
    <g>
      <line x1="210" y1="200" x2="330" y2="124" stroke="#f6821f" strokeWidth="9" strokeLinecap="round">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="-10 210 200; 11 210 200; -6 210 200; -10 210 200"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </line>
      <circle cx="330" cy="124" r="7.5" fill="#f6821f">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="-10 210 200; 11 210 200; -6 210 200; -10 210 200"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col cf-page-bg">
      {/* ── Hero ── */}
      <PageHero
        title={<>Connect, <span className="text-[#f6821f]">protect</span>, and build everywhere</>}
        description="Make websites, apps, AI workloads, and networks faster and more secure on one unified global platform."
        actions={[
          { label: "Start for free", href: SIGN_UP_URL, variant: "primary" },
          { label: "See pricing", href: "/pricing", variant: "outline" },
        ]}
        className="min-h-screen flex items-center"
        contentClassName="relative z-10 w-full"
        aside={(
          <div className="relative h-[500px] lg:h-[620px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <NetworkGlobe />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-12 right-6 bg-[#1d1f20]/90 border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-[#a0aaba] backdrop-blur-sm"
            >
              <span className="text-[#f6821f] font-semibold">330+</span> cities online
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute bottom-20 left-4 bg-[#1d1f20]/90 border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-[#a0aaba] backdrop-blur-sm"
            >
              <span className="text-[#f6821f] font-semibold">215B</span> threats blocked/day
            </motion.div>
          </div>
        )}
      />

      <div className="max-w-[1280px] mx-auto px-6 -mt-12 mb-12 relative z-20">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="flex -space-x-2">
            {['#3b82f6','#8b5cf6','#ec4899','#f59e0b'].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: c + '25' }}>
                <Users className="w-3.5 h-3.5" style={{ color: c }} />
              </div>
            ))}
          </div>
          <p>Trusted by millions of Internet properties</p>
        </div>
      </div>

      {/* ── Logos ── */}
      <section className="py-10 border-y border-slate-200 bg-white">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Leading companies rely on Cloudflare
        </p>
        <Marquee>
          {brandLogos.map((logo) => (
            <div key={logo.name} className="h-11 w-[180px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <img src={logo.src} alt={logo.name} className="max-h-11 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── Connectivity rows (Cloudflare-style homepage block) ── */}
      <section className="py-24 bg-[#f8fafc] bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:28px_28px]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-20">
          {CONNECTIVITY_ROWS.map((row, idx) => (
            <div key={row.title} className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className={idx % 2 === 1 ? 'lg:order-2' : ''}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <h2 className="text-[44px] md:text-[52px] font-bold text-slate-900 mb-5 leading-[1.05] tracking-[-0.02em]">{row.title}</h2>
                <p className="text-slate-600 text-[18px] leading-relaxed mb-7">{row.body}</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link href={row.primary.href} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors">
                    {row.primary.label}
                  </Link>
                  <Link href={row.secondary.href} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors">
                    {row.secondary.label} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-3">Related</p>
                  <div className="flex flex-wrap gap-6">
                    {row.related.map((item) => (
                      <Link key={item.label} href={item.href} className="text-sm underline text-slate-600 hover:text-slate-900 transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                className={idx % 2 === 1 ? 'lg:order-1' : ''}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <div className="relative border border-slate-200 rounded-2xl p-6 h-[320px] md:h-[360px] flex items-center justify-center overflow-hidden bg-white">
                  {row.visual === 'globe' ? (
                    <div className="relative w-full h-full">
                      <NetworkGlobe compact />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <SpeedGauge />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product pillars ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mb-14"
          >
            <SectionHeading
              title={<>One platform to secure and<br />accelerate your business</>}
              description="Every product runs on the same global network — no integrations, no tradeoffs."
              className="mb-0"
              descriptionClassName="text-slate-600 text-lg"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((product, i) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={subtleLiftHover}
                  className="group bg-white border border-slate-200 rounded-xl p-7 hover:border-slate-300 transition-all duration-200 hover:shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: product.color + '18' }}>
                      <Icon className="w-4 h-4" style={{ color: product.color }} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-[#f6821f] transition-colors">{product.title}</h3>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-5">{product.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.items.map((item) => (
                      <span key={item} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">{item}</span>
                    ))}
                  </div>
                  <Link href={product.link}>
                    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#f6821f] group-hover:gap-2 transition-all">
                      Learn more <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { end: 13000, suffix: '+', label: 'Networks connected', sub: 'More than any CDN' },
              { end: 320, suffix: '+', label: 'Cities worldwide', sub: '120+ countries' },
              { end: 50, suffix: 'ms', label: 'To 95% of Internet users', sub: 'Average latency' },
              { end: 248, suffix: ' Tbps', label: 'Network capacity', sub: "World's largest" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl md:text-5xl font-black text-slate-900 mb-1">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="text-[#f6821f] text-sm font-semibold mt-1">{stat.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security section ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Security</p>
              <SectionHeading
                title={<>The world's most connected<br />security platform</>}
                description="Cloudflare blocks an average of 209 billion cyber threats per day. Our network intelligence improves protection for every customer — automatically."
                className="mb-8"
                titleClassName="text-4xl md:text-5xl leading-tight"
                descriptionClassName="text-[#a0aaba] text-lg leading-relaxed"
              />
              <ul className="space-y-3 mb-10">
                {[
                  'Stopped the largest DDoS attack ever recorded — 5.6 Tbps',
                  'Machine learning models trained on 20% of all web traffic',
                  'WAF blocks threats with <1ms added latency',
                  'Zero Trust replaces legacy VPNs across your workforce',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#f6821f] shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors">
                  Explore security
                </Link>
                <Link href="/why-cloudflare">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer">
                    Learn why Cloudflare
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Security stats visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-8">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-6">Threats blocked — last 24 hours</p>
                <div className="space-y-4">
                  {[
                    { label: 'DDoS mitigated', value: '12.4B', bar: 88, color: '#f6821f' },
                    { label: 'WAF rules triggered', value: '3.7B', bar: 62, color: '#60a5fa' },
                    { label: 'Bot requests filtered', value: '28.9B', bar: 97, color: '#a78bfa' },
                    { label: 'Malicious IPs blocked', value: '892M', bar: 44, color: '#34d399' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] text-slate-600">{item.label}</span>
                        <span className="text-[13px] font-semibold text-slate-900">{item.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.bar}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                  <p className="text-3xl font-black text-slate-900">209 billion</p>
                  <p className="text-sm text-slate-500 mt-1">cyber threats blocked per day on average</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Developer platform section ── */}
      <section className="py-24 border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Code block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-xl overflow-hidden border border-slate-200 bg-[#f8fafc]"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[11px] text-slate-500 font-mono">worker.ts</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
                <p><span className="text-[#c084fc]">export default</span> {'{'}</p>
                <p className="pl-5"><span className="text-[#60a5fa]">async</span> <span className="text-[#fbbf24]">fetch</span>{'(req: Request, env: Env) {'}</p>
                <p className="pl-10 text-slate-500">{'// Runs in 320+ cities globally'}</p>
                <p className="pl-10"><span className="text-[#c084fc]">const</span> {'{ country } = req.cf ?? {};'}</p>
                <p className="pl-10 mt-2"><span className="text-[#c084fc]">const</span> {'data = '}<span className="text-[#c084fc]">await</span> {' env.DB'}</p>
                <p className="pl-14">{'.'}<span className="text-[#4ade80]">prepare</span>{'('}<span className="text-[#fbbf24]">"SELECT * FROM products"</span>{')'}</p>
                <p className="pl-14">{'.'}<span className="text-[#4ade80]">all</span>{'();'}</p>
                <p className="pl-10 mt-2"><span className="text-[#c084fc]">return</span> {'Response.'}<span className="text-[#4ade80]">json</span>{'({ data, country });'}</p>
                <p className="pl-5">{'}'}</p>
                <p>{'};'}</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 lg:order-2"
            >
              <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Developer Platform</p>
              <SectionHeading
                title={<>Build globally.<br />Deploy in seconds.</>}
                description="Workers runs at the edge in 320+ locations with zero cold starts. R2 stores data with no egress fees. D1 runs SQLite globally. Build full-stack apps without managing infrastructure."
                className="mb-8"
                titleClassName="text-4xl md:text-5xl leading-tight"
                descriptionClassName="text-slate-600 text-lg leading-relaxed"
              />
              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  { metric: '0ms', label: 'Cold starts' },
                  { metric: '$0', label: 'Egress fees (R2)' },
                  { metric: '320+', label: 'Edge locations' },
                  { metric: 'Free', label: 'To start building' },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="text-2xl font-black text-slate-900">{m.metric}</p>
                    <p className="text-sm text-slate-500 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/developers">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer">
                  Explore Developer Platform <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Case studies / customer section ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Trusted by the world's<br />most innovative companies</h2>
            <p className="text-slate-500">See how organizations of all sizes use Cloudflare to build and protect their businesses.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div
                key={cs.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={subtleLiftHover}
                className="group bg-white border border-slate-200 rounded-xl p-7 hover:border-[#f6821f]/40 transition-colors"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{cs.company}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-5">{cs.desc}</p>
                <Link href={CASE_STUDIES_URL} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#f6821f] group-hover:gap-2.5 transition-all">
                  Read case study <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href={CASE_STUDIES_URL} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Browse all case studies <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Zero Trust promo band ── */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#f6821f]/10 flex items-center justify-center shrink-0">
                <LockKeyhole className="w-6 h-6 text-[#f6821f]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Cloudflare One — Zero Trust for free</h3>
                <p className="text-slate-500 text-sm mt-1">Up to 50 users free. Replace your VPN in minutes — no hardware, no appliances.</p>
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/zero-trust">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white cursor-pointer" style={{ backgroundColor: '#f6821f' }}>
                  Start for free <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/zero-trust" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-[#f6821f]/10 to-transparent pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#f6821f]/12 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Start building<br />a better Internet
            </h2>
            <p className="text-slate-600 text-xl mb-10">
              Sign up in minutes. Free plan available. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors">
                Sign up for free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={CONTACT_SALES_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors">
                Contact sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
