# Phase 1 Build Plan

## Goal

Ship the first production-ready version of the new audit-first funnel for small law firms.

## App Structure

- `src/app` for routes and layouts
- `src/components/ui` for shared primitives
- `src/modules/home` for homepage sections
- `src/modules/review` for teaser and full-audit page sections
- `src/modules/request-audit` for generic request flow
- `src/lib` for env validation, analytics, tokens, and helpers
- `convex/` for schema, queries, mutations, and server actions
- `scripts/` for later page-creation utilities

## Data Model

### `firms`

- `name`
- `website`
- `location`
- `practiceAreas`
- `notes`

### `audits`

- `firmId`
- `slug`
- `status`
- `teaserTokenHash`
- `fullAuditTokenHash`
- `templateVersion`
- `headline`
- `subheadline`
- `findings`
- `fullAuditSections`
- `ctaEmail`
- `campaign`
- `createdAt`
- `updatedAt`

### `auditRequests`

- `auditId`
- `email`
- `source`
- `utm`
- `requestedAt`
- `deliveryStatus`
- `deliveredAt`
- `resendId`

### `walkthroughRequests`

- `auditId`
- `email`
- `note`
- `requestedAt`

## Privacy Model

- Personalized pages use readable slugs plus opaque tokens.
- Tokens are stored hashed, not raw.
- Teaser and full-audit pages use separate tokens.
- Personalized pages are `noindex, nofollow`.
- No personalized pages are listed in public navigation or sitemaps.

## Homepage Content Strategy

- Lead with audits, not implementation.
- Focus on missed consultations, weak intake, slow responses, and poor mobile UX.
- Explain the audit process in plain language.
- Introduce implementation as the next step after the audit.
- Keep the page short, credible, and mobile-first.

## Teaser Page Strategy

- Firm-specific hero.
- Three high-signal findings.
- Evidence previews without giving away the whole audit.
- Clear explanation of what the full audit includes.
- Primary CTA: email capture to send the full audit.
- Secondary CTA: request a walkthrough.

## Full Audit Strategy

- Delivered as a private web page by email.
- Should feel more detailed, but still easy to read on mobile.
- Ends with implementation offer and walkthrough CTA.

## Analytics Events

- `homepage_viewed`
- `request_audit_clicked`
- `request_audit_submitted`
- `teaser_viewed`
- `finding_viewed`
- `full_audit_requested`
- `full_audit_email_sent`
- `full_audit_viewed`
- `walkthrough_requested`
- `reply_fallback_clicked`

## Build Order

1. Replace repo dependencies and app scaffold.
2. Build base layout, theme, and homepage.
3. Build teaser-page template and private-page lookup flow.
4. Build full-audit request form and success state.
5. Add Convex schema, queries, and mutations.
6. Add Resend delivery.
7. Add PostHog tracking.
8. Validate locally and prepare for Vercel + Convex deployment.
