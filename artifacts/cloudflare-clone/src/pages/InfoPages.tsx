import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

type InfoPageProps = {
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; body: string }>;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
};

function InfoPageTemplate({ title, subtitle, sections, highlights, ctaLabel, ctaHref }: InfoPageProps) {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <section className="bg-[#1d1f20] border-b border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto px-6 py-20">
          <p className="text-[#f6821f] text-sm font-semibold uppercase tracking-widest mb-4">Information</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">{title}</h1>
          <p className="text-[#a0aaba] text-lg max-w-3xl leading-relaxed">{subtitle}</p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.heading} className="bg-[#1d1f20] border border-white/[0.08] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-3">{section.heading}</h2>
                <p className="text-[#a0aaba] text-sm leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <aside className="h-fit bg-[#1d1f20] border border-white/[0.08] rounded-xl p-6">
            <p className="text-[11px] font-semibold text-[#f6821f] uppercase tracking-widest mb-4">Highlights</p>
            <div className="space-y-3 mb-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#f6821f] shrink-0 mt-0.5" />
                  <span className="text-[13px] text-[#a0aaba]">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold text-white bg-[#f6821f] hover:bg-[#d96f18] transition-colors"
            >
              {ctaLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

const COMMON_SECTIONS = [
  {
    heading: 'Scope',
    body: 'This page summarizes guidance and key information for this area of the Cloudflare clone. Content is presented in a concise format to keep the demo practical while still being realistic.',
  },
  {
    heading: 'How to use this page',
    body: 'Use this section as a destination for navigation links and as a placeholder for future long-form content. You can expand each page with richer policy text, FAQs, or detailed procedures.',
  },
];

export function PrivacyPolicyPage() {
  return (
    <InfoPageTemplate
      title="Privacy Policy"
      subtitle="How data is collected, used, and protected in this Cloudflare-style clone."
      sections={[
        ...COMMON_SECTIONS,
        {
          heading: 'Data handling',
          body: 'The clone does not process real customer data. If productionized, this section should document data categories, retention, legal basis, and user rights.',
        },
      ]}
      highlights={['Data minimization', 'Purpose limitation', 'Retention controls', 'User rights transparency']}
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
        ...COMMON_SECTIONS,
        {
          heading: 'Acceptable use',
          body: 'Usage should align with local laws and safe platform practices. This demo text should be replaced with jurisdiction-specific legal language before any public launch.',
        },
      ]}
      highlights={['Service boundaries', 'Acceptable use', 'Disclaimer language', 'Termination conditions']}
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
        ...COMMON_SECTIONS,
        {
          heading: 'Security intake',
          body: 'Include impact, reproducibility steps, and affected paths when filing a report. In production, provide dedicated reporting channels and SLAs.',
        },
      ]}
      highlights={['Coordinated disclosure', 'Severity triage', 'Patch workflow', 'Response tracking']}
      ctaLabel="Go to Help Center"
      ctaHref="/support/help-center"
    />
  );
}

export function ResourcesBlogPage() {
  return <InfoPageTemplate title="Blog" subtitle="Product updates, release notes, and engineering highlights." sections={COMMON_SECTIONS} highlights={['Announcements', 'Engineering posts', 'Product news', 'Launch updates']} ctaLabel="Browse Webinars" ctaHref="/resources/webinars" />;
}

export function ResourcesCaseStudiesPage() {
  return <InfoPageTemplate title="Case Studies" subtitle="Customer success stories and implementation examples." sections={COMMON_SECTIONS} highlights={['Industry examples', 'Architecture patterns', 'Business outcomes', 'Migration stories']} ctaLabel="Explore Solutions" ctaHref="/solutions" />;
}

export function ResourcesWebinarsPage() {
  return <InfoPageTemplate title="Webinars" subtitle="Live and on-demand sessions for product and architecture learning." sections={COMMON_SECTIONS} highlights={['Recorded sessions', 'Technical demos', 'Best practices', 'Q&A sessions']} ctaLabel="See Documentation" ctaHref="/resources/documentation" />;
}

