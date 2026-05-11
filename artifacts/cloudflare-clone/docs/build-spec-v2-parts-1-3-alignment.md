# APEXLyn v2.0 — Parts 1–3 implementation alignment

**Authoritative source:** *APEXLyn Public Website — Complete Build Specification v2.0* (May 2026).  
**Purpose:** One place to verify **no cross mixing** between Part 1 (design system), Part 2 (global shell / SEO / legal plumbing), and Part 3 (homepage). Anything outside these parts is **out of scope** for this checklist.

**Follow-on:** Platform and architecture (**Parts 4–6**) → **[build-spec-v2-parts-4-6-alignment.md](./build-spec-v2-parts-4-6-alignment.md)**. Industry pages (**Part 7**) → **[build-spec-v2-part-7-industries-alignment.md](./build-spec-v2-part-7-industries-alignment.md)**. Trust Center (**Part 8**) → **[build-spec-v2-part-8-trust-alignment.md](./build-spec-v2-part-8-trust-alignment.md)**. Pricing (**Part 9**) → **[build-spec-v2-part-9-pricing-alignment.md](./build-spec-v2-part-9-pricing-alignment.md)**. About, forms, resources, legal, launch (**Parts 10+**) → **[build-spec-v2-parts-10-plus-alignment.md](./build-spec-v2-parts-10-plus-alignment.md)**.

**Stack (documented deviation from §15.1):** The repo ships as **Vite + React + Wouter + TanStack Query**, not Next.js. Behaviour is matched where the spec is framework-agnostic (routing, UI, consent, metadata injection). Features that inherently require Next (e.g. `sitemap.ts` generation) are implemented as **static files** or **client `DocumentSeo`** instead. **Written founder approval** is required per §2.1 if compliance reviews insist on Next.js by name.

---

## Part 1 — Design system & global UX rules

| § / topic | Spec requirement | Implementation / notes |
|-----------|------------------|------------------------|
| §7.2 max width | **1200px** content | `max-w-[1200px]` across layout/home; no `1280` in `src/`. |
| §9.1 primary | **#1E3A8A**, hover **#172E73** | `index.css` tokens + buttons. |
| §6.1 monospace | JetBrains Mono technical blocks | **`@fontsource/jetbrains-mono`** in `main.tsx`; `.font-apex-mono` in `index.css`. |
| §6.1 Inter | Inter 400–700 | **`@fontsource/inter`** in `main.tsx` (§22.3 / Part 2). |
| §13.3 focus | 2px **#1E3A8A**, 2px offset | Global `:focus-visible` in `index.css`. |
| §13.3 skip link | First focusable; §24 focused styling | `.apex-skip-link` → **#1E3A8A** bar when focused; `#main-content` on `<main>`. |
| §12.3 first paint | No entrance motion on critical hero | **`PageHero`** adjusted earlier; **Part 3 home hero** uses `HomeHeroEvidenceVisual` (SVG line draw only; **reduced motion** kills animation in `index.css`). |

**Part 1 gaps (unchanged / to tighten later):**

- §12.3 **Floating / decorative motion** on non-home components (e.g. orbit / network) — may still animate; Reduced-motion policy is **partial** outside Part 3 hero.
- §12.3 **whileInView** on other pages — audit when those pages are rebuilt to v2 copy.
- §15.5 **HubSpot** — forms submit via **HubSpot Forms API v3** in code (`apexlyn-form-shared.ts`); production needs portal + form IDs in env (see **`part-15-developer-handover-checklist.md`**).
- §15 deployment — not enforced in repo.

---

## Part 2 — Sitemap, global chrome, SEO, consent, assets

