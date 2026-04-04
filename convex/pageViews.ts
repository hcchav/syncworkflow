import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const record = mutation({
  args: {
    auditId: v.id("audits"),
    firmId: v.id("firms"),
    slug: v.string(),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    event: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pageViews", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pageViews")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .order("desc")
      .collect();
  },
});

export const getStats = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const views = await ctx.db
      .query("pageViews")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    return {
      totalViews: views.filter((v) => v.event === "view").length,
      ctaClicks: views.filter((v) => v.event === "cta_click").length,
      calendlyClicks: views.filter((v) => v.event === "calendly_click").length,
      lastViewed: views.length > 0 ? views[0].timestamp : null,
    };
  },
});
