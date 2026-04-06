"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Shield,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Calendar,
  Search,
  Users,
  Mail,
  Linkedin,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  XCircle,
  Menu,
  X,
} from "lucide-react";

/* ---------- data ---------- */

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Paste Your URL",
    description: "No signup. No email. Just drop in your site and we start scanning across 14 checks.",
    color: "text-accent",
    iconBg: "bg-accent",
  },
  {
    num: "02",
    icon: BarChart3,
    title: "Read Your Report",
    description: "Score, gap-by-gap breakdown, revenue impact, and 3 quick wins you can ship this week.",
    color: "text-ghl-green",
    iconBg: "bg-ghl-green",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "Walk Through It Together",
    description: "Walk through your report with me on a free 30-min call. I'll explain what matters most and answer anything. No pitch — just a conversation.",
    color: "text-yellow-hover",
    iconBg: "bg-yellow",
  },
];

const reportSections = [
  {
    icon: BarChart3,
    iconBg: "bg-accent",
    title: "Your Score & Letter Grade",
    description: "A clear A–F rating across 14 checks. No jargon — just where you stand vs. what converts.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-yellow",
    title: "Your Revenue Gap",
    description: "A dollar estimate of the clients you're likely losing each year, based on the specific gaps we find on your site.",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-score-red",
    title: "Gap-by-Gap Breakdown",
    description: "Every failed check explained in plain English: what it is, why it costs you, and how to fix it.",
  },
  {
    icon: Sparkles,
    iconBg: "bg-ghl-green",
    title: "3 Quick Wins",
    description: "The highest-impact fixes you can ship this week, ranked by effort vs. impact. No agency required.",
  },
];

const auditCategories = [
  "SSL / HTTPS", "Mobile Responsive", "SEO Meta Tags", "Schema Markup",
  "Online Intake Form", "Contact Form", "Live Chat", "Online Scheduling",
  "Client Portal", "Blog / Content", "Testimonials", "Social Media",
  "Google Business Profile", "ADA Compliance",
];

/* ---------- animation variants ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerSlow = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const checklistItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ---------- Mini audit dashboard mockup ---------- */

