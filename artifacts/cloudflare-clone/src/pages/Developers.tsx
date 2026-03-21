import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, HardDrive, Zap, Globe, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const SIGN_UP_URL = '/pricing';
const DOCS_URL = '/developers';

const DEV_LINKS: Record<string, string> = {
  Workers: '/developers',
  Pages: '/developers',
  'R2 Storage': '/developers',
  'D1 Database': '/developers',
  KV: '/developers',
  'Durable Objects': '/developers',
  Queues: '/developers',
  Stream: '/developers',
  Images: '/developers',
  Hyperdrive: '/developers',
  Vectorize: '/developers',
  Calls: '/developers',
  'Workers AI': '/products',
  'AI Gateway': '/products',
  AutoRAG: '/products',
  'Pages Functions': '/developers',
};

const PRODUCTS = [
  {
    icon: Code2,
    name: 'Workers',
    tag: 'Serverless compute',
    desc: 'Deploy JavaScript, TypeScript, Python, Rust, or WASM globally. Zero cold starts. Sub-millisecond startup.',
    highlight: ['Free tier: 100,000 req/day', 'No cold starts — ever', 'V8 isolates, not containers', 'Durable Objects for state'],
    badge: 'Free tier',
  },
  {
    icon: Globe,
    name: 'Pages',
    tag: 'Full-stack hosting',
    desc: 'Git-connected. Builds automatically. Preview deployments. Full-stack with Workers on the backend.',
    highlight: ['Unlimited sites & bandwidth', 'Preview URLs for every PR', 'Built-in CI/CD', 'Custom domains + free SSL'],
    badge: 'Free',
  },
  {
    icon: HardDrive,
    name: 'R2 Storage',
    tag: 'Object storage',
    desc: 'S3-compatible object storage. Zero egress fees — ever. Store and retrieve any amount of data globally.',
    highlight: ['$0 egress fees', 'S3-compatible API', '10 GB free storage', 'Multi-region by default'],
    badge: 'Free tier',
  },
  {
    icon: Database,
    name: 'D1 Database',
    tag: 'SQLite at the edge',
    desc: 'Run SQLite databases globally. Query close to your users with automatic replication and read replicas.',
    highlight: ['SQLite-compatible', '500 MB free', 'Automatic backups', 'Workers binding'],
    badge: 'Beta',
  },
];

const MORE_PRODUCTS = [
  { name: 'KV', desc: 'Low-latency global key-value store' },
  { name: 'Durable Objects', desc: 'Globally consistent stateful primitives' },
  { name: 'Queues', desc: 'Reliable message queues for Workers' },
  { name: 'Stream', desc: 'Video upload, encode, and deliver' },
  { name: 'Images', desc: 'Resize and optimize images at the edge' },
  { name: 'Hyperdrive', desc: 'Accelerate existing database queries' },
  { name: 'Vectorize', desc: 'Vector database for AI applications' },
  { name: 'Calls', desc: 'WebRTC real-time audio/video' },
  { name: 'Workers AI', desc: 'Run AI inference at the edge' },
  { name: 'AI Gateway', desc: 'Observe and cache AI requests' },
  { name: 'AutoRAG', desc: 'Build RAG pipelines with R2 + AI' },
  { name: 'Pages Functions', desc: 'Server-side logic in Pages deploys' },
];

