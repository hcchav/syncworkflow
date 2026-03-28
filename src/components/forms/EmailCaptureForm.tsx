'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { usePostHog } from 'posthog-js/react';

import { Button } from '@/components/ui/button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function EmailCaptureForm({
  entry,
  firmName,
  ctaEmail,
}: {
  entry: string;
  firmName: string;
  ctaEmail: string;
}) {
  const posthog = usePostHog();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fallbackReplyHref = useMemo(() => {
    const subject = encodeURIComponent(`Full audit request for ${firmName}`);
    const body = encodeURIComponent(
      `Please send me the full audit for ${firmName}.`,
    );

    return `mailto:${ctaEmail}?subject=${subject}&body=${body}`;
  }, [ctaEmail, firmName]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setStatus('submitting');
    setMessage('');
    setPreviewUrl(null);

    try {
      const response = await fetch('/api/audit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entry,
          email,
          source: 'teaser_page',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not send the audit right now.');
      }

      posthog?.capture('full_audit_requested', {
        audit_entry: entry,
        page_type: 'teaser',
      });

      if (result.delivered) {
        posthog?.capture('full_audit_email_sent', {
          audit_entry: entry,
          page_type: 'teaser',
        });
      }

      if (result.previewUrl) {
        setPreviewUrl(result.previewUrl);
      }

      setStatus('success');
      setMessage(result.message || 'Full audit sent.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  return (
    <div
      id="request-full-audit"
      className="rounded-[30px] border border-[hsl(30,28%,84%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,246,239,0.96))] p-6 shadow-[0_18px_52px_rgba(36,43,66,0.1)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
        Get the full audit
      </p>
      <h2 className="mt-3 font-serif text-3xl text-[hsl(221,45%,18%)]">
        Want the full review?
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[hsl(221,16%,34%)]">
        Enter the best email. I&apos;ll send the private full review with the rest of the notes and the fix order.
      </p>

      <form className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="audit-email">
          Email address
        </label>
        <input
          id="audit-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          className="h-12 rounded-full border border-[hsl(30,28%,82%)] bg-white px-5 text-[15px] text-[hsl(221,45%,18%)] outline-none transition focus:border-[hsl(221,45%,18%)] focus:ring-2 focus:ring-[rgba(27,36,66,0.1)]"
        />
        <Button type="submit" variant="brand" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Get Full Audit'}
        </Button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[hsl(221,16%,38%)]">
        <Link
          href={fallbackReplyHref}
          onClick={() =>
            posthog?.capture('reply_fallback_clicked', {
              audit_entry: entry,
              page_type: 'teaser',
            })
          }
          className="underline decoration-[hsl(31,80%,60%)] underline-offset-4 transition hover:text-[hsl(221,45%,18%)]"
        >
          Prefer email?
        </Link>
        <Link
          href="#walkthrough-request"
          onClick={() =>
            posthog?.capture('walkthrough_requested', {
              audit_entry: entry,
              page_type: 'teaser',
              request_method: 'jump_link',
            })
          }
          className="underline decoration-[hsl(31,80%,60%)] underline-offset-4 transition hover:text-[hsl(221,45%,18%)]"
        >
          Want a walkthrough?
        </Link>
      </div>

      {message ? (
        <div
          className={`mt-5 rounded-[22px] px-4 py-3 text-sm ${
            status === 'success'
              ? 'bg-[hsl(128,46%,95%)] text-[hsl(140,38%,28%)]'
              : 'bg-[hsl(12,80%,96%)] text-[hsl(8,52%,36%)]'
          }`}
        >
          <p>{message}</p>
          {previewUrl ? (
            <p className="mt-2">
              Preview link for local development:{' '}
              <Link className="underline underline-offset-4" href={previewUrl}>
                {previewUrl}
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
