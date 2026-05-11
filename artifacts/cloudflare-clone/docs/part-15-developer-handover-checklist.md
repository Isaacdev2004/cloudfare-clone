## Part 15 — Developer handover checklist (APEXLyn)

This repo is a **Vite + React** implementation of the APEXLyn public website spec. The build spec text references Next.js, but the operational requirements (HubSpot, PostHog, GSC, DNS/SSL, diagrams) are implemented here.

### Blocked on client (HubSpot — only remaining launch item)
- **HubSpot portal ID** + **six form GUIDs** (contact, baseline, documentation, newsletter, resource interest, PDF download). Client indicated these will follow within ~4 hours of handoff (May 2026). Until then: dev may simulate; production requires live IDs or **`VITE_HUBSPOT_ALLOW_SIMULATED=true`** on staging only.

### Founder-provided values (must confirm before launch)
- **Primary site email**: (may differ from `hello@apexlyn.com.au`)
- **Form notification email(s)**: (may differ from primary email)
- **Phone number**: displayed on site + used in form success text
- **ABN**: displayed on site + injected into legal pages
- **Founder LinkedIn URL**: used on About page

Update these in `src/lib/apexlyn-company.ts` and env vars as applicable.

---

## HubSpot (Forms API v3)

### What is implemented in code
- All forms submit via **HubSpot Forms API v3** (`submitHubSpotForm()` in `src/lib/apexlyn-form-shared.ts`).
- UTM/referrer/landing attribution is captured in **sessionStorage** and appended to all non-inline forms.

### Required environment variables (do not commit)
Set these in your hosting environment:
- `VITE_HUBSPOT_PORTAL_ID`
- `VITE_HUBSPOT_FORM_APEXLYN_CONTACT`
- `VITE_HUBSPOT_FORM_APEXLYN_BASELINE`
- `VITE_HUBSPOT_FORM_APEXLYN_DOCUMENTATION`
- `VITE_HUBSPOT_FORM_APEXLYN_NEWSLETTER`
- `VITE_HUBSPOT_FORM_APEXLYN_RESOURCE_INTEREST`
- `VITE_HUBSPOT_FORM_APEXLYN_PDF_DOWNLOAD`

### HubSpot setup checklist (developer responsibility)
- Copy **`.env.example`** → **`.env.local`** (dev) and set the same keys in hosting for production
- Create HubSpot account + confirm data hosting settings if AU hosting is desired/available
- Create the 6 forms: contact, baseline, documentation, newsletter, resource interest, PDF download
- Create the custom contact properties listed in the spec (inquiry type, org type, platform interest, etc.)
- Create two deal pipelines (Baseline Assessment, Documentation Request) and automation/workflows
- Configure notification emails and priority routing workflows
- Run **`pnpm run verify:hubspot`** after IDs are set (live API smoke test for all six forms)
- Test end-to-end in the browser for all forms (confirm fields + hidden attribution fields)
- Production builds require live HubSpot IDs unless **`VITE_HUBSPOT_ALLOW_SIMULATED=true`** (dev/staging only)

---

## PostHog (consent-aware)

### What is implemented in code
- Consent cookie name: `apexlyn_analytics_consent`
- PostHog initialises **only after Accept**.
- Legal pages run in “quiet mode” (no conversion-focused capture).
- Pageviews are captured manually so `/404` includes:
  - `attempted_path`
  - `is_404: true`

### Required environment variables (do not commit)
- `VITE_PUBLIC_POSTHOG_KEY`
- `VITE_PUBLIC_POSTHOG_HOST`

### PostHog setup checklist (developer responsibility)
- Create PostHog project for `www.apexlyn.com.au`
- Verify all events in the spec are firing (master list)
- Verify consent gating:
  - Accept → PostHog initialises and captures
  - Decline → no PostHog initialisation

---

## Google Search Console
- Create the property, verify via DNS/HTML, submit sitemap, and confirm indexing.
- Confirm:
  - `robots.txt` available
  - `sitemap.xml` available
  - canonical tags correct

---

## DNS + SSL
- Configure `www.apexlyn.com.au` to hosting CDN
- Redirect apex → www
- Enforce HTTPS (HTTP → HTTPS)
- Verify certificate auto-renew

---

## Diagrams (SVG React components)
Already implemented and wired:
- Track diagram: `src/components/track/TrackEvidenceFlowDiagram.tsx`
- Lens diagram: `src/components/lens/LensEnforcementLayersDiagram.tsx`
- Architecture diagram: `src/components/architecture/SharedArchitectureDiagram.tsx`

Each is inline SVG and used in the relevant pages.

---

## Pre-launch quick verification (high-signal)
- `/404` is **noindex, nofollow** and shows the correct design
- PostHog `$pageview` on `/404` includes `attempted_path` + `is_404`
- All 6 HubSpot forms submit successfully
- Free-email blocking applies only to Contact/Baseline/Documentation (not newsletter/interest/PDF gate)
- Legal pages show automatic “Last updated” dates from git history