| § / topic | Spec requirement | Implementation / notes |
|-----------|------------------|------------------------|
| §16 routes | Canonical paths `/track`, `/lens`, `/architecture`, `/trust`, `/about`, `/baseline`, `/documentation`, etc. | **`App.tsx`** routes + **`<Redirect>`** for legacy URLs. |
| §17 header | Sticky, 72/64px, nav, dropdowns, mobile drawer | **`Layout.tsx`** (Solutions / Industries, CTAs, timings). |
| §18 footer | 4 columns, newsletter, legal bar | **`Layout.tsx`**. |
| §19 consent | Banner; cookie; PostHog only after **Accept** | **`CookieAnalyticsConsent.tsx`** + **`apexlyn-analytics-consent.ts`**. |
| §20 SEO | Title pattern, descriptions, canonical **apexlyn.com.au** | **`apexlyn-seo.ts`**, **`DocumentSeo.tsx`**, **`SITE_ORIGIN`** via env. |
| §20.6–7 | `sitemap.xml`, `robots.txt` | **`public/sitemap.xml`**, **`public/robots.txt`**. |
| §20.8 JSON-LD | Organization + Breadcrumb + WebSite (home) | Injected in **`DocumentSeo.tsx`**. |
| §21 OG / Twitter | Tags + default image | **`DocumentSeo.tsx`** + **`public/og/default.png`**. |
| §23 breadcrumbs | Below header, not on `/` | **`GlobalBreadcrumbs.tsx`**. |
| §24 skip | Focus style (navy bar) | **`index.css`** (see Part 1 table). |
| §25 icons / manifest | favicon, apple-touch, webmanifest | **`public/`** + **`index.html`** links. |
| §26 loading | Thin top bar | **`RouteLoadingBar.tsx`** + **CSS** in `index.css`. |

**Part 2 deliberate compromises:**

- **Canonical / OG** on first request for deep links: SPA sets canonical in **`DocumentSeo`** after load; server HTML defaults in **`index.html`** are home-only until JS runs.
- **PostHog**: needs **`VITE_PUBLIC_POSTHOG_KEY`** (and optional host); events no-op if no consent.
- **Founder URL**: **`VITE_PUBLIC_FOUNDER_LINKEDIN_URL`** (home §27.10) falls back to company LinkedIn.

---

## Part 3 — Homepage (`/`)

| § / topic | Spec requirement | Implementation / notes |
|-----------|------------------|------------------------|
| §27 title / H1 | Title + **H1:** “Where security becomes evidence” | **`apexlyn-seo.ts`** `HOME_TITLE`; **`Home.tsx`** single **H1**. |
| §27 meta | Meta description (Part 3 wording; length bounded by §20.2) | **`HOME_META_DESCRIPTION`** (~158 chars); **`index.html`** defaults match. |
| §27.1–27.11 | All sections hero → final CTA | **`Home.tsx`** + **`HomeHeroEvidenceVisual.tsx`** + **`HomeTrustVisuals.tsx`**. |
| §27.7 Layer 2 | Expandable blocks + **300ms**-style transition | Grid rows transition + **`homepage_layer2_expanded`** event. |
| §27.13 PostHog | Listed `homepage_*` events | **`capturePosthogEvent`** from **`apexlyn-analytics-consent.ts`**. |
| §27.12 | No **extra** JSON-LD on homepage | Only **global** schemas from **`DocumentSeo`**. |

**Part 3 copy fidelity:**

- Body copy is **verbatim** from Part 3 where pasted; meta description was **compressed** to satisfy §20.2 length (see comment in **`apexlyn-seo.ts`** if you add one).

---

## Cross-part consistency (avoid “mix-up”)

| Risk | How it’s handled |
|------|------------------|
| Part 1 colours vs Part 3 navy hero | Same tokens: **#0B1320**, **#1E3A8A**, **#1E90FF**, **#F7F9FC**, **#E5E7EB**, **#4B5563**. |
| Part 2 nav labels vs Part 3 CTAs | Nav uses **Start a Conversation** → `/contact`; home hero uses **Test your security state** → `/baseline` and **See how it works** → `/architecture` per §27.1. |
| Legacy vs canonical URLs | User-facing chrome and **`getCanonicalPath`** / SEO use **canonical** paths; old URLs **redirect** in **`App.tsx`**. |
| “Next.js-only” behaviour | Mapped to **Vite** patterns above; tracked as §15.1 deviation until migration or approval. |

---

## Launch remaining (Parts 1–3 scope only)

Parts **4–9** and **10+** are tracked in the linked alignment files above. For **this** slice (design system, global shell, homepage), what is still open before production sign-off:

- **§12.3 reduced motion** — partial outside the home hero; sitewide audit still to tighten.
- **§10.x card utilities** — not fully centralized on every inner page.
- **§15.5 HubSpot** — code + **`.env.example`** + **`pnpm run verify:hubspot`** ready; live portal + six form GUIDs are **client-supplied** (see **`part-15-developer-handover-checklist.md`**).
- **§15 deployment** — DNS/SSL, GSC, production PostHog verification (hosting + env; not enforced in repo).

**Founder / company values** (ABN, phone, notification emails, LinkedIn) are **client-confirmed** before launch; placeholders remain in **`apexlyn-company.ts`** until received.
