# APEXLyn — delivery handoff: checks, visual directions, motion

Internal reference and client-facing summary. Keep product copy aligned with `apexlyn-build-instruction.ts` and `apexlyn-copy-guardrails.ts` until Trust Center / legal PDFs land.

---

## 1. Pre-delivery checks (run every handoff)

**Layout & breakpoints**

- [ ] `320px`, `375px`, `428px` — no horizontal scroll; tap targets ≥44px where interactive
- [ ] `768px`, `1024px`, `1280px+` — grid alignment, section max-width, hero two-column balance
- [ ] Platform cards: visuals contained (no overflow onto body copy); Track + Lens both checked

**Motion & accessibility**

- [ ] `prefers-reduced-motion: reduce` — no essential information only in motion; marquee/loops acceptable as decorative if paused/reduced
- [ ] No layout shift on hero first paint (CLS)

**Identity & share**

- [ ] `/favicon.svg` loads; browser tab shows mark
- [ ] OG preview: share link once on staging; image not blank; title/description match `apexlyn-seo.ts` for `/`

**Content & trust**

- [ ] No lorem, no placeholder emails/phones
- [ ] CTAs route to intended flows
- [ ] Lint + production build succeed

---

## 2. Two recommended visual directions (pick one primary; steal secondary accents)

### Direction A — **Structural precision** (evidence-grade, “SOC report on a desk”)

- Flat planes, tighter grid rhythm, hairline `#0B1320/12` rules, minimal shadow (inset borders optional on cards).
- Typography: slightly tighter heading tracking; monospace or small-caps labels for system layers (“EVIDENCE · GOVERNANCE · OPERATIONS”).
- Photography: blocked for now; reserved panels with neutral slabs if needed.
- **Best when:** Audience is audit-minded; tone is seriousness and clarity over spectacle.

### Direction B — **Luminous depth** (premium infra + modern motion)

- Radial washes and soft vignettes (`--apex-navy` / `#1E3A8A` / `#1E90FF` at low opacity); cards with inner rim light (`1px` cyan/navy tint on top edge).
- Hero and product strips get **one** soft glow; Lens sections lean on `#1E90FF` sparingly per §6 tokens.
- **Best when:** You want parity with glossy 3D marketing sites **without** a full Three.js rebuild—controlled depth beats noisy particles.

**Implementation note:** The codebase applies **Direction B** touches first (ambient hero utility, richer OG)—Direction A remains available by reducing gradients and tightening borders in `index.css` + section classes.

---

## 3. Motion spec (purposeful, restrained)

| Element | Behaviour | Timing / notes |
|---------|-----------|----------------|
| Page hero title block | Fade + 12–16px rise on load | ~0.4s, ease `[0.22, 1, 0.36, 1]`; disabled to instant settle if reduced motion |
| Section blocks (`whileInView`) | Fade-up once | Threshold once; stagger children 0.05s max |
| Marquee logos | Infinite linear scroll | Pause on hover; respect reduced-motion (slow or static) |
| SVG heroes (gauge, globe, cloud network) | Existing loop animations | Sub-second; no rapid flashing |
| Cards / primary buttons | Optional 2px lift on hover | 160ms; no bounce |

**Signature interactive (premium, one focal point):** **Shipped on home hero:** segmented **Track | Lens** control cross-fades **framework orbit** (Track/evidence framing) and **cloud network** (Lens). Reduced-motion users get instant swaps and static orbit floats.

**Avoid:** Parallax on text, scroll-jacking, autoplay video with sound, motion-only CTAs.

---

## 4. Identity layer: favicon, OG, social

- **Favicon:** SVG mark — navy field, white apex stroke, Lens dot (`#1E90FF`). **`apple-touch-icon`** currently points at the same SVG (works on many modern browsers); export **180×180 PNG** from design when you want guaranteed iOS home-screen parity.
- **OG default:** `public/og-default.svg` — dark gradient, brand bar, subtitle, subtle Lens orbit motif; keep under 200KB when exported as PNG for networks that rasterize poorly.
- **Twitter / LinkedIn:** Already `summary_large_image`; ensure staging URL absolute for testers.

---

## 5. Generic-site risk & mitigation

| Risk | Mitigation |
|------|------------|
| “Another blue SaaS template” | Own the **evidence + governance** story in H1/H2; restrict accent diversity; one signature diagram style |
| Stock Framer defaults | Custom motion curve, bespoke SVG heroes, no off-the-shelf hero video |
| Weak differentiation | Named pathways (Track vs Lens), Australian posture where true, Trust Center as proof hub (when content arrives) |
| Over-animation | Rule: if it doesn’t explain trust or flow, cut it |

---

## 6. Before Trust Center / privacy PDF

- Finish structure, motion, identity, and remaining non-legal pages.
- When master PDFs arrive: single pass on Trust Center, privacy, and cross-links—no parallel drift.
