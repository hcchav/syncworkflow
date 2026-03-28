import Link from 'next/link';

import { TrackEventOnLoad } from '@/components/analytics/TrackEventOnLoad';
import { WalkthroughRequestForm } from '@/components/forms/WalkthroughRequestForm';
import { FindingCard } from '@/components/review/FindingCard';
import { SiteFooter } from '@/components/site/SiteFooter';
import { BrandMark } from '@/components/site/BrandMark';
import { Button } from '@/components/ui/button';
import type { AuditRecord } from '@/lib/audit-types';

export function FullAuditPage({ audit, entry }: { audit: AuditRecord; entry: string }) {
  return (
    <div className="min-h-screen">
      <TrackEventOnLoad
        event="full_audit_viewed"
        properties={{
          audit_id: audit.id,
          firm_name: audit.firm.name,
          page_type: 'full_audit',
        }}
      />
      <header className="border-b border-[hsl(30,28%,88%)] bg-[rgba(247,243,235,0.88)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <Button asChild variant="outline" size="sm">
            <a href="#walkthrough-request">Ask for walkthrough</a>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-[hsl(30,28%,84%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(249,243,233,0.94))] p-8 shadow-[0_24px_80px_rgba(36,43,66,0.1)]">
          <p className="eyebrow">Full audit for {audit.firm.name}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-[hsl(221,45%,18%)] sm:text-6xl">
            The biggest gains should come from clarity, form length, and reply speed.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[hsl(221,16%,34%)]">
            This page builds on the preview and shows the changes most likely to improve calls without a full redesign.
          </p>
        </section>

        <section className="mt-10 grid gap-5">
          {audit.findings.map((finding) => (
            <FindingCard key={finding.id} finding={finding} auditId={audit.id} pageType="full_audit" />
          ))}
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {audit.fullAuditSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[30px] border border-[hsl(30,28%,86%)] bg-white/90 p-6 shadow-[0_18px_52px_rgba(36,43,66,0.08)]"
            >
              <h2 className="font-serif text-2xl text-[hsl(221,45%,18%)]">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[hsl(221,16%,34%)]">{section.summary}</p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[hsl(221,16%,34%)]">
                {section.bullets.map((item) => (
                  <li key={item} className="rounded-[20px] bg-[hsl(40,40%,97%)] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-[22px] border border-[hsl(30,28%,86%)] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
                  Implementation bridge
                </p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,34%)]">
                  {section.implementation}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-6 rounded-[34px] border border-[hsl(30,28%,84%)] bg-[hsl(221,45%,18%)] p-8 text-[hsl(42,50%,96%)] shadow-[0_24px_80px_rgba(27,36,66,0.18)] lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <p className="eyebrow !text-[hsl(31,82%,78%)]">How implementation fits</p>
            <h2 className="mt-4 font-serif text-4xl">If you want, I can also make the fixes.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[hsl(42,40%,88%)]">
              That can mean site updates, form changes, reply flow fixes, and light automation where it helps.
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[hsl(42,40%,88%)]">
              {audit.implementationOptions.map((item) => (
                <li key={item} className="rounded-[22px] border border-[rgba(247,243,235,0.14)] bg-[rgba(247,243,235,0.06)] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[28px] bg-[rgba(247,243,235,0.08)] p-6">
              <p className="text-sm leading-7 text-[hsl(42,40%,88%)]">
                If a walkthrough would help, send the request and I can talk through the top fixes first.
              </p>
            </div>
            <WalkthroughRequestForm
              entry={entry}
              firmName={audit.firm.name}
              source="full_audit_page"
              title="Request a walkthrough"
              description="If you want to talk through the audit before we discuss ongoing help, send this here."
            />
            <Button asChild className="mt-3 w-full" variant="outline" size="lg">
              <a href={`mailto:${audit.ctaEmail}?subject=${encodeURIComponent(`Questions about the ${audit.firm.name} audit`)}`}>
                Reply by email
              </a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
