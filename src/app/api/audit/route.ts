import { NextRequest, NextResponse } from "next/server";

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || "";
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

const AVG_CASE_VALUE = 5000;
const AVG_MONTHLY_VISITS = 200;
const LEAD_TO_CLIENT_RATE = 0.15;

// ── Gap / Quick-Win Libraries ──────────────────────────────────
const GAP_LIBRARY: [string, string, string][] = [
  ["hasIntakeForm", "No Online Intake", "Leads can't submit cases after hours - you're losing 24/7 conversions"],
  ["hasChat", "No Live Chat", "42% of prospects expect a response within 5 minutes"],
  ["hasScheduling", "No Online Scheduling", "Prospects play phone tag instead of booking instantly"],
  ["hasMetaDesc", "Missing SEO Meta Tags", "Your pages are invisible in Google search snippets"],
  ["hasSchema", "No Schema Markup", "Missing star ratings and rich results in Google"],
  ["hasTestimonials", "No Testimonials", "No social proof - the #1 trust factor for prospects"],
  ["hasBlog", "No Blog / Content", "Missing fresh content hurts SEO and credibility"],
  ["hasAdaBasics", "ADA Non-Compliant", "Accessibility gaps create legal liability and hurt UX"],
  ["hasGbp", "No Google Business Profile", "Missing from local search and Google Maps"],
  ["hasClientPortal", "No Client Portal", "Clients can't check case status online"],
];

const WINS_LIBRARY: [string, string, string, string][] = [
  ["hasIntakeForm", "Install Clio Grow", "$49/mo", "Captures leads 24/7 with detailed case intake"],
  ["hasChat", "Add Tidio Chat", "Free tier", "AI chatbot engages visitors instantly, even at 2am"],
  ["hasScheduling", "Add Calendly", "Free tier", "Self-service booking eliminates phone tag"],
  ["hasMetaDesc", "Write Meta Descriptions", "30 min DIY", "Improves Google visibility immediately"],
  ["hasSchema", "Add Schema Markup", "$200 one-time", "Enables rich results with star ratings in Google"],
  ["hasTestimonials", "Add Testimonials Section", "1 hour DIY", "Social proof is the #1 trust factor for prospects"],
  ["hasBlog", "Start a Blog", "2 hrs/week", "Fresh content boosts SEO and establishes expertise"],
];

