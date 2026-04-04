import { mutation } from "./_generated/server";

export const seedSample = mutation({
  args: {},
  handler: async (ctx) => {
    const slug =
      Math.random().toString(36).substring(2, 8) +
      Math.random().toString(36).substring(2, 8);

    const firmId = await ctx.db.insert("firms", {
      name: "Michael John Richter",
      website: "http://michaelrichterlaw.com/",
      city: "Santa Clara, CA",
      practiceAreas: "Personal Injury, Workers Compensation",
      slug,
      email: "",
      phone: "",
    });

    const auditId = await ctx.db.insert("audits", {
      firmId,
      score: 4,
      total: 15,
      grade: "F",
      pct: 26,
      revenueGap: 72000,
      screenshotUrl: "",
      mobileScreenshotUrl: "",
      findings: {
        hasIntakeForm: false,
        hasChat: false,
        hasScheduling: false,
        hasContactForm: true,
        ssl: true,
        hasMetaDesc: false,
        hasSchema: false,
        hasBlog: false,
        hasTestimonials: false,
        hasGbp: false,
        hasViewport: true,
        hasAdaBasics: false,
        hasSocial: true,
        hasClientPortal: false,
        responseTimeMs: 1200,
      },
      pagespeed: {
        mobile: 45,
        desktop: 72,
      },
      googleReviews: {
        rating: 5.0,
        count: "unknown",
      },
      topGaps: [
        {
          title: "No Online Intake",
          description:
            "Leads can't submit cases after hours - you're losing 24/7 conversions",
        },
        {
          title: "No Live Chat",
          description:
            "42% of prospects expect a response within 5 minutes",
        },
        {
          title: "No Online Scheduling",
          description:
            "Prospects play phone tag instead of booking instantly",
        },
      ],
      quickWins: [
        {
          tool: "Install Clio Grow",
          cost: "$49/mo",
          description: "Captures leads 24/7 with detailed case intake",
        },
        {
          tool: "Add Tidio Chat",
          cost: "Free tier",
          description: "AI chatbot engages visitors instantly, even at 2am",
        },
        {
          tool: "Add Calendly",
          cost: "Free tier",
          description: "Self-service booking eliminates phone tag",
        },
      ],
      createdAt: Date.now(),
    });

    return { firmId, auditId, slug, url: `/audit/${slug}` };
  },
});
