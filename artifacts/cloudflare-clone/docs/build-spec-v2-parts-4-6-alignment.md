# APEXLyn v2.0 — Parts 4–6 implementation alignment

**Authoritative source:** *APEXLyn Public Website — Complete Build Specification v2.0* (May 2026), **PART 4** (§28 Track), **PART 5** (§29 Lens), **PART 6** (§30 Architecture).

**Purpose:** Track platform pages, Lens platform pages, and Architecture overview as **the next major slices after** Parts 1–3 (`build-spec-v2-parts-1-3-alignment.md`). Same stack note as Part 1 doc: **Vite + React**, not Next.js.

---

## Part 4 — Track platform (`/track`)

| § / topic | Spec requirement | Implementation |
|-----------|------------------|----------------|
| §28 | Title, meta, H1 **Compliance evidence that stands up** | `apexlyn-seo.ts` **`/track`**; hero in **`TrackPlatformPage.tsx`** |
| §28.1 | Hero, CTAs baseline + pricing, diagram desktop-only | **`TrackEvidenceFlowDiagram`** `variant="hero"` |
| §28.2 | Four outcome cards (Lucide icons per spec) | **`OUTCOME_CARDS`** |
| §28.3 | Evidence chain diagram + six Layer 2 expandables | **`TrackExpandable`** + PostHog **`track_layer2_expanded`** |
| §28.4 | Framework table (8 rows) + disclaimer | **`FRAMEWORK_ROWS`** + disclaimer copy |
| §28.5 | Connector grid (10 cards) | **`CONNECTOR_CARDS`** |
| §28.6 | Governance + expandable + visual | **`TrackGovernanceVisual`** |
| §28.7 | MSP section + link **`/industries/msp-partners`** | **`MSP_CARDS`** |
| §28.8–28.10 | Insurance, pricing preview, final CTA | Sections + PostHog **`track_*`** events |
| §28.11 | PostHog events | **`capturePosthogEvent`** names match spec list |
| §28.12 | Diagram A implementation | **`TrackEvidenceFlowDiagram.tsx`** (SVG) |
| §28.13 | `SoftwareApplication` JSON-LD | **`apexlyn-track-schema.ts`** → **`DocumentSeo.tsx`** |

**Minor verification notes (non-blocking):** §28.12 calls out exact colour tokens and hero height (~550–620px); treat as **visual QA** against the PDF if the client wants pixel parity.

---

## Part 5 — Lens platform (`/lens`)

| § / topic | Spec requirement | Implementation |
|-----------|------------------|----------------|
| §29 | Title, meta, H1, eyebrow **#1E90FF** | **`apexlyn-seo.ts`** **`/lens`**; **`LensPlatformPage.tsx`** hero |
| §29.1 | Primary **Start a conversation** → `/contact`, secondary pricing | Matches |
| §29.2 | Four outcome cards | **`OUTCOME_CARDS`** |
| §29.3 | Diagram + seven enforcement expandables | **`LensEnforcementLayersDiagram`** + **`LensEnforcementExpandable`** (`lens_enforcement_layer_expanded` / `lens_layer2_expanded`) |
| §29.4–29.12 | Integrations, pipeline, policy, forensic, audiences, pricing, final CTA, shadow AI, etc. | **`LensPlatformPage.tsx`** (full section stack) |
| §29.14 | Diagram B implementation | **`LensEnforcementLayersDiagram.tsx`** |
| §29.15 | PostHog events | Names align with spec (`lens_*`) |
| §29.16 | `SoftwareApplication` JSON-LD | **`apexlyn-lens-schema.ts`** → **`DocumentSeo.tsx`** |

**Minor verification notes:** §29.14 two-column layout detail vs hero variant — confirm in **design review** if stakeholders require exact structural parity with the PDF diagram wireframe.

---

## Part 6 — Architecture overview (`/architecture`)

| § / topic | Spec requirement | Implementation |
|-----------|------------------|----------------|
| §30 | Title, meta, H1 **Two platforms. One evidence architecture.** | **`apexlyn-seo.ts`** **`/architecture`** |
| §30.1 | Single-column hero, **no** diagram in hero | **`ArchitectureOverviewPage.tsx`** — diagram only in §30.3 |
| §30.2 | Four principle cards | **`PRINCIPLES`** |
| §30.3 | Shared diagram + three expandables | **`SharedArchitectureDiagram`** + **`ArchExpandableShell`** |
| §30.4+ | Lifecycle, residency, access tables, verification, CTAs | Same file + **`capturePosthogEvent`** `arch_*` where wired |
| Structured data | TechArticle / schema per spec | **`apexlyn-architecture-schema.ts`** → **`DocumentSeo.tsx`** |

---

## Cross-cutting gaps (Parts 4–6)

| Topic | Status |
|-------|--------|
| §12.3 reduced motion | Diagrams / scroll observers may still animate; **full audit** is sitewide backlog (see Part 1 doc). |
| Diagram “dark mode” copy in §28.12 / §29.14 | Confirm **`TrackEvidenceFlowDiagram`** / **`LensEnforcementLayersDiagram`** behaviour if the product adds a site-wide dark theme later. |

---

## Recommended next document slice

**PART 7 — Industry pages (§31–§38)** and **PART 8 — Trust Center (§39)** — see **[build-spec-v2-part-7-industries-alignment.md](./build-spec-v2-part-7-industries-alignment.md)** and **[build-spec-v2-part-8-trust-alignment.md](./build-spec-v2-part-8-trust-alignment.md)**. Subsequent PDF parts: Pricing, About, Contact, forms, resources, legal.
