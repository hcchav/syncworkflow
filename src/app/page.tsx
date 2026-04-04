"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  ChevronRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Website & SEO",
    description:
      "SSL, meta tags, schema markup, mobile responsiveness, and page speed analysis.",
  },
  {
    icon: MessageSquare,
    title: "Lead Capture",
    description:
      "Intake forms, live chat, contact forms, and online scheduling — the tools that convert visitors.",
  },
  {
    icon: BarChart3,
    title: "Revenue Impact",
    description:
      "See exactly how much revenue your website gaps are costing you each year.",
  },
  {
    icon: Shield,
    title: "Trust & Compliance",
    description:
      "Testimonials, Google Business Profile, social media, ADA compliance, and client portals.",
  },
];

const stats = [
  { value: "14", label: "Categories Audited" },
  { value: "58+", label: "Firms Analyzed" },
  { value: "$72K", label: "Avg Revenue Gap" },
  { value: "< 60s", label: "Instant Results" },
];

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Enter Your URL",
    description:
      "Paste your website URL and our system scans it across 14 categories in under 60 seconds.",
  },
  {
    num: "02",
    icon: BarChart3,
    title: "Get Your Report",
    description:
      "See your score, top gaps, revenue impact, and 3 quick wins you can implement this week.",
  },
  {
    num: "03",
    icon: Calendar,
    title: "Free Strategy Call",
    description:
      "30-minute call to walk through findings and build a prioritized action plan.",
  },
];

const testimonials = [
  {
    quote:
      "The audit revealed 6 gaps I had no idea existed. We implemented the quick wins and saw a 40% increase in form submissions within 2 weeks.",
    name: "Managing Partner",
    firm: "Personal Injury Firm, San Diego",
    rating: 5,
  },
  {
    quote:
      "I was skeptical about another free audit, but this one actually showed me specific tools and costs. No fluff — just actionable fixes.",
    name: "Solo Practitioner",
    firm: "Family Law, Sacramento",
    rating: 5,
  },
  {
    quote:
      "We didn't realize our site had no schema markup or ADA basics. The revenue gap estimate was eye-opening — we booked the call immediately.",
    name: "Office Manager",
    firm: "Workers' Comp Firm, Los Angeles",
    rating: 5,
  },
];

