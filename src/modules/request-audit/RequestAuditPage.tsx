import { TrackEventOnLoad } from '@/components/analytics/TrackEventOnLoad';
import { RequestAuditForm } from '@/components/forms/RequestAuditForm';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';

export function RequestAuditPage() {
  return (
    <div className="min-h-screen">
      <TrackEventOnLoad event="free_audit_request_viewed" properties={{ page_type: 'request_audit' }} />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px]">
          <section>
            <p className="eyebrow">Free audit request</p>
            <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight text-[hsl(221,45%,18%)] sm:text-6xl">
              Start with your email and website, then decide whether ongoing help makes sense.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[hsl(221,16%,34%)]">
              This is for law firms that want a direct review of website conversion, intake
              friction, response speed, and the full first-touch experience.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] border border-[hsl(30,28%,86%)] bg-white/90 p-5 shadow-sm">
                <p className="text-sm font-medium text-[hsl(221,45%,18%)]">What I review</p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,35%)]">
                  Homepage clarity, mobile contact flow, intake forms, and post-submit expectations.
                </p>
              </div>
              <div className="rounded-[28px] border border-[hsl(30,28%,86%)] bg-white/90 p-5 shadow-sm">
                <p className="text-sm font-medium text-[hsl(221,45%,18%)]">What you send</p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,35%)]">
                  Your work email and website first. Extra context is optional.
                </p>
              </div>
              <div className="rounded-[28px] border border-[hsl(30,28%,86%)] bg-white/90 p-5 shadow-sm">
                <p className="text-sm font-medium text-[hsl(221,45%,18%)]">What happens next</p>
                <p className="mt-2 text-sm leading-6 text-[hsl(221,16%,35%)]">
                  I review the site, prepare the audit, and follow up with the best next step from there.
                </p>
              </div>
            </div>
          </section>

          <aside>
            <RequestAuditForm
              source="request_audit_page"
              helperText="Start with the two required fields. Add optional detail if you want the review pointed at a specific issue."
            />
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
