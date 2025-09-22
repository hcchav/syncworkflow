'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Wheel } from 'react-custom-roulette';
import '../../styles/wheel.css';

/*
 * ========================================
 * PRIZE WHEEL DOCUMENTATION
 * ========================================
 * 
 * This component implements a promotional landing page with an animated prize wheel
 * using the 'react-custom-roulette' library. Here's how the wheel system works:
 * 
 * 1. WHEEL CONFIGURATION:
 * ----------------------
 * The wheel has 8 segments (index 0-7) with the following prizes:
 * - Index 0: 'No Prize' (Red background)
 * - Index 1: 'VIP' (Green background)
 * - Index 2: 'Gift' (Blue background)
 * - Index 3: 'No Prize' (Yellow background)
 * - Index 4: '50%' (Purple background)
 * - Index 5: 'No Prize' (Orange background)
 * - Index 6: '25%' (Cyan background)
 * - Index 7: 'Free Setup' (Light Green background)
 * 
 * 2. HOW TO SPIN THE WHEEL:
 * ------------------------
 * The wheel is controlled by two main state variables:
 * - `mustStartSpinning`: Boolean that triggers the spin animation
 * - `prizeNumber`: Integer (0-7) that determines which segment the wheel lands on
 * 
 * To spin the wheel:
 * a) Set the target prize number: setPrizeNumber(targetIndex)
 * b) Start the spin: setMustStartSpinning(true)
 * c) The wheel will automatically stop on the specified prize
 * d) Reset spinning state: setMustStartSpinning(false)
 * 
 * 3. HOW TO CONTROL WHICH PRIZE THE WHEEL LANDS ON:
 * -------------------------------------------------
 * The wheel will ALWAYS land on the segment specified by `prizeNumber`.
 * This is NOT random - it's deterministic based on the prizeNumber value.
 * 
 * To make the wheel land on a specific prize:
 * - For 'No Prize' (Red): setPrizeNumber(0)
 * - For 'VIP': setPrizeNumber(1)
 * - For 'Gift': setPrizeNumber(2)
 * - For 'No Prize' (Yellow): setPrizeNumber(3)
 * - For '50%': setPrizeNumber(4)
 * - For 'No Prize' (Orange): setPrizeNumber(5)
 * - For '25%': setPrizeNumber(6)
 * - For 'Free Setup': setPrizeNumber(7)
 * 
 * 4. ANIMATION SEQUENCE:
 * ---------------------
 * The wheel is part of a larger animation sequence that includes:
 * - QR code scanning (Step 1)
 * - Form filling (Step 2)
 * - Qualification questions (Step 3)
 * - Wheel spinning (Step 4)
 * - Prize reveal (Step 5)
 * 
 * The wheel appears at animationStep 4 and spins automatically after 20 seconds
 * in the demo animation. In the current implementation, it's set to always land
 * on prize index 7 ('Free Setup') for demonstration purposes.
 * 
 * 5. CUSTOMIZING THE WHEEL:
 * -------------------------
 * To modify the wheel behavior:
 * 
 * a) Change prizes: Edit the `data` array in the Wheel component (lines 687-696)
 * b) Add randomness: Replace `const targetPrize = 7;` with `Math.floor(Math.random() * 8)`
 * c) Weight certain prizes: Use conditional logic to favor certain prize numbers
 * d) Change spin duration: Modify the `spinDuration` prop (currently 3.0 seconds)
 * e) Customize appearance: Modify colors, fonts, and styling in the data array
 * 
 * 6. IMPORTANT IMPLEMENTATION NOTES:
 * ---------------------------------
 * - The wheel uses CSS scaling (scale(0.5)) to fit in the mobile mockup
 * - Spinning state is managed with small delays to ensure clean state transitions
 * - The onStopSpinning callback is intentionally minimal to avoid state conflicts
 * - Debug information is shown in development mode to help with testing
 * 
 * 7. EXAMPLE USAGE FOR DIFFERENT SCENARIOS:
 * -----------------------------------------
 * 
 * // Always give the best prize (Free Setup):
 * setPrizeNumber(7);
 * setMustStartSpinning(true);
 * 
 * // Random prize:
 * setPrizeNumber(Math.floor(Math.random() * 8));
 * setMustStartSpinning(true);
 * 
 * // Weighted toward good prizes (avoid "No Prize" segments):
 * const goodPrizes = [1, 2, 4, 6, 7]; // VIP, Gift, 50%, 25%, Free Setup
 * setPrizeNumber(goodPrizes[Math.floor(Math.random() * goodPrizes.length)]);
 * setMustStartSpinning(true);
 * 
 * // Based on user qualification level:
 * if (selectedRole === 'Owner / Executive' && selectedTimeline === 'Actively looking now') {
 *   setPrizeNumber(7); // Give best prize to qualified leads
 * } else {
 *   setPrizeNumber(Math.floor(Math.random() * 8)); // Random for others
 * }
 * 
 * ========================================
 */

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
  const [consent, setConsent] = useState(false); // Consent for contact
  const [attemptedSubmit, setAttemptedSubmit] = useState(false); // For inline errors
  
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
  
  // WHEEL STATE VARIABLES:
  // ======================
  const [wheelRotation, setWheelRotation] = useState(0); // Not used by react-custom-roulette, kept for compatibility
  const [mustStartSpinning, setMustStartSpinning] = useState(false); // CRITICAL: Controls when wheel starts spinning
  const [prizeNumber, setPrizeNumber] = useState(0); // CRITICAL: Controls which segment (0-7) the wheel lands on
  const [showPrize, setShowPrize] = useState(false); // Controls when to show the prize reveal screen
  const [winningPrize, setWinningPrize] = useState(''); // Stores winning prize text
  
  // Prize wheel configuration - matches wheel page exactly
  const prizes = [
    // Segment 0:
    { option: 'No Prize', style: { backgroundColor: '#FF5252', textColor: '#fff' } },
    // Segment 1:
    { option: 'VIP', style: { backgroundColor: '#4CAF50', textColor: '#fff' } },
    // Segment 2:
    { option: 'Gift', style: { backgroundColor: '#2196F3', textColor: '#fff' } },
    // Segment 3:
    { option: 'No Prize', style: { backgroundColor: '#FFC107', textColor: '#000' } },
    // Segment 4:
    { option: '50%', style: { backgroundColor: '#9C27B0', textColor: '#fff' } },
    // Segment 5:
    { option: 'No Prize', style: { backgroundColor: '#FF9800', textColor: '#fff' } },
    // Segment 6:
    { option: '25%', style: { backgroundColor: '#00BCD4', textColor: '#fff' } },
    // Segment 7:
    { option: 'Free Setup', style: { backgroundColor: '#8BC34A', textColor: '#fff' } }
  ];
  // Qualify step states
  const [qualifyStep, setQualifyStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('');
  // Video state
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Pricing reveal state
  const [showAllPlans, setShowAllPlans] = useState(false);
  
  // Animation timers reference
  const animationTimers = useRef<NodeJS.Timeout[]>([]);
  
  // Use refs to store the latest version of the functions
  const startAnimationRef = useRef<() => void>();
  const resetAnimationRef = useRef<() => void>();

  // Define resetAnimation first using refs
  const resetAnimation = useCallback(() => {
    console.log('--- RESET ANIMATION ---');
    
    // Clear any pending animations first
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    
    // Reset all states
    console.log('Resetting all states...');
    setAnimationStep(0);
    setQrScanned(false);
    setNameValue('');
    setEmailValue('');
    setPhoneValue('');
    setVerificationCode(['', '', '', '', '', '']);
    setShowPrize(false);
    setWinningPrize(''); // Clear winning prize text
    setQualifyStep(0);
    setSelectedRole('');
    setSelectedTimeline('');
    
    // Reset wheel state immediately
    console.log('Resetting wheel state...');
    setWheelRotation(0);
    setPrizeNumber(0);
    
    // Reset the spinning state after a small delay to ensure clean state
    const resetTimer = setTimeout(() => {
      setMustStartSpinning(false);
      
      // Start the animation sequence after reset is complete
      const startTimer = setTimeout(() => {
        console.log('Starting new animation sequence...');
        if (startAnimationRef.current) {
          startAnimationRef.current();
        }
      }, 500);
      
      animationTimers.current.push(startTimer);
    }, 100);
    
    animationTimers.current.push(resetTimer);
  }, []);
  
  // Update the ref when resetAnimation changes
  useEffect(() => {
    resetAnimationRef.current = resetAnimation;
  }, [resetAnimation]);

  // Define startAnimation using the ref for resetAnimation
  const startAnimation = useCallback(() => {
    console.log('Starting animation sequence...');
    
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
    setWinningPrize(''); // Clear winning prize text
    setQualifyStep(0);
    setSelectedRole('');
    setSelectedTimeline('');
    
    // Step 1: Show QR scanning animation
    const qrScanTimer = setTimeout(() => {
      console.log('Step 1: QR scanning...');
      setQrScanned(true);
    }, 1000);
    animationTimers.current.push(qrScanTimer);
    
    // Step 2: Move to form after QR scan
    const moveToFormTimer = setTimeout(() => {
      console.log('Step 2: Moving to form...');
      setAnimationStep(1);
    }, 3000);
    animationTimers.current.push(moveToFormTimer);
    
    // Step 3: Type name (John Doe)
    const nameToType = 'John Doe';
    for (let i = 0; i < nameToType.length; i++) {
      const timer = setTimeout(() => {
        setNameValue(nameToType.substring(0, i + 1));
        if (i === nameToType.length - 1) {
          setTimeout(() => setNameCompleted(true), 300);
        }
      }, 100 * i + 4000);
      animationTimers.current.push(timer);
    }
    
    // Step 4: Type email (john.doe@example.com)
    const emailToType = 'john.doe@example.com';
    for (let i = 0; i < emailToType.length; i++) {
      const timer = setTimeout(() => {
        setEmailValue(emailToType.substring(0, i + 1));
        if (i === emailToType.length - 1) {
          setTimeout(() => setEmailCompleted(true), 300);
        }
      }, 100 * i + 6000);
      animationTimers.current.push(timer);
    }
    
    // Step 5: Type phone (555-123-4567)
    const phoneToType = '555-123-4567';
    for (let i = 0; i < phoneToType.length; i++) {
      const timer = setTimeout(() => {
        setPhoneValue(phoneToType.substring(0, i + 1));
        if (i === phoneToType.length - 1) {
          setTimeout(() => setPhoneCompleted(true), 300);
        }
      }, 100 * i + 8000);
      animationTimers.current.push(timer);
    }
    
    // Step 6: Submit form and move to qualify step
    const submitTimer = setTimeout(() => {
      console.log('Step 6: Submitting form...');
      setAnimationStep(2);
      setQualifyStep(1);
    }, 10000);
    animationTimers.current.push(submitTimer);
    
    // Step 7: Select role
    const roleSelectTimer = setTimeout(() => {
      console.log('Step 7: Selecting role...');
      setSelectedRole('Owner / Executive');
    }, 12000);
    animationTimers.current.push(roleSelectTimer);
    
    // Step 8: Move to company selection
    const companySelectTimer = setTimeout(() => {
      console.log('Step 8: Moving to company selection...');
      setQualifyStep(2);
    }, 14000);
    animationTimers.current.push(companySelectTimer);
    
    // Step 9: Select timeline
    const timelineSelectTimer = setTimeout(() => {
      console.log('Step 9: Selecting timeline...');
      setSelectedTimeline('Actively looking now');
    }, 16000);
    animationTimers.current.push(timelineSelectTimer);
    
    // Step 10: Show wheel
    const showWheelTimer = setTimeout(() => {
      console.log('Step 10: Showing wheel...');
      setQualifyStep(3);

      setAnimationStep(4); // Changed from 3 to 4 to match the wheel's step
    }, 18000);
    animationTimers.current.push(showWheelTimer);
    
    // Step 11: Spin wheel
    const spinWheelTimer = setTimeout(() => {
      console.log('Step 11: Spinning wheel...');
      
      /* 
       * PRIZE SELECTION LOGIC:
       * =====================
       * This is where you control which prize the wheel lands on.
       * The wheel will ALWAYS land on the segment specified by targetPrize.
       * 
       * Current implementation: Always gives 'Free Setup' (index 7) for demo
       * 
       * Alternative implementations:
       * 1. Random: Math.floor(Math.random() * 8)
       * 2. Weighted: Favor good prizes over "No Prize" segments
       * 3. Qualification-based: Give better prizes to qualified leads
       * 4. Time-based: Different prizes at different times
       */
      const targetPrize = 7; // Always 'Free Setup' for demo - change this line to modify behavior
      
      // Alternative prize selection examples (uncomment to use):
      
      // Random prize:
      // const targetPrize = Math.floor(Math.random() * 8);
      
      // Weighted toward good prizes (avoids "No Prize" segments 0, 3, 5):
      // const goodPrizes = [1, 2, 4, 6, 7]; // VIP, Gift, 50%, 25%, Free Setup
      // const targetPrize = goodPrizes[Math.floor(Math.random() * goodPrizes.length)];
      
      // Based on user qualification:
      // let targetPrize;
      // if (selectedRole === 'Owner / Executive' && selectedTimeline === 'Actively looking now') {
      //   targetPrize = 7; // Best prize for highly qualified leads
      // } else if (selectedRole === 'Manager / Director') {
      //   targetPrize = Math.random() < 0.7 ? [1, 2, 4, 6, 7][Math.floor(Math.random() * 5)] : Math.floor(Math.random() * 8);
      // } else {
      //   targetPrize = Math.floor(Math.random() * 8); // Completely random for others
      // }
      
      // Reset states before starting new spin
      setShowPrize(false);
      setMustStartSpinning(false);
      
      // Small delay to ensure state is properly reset
      const startSpinTimer = setTimeout(() => {
        console.log(`Setting prize number to ${targetPrize} and starting spin`);
        setPrizeNumber(targetPrize);
        // Add another small delay to ensure prizeNumber is set before spinning
        setTimeout(() => {
          setMustStartSpinning(true);
          console.log(`Wheel should now be spinning to prize #${targetPrize}`);
        }, 100);
      }, 100);
      
      animationTimers.current.push(startSpinTimer);
      
      // Step 12: Show prize after wheel completes spinning (3s spin + 1s buffer)
      const showPrizeTimer = setTimeout(() => {
        console.log('Step 12: Showing prize...');
        setShowPrize(true);
        setAnimationStep(5); // Ensure we're on the prize reveal step
        
        // Reset mustStartSpinning after the spin is complete
        setMustStartSpinning(false);
        
        // Step 13: Reset animation after showing prize for 5 seconds
        const resetTimer = setTimeout(() => {
          console.log('Step 13: Resetting animation...');
          if (resetAnimationRef.current) {
            resetAnimationRef.current();
          }
        }, 5000);
        animationTimers.current.push(resetTimer);
        
      }, 12000); // 3s spin + 1s buffer
      animationTimers.current.push(showPrizeTimer);
      
    }, 20000);
    animationTimers.current.push(spinWheelTimer);
    
  }, []);
  
  // Update the ref when startAnimation changes
  useEffect(() => {
    startAnimationRef.current = startAnimation;
  }, [startAnimation]);
  
  // Initialize the animation on mount
  useEffect(() => {
    if (startAnimationRef.current) {
      startAnimationRef.current();
    }
    
    // Cleanup on unmount
    return () => {
      animationTimers.current.forEach(timer => clearTimeout(timer));
      animationTimers.current = [];
    };
  }, []);

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
    setAttemptedSubmit(true);
    const nameOk = validateName(name);
    const emailOk = validateEmail(email);
    const phoneOk = phone.trim() === '' ? true : validatePhone(phone);
    const consentOk = consent;

    if (!(nameOk && emailOk && phoneOk && consentOk)) {
      return; // show inline errors
    }

    console.log('Submitted:', { email, name, company, phone, consent });
    alert('Thank you for your interest! We\'ll be in touch soon to secure your spot.');
    setEmail('');
    setName('');
    setIsNameValid(false);
    setIsEmailValid(false);
    setIsPhoneValid(false);
    setCompany('');
    setPhone('');
    setConsent(false);
    setAttemptedSubmit(false);
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

  // Validate name function
  const validateName = (value: string) => {
    const isValid = value.trim().length >= 2;
    setIsNameValid(isValid);
    return isValid;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Global lightweight animations for floating cards and gradient blobs */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-12px) translateX(4px); }
        }
        @keyframes float-rev {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .anim-float { animation: float 6s ease-in-out infinite; }
        .anim-float-slow { animation: float-slow 9s ease-in-out infinite; }
        .anim-float-rev { animation: float-rev 7s ease-in-out infinite; }
        .glass-card {
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.75);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .dark-glass {
          backdrop-filter: blur(8px);
          background: rgba(17,17,17,0.6);
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        }
        .decorated {
          position: relative;
          z-index: 1;
          color: #4b4e4e;
          display: inline-block;
        }
        .decorated::before {
          content: "";
          position: absolute;
          z-index: -1;
          left: -10px;
          top: 8px;
          right: -12px;
          bottom: -2px;
          background: #fac506;
          border-radius: 8px;
        }
      `}</style>
      
      {/* Removed navigation menu for ONE clear goal with no distractions */}
      
      {/* Hero Section - Compact Above the Fold */}
      <section className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#1e40af]">
          <div className="max-w-7xl w-full mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-6">
              
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Need More <span className="decorated text-shadow-color-white">Qualified Leads</span> at Your Next Tradeshow? 
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed select-none">
              Attendee Process → Scan, Qualify, Win, Convert.</p>
              
             
              
              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#claim-offer" 
                  onClick={openModal}
                  className="bg-[#f0d418] hover:bg-opacity-90 text-black font-bold text-xl px-8 py-4 rounded-xl transition-all transform hover:scale-105 inline-flex items-center justify-center shadow-xl"
                >
                  Sign Up - Free Setup ($500 Value)
                </a>
                <a 
                  href="#how-it-works"
                  className="bg-[#f1f1f1] hover:bg-opacity-20 text-black font-bold text-xl px-8 py-4 rounded-xl transition-all transform hover:scale-105 inline-flex items-center justify-center border border-white/20 shadow-lg"
                >
                  How It Works
                </a>
              </div>
              
              {/* Trust Callouts - Static */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8 text-sm">
                <div className="flex items-center gap-3 bg-gradient-to-r from-white/5 to-white/[0.03] backdrop-blur-sm px-5 py-3 rounded-xl border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2ecc71]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <span className="text-white/95 font-medium whitespace-nowrap">Only pay for qualified leads</span>
                </div>
                
                <div className="hidden sm:block text-white/20">•</div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-white/5 to-white/[0.03] backdrop-blur-sm px-5 py-3 rounded-xl border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2ecc71]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                  </div>
                  <span className="text-white/95 font-medium whitespace-nowrap">No credit card required</span>
                </div>
                
                <div className="hidden sm:block text-white/20">•</div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-white/5 to-white/[0.03] backdrop-blur-sm px-5 py-3 rounded-xl border border-white/5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2ecc71]/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <span className="text-white/95 font-medium whitespace-nowrap">Cancel anytime</span>
                </div>
              </div>
            </div>
          
            
            {/* Right Column - Visual with Floating Tooltips */}
            <div className="relative flex flex-col items-center justify-center min-h-[500px] w-full px-8">


              {/* Phone Device Mockup - Center */}
              <div className="device-mockup phone relative z-10">
                <div className="rounded-[40px] border border-gray-700 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] bg-[#1a1a1a] p-2 w-[280px] h-[560px] relative">
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
                            <div className="relative w-48 h-48 rounded-lg flex items-center justify-center">
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
                                    <svg className="h-4 w-4 text-[#3777ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                                    <svg className="h-4 w-4 text-[#3777ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                                    <svg className="h-4 w-4 text-[#3777ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        
                        {/* Step 3: Qualify Questions */}
                        <div className={`transition-all duration-500 ${animationStep === 2 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="mb-6 text-center">
                            <span className="text-white text-lg font-bold tracking-wider mb-1 block">QUALIFY</span>
                            <div className="w-16 h-1 bg-[#3777ff] mx-auto rounded-full"></div>
                          </div>
                          
                          <div className="space-y-6">
                            {/* Question 1: Role / Authority */}
                            {qualifyStep === 1 && (
                              <div className="space-y-3">
                                <p className="text-white text-sm font-medium">What best describes your role?</p>
                                <div className="space-y-2">
                                  <button className={`w-full p-3 rounded-lg border transition-all ${selectedRole === 'Owner / Executive' ? 'bg-[#3777ff] border-[#3777ff] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
                                    <span className="text-sm font-medium">Owner / Executive</span>
                                  </button>
                                  <button className={`w-full p-3 rounded-lg border transition-all ${selectedRole === 'Manager / Director' ? 'bg-[#3777ff] border-[#3777ff] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
                                    <span className="text-sm font-medium">Manager / Director</span>
                                  </button>
                                  <button className={`w-full p-3 rounded-lg border transition-all ${selectedRole === 'Staff / Student / Other' ? 'bg-[#3777ff] border-[#3777ff] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
                                    <span className="text-sm font-medium">Staff / Student / Other</span>
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            {/* Question 2: Buying Timeline / Intent */}
                            {qualifyStep === 2 && (
                              <div className="space-y-3">
                                <p className="text-white text-sm font-medium">Are you currently looking for solutions like ours?</p>
                                <div className="space-y-2">
                                  <button className={`w-full p-3 rounded-lg border transition-all ${selectedTimeline === 'Actively looking now' ? 'bg-[#3777ff] border-[#3777ff] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
                                    <span className="text-sm font-medium">Actively looking now</span>
                                  </button>
                                  <button className={`w-full p-3 rounded-lg border transition-all ${selectedTimeline === 'Within 6–12 months' ? 'bg-[#3777ff] border-[#3777ff] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
                                    <span className="text-sm font-medium">Within 6–12 months</span>
                                  </button>
                                  <button className={`w-full p-3 rounded-lg border transition-all ${selectedTimeline === 'Just browsing' ? 'bg-[#3777ff] border-[#3777ff] text-white' : 'bg-white/10 border-white/20 text-white'}`}>
                                    <span className="text-sm font-medium">Just browsing</span>
                                  </button>
                                </div>
                              </div>
                            )}
                            
                       
                          </div>
                        </div>
                        
                        {/* Step 4: Verification Code */}
                        <div className={`transition-all duration-500 ${animationStep === 3 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
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
                            
                          </div>
                        </div>
                        
                        {/* Step 5: Prize Wheel */}
                        <div className={`transition-all duration-500 ${animationStep === 4 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          {/* Ultra-compact Prize Wheel Layout */}
                          <div className="flex flex-col items-center mt-5" style={{ height: "350px", padding: "15px 0 0 0" }}>
                            {/* Title */}
                            <div className="text-center">
                              <span className="text-white text-lg font-bold tracking-wider block">SPIN TO WIN</span>
                              <div className="w-16 h-1 bg-[#3777ff] mx-auto rounded-full mb-2"></div>
                            </div>
                            
                            {/* Prize Wheel - React Custom Roulette with CSS Scaling */}
                            <div style={{ position: "relative", height: "180px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                              {/* Debug info */}
                              {process.env.NODE_ENV === 'development' && (
                                <div style={{ position: 'absolute', top: '-25px', left: '0', fontSize: '8px', color: 'white', zIndex: 1000 }}>
                                  Spinning: {mustStartSpinning ? 'YES' : 'NO'} | Prize: {prizeNumber}
                                </div>
                              )}
                              
                              <div style={{ 
                                width: "300px", 
                                height: "300px", 
                                transform: "scale(0.5)", // Scales wheel to 50% to fit in mobile mockup
                                transformOrigin: "center center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                              }}>
                                {/* 
                                  WHEEL COMPONENT CONFIGURATION:
                                  =============================
                                  This is the main Wheel component from 'react-custom-roulette'.
                                  
                                  Key Props:
                                  - mustStartSpinning: Controls when the wheel starts spinning
                                  - prizeNumber: Determines which segment (0-7) the wheel lands on
                                  - data: Array of 8 segments with prizes and styling
                                  - spinDuration: How long the spin animation takes (3 seconds)
                                  
                                  The wheel segments are arranged clockwise starting from the top:
                                  Index 0 (top): 'No Prize' (Red)
                                  Index 1: 'VIP' (Green) 
                                  Index 2: 'Gift' (Blue)
                                  Index 3: 'No Prize' (Yellow)
                                  Index 4: '50%' (Purple)
                                  Index 5: 'No Prize' (Orange)
                                  Index 6: '25%' (Cyan)
                                  Index 7: 'Free Setup' (Light Green)
                                */}
                                <Wheel
                                  mustStartSpinning={mustStartSpinning} // Boolean: triggers spin animation
                                  prizeNumber={prizeNumber} // Integer 0-7: determines landing segment (7 = Free Setup)
                                  data={prizes} // Array of 8 prize segments
                                  onStopSpinning={() => {
                                    console.log('Wheel stopped spinning on prize:', prizes[prizeNumber].option);
                                    setWinningPrize(prizes[prizeNumber].option);
                                    setMustStartSpinning(false); // Reset spinning state
                                    // NOTE: The main animation timer handles showing the prize after the spin completes.
                                  }}
                                  // Visual styling props:
                                  outerBorderColor="#333"      // Dark border around wheel
                                  outerBorderWidth={3}         // Border thickness
                                  innerBorderColor="#333"      // Inner border color
                                  innerBorderWidth={0}         // No inner border
                                  innerRadius={20}             // Size of center circle
                                  radiusLineColor="#ffffff"    // Color of lines between segments
                                  radiusLineWidth={2}          // Thickness of segment divider lines
                                  fontSize={24}                // Text size on segments
                                  textDistance={65}            // How far text is from center
                                  spinDuration={0.9}           // Spin animation duration in seconds
                                />
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        
                        {/* Step 6: Prize Reveal */}
                        <div className={`transition-all duration-500 ${animationStep === 5 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="text-center py-4">
                            <div className="text-4xl mb-2">🎉</div>
                            <h3 className="text-white text-xl font-bold mb-2">Congratulations!</h3>
                            <div className="w-16 h-1 bg-[#3777ff] mx-auto rounded-full mb-4"></div>
                            
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-700">
                              <p className="text-white font-bold mb-1">You won a</p>
                              <p className="text-[#3777ff] text-xl font-bold mb-2">Free Setup Package (Value $500)  </p>
                              <div className="text-3xl mb-1">🏆</div>
                              <p className="text-gray-400 text-xs">Check your email for details</p>
                            </div>
                            
                          </div>
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
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
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
          
    </div>
        {/* Create Excitement and Boost Interaction */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Create Excitement and Boost Interaction</h2>
          <p className="text-gray-600 text-lg">Turn casual visitors into excited, qualified leads with a gamified, share-worthy experience.</p>
        </div>

        {/* Video + Collage Split */}
        <div className="max-w-7xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Row 1: Image (left) */}
          <div className="relative order-1 lg:order-1">
            {/* Primary image */}
            <div className="rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-1 transition duration-300">
              <img
                src="/images/customer-qr-code.PNG"
                alt="Attendee scanning QR code at the booth"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating card: Social Buzz */}
            <div className="hidden md:block absolute -right-6 top-6 anim-float z-10">
              <div className="glass-card rounded-xl border border-white/50 shadow-lg w-[280px] overflow-hidden">
                <img
                  src="/images/instagram-comment.png"
                  alt="Customer feedback on social media"
                  className="w-full h-auto object-cover"
                />
                <div className="px-3 py-2 text-[12px] text-gray-700">Customers share their excitement online</div>
              </div>
            </div>

            {/* Floating card: Tag the Tradeshow */}
            <div className="hidden md:block absolute -left-6 -bottom-8 anim-float-rev z-10">
              <div className="glass-card rounded-xl border border-white/50 shadow-lg w-[280px] overflow-hidden">
                <img
                  src="/images/tradeshow-social-proof.png"
                  alt="Tradeshow social proof post"
                  className="w-full h-auto object-cover"
                />
                <div className="px-3 py-2 text-[12px] text-gray-700">Tag the tradeshow to drive traffic</div>
              </div>
            </div>
          </div>
            
          {/* Row 1: Text to the right of the image */}
          <div className="order-2 lg:order-2 self-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Social Buzz</h3>
            <ul className="text-gray-700 space-y-3 text-base">
              <li className="flex items-start gap-2"><span className="text-[#3777ff] mt-0.5">✓</span><span>Tag the tradeshow to drive foot traffic to your booth</span></li>
              <li className="flex items-start gap-2"><span className="text-[#3777ff] mt-0.5">✓</span><span>Showcase winners and comments to build momentum</span></li>
              <li className="flex items-start gap-2"><span className="text-[#3777ff] mt-0.5">✓</span><span>Encourage attendees to post and mention your handle</span></li>
            </ul>
          </div>

          {/* Row 2: Text to the left of the video */}
          <div className="order-3 lg:order-3 self-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">See The Flow In Action</h3>
            <ul className="text-gray-700 space-y-3 text-base">
              <li className="flex items-start gap-2"><span className="text-[#3777ff] mt-0.5">▶</span><span>Attendee scans, fills out the form, and verifies</span></li>
              <li className="flex items-start gap-2"><span className="text-[#3777ff] mt-0.5">▶</span><span>Prize wheel triggers instant rewards to drive buzz</span></li>
              <li className="flex items-start gap-2"><span className="text-[#3777ff] mt-0.5">▶</span><span>Qualified contacts sync to your CRM automatically</span></li>
            </ul>
          </div>

          {/* Row 2: Video (right) */}
          <div className="order-4 lg:order-4">
            <div className="rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
              <div className="relative">
                <video
                  ref={videoRef}
                  src="/videos/customer_prize_wheel_vertical.mp4"
                  className="w-full h-auto"
                  muted={isVideoMuted}
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                  poster="/images/customer-qr-code.PNG"
                  onClick={() => {
                    if (isVideoMuted) {
                      setIsVideoMuted(false);
                      if (videoRef.current) {
                        try { videoRef.current.muted = false; videoRef.current.play(); } catch {}
                      }
                    }
                  }}
                />
                {isVideoMuted && (
                  <button
                    aria-label="Unmute video"
                    onClick={() => {
                      setIsVideoMuted(false);
                      if (videoRef.current) {
                        try { videoRef.current.muted = false; videoRef.current.play(); } catch {}
                      }
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-medium"
                  >
                    <span className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10v4h4l5 5V5L7 10H3z"/></svg>
                      Tap to unmute
                    </span>
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-600 mt-3 text-center lg:text-left text-sm">Live customer scanning QR code and winning prizes</p>

            {/* Benefit chips */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="glass-card px-3 py-1.5 rounded-full text-sm font-medium">3× higher conversions</span>
              <span className="glass-card px-3 py-1.5 rounded-full text-sm font-medium">85% completion</span>
              <span className="glass-card px-3 py-1.5 rounded-full text-sm font-medium">92% satisfaction</span>
            </div>
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
                <div className="text-4xl font-bold text-[#3777ff] mb-2">85%</div>
                <div className="text-gray-700 font-medium">Complete Registration</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#ff6b35] mb-2">92%</div>
                <div className="text-gray-700 font-medium">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

          
          
          

          
          <div className="bg-[#f0f7ff] p-8 rounded-xl max-w-5xl mx-auto" id="pricing">
            <h3 className="text-2xl font-bold text-[#3777ff] mb-1">Simple, transparent pricing</h3>
            <p className="text-gray-700 text-sm">Starter is ideal for first-time exhibitors to validate at your next show.</p>
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 transition-all duration-300">
            {/* Simplified pricing for cold traffic */}
            {!showAllPlans ? (
              <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Starter card */}
                  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#3777ff] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-2xl font-bold text-[#3777ff] mb-2">Starter</div>
                    <div className="flex items-center mb-4">
                      <span className="text-gray-400 line-through mr-2">$700</span>
                      <span className="text-2xl font-bold">$400</span>
                      <span className="text-gray-600 ml-1">setup</span>
                    </div>
                    <div className="bg-red-100 text-red-600 text-sm font-bold py-1 px-2 rounded mb-3 inline-block">
                      $300 OFF for New Clients!
                    </div>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Branded QR forms</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>SMS & Email notifications</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Secure hosting</span></li>
                    </ul>
                    <div className="text-lg font-bold text-[#3777ff] mt-auto">
                      $5 <span className="text-sm font-normal">per attendee</span>
                    </div>
                    <button onClick={openModal} className="w-full mt-4 bg-[#3777ff] hover:bg-[#2855c5] text-white py-2 px-4 rounded-lg transition-colors duration-300">
                      Claim Offer
                    </button>
                  </div>
                  {/* Persuasion */}
                  <div className="text-left">
                    <h4 className="text-xl font-bold mb-2 text-[#3777ff]">Designed for first-time trials</h4>
                    <p className="text-gray-700 mb-3">Most exhibitors start with Starter to validate at their next show, then upgrade.</p>
                    <button
                      onClick={() => setShowAllPlans(true)}
                      className="text-sm text-[#3777ff] hover:underline inline-flex items-center gap-1"
                      aria-label="Compare all pricing plans"
                      aria-expanded={showAllPlans}
                      title="Compare all plans"
                    >
                      Compare all plans
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 7.414V17a1 1 0 11-2 0V7.414L5.707 9.707A1 1 0 114.293 8.293l5-5z" clipRule="evenodd" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Basic Plan */}
                  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#3777ff] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>SMS & Email Notifications</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Secure Hosting</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Basic Branding</span></li>
                    </ul>
                    <div className="text-lg font-bold text-[#3777ff] mt-auto">
                      $5 <span className="text-sm font-normal">per attendee</span>
                    </div>
                    <button onClick={openModal} className="w-full mt-4 bg-[#3777ff] hover:bg-[#2855c5] text-white py-2 px-4 rounded-lg transition-colors duration-300">Claim Offer</button>
                  </div>
                  
                  {/* Pro Plan */}
                  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#3777ff] transform md:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute -top-3 right-4 bg-[#3777ff] text-xs text-white font-bold py-1 px-2 rounded-full">POPULAR</div>
                    <div className="text-2xl font-bold text-[#3777ff] mb-2">Pro</div>
                    <div className="flex items-center mb-4">
                      <span className="text-gray-400 line-through mr-2">$900</span>
                      <span className="text-2xl font-bold">$600</span>
                      <span className="text-gray-600 ml-1">setup</span>
                    </div>
                    <div className="bg-red-100 text-red-600 text-sm font-bold py-1 px-2 rounded mb-3 inline-block">$300 OFF for New Clients!</div>
                    <div className="text-lg font-semibold mb-2">Everything in Basic plus:</div>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Custom Domain</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Prize Tool</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Lead Scoring</span></li>
                    </ul>
                    <div className="text-lg font-bold text-[#3777ff] mt-auto">$4 <span className="text-sm font-normal">per attendee</span></div>
                    <button onClick={openModal} className="w-full mt-4 bg-[#3777ff] hover:bg-[#2855c5] text-white py-2 px-4 rounded-lg transition-colors duration-300">Claim Offer</button>
                  </div>
                  
                  {/* Custom Plan */}
                  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-2xl font-bold text-[#3777ff] mb-2">Custom</div>
                    <div className="flex items-center mb-4"><span className="text-2xl font-bold">Custom</span><span className="text-gray-600 ml-1">quote</span></div>
                    <div className="text-lg font-semibold mb-2">Tailored solution with:</div>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Custom Features</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>API Integrations</span></li>
                      <li className="flex items-start"><svg className="h-5 w-5 text-[#3777ff] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Priority Support</span></li>
                    </ul>
                    <div className="text-lg font-bold text-[#3777ff] mt-auto">Custom <span className="text-sm font-normal">pricing</span></div>
                    <button onClick={openModal} className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">Contact Us</button>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button onClick={() => setShowAllPlans(false)} className="text-sm text-[#3777ff] hover:underline" aria-label="Back to Starter plan" aria-expanded={showAllPlans}>Back to Starter</button>
                </div>
              </>
            )}
            <div className="mt-6 text-sm text-[#3777ff] text-center">*Limited to the first {spotsLeft} spots remaining. Offer valid until July 31, 2025.</div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {attemptedSubmit && !isNameValid && (
                    <p className="mt-1 text-xs text-red-600">Please enter your full name (2+ characters).</p>
                  )}
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {attemptedSubmit && !isEmailValid && (
                    <p className="mt-1 text-xs text-red-600">Please enter a valid email address.</p>
                  )}
                </div>
                <div className="text-left">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your company"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3777ff] text-gray-900"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="text-left relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
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
                    />
                    {isPhoneValid && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {attemptedSubmit && phone.trim() !== '' && !isPhoneValid && (
                    <p className="mt-1 text-xs text-red-600">Please enter a valid phone number (digits, spaces, dashes, parentheses).</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-4 text-left">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-[#3777ff] border-gray-300 rounded"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I agree to be contacted about this offer and understand I can opt out anytime.
                </label>
              </div>
              {attemptedSubmit && !consent && (
                <p className="-mt-3 mb-3 text-xs text-red-600 text-left">Please provide consent to be contacted.</p>
              )}
              
              <button
                type="submit"
                className="w-full bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105"
              >
                SECURE YOUR SPOT NOW
              </button>
              
              <p className="mt-4 text-sm text-gray-500">
                We’ll never share your information. Secure & compliant. By submitting, you agree to our terms and privacy policy.
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
