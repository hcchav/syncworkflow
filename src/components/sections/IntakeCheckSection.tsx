'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const prompts = [
  'A new visitor can tell who your firm helps within five seconds.',
  'Your main contact action is obvious on mobile.',
  'Your first-step intake form can be finished in about one minute.',
  'Your site explains what happens after someone submits a request.',
];

export function IntakeCheckSection() {
  const [answers, setAnswers] = useState<boolean[]>(Array(prompts.length).fill(false));

  const score = answers.filter(Boolean).length;
  const gaps = prompts.length - score;

  let statusHeadline = 'You likely have first-touch friction.';
  let statusBody =
    'If only a few of these boxes are true, the website is probably making prospects work too hard before they ask for help.';

  if (score >= 4) {
    statusHeadline = 'Your intake path looks strong on paper.';
    statusBody =
      'If qualified leads are still weak, the next problem is more likely page clarity, trust, or follow-up after submit.';
  } else if (score >= 2) {
    statusHeadline = 'You have a workable base, but there are still easy leaks.';
    statusBody =
      'A few small changes to the page, form, or response messaging can make the next step feel much easier for good-fit prospects.';
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" id="intake-check">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[34px] border border-[rgba(216,200,179,0.88)] bg-[rgba(255,253,249,0.92)] p-8 shadow-[0_18px_52px_rgba(24,38,63,0.08)]">
          <p className="eyebrow">60-second intake check</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl text-[#18263F] sm:text-5xl">
            Check if your site is making prospects work too hard in the first minute.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#556174]">
            This is a short self-check for the first-touch experience. It is not a full audit, but
            it helps show where the homepage or intake path may be slowing things down.
          </p>
          <div className="mt-8 grid gap-3">
            {prompts.map((prompt, index) => {
              const selected = answers[index];

              return (
                <button
                  key={prompt}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setAnswers((current) =>
                      current.map((value, valueIndex) =>
                        valueIndex === index ? !value : value,
                      ),
                    )
                  }
                  className={cn(
                    'flex min-h-11 items-start gap-3 rounded-[24px] border px-4 py-4 text-left transition',
                    selected
                      ? 'border-[rgba(141,167,156,0.76)] bg-[rgba(141,167,156,0.14)]'
                      : 'border-[rgba(216,200,179,0.88)] bg-[#FFF8F0] hover:border-[#B98132]',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                      selected
                        ? 'border-[#8DA79C] bg-[#8DA79C] text-white'
                        : 'border-[rgba(216,200,179,0.9)] bg-white text-transparent',
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-6 text-[#445164]">{prompt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[34px] border border-[rgba(216,200,179,0.88)] bg-[#18263F] p-8 text-[#FFF7EC] shadow-[0_24px_80px_rgba(24,38,63,0.2)]">
          <p className="eyebrow !text-[#E3BE8B]">Your score</p>
          <div className="mt-5 flex items-end gap-3">
            <p className="font-serif text-6xl leading-none">{score}</p>
            <p className="pb-1 text-sm text-[#E6DDD1]">of {prompts.length} are true</p>
          </div>
          <p className="mt-6 text-2xl font-semibold leading-tight">{statusHeadline}</p>
          <p className="mt-4 text-sm leading-7 text-[#F0E7DC]">{statusBody}</p>
          <div className="mt-6 rounded-[26px] bg-[rgba(255,247,236,0.08)] p-5">
            <p className="text-sm font-medium text-white">
              {gaps === 0 ? 'No obvious gaps from this checklist.' : `${gaps} likely friction point${gaps === 1 ? '' : 's'} still need attention.`}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#E6DDD1]">
              A real audit checks the live homepage, the mobile form, and the follow-up path together.
            </p>
          </div>
          <div className="mt-6 grid gap-3">
            <Button asChild size="lg" variant="brandSecondary">
              <Link href="/request-audit">
                Get My Free Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10">
              <Link href="/sample-review">See A Sample Review</Link>
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
