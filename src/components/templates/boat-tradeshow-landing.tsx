'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Hotjar, { fireHotjarEvent } from '@/components/analytics/Hotjar';

// Form validation schema
const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  nextShow: z.enum(['Soon', '30-60 days', '60-90 days', 'Not scheduled'], {
    required_error: 'Please select when your next show is',
  }),
  notes: z.string().max(300, 'Notes must be less than 300 characters').optional(),
  source: z.string(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export default function BoatTradeshowLanding() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      source: 'boat-tradeshow-landing',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        reset();
        
        // Fire custom event for analytics (Hotjar)
        if (typeof window !== 'undefined' && (window as any).hj) {
          (window as any).hj('event', 'form_submit_success');
        }
      } else {
        console.error('Form submission failed:', result);
        // TODO: Show error message to user
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    }
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
    if (openFAQ !== id) {
      fireHotjarEvent(`faq_open_${id}`);
    }
  };

  const handleCTAClick = (location: string) => {
    fireHotjarEvent(`cta_click_${location}`);
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoClick = (location: string) => {
    fireHotjarEvent(`view_${location}_video`);
    // TODO: Implement video modal or redirect
  };

  return (
    <div className="min-h-screen bg-white">
      <Hotjar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#171717] to-[#2a2a2a] text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Turn Boat Show Traffic into 
                  <span className="text-[#03c4eb]"> Qualified Leads</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300">
                  Pay only <span className="text-[#FFDC35] font-semibold">$2 per qualified lead</span> with our proven spin-to-win system
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleCTAClick('hero')}
                  className="bg-[#FFDC35] text-[#171717] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Book Your Demo
                </button>
                <button 
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-[#03c4eb] text-[#03c4eb] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#03c4eb] hover:text-white transition-all duration-200"
                >
                  See How It Works
                </button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>✓ No upfront costs</span>
                <span>✓ Setup in 24 hours</span>
                <span>✓ Works on any device</span>
              </div>
            </div>

            {/* Right Column - Video/Media */}
            <div className="relative">
              <div 
                className="bg-[#f4f4f4] rounded-2xl p-8 aspect-video flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => handleVideoClick('hero')}
              >
                <div className="text-center text-[#171717]">
                  <div className="w-20 h-20 bg-[#03c4eb] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#0299c7] transition-colors">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                  </div>
                  <p className="text-lg font-semibold">Watch Demo Video</p>
                  <p className="text-sm text-gray-600">See the system in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#171717] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 3-step process that transforms booth visitors into qualified prospects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#03c4eb] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-[#171717] mb-4">Scan QR Code</h3>
              <p className="text-gray-600 mb-6">
                Visitors scan your QR code to access the interactive prize wheel experience
              </p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>📱 Phone</span>
                <span>💻 Tablet/TV</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#03c4eb] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-[#171717] mb-4">Verify & Qualify</h3>
              <p className="text-gray-600 mb-6">
                System captures contact info and qualifying questions before they spin
              </p>
              <div className="text-sm text-gray-500">
                <span>✓ Email verification</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-[#03c4eb] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-[#171717] mb-4">Win & Follow Up</h3>
              <p className="text-gray-600 mb-6">
                Instant prize delivery and automated follow-up sequences begin
              </p>
              <div className="text-sm text-gray-500">
                <span>🎁 Instant gratification</span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>* Devices not included - works on attendee phones or your booth displays</p>
          </div>
        </div>
      </section>

      {/* Proof/Case Study Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#171717] mb-6">
                Proven Results from Pet Industry
              </h2>
              <div className="space-y-6">
                <div className="bg-[#03c4eb] text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-2">3X</div>
                  <p className="text-lg">More qualified leads than traditional methods</p>
                </div>
                <div className="bg-[#FFDC35] text-[#171717] p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-2">87%</div>
                  <p className="text-lg">Email capture rate at trade shows</p>
                </div>
                <div className="bg-[#171717] text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-2">$2</div>
                  <p className="text-lg">Average cost per qualified lead</p>
                </div>
              </div>
            </div>
            <div 
              className="bg-[#f4f4f4] rounded-2xl p-8 aspect-video flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => handleVideoClick('case_study')}
            >
              <div className="text-center text-[#171717]">
                <div className="w-20 h-20 bg-[#03c4eb] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#0299c7] transition-colors">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
                <p className="text-lg font-semibold">Case Study Video</p>
                <p className="text-sm text-gray-600">Real results from pet shows</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#171717] mb-4">
              Simple, Results-Based Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No setup fees. No monthly costs. Pay only for qualified leads.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-[#03c4eb]">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-[#171717] mb-2">$2</div>
                <p className="text-xl text-gray-600">per qualified lead</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#03c4eb] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Complete setup & training included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#03c4eb] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Works on any device (phone/tablet/TV)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#03c4eb] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Real-time lead notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#03c4eb] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Automated follow-up sequences</span>
                </div>
              </div>

              <button 
                onClick={() => handleCTAClick('pricing')}
                className="w-full bg-[#FFDC35] text-[#171717] py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-200"
              >
                Get Started Today
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                * Devices not provided. System works on attendee phones or your booth displays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-[#171717] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                id: 'devices',
                question: 'What devices do I need for my booth?',
                answer: 'None! The system works on attendees\' smartphones via QR code. Optionally, you can display it on any tablet or TV screen you already have. We don\'t provide hardware - just the software solution.'
              },
              {
                id: 'setup',
                question: 'How quickly can this be set up?',
                answer: 'Setup takes less than 24 hours. We provide your custom QR code, configure your prize wheel, and train your team. You\'ll be ready for your next show immediately.'
              },
              {
                id: 'qualified',
                question: 'How do you define a "qualified lead"?',
                answer: 'A qualified lead provides verified contact information and answers your custom qualifying questions (budget, timeline, decision-making authority, etc.). You only pay for leads that meet your criteria.'
              },
              {
                id: 'pricing',
                question: 'Are there any hidden fees or monthly costs?',
                answer: 'No hidden fees. No setup costs. No monthly subscriptions. You only pay $2 per qualified lead that meets your criteria. If you get zero qualified leads, you pay nothing.'
              },
              {
                id: 'integration',
                question: 'Does this integrate with my CRM?',
                answer: 'Yes! We can integrate with most major CRMs including Salesforce, HubSpot, and others. Leads are automatically synced in real-time with all the qualification data collected.'
              }
            ].map((faq) => (
              <div key={faq.id} className="bg-[#2a2a2a] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#333333] transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <svg 
                    className={`w-6 h-6 transform transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with Form */}
      <section id="lead-form" className="py-16 lg:py-24 bg-[#03c4eb]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                Ready to 3X Your Boat Show Leads?
              </h2>
              <p className="text-xl text-blue-100">
                Book a 15-minute demo and see how the system works for boat shows
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#171717] mb-4">Thank You!</h3>
                  <p className="text-gray-600">We'll contact you within 24 hours to schedule your demo.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#171717] mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#171717] mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#171717] mb-2">
                        Company Name *
                      </label>
                      <input
                        {...register('company')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                        placeholder="Your company name"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#171717] mb-2">
                        Next Boat Show *
                      </label>
                      <select
                        {...register('nextShow')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="Soon">Within 30 days</option>
                        <option value="30-60 days">30-60 days</option>
                        <option value="60-90 days">60-90 days</option>
                        <option value="Not scheduled">Not scheduled yet</option>
                      </select>
                      {errors.nextShow && (
                        <p className="text-red-500 text-sm mt-1">{errors.nextShow.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#171717] mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      {...register('notes')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                      placeholder="Tell us about your goals, booth size, typical show attendance, etc."
                    />
                    {errors.notes && (
                      <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FFDC35] text-[#171717] py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Booking Demo...' : 'Book My Demo'}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    We'll contact you within 24 hours to schedule your personalized demo.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-[#171717] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 SyncWorkflow. All rights reserved. | 
            <span className="ml-2">Privacy Policy</span> | 
            <span className="ml-2">Terms of Service</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
