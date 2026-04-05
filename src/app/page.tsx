"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Shield,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Globe,
  MessageSquare,
  Calendar,
  Search,
  Star,
  Users,
  Clock,
  Mail,
  MapPin,
  Linkedin,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  XCircle,
  Menu,
  X,
} from "lucide-react";

/* ---------- data ---------- */

const features = [
  {
    icon: Globe,
    title: "Website & SEO",
    description: "SSL, meta tags, schema markup, mobile responsiveness, and page speed analysis.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    hoverBorder: "hover:border-blue-200",
  },
  {
    icon: MessageSquare,
    title: "Lead Capture",
    description: "Intake forms, live chat, contact forms, and online scheduling — the tools that convert visitors.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    icon: BarChart3,
    title: "Revenue Impact",
    description: "See exactly how much revenue your website gaps are costing you each year.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    hoverBorder: "hover:border-amber-200",
  },
  {
    icon: Shield,
    title: "Trust & Compliance",
    description: "Testimonials, Google Business Profile, social media, ADA compliance, and client portals.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    hoverBorder: "hover:border-violet-200",
  },
];

const stats = [
  { value: 14, label: "Categories Audited", suffix: "" },
  { value: 58, label: "Firms Analyzed", suffix: "+" },
  { value: 72, label: "Avg Revenue Gap", prefix: "$", suffix: "K" },
  { value: 60, label: "Instant Results", prefix: "< ", suffix: "s" },
];

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Enter Your URL",
    description: "Paste your website URL and our system scans it across 14 categories in under 60 seconds.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    num: "02",
    icon: BarChart3,
    title: "Get Your Report",
    description: "See your score, top gaps, revenue impact, and 3 quick wins you can implement this week.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    num: "03",
    icon: Calendar,
    title: "Free Strategy Call",
    description: "30-minute call to walk through findings and build a prioritized action plan.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const testimonials = [
  {
    quote: "The audit revealed 6 gaps I had no idea existed. We implemented the quick wins and saw a 40% increase in form submissions within 2 weeks.",
    name: "David R., Managing Partner",
    firm: "Personal Injury Firm, San Diego County",
    rating: 5,
    initials: "DR",
    avatarBg: "bg-blue-100 text-blue-700",
  },
  {
    quote: "I was skeptical about another free audit, but this one actually showed me specific tools and costs. No fluff — just actionable fixes.",
    name: "Sarah M., Solo Practitioner",
    firm: "Family Law, Sacramento",
    rating: 5,
    initials: "SM",
    avatarBg: "bg-emerald-100 text-emerald-700",
  },
  {
    quote: "We didn't realize our site had no schema markup or ADA basics. The revenue gap estimate was eye-opening — we booked the call immediately.",
    name: "Lisa T., Office Manager",
    firm: "Workers' Comp Firm, Los Angeles",
    rating: 5,
    initials: "LT",
    avatarBg: "bg-violet-100 text-violet-700",
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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
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

/* ---------- AnimatedCounter ---------- */

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

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
    <div className="bg-white rounded-2xl shadow-2xl shadow-blue/10 border border-gray-200 overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-400 text-center">
            syncworkflow.com/audit/your-firm
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-5 md:p-6 space-y-5">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(score / 100) * 213.6} 213.6`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{score}</span>
              <span className="text-[10px] text-gray-400">/100</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Smith & Associates</h3>
            <p className="text-xs text-gray-500 mt-0.5">3 of 14 checks passed</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                5 gaps found
              </span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">Estimated Revenue Gap</span>
          </div>
          <span className="text-sm font-bold text-amber-600">$72,000/yr</span>
        </div>

        {/* Staggered checklist */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerSlow}
          className="space-y-1.5"
        >
          {mockFindings.map((f) => (
            <motion.div
              key={f.label}
              variants={checklistItem}
              className="flex items-center justify-between py-1.5 px-3 rounded-lg text-xs hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">{f.label}</span>
              {f.pass ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </motion.div>
          ))}
          {[1, 2, 3].map((i) => (
            <motion.div key={`l${i}`} variants={checklistItem} className="flex items-center justify-between py-1.5 px-3 rounded-lg opacity-40">
              <div className="h-3 bg-gray-200 rounded w-24" />
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

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="SyncWorkflow home">
            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-sm">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">SyncWorkflow</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#what-we-audit", label: "What We Audit" },
              { href: "#testimonials", label: "Results" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/audit/new" className="bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5">
              Free Audit
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3"
          >
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#what-we-audit", label: "What We Audit" },
              { href: "#testimonials", label: "Results" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1">
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* ====== HERO ====== */}
      <section id="main-content" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-accent text-sm px-4 py-2 rounded-full mb-6 font-medium">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Free for California Law Firms
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Is Your Website{" "}
                <span className="text-accent">Losing You Clients?</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Most law firm websites fail on the basics — no intake forms, no chat, no scheduling. Get your free 14-point audit in 60 seconds.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-4">
                <Link href="/audit/new" className="group inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-xl text-base font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5">
                  Audit My Site Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <a href="https://calendly.com/heroncchavez/30min" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 px-7 py-3.5 rounded-xl text-base font-semibold transition-all">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Book Free Call
                </a>
                <a href="https://calendly.com/heroncchavez/30min" target="_blank" rel="noopener noreferrer" className="sm:hidden inline-flex items-center justify-center gap-1 text-sm text-accent font-medium hover:underline">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  or book a free strategy call
                </a>
              </motion.div>

              <motion.p variants={fadeUp} className="text-gray-400 text-sm">
                No signup required. Results in under 60 seconds.
              </motion.p>
            </motion.div>

            {/* Desktop dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as const }}
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
            className="md:hidden mt-8"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-14 h-14 shrink-0">
                  <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(38 / 100) * 138.2} 138.2`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-gray-900">38</span>
                    <span className="text-[8px] text-gray-400">/100</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sample Audit Result</p>
                  <p className="text-sm font-semibold text-amber-600">$72,000/yr revenue gap</p>
                  <p className="text-xs text-gray-400">5 of 14 gaps found</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[true, true, true, false, false, false, false, false].map((pass, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${pass ? "bg-green-400" : "bg-red-300"}`} />
                ))}
                {[1, 2, 3].map((i) => (
                  <div key={`l${i}`} className="h-1.5 flex-1 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats with counter animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== WHAT WE AUDIT ====== */}
      <section id="what-we-audit" className="py-20 md:py-24 bg-gray-50" aria-labelledby="audit-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-accent text-sm px-4 py-1.5 rounded-full mb-5 font-medium">
              <Shield className="w-3.5 h-3.5" />
              Comprehensive Analysis
            </motion.div>
            <motion.h2 variants={fadeUp} id="audit-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Audit</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-xl mx-auto text-lg">
              A comprehensive scan of everything that matters for converting website visitors into signed clients.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className={`group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md ${f.hoverBorder} transition-all hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 ${f.bg} ${f.border} border rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-5.5 h-5.5 ${f.color}`} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-400 mb-5 text-center uppercase tracking-widest">All 14 Categories We Check</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {auditCategories.map((cat) => (
                <div key={cat} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm text-gray-700">{cat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section id="how-it-works" className="py-20 md:py-24 bg-white" aria-labelledby="steps-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-accent text-sm px-4 py-1.5 rounded-full mb-5 font-medium">
              <Zap className="w-3.5 h-3.5" />
              Simple Process
            </motion.div>
            <motion.h2 variants={fadeUp} id="steps-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-xl mx-auto text-lg">From URL to action plan in 3 simple steps.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+40px)] right-[-calc(50%-40px)] h-px bg-gradient-to-r from-gray-200 to-transparent" />
                )}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-5xl font-bold text-gray-100 absolute top-4 right-6 select-none">{s.num}</div>
                  <div className={`w-14 h-14 ${s.bg} ${s.border} border rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mt-12">
            <Link href="/audit/new" className="group inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5">
              Start Your Free Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section id="testimonials" className="py-20 md:py-24 bg-gray-50" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-600 text-sm px-4 py-1.5 rounded-full mb-5 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              Client Results
            </motion.div>
            <motion.h2 variants={fadeUp} id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Firms Are Saying</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-xl mx-auto text-lg">Real results from California law firms who used our free audit.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
              >
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <footer className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-xs font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.firm}</div>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section id="about" className="py-20 md:py-24 bg-white" aria-labelledby="about-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-accent text-sm px-4 py-1.5 rounded-full mb-5 font-medium">
                <Users className="w-3.5 h-3.5" />
                About
              </motion.div>
              <motion.h2 variants={fadeUp} id="about-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Trust SyncWorkflow?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-5">
                I&apos;m Heron Chavez, a digital strategy consultant who specializes in helping California law firms modernize their online presence. After auditing 58+ firm websites, I&apos;ve seen the same patterns — firms losing thousands in potential revenue because of fixable website gaps.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-8">
                SyncWorkflow was built to give every firm — solo practitioners and mid-size firms alike — access to the same audit insights that agencies charge thousands for. No sales pitch, just data.
              </motion.p>

              <motion.div variants={stagger} className="space-y-3">
                {[
                  { icon: Users, text: "58+ California law firms audited", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                  { icon: TrendingUp, text: "Average $72K/year revenue gap identified", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
                  { icon: Clock, text: "Results in under 60 seconds", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                  { icon: Shield, text: "100% free — no credit card, no obligation", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
                ].map((item) => (
                  <motion.div key={item.text} variants={fadeUp} className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${item.bg} ${item.border} border rounded-lg flex items-center justify-center shrink-0`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} aria-hidden="true" />
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile card — standout design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Decorative glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 via-violet-50 to-amber-50 rounded-[2rem] blur-xl opacity-60" />

              <div className="relative bg-gradient-to-br from-[#1e3a5f] to-[#2a4a7f] rounded-3xl p-8 md:p-10 text-center shadow-xl overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  {/* Photo — zoomed to show face, yellow bg circle */}
                  <div className="w-44 h-44 rounded-full mx-auto mb-6 relative overflow-hidden border-4 border-white/20 shadow-2xl ring-4 ring-white/10 bg-[#e8c840]">
                    <Image
                      src="/heron-chavez.png"
                      alt="Heron Chavez"
                      width={220}
                      height={220}
                      className="object-cover object-[center_30%] scale-[1.4] translate-y-2"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Heron Chavez</h3>
                  <p className="text-blue-200 text-sm mb-6">Digital Strategy Consultant</p>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-3 mb-7">
                    <div className="bg-white/10 rounded-xl py-3 px-2">
                      <div className="text-lg font-bold text-white">58+</div>
                      <div className="text-[10px] text-blue-200">Firms</div>
                    </div>
                    <div className="bg-white/10 rounded-xl py-3 px-2">
                      <div className="text-lg font-bold text-white">$72K</div>
                      <div className="text-[10px] text-blue-200">Avg Gap</div>
                    </div>
                    <div className="bg-white/10 rounded-xl py-3 px-2">
                      <div className="text-lg font-bold text-white">14</div>
                      <div className="text-[10px] text-blue-200">Checks</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-left max-w-xs mx-auto">
                    <a href="mailto:heron@syncworkflow.com" className="flex items-center gap-3 text-blue-200 text-sm hover:text-white transition-colors">
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      heron@syncworkflow.com
                    </a>
                    <a href="https://calendly.com/heroncchavez/30min" className="flex items-center gap-3 text-blue-200 text-sm hover:text-white transition-colors">
                      <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Book a free 30-min call
                    </a>
                    <a href="https://linkedin.com/in/heroncchavez" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-200 text-sm hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="py-20 md:py-24 bg-navy relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#1a365d] to-accent/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} id="cta-heading" className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to See What You&apos;re Missing?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-100/70 text-lg mb-10 max-w-xl mx-auto">
              Get your free audit in 60 seconds, or book a strategy call and we&apos;ll walk through everything together.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/audit/new" className="group inline-flex items-center justify-center gap-2 bg-white text-navy px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5">
                Run Free Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href="https://calendly.com/heroncchavez/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book Free Call
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section id="contact" className="py-20 md:py-24 bg-gray-50" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} id="contact-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-10">
                Have a question about your audit or want to learn more about how we can help your firm? Send us a message or use any of the methods below.
              </motion.p>
              <motion.div variants={stagger} className="space-y-5">
                <motion.a variants={fadeUp} href="mailto:heron@syncworkflow.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Mail className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Email</div>
                    <div className="text-sm text-gray-500">heron@syncworkflow.com</div>
                  </div>
                </motion.a>
                <motion.a variants={fadeUp} href="https://calendly.com/heroncchavez/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Calendar className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Schedule a Call</div>
                    <div className="text-sm text-gray-500">Free 30-minute strategy session</div>
                  </div>
                </motion.a>
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-violet-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Location</div>
                    <div className="text-sm text-gray-500">Serving California Law Firms</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <form action="https://formsubmit.co/heron@syncworkflow.com" method="POST" className="space-y-5">
                <input type="hidden" name="_subject" value="New contact from syncworkflow.com" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://syncworkflow.com/?contacted=true" />
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input id="contact-name" type="text" name="name" required placeholder="Your name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input id="contact-email" type="email" name="email" required placeholder="you@yourfirm.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                </div>
                <div>
                  <label htmlFor="contact-website" className="block text-sm font-semibold text-gray-700 mb-2">
                    Website <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input id="contact-website" type="text" name="website" placeholder="www.yourfirm.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea id="contact-message" name="message" rows={4} required placeholder="How can we help?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-accent text-white py-3.5 rounded-xl text-sm font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-navy py-14" role="contentinfo">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-white">SyncWorkflow</span>
              </div>
              <p className="text-blue-100/50 text-sm leading-relaxed">Free website audits for California law firms. Discover the gaps costing you clients and revenue.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-5">Quick Links</h3>
              <nav aria-label="Footer navigation" className="space-y-3">
                {[
                  { href: "/audit/new", label: "Free Audit Tool" },
                  { href: "#how-it-works", label: "How It Works" },
                  { href: "#what-we-audit", label: "What We Audit" },
                  { href: "#about", label: "About" },
                  { href: "#contact", label: "Contact" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-blue-100/50 hover:text-white transition-colors">{link.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-5">Contact</h3>
              <div className="space-y-3">
                <a href="mailto:heron@syncworkflow.com" className="flex items-center gap-2 text-sm text-blue-100/50 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  heron@syncworkflow.com
                </a>
                <a href="https://calendly.com/heroncchavez/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-100/50 hover:text-white transition-colors">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Book a Free Call
                </a>
                <a href="https://linkedin.com/in/heroncchavez" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-100/50 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-blue-100/30">&copy; {new Date().getFullYear()} SyncWorkflow. All rights reserved.</div>
            <div className="text-sm text-blue-100/30">Serving California Law Firms</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
