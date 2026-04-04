"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  CheckCircle,
  XCircle,
  ArrowRight,
  Calendar,
  Mail,
  Lock,
  Zap,
  Globe,
  BarChart3,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";

// Map findings keys to human-readable labels and categories
const CATEGORY_MAP: {
  key: keyof Findings;
  label: string;
  group: "security" | "seo" | "leads" | "trust";
}[] = [
  { key: "ssl", label: "SSL / HTTPS", group: "security" },
  { key: "hasViewport", label: "Mobile Responsive", group: "seo" },
  { key: "hasMetaDesc", label: "SEO Meta Tags", group: "seo" },
  { key: "hasSchema", label: "Schema Markup", group: "seo" },
  { key: "hasIntakeForm", label: "Online Intake Form", group: "leads" },
  { key: "hasContactForm", label: "Contact Form", group: "leads" },
  { key: "hasChat", label: "Live Chat", group: "leads" },
  { key: "hasScheduling", label: "Online Scheduling", group: "leads" },
  { key: "hasClientPortal", label: "Client Portal", group: "leads" },
  { key: "hasBlog", label: "Blog / Content", group: "trust" },
  { key: "hasTestimonials", label: "Testimonials", group: "trust" },
  { key: "hasSocial", label: "Social Media", group: "trust" },
  { key: "hasGbp", label: "Google Business Profile", group: "trust" },
  { key: "hasAdaBasics", label: "ADA Compliance", group: "security" },
];

type Findings = {
  hasIntakeForm: boolean;
  hasChat: boolean;
  hasScheduling: boolean;
  hasContactForm: boolean;
  ssl: boolean;
  hasMetaDesc: boolean;
  hasSchema: boolean;
  hasBlog: boolean;
  hasTestimonials: boolean;
  hasGbp: boolean;
  hasViewport: boolean;
  hasAdaBasics: boolean;
  hasSocial: boolean;
  hasClientPortal: boolean;
  responseTimeMs?: number;
};

