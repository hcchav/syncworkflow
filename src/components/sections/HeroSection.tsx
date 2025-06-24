'use client';

import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useState, useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function HeroSection() {
  // Animation state management
  const [animationStep, setAnimationStep] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  
  // Animation timing references
  const animationTimers = useRef<NodeJS.Timeout[]>([]);
  
  // Reset and restart animation
  const resetAnimation = () => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    setAnimationStep(0);
    setNameValue('');
    setEmailValue('');
    setPhoneValue('');
    setVerificationCode(['', '', '', '', '', '']);
    setWheelRotation(0);
    setShowPrize(false);
    startAnimation();
  };
  
  // Start the animation sequence
  const startAnimation = () => {
    // Step 1: Type name (John Doe)
    const nameToType = 'John Doe';
    let currentPos = 0;
    
    // Type each character with a delay
    for (let i = 0; i < nameToType.length; i++) {
      const timer = setTimeout(() => {
        setNameValue(nameToType.substring(0, i + 1));
        currentPos = i + 1;
      }, 100 * i + 1000); // Start after 1s, type each character with 100ms delay
      animationTimers.current.push(timer);
    }
    
    // Step 2: Type email (john.doe@example.com)
    const emailToType = 'john.doe@example.com';
    for (let i = 0; i < emailToType.length; i++) {
      const timer = setTimeout(() => {
        setEmailValue(emailToType.substring(0, i + 1));
      }, 100 * i + 3000); // Start after 3s
      animationTimers.current.push(timer);
    }
    
    // Step 3: Type phone (555-123-4567)
    const phoneToType = '555-123-4567';
    for (let i = 0; i < phoneToType.length; i++) {
      const timer = setTimeout(() => {
        setPhoneValue(phoneToType.substring(0, i + 1));
      }, 100 * i + 5000); // Start after 5s
      animationTimers.current.push(timer);
    }
    
    // Step 4: Submit form
    const submitTimer = setTimeout(() => {
      setAnimationStep(1); // Move to verification step
    }, 7000);
    animationTimers.current.push(submitTimer);
    
    // Step 5: Fill verification code
    const verificationDigits = ['1', '2', '3', '4', '5', '6'];
    for (let i = 0; i < verificationDigits.length; i++) {
      const timer = setTimeout(() => {
        setVerificationCode(prev => {
          const newCode = [...prev];
          newCode[i] = verificationDigits[i];
          return newCode;
        });
      }, 500 * i + 8000); // Start after 8s, fill each digit with 500ms delay
      animationTimers.current.push(timer);
    }
    
    // Step 6: Submit verification
    const verifyTimer = setTimeout(() => {
      setAnimationStep(2); // Move to prize wheel step
    }, 11500);
    animationTimers.current.push(verifyTimer);
    
    // Step 7: Spin the wheel
    const spinTimer = setTimeout(() => {
      setWheelRotation(1800 + 45); // Spin 5 full rotations + 45 degrees to land on VIP Badge
    }, 12500);
    animationTimers.current.push(spinTimer);
    
    // Step 8: Show prize
    const prizeTimer = setTimeout(() => {
      setAnimationStep(3); // Move to prize reveal step
      setShowPrize(true);
    }, 16000);
    animationTimers.current.push(prizeTimer);
    
    // Step 9: Reset animation after completion
    const resetTimer = setTimeout(() => {
      resetAnimation();
    }, 22000); // Reset after 22 seconds total
    animationTimers.current.push(resetTimer);
  };
  
  // Start animation on component mount
  useEffect(() => {
    startAnimation();
    
    // Cleanup function
    return () => {
      animationTimers.current.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  return (
    <div className={`${inter.className} bg-white text-black`}>
      {/* Main hero section */}
      <div className="max-w-7xl mx-auto py-16 px-8 sm:py-24 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left side - Headline and pain points */}
          <div className="w-full lg:w-2/5 lg:pr-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 uppercase">
              Maximize Your Trade Show ROI
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Boost brand visibility, drive booth traffic, and capture high-quality leads with engaging, 
              on-brand registration forms designed for contests, giveaways, and raffles.
            </p>
            
            {/* Pain points and solutions */}
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[var(--brand-blue)] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700"><span className="font-semibold">Drive booth traffic</span> - Attract more visitors with engaging prize entry forms</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[var(--brand-blue)] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700"><span className="font-semibold">Capture quality leads</span> - Collect valuable prospect data with custom fields</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-[var(--brand-blue)] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700"><span className="font-semibold">Measure ROI</span> - Track entries, conversions, and engagement metrics in real-time</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/contact" className="bg-transparent hover:bg-[var(--brand-blue)] border-2 border-[var(--brand-blue)] hover:border-transparent text-[var(--brand-blue)] hover:text-white font-bold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300">
                GET STARTED
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right side - Device mockups */}
          <div className="w-full lg:w-3/5 relative">
            {/* Tablet Device Mockup - Horizontal */}
            <div className="device-mockup tablet relative z-10">
              <div className="rounded-[40px] border border-gray-700 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] bg-[#1a1a1a] p-2 w-[640px] h-[380px] relative">
                {/* Tablet camera */}
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-[6px] h-[6px] bg-[#333] rounded-full z-50 border border-[#444]"></div>
              
                <div className="bg-black rounded-[32px] w-full h-full overflow-hidden relative">
                  {/* Background gradient and grid */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue)]/5 via-black to-[var(--brand-blue)]/10">
                    <div className="absolute inset-0 viewfinder-grid"></div>
                  </div>
                  
                  {/* Top UI */}
                  <div className="absolute top-0 left-0 right-0 z-40 pt-4 pb-2 px-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-[var(--brand-blue)] rounded-full recording-dot"></div>
                        <span className="text-white text-xs">LIVE</span>
                      </div>
                      <div className="text-sm font-bold">
                        <span className="text-white">Sync</span><span className="text-[var(--brand-blue)]">Workflow</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Form UI */}
                  <div className="form-ui h-full p-8 pt-12 relative z-30">
                    <div className="flex flex-row gap-10 h-full">
                      {/* Left side - Form fields */}
                      <div className="flex-1 space-y-4">
                        <div className="text-white text-sm uppercase mb-1 opacity-70">Prize Entry Form</div>
                        <input 
                          type="text" 
                          placeholder="NAME" 
                          className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] placeholder:text-gray-400 border border-gray-700"
                        />
                        
                        <input 
                          type="email" 
                          placeholder="EMAIL" 
                          className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] placeholder:text-gray-400 border border-gray-700"
                        />
                        
                        <input 
                          type="tel" 
                          placeholder="PHONE" 
                          className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] placeholder:text-gray-400 border border-gray-700"
                        />
                      </div>
                      
                      {/* Right side - Info and button */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-white text-sm uppercase mb-1 opacity-70">Prize Details</div>
                          <div className="bg-gray-800 rounded-md p-4 mb-3 border border-gray-700">
                            <p className="text-white text-sm font-bold">Win a Premium Gift Package!</p>
                            <p className="text-white text-sm">Drawing: June 25, 2025</p>
                            <p className="text-[var(--brand-blue)] text-sm font-bold mt-1">Visit Booth #1234</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-center">
                          <button className="w-full bg-[var(--brand-blue)] hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-md uppercase hover:shadow-[0_0_15px_rgba(55,119,255,0.5)] transform hover:scale-[1.02] transition-all duration-300">
                            SUBMIT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Phone Device Mockup */}
          <div className="device-mockup phone transform hover:-translate-y-2 transition-transform duration-500 ease-in-out camera-float absolute z-20 top-[--20%] -right-[--10%] lg:-right-[-10%]">
            <div className="rounded-[54px] border border-gray-700 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] bg-[#1a1a1a] p-2 w-[280px] h-[580px] relative">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[24px] bg-black rounded-b-[12px] z-50"></div>
              
              <div className="bg-black rounded-[42px] w-full h-full overflow-hidden relative">
                {/* Background gradient and grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue)]/5 via-black to-[var(--brand-blue)]/10">
                  <div className="absolute inset-0 viewfinder-grid"></div>
                </div>
                
                {/* Top UI */}
                <div className="absolute top-0 left-0 right-0 z-40 pt-8 pb-4 px-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-2 py-1">
                      <div className="w-1.5 h-1.5 bg-[var(--brand-blue)] rounded-full recording-dot"></div>
                      <span className="text-white text-xs">LIVE</span>
                    </div>
                    <div className="text-xs font-bold">
                      <span className="text-white">Sync</span><span className="text-[var(--brand-blue)]">Workflow</span>
                    </div>
                  </div>
                </div>
                
                {/* Animated Form UI */}
                <div className="form-ui flex flex-col h-full justify-center items-center p-4 pt-16 relative z-30">
                  <div className="w-full space-y-5 max-w-[220px] relative">
                    {/* Step 1: Registration Form */}
                    <div className={`transition-all duration-500 ${animationStep === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                      <div className="mb-6 text-center">
                        <span className="text-white text-lg font-bold tracking-wider mb-1 block">PRIZE ENTRY FORM</span>
                        <div className="w-16 h-1 bg-[var(--brand-blue)] mx-auto rounded-full"></div>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="NAME" 
                            value={nameValue}
                            readOnly
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] placeholder:text-gray-400 border border-gray-700"
                          />
                          {nameValue && <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">✓</div>}
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="email" 
                            placeholder="EMAIL" 
                            value={emailValue}
                            readOnly
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] placeholder:text-gray-400 border border-gray-700"
                          />
                          {emailValue && emailValue.includes('@') && <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">✓</div>}
                        </div>
                        
                        <div className="relative">
                          <input 
                            type="tel" 
                            placeholder="PHONE" 
                            value={phoneValue}
                            readOnly
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] placeholder:text-gray-400 border border-gray-700"
                          />
                          {phoneValue && phoneValue.length > 9 && <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">✓</div>}
                        </div>
                      </div>
                      
                      {/* Submit Button */}
                      <div className="mt-5">
                        <button 
                          className={`w-full bg-[var(--brand-blue)] text-white font-bold py-3 px-6 rounded-md uppercase transition-all duration-300 ${phoneValue.length > 9 ? 'shadow-[0_0_15px_rgba(55,119,255,0.5)]' : 'opacity-70'}`}
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                    
                    {/* Step 2: Verification Code */}
                    <div className={`transition-all duration-500 ${animationStep === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                      <div className="mb-6 text-center">
                        <span className="text-white text-lg font-bold tracking-wider mb-1 block">VERIFY YOUR PHONE</span>
                        <div className="w-16 h-1 bg-[var(--brand-blue)] mx-auto rounded-full"></div>
                      </div>
                      
                      <p className="text-gray-400 text-sm text-center mb-4">Enter the 6-digit code sent to your phone</p>
                      
                      <div className="flex justify-between mb-6">
                        {verificationCode.map((digit, index) => (
                          <div 
                            key={index} 
                            className="w-8 h-10 bg-gray-800 border border-gray-700 rounded-md flex items-center justify-center text-white font-bold text-lg"
                          >
                            {digit}
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        className={`w-full bg-[var(--brand-blue)] text-white font-bold py-3 px-6 rounded-md uppercase transition-all duration-300 ${verificationCode.every(digit => digit !== '') ? 'shadow-[0_0_15px_rgba(55,119,255,0.5)]' : 'opacity-70'}`}
                      >
                        VERIFY
                      </button>
                    </div>
                    
                    {/* Step 3: Prize Wheel */}
                    <div className={`transition-all duration-500 ${animationStep === 2 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                      <div className="mb-4 text-center">
                        <span className="text-white text-lg font-bold tracking-wider mb-1 block">SPIN TO WIN</span>
                        <div className="w-16 h-1 bg-[var(--brand-blue)] mx-auto rounded-full"></div>
                      </div>
                      
                      {/* Prize Wheel */}
                      <div className="relative w-48 h-48 mx-auto my-2">
                        {/* Wheel */}
                        <div 
                          className="absolute inset-0 rounded-full overflow-hidden transition-transform duration-3000 ease-out"
                          style={{ transform: `rotate(${wheelRotation}deg)` }}
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Prize segments */}
                            <path d="M50,50 L50,0 A50,50 0 0,1 85.4,14.6 Z" fill="#FF5252" />
                            <path d="M50,50 L85.4,14.6 A50,50 0 0,1 100,50 Z" fill="#4CAF50" />
                            <path d="M50,50 L100,50 A50,50 0 0,1 85.4,85.4 Z" fill="#2196F3" />
                            <path d="M50,50 L85.4,85.4 A50,50 0 0,1 50,100 Z" fill="#FFC107" />
                            <path d="M50,50 L50,100 A50,50 0 0,1 14.6,85.4 Z" fill="#9C27B0" />
                            <path d="M50,50 L14.6,85.4 A50,50 0 0,1 0,50 Z" fill="#FF9800" />
                            <path d="M50,50 L0,50 A50,50 0 0,1 14.6,14.6 Z" fill="#00BCD4" />
                            <path d="M50,50 L14.6,14.6 A50,50 0 0,1 50,0 Z" fill="#8BC34A" />
                            
                            {/* Prize labels */}
                            <text x="67" y="25" fontSize="4" fill="white" textAnchor="middle" transform="rotate(45 50 50)">VIP Badge</text>
                            <text x="75" y="50" fontSize="4" fill="white" textAnchor="middle" transform="rotate(90 50 50)">Gift Card</text>
                            <text x="67" y="75" fontSize="4" fill="white" textAnchor="middle" transform="rotate(135 50 50)">T-Shirt</text>
                            <text x="50" y="85" fontSize="4" fill="white" textAnchor="middle" transform="rotate(180 50 50)">Stickers</text>
                            <text x="33" y="75" fontSize="4" fill="white" textAnchor="middle" transform="rotate(225 50 50)">Mug</text>
                            <text x="25" y="50" fontSize="4" fill="white" textAnchor="middle" transform="rotate(270 50 50)">Discount</text>
                            <text x="33" y="25" fontSize="4" fill="white" textAnchor="middle" transform="rotate(315 50 50)">Pen</text>
                            <text x="50" y="15" fontSize="4" fill="white" textAnchor="middle" transform="rotate(360 50 50)">Notebook</text>
                          </svg>
                        </div>
                        
                        {/* Center pin */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-6 bg-white clip-path-triangle z-10"></div>
                        
                        {/* Center circle */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900 border-2 border-white z-10 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-[var(--brand-blue)]"></div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-xs text-center mt-2">Spinning for your prize...</p>
                    </div>
                    
                    {/* Step 4: Prize Reveal */}
                    <div className={`transition-all duration-500 ${animationStep === 3 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                      <div className="text-center py-4">
                        <div className="text-4xl mb-2">🎉</div>
                        <h3 className="text-white text-xl font-bold mb-2">Congratulations!</h3>
                        <div className="w-16 h-1 bg-[var(--brand-blue)] mx-auto rounded-full mb-4"></div>
                        
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-700">
                          <p className="text-white font-bold mb-1">You won a</p>
                          <p className="text-[var(--brand-blue)] text-xl font-bold mb-2">VIP BADGE</p>
                          <div className="text-3xl mb-1">🏆</div>
                          <p className="text-gray-400 text-xs">Visit booth #1234 to claim</p>
                        </div>
                        
                        <button className="w-full bg-[var(--brand-blue)] hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-md uppercase hover:shadow-[0_0_15px_rgba(55,119,255,0.5)] transform hover:scale-[1.02] transition-all duration-300">
                          CLAIM NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Link href="/contact" className="bg-transparent hover:bg-[var(--brand-blue)] border-2 border-[var(--brand-blue)] hover:border-transparent text-[var(--brand-blue)] hover:text-white font-bold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300">
          CREATE YOUR FORM
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      {/* Clients section */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        {/* Single row scrolling left */}
        <div className="scrolling-wrapper">
          <div className="scrolling-content-left">
            {/* First set of clients */}
            {['CES', 'E3 Expo', 'SXSW', 'Comic-Con', 'NAB Show', 'InfoComm', 'RSA Conference', 'Dreamforce', 'Adobe MAX', 'AWS re:Invent', 'Google I/O', 'Microsoft Build'].map((client, index) => (
              <div key={`client-1-${index}`} className="scrolling-item px-10 py-3 text-sm md:text-base font-medium text-gray-700">{client}</div>
            ))}
            {/* Duplicate set for seamless looping */}
            {['CES', 'E3 Expo', 'SXSW', 'Comic-Con', 'NAB Show', 'InfoComm', 'RSA Conference', 'Dreamforce', 'Adobe MAX', 'AWS re:Invent', 'Google I/O', 'Microsoft Build'].map((client, index) => (
              <div key={`client-2-${index}`} className="scrolling-item px-10 py-3 text-sm md:text-base font-medium text-gray-700">{client}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
