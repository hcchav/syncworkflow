import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  FileSearch,
  MessagesSquare,
  Send,
} from 'lucide-react';

import { TrackEventOnLoad } from '@/components/analytics/TrackEventOnLoad';
import { RequestAuditForm } from '@/components/forms/RequestAuditForm';
import { IntakeCheckSection } from '@/components/sections/IntakeCheckSection';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { Button } from '@/components/ui/button';
import { getSampleAudit } from '@/lib/local-audits';

const improvements = [
  {
    title: 'Weak homepage message',
    body: 'The first screen should say who the firm helps and what to do next.',
    icon: FileSearch,
  },
  {
    title: 'Long intake form',
    body: 'The first form should stay short on mobile.',
    icon: MessagesSquare,
  },
  {
    title: 'Weak response trust',
    body: 'The site should show what happens after submit.',
    icon: Bot,
  },
];

const process = [
  'Send your website and work email.',
  'I review the page, intake path, and reply flow.',
  'You get the biggest leaks first.',
  'If it helps, I can keep improving the site with you.',
];

const founderTiles = [
  {
    kicker: '3 layers',
    title: 'Page, form, and follow-up',
    body: 'Reviews the first-touch path as one system.',
  },
  {
    kicker: '1 output',
    title: 'Biggest leaks first',
    body: 'Clear priorities before any ongoing support.',
  },
];

