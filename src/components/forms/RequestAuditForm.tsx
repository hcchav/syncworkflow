'use client';

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type RequestAuditFormProps = {
  source?: string;
  submitLabel?: string;
  helperText?: string;
  compact?: boolean;
  className?: string;
  initiallyExpanded?: boolean;
  showDetailsToggle?: boolean;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function RequestAuditForm({
  source = 'request_audit_page',
  submitLabel = 'Get Free Audit',
  helperText = 'Two fields now. I review the site and email the next step.',
  compact = false,
  className,
  initiallyExpanded = false,
  showDetailsToggle = true,
}: RequestAuditFormProps) {
  const posthog = usePostHog();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [showDetails, setShowDetails] = useState(initiallyExpanded);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get('email') || ''),
      website: String(formData.get('website') || ''),
      firmName: String(formData.get('firmName') || ''),
      note: String(formData.get('note') || ''),
      source,
    };

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/request-audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not submit the request.');
      }

      posthog?.capture('free_audit_requested', {
        request_mode: 'free_audit',
        source,
      });

      setStatus('success');
      setMessage(result.message || 'Request submitted.');
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'grid rounded-[30px] border border-[rgba(216,200,179,0.88)] bg-[rgba(255,253,249,0.96)] shadow-[0_18px_52px_rgba(24,38,63,0.08)]',
        compact ? 'gap-3 p-5 sm:p-6' : 'gap-4 p-6',
        className,
      )}
    >
      <div className={cn('grid gap-4', compact ? '' : 'md:grid-cols-2')}>
        <label className="grid gap-2 text-sm font-medium text-[#18263F]">
          Work email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@firm.com"
            className="h-12 rounded-2xl border border-[rgba(216,200,179,0.9)] bg-[#FFF8F0] px-4 outline-none transition placeholder:text-[#8A8F97] focus:border-[#B98132] focus:ring-2 focus:ring-[rgba(185,129,50,0.16)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#18263F]">
          Firm website
          <input
            required
            name="website"
            type="url"
            placeholder="https://yourfirm.com"
            className="h-12 rounded-2xl border border-[rgba(216,200,179,0.9)] bg-[#FFF8F0] px-4 outline-none transition placeholder:text-[#8A8F97] focus:border-[#B98132] focus:ring-2 focus:ring-[rgba(185,129,50,0.16)]"
          />
        </label>
      </div>

      {showDetailsToggle ? (
        <button
          type="button"
          onClick={() => setShowDetails((current) => !current)}
          className="justify-self-start text-sm font-medium text-[#B98132] transition hover:text-[#9b6d28]"
        >
          {showDetails ? 'Hide extra details' : 'Add extra detail (optional)'}
        </button>
      ) : null}

      {showDetailsToggle && showDetails ? (
        <>
          <label className="grid gap-2 text-sm font-medium text-[#18263F]">
            Firm name
            <input
              name="firmName"
              placeholder="Optional"
              className="h-12 rounded-2xl border border-[rgba(216,200,179,0.9)] bg-[#FFF8F0] px-4 outline-none transition placeholder:text-[#8A8F97] focus:border-[#B98132] focus:ring-2 focus:ring-[rgba(185,129,50,0.16)]"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-[#18263F]">
            Anything specific?
            <textarea
              name="note"
              rows={compact ? 4 : 5}
              placeholder="Optional: page, form, slow step, or reply issue."
              className="rounded-[24px] border border-[rgba(216,200,179,0.9)] bg-[#FFF8F0] px-4 py-3 outline-none transition placeholder:text-[#8A8F97] focus:border-[#B98132] focus:ring-2 focus:ring-[rgba(185,129,50,0.16)]"
            />
          </label>
        </>
      ) : null}

      <div
        className={cn(
          'flex flex-col gap-3',
          compact ? '' : 'sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <p className="text-sm leading-6 text-[#556174]">
          {helperText}
        </p>
        <Button
          type="submit"
          variant="brand"
          size="lg"
          disabled={status === 'submitting'}
          className={cn(compact ? 'w-full' : '')}
        >
          {status === 'submitting' ? 'Submitting...' : submitLabel}
        </Button>
      </div>

      {message ? (
        <div
          className={`rounded-[20px] px-4 py-3 text-sm ${
            status === 'success'
              ? 'bg-[hsl(128,46%,95%)] text-[hsl(140,38%,28%)]'
              : 'bg-[hsl(12,80%,96%)] text-[hsl(8,52%,36%)]'
          }`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
