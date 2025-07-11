'use client';

import React, { useState } from 'react';
import LandingNavbar from '../layout/LandingNavbar';
import Link from 'next/link';

export default function PromotionalLandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [spotsLeft, setSpotsLeft] = useState(10); // Track spots remaining

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { email, name, company, phone });
    alert('Thank you for your interest! We\'ll be in touch soon to secure your spot.');
    setEmail('');
    setName('');
    setCompany('');
    setPhone('');
    // In a real app, this would connect to your backend
    if (spotsLeft > 0) {
      setSpotsLeft(spotsLeft - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#3777ff] to-[#1a4dc9] text-white">
      <LandingNavbar />
      
      {/* Hero Section with Limited Time Offer */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-[#0bfe88] text-black font-bold px-4 py-2 rounded-full mb-6 animate-pulse">
            LIMITED TIME OFFER • ONLY {spotsLeft} SPOTS LEFT
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            BOOTH LEAD CAPTURE
            <span className="block text-[#0bfe88] mt-2">THAT ACTUALLY WORKS</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            First 10 clients get custom branded forms and $500 setup fee waived
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a 
              href="#claim-offer" 
              className="bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              CLAIM YOUR SPOT NOW
            </a>
            <a 
              href="#learn-more" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#3777ff] font-bold text-lg px-8 py-4 rounded-lg transition-all"
            >
              LEARN MORE
            </a>
          </div>
          
          {/* Countdown Timer */}
          <div className="mb-8">
            <p className="text-lg mb-2">Limited time offer ends in:</p>
            <div className="flex justify-center gap-4">
              {['36', '12', '01', '07'].map((num, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white text-indigo-900 font-bold text-2xl w-16 h-16 rounded-lg flex items-center justify-center">
                    {num}
                  </div>
                  <span className="text-xs mt-1">
                    {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="flex justify-center items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2">AVG. RATING OF 4.8 / 5.0 STARS</span>
          </div>
          <p className="text-lg font-bold">OVER 32,000 5-STAR REVIEWS</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="bg-white text-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            EVERYTHING YOU NEED FOR SUCCESSFUL LEAD CAPTURE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Smart Forms",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#3777ff] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                description: "Custom branded forms that capture exactly what you need from each lead"
              },
              {
                title: "Live Scoring",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#3777ff] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                description: "Instantly identify your hottest leads based on their responses"
              },
              {
                title: "Giveaway Tracker",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#3777ff] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                ),
                description: "Manage booth prizes and automatically enter qualified leads"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-[#f0f7ff] p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-[#3777ff] mb-4">SPECIAL OFFER DETAILS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-[#3777ff] mb-2">FREE</div>
                <div className="text-lg font-bold mb-4">Custom Brand Design</div>
                <p className="text-gray-600 mb-4">Your forms will match your brand colors, logo, and style guidelines perfectly.</p>
                <div className="text-lg font-bold text-[#0bfe88]">$1,000 Value</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-[#3777ff] mb-2">WAIVED</div>
                <div className="text-lg font-bold mb-4">Setup Fee</div>
                <p className="text-gray-600 mb-4">We'll handle all the technical setup and configuration for you.</p>
                <div className="text-lg font-bold text-[#0bfe88]">$500 Value</div>
              </div>
            </div>
            <div className="mt-6 text-sm text-[#3777ff]">
              *Limited to the first 10 clients who sign up. Regular pricing applies after promotion ends.
            </div>
          </div>
        </div>
      </section>
      
      {/* Claim Offer Form Section */}
      <section id="claim-offer" className="py-16 bg-[#3777ff]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">CLAIM YOUR SPOT NOW</h2>
          <p className="text-xl mb-8">Only {spotsLeft} spots remaining at this special price!</p>
          
          <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="text-left">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company*</label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your company"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="text-left">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              SECURE YOUR SPOT NOW
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              By submitting this form, you agree to our terms and conditions. We'll contact you within 24 hours to discuss your needs.
            </p>
          </form>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">WHAT OUR CLIENTS SAY</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "We captured 3x more qualified leads than at previous events. The ROI was immediate and substantial.",
                author: "Sarah Johnson",
                role: "Marketing Director, TechCorp"
              },
              {
                quote: "The lead scoring feature helped us focus our follow-up efforts on the right prospects. Our conversion rate improved by 45%.",
                author: "Michael Chen",
                role: "Sales Manager, InnovateCo"
              },
              {
                quote: "Setup was fast and the branded forms looked amazing. Our booth staff found it incredibly easy to use.",
                author: "Jessica Miller",
                role: "Event Coordinator, GrowthBiz"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div className="font-bold">{testimonial.author}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 bg-[#3777ff]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            DON'T MISS THIS LIMITED TIME OFFER
          </h2>
          <p className="text-xl mb-8">
            First 10 clients get custom branded forms and $500 setup fee waived
          </p>
          <a 
            href="#claim-offer" 
            className="inline-block bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            CLAIM YOUR SPOT NOW • ONLY {spotsLeft} REMAINING
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
          <p className="mb-4"> {new Date().getFullYear()} SyncWorkflow. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
