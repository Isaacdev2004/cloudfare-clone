import React from 'react';
import { motion } from 'framer-motion';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { HeroFrameworkOrbitVisual } from '@/components/hero/HeroFrameworkOrbitVisual';
import { HeroGaugeVisual } from '@/components/hero/HeroGaugeVisual';
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
    color: '#1E3A8A',
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
    title: 'AI / Lens',
    color: '#1E90FF',
    desc: 'Run inference on serverless GPUs, observe and cache AI requests, build RAG pipelines at the edge.',
    link: '/products',
    items: ['Workers AI', 'AI Gateway', 'Vectorize', 'AutoRAG'],
  },
  {
    icon: Zap,
    title: 'Apexlyn One',
    color: '#1E3A8A',
    desc: 'The industry\'s most complete SASE platform — Zero Trust + network services from a single control plane.',
    link: '/cloudflare-one',
    items: ['SASE', 'Zero Trust Network Access', 'SWG', 'DEM'],
  },
];

const CASE_STUDIES = [
  { company: 'Shopify', desc: 'Protected millions of eCommerce stores during peak sales periods with Apexlyn\'s DDoS mitigation.' },
  { company: 'Discord', desc: 'Handles billions of messages daily — Apexlyn Workers power real-time features at global scale.' },
  { company: 'DoorDash', desc: 'Reduced latency by 60% and improved API security across all delivery markets worldwide.' },
];

const CONNECTIVITY_ROWS = [
  {
    title: 'Connect your workforce, AI agents, apps, and infrastructure',
    body: 'Apexlyn One is agile SASE. Take the fast path to safe AI adoption and zero trust access with our composable, programmable platform.',
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
    related: [{ label: 'Apexlyn named a Leader in WAF', href: '/resources/case-studies' }],
    visual: 'gauge',
  },
];

const connectivityLinkClass =
  'font-sans text-[15px] font-medium text-[#1E3A8A] underline underline-offset-[5px] decoration-slate-300 hover:text-[#172554] hover:decoration-[#1E3A8A] antialiased transition-colors';

