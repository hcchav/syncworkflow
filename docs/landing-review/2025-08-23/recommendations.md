# Recommendations (Prioritized)

## P0 — Highest Impact / Low Effort
- Hero clarity + CTA above the fold
  - Ensure single primary CTA: `I want more leads at my booth` remains primary; add a secondary text link "See how it works" that scrolls to verification steps.
  - Add a short trust bar directly under CTA (logos or simple counters). You already show counters later; surface them here.
- Fix video for autoplay and LCP
  - Current `<video>` lost `poster` and overlay and added `autoPlay loop controls playsInline`. For mobile autoplay reliability add `muted` and consider removing `controls` on initial view; show custom play if needed.
  - Reinstate `poster` for better LCP and skeleton feel.
  - Compress and serve H.264 MP4 + WebM, and set `preload="metadata"`.
- Tighten benefit bullets
  - Make each bullet outcome-first and quantified. Example: "Increase sign-ups with instant QR forms" → "Capture 3× more emails in under 30 seconds".
- Reinforce offer scarcity
  - Your top banner references $1,500 value and limited spots. Mirror this by placing a small scarcity line under the hero CTA: "Only 9 spots remaining this month" (bind to `spotsLeft`).
- Mobile first checks
  - Ensure hero fits within 1.5 screens on 375px width. Reduce phone mockup height or hide one floating card on small devices.

## P1 — Medium Effort / High Impact
- Social proof density & specificity
  - Replace generic chips under the video with quantified chips (e.g., "3× higher conversions", "85% completion", "92% satisfaction").
  - Add one 2–3 sentence case study snippet with a logo near the video.
- Pricing module simplification for cold traffic
  - Collapse detailed pricing into a single "Starter" card + link to "See plans". Cold visitors should first convert to demo/trial rather than compare plans.
- Add frictionless CTA variant
  - Secondary CTA: "Get demo video" or "Text me a sample QR" — extremely low commitment.
- Form flow clarity (the animated phone)
  - Label the 3 steps explicitly above the animation: Scan → Register → Verify → Win.
  - Add subtle captions for each step to anchor comprehension.

## P2 — Supporting Improvements
- Consistency of glass cards
  - Recent changes removed `backdrop-blur` and high-contrast borders on floating cards. Reintroduce consistent `backdrop-blur-md bg-white/70 border-white/60 shadow-xl` for depth and readability.
- Accessibility
  - Ensure all interactive elements have aria-labels and sufficient contrast. Check green CTA contrast on white background.
- Performance
  - Lazy-load below-the-fold sections. Defer heavy images. Use `next/image` with proper sizes.
- SEO basics for cold email
  - Add a focused `<title>` and `<meta name="description">` targeting exhibitor lead capture. Add Open Graph/Twitter tags for when prospects share the page.

---

# Section-by-Section Notes

- `Hero` in `PromotionalLandingPage.tsx`
  - Strong headline; test alternatives (see `copy-variants.md`).
  - CTA text is good; add microcopy under it: "No credit card. 5-min setup."
- `Seamless Lead Verification`
  - Good structure; add a quick metric callout under the section title.
- `Create Excitement and Boost Interaction`
  - Restore icons or use compact badges with quantified proof.
  - Video should autoplay muted with poster and click-to-unmute.
- `Testimonials`
  - Add headshots or company logos to increase credibility; keep to 3 concise quotes.
- `Final CTA`
  - Repeat scarcity and value. Keep single primary CTA.