// ── HTML Analysis ──────────────────────────────────────────────
function analyzeHtml(html: string, url: string) {
  const h = html.toLowerCase();

  const ssl = url.startsWith("https://");

  // Intake form detection
  const formMatches = h.match(/<form[\s\S]*?<\/form>/gi) || [];
  let hasIntakeForm = false;
  let hasContactForm = false;
  const intakeKw = ["case", "injury", "accident", "incident", "describe", "what happened", "type of case", "practice area"];
  const contactKw = ["name", "email", "phone", "message"];
  for (const form of formMatches) {
    const fl = form.toLowerCase();
    if (intakeKw.some((kw) => fl.includes(kw))) hasIntakeForm = true;
    if (contactKw.filter((kw) => fl.includes(kw)).length >= 2) hasContactForm = true;
  }

  // Chat
  const chatIndicators = [
    "livechat", "live-chat", "tidio", "intercom", "drift", "hubspot",
    "zendesk", "freshchat", "olark", "tawk", "chatnow", "chatbot",
    "chat-widget", "chat_widget", "smith.ai", "ruby", "intaker", "ngage",
    "birdeye", "podium", "captorra", "leadchat", "apexchat", "jivochat",
    "chatra", "purechat", "chatlio", "kommunicate", "manychat",
    "chat.min.js", "webchat", "chat-bubble", "chat-launcher", "chat-container",
  ];
  const hasChat = chatIndicators.some((ind) => h.includes(ind));

  // Scheduling
  const schedIndicators = [
    "calendly", "acuity", "schedule", "book a consultation",
    "book an appointment", "schedule a call", "book online",
    "setmore", "clio grow", "lawmatics",
  ];
  const hasScheduling = schedIndicators.some((ind) => h.includes(ind));

  // Client portal
  const portalIndicators = ["client portal", "client login", "case status", "mycase", "portal", "client access"];
  const hasClientPortal = portalIndicators.some((ind) => h.includes(ind));

  // Blog
  const hasBlog = /(href=["'][^"']*(?:blog|news|article|resource)[^"']*["'])/i.test(html);

  // Testimonials
  const testimonialIndicators = ["testimonial", "review", "client stories", "what our clients"];
  const hasTestimonials = testimonialIndicators.some((ind) => h.includes(ind));

  // Google Business Profile
  const gbpIndicators = [
    "google.com/maps/place", "maps.google.com", "business.google.com",
    "g.page/", "goo.gl/maps", "maps.app.goo", "google reviews",
    "google-reviews", "birdeye.com", "grade.us",
  ];
  const mapIframe = /iframe[^>]*src=["'][^"']*google\.com\/maps/i.test(html);
  const hasGbp = gbpIndicators.some((ind) => h.includes(ind)) || mapIframe;

  // Social
  const socialPlatforms = ["facebook.com", "instagram.com", "linkedin.com", "twitter.com", "x.com", "youtube.com", "tiktok.com"];
  const hasSocial = socialPlatforms.some((p) => h.includes(p));

  // Meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  const hasMetaDesc = !!metaDescMatch;

  // Viewport
  const hasViewport = /meta[^>]*name=["']viewport["']/i.test(html);

  // Schema
  const schemaScripts = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  const legalSchemaTypes = ["attorney", "legalservice", "lawfirm", "lawyer", "localbusiness", "organization", "professionalservice"];
  let hasSchema = false;
  for (const script of schemaScripts) {
    const inner = script.replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "");
    try {
      const data = JSON.parse(inner);
      const types: string[] = [];
      if (Array.isArray(data)) {
        data.forEach((d: any) => d?.["@type"] && types.push(d["@type"]));
      } else if (data?.["@type"]) {
        types.push(data["@type"]);
      }
      if (types.some((t) => legalSchemaTypes.includes(t.toLowerCase()))) {
        hasSchema = true;
      }
    } catch { /* ignore */ }
  }

  // ADA basics
  const allImgs = (html.match(/<img[^>]*>/gi) || []);
  const imgsWithAlt = allImgs.filter((img) => /alt=["'][^"']+["']/i.test(img));
  const altRatio = allImgs.length === 0 ? 1 : imgsWithAlt.length / allImgs.length;
  const ariaCount = (html.match(/(?:role|aria-label)=/gi) || []).length;
  const hasAdaBasics = altRatio >= 0.8 && ariaCount >= 3;

  return {
    hasIntakeForm,
    hasChat,
    hasScheduling,
    hasContactForm,
    ssl,
    hasMetaDesc,
    hasSchema,
    hasBlog,
    hasTestimonials,
    hasGbp,
    hasViewport,
    hasAdaBasics,
    hasSocial,
    hasClientPortal,
  };
}

// ── PageSpeed ──────────────────────────────────────────────────
async function getPageSpeed(url: string): Promise<{ mobile?: number; desktop?: number }> {
  const result: { mobile?: number; desktop?: number } = {};

  for (const strategy of ["mobile", "desktop"] as const) {
    try {
      const params = new URLSearchParams({
        url,
        strategy,
        category: "performance",
      });
      if (PAGESPEED_API_KEY) params.set("key", PAGESPEED_API_KEY);
      const resp = await fetch(`${PAGESPEED_API}?${params}`, { signal: AbortSignal.timeout(30000) });
      if (!resp.ok) continue;
      const data = await resp.json();
      const score = data?.lighthouseResult?.categories?.performance?.score;
      if (score !== null && score !== undefined) {
        result[strategy] = Math.round(score * 100);
      }
    } catch { /* timeout or error, skip */ }
  }

  return result;
}

// ── Revenue Gap ────────────────────────────────────────────────
function computeRevenueGap(hasIntake: boolean): number {
  const currentRate = hasIntake ? 0.03 : 0.01;
  const improvedRate = 0.05;
  const currentClients = Math.floor(AVG_MONTHLY_VISITS * currentRate) * LEAD_TO_CLIENT_RATE;
  const improvedClients = Math.floor(AVG_MONTHLY_VISITS * improvedRate) * LEAD_TO_CLIENT_RATE;
  return Math.round((improvedClients - currentClients) * 12 * AVG_CASE_VALUE);
}

// ── Convex Mutation Helper ─────────────────────────────────────
async function convexMutation(funcName: string, args: Record<string, any>) {
  const resp = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: funcName, args, format: "json" }),
  });
  const data = await resp.json();
  if (data.status === "error") throw new Error(data.errorMessage || "Convex error");
  return data.value;
}

