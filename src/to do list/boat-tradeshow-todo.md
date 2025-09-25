# Boat Tradeshow Landing Page — Dev To-Do List

**Route:** `/boat-tradeshow`  
**Goal:** Single conversion landing page.  
**Tools:** Next.js, TailwindCSS, react-hook-form + zod, Radix Accordion, next-seo, Hotjar.

---

## 0) Repo & Environment
- [ ] Add `.env.local` with:
  - `NEXT_PUBLIC_HOTJAR_ID=XXXXXXX`
  - `NEXT_PUBLIC_HOTJAR_SV=6`
  - (Optional) `NEXT_PUBLIC_VERCEL_ANALYTICS=1`
- [ ] Install if missing: `next react react-dom tailwindcss @radix-ui/react-accordion clsx zod react-hook-form next-seo`

## 1) Page Structure & Routing
- [ ] Create new page at `/boat-tradeshow`
- [ ] Sections in order:
  - Hero (video + CTA)
  - How It Works (3 steps; phone vs tablet/TV)
  - Proof / Case Study (video + stat)
  - Pricing (Sign + $2/Qualified Lead; device note)
  - FAQ (accordion)
  - Final CTA (form)

## 2) Components
- [ ] Hero.tsx — Z-pattern layout
- [ ] VideoFrame.tsx — responsive, click-to-play
- [ ] Steps.tsx — 3 cards + device icons row
- [ ] Proof.tsx — case study stat + video
- [ ] Pricing.tsx — single plan card
- [ ] FAQ.tsx — Radix Accordion
- [ ] LeadForm.tsx — form w/ react-hook-form + zod
- [ ] FinalCTA.tsx — headline + form
- [ ] CTAButton.tsx — shared yellow button style

## 3) Styling & UX
- [ ] Colors: Blue #03c4eb, Black #171717, Grey #f4f4f4, Yellow #FFDC35, White #ffffff
- [ ] Mobile-first, F/Z-pattern
- [ ] Buttons hover with shadow + slight scale
- [ ] Minimal footer; no header navigation

## 4) Content
- [ ] Create `content/boatTradeshow.ts` with constants:
  - HERO (headline, subheadline, video)
  - STEPS (3-step process + device note)
  - PROOF (stat, quote, video)
  - PRICING (bullets + device disclaimer)
  - FAQS (include device Q&A)
  - FINAL_CTA

## 5) Form & Validation
- [ ] zod schema: name (min 2), email (email), company (min 2), nextShow (enum: Soon / 30–60 days / 60–90 days / Not scheduled), notes (optional, max 300)
- [ ] Inline error messages
- [ ] POST `/api/lead` → sanitize + store/email
- [ ] Add hidden field: `source="boat-tradeshow-landing"`

## 6) Hotjar Integration
- [ ] Add `Hotjar.tsx` snippet
- [ ] Mount `<Hotjar />` in `app/layout.tsx`
- [ ] Configure in Hotjar dashboard:
  - Heatmaps for `/boat-tradeshow`
  - Recordings
  - Funnels
  - Feedback widget
- [ ] Fire custom events:
  - `view_hero_video`
  - `cta_click_hero|pricing|final`
  - `form_submit_success`
  - `faq_open_{slug}`
  - `scroll_depth_50`, `scroll_depth_90`
- [ ] Add `data-hj-suppress` to sensitive inputs

## 7) SEO
- [ ] Add `next-seo.config.ts`
- [ ] Use `<NextSeo>` in `/boat-tradeshow`
  - Title: Boat Show Lead Gen — $2 per Qualified Lead | SyncWorkflow
  - Description: Proven spin-to-win QR system from the pet industry, now tailored to boat shows.
  - Canonical: `/boat-tradeshow`
  - OpenGraph: video thumbnail
- [ ] Add JSON-LD (Service) with pay-per-result model

## 8) Performance
- [ ] Compress hero video (~720p, <15MB)
- [ ] Use poster image + click-to-play (no sound autoplay)
- [ ] Lazy-load below-the-fold sections
- [ ] Use next/image for assets
- [ ] Purge unused Tailwind classes
- [ ] Lighthouse goals: Perf ≥ 90, SEO ≥ 90, A11y ≥ 95

## 9) Accessibility
- [ ] Provide captions/transcript for video
- [ ] Semantic headings (H1 → H2, etc.)
- [ ] Labeled inputs; keyboard focus states
- [ ] Color contrast check (yellow on black)

## 10) Device Options (UI)
- [ ] How It Works / Step 1: add icons row: 📱 Attendee Phone · 💻 Tablet/TV at Booth (caption: Devices not included)
- [ ] Pricing Card: add bullet for device flexibility + footnote: Devices not provided

## 11) Admin / Ops
- [ ] Optional: CSV export endpoint `/api/lead/export`
- [ ] Optional: CRM push (Salesforce/Zapier)
- [ ] Optional: Resend/SMTP for instant lead alert

## 12) QA Checklist
- [ ] CTAs scroll to form or open Calendly
- [ ] Video loads on mobile; poster visible
- [ ] Form validation + success state tested
- [ ] Hotjar events firing + heatmap/recordings visible
- [ ] Copy consistent with phone or tablet/TV + devices not included
- [ ] 404/500 fallbacks tested

## 13) A/B Tests (Post-launch)
- [ ] Headline: “$2 per Qualified Lead” vs “Pay Only for Results”
- [ ] Hero placement: video top vs below How It Works
- [ ] CTA text: “Book a Demo” vs “Get Early Access”
- [ ] Measure in Hotjar Funnels

## 14) Deploy
- [ ] Push changes → Preview
- [ ] Review + QA
- [ ] Merge to main → Deploy to production
- [ ] Confirm Hotjar data collection on `/boat-tradeshow`
