import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { subtleLiftHover } from '@/lib/motion';

type InfoPageProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; body: string }>;
  highlights: string[];
  quickLinks?: Array<{ label: string; href: string }>;
  featureCards?: Array<{ title: string; body: string; href: string; cta: string }>;
  ctaLabel: string;
  ctaHref: string;
};

function InfoPageTemplate({
  eyebrow = 'Information',
  title,
  subtitle,
  sections,
  highlights,
  quickLinks = [],
  featureCards = [],
  ctaLabel,
  ctaHref,
}: InfoPageProps) {
  return (
    <div className="min-h-screen apex-page-bg">
      <section className="bg-white border-b border-slate-200">
        <PageHero
          eyebrow={eyebrow}
          title={title}
          description={subtitle}
          className="bg-transparent"
          contentClassName="py-20"
        />
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-16">
        {!!quickLinks.length && (
          <div className="mb-8 flex flex-wrap gap-2.5">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1 rounded-full border border-white/[0.1] px-3 py-1.5 text-[12px] text-[#a0aaba] hover:text-white hover:border-white/25 transition-colors"
              >
                {item.label} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        )}
        <SectionHeading
          title="Overview"
          description="Key context, practical guidance, and linked next steps for this section of the platform."
          className="mb-10"
        />
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-8">
            {sections.map((section) => (
              <motion.div key={section.heading} whileHover={subtleLiftHover} className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">{section.heading}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{section.body}</p>
              </motion.div>
            ))}

            {!!featureCards.length && (
              <>
                <SectionHeading
                  title="Featured"
                  description="Recommended areas to explore next."
                  className="mb-2 pt-2"
                  titleClassName="text-2xl"
                />
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {featureCards.map((card) => (
                    <motion.div
                      key={card.title}
                      whileHover={subtleLiftHover}
                      className="rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <h3 className="text-[16px] font-semibold text-slate-900 mb-2">{card.title}</h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed mb-4">{card.body}</p>
                      <Link href={card.href} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1E3A8A] hover:text-[#2563eb] transition-colors">
                        {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="h-fit bg-white border border-slate-200 rounded-xl p-6 sticky top-24">
            <p className="text-[11px] font-semibold text-[#1E3A8A] uppercase tracking-widest mb-4">Highlights</p>
            <div className="space-y-3 mb-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                  <span className="text-[13px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172554] transition-colors"
            >
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <InfoPageTemplate
      title="Privacy Policy"
      subtitle="How data is collected, used, and protected on the Apexlyn platform."
      sections={[
        {
          heading: 'Data collection and use',
          body: 'This page explains what categories of personal information are collected, why they are processed, and how data is secured. It is structured for production-ready replacement with legal counsel reviewed policy text.',
        },
        {
          heading: 'Retention and user rights',
          body: 'Information should be retained only for as long as needed to provide service and meet legal obligations. This section should document rights requests, retention windows, and response timelines for each data category.',
        },
        {
          heading: 'Regional compliance',
          body: 'Include GDPR, CCPA, and other applicable regional requirements in this section, along with contact pathways for data access, correction, and deletion requests.',
        },
      ]}
      highlights={['Data minimization', 'Purpose limitation', 'Retention controls', 'User rights transparency']}
      quickLinks={[
        { label: 'Terms of Use', href: '/terms-of-use' },
        { label: 'Report Security Issues', href: '/report-security' },
      ]}
      featureCards={[
        { title: 'Terms of Use', body: 'Review legal terms and account obligations tied to service usage.', href: '/terms-of-use', cta: 'Open terms' },
        { title: 'Cookie Preferences', body: 'Manage cookie categories and consent behavior for this experience.', href: '/support/cookie-preferences', cta: 'Manage cookies' },
      ]}
      ctaLabel="View Terms of Use"
      ctaHref="/terms-of-use"
    />
  );
}

export function TermsOfUsePage() {
  return (
    <InfoPageTemplate
      title="Terms of Use"
      subtitle="Key terms and conditions for using this demo platform."
      sections={[
        {
          heading: 'Service agreement',
          body: 'This section defines account responsibilities, service boundaries, payment terms, and legal limitations. It should be replaced with legal language specific to launch markets and plan tiers.',
        },
        {
          heading: 'Acceptable use policy',
          body: 'Usage must comply with applicable law and anti-abuse standards. Clarify prohibited behaviors, enforcement actions, and suspension criteria for platform abuse scenarios.',
        },
        {
          heading: 'Termination and updates',
          body: 'Document how terms updates are communicated, when they take effect, and how users can terminate service while preserving exported data and records.',
        },
      ]}
      highlights={['Service boundaries', 'Acceptable use', 'Disclaimer language', 'Termination conditions']}
      quickLinks={[
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Help Center', href: '/support/help-center' },
      ]}
      featureCards={[
        { title: 'Report Security', body: 'Submit vulnerabilities or abuse reports through coordinated disclosure.', href: '/report-security', cta: 'Report issue' },
      ]}
      ctaLabel="Report Security"
      ctaHref="/report-security"
    />
  );
}

export function ReportSecurityPage() {
  return (
    <InfoPageTemplate
      title="Report Security Issues"
      subtitle="Guidance for reporting vulnerabilities and suspected abuse."
      sections={[
        {
          heading: 'Responsible disclosure',
          body: 'Use this channel to report vulnerabilities with reproducible steps, impact details, and affected surfaces. Include environment details and expected versus observed behavior to speed triage.',
        },
        {
          heading: 'Triage and response',
          body: 'Security reports should be severity-ranked, acknowledged quickly, and tracked through remediation. Define expected response windows and communication updates by severity.',
        },
        {
          heading: 'Safe testing expectations',
          body: 'Testing must avoid service disruption and data exposure. Include clearly documented out-of-scope targets, prohibited techniques, and contact paths for urgent active incidents.',
        },
      ]}
      highlights={['Coordinated disclosure', 'Severity triage', 'Patch workflow', 'Response tracking']}
      quickLinks={[
        { label: 'Trust Hub', href: '/support/trust-hub' },
        { label: 'System Status', href: '/support/system-status' },
      ]}
      featureCards={[
        { title: 'Trust Hub', body: 'Review security, privacy, and compliance transparency resources.', href: '/support/trust-hub', cta: 'Open trust hub' },
      ]}
      ctaLabel="Go to Help Center"
      ctaHref="/support/help-center"
    />
  );
}

export function ResourcesBlogPage() {
  return (
    <InfoPageTemplate
      eyebrow="Resources"
      title="Blog"
      subtitle="Product announcements, platform updates, and deep technical stories."
      sections={[
        {
          heading: 'Latest updates',
          body: 'The blog stream should feature launch posts, roadmap updates, changelogs, and critical platform notices. Keep categories clear so users can filter between product, engineering, and security content.',
        },
        {
          heading: 'Engineering deep dives',
          body: 'Long-form technical posts should explain architecture decisions, performance improvements, and reliability lessons learned from production workloads.',
        },
        {
          heading: 'Operational communications',
          body: 'Use this section to publish proactive notices during incidents, maintenance windows, and major service milestones linked to System Status.',
        },
      ]}
      highlights={['Announcements', 'Engineering posts', 'Security writeups', 'Release updates']}
      quickLinks={[
        { label: 'Case Studies', href: '/resources/case-studies' },
        { label: 'Webinars', href: '/resources/webinars' },
      ]}
      featureCards={[
        { title: 'Case Studies', body: 'See measurable outcomes from real deployments and migration programs.', href: '/resources/case-studies', cta: 'Read case studies' },
        { title: 'Webinars', body: 'Watch product walkthroughs and architecture deep-dives from experts.', href: '/resources/webinars', cta: 'Watch webinars' },
      ]}
      ctaLabel="Browse Webinars"
      ctaHref="/resources/webinars"
    />
  );
}

export function ResourcesCaseStudiesPage() {
  return (
    <InfoPageTemplate
      eyebrow="Resources"
      title="Case Studies"
      subtitle="Customer outcomes, migration journeys, and architecture patterns."
      sections={[
        {
          heading: 'Industry success stories',
          body: 'Showcase customer implementations across SaaS, eCommerce, public sector, media, and financial services with measurable before/after performance and security outcomes.',
        },
        {
          heading: 'Implementation patterns',
          body: 'Document rollout plans, phased migrations, and reference architectures so teams can map real deployments to their own environments.',
        },
        {
          heading: 'Business impact',
          body: 'Highlight cost optimization, reduced attack exposure, improved reliability, and faster global performance with quantified outcomes.',
        },
      ]}
      highlights={['Industry examples', 'Architecture patterns', 'Business outcomes', 'Migration stories']}
      quickLinks={[
        { label: 'Solutions', href: '/solutions' },
        { label: 'Enterprise', href: '/enterprise' },
      ]}
      featureCards={[
        { title: 'Enterprise', body: 'Explore enterprise-ready deployment patterns and controls.', href: '/enterprise', cta: 'See enterprise' },
      ]}
      ctaLabel="Explore Solutions"
      ctaHref="/solutions"
    />
  );
}

export function ResourcesWebinarsPage() {
  return (
    <InfoPageTemplate
      eyebrow="Resources"
      title="Webinars"
      subtitle="Live and on-demand sessions for architecture, security, and product walkthroughs."
      sections={[
        {
          heading: 'Upcoming sessions',
          body: 'Feature scheduled webinars by topic, audience, and product area so customers can register based on their implementation stage.',
        },
        {
          heading: 'On-demand library',
          body: 'Maintain a searchable library of past sessions with clear tags for Zero Trust, application security, developer platform, and network services.',
        },
        {
          heading: 'Expert Q&A',
          body: 'Include session recaps and common follow-up questions with links to docs and support articles for continued self-serve learning.',
        },
      ]}
      highlights={['Recorded sessions', 'Technical demos', 'Best practices', 'Q&A sessions']}
      quickLinks={[
        { label: 'Documentation', href: '/resources/documentation' },
        { label: 'Community', href: '/resources/community' },
      ]}
      featureCards={[
        { title: 'Documentation', body: 'Follow implementation guides aligned to each webinar track.', href: '/resources/documentation', cta: 'Open docs' },
      ]}
      ctaLabel="See Documentation"
      ctaHref="/resources/documentation"
    />
  );
}

export function ResourcesDocumentationPage() {
  return (
    <InfoPageTemplate
      eyebrow="Resources"
      title="Documentation"
      subtitle="Product guides, API references, and deployment runbooks."
      sections={[
        {
          heading: 'Quick starts',
          body: 'Provide short implementation paths for common outcomes such as enabling WAF, onboarding Zero Trust, deploying Workers, and configuring DNS.',
        },
        {
          heading: 'Reference docs',
          body: 'Maintain complete API and configuration references with examples, expected responses, and operational caveats for production use.',
        },
        {
          heading: 'Troubleshooting guides',
          body: 'Organize diagnostics by symptom and product with clear remediation steps, known limitations, and links to support escalation when needed.',
        },
      ]}
      highlights={['Quick starts', 'API references', 'Code examples', 'Troubleshooting']}
      quickLinks={[
        { label: 'Developer Platform', href: '/developers' },
        { label: 'Help Center', href: '/support/help-center' },
      ]}
      featureCards={[
        { title: 'Developers', body: 'Build and deploy globally with Workers, Pages, R2, and D1.', href: '/developers', cta: 'Explore platform' },
      ]}
      ctaLabel="Open Developer Platform"
      ctaHref="/developers"
    />
  );
}

export function ResourcesCommunityPage() {
  return (
    <InfoPageTemplate
      eyebrow="Resources"
      title="Community"
      subtitle="Discussion channels, peer support, and collaborative learning spaces."
      sections={[
        {
          heading: 'Community channels',
          body: 'Direct users to discussion forums and social channels where they can share use cases, ask questions, and discover product updates.',
        },
        {
          heading: 'Peer support',
          body: 'Community-led troubleshooting helps users unblock faster; include curated threads and accepted answers for frequently seen issues.',
        },
        {
          heading: 'Feedback loop',
          body: 'Capture product feedback and feature requests with clear pathways to report issues and suggestions for roadmap consideration.',
        },
      ]}
      highlights={['Discussion hubs', 'Peer support', 'Shared templates', 'Feature requests']}
      quickLinks={[
        { label: 'Blog', href: '/resources/blog' },
        { label: 'Support', href: '/support/help-center' },
      ]}
      featureCards={[
        { title: 'Support Center', body: 'Escalate unresolved issues with structured troubleshooting context.', href: '/support/help-center', cta: 'Get support' },
      ]}
      ctaLabel="Go to Support"
      ctaHref="/support/help-center"
    />
  );
}

export function CompanyAboutPage() {
  return (
    <InfoPageTemplate
      eyebrow="Company"
      title="About Us"
      subtitle="Mission, principles, and company story behind the platform."
      sections={[
        {
          heading: 'Mission and values',
          body: 'This section presents the company mission, operating values, and long-term vision for building a safer, faster, and more resilient Internet.',
        },
        {
          heading: 'Global footprint',
          body: 'Summarize where teams operate, how the company supports global customers, and how distributed teams deliver reliable operations.',
        },
        {
          heading: 'Leadership and governance',
          body: 'Provide executive leadership context and governance practices that guide strategic decisions, product investment, and customer trust.',
        },
      ]}
      highlights={['Mission', 'Values', 'Platform vision', 'Internet impact']}
      quickLinks={[
        { label: 'Careers', href: '/company/careers' },
        { label: 'Press', href: '/company/press' },
      ]}
      featureCards={[
        { title: 'Careers', body: 'Join teams building platform security, performance, and reliability.', href: '/company/careers', cta: 'See roles' },
        { title: 'Impact', body: 'Explore programs advancing a safer and more resilient Internet.', href: '/company/impact', cta: 'View impact' },
      ]}
      ctaLabel="View Impact"
      ctaHref="/company/impact"
    />
  );
}

export function CompanyCareersPage() {
  return (
    <InfoPageTemplate
      eyebrow="Company"
      title="Careers"
      subtitle="Open roles, hiring process, and growth opportunities across teams."
      sections={[
        {
          heading: 'Open roles',
          body: 'List opportunities by function, location, and seniority. Include role expectations and team impact to help candidates self-qualify quickly.',
        },
        {
          heading: 'Hiring process',
          body: 'Outline each interview stage, communication timelines, and evaluation focus so applicants can prepare effectively and have a transparent experience.',
        },
        {
          heading: 'Culture and growth',
          body: 'Describe team culture, learning programs, and career growth pathways with examples of mentorship, ownership, and cross-functional collaboration.',
        },
      ]}
      highlights={['Open roles', 'Culture principles', 'Hiring process', 'Growth paths']}
      quickLinks={[
        { label: 'About Us', href: '/company/about' },
        { label: 'Impact', href: '/company/impact' },
      ]}
      featureCards={[
        { title: 'About Us', body: 'Learn mission, values, and how teams collaborate globally.', href: '/company/about', cta: 'Read about' },
      ]}
      ctaLabel="Read About Us"
      ctaHref="/company/about"
    />
  );
}

export function CompanyPressPage() {
  return (
    <InfoPageTemplate
      eyebrow="Company"
      title="Press"
      subtitle="Press releases, media assets, and official communications."
      sections={[
        {
          heading: 'Press releases',
          body: 'Publish official announcements covering launches, partnerships, and major company milestones with publication dates and media contact details.',
        },
        {
          heading: 'Media resources',
          body: 'Provide downloadable brand assets, executive bios, and company fact sheets for journalists and partners covering the business.',
        },
        {
          heading: 'Coverage and statements',
          body: 'Curate major media mentions and official responses to critical events with verified and consistent communications.',
        },
      ]}
      highlights={['Press releases', 'Media assets', 'Executive quotes', 'Coverage highlights']}
      quickLinks={[
        { label: 'Investors', href: '/company/investors' },
        { label: 'Blog', href: '/resources/blog' },
      ]}
      featureCards={[
        { title: 'Investor Updates', body: 'Access investor-facing materials and governance information.', href: '/company/investors', cta: 'View investors' },
      ]}
      ctaLabel="Read Blog"
      ctaHref="/resources/blog"
    />
  );
}

export function CompanyInvestorsPage() {
  return (
    <InfoPageTemplate
      eyebrow="Company"
      title="Investors"
      subtitle="Investor updates, governance materials, and financial disclosures."
      sections={[
        {
          heading: 'Financial reports',
          body: 'This page should provide quarterly and annual reporting documents, earnings materials, and webcast details in a clear chronological archive.',
        },
        {
          heading: 'Governance',
          body: 'Include board structure, committee details, governance policies, and key compliance documents for shareholders and analysts.',
        },
        {
          heading: 'Investor communications',
          body: 'Maintain current investor presentations, event schedules, and official updates related to performance and long-term strategy.',
        },
      ]}
      highlights={['Reports', 'Governance info', 'Earnings updates', 'Investor resources']}
      quickLinks={[
        { label: 'Press', href: '/company/press' },
        { label: 'About Us', href: '/company/about' },
      ]}
      featureCards={[
        { title: 'Press Center', body: 'Stay current with company announcements and official media updates.', href: '/company/press', cta: 'Open press' },
      ]}
      ctaLabel="View Press"
      ctaHref="/company/press"
    />
  );
}

export function CompanyImpactPage() {
  return (
    <InfoPageTemplate
      eyebrow="Company"
      title="Impact"
      subtitle="Programs and initiatives designed to protect and strengthen the Internet."
      sections={[
        {
          heading: 'Public interest programs',
          body: 'Highlight support programs for vulnerable organizations, independent journalism, and critical infrastructure resilience.',
        },
        {
          heading: 'Security and safety initiatives',
          body: 'Describe initiatives focused on abuse prevention, coordinated defense, and response support for high-risk organizations and communities.',
        },
        {
          heading: 'Community outcomes',
          body: 'Share measurable impact through case examples and annual reports demonstrating practical outcomes of these initiatives.',
        },
      ]}
      highlights={['Public-interest programs', 'Digital resilience', 'Security initiatives', 'Community outcomes']}
      quickLinks={[
        { label: 'About Us', href: '/company/about' },
        { label: 'Trust Hub', href: '/support/trust-hub' },
      ]}
      featureCards={[
        { title: 'Trust Hub', body: 'Review transparency resources tied to security and privacy posture.', href: '/support/trust-hub', cta: 'Open trust hub' },
      ]}
      ctaLabel="Visit Why Apexlyn"
      ctaHref="/why-cloudflare"
    />
  );
}

export function SupportHelpCenterPage() {
  return (
    <InfoPageTemplate
      eyebrow="Support"
      title="Help Center"
      subtitle="Troubleshooting guidance, product docs, and support escalation paths."
      sections={[
        {
          heading: 'Get started support',
          body: 'Provide guided setup flows and baseline configuration checks for common products so teams can launch quickly with fewer support tickets.',
        },
        {
          heading: 'Troubleshooting pathways',
          body: 'Organize common issues by symptom with diagnostic steps, known causes, and next actions to reduce resolution time.',
        },
        {
          heading: 'Escalation and contact',
          body: 'Define when and how to escalate incidents, required ticket context, and expected response windows by support tier.',
        },
      ]}
      highlights={['Setup support', 'Common fixes', 'Escalation path', 'Support channels']}
      quickLinks={[
        { label: 'System Status', href: '/support/system-status' },
        { label: 'Documentation', href: '/resources/documentation' },
      ]}
      featureCards={[
        { title: 'Status Page', body: 'Track live incident and maintenance updates across services.', href: '/support/system-status', cta: 'View status' },
      ]}
      ctaLabel="View System Status"
      ctaHref="/support/system-status"
    />
  );
}

export function SupportSystemStatusPage() {
  return (
    <InfoPageTemplate
      eyebrow="Support"
      title="System Status"
      subtitle="Service health, incidents, and planned maintenance updates."
      sections={[
        {
          heading: 'Current service health',
          body: 'Track core platform status by service area, region, and severity level with timestamped updates for operational visibility.',
        },
        {
          heading: 'Incident history',
          body: 'Provide historical incident timelines with root cause summaries and remediation details for transparency and post-incident learning.',
        },
        {
          heading: 'Maintenance communication',
          body: 'List upcoming maintenance windows, expected impact, and mitigation guidance so teams can plan operationally.',
        },
      ]}
      highlights={['Operational status', 'Incident timeline', 'Maintenance notices', 'Recovery updates']}
      quickLinks={[
        { label: 'Help Center', href: '/support/help-center' },
        { label: 'Trust Hub', href: '/support/trust-hub' },
      ]}
      featureCards={[
        { title: 'Compliance', body: 'Review controls and assurance documentation tied to operations.', href: '/support/compliance', cta: 'See compliance' },
      ]}
      ctaLabel="View Compliance"
      ctaHref="/support/compliance"
    />
  );
}

export function SupportCompliancePage() {
  return (
    <InfoPageTemplate
      eyebrow="Support"
      title="Compliance"
      subtitle="Standards coverage, audit readiness, and governance controls."
      sections={[
        {
          heading: 'Standards and certifications',
          body: 'Summarize coverage across key frameworks and standards with references to control objectives and scope boundaries.',
        },
        {
          heading: 'Audit and assurance',
          body: 'Document independent assurance practices, report availability, and evidence request pathways for customer compliance teams.',
        },
        {
          heading: 'Governance controls',
          body: 'Explain policy governance, access controls, risk management, and internal review cycles that support compliance posture.',
        },
      ]}
      highlights={['Audit readiness', 'Control mapping', 'Policy governance', 'Risk documentation']}
      quickLinks={[
        { label: 'Trust Hub', href: '/support/trust-hub' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
      ]}
      featureCards={[
        { title: 'Trust Hub', body: 'Centralized security, privacy, and compliance transparency.', href: '/support/trust-hub', cta: 'Go to trust hub' },
      ]}
      ctaLabel="Visit Trust Hub"
      ctaHref="/support/trust-hub"
    />
  );
}

export function SupportTrustHubPage() {
  return (
    <InfoPageTemplate
      eyebrow="Support"
      title="Trust Hub"
      subtitle="Security, privacy, and compliance transparency resources."
      sections={[
        {
          heading: 'Security overview',
          body: 'This area should provide high-level security architecture, controls, and operational safeguards in a format suitable for evaluation and procurement.',
        },
        {
          heading: 'Privacy and compliance artifacts',
          body: 'Centralize documentation requests for privacy and compliance teams, including evidence packages and supporting materials.',
        },
        {
          heading: 'Shared trust model',
          body: 'Clarify customer and provider responsibilities for configuration, access management, and secure operations.',
        },
      ]}
      highlights={['Security overview', 'Privacy practices', 'Compliance programs', 'Trust artifacts']}
      quickLinks={[
        { label: 'Compliance', href: '/support/compliance' },
        { label: 'Cookie Preferences', href: '/support/cookie-preferences' },
      ]}
      featureCards={[
        { title: 'Cookie Preferences', body: 'Manage consent choices and data-collection preferences.', href: '/support/cookie-preferences', cta: 'Manage preferences' },
      ]}
      ctaLabel="Cookie Preferences"
      ctaHref="/support/cookie-preferences"
    />
  );
}

export function SupportCookiePreferencesPage() {
  return (
    <InfoPageTemplate
      eyebrow="Support"
      title="Cookie Preferences"
      subtitle="Cookie categories, consent controls, and preference management."
      sections={[
        {
          heading: 'Cookie categories',
          body: 'Describe essential, analytics, and optional categories with examples of what each category does and whether consent is required.',
        },
        {
          heading: 'Consent management',
          body: 'Explain how users can opt in or out, update preferences, and review prior consent selections across sessions and devices.',
        },
        {
          heading: 'Audit and transparency',
          body: 'Provide retention and logging practices for consent records and explain where users can request additional privacy information.',
        },
      ]}
      highlights={['Essential cookies', 'Analytics cookies', 'Preference controls', 'Consent records']}
      quickLinks={[
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Use', href: '/terms-of-use' },
      ]}
      featureCards={[
        { title: 'Privacy Policy', body: 'Understand data handling practices and regional privacy coverage.', href: '/privacy-policy', cta: 'Read policy' },
      ]}
      ctaLabel="Privacy Policy"
      ctaHref="/privacy-policy"
    />
  );
}

export function ResourcesIndexPage() {
  return (
    <InfoPageTemplate
      eyebrow="Resources"
      title="Resources"
      subtitle="Learning, customer stories, and technical content for every stage of adoption."
      sections={[
        {
          heading: 'Learn',
          body: 'Explore blogs, webinars, and documentation to accelerate implementation and keep teams current on product changes and best practices.',
        },
        {
          heading: 'Validate',
          body: 'Review case studies and practical architecture examples to map outcomes and deployment patterns to your environment.',
        },
        {
          heading: 'Engage',
          body: 'Join the community to ask questions, share lessons, and collaborate with peers and technical contributors.',
        },
      ]}
      highlights={['Blog', 'Case studies', 'Webinars', 'Documentation', 'Community']}
      quickLinks={[
        { label: 'Blog', href: '/resources/blog' },
        { label: 'Case Studies', href: '/resources/case-studies' },
        { label: 'Webinars', href: '/resources/webinars' },
        { label: 'Documentation', href: '/resources/documentation' },
        { label: 'Community', href: '/resources/community' },
      ]}
      featureCards={[
        { title: 'Blog', body: 'Product updates and engineering insights from the team.', href: '/resources/blog', cta: 'Go to blog' },
        { title: 'Case Studies', body: 'Real customer outcomes and architecture journeys.', href: '/resources/case-studies', cta: 'View studies' },
        { title: 'Webinars', body: 'Live and recorded sessions for teams and architects.', href: '/resources/webinars', cta: 'Watch now' },
      ]}
      ctaLabel="Read Blog"
      ctaHref="/resources/blog"
    />
  );
}

export function CompanyIndexPage() {
  return (
    <InfoPageTemplate
      eyebrow="Company"
      title="Company"
      subtitle="Company profile, leadership communications, and impact programs."
      sections={[
        {
          heading: 'Who we are',
          body: 'Get a clear overview of mission, values, and strategic focus areas that guide product investment and platform growth.',
        },
        {
          heading: 'Corporate updates',
          body: 'Access press, investor materials, and official company communications in one structured destination.',
        },
        {
          heading: 'Public impact',
          body: 'Learn how company programs support Internet resilience, public-interest organizations, and security outcomes globally.',
        },
      ]}
      highlights={['About us', 'Careers', 'Press', 'Investors', 'Impact']}
      quickLinks={[
        { label: 'About Us', href: '/company/about' },
        { label: 'Careers', href: '/company/careers' },
        { label: 'Press', href: '/company/press' },
        { label: 'Investors', href: '/company/investors' },
        { label: 'Impact', href: '/company/impact' },
      ]}
      featureCards={[
        { title: 'About Us', body: 'Mission, leadership, and company values.', href: '/company/about', cta: 'Read about us' },
        { title: 'Careers', body: 'Open opportunities and hiring pathways.', href: '/company/careers', cta: 'View careers' },
        { title: 'Investors', body: 'Financial updates and governance materials.', href: '/company/investors', cta: 'Open investors' },
      ]}
      ctaLabel="View About Us"
      ctaHref="/company/about"
    />
  );
}

export function SupportIndexPage() {
  return (
    <InfoPageTemplate
      eyebrow="Support"
      title="Support"
      subtitle="Technical guidance, status visibility, and trust/compliance resources."
      sections={[
        {
          heading: 'Resolve issues quickly',
          body: 'Use Help Center guides and troubleshooting references to address setup and runtime issues with practical, step-by-step fixes.',
        },
        {
          heading: 'Monitor reliability',
          body: 'Follow system status and incident updates to understand service availability, maintenance windows, and restoration progress.',
        },
        {
          heading: 'Review trust posture',
          body: 'Access compliance, trust, privacy, and cookie management information for security and governance stakeholders.',
        },
      ]}
      highlights={['Help Center', 'System Status', 'Compliance', 'Trust Hub', 'Cookie Preferences']}
      quickLinks={[
        { label: 'Help Center', href: '/support/help-center' },
        { label: 'System Status', href: '/support/system-status' },
        { label: 'Compliance', href: '/support/compliance' },
        { label: 'Trust Hub', href: '/support/trust-hub' },
        { label: 'Cookie Preferences', href: '/support/cookie-preferences' },
      ]}
      featureCards={[
        { title: 'Help Center', body: 'Troubleshooting and setup guides for common issues.', href: '/support/help-center', cta: 'Open help center' },
        { title: 'System Status', body: 'Real-time operational status and incident visibility.', href: '/support/system-status', cta: 'Check status' },
        { title: 'Trust Hub', body: 'Security and compliance transparency resources.', href: '/support/trust-hub', cta: 'View trust hub' },
      ]}
      ctaLabel="Open Help Center"
      ctaHref="/support/help-center"
    />
  );
}
