"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Shield,
  Scale,
  Users,
  FileText,
  MessageSquare,
  Star,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Briefcase,
  Gavel,
  Heart,
  Building,
  Send,
} from "lucide-react";
import { ChatWidget } from "@/components/chat-widget";

// ── Practice area icon mapping ──
const PA_ICONS: Record<string, typeof Scale> = {
  "personal injury": Gavel,
  "family law": Heart,
  "workers comp": Shield,
  "workers' comp": Shield,
  "workers compensation": Shield,
  "criminal defense": Scale,
  "immigration": Users,
  "business law": Building,
  "estate planning": FileText,
  "employment law": Briefcase,
  "real estate": Building,
};

function getIcon(area: string) {
  const lower = area.toLowerCase().trim();
  for (const [key, Icon] of Object.entries(PA_ICONS)) {
    if (lower.includes(key)) return Icon;
  }
  return Scale;
}

// ── Sample testimonials ──
const sampleTestimonials = [
  {
    quote: "From the first phone call, I knew I was in good hands. They handled everything so I could focus on my recovery. I couldn't have asked for a better outcome.",
    name: "Maria G.",
    context: "Client",
    rating: 5,
  },
  {
    quote: "Professional, responsive, and genuinely cared about my case. They kept me informed every step of the way and fought hard for my family.",
    name: "James T.",
    context: "Client",
    rating: 5,
  },
  {
    quote: "I was overwhelmed after my accident but this firm made the legal process simple and stress-free. Highly recommend to anyone who needs a dedicated attorney.",
    name: "Sarah L.",
    context: "Client",
    rating: 5,
  },
];

// ── Case type options ──
const CASE_TYPES = [
  "Personal Injury",
  "Car Accident",
  "Workers' Compensation",
  "Family Law",
  "Criminal Defense",
  "Immigration",
  "Employment Law",
  "Other",
];

