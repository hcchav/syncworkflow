# Conversion Optimization

![Promotional landing screenshot — 2025-08-24](../assets/promotional-landing-2025-08-24.webp)

<sub>Figure: Current promotional landing draft used for conversion review.</sub>

- **Primary CTA**: Current copy is strong. A/B variants to test:
  - “Get my booth results”
  - “Show me how it works (2‑min video)”
- **Frictionless CTA**: Add a low‑commitment option under primary CTA:
  - “Get demo video” (1‑field email) or “Text me a sample QR”.
- **Form**: Keep minimal required fields; show inline validation; add privacy reassurance.
- **Flow labels**: Label steps explicitly near the animation: “Scan → Register → Verify → Win”.
- **Pricing**: Default collapsed (Starter) is correct. Keep “Compare all plans” link; ensure mobile layout keeps persuasion copy close to CTA.
- **Sticky/mobile CTA**: Consider a small sticky CTA on mobile after 50% scroll: “Get demo video”.
- **Scarcity**: Mirror `{spotsLeft}` near pricing CTA and footer CTA.
- **Tracking**: Implement events per `tracking-plan.md` (CTA clicks, pricing interactions, video events).

## Expert UI/UX Review and Action Plan

Below are prioritized, actionable improvements referencing `src/components/templates/PromotionalLandingPage.tsx`.

### Priority: High (ship next)

- **Hero message density**
  - Keep the 3-bullet value stack but tighten spacing on mobile to avoid wrap fatigue.
  - Implementation: reduce vertical gap via `gap-3 md:gap-4` in the hero bullet list container.

- **Primary CTA prominence**
  - Add micro-copy under the button to reduce perceived risk: “No credit card. 2‑min setup.”
  - Implementation: a small `text-xs text-gray-500` line below the CTA block.

- **Sticky mobile CTA**
  - After 50% scroll show a compact sticky bar with CTA “Get demo video”.
  - Implementation: conditionally render a bottom-fixed bar when `scrollY / docHeight > 0.5`.

- **Social proof proximity**
  - Keep floating chips but also anchor 1–2 trust signals directly under the hero CTA for immediate reinforcement.
  - Implementation: add a subtle row with rating + “32+ shows” next to “Only 9 spots remaining”.

### Priority: Medium (next 3–5 days)

- **Image + Social Buzz (Row 1)**
  - You updated copy to “Create Social Buzz” (good). Add platform badges (IG/X/LN) to orient behavior.
  - Implementation: inline icon row with `aria-label` links; ensure `rel="noopener"` for external.

- **Video panel discoverability (Row 2)**
  - Add a short caption above the video: “Tap to unmute (0:18)”. Keeps the control clear.
  - Implementation: absolutely positioned `badge` top-left; ensure keyboard focus toggles mute via `Enter`.

- **Pricing clarity**
  - Make the “$300 off for new clients” a green pill and add an expiry countdown synced with `{spotsLeft}` to increase urgency subtly.
  - Implementation: small countdown component that freezes at 00:00 on revisit to avoid dark patterns.

- **Testimonials scannability**
  - Surface the most persuasive phrase in bold at the start of each card and trim body copy to ~140–160 chars.
  - Implementation: truncate text and wrap highlight in `<strong>`.

### Priority: Low (polish)

- **Section rhythm**
  - Add more negative space before testimonials (`mt-24 md:mt-32`) and slightly reduce space above footer CTA to keep momentum.

- **Micro-interactions**
  - Animate floating social chips with gentle `translateY` parallax on scroll for delight without distraction.

### Accessibility

- **Color contrast**
  - Verify all text over gradients meets WCAG AA. If the blue footer CTA background is < 4.5:1 against white text, darken by ~6–8%.

- **Keyboard and screen reader support**
  - Ensure the video unmute button is a real button with `aria-pressed` and `aria-label="Toggle sound"`.
  - All floating chips should be `aria-hidden="true"` if decorative.

### Performance

- **Media optimization**
  - Serve hero and section images as next-gen (`.webp/avif`) with `sizes` and `srcset` to avoid 2x cost on mobile.
  - Lazy-load below-the-fold images with `loading="lazy"` and `decoding="async"`.

- **Bundle hygiene**
  - Defer non-critical scripts and ensure no blocking fonts. Use `font-display: swap`.

### Analytics & Experimentation

- **Event coverage**
  - Ensure events per `docs/landing-review/2025-08-23/tracking-plan.md` are wired: primary CTA, secondary CTA, video play/unmute, pricing expand, testimonial scroll.

- **A/B tests to queue**
  - CTA text: “I want more leads at my booth” vs “Get more qualified leads”.
  - Social proof chip location: floating only vs floating + anchored under CTA.
  - Pricing card layout: two-column vs stacked with sticky CTA.

### Copy tweaks (suggested)

- Hero subhead: tighten to one sentence; move “3× conversions” into a highlighted chip beside the headline for immediate eye-catch.
- Social Buzz bullets: add “Use #ShowHashtag + tag @Organizer to be featured.”

---

Action owner suggestions:

- Engineering: sticky CTA, countdown, a11y attributes, lazy-load, analytics wiring.
- Design: icon set for social platforms, spacing rhythm, contrast audit.
- Marketing: copy trims, A/B hypotheses, testimonial edits.
