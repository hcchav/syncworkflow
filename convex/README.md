# Convex Setup

The frontend is wired to use a local seeded audit when `NEXT_PUBLIC_CONVEX_URL` is not configured.

To switch the site to Convex-backed personalized pages:

1. Install dependencies with `pnpm install`.
2. Authenticate and link the project with `pnpm dlx convex dev`.
3. Add `NEXT_PUBLIC_CONVEX_URL` to `.env.local` and Vercel.
4. Seed `firms` and `audits` documents using the schema in this folder.

The queries and mutations here are shaped for:

- teaser-page lookup by slug and teaser token hash
- audit request creation with per-request delivery tokens
- full-audit lookup by delivery token hash
