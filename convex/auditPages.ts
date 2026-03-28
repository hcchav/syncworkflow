import { queryGeneric } from 'convex/server';
import { v } from 'convex/values';

async function serializeAuditPage(ctx: any, auditPage: any) {
  if (!auditPage || auditPage.status !== 'live') {
    return null;
  }

  const firm = await ctx.db.get(auditPage.firmId);

  if (!firm) {
    return null;
  }

  return {
    id: String(auditPage._id),
    kind: auditPage.kind,
    slug: auditPage.slug,
    headline: auditPage.headline,
    subheadline: auditPage.subheadline,
    auditSummary: auditPage.auditSummary,
    reviewerNote: auditPage.reviewerNote,
    reviewedAt: auditPage.reviewedAt,
    ctaEmail: auditPage.ctaEmail,
    campaign: auditPage.campaign,
    curiosityBullets: auditPage.curiosityBullets,
    implementationOptions: auditPage.implementationOptions,
    findings: auditPage.findings,
    fullAuditSections: auditPage.fullAuditSections,
    firm: {
      name: firm.name,
      website: firm.website,
      location: firm.location,
      practiceArea: firm.practiceArea,
      sizeBand: firm.sizeBand,
    },
  };
}

export const getByTeaserEntry = queryGeneric({
  args: {
    slug: v.string(),
    tokenHash: v.string(),
  },
  handler: async (ctx, args) => {
    const auditPage = await ctx.db
      .query('auditPages')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .unique();

    if (!auditPage || auditPage.teaserTokenHash !== args.tokenHash) {
      return null;
    }

    return serializeAuditPage(ctx, auditPage);
  },
});

export const getByDeliveryEntry = queryGeneric({
  args: {
    slug: v.string(),
    tokenHash: v.string(),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db
      .query('auditRequests')
      .withIndex('by_access_token_hash', (q) => q.eq('accessTokenHash', args.tokenHash))
      .unique();

    if (!request || !request.auditPageId) {
      return null;
    }

    const auditPage = await ctx.db.get(request.auditPageId);

    if (!auditPage || auditPage.slug !== args.slug) {
      return null;
    }

    return serializeAuditPage(ctx, auditPage);
  },
});
