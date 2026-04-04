import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByFirmId = query({
  args: { firmId: v.id("firms") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("audits")
      .withIndex("by_firmId", (q) => q.eq("firmId", args.firmId))
      .order("desc")
      .first();
  },
});

export const create = mutation({
  args: {
    firmId: v.id("firms"),
    score: v.number(),
    total: v.number(),
    grade: v.string(),
    pct: v.number(),
    revenueGap: v.number(),
    screenshotUrl: v.optional(v.string()),
    mobileScreenshotUrl: v.optional(v.string()),
    findings: v.object({
      hasIntakeForm: v.boolean(),
      hasChat: v.boolean(),
      hasScheduling: v.boolean(),
      hasContactForm: v.boolean(),
      ssl: v.boolean(),
      hasMetaDesc: v.boolean(),
      hasSchema: v.boolean(),
      hasBlog: v.boolean(),
      hasTestimonials: v.boolean(),
      hasGbp: v.boolean(),
      hasViewport: v.boolean(),
      hasAdaBasics: v.boolean(),
      hasSocial: v.boolean(),
      hasClientPortal: v.boolean(),
      responseTimeMs: v.optional(v.number()),
    }),
    pagespeed: v.object({
      mobile: v.optional(v.number()),
      desktop: v.optional(v.number()),
    }),
    googleReviews: v.optional(
      v.object({
        rating: v.optional(v.number()),
        count: v.optional(v.string()),
      })
    ),
    topGaps: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
      })
    ),
    quickWins: v.array(
      v.object({
        tool: v.string(),
        cost: v.string(),
        description: v.string(),
      })
    ),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("audits", args);
  },
});
