# APEXLyn v2.0 — Parts 10+ implementation alignment

**Authoritative source:** *APEXLyn Public Website — Complete Build Specification v2.0* (May 2026), **Parts 10–15** (About, Contact, Baseline, Documentation, Resources, Legal, forms, launch ops).

**Prior slices:** Parts 1–9 (linked from [`build-spec-v2-parts-1-3-alignment.md`](./build-spec-v2-parts-1-3-alignment.md) and [`build-spec-v2-part-9-pricing-alignment.md`](./build-spec-v2-part-9-pricing-alignment.md)).

---

## Company & conversion pages

| § / topic | Spec | Implementation |
|-----------|------|----------------|
| About | `/about`, founder story, values, team | **`AboutApexlynPage.tsx`** |
| Contact | `/contact`, inquiry form, routing copy | **`ContactApexlynPage.tsx`**, **`apexlyn-form-shared.ts`** |
| Baseline | `/baseline`, assessment request form | Baseline page + shared form utilities |
| Documentation | `/documentation`, security documentation request | Documentation page + shared form utilities |
| Careers | Company careers path | **`CareersApexlynPage.tsx`**, mega-nav Company (footer omits per §18) |

---

## Resources hub

| § / topic | Spec | Implementation |
|-----------|------|----------------|
| Hub | `/resources` | **`ResourcesUnifiedPage.tsx`** |
| Categories | Whitepapers, framework guides, AI risk briefs | **`ResourcesCategoryPage.tsx`**, category routes |
| Article | Resource detail | **`ResourceArticlePage.tsx`** |
| PDF gate | Email gate modal before download | Resource cards + shared form utilities |
| Resource interest | Inline notify forms on empty sections | Footer newsletter rules + HubSpot **`apexlyn_resource_interest`** |

---

## Legal & errors

| § / topic | Spec | Implementation |
|-----------|------|----------------|
| Privacy / Terms / Cookies / Disclaimer | `/privacy`, `/terms`, `/cookies`, `/disclaimer` | **`src/pages/legal/*`**, HTML copy under **`legal/copy/`** |
| 404 | Branded not-found, PostHog `is_404` | **`not-found.tsx`**, analytics quiet mode on legal |

---

## Forms (Part 14)

| Form | HubSpot key | Status |
|------|-------------|--------|
| Contact | `apexlyn_contact` | Implemented; **live IDs deferred** |
| Baseline | `apexlyn_baseline` | Implemented; **live IDs deferred** |
| Documentation | `apexlyn_documentation` | Implemented; **live IDs deferred** |
| Newsletter (footer) | `apexlyn_newsletter` | Implemented; **live IDs deferred** |
| Resource interest | `apexlyn_resource_interest` | Implemented; **live IDs deferred** |
| PDF download | `apexlyn_pdf_download` | Implemented; **live IDs deferred** |

Shared behaviour: UTM/referrer/landing in sessionStorage, honeypot on lead forms, work-email validation where specified, blur validation, loading/timeout pattern — **`apexlyn-form-shared.ts`**.

---

## Global chrome (§17–§18)

| § / topic | Spec | Implementation |
|-----------|------|----------------|
| §17 mega-nav | Platforms / Solutions / Industries / Resources / Company | **`Layout.tsx`** (client-approved mega-nav) |
| §18 footer | Four columns + newsletter sub-footer + legal bar | **`Layout.tsx`** (Platforms, Industries, Company + contact; no Solutions/Resources hub columns) |

---

## Launch ops (Part 15)

See **[`part-15-developer-handover-checklist.md`](./part-15-developer-handover-checklist.md)** for HubSpot env, **`pnpm run verify:hubspot`**, PostHog/GSC/DNS, and founder-provided values in **`apexlyn-company.ts`**.

---

## Cross-cutting gaps (Parts 10+)

| Topic | Owner | Status |
|-------|-------|--------|
| Founder values | **Client** → dev wires | ABN, phone, email, LinkedIn — placeholders in **`apexlyn-company.ts`** until confirmed |
| HubSpot E2E | **Client** → dev verifies | Portal ID + six GUIDs; then **`pnpm run verify:hubspot`** + browser pass |
| PostHog / DNS / GSC | **Client** hosting + env → dev verifies | Part 15 checklist |
| §12.3 reduced motion | **Dev** | Partial sitewide; tighten non-home motion |
| §16 legacy routes | **Dev** (founder sign-off) | Legacy `/solutions/*` + template clone URLs still routable; audit before launch |
