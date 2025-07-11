'use client';

import Link from 'next/link';
import { useState } from 'react';
import LandingNavbar from '../layout/LandingNavbar';

export default function LeadCaptureLandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [boothSize, setBoothSize] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted:', { email, name, company, boothSize });
    alert('Thank you for your interest! We\'ll be in touch soon.');
    setEmail('');
    setName('');
    setCompany('');
    setBoothSize('');
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Capture & Qualify Leads at Your Booth — Easily
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                Custom-branded lead forms with real-time scoring and seamless prize entry — proven to drive up to 3× higher conversions for exhibitors.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center bg-white/10 px-3 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Lead validation</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Prize management</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  <span>Export to Excel/CRM</span>
                </div>
              </div>
              <Link 
                href="#trial" 
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-md font-bold text-center transition duration-300 inline-block"
              >
                Start Free Trial
              </Link>
              <p className="mt-4 text-sm text-blue-100">
                Trusted by trade show teams like yours — boosters of booth ROI.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-3 rounded-lg shadow-xl w-full max-w-md">
                <div className="bg-gray-50 rounded overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <span className="ml-2 font-medium text-gray-800">Lead Capture</span>
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        HOT LEAD
                      </div>
                    </div>
                    <div className="space-y-3 text-left">
                      <div>
                        <label className="block text-sm text-gray-600">Full Name</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900" value="Jane Smith" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Company</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-900" value="Acme Corp" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Role in Purchasing</label>
                        <select className="w-full p-2 border border-gray-300 rounded mt-1 bg-white text-gray-900">
                          <option>Decision Maker</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Interest Level</label>
                        <div className="flex mt-1">
                          <div className="flex-1 bg-red-100 h-2 rounded-l"></div>
                          <div className="flex-1 bg-yellow-100 h-2"></div>
                          <div className="flex-1 bg-green-500 h-2 rounded-r"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your All-in-One Booth Lead Capture App</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trade shows are busy. Your lead capture shouldn't be. Our app makes it easy to collect, qualify, and follow up with leads — all from a single, branded form. Designed for booth teams who want clean data and better results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Smart Forms", 
                image: "/images/features/smart-forms.png", 
                description: "Customizable forms that capture exactly what you need from each lead" 
              },
              { 
                title: "Live Scoring", 
                image: "/images/features/live-scoring.png", 
                description: "Instantly identify your hottest leads based on their responses" 
              },
              { 
                title: "Giveaway Tracker", 
                image: "/images/features/giveaway-tracker.png",
                description: "Manage booth prizes and automatically enter qualified leads" 
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={`${item.title} feature`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400">
                      {item.title} Screenshot
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {item.title}
                  </div>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="#demo" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-center transition duration-300 inline-block"
            >
              See It in Action
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Spotlight Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Lead Score</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-16 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      HOT
                    </div>
                    <div className="h-2 bg-blue-600 rounded-full flex-1"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      WARM
                    </div>
                    <div className="h-2 bg-yellow-500 rounded-full flex-1 w-2/3"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      COLD
                    </div>
                    <div className="h-2 bg-gray-400 rounded-full flex-1 w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Prioritize the Right Leads in Real Time</h2>
              <p className="text-xl text-gray-600 mb-6">
                Not every lead is worth your follow-up. That's why our system automatically scores each contact as cold, warm, or hot based on how they answer key questions like:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">"Are you actively seeking solutions?"</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">"What's your role in purchasing?"</span>
                </li>
              </ul>
              <p className="text-xl font-medium text-gray-900">
                You get clear insights — instantly.
              </p>
              <div className="mt-6">
                <Link 
                  href="#learn-more" 
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  Learn how lead scoring works
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Trade Show Teams</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Client logos would go here */}
            {['Client 1', 'Client 2', 'Client 3', 'Client 4'].map((client, index) => (
              <div key={index} className="bg-gray-100 h-16 w-32 flex items-center justify-center rounded">
                <span className="text-gray-500 font-medium">{client}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">ST</span>
                </div>
              </div>
              <div>
                <p className="text-gray-700 italic mb-4">
                  "We captured 150+ leads in 2 days and knew exactly who to follow up with. No more wasting time on dead ends."
                </p>
                <div>
                  <p className="font-medium text-gray-900">Sarah T.</p>
                  <p className="text-gray-600 text-sm">Events Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="trial" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join trade show teams who are capturing better leads and driving higher ROI.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your company"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="boothSize" className="block text-sm font-medium text-gray-700 mb-1">Booth Size</label>
                <select
                  id="boothSize"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  value={boothSize}
                  onChange={(e) => setBoothSize(e.target.value)}
                  required
                >
                  <option value="">Select booth size</option>
                  <option value="small">Small (10x10)</option>
                  <option value="medium">Medium (10x20)</option>
                  <option value="large">Large (20x20+)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-bold transition duration-300"
              >
                Start Free Trial
              </button>
            </form>
            <p className="text-center text-gray-500 text-sm mt-4">
              No credit card required. Privacy link • Terms
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
