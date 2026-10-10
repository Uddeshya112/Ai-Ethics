# Beyond Autopilot

**AI Ethics, Human Trust, and the Limits of Automated Driving**

An evidence-led research website exploring driver-assistance systems, human supervision, and responsibility through three carefully bounded fatal-crash case studies.

## Current implementation

- Responsive research landing page and shared visual design system.
- Case-study overview for Handan (Gao Yaning), Williston (Joshua Brown), and Mountain View (Walter Huang).
- Evidence library with claim-classification guidance and source links.
- Research methodology and limitations.
- Conceptual Ethics Lab scenario with editable assumptions.
- Fifteen-slide interactive web presentation with keyboard navigation, source-linked speaker notes, and Markdown notes export.
- Corrections policy placeholder.
- Accessibility basics: skip link, visible focus states, semantic landmarks, responsive layouts, and reduced-motion support.

## Stack

- Next.js App Router
- React + strict TypeScript
- CSS design system (responsive, no UI framework required)
- Lucide icons
- Zod and Recharts are included for upcoming data-validation and visualization work

## Local development

Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` to `.env.local` when configuring Supabase. No credentials are required for the current public-only research slice. Never expose a Supabase service-role key to the browser.

## Research integrity

- Official findings are not interchangeable with reported claims or project interpretation.
- The Handan case retains uncertainty about details that are not established by a primary source.
- The adopted NTSB reports are linked directly: HAR-17/02 (Williston) and HAR-20/01 (Mountain View). Six corresponding claim records carry report section/page locators.
- Three selected cases do not establish population-level crash rates.
- Ethics Lab outputs are conceptual illustrations, not crash reconstructions or real-world safety predictions.
- NTSB locators have been checked against the cited report sections; all claims remain drafts pending independent editorial review. Handan claims still rely on secondary reporting pending primary Chinese-language sources.

## Roadmap

1. Add and maintain precise source locators for the reviewed NTSB claims. Full verification of the Handan case and independent editorial review remain open.
2. Source/claim schemas and integrity checks are in place. Add and maintain the correction log.
3. Integrate Supabase Auth, SSR cookies, private workspace records, and tested Row Level Security.
4. Expand visualizations. The presentation now includes source-linked presenter notes and a Markdown export.
5. Accessibility scans now run in CI across 16 public routes. Configure Vercel preview deployment after credentials and project ownership are confirmed.

## Status

Initial website slice. GitHub Actions CI runs lint, typecheck, tests, axe accessibility scans across 16 public routes, and production build. Deployment, live Supabase integration/RLS verification, full Handan primary-source research, and independent editorial review remain incomplete.


## Evidence registry and private workspace foundation

The research registry has typed source, incident, and claim records. Claim classifications separate official findings, documented facts, reported facts, project interpretations, hypotheses, and conceptual assumptions. Integrity tests check registry references and require official-report sources for claims labeled as official findings.

All claims and incidents begin in `draft` status. A live source URL is not the same as passage-level editorial verification. Do not publish a claim until its report passage, locator, context, and limitations have been reviewed.

### Supabase setup

1. Create a Supabase project and copy its URL and publishable key into `.env.local` using `.env.example`.
2. Apply `supabase/migrations/0001_init.sql` through the Supabase CLI or SQL editor.
3. Set the Supabase Auth Site URL to `http://localhost:3000` and allow the `/auth/callback` redirect URL.
4. Run `npm install`, `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.

The dashboard verifies the authenticated user on the server. Private notes, bookmarks, and saved simulations have per-user Row Level Security policies. The service-role key is never used in browser code.

### Verification status

The schema, auth routes, and tests are scaffolding for review; live Supabase redirect tests and RLS integration tests remain release gates.
