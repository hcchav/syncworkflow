# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

SyncWorkflow is a Next.js 15 marketing site that offers free website audits for California law firms. A visitor submits a URL, the backend scrapes and analyzes the site across 14 categories (SEO, accessibility, lead capture, trust signals, etc.), scores it, and generates a shareable audit report page. There is also a demo page per firm that simulates a redesigned law firm website with an AI chat receptionist.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Convex dev (backend):** `npx convex dev` (runs in a separate terminal, watches for schema/function changes)
- **Screenshots:** `node scripts/screenshot.mjs [url] [output-dir]` (uses Playwright; defaults to localhost:3000)

## Architecture

### Frontend (Next.js App Router + Tailwind v4)

- `src/app/page.tsx` — Landing page (hero, about section, audit form, CTA)
- `src/app/audit/[slug]/page.tsx` — Public audit report page (score, findings grid, gaps, quick wins)
- `src/app/audit/new/page.tsx` — Audit submission form
- `src/app/demo/[slug]/page.tsx` — Demo law firm website generated per-audit (lead form, chat widget, scheduling)
- Animations use **framer-motion** (whileInView, animated counters)
- Icons from **lucide-react**

### Backend

- `src/app/api/audit/route.ts` — Core audit engine. Fetches a URL, parses HTML for 14 boolean findings, calls Google PageSpeed API, computes score/grade/revenue gap, saves to Convex. All logic is in this single file.
- `src/app/api/chat/route.ts` — AI chat endpoint. Proxies to Claude API with a law-firm-receptionist system prompt. Used by the demo page chat widget.
- `src/app/api/send-email/route.ts` — Sends emails via Resend API.

### Data Layer (Convex)

- `convex/schema.ts` — Defines tables: `firms`, `audits`, `demoLeads`, `pageViews`
- `convex/firms.ts`, `convex/audits.ts`, etc. — Convex query/mutation functions
- Frontend reads data via `useQuery(api.audits.getByFirmId, ...)` from `convex/react`
- The audit API route writes to Convex via raw HTTP (`/api/mutation`) rather than the Convex client SDK

### Key Patterns

- Slugs are random 12-char alphanumeric strings used to identify firms/audits in URLs
- The audit scoring system: each of 14 boolean findings counts as 1 point; percentage maps to letter grade (A/B/C/D/F)
- Revenue gap is a fixed formula based on intake form presence, average case value ($5k), and assumed monthly visits (200)
- `src/components/providers/` — Convex and PostHog context providers wrapped at the layout level
- PostHog for analytics, Crisp for live chat on the marketing site

### Environment Variables

See `.env.local.example`: Convex URL, Resend API key, PostHog token, Google PageSpeed API key, Anthropic API key.

## Deployment

- Hosted on **Vercel** (`.vercel/` config present)
- Netlify config also exists (`netlify.toml`) but Vercel is primary
- Convex backend is a separate deployed service
