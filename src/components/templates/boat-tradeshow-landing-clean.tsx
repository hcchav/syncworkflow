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
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export default function BoatTradeshowLanding() {
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const faqs = [
    {
      id: 'how-it-works',
      question: 'How does the system work at boat shows?',
      answer: 'Visitors scan a QR code at your booth, fill out a quick form, spin a prize wheel, and get instant rewards. Meanwhile, you get verified contact information and automated follow-up emails are sent to nurture leads into sales calls.'
    },
    {
      id: 'setup',
      question: 'What do I need to set up at my booth?',
      answer: 'Just a QR code sign (which we provide) and optionally a tablet or TV screen to display the prize wheel. The entire experience works on attendees\' smartphones, so no additional hardware is required.'
    },
    {
      id: 'pricing',
      question: 'Are there any hidden fees or monthly costs?',
      answer: 'No hidden fees. No setup costs. No monthly subscriptions. You only pay $2 per qualified lead that meets your criteria. If you get zero qualified leads, you pay nothing.'
    },
    {
      id: 'integration',
      question: 'How do leads get into my CRM?',
      answer: 'We can integrate with most major CRMs (Salesforce, HubSpot, Pipedrive, etc.) or provide CSV exports. Leads are delivered in real-time with all contact information and qualification data.'
    },
    {
      id: 'customization',
      question: 'Can you customize it for boat shows specifically?',
      answer: 'Absolutely! We customize the registration forms, prize wheel, and follow-up emails to match your boat brand and target the specific types of leads you want (boat buyers, service customers, etc.).'
    }
  ];

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
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-[#03c4eb] text-[#03c4eb] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#03c4eb] hover:text-white transition-all duration-200"
                >
                  See Pricing
                </button>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="relative">
              {!showVideo ? (
                <div 
                  className="w-full h-[400px] bg-[#f4f4f4] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors shadow-lg"
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
              ) : (
                <video 
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  controls
                  autoPlay
                >
                  <source src="/videos/customer_prize_wheel_vertical.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for new sections */}
      <section className="py-16 lg:py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#171717] mb-4">
              New Sections Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This is where your new content sections will be added
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-white">
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
                  <span className="text-gray-700">Custom branded forms & follow-up</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#03c4eb] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Real-time lead delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#03c4eb] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">No monthly fees or contracts</span>
                </div>
              </div>

              <button 
                onClick={() => handleCTAClick('pricing')}
                className="w-full bg-[#FFDC35] text-[#171717] py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
              >
                Get Started Today
              </button>
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
            <p className="text-xl text-gray-300">
              Everything you need to know about our boat show lead generation system
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-[#2a2a2a] rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#333] transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      openFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
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
                Ready to Transform Your Boat Show Results?
              </h2>
              <p className="text-xl text-blue-100">
                Book a demo and see how we can help you generate 3X more qualified leads
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#171717] mb-2">Thank You!</h3>
                <p className="text-gray-600">We'll be in touch within 24 hours to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      {...register('company')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                      placeholder="Your company name"
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      <p className="mt-1 text-sm text-red-600">{errors.nextShow.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                    placeholder="Tell us about your goals or any specific requirements..."
                  />
                  {errors.notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 bg-[#FFDC35] text-[#171717] py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Book My Demo'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-[#171717] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 SyncWorkflow. All rights reserved. | Turning trade show traffic into qualified leads.
          </p>
        </div>
      </footer>
    </div>
  );
}
