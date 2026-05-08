import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { Lock, CheckCircle2, MapPin, Linkedin } from 'lucide-react';
import { capturePosthogEvent } from '@/lib/apexlyn-analytics-consent';
import {
  APEXLN_COMPANY,
  FOUNDER_IMAGE_URL,
  FOUNDER_LINKEDIN_URL,
} from '@/lib/apexlyn-company';

const CONTACT = '/contact';

export default function AboutApexlynPage() {
  useEffect(() => {
    capturePosthogEvent('about_page_viewed', {});
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <section className="bg-[#0B1320] pt-12 pb-8 text-center lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="mb-4 text-[14px] font-medium uppercase tracking-[0.5px] text-[#93C5FD]">About</p>
          <h1 className="mb-6 text-[32px] font-bold leading-tight text-white lg:text-[48px]">About APEXLyn</h1>
          <p className="mx-auto max-w-[600px] text-[16px] font-normal leading-[1.7] text-white/[0.85] lg:text-[18px]">
            APEXLyn is an Australian cybersecurity and AI governance company. We build evidence infrastructure —
            platforms that make security provable, not just claimed.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
            The problem we exist to solve
          </h2>
          <div className="space-y-4 text-[17px] leading-[1.7] text-[#4B5563]">
            <p>
              Most organisations prove their security posture by filling in questionnaires, exporting screenshots, and
              compiling evidence manually. When an insurer asks &quot;do you have MFA enabled?&quot; the answer is a
              ticked box. Nobody verifies it. Nobody can prove it. And when something goes wrong, the gap between what
              was claimed and what was real is often significant.
            </p>
            <p>
              At the same time, AI tools are entering every workplace — clinical notes in healthcare, case analysis in
              law, financial modelling in accounting, claims processing in insurance. Employees are pasting sensitive
              data into AI tools without governance, without visibility, and without evidence of what happened.
            </p>
            <p>
              APEXLyn exists because compliance should not depend on spreadsheets and screenshots. AI governance should
              not depend on policies that nobody enforces. And security evidence should be automated, immutable, and
              independently verifiable — not assembled manually before each audit cycle.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-12 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-12 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
            Our approach
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <article className="flex h-full flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-8 shadow-[0_1px_0_rgba(11,19,32,0.06)]">
              <Lock className="h-8 w-8 text-[#1E3A8A]" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-[18px] font-semibold text-[#0B1320]">Evidence, not assertions</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                Both platforms collect evidence automatically and commit it to tamper-proof storage with cryptographic
                chaining. Evidence cannot be altered, deleted, or disputed after collection. Reports are backed by
                proof, not claims.
              </p>
            </article>
            <article className="flex h-full flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-8 shadow-[0_1px_0_rgba(11,19,32,0.06)]">
              <CheckCircle2 className="h-8 w-8 text-[#1E3A8A]" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-[18px] font-semibold text-[#0B1320]">Verifiable, not trusted</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                Every report can be independently verified — by an insurer, an auditor, a regulator, or a court —
                without needing platform access and without trusting APEXLyn. Verification is mathematical, not
                testimonial.
              </p>
            </article>
            <article className="flex h-full flex-col rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-8 shadow-[0_1px_0_rgba(11,19,32,0.06)]">
              <MapPin className="h-8 w-8 text-[#1E3A8A]" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-[18px] font-semibold text-[#0B1320]">Australian, not adapted</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                Both platforms are built for Australian operating conditions from the ground up — not adapted from a US
                product. Australian data residency enforced at the infrastructure level. Australian frameworks as
                first-class citizens, not afterthoughts.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <h2 className="mb-12 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">
            Two platforms. One evidence standard.
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <Link
              href="/track"
              onClick={() => capturePosthogEvent('about_platform_card_clicked', { platform: 'track' })}
              className="block h-full rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E3A8A] bg-white p-8 shadow-[0_1px_0_rgba(11,19,32,0.06)] transition-shadow hover:shadow-md lg:col-span-6"
            >
              <h3 className="text-[22px] font-bold text-[#0B1320]">APEXLyn Track</h3>
              <p className="mt-1 text-[15px] font-medium text-[#6B7280]">Evidence-Led Compliance Engine</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563]">
                Track collects security evidence automatically from your existing systems, locks it in tamper-proof
                storage, maps it to compliance frameworks, and generates insurance-grade reports that can be
                independently verified.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                Designed for organisations that need to prove their security posture to insurers, auditors, regulators,
                and boards — from Essential Eight to ASD ISM.
              </p>
              <span className="mt-6 inline-flex items-center text-[15px] font-semibold text-[#1E3A8A]">
                Explore Track →
              </span>
            </Link>
            <Link
              href="/lens"
              onClick={() => capturePosthogEvent('about_platform_card_clicked', { platform: 'lens' })}
              className="block h-full rounded-xl border border-[#E5E7EB] border-l-[3px] border-l-[#1E90FF] bg-white p-8 shadow-[0_1px_0_rgba(11,19,32,0.06)] transition-shadow hover:shadow-md lg:col-span-6"
            >
              <h3 className="text-[22px] font-bold text-[#0B1320]">APEXLyn Lens</h3>
              <p className="mt-1 text-[15px] font-medium text-[#6B7280]">AI Security &amp; Evidence Platform</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563]">
                Lens monitors how AI tools are used across your organisation, enforces your governance policies
                automatically, and records every action as forensic-grade evidence. Seven enforcement layers. Twenty-two
                native integrations with existing security tools.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                Designed for organisations that need to govern AI use with evidence, not just policy — from browser-based
                monitoring to court-ready evidence packs.
              </p>
              <span className="mt-6 inline-flex items-center text-[15px] font-semibold text-[#1E3A8A]">
                Explore Lens →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-12 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <h2 className="mb-10 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">Founder</h2>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="flex justify-center lg:col-span-4 lg:justify-start">
              {FOUNDER_IMAGE_URL ? (
                <img
                  src={FOUNDER_IMAGE_URL}
                  alt="Vishwa Teja Mardha"
                  className="h-40 w-40 rounded-full border border-[#E5E7EB] object-cover"
                />
              ) : (
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#E5E7EB]">
                  <span className="text-[40px] font-bold text-[#4B5563]">VTM</span>
                </div>
              )}
            </div>
            <div className="lg:col-span-8">
              <h3 className="text-[24px] font-bold text-[#0B1320]">Vishwa Teja Mardha</h3>
              <p className="mt-1 text-[16px] text-[#6B7280]">Founder, APEXLyn Pty Ltd</p>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-[#4B5563]">
                <p>
                  Vishwa founded APEXLyn with a clear conviction: organisations should not have to guess whether their
                  security controls are working. They should be able to prove it — with evidence that is automated,
                  immutable, and independently verifiable.
                </p>
                <p>
                  Before founding APEXLyn, Vishwa designed the complete platform architectures for both Track and Lens —
                  over 50 pages of forensic-grade specifications covering immutable evidence ledgers, hash-chained proof
                  models, multi-framework mapping engines, seven-layer AI enforcement architecture, and insurance-grade
                  reporting systems.
                </p>
                <p>APEXLyn is based in Sydney, Australia.</p>
              </div>
              <a
                href={FOUNDER_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => capturePosthogEvent('about_linkedin_clicked', {})}
                className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#1E3A8A] hover:text-[#172E73]"
              >
                <Linkedin className="h-5 w-5" aria-hidden />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <h2 className="mb-8 text-center text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">Company</h2>
          <dl className="space-y-0">
            {(
              [
                ['Legal entity', APEXLN_COMPANY.legalName],
                ['ABN', APEXLN_COMPANY.abn],
                ['Location', APEXLN_COMPANY.location],
                ['Email', APEXLN_COMPANY.email, `mailto:${APEXLN_COMPANY.email}`],
                ['Phone', APEXLN_COMPANY.phone, `tel:${APEXLN_COMPANY.phone.replace(/\s/g, '')}`],
                ['Website', APEXLN_COMPANY.websiteDisplay, 'https://www.apexlyn.com.au'],
                ['Platform hosting', APEXLN_COMPANY.hosting],
              ] as [string, string, string?][]
            ).map(([label, value, href]) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-1 border-b border-[#F0F2F5] py-3 sm:grid-cols-[1fr_1.2fr] sm:items-baseline sm:gap-8"
              >
                <dt className="text-left text-[15px] font-medium text-[#6B7280] sm:text-right">{label}</dt>
                <dd className="text-[15px] text-[#0B1320]">
                  {href ? (
                    <a href={href} className="text-[#1E3A8A] underline-offset-2 hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[#0B1320] py-12 text-center lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <h2 className="mb-8 text-[1.65rem] font-bold leading-tight text-white sm:text-3xl">What we believe</h2>
          <p className="mb-8 text-[22px] font-semibold text-white">Security should be provable, not just claimed.</p>
          <p className="mb-8 text-[22px] font-semibold text-white">
            AI governance should be enforced, not just documented.
          </p>
          <p className="mb-12 text-[22px] font-semibold text-white">
            Evidence should be automated, immutable, and independently verifiable.
          </p>
          <p className="text-[18px] text-white/70">That is what we build.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[800px] px-4 text-center sm:px-6">
          <h2 className="mb-6 text-[1.65rem] font-bold leading-tight text-[#0B1320] sm:text-3xl">Start a conversation</h2>
          <p className="mx-auto mb-8 max-w-[640px] text-[17px] leading-relaxed text-[#4B5563]">
            Whether you are evaluating compliance evidence, AI governance, or both — we would welcome the opportunity to
            understand your requirements and show you how APEXLyn can help.
          </p>
          <Link
            href={CONTACT}
            onClick={() => capturePosthogEvent('about_cta_clicked', {})}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#1E3A8A] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#172E73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