export default function Developers() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero */}
      <section className="bg-[#1d1f20] border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Developer Platform</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
              Build globally.<br />Deploy instantly.<br />Scale infinitely.
            </h1>
            <p className="text-[#a0aaba] text-xl max-w-2xl leading-relaxed mb-10">
              Cloudflare's developer platform gives you serverless compute, storage, databases, and AI inference — all in 320+ locations globally, with zero cold starts and no egress fees.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={SIGN_UP_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
                Start building <ArrowRight className="w-4 h-4" />
              </a>
              <a href={DOCS_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
                View documentation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core products */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-2">Core platform</h2>
        <p className="text-[#6b7280] mb-12">The building blocks of every Cloudflare application.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1d1f20] border border-white/[0.08] rounded-xl p-8 hover:border-[#f6821f]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f6821f]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#f6821f]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{product.name}</h3>
                      <p className="text-[11px] text-[#6b7280] uppercase tracking-wider">{product.tag}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f6821f]/10 text-[#f6821f] border border-[#f6821f]/20 whitespace-nowrap">
                    {product.badge}
                  </span>
                </div>
                <p className="text-[#a0aaba] text-sm leading-relaxed mb-5">{product.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {product.highlight.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#f6821f] shrink-0" />
                      <span className="text-[12px] text-[#6b7280]">{h}</span>
                    </div>
                  ))}
                </div>
                <a href={DEV_LINKS[product.name] ?? DOCS_URL} className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-medium text-[#f6821f] hover:gap-2.5 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* More products */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-2">More developer tools</h2>
          <p className="text-[#6b7280] mb-12">Storage, messaging, media, AI — everything you need in one platform.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {MORE_PRODUCTS.map((p) => (
              <a
                key={p.name}
                  href={DEV_LINKS[p.name] ?? DOCS_URL}
                className="group flex flex-col bg-[#0f172a] border border-white/[0.08] hover:border-[#f6821f]/30 rounded-xl p-5 transition-all hover:-translate-y-0.5"
              >
                <span className="text-[14px] font-semibold text-white group-hover:text-[#f6821f] transition-colors mb-1">{p.name}</span>
                <span className="text-[12px] text-[#6b7280]">{p.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Write once, run everywhere</h2>
            <p className="text-[#a0aaba] mb-6 leading-relaxed">
              Workers uses the standard Web platform APIs you already know — fetch, Request, Response, WebCrypto. Write in JavaScript, TypeScript, or Python. Deploy in seconds.
            </p>
            <div className="space-y-3">
              {['No servers to manage', 'Automatic global distribution', 'Bindings for R2, D1, KV, Queues', 'wrangler CLI for local dev'].map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f6821f] shrink-0" />
                  <span className="text-sm text-[#a0aaba]">{f}</span>
                </div>
              ))}
            </div>
            <a href={DOCS_URL} className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded text-sm font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
              Read the docs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="bg-[#1d1f20] border border-white/[0.08] rounded-xl p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/[0.08]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[#6b7280] text-xs">worker.ts</span>
            </div>
            <pre className="text-[13px] leading-relaxed overflow-x-auto">
              <code>
                <span className="text-[#60a5fa]">export default</span>
                {' {\n'}
                {'  '}
                <span className="text-[#4ade80]">async fetch</span>
                {'(req: Request) {\n'}
                {'    '}
                <span className="text-[#60a5fa]">const</span>
                {' url = '}
                <span className="text-[#60a5fa]">new</span>
                {' URL(req.url);\n\n'}
                {'    '}
                <span className="text-[#60a5fa]">if</span>
                {' (url.pathname === '}
                <span className="text-[#fbbf24]">"/api/hello"</span>
                {') {\n'}
                {'      '}
                <span className="text-[#60a5fa]">return</span>
                {' Response.json({\n'}
                {'        message: '}
                <span className="text-[#fbbf24]">"Hello from the edge!"</span>
                {',\n'}
                {'        location: req.cf?.city,\n'}
                {'      });\n'}
                {'    }\n\n'}
                {'    '}
                <span className="text-[#60a5fa]">return</span>
                {' '}
                <span className="text-[#60a5fa]">new</span>
                {' Response('}
                <span className="text-[#fbbf24]">"Not found"</span>
                {', { status: '}
                <span className="text-[#c084fc]">404</span>
                {' });\n'}
                {'  },\n}'}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] bg-[#1d1f20]">
        <div className="max-w-[1280px] mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Start building for free</h2>
          <p className="text-[#a0aaba] mb-8 max-w-lg mx-auto">Workers, Pages, R2, D1, and KV all have generous free tiers. No credit card needed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SIGN_UP_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white" style={{ backgroundColor: '#f6821f' }}>
              Create free account <ArrowRight className="w-4 h-4" />
            </a>
            <a href={DOCS_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-base font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors">
              View documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
