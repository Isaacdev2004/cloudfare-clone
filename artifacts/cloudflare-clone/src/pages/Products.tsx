import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Lock, Code2, BrainCircuit, Network, Globe, Server, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Link } from 'wouter';
import { subtleLiftHover } from '@/lib/motion';

const SIGN_UP_URL = '/pricing';
const CONTACT_SALES_URL = '/enterprise';

const getProductHref = (tabId: string) => {
  if (tabId === 'developer') return '/developers';
  if (tabId === 'zero-trust') return '/zero-trust';
  return '/products';
};

const TABS = [
  { id: 'performance', label: 'Application Performance', icon: Zap },
  { id: 'security', label: 'Application Security', icon: Shield },
  { id: 'zero-trust', label: 'Zero Trust & SASE', icon: Lock },
  { id: 'network', label: 'Network Services', icon: Network },
  { id: 'developer', label: 'Developer Platform', icon: Code2 },
  { id: 'ai', label: 'AI', icon: BrainCircuit },
];

const PRODUCTS: Record<string, { name: string; desc: string; tags: string[]; badge?: string }[]> = {
  performance: [
    { name: 'CDN', desc: 'Accelerate your internet property with our global CDN, serving content from 320+ data centers worldwide.', tags: ['Performance', 'Caching'] },
    { name: 'DNS', desc: "The world's fastest DNS resolver — 1.1.1.1 — with built-in privacy protection.", tags: ['DNS', 'Infrastructure'] },
    { name: 'Load Balancing', desc: 'Maximize application performance and availability with intelligent, health-aware load balancing.', tags: ['Performance', 'Reliability'] },
    { name: 'Argo Smart Routing', desc: 'Speed up your traffic by routing it through the least congested and most reliable paths on our network.', tags: ['Performance', 'Routing'] },
    { name: 'Early Hints', desc: 'Dramatically speed up page loads by sending early hints to browsers so they can prefetch critical resources.', tags: ['Performance'] },
    { name: 'Zaraz', desc: 'Load third-party tools in the cloud instead of the browser — faster pages, better privacy, more control.', tags: ['Performance', 'Privacy'] },
    { name: 'Tiered Cache', desc: 'Reduce requests to your origin servers by using Apexlyn data centers as additional cache tiers.', tags: ['Performance', 'Caching'] },
    { name: 'Cache Rules', desc: 'Fine-grained control over how, where, and for how long resources are cached at the edge.', tags: ['Performance', 'Caching'] },
    { name: 'Image Resizing', desc: 'Transform, resize, and optimize images on the fly — serve exactly the right format and size.', tags: ['Performance', 'Images'] },
    { name: 'Polish', desc: 'Losslessly compress JPEG, PNG, and GIF images to reduce their size and speed up page loads.', tags: ['Performance', 'Images'] },
    { name: 'Rocket Loader', desc: 'Improves the paint time of pages that include JavaScript, no code changes needed.', tags: ['Performance'] },
    { name: 'HTTP/3 (QUIC)', desc: 'Enable the latest version of the HTTP protocol for faster, more reliable connections.', tags: ['Performance', 'Protocol'] },
  ],
  security: [
    { name: 'DDoS Protection', desc: 'Unmetered, always-on protection against the largest DDoS attacks ever recorded — at no extra cost.', tags: ['Security', 'DDoS'], badge: 'Always On' },
    { name: 'Web Application Firewall', desc: 'Block common vulnerabilities and zero-day exploits with Apexlyn-managed and custom rulesets.', tags: ['Security', 'WAF'] },
    { name: 'Bot Management', desc: 'Detect and stop sophisticated bots without impacting legitimate users — powered by machine learning.', tags: ['Security', 'Bots'] },
    { name: 'API Shield', desc: 'Protect your APIs from abuse with schema validation, mutual TLS, and anomaly detection.', tags: ['Security', 'API'] },
    { name: 'Page Shield', desc: 'Monitor scripts and third-party dependencies on your site to detect supply chain attacks.', tags: ['Security', 'SCA'] },
    { name: 'SSL/TLS', desc: "Free Universal SSL, auto-renewing certificates, and the world's fastest TLS termination.", tags: ['Security', 'SSL'] },
    { name: 'Turnstile', desc: 'A privacy-first CAPTCHA alternative that is frictionless for users and easy to deploy.', tags: ['Security', 'CAPTCHA'], badge: 'Free' },
    { name: 'Rate Limiting', desc: 'Protect against denial-of-service attacks and brute-force login attempts with configurable rate limits.', tags: ['Security'] },
    { name: 'Fraud Detection', desc: 'Stop account takeovers and payment fraud with behavioral and risk-based detection.', tags: ['Security', 'Fraud'] },
    { name: 'Security Center', desc: 'Unified security dashboard to investigate, triage, and remediate threats across all Apexlyn products.', tags: ['Security', 'Visibility'] },
    { name: 'Magic Firewall', desc: 'Network-level firewall delivered as a service — filter traffic across all ports and protocols.', tags: ['Security', 'Network'] },
    { name: 'Email Security', desc: 'Stop phishing and malicious emails before they reach your inbox with AI-driven filtering.', tags: ['Security', 'Email'] },
  ],
  'zero-trust': [
    { name: 'Access', desc: 'Replace your VPN with identity-aware, Zero Trust access to any application — without network exposure.', tags: ['Zero Trust', 'Access'], badge: 'Core' },
    { name: 'Gateway', desc: 'Filter DNS, HTTP, and network traffic to stop threats and enforce corporate policies across all devices.', tags: ['Zero Trust', 'Gateway'], badge: 'Core' },
    { name: 'Browser Isolation', desc: 'Execute browser code in the cloud — users see pixels, attackers see nothing. Zero malware risk.', tags: ['Zero Trust', 'Browser'] },
    { name: 'CASB', desc: 'Scan SaaS applications for misconfigurations, shadow IT, and data exposures across your entire estate.', tags: ['Zero Trust', 'SaaS'] },
    { name: 'Data Loss Prevention', desc: 'Detect and block sensitive data from leaving your organization — for web, email, and SaaS.', tags: ['Zero Trust', 'DLP'] },
    { name: 'WARP Client', desc: "Secure your employees' devices with Zero Trust networking without sacrificing performance.", tags: ['Zero Trust', 'Device'] },
    { name: 'Email Security (Cloud)', desc: 'Stop phishing and BEC attacks before they reach your inbox, integrated with Zero Trust posture.', tags: ['Zero Trust', 'Email'] },
    { name: 'Digital Experience Monitoring', desc: 'Understand and improve the experience of employees using any application, from anywhere.', tags: ['Zero Trust', 'Monitoring'] },
    { name: 'Risk Score', desc: 'Dynamically adjust access policies based on real-time user and device risk posture signals.', tags: ['Zero Trust', 'Risk'] },
  ],
  network: [
    { name: 'Magic Transit', desc: 'Replace on-premises network appliances with Apexlyn\'s network — protect entire IP ranges.', tags: ['Network', 'Transit'], badge: 'Enterprise' },
    { name: 'Magic WAN', desc: 'Connect locations, offices, and data centers with a cloud-native WAN — no hardware required.', tags: ['Network', 'WAN'], badge: 'Enterprise' },
    { name: 'Network Interconnect', desc: 'Privately connect your network to Apexlyn with dedicated, low-latency interconnections.', tags: ['Network', 'Interconnect'] },
    { name: 'Spectrum', desc: 'Protect TCP/UDP applications with DDoS mitigation and firewall — not just HTTP.', tags: ['Network', 'Protocol'] },
    { name: 'Apexlyn Tunnel', desc: 'Expose servers to the Internet securely without opening firewall ports — no public IP needed.', tags: ['Network', 'Tunnel'], badge: 'Free' },
    { name: 'BYOIP', desc: 'Bring your own IP addresses to Apexlyn and benefit from our network while keeping your IPs.', tags: ['Network', 'IP'] },
    { name: 'Anycast Network', desc: 'Automatic anycast routing to the nearest data center reduces latency and improves resilience.', tags: ['Network', 'Infrastructure'] },
  ],
  developer: [
    { name: 'Workers', desc: 'Deploy serverless JavaScript, Python, Rust, or WASM globally with sub-millisecond cold starts.', tags: ['Serverless', 'Compute'], badge: 'Free tier' },
    { name: 'Pages', desc: 'Build and deploy JAMstack sites with Git integration, preview URLs, and unlimited bandwidth.', tags: ['Hosting', 'Static'], badge: 'Free tier' },
    { name: 'R2 Storage', desc: 'S3-compatible object storage with zero egress fees — store and retrieve any amount of data.', tags: ['Storage'], badge: 'Free tier' },
    { name: 'D1 Database', desc: 'SQLite databases at the edge — run queries close to your users with global replication.', tags: ['Database', 'SQL'], badge: 'Beta' },
    { name: 'KV', desc: 'Low-latency, globally-distributed key-value storage for Workers with strong consistency options.', tags: ['Storage', 'KV'] },
    { name: 'Durable Objects', desc: 'Globally consistent, stateful primitives at the edge — perfect for collaborative and real-time apps.', tags: ['Stateful', 'Compute'] },
    { name: 'Queues', desc: 'Reliable, durable message queues for Workers — guaranteed delivery, exactly-once processing.', tags: ['Messaging'] },
    { name: 'Stream', desc: 'Upload, store, encode, and deliver live and on-demand video without managing infrastructure.', tags: ['Video', 'Media'] },
    { name: 'Images', desc: 'Resize, compress, and serve images with a simple API — optimized delivery from the edge.', tags: ['Images', 'Media'] },
    { name: 'Hyperdrive', desc: 'Accelerate queries to your existing databases from Workers — connection pooling as a service.', tags: ['Database'] },
    { name: 'Vectorize', desc: 'Build full-stack AI apps with a vector database built for Workers AI and third-party models.', tags: ['AI', 'Vector DB'] },
    { name: 'Calls', desc: 'Build real-time audio/video applications without managing media servers — WebRTC as a service.', tags: ['Real-time', 'WebRTC'] },
  ],
  ai: [
    { name: 'Workers AI', desc: 'Run AI inference on serverless GPUs across our global network — bring your models or use ours.', tags: ['AI', 'Inference'], badge: 'Beta' },
    { name: 'AI Gateway', desc: 'Observe, control, and cache AI requests — save costs and gain insights across all AI providers.', tags: ['AI', 'Gateway'], badge: 'Beta' },
    { name: 'Vectorize', desc: 'Store and query vector embeddings at the edge — build semantic search and RAG applications.', tags: ['AI', 'Vector DB'], badge: 'Beta' },
    { name: 'AI Audit', desc: 'Understand and control how AI crawlers access your site — block or allow with fine-grained rules.', tags: ['AI', 'Security'] },
    { name: 'Firewall for AI', desc: 'Protect LLM-powered applications from prompt injection, PII leaks, and model abuse.', tags: ['AI', 'Security'] },
    { name: 'AutoRAG', desc: 'Build retrieval-augmented generation pipelines with R2 and Workers — zero infrastructure.', tags: ['AI', 'RAG'] },
  ],
};

