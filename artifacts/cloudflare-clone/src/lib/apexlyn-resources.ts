/**
 * §50 — Resource content registry. Add new items as separate objects; templates read from here.
 * Draft items are excluded from the live site.
 */

export type ResourceCategory = 'whitepapers' | 'framework-guides' | 'ai-risk-briefs';

export type ResourceStatus = 'published' | 'draft';

export type ResourceRecord = {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  tags: string[];
  publishedDate: string;
  updatedDate: string | null;
  readingTime: number;
  /** Full article HTML (empty while only PDF / external). */
  content: string;
  featured: boolean;
  status: ResourceStatus;
  /** HubSpot / analytics tag for gated PDFs (§50.3). Optional at launch. */
  pdfUrl?: string;
};

export const APEXLN_RESOURCE_CATEGORIES: ResourceCategory[] = [
  'whitepapers',
  'framework-guides',
  'ai-risk-briefs',
];

export const RESOURCE_CATEGORY_ANCHOR: Record<ResourceCategory, string> = {
  whitepapers: 'whitepapers',
  'framework-guides': 'framework-guides',
  'ai-risk-briefs': 'ai-risk-briefs',
};

/** §47.7 PostHog `category` payload values. */
export function resourceCategoryToPosthog(
  cat: ResourceCategory,
): 'whitepapers' | 'framework_guides' | 'ai_risk_briefs' {
  if (cat === 'framework-guides') return 'framework_guides';
  if (cat === 'ai-risk-briefs') return 'ai_risk_briefs';
  return 'whitepapers';
}

export function resourceInterestHubSpotTag(cat: ResourceCategory): string {
  if (cat === 'framework-guides') return 'resource_interest_framework_guides';
  if (cat === 'ai-risk-briefs') return 'resource_interest_ai_risk_briefs';
  return 'resource_interest_whitepapers';
}

export function isResourceCategory(s: string): s is ResourceCategory {
  return (APEXLN_RESOURCE_CATEGORIES as string[]).includes(s);
}

const WHY_EVIDENCE_HTML = `
<h2 id="from-self-assessment-to-proof">From self-assessment to proof</h2>
<p>
  For years, many Australian organisations have treated compliance as a paperwork exercise: complete a questionnaire,
  attach a few screenshots, and renew a policy. That worked when the bar was low and verification was rare.
</p>
<p>
  Insurers, auditors, and regulators are now asking a harder question — not only what you claim, but what you can
  <em>show happened</em> in your environment, with evidence that holds up after the fact.
</p>

<h2 id="what-insurers-and-auditors-are-changing">What insurers and auditors are changing</h2>
<p>
  A ticked box for “MFA enabled” is not the same as evidence that MFA is enforced, monitored, and unchanged since it was
  last reviewed. When incidents occur, the distance between assertion and reality becomes a liability — and a costly one.
</p>
<blockquote>
  Evidence-led compliance means your posture can be tested without trusting a narrative assembled the week before an
  audit.
</blockquote>

<h2 id="why-immutable-verifiable-evidence-matters">Why immutable, verifiable evidence matters</h2>
<p>
  Evidence that is automated, tamper-evident, and independently verifiable shortens review cycles, reduces dispute, and
  aligns security operations with what the board and external parties actually need: defensible truth, not theatre.
</p>
<p>
  This is the shift APEXLyn exists to support — starting with practical, Australian context and extending to the
  platforms that collect and protect the evidence itself.
</p>
`.trim();

export const APEXLN_RESOURCES: ResourceRecord[] = [
  {
    slug: 'why-evidence-led-compliance-matters',
    title: 'Why Evidence-Led Compliance Matters for Australian Businesses',
    description:
      'Australian organisations have relied on self-assessment questionnaires and manual evidence compilation for compliance. Insurers, auditors, and regulators are beginning to expect more. This paper examines why evidence-led compliance — where security posture is proven through automated, immutable, independently verifiable evidence — is becoming the new standard.',
    category: 'whitepapers',
    tags: ['compliance evidence', 'insurance'],
    publishedDate: '2026-05-07',
    updatedDate: null,
    readingTime: 12,
    content: WHY_EVIDENCE_HTML,
    featured: true,
    status: 'published',
  },
  {
    slug: 'essential-eight-evidence-guide',
    title: 'Essential Eight Evidence Guide — What Your Insurer Actually Needs',
    description:
      'The ACSC Essential Eight is increasingly required by cyber insurers for Australian businesses. But what evidence do you actually need at L1, L2, and L3? This guide walks through each mitigation strategy, explains what evidence looks like at each maturity level, and shows how automated evidence collection compares to manual assessment.',
    category: 'framework-guides',
    tags: ['Essential Eight', 'Insurance'],
    publishedDate: '2026-06-15',
    updatedDate: null,
    readingTime: 15,
    content: '<p>Full guide content will be published here.</p>',
    featured: true,
    status: 'draft',
  },
  {
    slug: 'ai-governance-australian-organisations',
    title: 'AI Governance for Australian Organisations — What You Need to Know',
    description:
      'Employees are using AI tools with sensitive data — client files, patient records, financial information, legal communications. Most organisations have AI policies. Few enforce them. This brief covers the governance landscape, the regulatory direction in Australia, and practical steps for moving from policy to enforcement.',
    category: 'ai-risk-briefs',
    tags: ['AI governance', 'Privacy Act'],
    publishedDate: '2026-07-15',
    updatedDate: null,
    readingTime: 8,
    content: '<p>Full brief content will be published here.</p>',
    featured: true,
    status: 'draft',
  },
];

export function getPublishedResources(): ResourceRecord[] {
  return APEXLN_RESOURCES.filter((r) => r.status === 'published');
}

export function publishedCountByCategory(cat: ResourceCategory): number {
  return getPublishedResources().filter((r) => r.category === cat).length;
}

/** §48.2 — Header Resources dropdown when any category has ≥3 published items. */
export function shouldShowResourcesHeaderDropdown(): boolean {
  return APEXLN_RESOURCE_CATEGORIES.some((c) => publishedCountByCategory(c) >= 3);
}

function sortForListing(list: ResourceRecord[]): ResourceRecord[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.publishedDate.localeCompare(a.publishedDate);
  });
}

export function getPublishedInCategory(cat: ResourceCategory): ResourceRecord[] {
  return sortForListing(getPublishedResources().filter((r) => r.category === cat));
}

export function getPublishedResource(
  category: string,
  slug: string,
): ResourceRecord | undefined {
  if (!isResourceCategory(category)) return undefined;
  const r = APEXLN_RESOURCES.find(
    (x) => x.category === category && x.slug === slug && x.status === 'published',
  );
  return r;
}

export function getRelatedResources(current: ResourceRecord, limit = 3): ResourceRecord[] {
  const pool = getPublishedResources().filter((r) => r.slug !== current.slug);
  const same = pool.filter((r) => r.category === current.category);
  const rest = pool.filter((r) => r.category !== current.category);
  const merged = [...same, ...rest];
  return merged.slice(0, limit);
}
