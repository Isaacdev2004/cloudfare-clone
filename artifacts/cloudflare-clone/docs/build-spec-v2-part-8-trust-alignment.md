# APEXLyn v2.0 — Part 8 implementation alignment (Trust Center)

**Authoritative source:** *APEXLyn Public Website — Complete Build Specification v2.0* (May 2026), **PART 8** (§39 Trust Center).

**Prior slices:** Parts 1–3, 4–6, Part 7 industries (linked from [`build-spec-v2-parts-1-3-alignment.md`](./build-spec-v2-parts-1-3-alignment.md)).

---

## Page shell (§39)

| § / topic | Spec | Implementation |
|-----------|------|----------------|
| §39 URL / title / H1 | `/trust`, Trust Center title, H1 **Trust Center** | **`apexlyn-seo.ts`** **`/trust`**, **`TrustCenterPage.tsx`** |
| §39.1 hero | Navy; eyebrow; sub copy; ghost **Request security documentation** → `/documentation` | Hero section + **`DOCS_HREF`** |
| §39.2 summary | Eight at-a-glance cards | **`TRUST_SUMMARY_CARDS`** in **`apexlyn-trust-content.ts`** |
| §39.3–39.x | Residency, encryption, immutability, isolation, access, audit, retention, verification, governance, reports, operational, privacy | Tables/lists in **`apexlyn-trust-content.ts`**; rendered in **`TrustCenterPage.tsx`** |
| JSON-LD | `WebPage` + FAQ where specified | **`apexlyn-trust-schema.ts`**, **`DocumentSeo.tsx`** |

---

## PostHog (Trust)

| Event | Trigger |
|-------|---------|
| `trust_page_viewed` | Page mount |
| `trust_time_on_page` | 30s on page |
| `trust_section_viewed` | Section intersection (`data-trust-section`) |
| `trust_documentation_cta_clicked` | Documentation CTA (hero / footer) |

---

## Cross-cutting gaps (Part 8)

| Topic | Status |
|-------|--------|
| §12.3 motion | Trust page is static tables; no scroll entrance animations required |
| Verbatim §39 tables | **`apexlyn-trust-content.ts`** header notes Part 8; spot-check if PDF is updated in writing |
| HubSpot / forms | Documentation request is **`/documentation`** form (Part 14+ in PDF), not Trust page embed |

---

## Next PDF slice

**HubSpot** portal ID + six form GUIDs: **deferred** (client); run **`pnpm run verify:hubspot`** when received. **Follow-on:** Pricing (**Part 9**) → **[build-spec-v2-part-9-pricing-alignment.md](./build-spec-v2-part-9-pricing-alignment.md)**. About, Contact, Baseline, Documentation, Resources, Legal, and remaining §16 routes → **[build-spec-v2-parts-10-plus-alignment.md](./build-spec-v2-parts-10-plus-alignment.md)**.
