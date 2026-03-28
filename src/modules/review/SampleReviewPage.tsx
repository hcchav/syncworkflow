import Link from 'next/link';

import { TrackEventOnLoad } from '@/components/analytics/TrackEventOnLoad';
import { FindingCard } from '@/components/review/FindingCard';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { Button } from '@/components/ui/button';
import type { AuditRecord } from '@/lib/audit-types';

export function SampleReviewPage({ audit }: { audit: AuditRecord }) {
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
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p className="eyebrow">Sanitized sample review</p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-[hsl(221,45%,18%)] sm:text-6xl">
              {audit.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[hsl(221,16%,34%)] sm:text-lg sm:leading-8">
              {audit.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[hsl(221,16%,38%)]">
              <span className="rounded-full border border-[hsl(30,28%,84%)] bg-white/80 px-4 py-2">
                {audit.firm.practiceArea}
              </span>
              <span className="rounded-full border border-[hsl(30,28%,84%)] bg-white/80 px-4 py-2">
                {audit.firm.location}
              </span>
              <span className="rounded-full border border-[hsl(30,28%,84%)] bg-white/80 px-4 py-2">
                Public sample
              </span>
            </div>
          </div>

          <aside className="rounded-[30px] border border-[hsl(30,28%,84%)] bg-white/90 p-6 shadow-[0_18px_52px_rgba(36,43,66,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
              Why this page exists
            </p>
            <p className="mt-4 text-sm leading-6 text-[hsl(221,16%,35%)]">{audit.auditSummary}</p>
            <p className="mt-3 text-sm leading-6 text-[hsl(221,16%,35%)]">{audit.reviewerNote}</p>
            <Button asChild className="mt-6 w-full" variant="brand" size="lg">
              <Link href="/request-audit">Get Free Audit</Link>
            </Button>
            <Button asChild className="mt-3 w-full" variant="outline" size="lg">
              <Link href="/">Back to homepage</Link>
            </Button>
          </aside>
        </section>

        <section className="mt-12 grid gap-5">
          {audit.findings.map((finding) => (
            <FindingCard
              key={finding.id}
              finding={finding}
              auditId={audit.id}
              pageType="sample"
              density="compact"
            />
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-[30px] border border-[hsl(30,28%,86%)] bg-[hsl(221,45%,18%)] p-8 text-[hsl(42,50%,96%)] shadow-[0_24px_80px_rgba(27,36,66,0.18)]">
            <p className="eyebrow !text-[hsl(31,82%,78%)]">What the real audit includes</p>
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
              Want your own review?
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[hsl(221,45%,18%)]">
              Ask for your own free audit.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[hsl(221,16%,34%)]">
              The real version is private and built for your site, form, and reply path. It shows what to fix first.
            </p>
            <Button asChild className="mt-6 w-full" variant="brand" size="lg">
              <Link href="/request-audit">Get Free Audit</Link>
            </Button>
            <Button asChild className="mt-3 w-full" variant="outline" size="lg">
              <Link href="/#web-team">See how the web team model works</Link>
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
            <p className="text-sm text-[hsl(221,16%,34%)]">Ask for your own free audit.</p>
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
