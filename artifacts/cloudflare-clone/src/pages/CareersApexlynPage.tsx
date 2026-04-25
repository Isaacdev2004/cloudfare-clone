import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { PageHero } from '@/components/layout/PageHero';
import { fadeInUp } from '@/lib/motion';
import { InnerHeroBackdrop, SectionGridWash, ElevatedCtaBand } from '@/components/layout/InnerPageChrome';
import { Briefcase } from 'lucide-react';
import { CTA, CONTACT_TOPICS } from '@/lib/apexlyn-cta-routes';

const REGISTER_INTEREST_HREF = CTA.contactTopic(CONTACT_TOPICS.careers);

const HERO_SUBHEAD =
  'We are building systems that make security evidence defensible and AI risk governable — at a standard serious organisations can rely on.';

const INTRO_BODY =
  'APEXLyn is for people who want to build meaningful infrastructure, not surface-level software. We care about clarity, trust, control, and long-term platform quality.';

/** When populated, render role links; otherwise the empty state is shown. */
const OPEN_ROLES: { id: string; title: string; href: string }[] = [];

export default function CareersApexlynPage() {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <InnerHeroBackdrop />
        <PageHero
          variant="light"
          eyebrow="Careers"
          title="Build the Infrastructure of Trust"
          description={HERO_SUBHEAD}
          className="relative z-[1] bg-transparent"
          contentClassName="relative z-[1] py-16 sm:py-20 lg:py-24 max-w-3xl"
        />
      </section>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-10 md:py-12">
        <SectionGridWash className="opacity-40" />
        <div className="relative z-[1] mx-auto max-w-3xl px-6">
          <p className="text-center font-sans text-[17px] leading-relaxed text-slate-600 sm:text-[18px]">{INTRO_BODY}</p>
        </div>
      </section>

      <section className="relative overflow-hidden py-14 md:py-20">
        <SectionGridWash />
        <div className="relative z-[1] mx-auto max-w-[720px] px-6">
          <motion.div
            id="open-roles"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="scroll-mt-[calc(108px+1rem)] rounded-2xl border border-slate-200/90 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(11,19,32,0.12)] sm:p-10"
          >
            {OPEN_ROLES.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Open roles</h2>
                <ul className="mt-6 space-y-3">
                  {OPEN_ROLES.map((role) => (
                    <li key={role.id}>
                      <a
                        href={role.href}
                        className="block rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-3 text-[15px] font-medium text-[#1E3A8A] transition-colors hover:border-[#1E3A8A]/30 hover:bg-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {role.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center">
                <Briefcase className="mx-auto h-10 w-10 text-[#1E3A8A]/80" strokeWidth={1.25} aria-hidden />
                <h2 className="mt-6 text-xl font-bold text-slate-900 sm:text-2xl">No Open Roles Right Now</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
                  We are growing carefully. Register your interest and we will contact you if a relevant role opens.
                </p>
                <Link
                  href={REGISTER_INTEREST_HREF}
                  className="mt-8 inline-flex min-h-[3rem] items-center justify-center rounded-lg bg-[#1E3A8A] px-8 py-3 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-[#172554]"
                >
                  Register Interest
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <ElevatedCtaBand>
        <a
          href="#open-roles"
          className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[15px] font-semibold text-white transition-colors bg-[#1E3A8A] hover:bg-[#172554] font-sans"
        >
          View Open Roles
        </a>
        <Link
          href={REGISTER_INTEREST_HREF}
          className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 font-sans"
        >
          Register Interest
        </Link>
      </ElevatedCtaBand>
    </div>
  );
}