const STATS = [
  { value: '320+', label: 'Cities worldwide' },
  { value: '13,000+', label: 'Networks interconnected' },
  { value: '248 Tbps', label: 'Network capacity' },
  { value: '50ms', label: 'To 95% of Internet users' },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState('performance');
  const products = PRODUCTS[activeTab] || [];

  return (
    <div className="min-h-screen apex-page-bg">
      {/* Hero */}
      <section className="border-b border-slate-200">
        <PageHero
          eyebrow="Products"
          title={<>One platform.<br />Every Internet property.</>}
          description="A comprehensive suite of cloud services to protect and accelerate any Internet application — no hardware required."
          className="bg-white"
          contentClassName="py-20"
        />
        <div className="max-w-[1280px] mx-auto px-6 pb-12 -mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-slate-200">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                    activeTab === tab.id
                      ? tab.id === 'ai'
                        ? 'border-[#1E90FF] text-[#0B1320]'
                        : 'border-[#1E3A8A] text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {products.map((product) => (
              <motion.div
                key={product.name}
                whileHover={subtleLiftHover}
                className="group"
              >
                <Link
                  href={getProductHref(activeTab)}
                  className="flex flex-col bg-white border border-slate-200 rounded-xl p-6 hover:border-[#1E3A8A]/40 hover:shadow-[0_12px_30px_-18px_rgba(30,58,138,0.25)] transition-all duration-200 h-full"
                >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-[#1E3A8A] transition-colors">
                    {product.name}
                  </h3>
                  {product.badge && (
                    <span className="ml-2 shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed flex-grow">{product.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-4 text-[13px] font-medium text-[#1E3A8A] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Platform CTA section */}
      <section className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="All products. One platform."
                description="Unlike point solutions, Apexlyn products share intelligence and work together — security products learn from DDoS attacks, performance products benefit from Zero Trust insights."
                className="mb-8"
                titleClassName="text-4xl"
                descriptionClassName="text-slate-600 text-lg"
              />
              <div className="space-y-3">
                {['No hardware to manage', 'Instant global deployment', 'Unified dashboard and analytics', 'Usage-based pricing for most products'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-10">
                <Link href={SIGN_UP_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors">
                  Get started free
                </Link>
                <Link href={CONTACT_SALES_URL} className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors">
                  Contact sales
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Global CDN', sub: 'Fastest delivery' },
                { label: 'Zero Trust', sub: 'Secure access' },
                { label: 'Workers', sub: 'Edge compute' },
                { label: 'DDoS', sub: 'Always-on protection' },
              ].map((item) => (
                <motion.div key={item.label} whileHover={subtleLiftHover} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-[#1E3A8A]/30 transition-colors">
                  <p className="text-slate-900 font-semibold mb-1">{item.label}</p>
                  <p className="text-slate-500 text-sm">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
