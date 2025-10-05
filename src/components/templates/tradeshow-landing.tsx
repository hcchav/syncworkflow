'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Hotjar, { fireHotjarEvent } from '@/components/analytics/Hotjar';

const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  nextShow: z.enum(['Soon', '30-60 days', '60-90 days', 'Not scheduled'], {
    required_error: 'Please select when your next show is',
  }),
  notes: z
    .string()
    .max(300, 'Notes must be less than 300 characters')
    .optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const heroHighlights = [
  {
    title: '3x capture rate',
    description: 'Convert passerby traffic with immersive digital giveaways and show-ready messaging.',
  },
  {
    title: 'Live CRM sync',
    description: 'Pipe enriched attendee data into Salesforce, HubSpot, or spreadsheets instantly.',
  },
  {
    title: 'Performance pricing',
    description: 'Only pay $2 when a lead matches the criteria you define for each show.',
  },
];

const featureCards = [
  {
    title: 'Immersive attendee journey',
    description:
      'Launch a glossy mobile experience with motion visuals and game mechanics inspired by premium EV activations.',
  },
  {
    title: 'Qualification built in',
    description:
      'Score answers in real time, route hot prospects to on-floor reps, and trigger automated follow-up sequences.',
  },
  {
    title: 'Creative + logistics support',
    description:
      'We handle signage, prize sourcing, and brand customization so your team just shows up and closes.',
  },
];

const processSteps = [
  {
    title: '01 · Launch your digital booth',
    description:
      'We brand the mobile flow to match your show presence, preload qualification rules, and deliver assets within 7 days.',
  },
  {
    title: '02 · Engage & qualify',
    description:
      'Attendees scan, answer, and spin from their own devices while real-time insights pulse on your team dashboard.',
  },
  {
    title: '03 · Nurture instantly',
    description:
      'Sync to your CRM, push automated SMS + email, and share leaderboards to keep sales focused on the next conversation.',
  },
];

const faqs = [
  {
    id: 'how-it-works',
    question: 'How does the experience run on the show floor?',
    answer:
      'Attendees scan a QR code, breeze through a frictionless mobile flow, and spin a digital prize wheel. Everything runs on their phone while your reps see qualification flags instantly.',
  },
  {
    id: 'setup',
    question: 'Do we need hardware or a kiosk?',
    answer:
      'No hardware required. We provide motion signage and visuals that mirror the experience of the evoto.ai homepage styling — tablets or monitors are optional for crowd appeal.',
  },
  {
    id: 'pricing',
    question: 'What does performance pricing include?',
    answer:
      'You pay $2 only for leads that pass your qualification filters. Creative, setup, analytics, and onsite support assets are bundled in.',
  },
  {
    id: 'integrations',
    question: 'Can you plug into our CRM or marketing stack?',
    answer:
      'We integrate with Salesforce, HubSpot, Pipedrive, and deliver CSV exports in real time. Zapier and webhooks are available for custom data pushes.',
  },
  {
    id: 'timeline',
    question: 'How fast can we launch before our next show?',
    answer:
      'Most teams go live in under a week. We can fast-track within 72 hours for priority events.',
  },
];