function AuditDashboardMockup() {
  const mockFindings = [
    { label: "SSL / HTTPS", pass: true },
    { label: "Mobile Responsive", pass: true },
    { label: "Online Intake Form", pass: false },
    { label: "Live Chat", pass: false },
    { label: "Schema Markup", pass: false },
    { label: "Online Scheduling", pass: false },
    { label: "SEO Meta Tags", pass: true },
    { label: "ADA Compliance", pass: false },
  ];
  const score = 38;

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(7,34,61,0.12)] border border-gray-100 overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-400 text-center font-medium">
            syncworkflow.com/audit/your-firm
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-6 md:p-7 space-y-5">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#EB3D32" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(score / 100) * 213.6} 213.6`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-navy">{score}</span>
              <span className="text-[10px] text-gray-400 font-medium">/100</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-navy text-sm">Smith & Associates</h3>
            <p className="text-xs text-gray-500 mt-0.5">3 of 14 checks passed</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-score-red bg-score-red/10 px-2.5 py-1 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                5 gaps found
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow/10 to-yellow/5 border border-yellow/20 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-yellow/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-yellow-hover" />
            </div>
            <span className="text-xs font-semibold text-navy">Estimated Revenue Gap</span>
          </div>
          <span className="text-sm font-bold text-yellow-hover">$72,000/yr</span>
        </div>

        {/* Staggered checklist */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerSlow}
          className="space-y-1"
        >
          {mockFindings.map((f) => (
            <motion.div
              key={f.label}
              variants={checklistItem}
              className="flex items-center justify-between py-2 px-3 rounded-lg text-xs hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-600 font-medium">{f.label}</span>
              {f.pass ? (
                <CheckCircle className="w-4 h-4 text-ghl-green" />
              ) : (
                <XCircle className="w-4 h-4 text-score-red" />
              )}
            </motion.div>
          ))}
          {[1, 2, 3].map((i) => (
            <motion.div key={`l${i}`} variants={checklistItem} className="flex items-center justify-between py-2 px-3 rounded-lg opacity-30">
              <div className="h-3 bg-gray-200 rounded-full w-24" />
              <div className="h-4 w-4 bg-gray-200 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white" id="main">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* ====== NAV ====== */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/80" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="SyncWorkflow home">
            <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-yellow" />
            </div>
            <span className="font-semibold text-lg text-navy tracking-tight">SyncWorkflow</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#what-we-audit", label: "What We Audit" },
              { href: "#how-it-works", label: "How It Works" },
              { href: "#sample-report", label: "Sample Report" },
              { href: "#about", label: "About" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-[13px] font-medium text-gray-500 hover:text-navy transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/audit/new" className="btn-shine bg-yellow text-navy px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-yellow-hover hover:shadow-[0_8px_30px_rgba(255,208,0,0.35)] hover:-translate-y-0.5">
              Free Audit
            </Link>
            <button
              className="md:hidden p-2 text-gray-500 hover:text-navy transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-4 space-y-3"
          >
            {[
              { href: "#what-we-audit", label: "What We Audit" },
              { href: "#how-it-works", label: "How It Works" },
              { href: "#sample-report", label: "Sample Report" },
              { href: "#about", label: "About" },
            ].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-gray-600 hover:text-navy py-1.5">
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ====== HERO ====== */}
      <section id="main-content" className="relative pt-28 pb-16 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff] via-white to-white" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow/5 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/10 text-navy text-xs px-4 py-2 rounded-full mb-8 font-semibold uppercase tracking-wide">
                  <div className="w-2 h-2 bg-ghl-green rounded-full animate-pulse" />
                  Free for California Law Firms
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold text-navy leading-[1.08] mb-6 tracking-tight">
                Your Website Is{" "}
                <span className="text-gradient">Quietly Losing</span>{" "}
                You Clients.
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg">
                Most California law firms lose qualified leads to broken intake, missing chat, and invisible scheduling. Find out exactly where yours is leaking — in 60 seconds.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-5">
                <Link href="/audit/new" className="btn-shine group inline-flex items-center justify-center gap-2.5 bg-yellow text-navy px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-yellow-hover hover:shadow-[0_8px_30px_rgba(255,208,0,0.35)] hover:-translate-y-0.5">
                  Run My Free Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <a href="#sample-report" className="hidden sm:inline-flex items-center justify-center gap-2 bg-navy text-white hover:bg-navy-light px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:shadow-[0_8px_30px_rgba(7,34,61,0.25)] hover:-translate-y-0.5">
                  See a Sample Report
                </a>
                <a href="#sample-report" className="sm:hidden inline-flex items-center justify-center gap-1 text-sm text-accent font-medium hover:underline">
                  See a sample report →
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-ghl-green" />
                  No signup to view
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-ghl-green" />
                  Built for California firms
                </div>
              </motion.div>
            </motion.div>

            {/* Desktop dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block"
            >
              <AuditDashboardMockup />
            </motion.div>
          </div>

          {/* Mobile condensed dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:hidden mt-10"
          >
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(7,34,61,0.08)] border border-gray-100 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 shrink-0">
                  <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#EB3D32" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(38 / 100) * 138.2} 138.2`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-navy">38</span>
                    <span className="text-[8px] text-gray-400">/100</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Sample Audit Result</p>
                  <p className="text-sm font-bold text-yellow-hover">$72,000/yr revenue gap</p>
                  <p className="text-xs text-gray-400">5 of 14 gaps found</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[true, true, true, false, false, false, false, false].map((pass, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full ${pass ? "bg-ghl-green" : "bg-score-red/40"}`} />
                ))}
                {[1, 2, 3].map((i) => (
                  <div key={`l${i}`} className="h-2 flex-1 rounded-full bg-gray-100" />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ====== WHAT WE AUDIT ====== */}
      <section id="what-we-audit" className="py-24 md:py-32 bg-light-gray relative" aria-labelledby="audit-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 text-navy text-xs px-4 py-2 rounded-full mb-6 font-semibold uppercase tracking-wide">
              <Shield className="w-3.5 h-3.5 text-cyan" />
              14 Checks
            </motion.div>
            <motion.h2 variants={fadeUp} id="audit-heading" className="text-3xl md:text-[2.75rem] font-bold text-navy mb-5 leading-tight">
              The 14 Things That Decide<br className="hidden md:block" /> If a Visitor Becomes a Client
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              We check every technical and conversion signal a prospect sees — and every hidden one Google uses to rank you.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-7 md:p-10 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {auditCategories.map((cat) => (
                <div key={cat} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-light-gray border border-transparent hover:border-accent/20 hover:bg-accent/5 transition-all duration-200 group">
                  <CheckCircle className="w-4 h-4 text-ghl-green shrink-0" aria-hidden="true" />
                  <span className="text-sm text-gray-600 font-medium">{cat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section id="how-it-works" className="py-24 md:py-32 bg-white relative overflow-hidden" aria-labelledby="steps-heading">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[120px]" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-ghl-green/10 border border-ghl-green/20 text-navy text-xs px-4 py-2 rounded-full mb-6 font-semibold uppercase tracking-wide">
              <Zap className="w-3.5 h-3.5 text-ghl-green" />
              How It Works
            </motion.div>
            <motion.h2 variants={fadeUp} id="steps-heading" className="text-3xl md:text-[2.75rem] font-bold text-navy mb-5 leading-tight">From URL to Action Plan in 60 Seconds</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">Three steps. The first two are instant. The third is a free conversation if you want one.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+50px)] right-[-calc(50%-50px)] h-px">
                    <div className="h-px bg-gradient-to-r from-gray-200 via-gray-200 to-transparent" />
                  </div>
                )}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 text-center shadow-sm hover:shadow-[0_12px_40px_rgba(7,34,61,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  <div className="text-[5rem] font-extrabold text-gray-50 absolute -top-2 -right-1 select-none leading-none">{s.num}</div>
                  <div className={`w-14 h-14 ${s.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 relative`}>
                    <s.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-navy text-lg mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mt-14">
            <Link href="/audit/new" className="btn-shine group inline-flex items-center gap-2.5 bg-accent text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-mid-blue hover:shadow-[0_8px_30px_rgba(40,150,251,0.3)] hover:-translate-y-0.5">
              Start Your Free Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== SAMPLE REPORT ====== */}
      <section id="sample-report" className="py-24 md:py-32 bg-navy-deep relative overflow-hidden" aria-labelledby="sample-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white text-xs px-4 py-2 rounded-full mb-6 font-semibold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-yellow" />
              Inside Your Report
            </motion.div>
            <motion.h2 variants={fadeUp} id="sample-heading" className="text-3xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">What You Actually Get</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
              Every report includes four sections — a full score, a revenue impact estimate, a gap-by-gap breakdown, and prioritized quick wins. Here&apos;s what each one looks like.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid md:grid-cols-2 gap-5 mb-14">
            {reportSections.map((r) => (
              <motion.div
                key={r.title}
                variants={fadeUp}
                className="glass rounded-2xl p-7 md:p-8 hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 ${r.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                    <r.icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg mb-2">{r.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{r.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <Link href="/audit/new" className="btn-shine group inline-flex items-center gap-2.5 bg-yellow text-navy px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-yellow-hover hover:shadow-[0_8px_30px_rgba(255,208,0,0.35)] hover:-translate-y-0.5">
              Generate My Report
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden" aria-labelledby="about-heading">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-navy text-xs px-4 py-2 rounded-full mb-6 font-semibold uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-accent" />
                About
              </motion.div>
              <motion.h2 variants={fadeUp} id="about-heading" className="text-3xl md:text-[2.75rem] font-bold text-navy mb-6 leading-tight">
                I&apos;ve audited 58 California law firm websites.<br className="hidden md:block" />
                <span className="text-gradient">They almost all miss the same things.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-5">
                I&apos;m Heron. I&apos;m a solo consultant — not an agency — and I built SyncWorkflow because I kept watching smart firms lose qualified clients to fixable website problems they didn&apos;t know they had.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-8">
                Right now I&apos;m working with a small number of California firms one at a time. The audit is free and the report is real. If something in it is worth talking about, we talk. If you want help implementing, we can figure out what that looks like. If not, you still leave with everything you need to act.
              </motion.p>

              <motion.div variants={fadeUp} className="bg-light-gray border border-gray-100 rounded-2xl p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">What working with me looks like</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-ghl-green shrink-0 mt-0.5" />
                    <span>You talk to me directly — not an account manager or a sales rep</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-ghl-green shrink-0 mt-0.5" />
                    <span>Every fix is specific enough to hand to your current webmaster</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-ghl-green shrink-0 mt-0.5" />
                    <span>If you want help, we scope it together. No retainers you can&apos;t cancel.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Profile card — magazine style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Ambient glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/20 via-cyan/10 to-yellow/15 rounded-[3rem] blur-3xl opacity-70" />

              <div className="relative bg-white rounded-3xl shadow-[0_30px_80px_rgba(7,34,61,0.18)] overflow-hidden border border-gray-100">
                {/* Photo area with gradient background */}
                <div className="relative h-80 bg-gradient-to-br from-navy via-navy-light to-mid-blue overflow-hidden">
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-60 h-60 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  {/* Subtle grid overlay */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }} />

                  {/* Photo — positioned to show head + shoulders naturally */}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center items-end">
                    <Image
                      src="/heron-chavez.png"
                      alt="Heron Chavez"
                      width={800}
                      height={450}
                      className="w-[88%] max-w-none object-contain object-bottom drop-shadow-2xl"
                      priority
                    />
                  </div>

                  {/* Status badge overlay */}
                  <div className="absolute top-5 right-5 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                    <div className="w-1.5 h-1.5 bg-ghl-green rounded-full animate-pulse" />
                    <span className="text-[11px] font-semibold text-white uppercase tracking-wider">Available</span>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-7 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-navy tracking-tight">Heron Chavez</h3>
                    <p className="text-accent text-sm font-semibold mt-1">Founder · Digital Strategy Consultant</p>
                  </div>

                  {/* Pull quote */}
                  <blockquote className="relative pl-5 border-l-2 border-yellow">
                    <p className="text-[15px] text-gray-600 italic leading-relaxed">
                      &ldquo;Most law firm websites aren&apos;t broken — they&apos;re just leaking clients in places nobody&apos;s looking. My job is to show you exactly where.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="py-24 md:py-32 bg-navy relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-mid-blue/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[100px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} id="cta-heading" className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Find out where your site is losing clients.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Run the audit in 60 seconds. If it surfaces something worth talking about, grab a free 30-min walkthrough with me — no pitch, just the report.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/audit/new" className="btn-shine group inline-flex items-center justify-center gap-2.5 bg-yellow text-navy px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-yellow-hover hover:shadow-[0_8px_30px_rgba(255,208,0,0.35)] hover:-translate-y-0.5">
                Run My Free Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href="https://calendly.com/heroncchavez/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:-translate-y-0.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book a Walkthrough
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-navy-deep py-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 bg-yellow rounded-lg flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5 text-navy" aria-hidden="true" />
                </div>
                <span className="font-semibold text-lg text-white tracking-tight">SyncWorkflow</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Free website audits for California law firms. Discover the gaps costing you clients and revenue.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider text-xs">Quick Links</h3>
              <nav aria-label="Footer navigation" className="space-y-3.5">
                {[
                  { href: "/audit/new", label: "Free Audit Tool" },
                  { href: "#what-we-audit", label: "What We Audit" },
                  { href: "#how-it-works", label: "How It Works" },
                  { href: "#sample-report", label: "Sample Report" },
                  { href: "#about", label: "About" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-gray-500 hover:text-white transition-colors">{link.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider text-xs">Contact</h3>
              <div className="space-y-3.5">
                <a href="mailto:heron@syncworkflow.com" className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  heron@syncworkflow.com
                </a>
                <a href="https://calendly.com/heroncchavez/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Book a Free Call
                </a>
                <a href="https://linkedin.com/in/heroncchavez" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-600">&copy; {new Date().getFullYear()} SyncWorkflow. All rights reserved.</div>
            <div className="text-xs text-gray-600">Serving California Law Firms</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
