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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { email, name, company, phone });
    alert('Thank you for your interest! We\'ll be in touch soon to secure your spot.');
    setEmail('');
    setName('');
    setCompany('');
    setPhone('');
    setIsModalOpen(false); // Close modal after submission
    // In a real app, this would connect to your backend
    if (spotsLeft > 0) {
      setSpotsLeft(spotsLeft - 1);
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#3777ff] to-[#1a4dc9] text-white">
      {/* Limited-Time Offer - Full Width Black Banner at Top */}
      <div className="w-full bg-black text-white py-2.5 px-4 flex justify-center items-center">
        <span className="mx-1">Get</span>
        <span className="font-bold">Free custom branded forms</span>
        <span className="mx-2 font-bold">$1,500 value</span>
      </div>
      
      {/* Removed navigation menu for ONE clear goal with no distractions */}
      
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-2 pt-8 pb-16 md:pt-10 md:pb-16">
        <div className="max-w-6xl w-full mx-auto">
          
          <div className="md:flex md:items-center md:text-left">
            <div className="md:w-1/2 md:pr-8">
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                Capture & Qualify Leads at <span className="text-[#2e2f31]">Your Booth</span> — Easily
              </h1>
              
              {/* Subheadline with value proposition */}
              <p className="text-xl md:text-2xl mb-8">
                3× higher conversions for exhibitors.
              </p>
              
              {/* Feature Bullet Points */}
              <div className="text-left mb-8 space-y-4">
              <div className="flex items-start">
                  <span className="text-[#0bfe88] text-xl mr-3">🎯</span>
                  <div>
                  <p>
                    <span className="font-bold">Increase sign-ups</span>
                    <span> with instant QR forms</span>
                  </p>
                  </div>
                </div>           
                
                <div className="flex items-start">
                  <span className="text-[#0bfe88] text-xl mr-3">🏆</span>
                  <div>
                  <p>
                    <span className="font-bold">Boost booth engagement</span>
                    <span> with automatic instant prizes</span>
                  </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-[#0bfe88] text-xl mr-3">✅</span>
                  <div>
                  <p>
                    <span className="font-bold">Follow up faster</span>
                    <span> with auto-qualified leads (cold • warm • hot)</span>
                  </p>
                  </div>
                </div>
            
              </div>
              
              {/* CTA Button */}
              <div className="flex flex-col items-start mb-6">
                <a 
                  href="#claim-offer" 
                  onClick={openModal}
                  className="bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold text-lg px-10 py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center w-full md:w-auto shadow-lg"
                >
                  <span className="text-2xl font-bold">Start Free Trial</span>
                </a>
                <div className="mt-3 flex items-center">
                  <span className="text-sm text-white/90">no credit card required</span>
                </div>
              </div>
              
              {/* Trust Statement */}
              <p className="text-sm text-white/80 mt-4">
                Trusted by trade show teams like yours — boosters of booth ROI.
              </p>
            </div>
            
            {/* Visual: QR Scan + Prize Assignment */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              {/* Phone Device Mockup with Animation */}
              <div className="device-mockup phone camera-float relative z-20 md:mr-0 md:ml-auto">
                <div className="rounded-[54px] border border-gray-700 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] bg-[#1a1a1a] p-2 w-[280px] h-[580px] relative">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[24px] bg-black rounded-b-[12px] z-50"></div>
                  
                  <div className="bg-black rounded-[42px] w-full h-full overflow-hidden relative">
                    {/* Background gradient and grid */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3777ff]/5 via-black to-[#3777ff]/10">
                      <div className="absolute inset-0 viewfinder-grid"></div>
                    </div>
                    
                    {/* Top UI */}
                    <div className="absolute top-0 left-0 right-0 z-40 pt-8 pb-4 px-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-2 py-1">
                          <div className="w-1.5 h-1.5 bg-[#3777ff] rounded-full recording-dot"></div>
                          <span className="text-white text-xs">LIVE</span>
                        </div>
                        <div className="text-xs font-bold">
                          <span className="text-white">Sync</span><span className="text-[#3777ff]">Workflow</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* QR Code Scanning Interface */}
                    <div className="flex flex-col h-full justify-center items-center p-4 pt-16 relative z-30">
                      <div className="w-full space-y-5 max-w-[220px] relative">
                        <div className="mb-6 text-center">
                          <span className="text-white text-lg font-bold tracking-wider mb-1 block">SCAN TO SIGN UP</span>
                          <div className="w-16 h-1 bg-[#3777ff] mx-auto rounded-full"></div>
                        </div>
                        
                        {/* QR Code Display */}
                        <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 relative">
                          <img 
                            src="/images/qr_code.png" 
                            alt="QR Code" 
                            className="w-full h-full" 
                            onError={(e) => {
                              // Remove the image and replace with a simple QR code representation
                              const parent = e.currentTarget.parentNode;
                              if (parent) {
                                // Remove the image
                                e.currentTarget.style.display = 'none';
                                
                                // Create a simple QR code representation
                                const qrFallback = document.createElement('div');
                                qrFallback.className = 'w-full h-full bg-gray-200 flex items-center justify-center';
                                qrFallback.innerHTML = '<div class="text-gray-600 text-sm font-medium">QR Code</div>';
                                parent.appendChild(qrFallback);
                              }
                            }}
                          />
                          {/* Scanning animation */}
                          <div className="scanning-line"></div>
                        </div>
                        
                        <p className="text-white text-center mt-4">Scan with your phone camera</p>
                        
                        {/* Process steps indicator */}
                        <div className="mt-6">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#3777ff]"></div>
                            <div className="w-12 h-1 bg-[#3777ff]/30"></div>
                            <div className="w-3 h-3 rounded-full bg-[#3777ff]/30"></div>
                            <div className="w-12 h-1 bg-[#3777ff]/30"></div>
                            <div className="w-3 h-3 rounded-full bg-[#3777ff]/30"></div>
                          </div>
                          <p className="text-xs text-white/70 text-center mt-2">Scan → Verify → Win</p>
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
      
    

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
            How It Works <span className="text-[#3777ff]">(3 Easy Steps)</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#3777ff] text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#3777ff] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">We build your custom setup</h3>
              <p className="text-gray-600">Branded forms, automated emails, and prize tools tailored to your event needs</p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#3777ff] text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#3777ff] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">You share the sign-up link</h3>
              <p className="text-gray-600">Display QR codes at your booth for easy attendee registration</p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#3777ff] text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#3777ff] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">We help you maximize ROI</h3>
              <p className="text-gray-600">Get insights and support to convert leads into customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="bg-white text-gray-900 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
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
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.533 1.533 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
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
                <div className="text-center mb-2">
                  <h4 className="font-bold text-base bg-[#3777ff]/10 text-[#3777ff] py-1 px-2 rounded-md inline-block">Custom Sign Up Form</h4>
                </div>
                <img 
                  src="/images/phone-mockup-1.png" 
                  alt="Lead Registration" 
                  className="w-[180px] h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-center mb-2">
                  <h4 className="font-bold text-base bg-[#3777ff]/10 text-[#3777ff] py-1 px-2 rounded-md inline-block">Send Verification Code</h4>
                </div>
                <img 
                  src="/images/phone-mockup-2.png" 
                  alt="Verification" 
                  className="w-[180px] h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-center mb-2">
                  <h4 className="font-bold text-base bg-[#3777ff]/10 text-[#3777ff] py-1 px-2 rounded-md inline-block">Code Entry Screen</h4>
                </div>
                <img 
                  src="/images/phone-mockup-3.png" 
                  alt="Confirmation" 
                  className="w-[180px] h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          
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
          

          
          <div className="bg-[#f0f7ff] p-8 rounded-xl max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-[#3777ff] mb-4">PRICING PLANS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Plan */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#3777ff] hover:shadow-xl transition-shadow duration-300">
                <div className="text-2xl font-bold text-[#3777ff] mb-2">Basic</div>
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 line-through mr-2">$700</span>
                  <span className="text-2xl font-bold">$400</span>
                  <span className="text-gray-600 ml-1">setup</span>
                </div>
                <div className="bg-red-100 text-red-600 text-sm font-bold py-1 px-2 rounded mb-3 inline-block">
                  $300 OFF for New Clients!
                </div>
                <div className="text-lg font-semibold mb-2">Includes:</div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>SMS & Email Notifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Secure Hosting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Basic Branding</span>
                  </li>
                </ul>
                <div className="text-lg font-bold text-[#3777ff] mt-auto">
                  $5 <span className="text-sm font-normal">per attendee</span>
                </div>
                <button onClick={openModal} className="w-full mt-4 bg-[#3777ff] hover:bg-[#2855c5] text-white py-2 px-4 rounded-lg transition-colors duration-300">
                  Claim Offer
                </button>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#0bfe88] transform scale-105 hover:shadow-xl transition-shadow duration-300">
                <div className="absolute -top-3 right-4 bg-[#0bfe88] text-xs text-gray-900 font-bold py-1 px-2 rounded-full">POPULAR</div>
                <div className="text-2xl font-bold text-[#3777ff] mb-2">Pro</div>
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 line-through mr-2">$900</span>
                  <span className="text-2xl font-bold">$600</span>
                  <span className="text-gray-600 ml-1">setup</span>
                </div>
                <div className="bg-red-100 text-red-600 text-sm font-bold py-1 px-2 rounded mb-3 inline-block">
                  $300 OFF for New Clients!
                </div>
                <div className="text-lg font-semibold mb-2">Everything in Basic plus:</div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Custom Domain</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Prize Tool</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Lead Scoring</span>
                  </li>
                </ul>
                <div className="text-lg font-bold text-[#3777ff] mt-auto">
                  $4 <span className="text-sm font-normal">per attendee</span>
                </div>
                <button onClick={openModal} className="w-full mt-4 bg-[#0bfe88] hover:bg-[#09d973] text-gray-900 py-2 px-4 rounded-lg transition-colors duration-300">
                  Claim Offer
                </button>
              </div>
              
              {/* Custom Plan */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-800 hover:shadow-xl transition-shadow duration-300">
                <div className="text-2xl font-bold text-[#3777ff] mb-2">Custom</div>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold">Custom</span>
                  <span className="text-gray-600 ml-1">quote</span>
                </div>
                <div className="text-lg font-semibold mb-2">Tailored solution with:</div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Custom Features</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>API Integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#0bfe88] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Priority Support</span>
                  </li>
                </ul>
                <div className="text-lg font-bold text-[#3777ff] mt-auto">
                  Custom <span className="text-sm font-normal">pricing</span>
                </div>
                <button onClick={openModal} className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="mt-6 text-sm text-[#3777ff] text-center">
              *Limited to the first {spotsLeft} spots remaining. Offer valid until July 31, 2025.
            </div>
          </div>
        </div>
      </section>
      
      {/* Claim Offer Form Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-[500px] relative">
            <button 
              className="absolute -top-3 -right-3 bg-white hover:bg-gray-100 text-gray-800 hover:text-black rounded-full p-1.5 shadow-md transition-colors"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-2">CLAIM YOUR SPOT NOW</h2>
            <p className="text-xl mb-8">Only {spotsLeft} spots remaining at this special price!</p>
            
            <form onSubmit={handleSubmit}>
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
        </div>
      )}
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50 text-black">
        <div className="max-w-6xl w-full mx-auto px-2 text-center">
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
        <div className="max-w-6xl w-full mx-auto px-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            DON'T MISS THIS LIMITED TIME OFFER
          </h2>
          <a 
            href="#claim-offer" 
            onClick={openModal}
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
