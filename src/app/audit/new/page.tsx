"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  Globe,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const AUDIT_CATEGORIES = [
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

type AuditStatus = "idle" | "fetching" | "analyzing" | "pagespeed" | "saving" | "done" | "error";

export default function NewAuditPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [firmName, setFirmName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<AuditStatus>("idle");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setError("");
    setStatus("fetching");
    setProgress(10);

    // Animate progress while waiting
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) return prev;
        return prev + Math.random() * 8;
      });
    }, 800);

    const statusSteps: AuditStatus[] = ["fetching", "analyzing", "pagespeed", "saving"];
    let stepIdx = 0;
    const statusInterval = setInterval(() => {
      stepIdx++;
      if (stepIdx < statusSteps.length) {
        setStatus(statusSteps[stepIdx]);
      }
    }, 3000);

    try {
      const resp = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          firmName: firmName.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });

      clearInterval(progressInterval);
      clearInterval(statusInterval);

      const data = await resp.json();

      if (!resp.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong");
        setProgress(0);
        return;
      }

      setProgress(100);
      setStatus("done");

      // Redirect to audit results after a brief pause
      setTimeout(() => {
        router.push(data.url);
      }, 1000);
    } catch (err: any) {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      setStatus("error");
      setError(err.message || "Network error");
      setProgress(0);
    }
  }

  const statusMessages: Record<AuditStatus, string> = {
    idle: "",
    fetching: "Fetching your website...",
    analyzing: "Analyzing 14 audit categories...",
    pagespeed: "Running PageSpeed analysis...",
    saving: "Generating your report...",
    done: "Audit complete! Redirecting...",
    error: "Something went wrong",
  };

  const isLoading = ["fetching", "analyzing", "pagespeed", "saving"].includes(status);

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy via-[#132e5c] to-blue">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-navy/90 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">SyncWorkflow</span>
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-6">
            <Globe className="w-4 h-4" />
            Free Website Audit
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Audit Your Law Firm Website
          </h1>
          <p className="text-blue-200 text-lg max-w-lg mx-auto">
            Enter your website URL and we&apos;ll scan it across {AUDIT_CATEGORIES.length} categories in under 60 seconds.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* URL */}
            <div>
              <label htmlFor="url" className="block text-sm font-semibold text-navy mb-2">
                Website URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="url"
                  type="text"
                  placeholder="www.yourfirm.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-dark-gray placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:opacity-50 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Firm Name (optional) */}
            <div>
              <label htmlFor="firmName" className="block text-sm font-semibold text-navy mb-2">
                Firm Name <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="firmName"
                type="text"
                placeholder="e.g. Smith & Associates"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-dark-gray placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:opacity-50 disabled:bg-gray-50"
              />
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                Your Email <span className="text-gray-400 font-normal">(optional — to receive your report)</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@yourfirm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-dark-gray placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent disabled:opacity-50 disabled:bg-gray-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || status === "done"}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:bg-accent/60 text-white py-3.5 rounded-xl text-base font-semibold transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {statusMessages[status]}
                </>
              ) : status === "done" ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {statusMessages[status]}
                </>
              ) : (
                <>
                  Run Free Audit
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Progress Bar */}
            {(isLoading || status === "done") && (
              <div className="space-y-2">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-center text-med-gray">
                  {statusMessages[status]}
                </p>
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-700">Audit Failed</p>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                  <button
                    type="button"
                    onClick={() => { setStatus("idle"); setError(""); }}
                    className="text-sm text-red-700 underline mt-2"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* What We Check */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-white mb-4 text-center">
            What We Check
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {AUDIT_CATEGORIES.map((cat) => (
              <div
                key={cat}
                className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2"
              >
                <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-white/80">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
