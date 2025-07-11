'use client';

import React, { useState } from 'react';
import LandingNavbar from '../layout/LandingNavbar';
import Link from 'next/link';

export default function PromotionalLandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [spotsLeft, setSpotsLeft] = useState(9); // Track spots remaining

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
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-white text-black font-bold px-4 py-2 rounded-full mb-6">
            <span className="text-red-500">LIMITED TIME OFFER</span> • ONLY {spotsLeft} SPOTS LEFT
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            BOOTH LEAD CAPTURE
            <span className="block text-white mt-2">THAT ACTUALLY WORKS</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            First 10 signups get custom branded forms and $500 setup fee waived
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a 
              href="#claim-offer" 
              className="bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold text-lg px-8 py-5 rounded-lg transition-all transform hover:scale-105 flex flex-col items-center"
            >
              <span className="text-[28px] font-[700]  ">CLAIM YOUR SPOT NOW</span>
              {/* <span className="text-sm mt-1">Free custom branded forms + $500 setup fee waived</span> */}
            </a>
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
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            EVERYTHING YOU NEED FOR SUCCESSFUL LEAD CAPTURE
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 mb-16 max-w-5xl mx-auto">
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
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex-1">
                <div className="text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Lead Capture Process Section Title */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Lead Verification</h2>
            <p className="text-gray-600 text-lg">
              Our verified lead capture system ensures quality leads through a simple three-step process. 
              Attendees scan your QR code, complete a custom form, and verify their contact information with a unique code.
            </p>
          </div>
          
          {/* Phone Mockup Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16 max-w-6xl mx-auto">
            {/* Phone Mockup with Camera */}
            <div className="device-mockup phone transform hover:-translate-y-2 transition-transform duration-500 ease-in-out">
              <div className="rounded-[40px] border border-gray-700 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] bg-[#1a1a1a] p-2 w-[220px] h-[440px] relative">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[20px] bg-black rounded-b-[12px] z-50"></div>
                
                <div className="bg-black rounded-[32px] w-full h-full overflow-hidden relative">
                  {/* Camera Interface */}
                  <div className="absolute inset-0 bg-black">
                    {/* Camera viewfinder */}
                    <div className="absolute inset-0 flex flex-col items-center">
                      {/* App header */}
                      <div className="w-full bg-black py-3 px-4 flex items-center justify-between">
                        <div className="text-white text-sm font-medium">
                          <span className="text-white font-bold">Sync<span className="text-[#3777ff]">Workflow</span></span>
                        </div>
                        <div className="text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Camera viewfinder area */}
                      <div className="flex-1 w-full flex flex-col items-center justify-center px-6 relative">
                        {/* QR code scanning frame */}
                        <div className="w-48 h-48 border-2 border-white/50 rounded-lg relative">
                          {/* QR Code Image */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src="/images/qr_code.png" 
                              alt="QR Code" 
                              className="w-36 h-36 object-contain"
                            />
                          </div>
                          
                          {/* Corner markers */}
                          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#3777ff]"></div>
                          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#3777ff]"></div>
                          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#3777ff]"></div>
                          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#3777ff]"></div>
                          
                          {/* Scanning animation */}
                          <div className="scanning-line"></div>
                        </div>
                        
                        {/* Instructions text */}
                        <div className="mt-6 text-center">
                          <h3 className="text-white text-lg font-bold">Scan QR Code</h3>
                          <p className="text-white/70 text-xs mt-2">Point your camera at the booth QR code to register</p>
                        </div>
                      </div>
                      
                      {/* Bottom controls */}
                      <div className="w-full py-6 flex justify-center">
                        <div className="w-12 h-12 rounded-full border-3 border-white flex items-center justify-center">
                          <div className="w-9 h-9 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Phone Mockup Images */}
            <div className="flex flex-col md:flex-row gap-4 mt-8 md:mt-0">
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <img 
                  src="/images/phone-mockup-1.png" 
                  alt="Lead Registration" 
                  className="w-[180px] h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <img 
                  src="/images/phone-mockup-2.png" 
                  alt="Verification" 
                  className="w-[180px] h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <img 
                  src="/images/phone-mockup-3.png" 
                  alt="Confirmation" 
                  className="w-[180px] h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
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
        <div className="max-w-2xl mx-auto px-4 text-center">
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
        <div className="max-w-3xl mx-auto px-4 text-center">
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
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            DON'T MISS THIS LIMITED TIME OFFER
          </h2>
          <a 
            href="#claim-offer" 
            className="inline-block bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold px-10 py-5 rounded-lg transition-all transform hover:scale-105 flex flex-col items-center"
          >
            <span className="text-xl">CLAIM YOUR SPOT NOW</span>
            <span className="text-sm mt-1">Free custom branded forms + $500 setup fee waived</span>
            <span className="text-sm mt-1">ONLY {spotsLeft} SPOTS REMAINING</span>
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-400">
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
