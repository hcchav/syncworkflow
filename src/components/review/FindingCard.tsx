'use client';

import { useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-js/react';

import type { AuditFinding } from '@/lib/audit-types';

export function FindingCard({
  finding,
  auditId,
  pageType,
  density = 'detailed',
}: {
  finding: AuditFinding;
  auditId: string;
  pageType: 'teaser' | 'sample' | 'full_audit';
  density?: 'compact' | 'detailed';
}) {
  const posthog = usePostHog();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node || !posthog) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        posthog.capture('finding_viewed', {
          audit_id: auditId,
          finding_id: finding.id,
          finding_priority: finding.priority,
          page_type: pageType,
        });

        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [auditId, finding.id, finding.priority, pageType, posthog]);

  return (
    <div
      ref={ref}
      className={`rounded-[28px] border border-[hsl(30,28%,86%)] bg-white/90 shadow-[0_16px_48px_rgba(42,49,77,0.08)] ${
        density === 'compact' ? 'p-5 sm:p-6' : 'p-6'
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(221,18%,42%)]">
          {finding.label}
        </span>
        <span className="rounded-full bg-[hsl(31,86%,93%)] px-3 py-1 text-xs font-semibold text-[hsl(24,66%,36%)]">
          {finding.priority}
        </span>
      </div>
      <h3 className="font-serif text-2xl text-[hsl(221,45%,18%)]">{finding.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[hsl(221,16%,34%)]">{finding.detail}</p>

      {density === 'compact' ? (
        <div className="mt-5 grid gap-3 text-sm leading-6 text-[hsl(221,16%,34%)]">
          <div className="rounded-[20px] bg-[hsl(40,40%,97%)] px-4 py-3">
            <p className="font-medium text-[hsl(221,45%,18%)]">Observed</p>
            <p className="mt-1">{finding.evidence}</p>
          </div>
          <div className="rounded-[20px] bg-[hsl(40,40%,97%)] px-4 py-3">
            <p className="font-medium text-[hsl(221,45%,18%)]">Why it matters</p>
            <p className="mt-1">{finding.impact}</p>
          </div>
          <div className="rounded-[20px] bg-[hsl(40,40%,97%)] px-4 py-3">
            <p className="font-medium text-[hsl(221,45%,18%)]">Fix direction</p>
            <p className="mt-1">{finding.recommendation}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 rounded-[22px] bg-[hsl(40,40%,97%)] p-4 text-sm text-[hsl(221,16%,30%)]">
            <p className="font-medium text-[hsl(221,45%,18%)]">Observed</p>
            <p className="mt-2">{finding.evidence}</p>
          </div>
          <div className="mt-4 grid gap-4 text-sm leading-6 text-[hsl(221,16%,34%)] md:grid-cols-2">
            <div>
              <p className="font-medium text-[hsl(221,45%,18%)]">Why it matters</p>
              <p className="mt-1">{finding.impact}</p>
            </div>
            <div>
              <p className="font-medium text-[hsl(221,45%,18%)]">Fix direction</p>
              <p className="mt-1">{finding.recommendation}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