export default function AuditTeaserPage() {
  const { slug } = useParams<{ slug: string }>();
  const firm = useQuery(api.firms.getBySlug, { slug: slug ?? "" });
  const audit = useQuery(
    api.audits.getByFirmId,
    firm ? { firmId: firm._id } : "skip"
  );
  const recordView = useMutation(api.pageViews.record);
  const viewRecorded = useRef(false);
  const [showSticky, setShowSticky] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  // Record page view on mount
  useEffect(() => {
    if (firm && audit && !viewRecorded.current) {
      viewRecorded.current = true;
      recordView({
        auditId: audit._id,
        firmId: firm._id,
        slug,
        event: "view",
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      });
    }
  }, [firm, audit, slug, recordView]);

  // Count-up animation for score
  useEffect(() => {
    if (!audit) return;
    const target = audit.pct;
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayScore(target);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [audit]);

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackClick = (event: string) => {
    if (firm && audit) {
      recordView({
        auditId: audit._id,
        firmId: firm._id,
        slug,
        event,
      });
    }
  };

  if (firm === undefined || audit === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-med-gray">Loading your audit...</p>
        </div>
      </div>
    );
  }

  if (!firm || !audit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-score-amber mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-navy mb-2">
            Audit Not Found
          </h1>
          <p className="text-med-gray">
            This audit link may have expired or is invalid. Contact us for a new
            audit.
          </p>
          <Link
            href="https://calendly.com/heroncchavez/30min"
            className="inline-flex items-center gap-2 mt-6 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Request New Audit
          </Link>
        </div>
      </div>
    );
  }

  const findings = audit.findings;
  const scoreColor =
    audit.pct >= 70
      ? "#27ae60"
      : audit.pct >= 40
        ? "#e67e22"
        : "#c0392b";
  const scoreLabel =
    audit.pct >= 70 ? "Good" : audit.pct >= 40 ? "Needs Work" : "Critical";
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (audit.pct / 100) * circumference;

  // Count passes and fails
  const passCount = CATEGORY_MAP.filter((c) => findings[c.key]).length;
  const failCount = CATEGORY_MAP.length - passCount;

  // Determine which categories to reveal (first 6) vs lock (rest)
  const REVEALED_COUNT = 6;

  return (
    <main className="min-h-screen bg-light-gray">
      {/* ---- HERO / COVER SECTION ---- */}
      <section className="bg-gradient-to-br from-navy via-[#132e5c] to-blue text-white">
        {/* FIX #2: Tighter mobile padding, smaller ring on mobile */}
        <div className="max-w-4xl mx-auto px-6 py-8 md:py-10 pb-10 md:pb-14">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm">SyncWorkflow</span>
            </div>
            <span className="text-xs text-blue-300 uppercase tracking-wider font-medium">
              Website Health Report
            </span>
          </div>

          {/* Title + Score — side by side even on mobile */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-blue-300 text-xs md:text-sm mb-1 font-medium">Prepared for</p>
              <h1 className="text-2xl md:text-4xl font-bold mb-1 truncate">
                {firm.name}
              </h1>
              <p className="text-blue-200/70 text-xs md:text-sm flex items-center gap-1.5">
                <Globe className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
                <span className="truncate">{firm.website}</span>
              </p>
              <p className="text-blue-300/50 text-xs mt-1">
                {new Date(audit.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Score ring — smaller on mobile */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-20 h-20 md:w-28 md:h-28">
                <svg className="w-20 h-20 md:w-28 md:h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r={radius}
                    fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7"
                  />
                  <circle
                    cx="50" cy="50" r={radius}
                    fill="none" stroke={scoreColor} strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - strokeDash}
                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-white">{displayScore}</span>
                  <span className="text-[9px] md:text-[10px] text-blue-300 font-medium uppercase tracking-wide">
                    / 100
                  </span>
                </div>
              </div>
              <span
                className="text-[10px] md:text-xs font-semibold mt-1 md:mt-2 px-2 md:px-3 py-0.5 rounded-full"
                style={{ backgroundColor: scoreColor + "30", color: scoreColor }}
              >
                {scoreLabel}
              </span>
              <span className="text-[10px] md:text-xs text-blue-300 mt-1">
                {passCount} of {CATEGORY_MAP.length} passed
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* ---- REVENUE GAP BANNER (overlaps into hero) ---- */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 -mt-5 relative z-10">
        <div className="bg-gradient-to-r from-[#c0392b] to-[#e74c3c] rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-white/15">
            <div className="text-center py-4 md:py-5">
              <div className="text-xl md:text-2xl font-bold text-white">{failCount}</div>
              <div className="text-[10px] md:text-xs text-white/70">Gaps Found</div>
            </div>
            <div className="text-center py-4 md:py-5">
              <div className="text-xl md:text-2xl font-bold text-white">${(audit.revenueGap / 1000).toFixed(0)}K<span className="text-sm font-normal text-white/70">/yr</span></div>
              <div className="text-[10px] md:text-xs text-white/70">Est. Revenue Gap</div>
            </div>
          </div>
          <div className="bg-black/15 px-4 py-2.5 text-center">
            <p className="text-white/80 text-xs md:text-sm">
              Your site is missing <span className="text-white font-semibold">{failCount} features</span> that competitors in your market already have
            </p>
          </div>
        </div>
      </section>

      {/* Scroll hint (mobile only) */}
      <div className="md:hidden flex flex-col items-center pt-4 pb-1 text-med-gray">
        <span className="text-xs">See your top gaps &amp; quick wins</span>
        <ChevronDown className="w-4 h-4 animate-bounce mt-0.5" />
      </div>

      {/* ---- SCREENSHOT ---- */}
      {audit.screenshotUrl && (
        <section className="max-w-4xl mx-auto px-4 md:px-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-med-gray bg-white px-4 py-1 rounded-md border border-gray-200">
                  {firm.website}
                </span>
              </div>
            </div>
            <img
              src={audit.screenshotUrl}
              alt={`${firm.name} website screenshot`}
              className="w-full"
            />
          </div>
        </section>
      )}

      {/* ---- CATEGORY SCORECARD ---- */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue" />
          Category Scorecard
        </h2>
        <p className="text-med-gray text-sm mb-5">
          Your site was scanned across {CATEGORY_MAP.length} categories. Here&apos;s how you scored:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CATEGORY_MAP.map((cat, i) => {
            const passed = findings[cat.key];
            const isRevealed = i < REVEALED_COUNT;

            {/* FIX #5: Replace blurred text with clean placeholder bars */}
            if (!isRevealed) {
              return (
                <div
                  key={cat.key}
                  className="relative bg-gray-50 rounded-lg p-3.5 border border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center gap-3 select-none">
                    <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex-1">
                      <div className="h-3.5 bg-gray-200 rounded-full w-3/4" />
                    </div>
                    <div className="h-5 w-10 bg-gray-200 rounded-full" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-white/30">
                    <Lock className="w-4 h-4 text-navy/25" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={cat.key}
                className={`bg-white rounded-lg p-3.5 border-l-4 ${
                  passed ? "border-score-green" : "border-score-red"
                } border border-r-gray-100 border-t-gray-100 border-b-gray-100`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      passed ? "bg-score-green/10" : "bg-score-red/10"
                    }`}
                  >
                    {passed ? (
                      <CheckCircle className="w-4 h-4 text-score-green" />
                    ) : (
                      <XCircle className="w-4 h-4 text-score-red" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-dark-gray">{cat.label}</span>
                  <span
                    className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                      passed
                        ? "bg-score-green/10 text-score-green"
                        : "bg-score-red/10 text-score-red"
                    }`}
                  >
                    {passed ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unlock prompt */}
        <a
          href="#full-report"
          onClick={() => trackClick("scorecard_unlock_click")}
          className="mt-4 bg-navy rounded-xl p-4 flex items-center gap-3 group block hover:bg-navy/90 transition-colors"
        >
          <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white font-semibold">
              {CATEGORY_MAP.length - REVEALED_COUNT} more categories in your full report
            </p>
            <p className="text-blue-300 text-xs">See all scores, explanations & action plan</p>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors shrink-0" />
        </a>
      </section>

      {/* ---- TOP 3 GAPS (with severity) ---- */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-10">
        <h2 className="text-xl font-bold text-navy mb-5 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-score-red" />
          Your Top 3 Gaps
        </h2>
        <div className="space-y-3">
          {audit.topGaps.map((gap, i) => {
            {/* FIX #7: Distinct colors — red, orange, yellow */}
            const severity = i === 0 ? "critical" : i === 1 ? "high" : "medium";
            const severityColor =
              severity === "critical"
                ? { border: "border-score-red", text: "text-score-red", badge: "bg-score-red/10" }
                : severity === "high"
                  ? { border: "border-score-amber", text: "text-score-amber", badge: "bg-score-amber/10" }
                  : { border: "border-[#d4a017]", text: "text-[#d4a017]", badge: "bg-[#d4a017]/10" };
            const severityLabel =
              severity === "critical" ? "Critical" : severity === "high" ? "High" : "Medium";

            return (
              <div
                key={i}
                className={`bg-white rounded-xl ${severityColor.border} border-l-4 p-5 shadow-sm border border-r-gray-100 border-t-gray-100 border-b-gray-100`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base font-bold text-dark-gray">
                        {gap.title}
                      </span>
                    </div>
                    <div className="text-med-gray text-sm leading-relaxed">
                      {gap.description}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${severityColor.badge} ${severityColor.text}`}
                  >
                    {severityLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- QUICK WINS ---- */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-10">
        <h2 className="text-xl font-bold text-navy mb-2 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-score-green" />
          Quick Wins
        </h2>
        <p className="text-med-gray text-sm mb-5">
          These 3 fixes can be implemented this week for under $500 total
          <span className="text-med-gray/70"> (third-party tool costs, not our fees)</span>:
        </p>
        <div className="space-y-3">
          {audit.quickWins.map((win, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border-l-4 border-score-green p-5 shadow-sm flex items-start justify-between border border-r-gray-100 border-t-gray-100 border-b-gray-100"
            >
              <div>
                <div className="font-bold text-dark-gray text-sm">
                  {win.tool}
                </div>
                <div className="text-med-gray text-sm mt-1 leading-relaxed">
                  {win.description}
                </div>
              </div>
              <span className="text-accent font-bold text-sm whitespace-nowrap ml-4 bg-accent/10 px-3 py-1 rounded-full">
                {win.cost}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- GATE BOX (Full Report) ---- */}
      <section id="full-report" className="bg-light-gray pt-2 pb-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-br from-navy via-[#132e5c] to-blue rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Unlock Your Full Audit Report
                </h2>
                <p className="text-blue-200/70 text-sm">
                  7-page detailed analysis with prioritized action plan
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
              {[
                `All ${CATEGORY_MAP.length} categories scored & explained`,
                `Revenue impact: $${audit.revenueGap.toLocaleString()}/yr breakdown`,
                "PageSpeed performance analysis",
                "Google Reviews & reputation check",
                "Desktop vs Mobile comparison",
                "Prioritized implementation roadmap",
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-sm text-blue-100 flex items-start gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* FIX #6: Social proof */}
            <div className="flex items-center gap-2 mb-6 py-3 px-4 bg-white/10 rounded-lg">
              <Users className="w-4 h-4 text-accent shrink-0" />
              <p className="text-blue-200 text-xs md:text-sm">
                <span className="text-white font-semibold">58+ California law firms</span> have used our audits to identify and fix revenue gaps.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href="https://calendly.com/heroncchavez/30min"
                onClick={() => trackClick("calendly_click")}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                Book Free Strategy Call
              </Link>
              <a
                href="mailto:heron@syncworkflow.com"
                onClick={() => trackClick("cta_click")}
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email for Full Report
              </a>
            </div>

          </div>
        </div>
        </div>
      </section>

      {/* ---- BOTTOM CTA (hidden on mobile — sticky bar handles it) ---- */}
      <section className="hidden md:block bg-navy py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Free 30-Minute Strategy Call
          </h2>
          <p className="text-blue-200 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
            We&apos;ll walk through your full audit, prioritize the highest-impact
            fixes, and give you a clear action plan — no strings attached.
          </p>
          <Link
            href="https://calendly.com/heroncchavez/30min"
            onClick={() => trackClick("calendly_click")}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
          >
            Book Your Call
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-blue-400 text-xs mt-5">
            heron@syncworkflow.com
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1f3d] py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-white text-sm font-semibold">
              SyncWorkflow
            </span>
          </div>
          <span className="text-blue-300 text-sm flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            Confidential — Prepared exclusively for {firm.name}
          </span>
        </div>
      </footer>

      {/* FIX #4: Sticky mobile CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-navy/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-semibold truncate">{firm.name}</div>
            <div className="text-blue-300 text-xs">Score: {audit.pct}/100</div>
          </div>
          <Link
            href="https://calendly.com/heroncchavez/30min"
            onClick={() => trackClick("sticky_calendly_click")}
            className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white px-4 py-2.5 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Call
          </Link>
        </div>
      </div>
    </main>
  );
}