export default function TradeshowLanding() {
  const [showVideo, setShowVideo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const handleCTAClick = (location: string) => {
    fireHotjarEvent(`cta_clicked_${location}`);
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoClick = (location: string) => {
    fireHotjarEvent(`video_clicked_${location}`);
    if (location === 'hero') {
      setShowVideo(true);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    try {
      fireHotjarEvent('form_submitted');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050817] text-white">
      <Hotjar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(67,97,238,0.35),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(9,16,40,0.75),_rgba(5,8,23,0.95))]" />
        <div className="container relative z-10 mx-auto px-4 py-20 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-[#7ef7d4]">
                Trade Show Lead Engine
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                Transform booth energy into <span className="bg-gradient-to-r from-[#7ef7d4] via-[#50e5ff] to-[#a086ff] bg-clip-text text-transparent">qualified pipeline</span> at every show.
              </h1>
              <p className="max-w-xl text-lg text-white/70 sm:text-xl">
                SyncWorkflow pairs gamified capture with the neon visuals and luxe gradients of evoto.ai so your trade show presence feels premium while delivering $2 qualified leads.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => handleCTAClick('hero')}
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7ef7d4] via-[#50e5ff] to-[#a086ff] px-8 py-3 text-lg font-semibold text-[#050817] shadow-[0_20px_60px_rgba(80,229,255,0.35)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  Book a demo
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M21 12H3" />
                  </svg>
                </button>
                <button
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
                >
                  View pricing
                </button>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {heroHighlights.map(highlight => (
                  <div key={highlight.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#7ef7d4]">{highlight.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#7ef7d4]/40 via-transparent to-[#a086ff]/20 blur-3xl" />
              <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                {!showVideo ? (
                  <button
                    type="button"
                    onClick={() => handleVideoClick('hero')}
                    className="group flex h-full w-full flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[#0a1028]/80 p-10 text-center transition-all duration-300 hover:border-[#7ef7d4]/60 hover:bg-[#0f1738]"
                  >
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#7ef7d4] via-[#50e5ff] to-[#a086ff] text-[#050817] shadow-[0_20px_60px_rgba(126,247,212,0.45)]">
                      <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Watch the experience</h3>
                    <p className="mt-3 max-w-sm text-base text-white/60">
                      Preview the neon spin-to-win flow that mirrors the evoto.ai aesthetic and electrifies your booth.
                    </p>
                  </button>
                ) : (
                  <video className="h-full w-full rounded-[28px] object-cover" controls autoPlay>
                    <source src="/videos/customer_prize_wheel_vertical.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="relative border-t border-white/5 bg-[#050817] py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7ef7d4]/60 to-transparent" />
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7ef7d4]">Why teams choose SyncWorkflow</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Built for modern trade show teams chasing premium, electric-brand energy.
            </h2>
            <p className="max-w-xl text-lg text-white/70">
              Every touchpoint mirrors the luminous gradients, glass panels, and fluid typography from evoto.ai so your booth feels futuristic without losing the focus on measurable ROI.
            </p>
          </div>
          <div className="grid gap-6">
            {featureCards.map(card => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,_rgba(14,23,56,0.9),_rgba(24,33,72,0.6))] p-6 shadow-[0_40px_80px_rgba(5,8,23,0.6)] transition hover:border-[#7ef7d4]/50"
              >
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-base text-white/65">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="relative overflow-hidden bg-[#070c26] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(80,229,255,0.15),_transparent_60%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7ef7d4]">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">From briefing to booth in three luminous steps</h2>
            <p className="mt-4 text-lg text-white/70">
              We combine software, creative, and fulfillment so you deliver a cinematic attendee experience without spinning up extra headcount.
            </p>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {processSteps.map(step => (
              <div key={step.title} className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-[#7ef7d4]/0 via-[#7ef7d4]/60 to-[#7ef7d4]/0" />
                <h3 className="text-lg font-semibold text-[#7ef7d4]">{step.title}</h3>
                <p className="mt-4 text-base text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative border-t border-white/5 bg-[#050817] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7ef7d4]">Pricing</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Performance based. Simple. Predictable.</h2>
            <p className="mt-4 text-lg text-white/70">
              You only invest when we deliver the qualified conversations you need.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="relative rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,_rgba(7,12,38,0.9),_rgba(11,18,48,0.65))] p-10 shadow-[0_40px_120px_rgba(10,20,50,0.65)]">
              <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-r from-[#7ef7d4]/20 via-[#50e5ff]/10 to-[#a086ff]/20 blur-3xl" />
              <div className="text-center">
                <span className="text-sm uppercase tracking-[0.35em] text-[#7ef7d4]">$2 per qualified lead</span>
                <h3 className="mt-4 text-5xl font-semibold text-white">All-inclusive activation</h3>
                <p className="mt-4 text-base text-white/60">
                  Creative, setup, analytics, and fulfillment included. Unlimited events, no retainers, cancel anytime.
                </p>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {[
                  'Branded mobile capture + prize wheel',
                  'Onsite signage & creative direction',
                  'Real-time CRM sync + analytics dashboard',
                  'SMS & email automation sequences',
                ].map(item => (
                  <div key={item} className="flex items-center space-x-3 rounded-2xl bg-white/5 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7ef7d4] to-[#50e5ff] text-[#050817]">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-white/75">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleCTAClick('pricing')}
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7ef7d4] via-[#50e5ff] to-[#a086ff] px-6 py-4 text-lg font-semibold text-[#050817] transition-transform duration-300 hover:scale-[1.02]"
              >
                Start your activation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-[#070c26] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(126,247,212,0.18),_transparent_60%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7ef7d4]">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Answers for your event team</h2>
            <p className="mt-4 text-lg text-white/70">
              Everything you need to know about running high-converting, neon-inspired trade show campaigns.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-medium text-white transition-colors hover:bg-white/5"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`h-6 w-6 transform transition-transform ${openFAQ === faq.id ? 'rotate-180 text-[#7ef7d4]' : 'text-white/60'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6 text-base text-white/65">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section id="lead-form" className="relative border-t border-white/5 bg-[#050817] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(160,134,255,0.25),_transparent_55%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7ef7d4]">Let&apos;s talk</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Schedule your luminous lead activation</h2>
            <p className="mt-4 text-lg text-white/70">
              Share a few details and we&apos;ll deliver a tailored walkthrough within one business day.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            {isSubmitted ? (
              <div className="rounded-[32px] border border-[#7ef7d4]/40 bg-[#0a1028]/80 p-10 text-center shadow-[0_30px_70px_rgba(10,20,50,0.55)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7ef7d4] via-[#50e5ff] to-[#a086ff] text-[#050817]">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">Thank you!</h3>
                <p className="mt-3 text-base text-white/70">We&apos;ll reach out shortly to lock in your session.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_90px_rgba(5,8,23,0.6)] backdrop-blur"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold uppercase tracking-widest text-white/60">Name *</label>
                    <input
                      {...register('name')}
                      placeholder="Your full name"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0a1028]/80 px-4 py-3 text-base text-white shadow-inner focus:border-[#7ef7d4] focus:outline-none focus:ring-2 focus:ring-[#7ef7d4]/40"
                    />
                    {errors.name && <p className="mt-2 text-sm text-[#ff89b0]">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold uppercase tracking-widest text-white/60">Email *</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@company.com"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0a1028]/80 px-4 py-3 text-base text-white shadow-inner focus:border-[#7ef7d4] focus:outline-none focus:ring-2 focus:ring-[#7ef7d4]/40"
                    />
                    {errors.email && <p className="mt-2 text-sm text-[#ff89b0]">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold uppercase tracking-widest text-white/60">Company *</label>
                    <input
                      {...register('company')}
                      placeholder="Your company name"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0a1028]/80 px-4 py-3 text-base text-white shadow-inner focus:border-[#7ef7d4] focus:outline-none focus:ring-2 focus:ring-[#7ef7d4]/40"
                    />
                    {errors.company && <p className="mt-2 text-sm text-[#ff89b0]">{errors.company.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold uppercase tracking-widest text-white/60">Next trade show *</label>
                    <select
                      {...register('nextShow')}
                      className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-[#0a1028]/80 px-4 py-3 text-base text-white shadow-inner focus:border-[#7ef7d4] focus:outline-none focus:ring-2 focus:ring-[#7ef7d4]/40"
                    >
                      <option value="">Select timeline</option>
                      <option value="Soon">Within 30 days</option>
                      <option value="30-60 days">30-60 days</option>
                      <option value="60-90 days">60-90 days</option>
                      <option value="Not scheduled">Not scheduled yet</option>
                    </select>
                    {errors.nextShow && <p className="mt-2 text-sm text-[#ff89b0]">{errors.nextShow.message}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-sm font-semibold uppercase tracking-widest text-white/60">Additional notes</label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder="Tell us about your goals or any specific requirements..."
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0a1028]/80 px-4 py-3 text-base text-white shadow-inner focus:border-[#7ef7d4] focus:outline-none focus:ring-2 focus:ring-[#7ef7d4]/40"
                  />
                  {errors.notes && <p className="mt-2 text-sm text-[#ff89b0]">{errors.notes.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7ef7d4] via-[#50e5ff] to-[#a086ff] px-6 py-4 text-lg font-semibold text-[#050817] transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting…' : 'Book my demo'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#040716] py-10 text-center text-sm text-white/50">
        © {new Date().getFullYear()} SyncWorkflow. Designed with the evoto.ai inspired neon aesthetic for every trade show team.
      </footer>
    </div>
  );
}
