# APEXLyn v2.0 — Part 7 implementation alignment (Industry pages)

**Authoritative source:** *APEXLyn Public Website — Complete Build Specification v2.0* (May 2026), **PART 7** (§31 shared structure, §32–§37 per industry, §38 JSON-LD).

**Prior slices:** Parts 1–3 ([`build-spec-v2-parts-1-3-alignment.md`](./build-spec-v2-parts-1-3-alignment.md)), Parts 4–6 ([`build-spec-v2-parts-4-6-alignment.md`](./build-spec-v2-parts-4-6-alignment.md)).

---

## Shared template (§31)

| § / topic | Spec | Implementation |
|-----------|------|----------------|
| §31 layout | Hero navy; sections alternate white / `#F7F9FC`; `1200px`; 80/48px padding | **`IndustryTemplate.tsx`** `SectionShell` |
| §31 sections | Problem → Track → Lens → frameworks → how-it-works → final CTA | Config-driven; **MSP** and **insurance** variants |
| §31 CTAs | Primary **Start a conversation** → `/contact`; secondary baseline (or MSP partnership / pricing) | Per-industry **`hero.ctas`** / **`finalCta`** |
| §38 JSON-LD | `WebPage` per industry | **`apexlyn-industry-schema.ts`**, **`apexlyn-seo-industry.ts`**, **`DocumentSeo.tsx`** |

---

## Per-route map

| Route | Spec § | Config | SEO title / meta |
|-------|--------|--------|------------------|
| `/industries/healthcare` | §32 | `lib/industries/healthcare.ts` | **`INDUSTRY_SEO_ROWS.healthcare`** |
| `/industries/legal` | §33 | `legal.ts` | **`legal`** |
| `/industries/accounting` | §34 | `accounting.ts` | **`accounting`** |
| `/industries/insurance` | §35 | `insurance.ts` | **`insurance`** (no “how it works” — spec) |
| `/industries/professional-services` | §36 | `professional-services.ts` | **`professional-services`** |
| `/industries/msp-partners` | §37 | `msp-partners.ts` | **`msp-partners`** |

---

## PostHog (§32.8 pattern)

| Prefix | Example events |
|--------|----------------|
| `industry_healthcare_` | `hero_cta`, `layer2_expanded`, `lens_cta`, `final_cta` |
| `industry_legal_` | same pattern |
| `industry_accounting_` | same pattern |
| `industry_insurance_` | same pattern |
| `industry_professional_` | same pattern (spec §36.5) |
| `industry_msp_` | same pattern |

Wired in **`IndustryTemplate.tsx`** via **`config.posthogPrefix`**.

---

## Deliberate / verified notes

- **Healthcare** §32.4: optional SVG visual → **`HealthcareDataShieldVisual`** when **`showHealthcareVisual`**.
- **Insurance** §35.4: navy underwriting block → **`insuranceUnderwriting`**; **`howItWorks`** omitted (spec has no §35.6 how-it-works block).
- **MSP** §37: six feature cards, partner pricing CTA → **`mspFeatures`**, **`mspPartnerPricing`**; hero primary **Talk to us about partnership**; final secondary **Request your baseline assessment** → `/baseline` (§37.6 note).
- **Meta copy:** healthcare meta includes **Australian-built and hosted**; legal meta uses **from reaching** (§33 / §20).

---

## Next PDF slice

**Part 8** Trust → [`build-spec-v2-part-8-trust-alignment.md`](./build-spec-v2-part-8-trust-alignment.md). **Part 9** Pricing → [`build-spec-v2-part-9-pricing-alignment.md`](./build-spec-v2-part-9-pricing-alignment.md). **Parts 10+** → [`build-spec-v2-parts-10-plus-alignment.md`](./build-spec-v2-parts-10-plus-alignment.md).
