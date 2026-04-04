import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    firmId: v.id("firms"),
    slug: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    caseType: v.optional(v.string()),
    message: v.optional(v.string()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("demoLeads", args);
  },
});

export const getByFirmId = query({
  args: { firmId: v.id("firms") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("demoLeads")
      .withIndex("by_firmId", (q) => q.eq("firmId", args.firmId))
      .order("desc")
      .collect();
  },
});
