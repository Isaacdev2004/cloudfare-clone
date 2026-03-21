import React from 'react';
import { motion } from 'framer-motion';
import { NetworkGlobe } from '@/components/NetworkGlobe';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Marquee } from '@/components/Marquee';
import { Link } from 'wouter';
import {
  ShieldCheck, Network, LockKeyhole, Code2, BrainCircuit, Zap,
  CheckCircle2, ArrowRight, Globe, Users, ChevronRight, Play
} from 'lucide-react';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';
const CASE_STUDIES_URL = '/why-cloudflare';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const LOGOS = [
  'Shopify', 'Discord', 'L\'Oréal', 'IBM', 'Garmin', 'Canva', 'Notion',
  'Zendesk', 'DoorDash', 'Panasonic', 'Thomson Reuters', 'Cloudinary',
];

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

export default function Home() {
  return (
    <div className="flex flex-col bg-[#0f172a]">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_70%_50%,rgba(180,80,20,0.12),#0f172a_65%)]">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-white">
                Connect, <span className="text-[#f6821f]">protect</span>, and build everywhere
              </h1>
              <p className="text-lg sm:text-xl text-[#a0aaba] mb-8 leading-relaxed">
                Make websites, apps, AI workloads, and networks faster and more secure on one unified global platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={SIGN_UP_URL}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-[15px] font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors"
                >
                  Start for free
                </a>
                <a href="/pricing" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded text-[15px] font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
                  See pricing
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                <div className="flex -space-x-2">
                  {['#3b82f6','#8b5cf6','#ec4899','#f59e0b'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f172a] flex items-center justify-center" style={{ backgroundColor: c + '30' }}>
                      <Users className="w-3.5 h-3.5" style={{ color: c }} />
                    </div>
                  ))}
                </div>
                <p>Trusted by millions of Internet properties</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[500px] lg:h-[620px] flex items-center justify-center"
            >
              <NetworkGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Logos ── */}
      <section className="py-10 border-y border-white/[0.08] bg-[#1d1f20]">
        <p className="text-center text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-8">
          Leading companies rely on Cloudflare
        </p>
        <Marquee>
          {LOGOS.map((logo) => (
            <h3 key={logo} className="text-xl font-black text-white/30 tracking-tight hover:text-white/70 transition-colors cursor-default px-2 whitespace-nowrap">
              {logo}
            </h3>
          ))}
        </Marquee>
      </section>

      {/* ── Product pillars ── */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-2xl mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              One platform to secure and<br />accelerate your business
            </h2>
            <p className="text-[#a0aaba] text-lg">
              Every product runs on the same global network — no integrations, no tradeoffs.
            </p>
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
                  transition={{ delay: i * 0.07 }}
                  className="group bg-[#1d1f20] border border-white/[0.08] rounded-xl p-7 hover:border-white/20 transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: product.color + '18' }}>
                      <Icon className="w-4 h-4" style={{ color: product.color }} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white group-hover:text-[#f6821f] transition-colors">{product.title}</h3>
                  </div>
                  <p className="text-[13px] text-[#6b7280] leading-relaxed mb-5">{product.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.items.map((item) => (
                      <span key={item} className="text-[11px] px-2 py-0.5 rounded bg-white/[0.05] text-[#6b7280]">{item}</span>
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
      <section className="border-y border-white/[0.08] bg-[#1d1f20]">
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
                <div className="text-4xl md:text-5xl font-black text-white mb-1">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="text-[#f6821f] text-sm font-semibold mt-1">{stat.label}</p>
                <p className="text-[#6b7280] text-xs mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security section ── */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Security</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The world's most connected<br />security platform
              </h2>
              <p className="text-[#a0aaba] text-lg mb-8 leading-relaxed">
                Cloudflare blocks an average of 209 billion cyber threats per day. Our network intelligence improves protection for every customer — automatically.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Stopped the largest DDoS attack ever recorded — 5.6 Tbps',
                  'Machine learning models trained on 20% of all web traffic',
                  'WAF blocks threats with <1ms added latency',
                  'Zero Trust replaces legacy VPNs across your workforce',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#f6821f] shrink-0 mt-0.5" />
                    <span className="text-[#a0aaba] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <a href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
                  Explore security
                </a>
                <Link href="/why-cloudflare">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors cursor-pointer">
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
              <div className="bg-[#1d1f20] border border-white/[0.08] rounded-2xl p-8">
                <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-widest mb-6">Threats blocked — last 24 hours</p>
                <div className="space-y-4">
                  {[
                    { label: 'DDoS mitigated', value: '12.4B', bar: 88, color: '#f6821f' },
                    { label: 'WAF rules triggered', value: '3.7B', bar: 62, color: '#60a5fa' },
                    { label: 'Bot requests filtered', value: '28.9B', bar: 97, color: '#a78bfa' },
                    { label: 'Malicious IPs blocked', value: '892M', bar: 44, color: '#34d399' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] text-[#a0aaba]">{item.label}</span>
                        <span className="text-[13px] font-semibold text-white">{item.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
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
                <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
                  <p className="text-3xl font-black text-white">209 billion</p>
                  <p className="text-sm text-[#6b7280] mt-1">cyber threats blocked per day on average</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Developer platform section ── */}
      <section className="py-24 border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Code block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-xl overflow-hidden border border-white/[0.1] bg-[#161b22]"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-[#21262d] border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[11px] text-[#6b7280] font-mono">worker.ts</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
                <p><span className="text-[#c084fc]">export default</span> {'{'}</p>
                <p className="pl-5"><span className="text-[#60a5fa]">async</span> <span className="text-[#fbbf24]">fetch</span>{'(req: Request, env: Env) {'}</p>
                <p className="pl-10 text-[#6b7280]">{'// Runs in 320+ cities globally'}</p>
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
              variants={fadeIn}
              className="order-1 lg:order-2"
            >
              <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Developer Platform</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Build globally.<br />Deploy in seconds.
              </h2>
              <p className="text-[#a0aaba] text-lg mb-8 leading-relaxed">
                Workers runs at the edge in 320+ locations with zero cold starts. R2 stores data with no egress fees. D1 runs SQLite globally. Build full-stack apps without managing infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  { metric: '0ms', label: 'Cold starts' },
                  { metric: '$0', label: 'Egress fees (R2)' },
                  { metric: '320+', label: 'Edge locations' },
                  { metric: 'Free', label: 'To start building' },
                ].map((m) => (
                  <div key={m.label} className="bg-[#0f172a] rounded-xl p-5 border border-white/[0.06]">
                    <p className="text-2xl font-black text-white">{m.metric}</p>
                    <p className="text-sm text-[#6b7280] mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/developers">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors cursor-pointer">
                  Explore Developer Platform <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Case studies / customer section ── */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-white mb-3">Trusted by the world's<br />most innovative companies</h2>
            <p className="text-[#6b7280]">See how organizations of all sizes use Cloudflare to build and protect their businesses.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div
                key={cs.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#1d1f20] border border-white/[0.08] rounded-xl p-7 hover:border-[#f6821f]/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-3">{cs.company}</h3>
                <p className="text-[13px] text-[#6b7280] leading-relaxed mb-5">{cs.desc}</p>
                <a href={CASE_STUDIES_URL} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#f6821f] group-hover:gap-2.5 transition-all">
                  Read case study <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a href={CASE_STUDIES_URL} className="inline-flex items-center gap-2 text-sm text-[#a0aaba] hover:text-white transition-colors">
              Browse all case studies <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Zero Trust promo band ── */}
      <section className="border-y border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#f6821f]/10 flex items-center justify-center shrink-0">
                <LockKeyhole className="w-6 h-6 text-[#f6821f]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Cloudflare One — Zero Trust for free</h3>
                <p className="text-[#6b7280] text-sm mt-1">Up to 50 users free. Replace your VPN in minutes — no hardware, no appliances.</p>
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link href="/zero-trust">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white cursor-pointer" style={{ backgroundColor: '#f6821f' }}>
                  Start for free <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <a href="/zero-trust" className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-32 overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-[#f6821f]/8 to-transparent pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#f6821f]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Start building<br />a better Internet
            </h2>
            <p className="text-[#a0aaba] text-xl mb-10">
              Sign up in minutes. Free plan available. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
                Sign up for free <ArrowRight className="w-4 h-4" />
              </a>
              <a href={CONTACT_SALES_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
                Contact sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
