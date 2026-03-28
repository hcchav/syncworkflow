# Law Firm Audit Rebuild

This folder holds the approved rebuild plan for the new SyncWorkflow website.

The rebuild replaces the current tradeshow-oriented marketing site with a focused cold-email funnel for small law firms.

## Core Decisions

- Rebuild at the repo root.
- Do the work on the `codex/law-firm-audit-rebuild` branch.
- Use a clean replacement approach, not incremental patching of the old site.
- Remove Clerk from phase 1.
- Use Convex for data, Resend for delivery, and PostHog for analytics.
- Personalized teaser pages are private-style, unlisted pages.
- The primary teaser-page conversion is an email capture to send the full audit.
- Reply-by-email remains a fallback, not the main CTA.
- The full audit should be delivered as a private web page first, with PDF as an optional follow-up asset later.

## Phase 1 Scope

- New homepage for small law firm audit positioning.
- Private teaser page template.
- Private full-audit page template.
- Email capture flow to request the full audit.
- Convex schema and request logging.
- Resend delivery for full-audit emails.
- PostHog tracking for funnel activity.
- Vercel + Convex deployment-ready environment structure.

## Route Plan

- `/`
- `/request-audit`
- `/review/[slug]--[token]`
- `/audit/[slug]--[token]`
- `/privacy`
- `/terms`

## Funnel Summary

1. Cold email links to a private teaser page.
2. Prospect reads a short, credible teaser.
3. Prospect enters an email address to receive the full audit.
4. The request is stored in Convex and tracked in PostHog.
5. Resend emails a private full-audit link.
6. The full-audit page invites a walkthrough or direct reply.

## Phase 2 Later

- Bulk personalized page creation from CSV or JSON.
- Optional PDF generation and download.
- Internal admin UI if page volume justifies it.
- Stronger screenshot annotation workflow.
- Better reply-received attribution.
