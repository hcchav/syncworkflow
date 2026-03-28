'use client';

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';

import { Button } from '@/components/ui/button';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function WalkthroughRequestForm({
  entry,
  firmName,
  source,
  title = 'Want to talk first?',
  description = 'Send this and I will email next steps.',
  submitLabel = 'Ask for a walkthrough',
}: {
  entry?: string;
  firmName: string;
  source: string;
  title?: string;
  description?: string;
  submitLabel?: string;
}) {
  const posthog = usePostHog();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      entry: entry || '',
      email: String(formData.get('email') || ''),
      note: String(formData.get('note') || ''),
      firmName,
      source,
    };

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/walkthrough-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not submit the walkthrough request.');
      }

      posthog?.capture('walkthrough_requested', {
        source,
      });

      setStatus('success');
      setMessage(result.message || 'Walkthrough request submitted.');
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  return (
    <div
      id="walkthrough-request"
      className="rounded-[30px] border border-[hsl(30,28%,84%)] bg-white/95 p-6 shadow-[0_18px_52px_rgba(36,43,66,0.08)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(24,60%,40%)]">
        Walkthrough request
      </p>
      <h2 className="mt-3 font-serif text-3xl text-[hsl(221,45%,18%)]">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-[hsl(221,16%,34%)]">{description}</p>

      <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-[hsl(221,45%,18%)]">
          Work email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@firm.com"
            className="h-12 rounded-2xl border border-[hsl(30,28%,82%)] bg-[hsl(40,40%,98%)] px-4 outline-none transition focus:border-[hsl(221,45%,18%)] focus:ring-2 focus:ring-[rgba(27,36,66,0.08)]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-[hsl(221,45%,18%)]">
          Optional note
          <textarea
            name="note"
            rows={4}
            placeholder="Optional question before we talk."
            className="rounded-[24px] border border-[hsl(30,28%,82%)] bg-[hsl(40,40%,98%)] px-4 py-3 outline-none transition focus:border-[hsl(221,45%,18%)] focus:ring-2 focus:ring-[rgba(27,36,66,0.08)]"
          />
        </label>

        <Button type="submit" variant="outline" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting...' : submitLabel}
        </Button>
      </form>

      {message ? (
        <div
          className={`mt-5 rounded-[22px] px-4 py-3 text-sm ${
            status === 'success'
              ? 'bg-[hsl(128,46%,95%)] text-[hsl(140,38%,28%)]'
              : 'bg-[hsl(12,80%,96%)] text-[hsl(8,52%,36%)]'
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