export function HomePage() {
  const sampleAudit = getSampleAudit();
  const heroProof = ['2 fields', 'Private review', 'Fast first step'];
  const heroPreviewFinding = sampleAudit.findings[0];

  return (
    <div className="min-h-screen">
      <TrackEventOnLoad event="homepage_viewed" properties={{ page_type: 'homepage' }} />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-[rgba(216,200,179,0.58)]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(185,129,50,0.2),transparent_28%),radial-gradient(circle_at_top_right,rgba(141,167,156,0.2),transparent_30%),linear-gradient(180deg,rgba(255,253,249,0.92),rgba(246,240,231,0.78))]" />
          <div className="absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(24,38,63,0.16),transparent)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(560px,1fr)] lg:gap-10 lg:px-8 lg:py-20">
            <div className="max-w-lg lg:pt-4">
              <p className="eyebrow">Site + form review</p>
              <h1 className="mt-4 font-serif text-[2.8rem] leading-[0.92] text-[#18263F] sm:text-[4.35rem]">
                Find what is costing your law firm new calls.
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#556174] sm:mt-5 sm:text-xl sm:leading-8">
                I review your page, form, and next step.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
                <Button asChild size="lg" variant="brand">
                  <Link href="#hero-audit-form">
                    Get Free Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  href="/sample-review"
                  className="inline-flex min-h-11 items-center text-sm font-medium text-[#B98132] hover:text-[#9b6d28]"
                >
                  See sample review
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                {heroProof.map((item) => (
                  <div
                    key={item}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(216,200,179,0.88)] bg-[rgba(255,253,249,0.82)] px-4 py-2 text-sm text-[#485568] shadow-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#B98132]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-2">
              <div className="absolute left-10 right-10 top-10 -z-10 h-[320px] rounded-[42px] bg-[radial-gradient(circle_at_center,rgba(24,38,63,0.18),transparent_70%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[34px] border border-[rgba(216,200,179,0.7)] bg-[#FFFDF9] shadow-[0_28px_90px_rgba(24,38,63,0.16)]">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
                  <div className="order-2 flex h-full flex-col border-b border-[rgba(216,200,179,0.6)] lg:order-1 lg:border-r lg:border-b-0">
                    <div className="flex items-center justify-between border-b border-[rgba(216,200,179,0.6)] bg-[rgba(246,240,231,0.92)] px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(12,76%,68%)]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(39,86%,64%)]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(148,34%,60%)]" />
                      </div>
                      <span className="rounded-full border border-[rgba(24,38,63,0.08)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7380]">
                        Sample review
                      </span>
                    </div>
                    <div className="relative min-h-[240px] flex-1 overflow-hidden bg-[#F6F0E7] sm:min-h-[320px]">
                      <Image
                        src="/images/sample-audit-crop.png"
                        alt="Cropped preview of a SyncWorkflow audit page"
                        fill
                        priority
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-[rgba(216,200,179,0.9)] bg-[rgba(255,253,249,0.92)] p-3.5 shadow-[0_18px_40px_rgba(24,38,63,0.12)] backdrop-blur sm:inset-x-5 sm:bottom-5 sm:rounded-[24px] sm:p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B98132]">
                              Sample finding
                            </p>
                            <p className="mt-1 text-sm font-semibold text-[#18263F]">
                              {heroPreviewFinding.label}
                            </p>
                          </div>
                          <span className="rounded-full bg-[#FFF1DE] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9b6d28]">
                            {heroPreviewFinding.priority}
                          </span>
                        </div>
                        <div className="mt-3 hidden flex-wrap gap-2 sm:flex">
                          {sampleAudit.findings.map((finding) => (
                            <span
                              key={finding.id}
                              className="rounded-full border border-[rgba(216,200,179,0.9)] bg-white/92 px-3 py-1 text-[11px] font-medium text-[#556174]"
                            >
                              {finding.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    id="hero-audit-form"
                    className="order-1 bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(246,240,231,0.98))] p-5 sm:p-6 lg:order-2 lg:p-7"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B98132]">
                      Start here
                    </p>
                    <h2 className="mt-2 font-serif text-[1.9rem] leading-tight text-[#18263F]">
                      Two fields to start.
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#556174]">
                      Work email and website. That is enough.
                    </p>
                    <RequestAuditForm
                      compact
                      source="homepage_hero"
                      submitLabel="Get Free Audit"
                      helperText="Private review. No long form."
                      showDetailsToggle={false}
                      className="mt-4 border-0 bg-transparent p-0 shadow-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="relative overflow-hidden rounded-[34px] border border-[rgba(216,200,179,0.86)] bg-[#18263F] p-8 text-[#FFF7EC] shadow-[0_24px_80px_rgba(24,38,63,0.18)] sm:p-10">
              <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-[rgba(185,129,50,0.16)] blur-3xl" />
              <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-[rgba(141,167,156,0.18)] blur-3xl" />
              <div className="relative">
                <p className="eyebrow !text-[#E3BE8B]">Why this review helps</p>
                <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[0.96] sm:text-[3.2rem]">
                  I check the page, the form, and the next step together.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#E6DDD1]">
                  I bring 10 years in IT, marketing systems, and legal SaaS.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[28px] border border-[rgba(216,200,179,0.88)] bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(246,240,231,0.92))] p-6 shadow-[0_18px_52px_rgba(24,38,63,0.08)] md:col-span-3 lg:col-span-1">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[24px] border border-[rgba(216,200,179,0.92)] bg-[#EDE1D1] shadow-[0_16px_32px_rgba(24,38,63,0.12)]">
                    <Image
                      src="/images/founder-placeholder.svg"
                      alt="Founder portrait placeholder"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B98132]">
                      Founder-led
                    </p>
                    <div className="mt-3 max-w-[280px]">
                      <Image
                        src="/images/founder-lockup.png"
                        alt=""
                        width={900}
                        height={220}
                        className="h-auto w-full"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#556174]">
                      Founder-led review with 10 years in IT, marketing systems, and legal SaaS.
                    </p>
                  </div>
                </div>
              </div>
              {founderTiles.map((tile) => (
                <div
                  key={tile.title}
                  className="rounded-[28px] border border-[rgba(216,200,179,0.88)] bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(246,240,231,0.92))] p-6 shadow-[0_18px_52px_rgba(24,38,63,0.08)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B98132]">
                    {tile.kicker}
                  </p>
                  <h3 className="mt-3 font-serif text-[1.9rem] leading-tight text-[#18263F]">
                    {tile.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#556174]">{tile.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" id="what-we-improve">
          <div className="max-w-3xl">
            <p className="eyebrow">What I fix first</p>
            <h2 className="mt-4 font-serif text-4xl text-[#18263F] sm:text-5xl">
              Most law firm sites lose good calls in the first minute.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#556174]">
              I check the page, the form, and the next step together. That is where drop-off starts.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {improvements.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[30px] border border-[rgba(216,200,179,0.88)] bg-[rgba(255,253,249,0.92)] p-6 shadow-[0_18px_52px_rgba(24,38,63,0.08)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1DE] text-[#B98132]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-[#18263F]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#556174]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <IntakeCheckSection />

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" id="how-it-works">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-[34px] border border-[rgba(216,200,179,0.88)] bg-[#18263F] p-8 text-[#FFF7EC] shadow-[0_24px_80px_rgba(24,38,63,0.2)]">
              <p className="eyebrow !text-[#E3BE8B]">How it works</p>
              <ol className="mt-6 grid gap-5 text-sm leading-7 text-[#E6DDD1]">
                {process.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(255,247,236,0.12)] text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[34px] border border-[rgba(216,200,179,0.88)] bg-[rgba(255,253,249,0.92)] p-8 shadow-[0_18px_52px_rgba(24,38,63,0.08)]">
              <p className="eyebrow">What I check</p>
              <h3 className="mt-4 font-serif text-3xl text-[#18263F]">
                Page, form, and reply path.
              </h3>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-[#556174]">
                <p>Homepage clarity and first action.</p>
                <p>Form friction and mobile effort.</p>
                <p>Reply message after submit.</p>
              </div>
              <div className="mt-6 grid gap-3">
                <div className="flex items-start gap-3 rounded-[24px] bg-[#FFF8F0] p-4">
                  <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[#B98132]" />
                  <p className="text-sm leading-6 text-[#556174]">
                    Direct diagnosis before any monthly support.
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-[24px] bg-[#FFF8F0] p-4">
                  <Send className="mt-1 h-5 w-5 shrink-0 text-[#B98132]" />
                  <p className="text-sm leading-6 text-[#556174]">
                    Biggest issues first, in plain language.
                  </p>
                </div>
              </div>
              <Button asChild className="mt-6 w-full" variant="brand" size="lg">
                <Link href="/request-audit">Get Free Audit</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" id="web-team">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="rounded-[34px] border border-[rgba(216,200,179,0.88)] bg-[rgba(255,253,249,0.92)] p-8 shadow-[0_18px_52px_rgba(24,38,63,0.08)]">
              <p className="eyebrow">Ongoing help</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl text-[#18263F] sm:text-5xl">
                If the audit helps, I can keep improving the site with you.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#556174]">
                Ongoing help focuses on the parts of the site and next step that need the most work.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[26px] bg-[#FFF8F0] p-5">
                  <p className="text-sm font-medium text-[#18263F]">Core support</p>
                  <p className="mt-2 text-sm leading-6 text-[#556174]">
                    Website updates, conversion fixes, and intake improvement.
                  </p>
                </div>
                <div className="rounded-[26px] bg-[#FFF8F0] p-5">
                  <p className="text-sm font-medium text-[#18263F]">Add-on work</p>
                  <p className="mt-2 text-sm leading-6 text-[#556174]">
                    Chatbots, automation, and workflow help when it solves a real bottleneck.
                  </p>
                </div>
              </div>
            </div>

            <aside className="rounded-[34px] border border-[rgba(216,200,179,0.88)] bg-[#18263F] p-8 text-[#FFF7EC] shadow-[0_24px_80px_rgba(24,38,63,0.18)]">
              <p className="eyebrow !text-[#E3BE8B]">Why start this way</p>
              <h3 className="mt-4 font-serif text-3xl">Review first. Ongoing help after.</h3>
              <p className="mt-4 text-sm leading-7 text-[#E6DDD1]">
                You can inspect the work before deciding on ongoing help.
              </p>
              <Button asChild className="mt-6 w-full" variant="brandSecondary" size="lg">
                <Link href="/request-audit">Get Free Audit</Link>
              </Button>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="rounded-[36px] border border-[rgba(216,200,179,0.88)] bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(246,240,231,0.98))] p-8 shadow-[0_22px_70px_rgba(24,38,63,0.1)] sm:p-10">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl text-[#18263F] sm:text-5xl">
              Start with the free audit.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#556174]">
              See what is slowing calls before you pay for more help.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="brand">
                <Link href="/request-audit">Get Free Audit</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sample-review">See Sample Review</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <div className="sticky bottom-0 z-30 border-t border-[rgba(216,200,179,0.86)] bg-[rgba(246,240,231,0.94)] px-3 py-2.5 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B98132]">
              Free audit
            </p>
            <p className="text-sm text-[#556174]">
              Email and website to start.
            </p>
          </div>
          <Button asChild variant="brand" size="sm">
            <Link href="/request-audit">Get Free Audit</Link>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