// ── Slug Generator ─────────────────────────────────────────────
function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// ── POST Handler ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { url, firmName, city, practiceAreas, email } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL
    if (!url.startsWith("http")) url = "https://" + url;

    // 1. Fetch the page HTML
    let html: string;
    let finalUrl: string;
    try {
      const resp = await fetch(url, {
        headers: HEADERS,
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });
      html = await resp.text();
      finalUrl = resp.url;
    } catch (e: any) {
      return NextResponse.json(
        { error: `Could not reach ${url}. Please check the URL and try again.` },
        { status: 422 }
      );
    }

    // 2. Analyze HTML
    const findings = analyzeHtml(html, finalUrl);

    // 3. PageSpeed (run in parallel, don't block on failure)
    const pagespeed = await getPageSpeed(url);

    // 4. Compute scores
    const findingValues = Object.values(findings);
    const passCount = findingValues.filter(Boolean).length;
    const total = findingValues.length;
    const pct = Math.round((passCount / total) * 100);
    const grade =
      pct >= 85 ? "A" : pct >= 70 ? "B" : pct >= 50 ? "C" : pct >= 30 ? "D" : "F";
    const revenueGap = computeRevenueGap(findings.hasIntakeForm);

    // 5. Top gaps & quick wins
    const topGaps: { title: string; description: string }[] = [];
    for (const [key, title, desc] of GAP_LIBRARY) {
      if (!(findings as any)[key]) topGaps.push({ title, description: desc });
      if (topGaps.length >= 3) break;
    }
    const quickWins: { tool: string; cost: string; description: string }[] = [];
    for (const [key, tool, cost, desc] of WINS_LIBRARY) {
      if (!(findings as any)[key]) quickWins.push({ tool, cost, description: desc });
      if (quickWins.length >= 3) break;
    }

    // 6. Generate slug & save to Convex
    const slug = generateSlug();

    // Auto-detect firm name from <title> if not provided
    if (!firmName) {
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      firmName = titleMatch ? titleMatch[1].trim().split("|")[0].split("-")[0].trim() : new URL(url).hostname;
    }

    const firmId = await convexMutation("firms:create", {
      name: firmName,
      website: url,
      city: city || "",
      practiceAreas: practiceAreas || "",
      slug,
      email: email || "",
      phone: "",
    });

    await convexMutation("audits:create", {
      firmId,
      score: passCount,
      total,
      grade,
      pct,
      revenueGap,
      screenshotUrl: "",
      mobileScreenshotUrl: "",
      findings,
      pagespeed,
      topGaps,
      quickWins,
      createdAt: Date.now(),
    });

    return NextResponse.json({
      success: true,
      slug,
      url: `/audit/${slug}`,
      demoUrl: `/demo/${slug}`,
      score: passCount,
      total,
      pct,
      grade,
    });
  } catch (err: any) {
    console.error("Audit API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
