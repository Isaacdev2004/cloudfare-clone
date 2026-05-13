# APEXLyn v2.0 — Part 9 implementation alignment (Pricing)

**Authoritative source:** *APEXLyn Public Website — Complete Build Specification v2.0* (May 2026), **PART 9** (§40 Pricing).

**Prior slices:** Parts 1–3, 4–6, Part 7 industries, Part 8 Trust Center (linked from [`build-spec-v2-parts-1-3-alignment.md`](./build-spec-v2-parts-1-3-alignment.md)).

---

## Page shell (§40)

| § / topic | Spec | Implementation |
|-----------|------|----------------|
| §40 URL / title / H1 | `/pricing`, Pricing title, H1 **Pricing** | **`apexlyn-seo.ts`** **`/pricing`**, **`Pricing.tsx`** |
| §40.1 hero | Navy hero; eyebrow; sub copy; platform toggle (Track / Lens) | Hero + **`PlatformToggle`** in **`Pricing.tsx`** |
| §40.2 cards | Track and Lens tier cards with feature lists and CTAs | **`TRACK_PRICING_CARDS`**, **`LENS_PRICING_CARDS`** in **`apexlyn-pricing-content.ts`** |
| §40.3 compare | Feature comparison tables per platform | **`TRACK_COMPARE_CATEGORIES`**, **`LENS_COMPARE_CATEGORIES`** |
| §40.4 billing | Annual / monthly framing and footnotes | **`PRICING_BILLING_BLOCKS`** |
| §40.5 FAQ | Accordion FAQ | **`PRICING_FAQ_ITEMS`** + accordion UI in **`Pricing.tsx`** |
| CTAs | Contact and baseline assessment paths | **`/contact`**, **`/baseline`** constants in **`Pricing.tsx`** |

---

## PostHog (Pricing)

| Event | Trigger |
|-------|---------|
| `pricing_page_viewed` | Page mount |
| `pricing_platform_toggled` | Track / Lens toggle |
| `pricing_card_cta_clicked` | Tier card primary CTA |
| `pricing_compare_section_viewed` | Compare section intersection |
| `pricing_faq_opened` | FAQ item expanded |

---

## Cross-cutting gaps (Part 9)

| Topic | Status |
|-------|--------|
| §12.3 motion | Toggle and accordion use light transitions; no hero entrance animation |
| Verbatim §40 copy | **`apexlyn-pricing-content.ts`** holds tier names, features, and FAQ; spot-check if PDF is updated in writing |
| HubSpot | Pricing CTAs route to **`/contact`** and **`/baseline`** forms (Part 14); live HubSpot IDs deferred |

---

## Next PDF slice

**Parts 10+** (About, Contact, Baseline, Documentation, Resources, Legal, forms, launch) → **[build-spec-v2-parts-10-plus-alignment.md](./build-spec-v2-parts-10-plus-alignment.md)**. **HubSpot** live IDs + **`pnpm run verify:hubspot`** → **`part-15-developer-handover-checklist.md`**.
