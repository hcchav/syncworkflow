'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MinimalHeader from '@/components/layout/MinimalHeader';

const BoatShowPromo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    showDate: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How quickly can we get set up for our next show?",
      answer: "Setup takes less than 24 hours. We provide QR codes, configure your wheel, and integrate with your CRM before your show starts."
    },
    {
      question: "What information do we collect from visitors?",
      answer: "We capture name, email, company, and qualification responses. All data is verified and instantly synced to your CRM system."
    },
    {
      question: "Does this work with our existing CRM?",
      answer: "Yes! We integrate with Salesforce, HubSpot, Pipedrive, and 50+ other CRM systems. Custom integrations available."
    },
    {
      question: "What kind of prizes can we offer?",
      answer: "Anything! Discounts, free consultations, gift cards, product samples, or exclusive content. You control the prize wheel."
    },
    {
      question: "Is there ongoing support during the show?",
      answer: "Absolutely. Our team monitors your booth remotely and provides real-time support throughout your event."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <MinimalHeader 
        ctaText="Get Demo" 
        onCtaClick={() => {
          const formSection = document.querySelector('#conversion-form');
          formSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-dark via-gray-800 to-brand-dark text-white overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Stack */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Turn Booth Traffic into{' '}
                <span className="text-brand-primary">Qualified Meetings</span>—
                <span className="text-brand-secondary">Verified, Gamified, Automated.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Stop collecting business cards that go nowhere. Our gamified lead capture system verifies prospects, 
                qualifies interest, and delivers hot leads directly to your CRM—all while visitors have fun.
              </p>
              
              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary text-lg px-8 py-4">
                  Get Instant Demo
                </button>
                <button className="btn-outline text-lg px-8 py-4">
                  See Live Example
                </button>
              </div>
              
              {/* Trust Nudges */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No Credit Card Required
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Setup in 24 Hours
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Works with Any CRM
                </span>
              </div>
            </div>
            
            {/* Right: Media Container */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#03c4eb]/20 to-[#FFDC35]/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#03c4eb] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Watch 2-Minute Demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#171717] border-t border-gray-800 lg:hidden z-50">
          <button className="w-full bg-[#03c4eb] text-white py-3 rounded-xl font-semibold">
            Get Instant Demo
          </button>
        </div>
      </section>

      {/* 2. Social Proof Strip */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo Row */}
            <div className="flex items-center gap-8 opacity-60">
              <div className="text-gray-400 font-medium">Trusted by leading exhibitors:</div>
              <div className="flex items-center gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Logo {i}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stat Badge */}
            <div className="bg-[#03c4eb] text-white px-6 py-3 rounded-full font-semibold">
              37% more verified leads
            </div>
          </div>
        </div>
      </section>

      {/* 3. Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Headline + Description */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#171717] mb-6">
                Why Trade Show Leads Usually Fail
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Traditional lead capture is broken. Business cards get lost, contact info is fake, 
                and you waste time chasing unqualified prospects. Our system fixes every problem.
              </p>
            </div>
            
            {/* Right: Icon Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "📱", title: "Scan QR", desc: "Visitors scan to start—no apps needed" },
                { icon: "✅", title: "Verify", desc: "Real contact info, validated instantly" },
                { icon: "🎯", title: "Qualify", desc: "Smart questions identify hot prospects" },
                { icon: "🎪", title: "Gamify", desc: "Prize wheel keeps them engaged" },
                { icon: "⚡", title: "Automate", desc: "Leads flow directly to your CRM" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-[#171717] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#171717] mb-6">
              How It Works in 5 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From QR scan to qualified lead in under 2 minutes. Here's the complete visitor journey.
            </p>
          </div>
          
          {/* Desktop: Horizontal Stepper */}
          <div className="hidden lg:flex items-center justify-between mb-12">
            {[
              { num: 1, title: "Visitor Scans QR", desc: "At your booth or on marketing materials" },
              { num: 2, title: "Enters Contact Info", desc: "Name, email, company—all verified" },
              { num: 3, title: "Answers Questions", desc: "Quick qualification to gauge interest" },
              { num: 4, title: "Spins Prize Wheel", desc: "Gamified experience with real rewards" },
              { num: 5, title: "Lead Hits Your CRM", desc: "Qualified prospect data delivered instantly" }
            ].map((step, index) => (
              <div key={index} className="flex-1 text-center relative">
                <div className="w-12 h-12 bg-[#03c4eb] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-[#171717] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
                {index < 4 && (
                  <div className="absolute top-6 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile: Stacked Cards */}
          <div className="lg:hidden space-y-6">
            {[
              { num: 1, title: "Visitor Scans QR", desc: "At your booth or on marketing materials" },
              { num: 2, title: "Enters Contact Info", desc: "Name, email, company—all verified" },
              { num: 3, title: "Answers Questions", desc: "Quick qualification to gauge interest" },
              { num: 4, title: "Spins Prize Wheel", desc: "Gamified experience with real rewards" },
              { num: 5, title: "Lead Hits Your CRM", desc: "Qualified prospect data delivered instantly" }
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#03c4eb] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-[#171717] mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gray-100 hover:bg-gray-200 text-[#171717] px-8 py-4 rounded-xl font-semibold transition-colors">
              See It in Action
            </button>
          </div>
        </div>
      </section>

      {/* 5. Feature Highlights */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#171717] mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform handles every aspect of lead capture, qualification, and delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Smart Qualification",
                desc: "Custom questions identify your ideal prospects automatically."
              },
              {
                icon: "🔗",
                title: "CRM Integration",
                desc: "Works with Salesforce, HubSpot, and 50+ other systems."
              },
              {
                icon: "📊",
                title: "Real-Time Analytics",
                desc: "Track booth performance and lead quality in real-time."
              },
              {
                icon: "🎨",
                title: "Custom Branding",
                desc: "Fully branded experience matches your company style."
              },
              {
                icon: "📱",
                title: "Mobile Optimized",
                desc: "Perfect experience on any device, no apps required."
              },
              {
                icon: "🛡️",
                title: "Data Security",
                desc: "GDPR compliant with enterprise-grade security."
              }
            ].map((feature, index) => (
              <div key={index} className="card card-hover p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#171717] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Before/After Outcomes */}
      <section className="section-padding bg-[#f4f4f4]">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#171717] mb-6">
              The Transformation is Dramatic
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our system transforms your trade show ROI and lead quality.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Before Card */}
            <div className="card p-8 border-l-4 border-red-400">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😞</span>
                </div>
                <h3 className="text-2xl font-bold text-[#171717]">Before: Traditional Methods</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Collect 200+ business cards",
                  "30% have fake contact info",
                  "No qualification data",
                  "Takes weeks to follow up",
                  "5% conversion rate",
                  "Can't measure booth ROI"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* After Card */}
            <div className="card p-8 border-l-4 border-green-400">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-[#171717]">After: Our System</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Capture 300+ verified leads",
                  "100% accurate contact data",
                  "Complete qualification profiles",
                  "Instant CRM delivery",
                  "15% conversion rate",
                  "Full ROI tracking & analytics"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-[#03c4eb] text-white px-8 py-4 rounded-xl font-bold text-xl">
              <span>Result:</span>
              <span className="text-[#FFDC35]">3× more qualified leads</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pricing/Pilot */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-[#03c4eb]/10"></div>
        <div className="relative container-width text-center max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#171717] mb-6">
            Start Your Pilot Program
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Test our system at your next show with zero risk and immediate results.
          </p>
          
          <div className="card shadow-2xl p-8 lg:p-12 max-w-lg mx-auto">
            <div className="bg-[#FFDC35] text-[#171717] px-4 py-2 rounded-full font-bold text-sm inline-block mb-6">
              PILOT PROGRAM
            </div>
            
            <h3 className="text-2xl font-bold text-[#171717] mb-6">Complete Trade Show Package</h3>
            
            <ul className="text-left space-y-4 mb-8">
              {[
                "Custom QR codes & booth setup",
                "Branded prize wheel experience",
                "CRM integration & data sync",
                "Real-time analytics dashboard",
                "Live support during your show",
                "Post-show performance report"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#03c4eb] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-3xl font-bold text-[#171717] mb-2">Contact for Pricing</div>
            <p className="text-gray-600 mb-8">Custom quote based on show size and requirements</p>
            
            <button className="btn-primary w-full mb-4">
              Get Your Custom Quote
            </button>
            
            <p className="text-sm text-gray-500">No long-term contract required</p>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              <strong>ROI Guarantee:</strong> If you don't see measurable improvement in lead quality, 
              we'll refund your investment.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="section-padding bg-[#171717] text-white">
        <div className="container-width max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get answers to common questions about our trade show lead capture system.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Conversion Form */}
      <section id="conversion-form" className="section-padding bg-gray-50">
        <div className="container-width max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Form Card */}
            <div className="lg:col-span-2">
              <div className="card shadow-xl p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#171717] mb-6">
                  Book a Demo for Your Next Show
                </h2>
                <p className="text-gray-600 mb-8">
                  See exactly how our system will work for your specific trade show and industry.
                </p>
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Next Show Date
                        </label>
                        <select
                          name="showDate"
                          value={formData.showDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#03c4eb] focus:border-transparent"
                        >
                          <option value="">Select timeframe</option>
                          <option value="next-30-days">Next 30 days</option>
                          <option value="next-3-months">Next 3 months</option>
                          <option value="next-6-months">Next 6 months</option>
                          <option value="planning-stage">Still planning</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full text-lg"
                    >
                      Book a Demo
                    </button>
                    
                    <p className="text-sm text-gray-500 text-center">
                      No credit card required • 15-minute setup call
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#171717] mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      We'll contact you within 24 hours to schedule your personalized demo.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar Checklist */}
            <div className="card shadow-xl p-8">
              <h3 className="text-xl font-bold text-[#171717] mb-6">What You'll Get:</h3>
              <ul className="space-y-4">
                {[
                  "Live demo tailored to your industry",
                  "Custom ROI projection for your shows",
                  "Integration walkthrough with your CRM"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#03c4eb] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Secondary Proof */}
      <section className="section-padding bg-white">
        <div className="container-width max-w-4xl text-center">
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xs">Photo</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[#171717]">Sarah Johnson</div>
                <div className="text-gray-600">VP Marketing, TechCorp</div>
              </div>
            </div>
            
            <blockquote className="text-xl lg:text-2xl text-gray-700 italic leading-relaxed mb-6">
              "We tripled our qualified leads at the last trade show and cut our follow-up time from weeks to hours. 
              The gamification kept visitors engaged, and the data quality was incredible."
            </blockquote>
            
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-[#171717] text-white py-8">
        <div className="container-width">
          <div className="text-center">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <span> 2024 SyncWorkflow</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoatShowPromo;