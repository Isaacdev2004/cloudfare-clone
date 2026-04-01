import React from 'react';
import { motion } from 'framer-motion';
import { HeroCloudNetworkVisual } from '@/components/hero/HeroCloudNetworkVisual';
import { HeroFrameworkOrbitVisual } from '@/components/hero/HeroFrameworkOrbitVisual';
import { HeroGaugeVisual } from '@/components/hero/HeroGaugeVisual';
import { Marquee } from '@/components/Marquee';
import { PageHero } from '@/components/layout/PageHero';
import { Link } from 'wouter';
import { brandLogos } from '@/lib/assets';
import { fadeInUp } from '@/lib/motion';
import { CheckCircle2, Users } from 'lucide-react';

const TEST_SECURITY_STATE_URL = '/test-security-state';
const REQUEST_SERVICE_OVERVIEW_URL = '/company/contact';
const STRATEGIC_CONVERSATION_URL = '/enterprise';

const HERO_VALUE_POINTS = [
  'Replace audit scramble with continuous, defensible proof.',
  'Make control reality visible — not assumed.',
  'Stop sensitive data exposure through AI before it becomes an incident.',
  'Give leaders reporting they can stand behind.',
  'Scale governance across teams, tenants, and environments.',
];

const CYBER_SECURITY_SERVICES = [
  {
    title: 'Apexlyn Pulse',
    body: 'Immediate actions that reduce real risk today.',
    bullets: 'High-impact fixes • Critical gaps closed • Fast uplift plan',
  },
  {
    title: 'Apexlyn Flow',
    body: 'Keeps your business running smoothly in the background.',
    bullets: 'Operational hardening cycles • Drift detection • Ongoing uplift',
  },
  {
    title: 'Apexlyn Vault',
    body: 'Locks protection into the core of your business.',
    bullets: 'Governance workflows • Ownership model • Reporting cadence',
  },
] as const;

const ENGINEERED_INFRA_BULLETS = [
  'Role-based access control',
  'Append-only evidence architecture',
  'Full audit trail',
  'API validation layer',
  'Encrypted data storage',
] as const;

const PLATFORM_ROWS = [
  {
    title: 'APEXLyn Track Platform',
    subtitle: 'Security Evidence Infrastructure',
    body:
      'A structured system of record that continuously captures control states, eliminates manual audits, and transforms operational security into defensible evidence.',
    bullets: [
      'Automated evidence ingestion',
      'Append-only ledger architecture',
      'Framework-aligned control mapping',
      'Continuous governance workflows',
    ],
    cta: { label: 'Test Your Evidence Readiness', href: '/platforms/track' },
    related: [] as { label: string; href: string }[],
    visual: 'globe' as const,
  },
  {
    title: 'APEXLyn Lens Platform',
    subtitle: 'AI Governance & AI Risk Infrastructure',
    body:
      'Monitor and control AI usage across your organisation with structured policy enforcement and real-time exposure visibility.',
    bullets: [
      'AI tool visibility',
      'Prompt-level risk inspection',
      'Sensitive data leakage prevention',
      'AI policy enforcement',
    ],
    cta: { label: 'Assess Your AI Exposure', href: '/platforms/lens' },
    related: [] as { label: string; href: string }[],
    visual: 'gauge' as const,
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
        layout="home"
        title="The Evidence-Led Security & AI Governance Infrastructure."
        description="Collect defensible security evidence, operationalise protective controls, and govern AI risk with precision."
        eyebrow="WHERE SECURITY BECOMES EVIDENCE."
        valuePoints={HERO_VALUE_POINTS}
        primaryMicrocopy="2 minutes • Clear baseline signal • Next steps included"
        positioningParagraph="APEXLyn builds security and AI governance as infrastructure — not manual processes. We help organisations prove what's protected, what's drifting, and what's exposed, using structured evidence and enforceable governance that holds up under scrutiny."
        actions={[
          { label: 'Test Your Security State', href: TEST_SECURITY_STATE_URL, variant: 'primary' },
          { label: 'Explore Our Platforms', href: '/platforms', variant: 'outline' },
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
          <p>Built for teams who need evidence, not anecdotes</p>
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

      {/* ── Our Platforms (Track + Lens) ── */}
      <section
        id="our-platforms"
        className="py-16 md:py-24 bg-[#F7F9FC] bg-[linear-gradient(to_right,rgba(11,19,32,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,19,32,0.06)_1px,transparent_1px)] bg-[size:24px_24px]"
      >
        <div className="max-w-[1280px] mx-auto px-6 space-y-16 md:space-y-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans">
              Operational Security and AI Governance — Built as Systems, Not Services.
            </h2>
          </motion.div>

          {PLATFORM_ROWS.map((row, idx) => (
            <div
              key={row.title}
              className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 gap-0 items-center"
            >
              {row.related.length > 0 && (
                <div className="lg:hidden -mx-6 px-6 bg-white border-y border-slate-200 py-3.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 mb-6 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
                  {row.related.map((item) => (
                    <Link key={item.label} href={item.href} className={connectivityLinkClass}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

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
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1E3A8A] mb-2 font-sans">
                  {row.subtitle}
                </p>
                <h3 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 mb-4 sm:mb-5 leading-[1.08] tracking-[-0.02em] font-sans">
                  {row.title}
                </h3>
                <p className="text-slate-600 text-[17px] sm:text-[18px] leading-relaxed mb-6 font-sans">
                  {row.body}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {row.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-slate-600 text-[15px] sm:text-[16px] leading-snug font-sans">
                      <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <Link
                    href={row.cta.href}
                    className="font-sans inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
                  >
                    {row.cta.label}
                  </Link>
                </div>
                {row.related.length > 0 && (
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
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cyber Security Services (Pulse, Flow, Vault) ── */}
      <section
        id="cyber-security-services"
        className="py-16 md:py-24 bg-white border-t border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mb-12 md:mb-16"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans mb-5">
              Structured Security Uplift Services
            </h2>
            <p className="text-slate-600 text-[17px] sm:text-[18px] leading-relaxed font-sans">
              Targeted control implementation and operational hardening designed to stabilise environments, reduce exposure, and embed lasting protection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:mb-14">
            {CYBER_SECURITY_SERVICES.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-slate-200/90 bg-[#F7F9FC] p-7 sm:p-8 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.2)]"
              >
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mb-3">{col.title}</h3>
                <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed mb-4 font-sans">{col.body}</p>
                <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed font-sans border-t border-slate-200/80 pt-4">
                  {col.bullets}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex justify-center"
          >
            <Link
              href={REQUEST_SERVICE_OVERVIEW_URL}
              className="font-sans inline-flex items-center gap-2 px-6 py-3 rounded text-[15px] font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
            >
              Request Service Overview
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Audience fit ── */}
      <section className="py-16 md:py-24 bg-[#F7F9FC] border-t border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans mb-6 md:mb-8">
              Designed for Organisations That Cannot Afford Assumptions
            </h2>
            <p className="text-slate-600 text-[17px] sm:text-[18px] leading-relaxed font-sans">
              From healthcare providers to professional service firms, from accounting practices to technology organisations — APEXLyn delivers structured security and AI governance infrastructure designed to scale with operational complexity and regulatory expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Engineered for defensible infrastructure ── */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <h2 className="text-[1.65rem] sm:text-4xl md:text-[44px] lg:text-[52px] font-bold text-slate-900 leading-[1.08] tracking-[-0.02em] font-sans mb-8 md:mb-10">
              Engineered for Defensible Infrastructure
            </h2>
            <ul className="space-y-3 mb-10">
              {ENGINEERED_INFRA_BULLETS.map((item) => (
                <li key={item} className="flex gap-3 text-slate-600 text-[15px] sm:text-[16px] leading-snug font-sans">
                  <CheckCircle2 className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-700 text-[17px] sm:text-[18px] leading-relaxed font-sans border-l-4 border-[#1E3A8A] pl-5 py-1">
              Built to produce records that can be referenced — not just screenshots that can be debated.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-28 md:py-32 overflow-hidden bg-[#F7F9FC] border-t border-slate-200">
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-[#1E3A8A]/10 to-transparent pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#1E3A8A]/12 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-slate-900 mb-10 leading-[1.1] tracking-[-0.02em] font-sans">
              Security Without Assumptions. Evidence Without Gaps.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={TEST_SECURITY_STATE_URL}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
              >
                Test Your Security State
              </Link>
              <Link
                href={STRATEGIC_CONVERSATION_URL}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-slate-800 border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
              >
                Start a Strategic Conversation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
