# Build Specification v2.0 — Part 1 alignment notes

Authoritative source: client document **APEXLyn Public Website — Complete Build Specification v2.0** (May 2026).  
This file records **implementation status** and **gaps** for Part 1 only. Later parts will add page-level copy and [LAYER] markers.

## Implemented toward Part 1 (this codebase)

| Spec area | Status |
|-----------|--------|
| §7.2 Max content width **1200px** | Main layout containers updated from 1280px → **1200px** across `src/`. |
| §9.1 Primary hover **#172E73** | Replaced previous `#172554` for primary actions / tokens. |
| §6.1 **JetBrains Mono** | Loaded from Google Fonts; `--font-mono` + utility **`.font-apex-mono`** (use on Trust Center technical values). |
| §13.3 **Focus** | Global `:focus-visible` outline **2px solid #1E3A8A**, **2px offset**, on interactive elements. |
| §13.3 **Skip link** | **“Skip to main content”** (`.apex-skip-link`) first in `Layout`; **`main`** has **`id="main-content"`** + `tabIndex={-1}`. |
| §12.3 **No animation on first paint** | **PageHero** hero text block no longer uses entrance motion; **home hero aside** no longer fades in on load. |
| §6.2 **Prose helpers** | Optional **`.apex-prose-light`** for 680px max width, **1.7** line height, **1.5em** paragraph gap (apply where body copy should match §6 exactly). |

## Requires founder / written decision (Part 1 vs current stack)

| Spec clause | Issue |
|-------------|--------|
| **§15.1 Next.js (App Router)** | This site is **Vite + React + Wouter**, not Next.js. Migrating is a **separate project** unless the founder approves staying on Vite as a deviation. |
| **§15.2 AWS hosting** | Deployment/ops; not enforced in repo. |
| **§15.5 HubSpot Forms** | Not integrated; needs portal ID, form IDs, styling pass, privacy copy. |
| **§15.6 PostHog** | Not integrated; needs instance URL, API key, cookieless flag, event naming. |
| **§12.3 “No floating elements”** | **Framework orbit** and **cloud network** SVGs use **CSS float/bob** animations. Disabling may require static diagrams — **ask founder**. |
| **§12.3 Reduced motion** | Spec: disable **all** scroll/transition animations except hover. Current: scroll `whileInView` still runs for non–reduced-motion users; reduced-motion handling is partial — **audit** as pages are rebuilt to v2 copy. |
| **§3.9 / buzzwords** | Existing marketing copy may predate v2; **Part 2+ pages must be replaced verbatim** from the spec. |
| **§4 [LAYER 1/2/3] markers** | Arrive in later parts; developer must mark sections in code when provided. |

## Non-deviation rule (§2)

Any intentional difference from v2.0 after full paste (e.g. keeping Vite) requires **prior written approval from the founder** per §2.1.

## Next steps

Paste **Part 2** (site map / pages). We will replace headings, paragraphs, and CTAs **exactly** as written and wire [LAYER] patterns per §4.