export function ResourcesDocumentationPage() {
  return <InfoPageTemplate title="Documentation" subtitle="Technical references and setup guides for the platform." sections={COMMON_SECTIONS} highlights={['Quick starts', 'API references', 'Examples', 'Troubleshooting']} ctaLabel="Open Developer Platform" ctaHref="/developers" />;
}

export function ResourcesCommunityPage() {
  return <InfoPageTemplate title="Community" subtitle="Community channels, discussions, and collaboration resources." sections={COMMON_SECTIONS} highlights={['Discussion hubs', 'Peer support', 'Shared templates', 'Feature requests']} ctaLabel="Go to Support" ctaHref="/support/help-center" />;
}

export function CompanyAboutPage() {
  return <InfoPageTemplate title="About Us" subtitle="Mission, values, and high-level company overview." sections={COMMON_SECTIONS} highlights={['Mission', 'Values', 'Platform vision', 'Internet impact']} ctaLabel="View Impact" ctaHref="/company/impact" />;
}

export function CompanyCareersPage() {
  return <InfoPageTemplate title="Careers" subtitle="Opportunities, hiring principles, and team culture." sections={COMMON_SECTIONS} highlights={['Open roles', 'Culture principles', 'Hiring process', 'Growth paths']} ctaLabel="Read About Us" ctaHref="/company/about" />;
}

export function CompanyPressPage() {
  return <InfoPageTemplate title="Press" subtitle="Press kit, media resources, and recent announcements." sections={COMMON_SECTIONS} highlights={['Press releases', 'Media assets', 'Executive quotes', 'Coverage highlights']} ctaLabel="Read Blog" ctaHref="/resources/blog" />;
}

export function CompanyInvestorsPage() {
  return <InfoPageTemplate title="Investors" subtitle="Investor-facing information and financial communications." sections={COMMON_SECTIONS} highlights={['Reports', 'Governance info', 'Earnings updates', 'Investor resources']} ctaLabel="View Press" ctaHref="/company/press" />;
}

export function CompanyImpactPage() {
  return <InfoPageTemplate title="Impact" subtitle="Programs and initiatives that support a better Internet." sections={COMMON_SECTIONS} highlights={['Public-interest programs', 'Digital resilience', 'Security initiatives', 'Community outcomes']} ctaLabel="Visit Why Cloudflare" ctaHref="/why-cloudflare" />;
}

export function SupportHelpCenterPage() {
  return <InfoPageTemplate title="Help Center" subtitle="General support guidance and issue resolution pathways." sections={COMMON_SECTIONS} highlights={['Setup support', 'Common fixes', 'Escalation path', 'Support channels']} ctaLabel="View System Status" ctaHref="/support/system-status" />;
}

export function SupportSystemStatusPage() {
  return <InfoPageTemplate title="System Status" subtitle="Service health and incident visibility for key platform areas." sections={COMMON_SECTIONS} highlights={['Operational status', 'Incident timeline', 'Maintenance notices', 'Recovery updates']} ctaLabel="View Compliance" ctaHref="/support/compliance" />;
}

export function SupportCompliancePage() {
  return <InfoPageTemplate title="Compliance" subtitle="Compliance posture, standards, and governance notes." sections={COMMON_SECTIONS} highlights={['Audit readiness', 'Control mapping', 'Policy governance', 'Risk documentation']} ctaLabel="Visit Trust Hub" ctaHref="/support/trust-hub" />;
}

export function SupportTrustHubPage() {
  return <InfoPageTemplate title="Trust Hub" subtitle="Security, privacy, and compliance transparency center." sections={COMMON_SECTIONS} highlights={['Security overview', 'Privacy practices', 'Compliance programs', 'Trust artifacts']} ctaLabel="Cookie Preferences" ctaHref="/support/cookie-preferences" />;
}

export function SupportCookiePreferencesPage() {
  return <InfoPageTemplate title="Cookie Preferences" subtitle="Cookie categories and preference management information." sections={COMMON_SECTIONS} highlights={['Essential cookies', 'Analytics cookies', 'Preference controls', 'Consent records']} ctaLabel="Privacy Policy" ctaHref="/privacy-policy" />;
}