export default function DemoSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const firm = useQuery(api.firms.getBySlug, { slug: slug ?? "" });
  const audit = useQuery(api.audits.getByFirmId, firm ? { firmId: firm._id } : "skip");
  const recordView = useMutation(api.pageViews.record);
  const submitLead = useMutation(api.demoLeads.submit);
  const viewRecorded = useRef(false);

  // Intake form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Record demo view
  useEffect(() => {
    if (firm && audit && !viewRecorded.current) {
      viewRecorded.current = true;
      recordView({
        auditId: audit._id,
        firmId: firm._id,
        slug,
        event: "demo_view",
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      });
    }
  }, [firm, audit, slug, recordView]);

  const trackClick = (event: string) => {
    if (firm && audit) {
      recordView({ auditId: audit._id, firmId: firm._id, slug, event });
    }
  };

  async function handleIntakeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firm || formSubmitting) return;
    setFormSubmitting(true);
    try {
      await submitLead({
        firmId: firm._id,
        slug,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        caseType: formData.caseType || undefined,
        message: formData.message || undefined,
        createdAt: Date.now(),
      });
      trackClick("demo_intake_submit");
      setFormSubmitted(true);
    } catch {
      // silently fail
    }
    setFormSubmitting(false);
  }

  // Loading
  if (firm === undefined || audit === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-med-gray">Loading demo site...</p>
        </div>
      </div>
    );
  }

  if (!firm || !audit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-score-amber mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-navy mb-2">Demo Not Found</h1>
          <p className="text-med-gray">This demo link may be invalid. Run an audit first to generate a demo.</p>
          <Link href="/audit/new" className="inline-flex items-center gap-2 mt-6 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Run Free Audit
          </Link>
        </div>
      </div>
    );
  }

  const practiceAreas = firm.practiceAreas
    ? firm.practiceAreas.split(",").map((a) => a.trim()).filter(Boolean)
    : ["Personal Injury", "Workers' Compensation", "Family Law"];

  const firmCity = firm.city || "California";
  const firmPhone = firm.phone || "(555) 123-4567";
  const firmEmail = firm.email || `contact@${new URL(firm.website).hostname}`;

  return (
    <div className="min-h-screen bg-white">
      {/* ── SyncWorkflow Demo Banner ── */}
      <div className="bg-accent text-white text-center py-2.5 px-4 text-sm fixed top-0 w-full z-[60]">
        <span className="font-medium">
          This is a demo built by SyncWorkflow —{" "}
          <Link
            href="https://calendly.com/heroncchavez/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("demo_calendly_click")}
            className="underline font-bold hover:text-white/90"
          >
            Book a call to get this for your firm
          </Link>
        </span>
      </div>

      {/* ── Law Firm Nav ── */}
      <nav className="fixed top-[38px] w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-navy rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-navy text-base leading-tight">{firm.name}</div>
              <div className="text-xs text-med-gray">{firmCity}</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#practice-areas" className="text-med-gray hover:text-navy transition-colors">Practice Areas</a>
            <a href="#about" className="text-med-gray hover:text-navy transition-colors">About</a>
            <a href="#testimonials" className="text-med-gray hover:text-navy transition-colors">Testimonials</a>
            <a href="#contact" className="text-med-gray hover:text-navy transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#intake-form" className="bg-navy hover:bg-navy/90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
              Free Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-[120px] pb-20 bg-gradient-to-br from-[#0a1a3a] via-navy to-[#1a3a6a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                Trusted {firmCity} Attorneys
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Fighting for Your Rights in{" "}
                <span className="text-accent">{firmCity}</span>
              </h1>
              <p className="text-lg text-blue-200 mb-8 leading-relaxed max-w-xl">
                {firm.name} provides dedicated legal representation for {practiceAreas.slice(0, 2).join(" and ").toLowerCase()} cases.
                Schedule your free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#intake-form"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Free Case Review
                </a>
                <a
                  href="#schedule"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl text-base font-semibold transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a Call
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-blue-200 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {firmPhone}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  24/7 Available
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Cases Won" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "$10M+", label: "Recovered for Clients" },
                  { value: "15+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice Areas ── */}
      <section id="practice-areas" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Practice Areas</h2>
            <p className="text-med-gray max-w-xl mx-auto">
              Serving {firmCity} with experienced legal representation across multiple practice areas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area) => {
              const Icon = getIcon(area);
              return (
                <div key={area} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow group">
                  <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-6 h-6 text-navy group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-semibold text-navy text-lg mb-2">{area}</h3>
                  <p className="text-sm text-med-gray leading-relaxed">
                    Our {area.toLowerCase()} attorneys have years of experience protecting the rights of {firmCity} residents. Contact us for a free case evaluation.
                  </p>
                  <a href="#intake-form" className="inline-flex items-center gap-1 text-accent text-sm font-semibold mt-4 hover:underline">
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Intake Form ── */}
      <section id="intake-form" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-4">Free Case Evaluation</h2>
              <p className="text-med-gray leading-relaxed mb-6">
                Tell us about your case and one of our attorneys will review it within 24 hours. All consultations are free and confidential.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: "Response within 24 hours" },
                  { icon: Shield, text: "100% confidential" },
                  { icon: CheckCircle, text: "No obligation, no fees unless we win" },
                  { icon: Phone, text: "Available 24/7 for emergencies" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-dark-gray">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy mb-2">Thank You!</h3>
                  <p className="text-med-gray text-sm">
                    Your case information has been submitted. An attorney will review your case and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleIntakeSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-navy mb-2">Submit Your Case</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-name" className="block text-sm font-medium text-navy mb-1">Full Name *</label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark-gray placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-email" className="block text-sm font-medium text-navy mb-1">Email *</label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@email.com"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark-gray placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-phone" className="block text-sm font-medium text-navy mb-1">Phone</label>
                      <input
                        id="lead-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark-gray placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-case" className="block text-sm font-medium text-navy mb-1">Case Type</label>
                      <select
                        id="lead-case"
                        value={formData.caseType}
                        onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark-gray focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy bg-white"
                      >
                        <option value="">Select type...</option>
                        {CASE_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lead-message" className="block text-sm font-medium text-navy mb-1">Describe Your Case</label>
                    <textarea
                      id="lead-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what happened and how we can help..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark-gray placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 disabled:bg-navy/60 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {formSubmitting ? "Submitting..." : "Submit Free Case Review"}
                  </button>
                  <p className="text-xs text-med-gray text-center">
                    By submitting, you agree to be contacted about your case. 100% confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy mb-4">What Our Clients Say</h2>
            <p className="text-med-gray max-w-xl mx-auto">
              Real stories from people we&apos;ve helped in {firmCity} and across California.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleTestimonials.map((t, i) => (
              <blockquote key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-dark-gray leading-relaxed mb-4 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-navy text-sm">{t.name}</div>
                  <div className="text-xs text-med-gray">{t.context}</div>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="text-xs text-center text-med-gray mt-6 italic">
            * Sample testimonials for demonstration purposes
          </p>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">About {firm.name}</h2>
              <p className="text-med-gray leading-relaxed mb-4">
                Serving {firmCity} and the surrounding communities, {firm.name} is dedicated to providing
                aggressive legal representation while maintaining the personal attention every client deserves.
              </p>
              <p className="text-med-gray leading-relaxed mb-6">
                Our team brings decades of combined experience in {practiceAreas.slice(0, 3).join(", ").toLowerCase()}.
                We understand that legal issues are stressful, which is why we make the process as straightforward
                as possible — starting with a free consultation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "15+", label: "Years Experience" },
                  { value: "500+", label: "Cases Handled" },
                  { value: "98%", label: "Satisfaction Rate" },
                  { value: "24/7", label: "Availability" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-navy">{s.value}</div>
                    <div className="text-xs text-med-gray mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy via-[#132e5c] to-[#1a3a6a] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Why Choose Us</h3>
              <div className="space-y-4">
                {[
                  "No fees unless we win your case",
                  "Free initial consultation",
                  "Aggressive representation in and out of court",
                  "Personalized attention — you're not just a case number",
                  "Bilingual staff available",
                  "Convenient office in " + firmCity,
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-blue-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Schedule / Calendly ── */}
      <section id="schedule" className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Schedule Your Free Consultation</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Choose a time that works for you. Our team will call you to discuss your case — no obligation.
          </p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://calendly.com/heroncchavez/30min?hide_gdpr_banner=1"
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a consultation"
              className="w-full"
              onLoad={() => trackClick("demo_calendly_click")}
            />
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Contact Us</h2>
              <p className="text-med-gray leading-relaxed mb-8">
                Reach out today for a free, no-obligation consultation. We&apos;re here to help 24/7.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">Phone</div>
                    <div className="text-sm text-med-gray">{firmPhone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">Email</div>
                    <div className="text-sm text-med-gray">{firmEmail}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">Location</div>
                    <div className="text-sm text-med-gray">{firmCity}, California</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-navy/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">Hours</div>
                    <div className="text-sm text-med-gray">Mon–Fri 8am–6pm · 24/7 for emergencies</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Google Maps placeholder */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-[400px] flex items-center justify-center">
              <div className="text-center text-med-gray">
                <MapPin className="w-10 h-10 mx-auto mb-3 text-navy/30" />
                <p className="text-sm font-medium">Google Maps</p>
                <p className="text-xs">{firmCity}, California</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0a1a3a] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">{firm.name}</span>
              </div>
              <p className="text-blue-300 text-sm leading-relaxed">
                Dedicated legal representation for {firmCity} and all of California.
                Contact us for a free consultation.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Practice Areas</h3>
              <div className="space-y-2">
                {practiceAreas.map((area) => (
                  <a key={area} href="#practice-areas" className="block text-sm text-blue-300 hover:text-white transition-colors">
                    {area}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-blue-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {firmPhone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {firmEmail}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {firmCity}, CA
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-blue-400">
              &copy; {new Date().getFullYear()} {firm.name}. All rights reserved.
            </div>
            <div className="text-xs text-blue-400/60">
              Demo site by{" "}
              <Link href="https://syncworkflow.com" target="_blank" className="text-accent hover:underline">
                SyncWorkflow
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── AI Chat Widget ── */}
      <ChatWidget
        firmName={firm.name}
        city={firmCity}
        practiceAreas={practiceAreas}
        phone={firmPhone}
        email={firmEmail}
      />

      {/* ── JSON-LD Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: firm.name,
            url: firm.website,
            telephone: firmPhone,
            email: firmEmail,
            address: {
              "@type": "PostalAddress",
              addressLocality: firmCity,
              addressRegion: "CA",
              addressCountry: "US",
            },
            areaServed: firmCity,
            priceRange: "Free Consultation",
          }),
        }}
      />
    </div>
  );
}
