/**
 * §5 — CTA destination mapping (canonical public URLs, §16).
 * Legacy paths remain reachable via redirects in App.tsx.
 */

export const CTA = {
  testYourSecurityState: '/baseline',
  platforms: '/platforms',
  contact: '/contact',
  contactTopic: (topic: string) => `/contact?topic=${encodeURIComponent(topic)}`,
  architectureOverview: '/architecture',
  requestSecurityDocumentation: '/documentation',
} as const;

const MODE_PARAM = 'mode' as const;

export function testYourSecurityStateWithMode(mode: 'track' | 'lens' | 'full'): string {
  if (mode === 'full') return CTA.testYourSecurityState;
  return `${CTA.testYourSecurityState}?${MODE_PARAM}=${mode}`;
}

export const CONTACT_TOPICS = {
  services: 'services',
  aiGovernance: 'ai-governance',
  complianceOperations: 'compliance-operations',
  industry: 'industry',
  pricing: 'pricing',
  enterprisePartnerPricing: 'enterprise-partner-pricing',
  resources: 'resources',
  frameworkGuide: 'framework-guide',
  aiBriefing: 'ai-briefing',
  careers: 'careers',
} as const;

const TOPIC_BANNER: Partial<Record<string, string>> = {
  [CONTACT_TOPICS.services]: 'Service overview and engagement',
  [CONTACT_TOPICS.aiGovernance]: 'AI governance',
  [CONTACT_TOPICS.complianceOperations]: 'Compliance operations',
  [CONTACT_TOPICS.industry]: 'Industry requirements',
  [CONTACT_TOPICS.pricing]: 'Pricing',
  [CONTACT_TOPICS.enterprisePartnerPricing]: 'Enterprise or partner proposal',
  [CONTACT_TOPICS.resources]: 'Resources and early access',
  [CONTACT_TOPICS.frameworkGuide]: 'Framework guide',
  [CONTACT_TOPICS.aiBriefing]: 'AI briefing',
  [CONTACT_TOPICS.careers]: 'Careers and hiring interest',
};

export function contactTopicLabel(topic: string | null | undefined): string | null {
  if (!topic) return null;
  return TOPIC_BANNER[topic] ?? `Topic: ${topic}`;
}

export const PLATFORM_ANCHORS = {
  trackFrameworkAlignment: '/track#framework-alignment',
  lensPolicyEnforcement: '/lens#policy-enforcement',
} as const;