export default function Home() {
  return (
    <div className="flex flex-col apex-page-bg">
      {/* ── Hero — white section so orbit/cloud reads clearly ── */}
      <PageHero
        variant="light"
        title={<>Connect, <span className="text-[#1E90FF]">protect</span>, and build everywhere</>}
        description="Make websites, apps, AI workloads, and networks faster and more secure on one unified global platform."
        actions={[
          { label: "Start for free", href: SIGN_UP_URL, variant: "primary" },
          { label: "See pricing", href: "/pricing", variant: "outline" },
        ]}
        className="min-h-[100dvh] lg:min-h-screen flex items-center bg-white"
        contentClassName="relative z-10 w-full"
        aside={(
          <div className="relative min-w-0 w-full overflow-visible h-[min(54vh,460px)] sm:h-[500px] lg:h-[640px] flex items-center justify-center px-1 sm:px-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center overflow-visible"
            >
              <HeroFrameworkOrbitVisual />
            </motion.div>
          </div>
        )}
      />

      <div className="max-w-[1280px] mx-auto px-6 -mt-6 sm:-mt-10 lg:-mt-12 mb-10 lg:mb-12 relative z-20">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
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
          Leading companies rely on Apexlyn
        </p>
        <Marquee>
          {brandLogos.map((logo) => (
            <div key={logo.name} className="h-11 w-[180px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <img src={logo.src} alt={logo.name} className="max-h-11 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── Connectivity rows (Cloudflare-style: mobile subnav strip → card → copy) ── */}
      <section className="py-16 md:py-24 bg-[#F7F9FC] bg-[linear-gradient(to_right,rgba(11,19,32,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,19,32,0.06)_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-16 md:space-y-24">
          {CONNECTIVITY_ROWS.map((row, idx) => (
            <div
              key={row.title}
              className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 gap-0 items-center"
            >
              {/* Mobile / tablet: thin link bar (matches Cloudflare homepage) */}
              <div className="lg:hidden -mx-6 px-6 bg-white border-y border-slate-200 py-3.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 mb-6 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
                {row.related.map((item) => (
                  <Link key={item.label} href={item.href} className={connectivityLinkClass}>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Visual: above copy on small screens; explicit column on lg */}
              <motion.div
                className={idx % 2 === 0 ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1 lg:row-start-1'}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 h-[300px] sm:h-[340px] md:h-[380px] flex items-center justify-center overflow-hidden shadow-[0_12px_40px_-24px_rgba(15,23,42,0.25)]">
                  {row.visual === 'globe' ? (
                    <div className="relative flex w-full h-full min-h-[260px] items-center justify-center">
                      <HeroCloudNetworkVisual compact />
                    </div>
                  ) : (
                    <div className="relative flex w-full h-full min-h-[240px] items-center justify-center">
                      <HeroGaugeVisual compact />
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className={idx % 2 === 0 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 mb-4 sm:mb-5 leading-[1.08] tracking-[-0.02em] font-sans">
                  {row.title}
                </h2>
                <p className="text-slate-600 text-[17px] sm:text-[18px] leading-relaxed mb-6 sm:mb-7 font-sans">
                  {row.body}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <Link
                    href={row.primary.href}
                    className="font-sans inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
                  >
                    {row.primary.label}
                  </Link>
                  <Link
                    href={row.secondary.href}
                    className="font-sans inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    {row.secondary.label} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Desktop: related links under copy (Cloudflare pattern) */}
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-slate-900 mb-3 font-sans">Related</p>
                  <div className="flex flex-wrap gap-6">
                    {row.related.map((item) => (
                      <Link key={item.label} href={item.href} className={connectivityLinkClass}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product pillars ── */}
      <section className="py-24 bg-[#F7F9FC]">
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
              titleClassName="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] leading-[1.08] tracking-[-0.02em]"
              descriptionClassName="text-slate-600 text-base sm:text-lg"
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
                    <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-[#1E3A8A] transition-colors">{product.title}</h3>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-5">{product.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.items.map((item) => (
                      <span key={item} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">{item}</span>
                    ))}
                  </div>
                  <Link href={product.link}>
                    <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1E3A8A] group-hover:gap-2 transition-all">
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
                <p className="text-[#1E3A8A] text-sm font-semibold mt-1">{stat.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security section ── */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="text-[#1E3A8A] text-sm font-semibold uppercase tracking-widest mb-4">Security</p>
              <SectionHeading
                title={<>The world's most connected<br />security platform</>}
                description="Apexlyn blocks an average of 209 billion cyber threats per day. Our network intelligence improves protection for every customer — automatically."
                className="mb-8"
                titleClassName="text-4xl md:text-5xl leading-tight"
                descriptionClassName="text-slate-600 text-lg leading-relaxed"
              />
              <ul className="space-y-3 mb-10">
                {[
                  'Stopped the largest DDoS attack ever recorded — 5.6 Tbps',
                  'Machine learning models trained on 20% of all web traffic',
                  'WAF blocks threats with <1ms added latency',
                  'Zero Trust replaces legacy VPNs across your workforce',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors">
                  Explore security
                </Link>
                <Link href="/why-cloudflare">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer">
                    Learn why Apexlyn
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
                    { label: 'DDoS mitigated', value: '12.4B', bar: 88, color: '#1E3A8A' },
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
              className="order-2 lg:order-1 rounded-xl overflow-hidden border border-slate-200 bg-[#F7F9FC]"
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
              <p className="text-[#1E3A8A] text-sm font-semibold uppercase tracking-widest mb-4">Developer Platform</p>
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
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Trusted by the world's<br />most innovative companies</h2>
            <p className="text-slate-500">See how organizations of all sizes use Apexlyn to build and protect their businesses.</p>
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
                className="group bg-white border border-slate-200 rounded-xl p-7 hover:border-[#1E3A8A]/40 transition-colors"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{cs.company}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-5">{cs.desc}</p>
                <Link href={CASE_STUDIES_URL} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1E3A8A] group-hover:gap-2.5 transition-all">
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
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center shrink-0">
                <LockKeyhole className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Apexlyn One — Zero Trust for free</h3>
                <p className="text-slate-500 text-sm mt-1">Up to 50 users free. Replace your VPN in minutes — no hardware, no appliances.</p>
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/zero-trust">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white cursor-pointer" style={{ backgroundColor: '#1E3A8A' }}>
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
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-[#1E3A8A]/10 to-transparent pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#1E3A8A]/12 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Start building<br />a better Internet
            </h2>
            <p className="text-slate-600 text-xl mb-10">
              Sign up in minutes. Free plan available. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors">
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
