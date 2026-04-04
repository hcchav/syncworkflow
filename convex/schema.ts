import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  firms: defineTable({
    name: v.string(),
    website: v.string(),
    city: v.optional(v.string()),
    practiceAreas: v.optional(v.string()),
    slug: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  audits: defineTable({
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
  }).index("by_firmId", ["firmId"]),

  demoLeads: defineTable({
    firmId: v.id("firms"),
    slug: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    caseType: v.optional(v.string()),
    message: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_firmId", ["firmId"])
    .index("by_slug", ["slug"]),

  pageViews: defineTable({
    auditId: v.id("audits"),
    firmId: v.id("firms"),
    slug: v.string(),
    timestamp: v.number(),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    event: v.string(), // "view" | "cta_click" | "calendly_click" | "scroll_50" | "scroll_100"
  })
    .index("by_slug", ["slug"])
    .index("by_auditId", ["auditId"])
    .index("by_event", ["event"]),
});
