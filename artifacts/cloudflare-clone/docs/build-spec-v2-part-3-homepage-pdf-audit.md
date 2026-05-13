# APEXLyn v2.0 — Part 3 homepage PDF audit (§27)

**Source:** *APEXLyn Public Website — Complete Build Specification v2.0* (May 2026), **PART 3 §27** and cross-refs **§8.1**, **§10**, **§12**, **§17**.

**Implementation:** `src/pages/Home.tsx`, hero components under `src/components/hero/`, trust/card visuals under `src/components/home/`.

---

## Intentional deviations (founder / client approval)

| PDF rule | Spec text | Current behaviour | Notes |
|----------|------------|-------------------|--------|
| §27.1 hero visual | “Right column … **desktop only**, hidden on mobile and tablet”; **one** abstract interconnected visual (optional 2s line sequence, reduced-motion respected) | **Single** `HeroFrameworkOrbitVisual` in right column; column **`hidden` below `lg`** so copy is full-width on phone/tablet per PDF. **No** in-hero Track/Lens/Global tabs (not in spec). | Matches §27.1 structure. If founder again wants hero art on **mobile/tablet**, that reverts a literal PDF line — needs **written approval** per §2.1. |
| §17.1 nav | Flat: Track, Lens, Solutions, Industries, Pricing, Trust, About | Mega-nav **Platforms / Solutions / Industries / Resources / Company** | Previously client-approved; not the §17.1 flat list. |

---

## Section-by-section (§27)

| § | Topic | PDF requirement | Code status |
|---|--------|-----------------|-------------|
| §27 | Meta / H1 | Title, meta 140–160 chars, H1 sentence case | `apexlyn-seo.ts` + `Home.tsx` — aligned |
| §27.1 | Hero padding | 96px / 80px desktop; 64px / 48px mobile | `pt-16 pb-12 lg:pt-24 lg:pb-20` — aligned |
| §27.1 | Copy | Eyebrow, H1, subhead, CTAs | Verbatim in `Home.tsx` |
| §27.1 | Right visual | Abstract nodes/lines; optional 2s line animation; reduced motion | `HeroHomePlatformVisual` + orbit/cloud; **reduced motion:** orbit float disabled in `HeroFrameworkOrbitVisual`; cloud bob + spoke draw disabled in `HeroCloudNetworkVisual` |
| §27.2 | Positioning strip | Six phrases, dividers desktop only | `POSITIONING_ITEMS` — aligned |
| §27.3 | Two platforms | H2, intro paragraph, two cards, CTAs, §10.1 card chrome | Copy aligned; **card tops:** abstract Track/Lens SVGs in `HomePlatformCardVisuals.tsx`; **hover:** §10.1 shadow + lift with `motion-reduce` guard |
| §27.3 | Section padding | 96px top/bottom | `py-24` on section — aligned |
| §27.4 | How it works | H2 title, intro, five steps, arrows → / ↓ | Implemented — title matches PDF **“How evidence infrastructure works”** |
| §27.5 | Frameworks | Navy section, 8 dark cards, foot line | `FRAMEWORK_CARDS` — aligned |
| §27.6 | Industries | Six feature cards, Lucide icons 24px, copy, Learn more | `INDUSTRY_CARDS` — aligned |
| §27.7 | Trust rows | Four rows, Layer 2 expand, 300ms, chevron, border | `TRUST_ROWS` + toggle — aligned |
| §27.8–27.11 | Baseline, pricing, founder, final CTA | Copy + CTAs | Present in `Home.tsx` — spot-check if PDF is amended |
| §27.12 | JSON-LD | No extra schemas on home | Global only via `DocumentSeo` — aligned |

---

## Open items (not homepage-only)

- **HubSpot** live IDs + E2E (Part 14 / §15.5).
- **Founder values** ABN / phone in `apexlyn-company.ts` and JSON-LD `telephone` (§20.8).
- **§16-only routes** still registered in `App.tsx` (legacy template); not in §16 sitemap count of 23 — redirect/retire with founder sign-off.
- **Next.js vs Vite** (§15.1) — documented deviation.

---

## Maintenance

When the PDF is updated in writing, diff this file and `Home.tsx` constants (`POSITIONING_ITEMS`, `HOW_STEPS`, `FRAMEWORK_CARDS`, `INDUSTRY_CARDS`, `TRUST_ROWS`, `PRICING_PREVIEW`) first.