const auditCategories = [
  "SSL / HTTPS",
  "Mobile Responsive",
  "SEO Meta Tags",
  "Schema Markup",
  "Online Intake Form",
  "Contact Form",
  "Live Chat",
  "Online Scheduling",
  "Client Portal",
  "Blog / Content",
  "Testimonials",
  "Social Media",
  "Google Business Profile",
  "ADA Compliance",
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030d1a]" id="main">
      {/* Skip to content link (ADA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Nav — glassmorphism style */}
      <nav
        className="fixed top-0 w-full z-50 border-b border-white/5"
        aria-label="Main navigation"
      >
        <div className="bg-[#030d1a]/80 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="SyncWorkflow home"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-accent to-[#00bfa5] rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">SyncWorkflow</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: "#how-it-works", label: "How It Works" },
                { href: "#what-we-audit", label: "What We Audit" },
                { href: "#testimonials", label: "Results" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/audit/new"
              className="relative bg-gradient-to-r from-accent to-[#00bfa5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-[#030d1a]"
            >
              Free Audit
            </Link>
          </div>
        </div>
      </nav>

      {/* ====== HERO ====== */}
      <section
        id="main-content"
        className="relative pt-32 pb-24 overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
                Free for California Law Firms
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              Is Your Website{" "}
              <span className="bg-gradient-to-r from-accent to-[#00e5cc] bg-clip-text text-transparent">
                Losing You Clients?
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Most law firm websites fail on the basics — no intake forms, no
              chat, no scheduling. Get your free audit in 60 seconds.
            </motion.p>

            {/* CTA group */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/audit/new"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-[#00bfa5] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                Audit My Site Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href="https://calendly.com/heroncchavez/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white hover:bg-white/5 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book Free Call
              </a>
            </motion.div>

            <motion.p variants={fadeUp} className="text-gray-500 text-sm">
              No signup required. Results in under 60 seconds.
            </motion.p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== WHAT WE AUDIT ====== */}
      <section id="what-we-audit" className="py-24 bg-[#040e1e]" aria-labelledby="audit-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-sm px-4 py-1.5 rounded-full mb-6">
              <Shield className="w-3.5 h-3.5" />
              Comprehensive Analysis
            </motion.div>
            <motion.h2 variants={fadeUp} id="audit-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Audit
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto text-lg">
              A comprehensive scan of everything that matters for converting
              website visitors into signed clients.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-accent/20 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <f.icon className="w-5.5 h-5.5 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Category grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-5 text-center uppercase tracking-widest">
              All 14 Categories We Check
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {auditCategories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-accent/20 transition-colors"
                >
                  <CheckCircle
                    className="w-4 h-4 text-accent shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-300">{cat}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section id="how-it-works" className="py-24 bg-[#030d1a]" aria-labelledby="steps-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 text-blue text-sm px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              Simple Process
            </motion.div>
            <motion.h2 variants={fadeUp} id="steps-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto text-lg">
              From URL to action plan in 3 simple steps.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+40px)] right-[-calc(50%-40px)] h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center hover:bg-white/[0.06] transition-all hover:-translate-y-1">
                  <div className="text-5xl font-bold text-white/[0.06] absolute top-4 right-6 select-none">
                    {s.num}
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <s.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-12"
          >
            <Link
              href="/audit/new"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-accent to-[#00bfa5] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              Start Your Free Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section
        id="testimonials"
        className="py-24 bg-[#040e1e]"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm px-4 py-1.5 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              Client Results
            </motion.div>
            <motion.h2 variants={fadeUp} id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Firms Are Saying
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto text-lg">
              Real results from California law firms who used our free audit.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                variants={fadeUp}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col hover:border-accent/20 transition-all"
              >
                <div
                  className="flex gap-1 mb-5"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="border-t border-white/[0.06] pt-5">
                  <div className="font-semibold text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.firm}</div>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section id="about" className="py-24 bg-[#030d1a]" aria-labelledby="about-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-sm px-4 py-1.5 rounded-full mb-6">
                <Users className="w-3.5 h-3.5" />
                About Us
              </motion.div>
              <motion.h2 variants={fadeUp} id="about-heading" className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Trust SyncWorkflow?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-6">
                I&apos;m Heron Chavez, a digital strategy consultant who
                specializes in helping California law firms modernize their
                online presence. After auditing 58+ firm websites, I&apos;ve
                seen the same patterns — firms losing thousands in potential
                revenue because of fixable website gaps.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-8">
                SyncWorkflow was built to give every firm — solo practitioners
                and mid-size firms alike — access to the same audit insights
                that agencies charge thousands for. No sales pitch, just data.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {[
                  { icon: Users, text: "58+ California law firms audited" },
                  {
                    icon: TrendingUp,
                    text: "Average $72K/year revenue gap identified",
                  },
                  { icon: Clock, text: "Results in under 60 seconds" },
                  {
                    icon: Shield,
                    text: "100% free — no credit card, no obligation",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    variants={fadeUp}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon
                        className="w-4.5 h-4.5 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-3xl p-10 text-center relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-[60px]" />
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">HC</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Heron Chavez
                  </h3>
                  <p className="text-gray-400 text-sm mb-8">
                    Digital Strategy Consultant
                  </p>
                  <div className="space-y-4 text-left max-w-xs mx-auto">
                    <a
                      href="mailto:heron@syncworkflow.com"
                      className="flex items-center gap-3 text-gray-400 text-sm hover:text-accent transition-colors"
                    >
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      heron@syncworkflow.com
                    </a>
                    <a
                      href="https://calendly.com/heroncchavez/30min"
                      className="flex items-center gap-3 text-gray-400 text-sm hover:text-accent transition-colors"
                    >
                      <Calendar
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      />
                      Book a free 30-min call
                    </a>
                    <a
                      href="https://linkedin.com/in/heroncchavez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-400 text-sm hover:text-accent transition-colors"
                    >
                      <Linkedin
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      />
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
      <section className="py-24 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-[#030d1a] to-blue/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[150px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              id="cta-heading"
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Ready to See What You&apos;re{" "}
              <span className="bg-gradient-to-r from-accent to-[#00e5cc] bg-clip-text text-transparent">
                Missing?
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Get your free audit in 60 seconds, or book a strategy call and
              we&apos;ll walk through everything together.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/audit/new"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-[#00bfa5] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                Run Free Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a
                href="https://calendly.com/heroncchavez/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white hover:bg-white/5 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Book Free Call
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section id="contact" className="py-24 bg-[#040e1e]" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                id="contact-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Get in Touch
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-10">
                Have a question about your audit or want to learn more about how
                we can help your firm? Send us a message or use any of the
                methods below.
              </motion.p>
              <motion.div variants={stagger} className="space-y-5">
                <motion.a
                  variants={fadeUp}
                  href="mailto:heron@syncworkflow.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Email
                    </div>
                    <div className="text-sm text-gray-400">
                      heron@syncworkflow.com
                    </div>
                  </div>
                </motion.a>
                <motion.a
                  variants={fadeUp}
                  href="https://calendly.com/heroncchavez/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Calendar
                      className="w-5 h-5 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Schedule a Call
                    </div>
                    <div className="text-sm text-gray-400">
                      Free 30-minute strategy session
                    </div>
                  </div>
                </motion.a>
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center">
                    <MapPin
                      className="w-5 h-5 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Location
                    </div>
                    <div className="text-sm text-gray-400">
                      Serving California Law Firms
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8"
            >
              <form
                action="https://formsubmit.co/heron@syncworkflow.com"
                method="POST"
                className="space-y-5"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New contact from syncworkflow.com"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://syncworkflow.com/?contacted=true"
                />
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@yourfirm.com"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-website"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Website{" "}
                    <span className="text-gray-600 font-normal">(optional)</span>
                  </label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    placeholder="www.yourfirm.com"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent to-[#00bfa5] text-white py-3.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-[#020a15] border-t border-white/[0.04] py-14" role="contentinfo">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-[#00bfa5] rounded-xl flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-white">SyncWorkflow</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Free website audits for California law firms. Discover the gaps
                costing you clients and revenue.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-5">
                Quick Links
              </h3>
              <nav aria-label="Footer navigation" className="space-y-3">
                {[
                  { href: "/audit/new", label: "Free Audit Tool" },
                  { href: "#how-it-works", label: "How It Works" },
                  { href: "#what-we-audit", label: "What We Audit" },
                  { href: "#about", label: "About" },
                  { href: "#contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-500 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold text-sm mb-5">Contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:heron@syncworkflow.com"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  heron@syncworkflow.com
                </a>
                <a
                  href="https://calendly.com/heroncchavez/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Book a Free Call
                </a>
                <a
                  href="https://linkedin.com/in/heroncchavez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} SyncWorkflow. All rights
              reserved.
            </div>
            <div className="text-sm text-gray-600">
              Serving California Law Firms
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
