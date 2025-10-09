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
  notes: z.string().max(300, 'Notes must be less than 300 characters').optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const heroHighlights = [
  {
    title: '3x capture rate',
    description: 'Convert passerby traffic with interactive prize flows tailored to your show audience.',
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
    title: 'Trade show ready experience',
    description:
      'Launch a premium mobile journey with branded signage, QR flows, and prize mechanics proven at high-traffic shows.',
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
      'Attendees scan a QR code, breeze through a frictionless mobile flow, and spin a digital prize wheel on their phones while reps see qualification flags instantly.',
  },
  {
    id: 'setup',
    question: 'Do we need hardware or a kiosk?',
    answer:
      'No hardware required. We provide signage, QR codes, and motion visuals. Tablets or monitors are optional for extra crowd appeal.',
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

  const onSubmit = async (_data: LeadFormData) => {
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
    <div className="min-h-screen bg-white text-[#171717]">
      <Hotjar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#171717] to-[#2a2a2a] text-white">
        <div className="container mx-auto grid gap-16 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-[#FFDC35]">
              Trade Show Lead Engine
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Turn trade show buzz into <span className="text-[#FFDC35]">qualified pipeline</span> at every event.
            </h1>
            <p className="max-w-xl text-lg text-gray-300 sm:text-xl">
              SyncWorkflow brings the proven boat show playbook to every industry—interactive prize flows, automated follow-up, and $2 qualified leads.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => handleCTAClick('hero')}
                className="group inline-flex items-center justify-center rounded-lg bg-[#FFDC35] px-8 py-3 text-lg font-semibold text-[#171717] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-yellow-400"
              >
                Book a demo
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M21 12H3" />
                </svg>
              </button>
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white hover:text-[#171717]"
              >
                View pricing
              </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {heroHighlights.map(highlight => (
                <div key={highlight.title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#FFDC35]">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-[#FFDC35]/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-[#1f1f1f] p-6">
              {!showVideo ? (
                <button
                  type="button"
                  onClick={() => handleVideoClick('hero')}
                  className="group flex h-full w-full flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[#2a2a2a] p-10 text-center transition-all duration-200 hover:border-[#FFDC35]"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFDC35] text-[#171717] transition-transform duration-200 group-hover:scale-105">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.25 5.886a.6.6 0 01.906-.519l7.5 4.114a.6.6 0 010 1.038l-7.5 4.114a.6.6 0 01-.906-.519V5.886z" />
                    </svg>
                  </div>
                  <p className="mt-6 text-lg font-semibold text-white">Watch the 60-second walkthrough</p>
                  <p className="mt-2 text-sm text-gray-300">See how SyncWorkflow runs your prize wheel activation</p>
                </button>
              ) : (
                <video className="h-full w-full rounded-[28px] border border-white/10 object-cover" controls autoPlay>
                  <source src="/videos/customer_prize_wheel_vertical.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Built to turn trade show traffic into revenue</h2>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              Everything we design is focused on making your booth feel unforgettable while collecting the qualification data that sales loves.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {featureCards.map(card => (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-lg transition-transform duration-200 hover:-translate-y-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFDC35]/20 text-[#171717]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#f4f4f4] py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-[#171717] sm:text-4xl lg:text-5xl">How the activation works</h2>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">Designed so your team can focus on conversations while the system handles the rest.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {processSteps.map(step => (
              <div key={step.title} className="rounded-2xl border border-transparent bg-white p-8 shadow-lg">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#FFDC35]">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center rounded-full border border-[#FFDC35]/40 bg-[#FFDC35]/10 px-4 py-1 text-sm uppercase tracking-[0.3em] text-[#171717]">
                Pricing
              </span>
              <h2 className="text-3xl font-semibold text-[#171717] sm:text-4xl lg:text-5xl">Performance-based model that de-risks every show</h2>
              <p className="text-lg text-gray-600 sm:text-xl">
                Every trade show package includes custom branding, prize sourcing, signage, CRM integration, and analytics dashboards.
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-[#FFDC35] text-[#171717]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p>Dedicated creative team to match your booth aesthetic and show theme.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-[#FFDC35] text-[#171717]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p>Real-time qualification scoring with alerts for your hottest prospects.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-[#FFDC35] text-[#171717]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p>Turnkey logistics: signage, prize fulfillment, QR codes, and analytics setup.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-[#FFDC35] text-[#171717]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p>Show-to-show optimization based on engagement, foot traffic, and win rate trends.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border-4 border-[#FFDC35] bg-white p-8 shadow-xl">
              <div className="text-center">
                <h3 className="text-5xl font-bold text-[#171717]">$2</h3>
                <p className="mt-2 text-gray-600">per qualified lead</p>
              </div>
              <div className="mt-6 space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Includes setup, creative, and optimization support.</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>CRM integrations + automation templates included.</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>No retainers or subscriptions.</span>
                </div>
              </div>
              <button
                onClick={() => handleCTAClick('pricing')}
                className="mt-8 w-full rounded-lg bg-[#FFDC35] py-3 text-lg font-semibold text-[#171717] transition-colors duration-200 hover:bg-yellow-400"
              >
                Book my pricing review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#171717] py-20 lg:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Frequently asked</h2>
            <p className="mt-4 text-lg text-gray-300 sm:text-xl">Answers to the questions every marketing team asks before a show.</p>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="overflow-hidden rounded-2xl bg-[#2a2a2a]">
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-white transition-colors hover:bg-[#333333]"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <svg
                    className={`h-6 w-6 transition-transform ${openFAQ === faq.id ? 'rotate-180 text-[#FFDC35]' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-gray-300">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Form Section */}
      <section id="lead-form" className="bg-[#171717] py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold text-[#171717] sm:text-4xl lg:text-5xl">Ready to see it for your next show?</h2>
              <p className="mt-4 text-lg text-gray-600 sm:text-xl">Book a demo and we’ll tailor a plan for your exact audience, prize strategy, and qualification rules.</p>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#171717]">What you’ll get</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
                    <li className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>15-minute strategy session focused on your upcoming shows.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>Walkthrough of the capture experience on mobile.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>Custom ROI model and foot traffic projections.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#171717]">Why teams choose SyncWorkflow</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
                    <li className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>Battle-tested at consumer and B2B shows across industries.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>Hands-on show support from creative to analytics.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 text-[#FFDC35]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>Transparent performance pricing with zero risk.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center text-[#171717]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFDC35]/20 text-[#171717]">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">Thanks! You’re on the list.</h3>
                    <p className="mt-2 text-sm text-gray-600">We’ll reach out within 24 hours to schedule your walkthrough.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#171717]">Name *</label>
                      <input
                        {...register('name')}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#FFDC35] focus:outline-none focus:ring-2 focus:ring-[#FFDC35]/40"
                        placeholder="Jane Smith"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#171717]">Email *</label>
                      <input
                        {...register('email')}
                        type="email"
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#FFDC35] focus:outline-none focus:ring-2 focus:ring-[#FFDC35]/40"
                        placeholder="jane@company.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#171717]">Company *</label>
                      <input
                        {...register('company')}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#FFDC35] focus:outline-none focus:ring-2 focus:ring-[#FFDC35]/40"
                        placeholder="Company name"
                      />
                      {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#171717]">When is your next show?</label>
                      <select
                        {...register('nextShow')}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#FFDC35] focus:outline-none focus:ring-2 focus:ring-[#FFDC35]/40"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select timeline
                        </option>
                        <option value="Soon">Soon</option>
                        <option value="30-60 days">30-60 days</option>
                        <option value="60-90 days">60-90 days</option>
                        <option value="Not scheduled">Not scheduled</option>
                      </select>
                      {errors.nextShow && <p className="mt-1 text-sm text-red-600">{errors.nextShow.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#171717]">Notes</label>
                      <textarea
                        {...register('notes')}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#FFDC35] focus:outline-none focus:ring-2 focus:ring-[#FFDC35]/40"
                        placeholder="Tell us about your booth goals"
                        rows={4}
                      />
                      {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center rounded-lg bg-[#FFDC35] px-6 py-3 text-lg font-semibold text-[#171717] transition-colors duration-200 hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending...' : 'Book my demo'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
