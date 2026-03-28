import Link from 'next/link';

import { TrackEventOnLoad } from '@/components/analytics/TrackEventOnLoad';
import { EmailCaptureForm } from '@/components/forms/EmailCaptureForm';
import { WalkthroughRequestForm } from '@/components/forms/WalkthroughRequestForm';
import { FindingCard } from '@/components/review/FindingCard';
import { SiteFooter } from '@/components/site/SiteFooter';
import { BrandMark } from '@/components/site/BrandMark';
import { Button } from '@/components/ui/button';
import type { AuditRecord } from '@/lib/audit-types';

export function TeaserPage({ audit, entry }: { audit: AuditRecord; entry: string }) {
  return (
    <div className="min-h-screen">
      <TrackEventOnLoad
        event="teaser_viewed"
        properties={{
          audit_id: audit.id,
          firm_name: audit.firm.name,
          page_type: 'teaser',
        }}
      />
      <header className="border-b border-[hsl(30,28%,88%)] bg-[rgba(247,243,235,0.88)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Button asChild variant="outline" size="sm">
            <a href="#request-full-audit">Get full audit</a>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p className="eyebrow">Private review for {audit.firm.name}</p>
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
                Reviewed {audit.reviewedAt}
              </span>
            </div>
          </div>

          <aside className="rounded-[30px] border border-[hsl(30,28%,84%)] bg-white/90 p-6 shadow-[0_18px_52px_rgba(36,43,66,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
              Free audit preview
            </p>
            <p className="mt-4 text-sm leading-6 text-[hsl(221,16%,35%)]">{audit.auditSummary}</p>
            <p className="mt-3 text-sm leading-6 text-[hsl(221,16%,35%)]">{audit.reviewerNote}</p>
            <Button asChild className="mt-6 w-full" variant="brand" size="lg">
              <a href="#request-full-audit">Get full audit</a>
            </Button>
            <Button asChild className="mt-3 w-full" variant="outline" size="lg">
              <a href="#walkthrough-request">Ask for walkthrough</a>
            </Button>
            <p className="mt-4 text-sm leading-6 text-[hsl(221,16%,35%)]">
              If the review helps, I can also help fix the site, form, and reply flow.
            </p>
          </aside>
        </section>

        <section className="mt-12 grid gap-5">
          {audit.findings.map((finding) => (
            <FindingCard
              key={finding.id}
              finding={finding}
              auditId={audit.id}
              pageType="teaser"
              density="compact"
            />
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-[30px] border border-[hsl(30,28%,86%)] bg-[hsl(221,45%,18%)] p-8 text-[hsl(42,50%,96%)] shadow-[0_24px_80px_rgba(27,36,66,0.18)]">
            <p className="eyebrow !text-[hsl(31,82%,78%)]">What the full audit includes</p>
            <ul className="mt-6 grid gap-4 text-sm leading-7 text-[hsl(42,40%,88%)]">
              {audit.curiosityBullets.map((item) => (
                <li key={item} className="rounded-[22px] border border-[rgba(247,243,235,0.14)] bg-[rgba(247,243,235,0.06)] px-4 py-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5">
            <EmailCaptureForm entry={entry} firmName={audit.firm.name} ctaEmail={audit.ctaEmail} />
            <WalkthroughRequestForm
              entry={entry}
              firmName={audit.firm.name}
              source="teaser_page"
              title="Want a short walkthrough first?"
              description="Use this if you want to talk through the findings before you decide on the next step."
            />
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 border-t border-[hsl(30,28%,86%)] bg-[rgba(247,243,235,0.94)] px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
              Next step
            </p>
            <p className="text-sm text-[hsl(221,16%,34%)]">Send the full audit by email</p>
          </div>
          <Button asChild variant="brand" size="sm">
            <a href="#request-full-audit">Get it</a>
          </Button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
