# Tracking Plan

## KPIs
- Primary: Hero CTA CTR, Lead submissions, Cost per lead (from email campaign), Qualified lead rate
- Secondary: Scroll depth to key sections, Video engagement, Button clicks per section

## Events
- view_landing { source: "cold_email", campaign_id }
- click_cta { label: "hero|final|pricing", variant }
- submit_lead { fields: name,email,phone, company?, source }
- video_event { action: play|pause|25|50|75|100, source: "customer_prize_wheel" }
- pricing_interaction { action: expand_plan|contact_click }

## Implementation Notes
- Use Next.js router to set `source=cold_email` from UTMs.
- Persist `spotsLeft` state and expose to DOM for microcopy.
- Use a client analytics SDK (e.g., PostHog/GA4) and ensure consent banner if needed.
