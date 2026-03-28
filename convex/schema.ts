import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const findingValidator = v.object({
  id: v.string(),
  priority: v.union(v.literal('Immediate'), v.literal('High'), v.literal('Medium')),
  label: v.string(),
  title: v.string(),
  detail: v.string(),
  evidence: v.string(),
  impact: v.string(),
  recommendation: v.string(),
});

const fullAuditSectionValidator = v.object({
  title: v.string(),
  summary: v.string(),
  bullets: v.array(v.string()),
  implementation: v.string(),
});

export default defineSchema({
  firms: defineTable({
    name: v.string(),
    website: v.string(),
    location: v.string(),
    practiceArea: v.string(),
    sizeBand: v.string(),
    notes: v.optional(v.string()),
  }).index('by_website', ['website']),

  auditPages: defineTable({
    firmId: v.id('firms'),
    kind: v.union(v.literal('sample'), v.literal('personalized')),
    slug: v.string(),
    status: v.union(v.literal('draft'), v.literal('live'), v.literal('archived')),
    teaserTokenHash: v.optional(v.string()),
    templateVersion: v.string(),
    headline: v.string(),
    subheadline: v.string(),
    auditSummary: v.string(),
    reviewerNote: v.string(),
    reviewedAt: v.string(),
    ctaEmail: v.string(),
    campaign: v.optional(v.string()),
    bookingUrl: v.optional(v.string()),
    chatbotEnabled: v.optional(v.boolean()),
    curiosityBullets: v.array(v.string()),
    implementationOptions: v.array(v.string()),
    findings: v.array(findingValidator),
    fullAuditSections: v.array(fullAuditSectionValidator),
  })
    .index('by_slug', ['slug']),

  auditRequests: defineTable({
    auditPageId: v.optional(v.id('auditPages')),
    requestType: v.union(v.literal('free_audit'), v.literal('full_audit')),
    email: v.string(),
    website: v.optional(v.string()),
    firmName: v.optional(v.string()),
    note: v.optional(v.string()),
    source: v.string(),
    accessTokenHash: v.optional(v.string()),
    requestedAt: v.number(),
    deliveryStatus: v.union(
      v.literal('not_applicable'),
      v.literal('queued'),
      v.literal('sent'),
      v.literal('failed'),
    ),
    deliveredAt: v.optional(v.number()),
    resendId: v.optional(v.string()),
    utm: v.optional(
      v.object({
        utm_source: v.optional(v.string()),
        utm_medium: v.optional(v.string()),
        utm_campaign: v.optional(v.string()),
        }),
      ),
  })
    .index('by_access_token_hash', ['accessTokenHash'])
    .index('by_audit_page_id', ['auditPageId']),

  walkthroughRequests: defineTable({
    auditPageId: v.optional(v.id('auditPages')),
    email: v.string(),
    firmName: v.optional(v.string()),
    note: v.optional(v.string()),
    source: v.string(),
    requestedAt: v.number(),
    utm: v.optional(
      v.object({
        utm_source: v.optional(v.string()),
        utm_medium: v.optional(v.string()),
        utm_campaign: v.optional(v.string()),
      }),
    ),
  }).index('by_audit_page_id', ['auditPageId']),
});
