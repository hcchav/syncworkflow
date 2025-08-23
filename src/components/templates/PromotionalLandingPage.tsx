'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CustomWheel } from '../ui/CustomWheel';
import '../../styles/wheel.css';

export default function PromotionalLandingPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(9); // Track spots remaining
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  
  // Animation state management
  const [animationStep, setAnimationStep] = useState(0);
  const [qrScanned, setQrScanned] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [nameCompleted, setNameCompleted] = useState(false);
  const [emailCompleted, setEmailCompleted] = useState(false);
  const [phoneCompleted, setPhoneCompleted] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  
  // Animation timers reference
  const animationTimers = useRef<NodeJS.Timeout[]>([]);
  
  // Reset and restart animation
  const resetAnimation = () => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    setAnimationStep(0);
    setQrScanned(false);
    setNameValue('');
    setEmailValue('');
    setPhoneValue('');
    setVerificationCode(['', '', '', '', '', '']);
    setWheelRotation(0);
    setShowPrize(false);
    startAnimation();
  };

  // Validation functions
  const validateName = (value: string) => {
    const isValid = value.trim().length >= 2; // At least 2 characters
    setIsNameValid(isValid);
    return isValid;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setIsEmailValid(isValid);
    return isValid;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^[\d\s\-()+]{7,}$/; // At least 7 digits, allowing spaces, dashes, parentheses
    const isValid = phoneRegex.test(value);
    setIsPhoneValid(isValid);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { email, name, company, phone });
    alert('Thank you for your interest! We&apos;ll be in touch soon to secure your spot.');
    setEmail('');
    setName('');
    setIsNameValid(false);
    setIsEmailValid(false);
    setIsPhoneValid(false);
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
  
  // Start animation sequence
  const startAnimation = () => {
    // Clear any existing timers
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    
    // Reset animation states
    setQrScanned(false);
    setAnimationStep(0);
    setNameValue('');
    setEmailValue('');
    setPhoneValue('');
    setNameCompleted(false);
    setEmailCompleted(false);
    setPhoneCompleted(false);
    setVerificationCode(['', '', '', '', '', '']);
    setWheelRotation(0);
    setShowPrize(false);
    
    // Step 1: Show QR scanning animation
    const qrScanTimer = setTimeout(() => {
      setQrScanned(true);
    }, 2000); // Simulate QR scanning for 2 seconds
    animationTimers.current.push(qrScanTimer);
    
    // Step 2: Move to form after QR scan
    const moveToFormTimer = setTimeout(() => {
      setAnimationStep(1); // Move to form step
    }, 3000);
    animationTimers.current.push(moveToFormTimer);
    
    // Step 3: Type name (John Doe)
    const nameToType = 'John Doe';
    for (let i = 0; i < nameToType.length; i++) {
      const timer = setTimeout(() => {
        setNameValue(nameToType.substring(0, i + 1));
        // Set name as completed when typing is finished
        if (i === nameToType.length - 1) {
          setTimeout(() => setNameCompleted(true), 300); // Show check mark after a slight delay
        }
      }, 100 * i + 4000); // Start after 4s, type each character with 100ms delay
      animationTimers.current.push(timer);
    }
    
    // Step 4: Type email (john.doe@example.com)
    const emailToType = 'john.doe@example.com';
    for (let i = 0; i < emailToType.length; i++) {
      const timer = setTimeout(() => {
        setEmailValue(emailToType.substring(0, i + 1));
        // Set email as completed when typing is finished
        if (i === emailToType.length - 1) {
          setTimeout(() => setEmailCompleted(true), 300); // Show check mark after a slight delay
        }
      }, 100 * i + 6000); // Start after 6s
      animationTimers.current.push(timer);
    }
    
    // Step 5: Type phone (555-123-4567)
    const phoneToType = '555-123-4567';
    for (let i = 0; i < phoneToType.length; i++) {
      const timer = setTimeout(() => {
        setPhoneValue(phoneToType.substring(0, i + 1));
        // Set phone as completed when typing is finished
        if (i === phoneToType.length - 1) {
          setTimeout(() => setPhoneCompleted(true), 300); // Show check mark after a slight delay
        }
      }, 100 * i + 8000); // Start after 8s
      animationTimers.current.push(timer);
    }
    
    // Step 6: Submit form
    const submitTimer = setTimeout(() => {
      setAnimationStep(2); // Move to verification step
    }, 10000);
    animationTimers.current.push(submitTimer);
    
    // Step 7: Fill verification code
    const verificationDigits = ['1', '2', '3', '4', '5', '6'];
    for (let i = 0; i < verificationDigits.length; i++) {
      const timer = setTimeout(() => {
        setVerificationCode(prev => {
          const newCode = [...prev];
          newCode[i] = verificationDigits[i];
          return newCode;
        });
      }, 500 * i + 11000); // Start after 11s, fill each digit with 500ms delay
      animationTimers.current.push(timer);
    }
    
    // Step 8: Move to wheel step
    const moveToWheelTimer = setTimeout(() => {
      setAnimationStep(3); // Move to wheel step
    }, 15000);
    animationTimers.current.push(moveToWheelTimer);
    
    // Step 9: Spin the wheel
    const spinWheelTimer = setTimeout(() => {
      setWheelRotation(1); // Set to 1 to trigger wheel spinning
    }, 16000);
    animationTimers.current.push(spinWheelTimer);
    
    // Step 10: Show prize
    const showPrizeTimer = setTimeout(() => {
      setAnimationStep(4); // Move to prize step
      setShowPrize(true);
    }, 19000);
    animationTimers.current.push(showPrizeTimer);
    
    // Reset animation after full cycle
    const resetTimer = setTimeout(() => {
      resetAnimation(); // Restart the animation
    }, 25000);
    animationTimers.current.push(resetTimer);
  };
  
  // Start animation on component mount
  useEffect(() => {
    startAnimation();
    
    // Clean up timers on unmount
    return () => {
      animationTimers.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Limited-Time Offer - Full Width Black Banner at Top */}
      <div className="w-full bg-black text-white py-2.5 px-4 flex justify-center items-center">
        <span className="mx-1">Get</span>
        <span className="font-bold">Free custom branded forms</span>
        <span className="mx-2 font-bold">$1,500 value</span>
      </div>
      
      {/* Removed navigation menu for ONE clear goal with no distractions */}
      
      {/* Hero Section */}
      <section className="flex-grow flex flex-col items-center justify-center text-center px-2 pt-8 pb-16 md:pt-10 md:pb-16 bg-white">
        <div className="max-w-6xl w-full mx-auto">
          
          <div className="md:flex md:items-center md:text-left">
            <div className="md:w-1/2 md:pr-8">
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold mb-4">
                Attract more leads at <span className="font-semibold">Your Booth</span> — Easily
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
                  <span className="text-2xl font-bold">I want more leads at my booth</span>
                </a>
                {/* <div className="mt-3 flex items-center">
                  <span className="text-sm text-gray-600">no credit card required</span>
                </div> */}
              </div>
              
              {/* Trust Statement
              <p className="text-sm text-gray-600 mt-4">
                Trusted by trade show teams like yours — boosters of booth ROI.
              </p> */}
            </div>
            
            {/* Visual: QR Scan + Prize Assignment */}
            <div className="md:w-1/2 flex justify-center">
              {/* Phone Device Mockup with Animation */}
              <div className="device-mockup phone relative z-20 mx-auto">
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
                      <div className="flex justify-end items-center">
                        <div className="text-xs font-bold">
                          <span className="text-white">Sync</span><span className="text-[#3777ff]">Workflow</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Phone UI Content */}
                    <div className="form-ui flex flex-col h-full justify-center items-center p-4 pt-16 relative z-30">
                      <div className="w-full space-y-5 max-w-[220px] relative">
                        
                        {/* Step 1: QR Code Scanning */}
                        <div className={`transition-all duration-500 ${animationStep === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="mb-6 text-center">
                            <span className="text-white text-lg font-bold tracking-wider mb-1 block">SCAN QR CODE</span>
                            <div className="w-16 h-1 bg-[#3777ff] mx-auto rounded-full"></div>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center mt-4">
                            {/* QR Code scanning frame */}
                            <div className="relative w-48 h-48 border-2 border-dashed border-[#3777ff] rounded-lg flex items-center justify-center">
                              {/* Corner markers */}
                              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#3777ff]"></div>
                              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#3777ff]"></div>
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#3777ff]"></div>
                              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#3777ff]"></div>
                              
                              {/* Scanning animation */}
                              <div className="absolute top-0 left-0 right-0 h-1 bg-[#3777ff] opacity-80 scan-line"></div>
                              
                              {/* QR Code image */}
                              <div className={`transition-opacity duration-500 ${qrScanned ? 'opacity-40' : 'opacity-100'}`}>
                                <img src="/images/qr_code.png" alt="QR Code" className="w-36 h-36" />
                              </div>
                              
                              {/* Success checkmark when scanned */}
                              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${qrScanned ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="text-[#3777ff] text-5xl">✓</div>
                              </div>
                            </div>
                            
                            <p className="text-gray-400 text-sm mt-4 text-center">
                              {qrScanned ? 'QR Code Scanned Successfully!' : 'Position QR Code in Frame'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Step 2: Registration Form */}
                        <div className={`transition-all duration-500 ${animationStep === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="mb-6 text-center">
                            <span className="text-white text-lg font-bold tracking-wider mb-1 block">REGISTER</span>
                            <div className="w-16 h-1 bg-[#3777ff] mx-auto rounded-full"></div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-white text-xs block">Full Name</label>
                              <div className="bg-white/10 rounded-md p-2 border border-white/20 relative">
                                <p className="text-white text-sm">{nameValue || '|'}</p>
                                {nameCompleted && (
                                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 opacity-100">
                                    <svg className="h-4 w-4 text-[#0bfe88]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-white text-xs block">Email Address</label>
                              <div className="bg-white/10 rounded-md p-2 border border-white/20 relative">
                                <p className="text-white text-sm">{emailValue || '|'}</p>
                                {emailCompleted && (
                                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 opacity-100">
                                    <svg className="h-4 w-4 text-[#0bfe88]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-white text-xs block">Phone Number</label>
                              <div className="bg-white/10 rounded-md p-2 border border-white/20 relative">
                                <p className="text-white text-sm">{phoneValue || '|'}</p>
                                {phoneCompleted && (
                                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 opacity-100">
                                    <svg className="h-4 w-4 text-[#0bfe88]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <button className="w-full bg-[#3777ff] text-white py-2 rounded-md mt-4 font-medium">
                              Submit
                            </button>
                          </div>
                        </div>
                        
                        {/* Step 3: Verification Code */}
                        <div className={`transition-all duration-500 ${animationStep === 2 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="mb-6 text-center">
                            <span className="text-white text-lg font-bold tracking-wider mb-1 block">VERIFY</span>
                            <div className="w-16 h-1 bg-[#3777ff] mx-auto rounded-full"></div>
                          </div>
                          
                          <div className="space-y-4">
                            <p className="text-white/80 text-sm text-center">Enter the 6-digit code sent to your phone</p>
                            
                            <div className="flex justify-between gap-1">
                              {verificationCode.map((digit, index) => (
                                <div key={index} className="w-8 h-10 bg-white/10 rounded-md flex items-center justify-center border border-white/20">
                                  <span className="text-white font-medium">{digit}</span>
                                </div>
                              ))}
                            </div>
                            
                            <button className="w-full bg-[#3777ff] text-white py-2 rounded-md mt-4 font-medium">
                              Verify
                            </button>
                          </div>
                        </div>
                        
                        {/* Step 4: Prize Wheel */}
                        <div className={`transition-all duration-500 ${animationStep === 3 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          {/* Ultra-compact Prize Wheel Layout */}
                          <div className="flex flex-col items-center mt-5" style={{ height: "350px", padding: "15px 0 0 0" }}>
                            {/* Title */}
                            <div className="text-center">
                              <span className="text-white text-lg font-bold tracking-wider block">SPIN TO WIN</span>
                              <div className="w-16 h-1 bg-[var(--brand-blue)] mx-auto rounded-full mb-2"></div>
                            </div>
                            
                            {/* Prize Wheel - Minimal spacing */}
                            <div style={{ position: "relative", height: "300px", width: "100%" }}>
                              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                                <CustomWheel
                                  mustStartSpinning={wheelRotation > 0}
                                  prizeNumber={1} // Index 1 corresponds to VIP Badge
                                  data={[
                                    { option: 'Notebook', style: { backgroundColor: '#FF5252', textColor: 'white' } },
                                    { option: 'VIP Badge', style: { backgroundColor: '#4CAF50', textColor: 'white' } },
                                    { option: 'Gift Card', style: { backgroundColor: '#2196F3', textColor: 'white' } },
                                    { option: 'T-Shirt', style: { backgroundColor: '#FFC107', textColor: 'white' } },
                                    { option: 'Stickers', style: { backgroundColor: '#9C27B0', textColor: 'white' } },
                                    { option: 'Mug', style: { backgroundColor: '#FF9800', textColor: 'white' } },
                                    { option: 'Discount', style: { backgroundColor: '#00BCD4', textColor: 'white' } },
                                    { option: 'Pen', style: { backgroundColor: '#8BC34A', textColor: 'white' } }
                                  ]}
                                  spinDuration={0.8}
                                  outerBorderColor="#333"
                                  outerBorderWidth={1}
                                  innerBorderColor="#333"
                                  innerBorderWidth={3}
                                  innerRadius={15}
                                  radiusLineColor=""
                                  radiusLineWidth={1}
                                  wheelRadius={120}
                                  fontSize={20}
                                  textDistance={85}
                                  fontWeight={700}
                                  onStopSpinning={() => {
                                    setTimeout(() => setShowPrize(true), 1000);
                                  }}
                                />
                              </div>
                            </div>
                            
                            {/* Button at bottom - no margin */}
                            <div className="text-center mt-0">
                              <button 
                                onClick={() => wheelRotation === 0 && setWheelRotation(1)}
                                disabled={wheelRotation > 0}
                                className={`bg-[var(--brand-blue)] text-white font-bold py-1 px-6 rounded-md uppercase hover:bg-opacity-90 transition-all duration-300 ${wheelRotation > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(55,119,255,0.5)]'}`}
                              >
                                SPIN
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 5: Prize Reveal */}
                        <div className={`transition-all duration-500 ${animationStep === 4 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="text-center py-4">
                            <div className="text-4xl mb-2">🎉</div>
                            <h3 className="text-white text-xl font-bold mb-2">Congratulations!</h3>
                            <div className="w-16 h-1 bg-[var(--brand-blue)] mx-auto rounded-full mb-4"></div>
                            
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-700">
                              <p className="text-white font-bold mb-1">You won a</p>
                              <p className="text-[var(--brand-blue)] text-xl font-bold mb-2">FREE TRIAL</p>
                              <div className="text-3xl mb-1">🏆</div>
                              <p className="text-gray-400 text-xs">Check your email for details</p>
                            </div>
                            
                            <button className="w-full bg-[var(--brand-blue)] hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-md uppercase hover:shadow-[0_0_15px_rgba(55,119,255,0.5)] transform hover:scale-[1.02] transition-all duration-300">
                              CLAIM NOW
                            </button>
                          </div>
                        </div>
                        
                        {/* Process steps indicator */}
                        <div className="mt-16 text-center">
                          <p className="text-xs text-white/70 text-center">Scan → Submit → Verify → Win</p>
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
          
    
        {/* Create Excitement and Boost Interaction */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Excitement and Boost Interaction</h2>
          <p className="text-gray-600 text-lg">
            Draw crowds and spark engagement with an interactive prize wheel experience. Once attendees complete your branded sign-up, they’ll spin a digital wheel for a chance to win — turning casual visitors into excited, qualified leads.
          </p>
        </div>

        {/* Real Customer Examples */}
        <div className="max-w-7xl mx-auto mb-16">
          {/* Hero Video Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Watch Real Customers in Action</h3>
            <div className="max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
              <video 
                src="/videos/customer_prize_wheel_vertical.mp4" 
                className="w-full h-auto"
                controls
                muted
                playsInline
                loop
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-gray-600 mt-4 text-lg">Live customer scanning QR code and winning prizes</p>
          </div>

          {/* Supporting Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Customer Photo */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📱 Instant Engagement</h4>
              <div className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src="/images/customer-qr-code.PNG" 
                  alt="Real customer scanning QR code at booth" 
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-gray-600 mt-3">Customers love the interactive experience</p>
            </div>

            {/* Social Proof */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">💬 Social Buzz</h4>
              <div className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src="/images/instagram-comment.png" 
                  alt="Customer feedback on social media" 
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-gray-600 mt-3">Customers share their excitement online</p>
            </div>

            {/* Tradeshow Social Proof */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🏢 Tag the Tradeshow</h4>
              <div className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src="/images/tradeshow-social-proof.png" 
                  alt="Pet industry tradeshow social media post about SuperZoo booth experience" 
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-gray-600 mt-3">Tag the tradeshow on social media to drive traffic</p>
            </div>
          </div>

          {/* Results Stats */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#3777ff] mb-2">3x</div>
                <div className="text-gray-700 font-medium">Higher Conversion Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0bfe88] mb-2">85%</div>
                <div className="text-gray-700 font-medium">Complete Registration</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#ff6b35] mb-2">92%</div>
                <div className="text-gray-700 font-medium">Customer Satisfaction</div>
              </div>
            </div>
          </div>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-[500px] relative z-[100]">
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
                <div className="text-left relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-md border ${isNameValid ? 'border-green-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900 pr-10`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        validateName(e.target.value);
                      }}
                      required
                    />
                    {isNameValid && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-left relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className={`w-full px-4 py-3 rounded-md border ${isEmailValid ? 'border-green-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900 pr-10`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                      }}
                      required
                    />
                    {isEmailValid && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
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
                <div className="text-left relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className={`w-full px-4 py-3 rounded-md border ${isPhoneValid ? 'border-green-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900 pr-10`}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        validatePhone(e.target.value);
                      }}
                      required
                    />
                    {isPhoneValid && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
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
            <span className="text-2xl">I want more leads at my booth</span>
            <p className="text-sm mt-1"> + Free custom branded forms + No setup fees</p>
            <p className="text-sm mt-1">ONLY {spotsLeft} SPOTS REMAINING</p>
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
