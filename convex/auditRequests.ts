import { mutationGeneric } from 'convex/server';
import { v } from 'convex/values';

const utmValidator = v.object({
  utm_source: v.optional(v.string()),
  utm_medium: v.optional(v.string()),
  utm_campaign: v.optional(v.string()),
});

export const create = mutationGeneric({
  args: {
    auditPageId: v.id('auditPages'),
    email: v.string(),
    firmName: v.optional(v.string()),
    source: v.string(),
    accessTokenHash: v.string(),
    requestedAt: v.number(),
    utm: v.optional(utmValidator),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert('auditRequests', {
      ...args,
      requestType: 'full_audit',
      deliveryStatus: 'queued',
    });
  },
});

export const createFreeAuditRequest = mutationGeneric({
  args: {
    email: v.string(),
    website: v.string(),
    firmName: v.optional(v.string()),
    note: v.optional(v.string()),
    source: v.string(),
    requestedAt: v.number(),
    utm: v.optional(utmValidator),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert('auditRequests', {
      ...args,
      requestType: 'free_audit',
      deliveryStatus: 'not_applicable',
    });
  },
});

export const markSent = mutationGeneric({
  args: {
    accessTokenHash: v.string(),
    deliveredAt: v.number(),
    resendId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db
      .query('auditRequests')
      .withIndex('by_access_token_hash', (q) => q.eq('accessTokenHash', args.accessTokenHash))
      .unique();

    if (!request) {
      return null;
    }

    await ctx.db.patch(request._id, {
      deliveryStatus: 'sent',
      deliveredAt: args.deliveredAt,
      resendId: args.resendId,
    });

    return request._id;
  },
});

export const markFailed = mutationGeneric({
  args: {
    accessTokenHash: v.string(),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db
      .query('auditRequests')
      .withIndex('by_access_token_hash', (q) => q.eq('accessTokenHash', args.accessTokenHash))
      .unique();

    if (!request) {
      return null;
    }

    await ctx.db.patch(request._id, {
      deliveryStatus: 'failed',
    });

    return request._id;
  },
});
