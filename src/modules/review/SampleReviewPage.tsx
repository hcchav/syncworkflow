import Image from 'next/image';
import Link from 'next/link';

import { TrackEventOnLoad } from '@/components/analytics/TrackEventOnLoad';
import { FindingCard } from '@/components/review/FindingCard';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { Button } from '@/components/ui/button';
import type { AuditRecord } from '@/lib/audit-types';

export function SampleReviewPage({ audit }: { audit: AuditRecord }) {
  const sampleSummary = [
    `${audit.findings.length} sample issues`,
    'Page + form + next step',
    'Fake firm details',
  ];

  return (
    <div className="min-h-screen">
      <TrackEventOnLoad
        event="sample_review_viewed"
        properties={{
          audit_id: audit.id,
          page_type: 'sample',
        }}
      />
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div>
            <p className="eyebrow">Public sample</p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-[hsl(221,45%,18%)] sm:text-6xl">
              See what your review can look like.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[hsl(221,16%,34%)] sm:text-lg sm:leading-8">
              This page shows the format, the notes, and the first fixes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[hsl(221,16%,38%)]">
              {sampleSummary.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[hsl(30,28%,84%)] bg-white/80 px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] border border-[hsl(30,28%,84%)] bg-white/90 p-4 shadow-[0_16px_40px_rgba(36,43,66,0.06)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
                  Scope
                </p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,34%)]">
                  I check the page, the form, and the next step.
                </p>
              </div>
              <div className="rounded-[24px] border border-[hsl(30,28%,84%)] bg-white/90 p-4 shadow-[0_16px_40px_rgba(36,43,66,0.06)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
                  Output
                </p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,34%)]">
                  You get clear notes and the fix order.
                </p>
              </div>
              <div className="rounded-[24px] border border-[hsl(30,28%,84%)] bg-white/90 p-4 shadow-[0_16px_40px_rgba(36,43,66,0.06)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
                  Why it helps
                </p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,34%)]">
                  You can see the work before you ask for one.
                </p>
              </div>
            </div>
          </div>

          <aside className="overflow-hidden rounded-[32px] border border-[hsl(30,28%,84%)] bg-white/90 shadow-[0_18px_52px_rgba(36,43,66,0.08)]">
            <div className="border-b border-[hsl(30,28%,84%)] bg-[linear-gradient(180deg,rgba(250,246,239,0.96),rgba(255,255,255,0.96))] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
                Review preview
              </p>
              <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,35%)]">
                {audit.auditSummary}
              </p>
            </div>
            <div className="relative min-h-[320px] bg-[hsl(40,40%,97%)] sm:min-h-[420px]">
              <Image
                src="/images/sample-audit-preview.png"
                alt="Preview of the sample SyncWorkflow review"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-[rgba(216,200,179,0.92)] bg-[rgba(255,253,249,0.95)] p-4 shadow-[0_16px_40px_rgba(36,43,66,0.1)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
                  Quick note
                </p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,35%)]">{audit.reviewerNote}</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <div className="max-w-3xl">
            <p className="eyebrow">In this sample</p>
            <h2 className="mt-4 font-serif text-4xl text-[hsl(221,45%,18%)] sm:text-5xl">
              Here are the three sample issues.
            </h2>
            <p className="mt-4 text-base leading-7 text-[hsl(221,16%,34%)]">
              Each one shows what I saw, why it hurts, and the next fix.
            </p>
          </div>
          <div className="mt-8 grid gap-5">
          {audit.findings.map((finding) => (
            <FindingCard
              key={finding.id}
              finding={finding}
              auditId={audit.id}
              pageType="sample"
              density="compact"
            />
          ))}
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-[30px] border border-[hsl(30,28%,86%)] bg-[hsl(221,45%,18%)] p-8 text-[hsl(42,50%,96%)] shadow-[0_24px_80px_rgba(27,36,66,0.18)]">
            <p className="eyebrow !text-[hsl(31,82%,78%)]">What the full review adds</p>
            <h2 className="mt-4 font-serif text-4xl">The real review goes deeper.</h2>
            <ul className="mt-6 grid gap-4 text-sm leading-7 text-[hsl(42,40%,88%)]">
              {audit.curiosityBullets.map((item) => (
                <li
                  key={item}
                  className="rounded-[22px] border border-[rgba(247,243,235,0.14)] bg-[rgba(247,243,235,0.06)] px-4 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[30px] border border-[hsl(30,28%,84%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,246,239,0.96))] p-6 shadow-[0_18px_52px_rgba(36,43,66,0.1)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
              Want one for your site?
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[hsl(221,45%,18%)]">
              Ask for your free audit.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[hsl(221,16%,34%)]">
              The real review is private and built for your site, form, and next step. It shows what to fix first.
            </p>
            <Button asChild className="mt-6 w-full" variant="brand" size="lg">
              <Link href="/request-audit">Get Free Audit</Link>
            </Button>
            <Button asChild className="mt-3 w-full" variant="outline" size="lg">
              <Link href="/#web-team">See ongoing help</Link>
            </Button>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 border-t border-[hsl(30,28%,86%)] bg-[rgba(247,243,235,0.94)] px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(24,60%,40%)]">
              Next step
            </p>
            <p className="text-sm text-[hsl(221,16%,34%)]">Ask for your free audit.</p>
          </div>
          <Button asChild variant="brand" size="sm">
            <Link href="/request-audit">Get it</Link>
          </Button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
