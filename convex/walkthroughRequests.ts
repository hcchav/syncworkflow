import { mutationGeneric } from 'convex/server';
import { v } from 'convex/values';

const utmValidator = v.object({
  utm_source: v.optional(v.string()),
  utm_medium: v.optional(v.string()),
  utm_campaign: v.optional(v.string()),
});

export const create = mutationGeneric({
  args: {
    auditPageId: v.optional(v.id('auditPages')),
    email: v.string(),
    firmName: v.optional(v.string()),
    note: v.optional(v.string()),
    source: v.string(),
    requestedAt: v.number(),
    utm: v.optional(utmValidator),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert('walkthroughRequests', args);
  },
});
