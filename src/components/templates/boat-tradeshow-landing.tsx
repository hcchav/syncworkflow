'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import Hotjar, { fireHotjarEvent } from '@/components/analytics/Hotjar';
import Script from 'next/script';
import { 
  CheckCircle, 
  Target, 
  BarChart3, 
  TrendingUp, 
  X, 
  Check, 
  QrCode, 
  HelpCircle, 
  Phone, 
  Zap, 
  MessageCircle,
  Play,
  Users,
  Award,
  Shield
} from 'lucide-react';

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

  // Phone animation states
  const [animationStep, setAnimationStep] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [nameCompleted, setNameCompleted] = useState(false);
  const [emailCompleted, setEmailCompleted] = useState(false);
  const [phoneCompleted, setPhoneCompleted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [registrationExtended, setRegistrationExtended] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('Actively looking now');
  const [selectedSolution, setSelectedSolution] = useState('');
  const [qualifyStep, setQualifyStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(5); // Always land on 'Free Setup' (yellow segment)
  const [winningPrize, setWinningPrize] = useState('');
  const [pixiWheelLoaded, setPixiWheelLoaded] = useState(false);
  const pixiWheelRef = React.useRef<any>(null);

  const currentYear = new Date().getFullYear();
  
  // Enhanced prize wheel data with modern colors and gradients
  const wheelData = [
    { option: 'No Prize', style: { backgroundColor: '#e2e8f0', textColor: '#475569' } },
    { option: 'VIP Access', style: { backgroundColor: '#7c3aed', textColor: 'white' } },
    { option: 'Gift Card', style: { backgroundColor: '#1e293b', textColor: 'white' } },
    { option: '25% Off', style: { backgroundColor: '#f1f5f9', textColor: '#334155' } },
    { option: '50% Off', style: { backgroundColor: '#059669', textColor: 'white' } },
    { option: 'Free Setup', style: { backgroundColor: '#FFDC35', textColor: '#1e293b' } },
    { option: '$100 Off', style: { backgroundColor: '#dc2626', textColor: 'white' } },
    { option: 'Free Setup', style: { backgroundColor: '#FFDC35', textColor: '#1e293b' } },
  ];

  // Convert wheelData to PixiJS format
  const pixiSegments = wheelData.map(item => ({
    label: item.option,
    bg: item.style.backgroundColor,
    text: item.style.textColor
  }));

  // Typing animation function
  const typeText = (text: string, setValue: (value: string) => void, setCompleted: (completed: boolean) => void, delay = 100) => {
    return new Promise<void>((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        setValue(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          setCompleted(true);
          setTimeout(resolve, 300); // Small delay before next field
        }
      }, delay);
    });
  };

  // Simplified typing sequence
  const startTypingSequence = () => {
    console.log('startTypingSequence called');
    setIsTyping(true);
    
    // Type name first
    let nameIndex = 0;
    const nameText = 'John Anderson';
    const nameInterval = setInterval(() => {
      setNameValue(nameText.slice(0, nameIndex + 1));
      nameIndex++;
      if (nameIndex >= nameText.length) {
        clearInterval(nameInterval);
        setNameCompleted(true);
        console.log('Name completed');
        
        // Start email after delay
        setTimeout(() => {
          let emailIndex = 0;
          const emailText = 'john.anderson@email.com';
          const emailInterval = setInterval(() => {
            setEmailValue(emailText.slice(0, emailIndex + 1));
            emailIndex++;
            if (emailIndex >= emailText.length) {
              clearInterval(emailInterval);
              setEmailCompleted(true);
              console.log('Email completed');
              
              // Start phone after delay
              setTimeout(() => {
                let phoneIndex = 0;
                const phoneText = '(555) 123-4567';
                const phoneInterval = setInterval(() => {
                  setPhoneValue(phoneText.slice(0, phoneIndex + 1));
                  phoneIndex++;
                  if (phoneIndex >= phoneText.length) {
                    clearInterval(phoneInterval);
                    setPhoneCompleted(true);
                    setIsTyping(false);
                    console.log('Phone completed - all typing done');
                  }
                }, 100);
              }, 300);
            }
          }, 60);
        }, 300);
      }
    }, 80);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  // Typing animation when registration step is active
  useEffect(() => {
    if (animationStep === 1) {
      console.log('Registration step active - starting typing');
      
      // Reset form
      setNameValue('');
      setEmailValue('');
      setPhoneValue('');
      setNameCompleted(false);
      setEmailCompleted(false);
      setPhoneCompleted(false);
      setIsTyping(true);
      
      // Type name
      setTimeout(() => {
        let nameIndex = 0;
        const nameText = 'John Doe';
        const nameInterval = setInterval(() => {
          console.log('Typing name:', nameIndex, nameText.slice(0, nameIndex + 1));
          setNameValue(nameText.slice(0, nameIndex + 1));
          nameIndex++;
          if (nameIndex > nameText.length) {
            clearInterval(nameInterval);
            setNameCompleted(true);
            console.log('Name complete');
            
            // Type email
            setTimeout(() => {
              let emailIndex = 0;
              const emailText = 'john@email.com';
              const emailInterval = setInterval(() => {
                console.log('Typing email:', emailIndex, emailText.slice(0, emailIndex + 1));
                setEmailValue(emailText.slice(0, emailIndex + 1));
                emailIndex++;
                if (emailIndex > emailText.length) {
                  clearInterval(emailInterval);
                  setEmailCompleted(true);
                  console.log('Email complete');
                  
                  // Type phone
                  setTimeout(() => {
                    let phoneIndex = 0;
                    const phoneText = '(555) 123-4567';
                    const phoneInterval = setInterval(() => {
                      console.log('Typing phone:', phoneIndex, phoneText.slice(0, phoneIndex + 1));
                      setPhoneValue(phoneText.slice(0, phoneIndex + 1));
                      phoneIndex++;
                      if (phoneIndex > phoneText.length) {
                        clearInterval(phoneInterval);
                        setPhoneCompleted(true);
                        setIsTyping(false);
                        console.log('All typing complete');
                      }
                    }, 80);
                  }, 300);
                }
              }, 60);
            }, 300);
          }
        }, 80);
      }, 500);
    }
  }, [animationStep]);

  // Debug qualifyStep changes
  useEffect(() => {
    console.log('QualifyStep changed to:', qualifyStep, 'at animationStep:', animationStep);
  }, [qualifyStep, animationStep]);

  // Verification code animation - one digit at a time
  useEffect(() => {
    if (animationStep === 3) {
      console.log('Verification step active - starting digit entry');
      
      // Reset verification code
      setVerificationCode(['', '', '', '', '', '']);
      
      // Enter digits one by one with delays
      const digits = ['1', '2', '3', '4', '5', '6'];
      
      digits.forEach((digit, index) => {
        setTimeout(() => {
          console.log(`Entering digit ${index + 1}: ${digit}`);
          setVerificationCode(prev => {
            const newCode = [...prev];
            newCode[index] = digit;
            return newCode;
          });
        }, 800 + (index * 400)); // Start after 800ms, then 400ms between each digit
      });
    }
  }, [animationStep]);

  // Prize wheel spinning animation
  useEffect(() => {
    if (animationStep === 4 && pixiWheelLoaded && pixiWheelRef.current) {
      console.log('Prize wheel step active - starting spin');
      
      // Reset wheel state
      setWinningPrize('');
      
      // Start spinning after a delay
      setTimeout(() => {
        console.log('Spinning PixiJS wheel to prize:', wheelData[prizeNumber].option);
        pixiWheelRef.current.setAttribute('target-prize', wheelData[prizeNumber].option);
        pixiWheelRef.current.spin();
      }, 500);
    }
  }, [animationStep, pixiWheelLoaded]);

  // Setup PixiJS wheel event listeners
  useEffect(() => {
    if (pixiWheelLoaded && pixiWheelRef.current) {
      const wheel = pixiWheelRef.current;
      wheel.segments = pixiSegments;

      const handleSpinEnd = (e: any) => {
        console.log('Wheel stopped spinning on prize:', e.detail.prize);
        setWinningPrize(e.detail.prize);
      };

      wheel.addEventListener('spinend', handleSpinEnd);
      return () => wheel.removeEventListener('spinend', handleSpinEnd);
    }
  }, [pixiWheelLoaded, pixiSegments]);

  // Step functions with proper timer management
  const runQRStep = useCallback(() => {
    console.log('Running QR Step');
    setAnimationStep(0);
    setQrScanned(false);
    
    // QR scan animation
    setTimeout(() => setQrScanned(true), 1500);
    
    // Move to next step - this should be the LAST thing in the function
    setTimeout(() => runRegistrationStep(), 5000);
  }, []);

  const runRegistrationStep = useCallback(() => {
    console.log('Running Registration Step');
    setAnimationStep(1);
    if (!registrationExtended) {
      setRegistrationExtended(true);
    }
    
    // Move to next step - this should be the LAST thing in the function
    setTimeout(() => runQualificationStep(), 6000);
  }, [registrationExtended]);

  const runQualificationStep = useCallback(() => {
    console.log('Running Qualification Step');
    setAnimationStep(2);
    setQualifyStep(1);
    setSelectedRole('');
    setSelectedSolution('');
    
    // Role auto-selection timer
    setTimeout(() => {
      console.log('Auto-selecting role');
      setSelectedRole('Owner / Executive');
      
      // Wait 2 seconds to show the selection, then move to next question
      setTimeout(() => {
        console.log('Moving to solution question');
        setQualifyStep(2);
      }, 2000);
    }, 1000);
    
    // Solution auto-selection timer - wait 1 second after solution question appears
    setTimeout(() => {
      console.log('Auto-selecting solution');
      setSelectedSolution('Actively looking now');
    }, 4000);
    
    // Move to next step - this should be the LAST thing in the function
    setTimeout(() => runVerificationStep(), 6000);
  }, []);

  const runVerificationStep = useCallback(() => {
    console.log('Running Verification Step');
    setAnimationStep(3);
    
    // Move to next step - this should be the LAST thing in the function
    setTimeout(() => runPrizeWheelStep(), 5000);
  }, []);

  const runPrizeWheelStep = useCallback(() => {
    console.log('Running Prize Wheel Step');
    setAnimationStep(4);
    
    // Move to next step - this should be the LAST thing in the function
    setTimeout(() => runCongratulationsStep(), 12000);
  }, []);

  const runCongratulationsStep = useCallback(() => {
    console.log('Running Congratulations Step');
    setAnimationStep(5);
    
    // Reset and restart - this should be the LAST thing in the function
    setTimeout(() => {
      console.log('Resetting animation...');
      setQrScanned(false);
      setNameValue('');
      setEmailValue('');
      setPhoneValue('');
      setNameCompleted(false);
      setEmailCompleted(false);
      setPhoneCompleted(false);
      setSelectedRole('');
      setSelectedSolution('');
      setSelectedTimeline('Actively looking now');
      setQualifyStep(1);
      setVerificationCode(['', '', '', '', '', '']);
      setMustSpin(false);
      setWinningPrize('');
      setIsTyping(false);
      setRegistrationExtended(false);
      
      // Restart animation
      setTimeout(() => runQRStep(), 2000);
    }, 4000);
  }, []);

  // Start animation on mount
  useEffect(() => {
    runQRStep();
  }, [runQRStep]);


  const handleCTAClick = (location: string) => {
    fireHotjarEvent(`cta_clicked_${location}`);
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoClick = (location: string) => {
    fireHotjarEvent(`video_clicked_${location}`);
    setShowVideo(true);
  };

  const onSubmit = async (data: LeadFormData) => {
    try {
      console.log('Form submitted:', data);
      fireHotjarEvent('form_submitted');
      setIsSubmitted(true);
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
    <>
      {/* Load PixiJS from CDN */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.min.js"
        strategy="beforeInteractive"
      />
      
      {/* Load PixiJS Wheel Component */}
      <Script 
        src="/wheel-pixi.js"
        onLoad={() => setPixiWheelLoaded(true)}
        strategy="afterInteractive"
      />
      
      <div className="min-h-screen bg-white">
        <Hotjar />
      
      {/* Top Navigation Bar */}
      <nav className="bg-[#171717] text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-center sm:gap-4">
          <span className="text-center text-white text-md font-medium font-[600]">
            Turn Boat Show Visitors into Leads Instantly
          </span>
          <button
            onClick={() => handleCTAClick('topbar')}
            className="w-full rounded bg-[#FFDC35] px-5 py-2 text-sm font-semibold text-[#171717] transition-colors hover:bg-yellow-400 sm:w-auto"
          >
            Try It Now
          </button>
        </div>
      </nav>
      
      {/* Hero Section - Evoto Style */}
      <section className="relative bg-gradient-to-br from-[#FFDC35] via-[#FFE55C] to-[#FFF2A1] overflow-hidden h-[500px] flex items-center">
        {/* Decorative curved elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 border-2 border-white/20 rounded-full"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-60 h-60 border border-white/10 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-[#171717] mb-6 leading-tight">
            Boat Show Lead Capture
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-[#171717]/80 mb-8 font-medium">
            3X More Qualified Leads with QR Codes + Prize Spin
            </p>
            
            {/* Trust Signal */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-green-500 rounded-sm mr-1 flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                ))}
              </div>
              <span className="text-[#171717]/70 text-sm font-medium ml-2">
                Rated by <span className="font-bold">Trustpilot</span>
              </span>
            </div>
            
            {/* Primary CTA */}
            <div className="mb-12">
              <button 
                onClick={() => handleCTAClick('hero')}
                className="bg-[#171717] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#2a2a2a] transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                Get Started Today
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 text-[#171717]/60 text-sm">
              <span>✓ No Credit Card Required</span>
              <span>✓ Custom Setup</span>
              <span>✓ Proven at SuperZoo 2025</span>
            </div>
          </div>
        </div>
        
        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 fill-white">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Secondary Hero Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#171717] mb-6">
              Let Us Do the Heavy Lead Qualification for You
            </h2>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['QR Scan', 'Verify Contact', 'Qualify Leads', 'Gamify Experience', 'Auto-Export'].map((feature, index) => (
              <div key={index} className="px-6 py-3 bg-gray-100 rounded-full text-[#171717] font-medium hover:bg-gray-200 transition-colors">
                {feature}
              </div>
            ))}
          </div>
          
          {/* Phone Demo Section */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center">
              {/* Phone Device Mockup */}
              <div className="device-mockup phone relative z-10">
                <div className="rounded-[40px] border border-gray-700 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] bg-[#1a1a1a] p-2 w-[280px] h-[560px] relative">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[24px] bg-black rounded-b-[12px] z-50"></div>
                  
                  <div className="bg-white rounded-[42px] w-full h-full overflow-hidden relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    </div>
                    
                    {/* Top UI */}
                    <div className="absolute top-0 left-0 right-0 z-40 pt-8 pb-4 px-4">
                      <div className="flex justify-end items-center">
                      </div>
                    </div>
                    
                    {/* Step Titles - Fixed Positon */}
                    <div className="absolute top-14 left-0 right-0 z-50">
                      {/* Single title container - all titles in same position */}
                      <div className="text-center">
                        <div className="relative h-8">
                          <span className={`absolute inset-0 text-[#171717] text-xl font-bold tracking-wider transition-opacity duration-500 ${animationStep === 0 ? 'opacity-100' : 'opacity-0'}`}>SCAN QR CODE</span>
                          <span className={`absolute inset-0 text-[#171717] text-xl font-bold tracking-wider transition-opacity duration-500 ${animationStep === 1 ? 'opacity-100' : 'opacity-0'}`}>REGISTER</span>
                          <span className={`absolute inset-0 text-[#171717] text-xl font-bold tracking-wider transition-opacity duration-500 ${animationStep === 2 ? 'opacity-100' : 'opacity-0'}`}>QUALIFY</span>
                          <span className={`absolute inset-0 text-[#171717] text-xl font-bold tracking-wider transition-opacity duration-500 ${animationStep === 3 ? 'opacity-100' : 'opacity-0'}`}>VERIFY</span>
                          <span className={`absolute inset-0 text-xl font-bold tracking-wider transition-opacity duration-500 gradient-text ${animationStep === 4 ? 'opacity-100' : 'opacity-0'}`}>SPIN TO WIN</span>
                          <span className={`absolute inset-0 text-[#171717] text-xl font-bold tracking-wider transition-opacity duration-500 ${animationStep === 5 ? 'opacity-100' : 'opacity-0'}`}>CONGRATULATIONS!</span>
                        </div>
                        <div className="w-20 h-1 bg-[#FFDC35] mx-auto rounded-full mt-2"></div>
                      </div>
                    </div>
                    
                    {/* Phone UI Content */}
                    <div className="form-ui absolute inset-0 pt-36 p-4 z-30">
                      <div className="w-full max-w-[220px] mx-auto relative">
                        
                        {/* Step 1: QR Code Scanning */}
                        <div className={`transition-all duration-500 ${animationStep === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="flex flex-col items-center justify-center h-full">
                            {/* QR Code scanning frame */}
                            <div className="relative w-48 h-48 rounded-lg flex items-center justify-center">
                              {/* Corner markers */}
                              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FFDC35]"></div>
                              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FFDC35]"></div>
                              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FFDC35]"></div>
                              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FFDC35]"></div>
                              
                              {/* Scanning animation */}
                              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFDC35] opacity-80 scan-line"></div>
                              
                              {/* QR Code placeholder */}
                              <div className={`transition-opacity duration-500 ${qrScanned ? 'opacity-40' : 'opacity-100'}`}>
                                <div className="w-36 h-36 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                                  <QrCode className="w-24 h-24 text-[#171717]" />
                                </div>
                              </div>
                              
                            </div>
                            
                            <p className="text-gray-600 text-sm mt-4 text-center">
                              {qrScanned ? 'QR Code Scanned Successfully!' : 'Position QR Code in Frame'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Step 2: Registration Form */}
                        <div className={`transition-all duration-500 ${animationStep === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="pt-2 pb-4">
                          
                          <div className="space-y-6 px-2">
                            {/* Name Field */}
                            <div className="space-y-3">
                              <label className="text-[#171717] text-sm font-medium block flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#FFDC35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Full Name
                              </label>
                              <div className="relative group">
                                <div className={`bg-gray-50 rounded-xl p-4 border-2 transition-all duration-300 ${
                                  nameCompleted 
                                    ? 'border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                    : 'border-gray-200 group-hover:border-[#FFDC35]/50'
                                } relative overflow-hidden`}>
                                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  <p className="text-[#171717] text-sm font-medium relative z-10 min-h-[20px]">
                                    {nameValue}
                                    {isTyping && !nameCompleted && <span className="animate-pulse ml-1">|</span>}
                                    {!nameValue && !isTyping && <span className="text-gray-400">|</span>}
                                  </p>
                                  {nameCompleted && (
                                    <div className="absolute right-4 top-4 transition-all duration-500 scale-0 animate-[scale-in_0.3s_ease-out_forwards]">
                                      <div className="bg-[#FFDC35] rounded-full p-1.5 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-[#171717]" />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Email Field */}
                            <div className="space-y-3">
                              <label className="text-[#171717] text-sm font-medium block flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#FFDC35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Email Address
                              </label>
                              <div className="relative group">
                                <div className={`bg-gray-50 rounded-xl p-4 border-2 transition-all duration-300 ${
                                  emailCompleted 
                                    ? 'border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                    : 'border-gray-200 group-hover:border-[#FFDC35]/50'
                                } relative overflow-hidden`}>
                                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  <p className="text-[#171717] text-sm font-medium relative z-10 break-all min-h-[20px]">
                                    {emailValue}
                                    {isTyping && !emailCompleted && nameCompleted && <span className="animate-pulse ml-1">|</span>}
                                    {!emailValue && !isTyping && <span className="text-gray-400">|</span>}
                                  </p>
                                  {emailCompleted && (
                                    <div className="absolute right-4 top-4 transition-all duration-500 scale-0 animate-[scale-in_0.3s_ease-out_forwards]">
                                      <div className="bg-[#FFDC35] rounded-full p-1.5 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-[#171717]" />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Phone Field */}
                            <div className="space-y-3">
                              <label className="text-[#171717] text-sm font-medium block flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#FFDC35]" />
                                Phone Number
                                <span className="text-gray-500 text-xs">(Optional)</span>
                              </label>
                              <div className="relative group">
                                <div className={`bg-gray-50 rounded-xl p-4 border-2 transition-all duration-300 ${
                                  phoneCompleted 
                                    ? 'border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                    : 'border-gray-200 group-hover:border-[#FFDC35]/50'
                                } relative overflow-hidden`}>
                                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  <p className="text-[#171717] text-sm font-medium relative z-10 min-h-[20px]">
                                    {phoneValue}
                                    {isTyping && !phoneCompleted && emailCompleted && <span className="animate-pulse ml-1">|</span>}
                                    {!phoneValue && !isTyping && <span className="text-gray-400">|</span>}
                                  </p>
                                  {phoneCompleted && (
                                    <div className="absolute right-4 top-4 transition-all duration-500 scale-0 animate-[scale-in_0.3s_ease-out_forwards]">
                                      <div className="bg-[#FFDC35] rounded-full p-1.5 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-[#171717]" />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          </div>
                        </div>
                        
                        {/* Step 3: Qualification Questions */}
                        <div className={`transition-all duration-500 ${animationStep === 2 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="pt-2 pb-4">
                          
                          <div className="space-y-6 px-2">
                            {qualifyStep === 1 && (
                              <div className="space-y-3">
                                <label className="text-[#171717] text-sm font-medium block flex items-center gap-2">
                                  <svg className="w-4 h-4 text-[#FFDC35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                  </svg>
                                  What best describes your role?
                                </label>
                                <div className="space-y-3">
                                  <div className="relative group">
                                    <div className={`rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                                      selectedRole === 'Owner / Executive' 
                                        ? 'bg-[#FFDC35] border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                        : 'bg-gray-50 border-gray-200 group-hover:border-[#FFDC35]/50'
                                    } relative overflow-hidden`}>
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      <p className="text-[#171717] text-sm font-medium relative z-10">Owner / Executive</p>
                                    </div>
                                  </div>
                                  
                                  <div className="relative group">
                                    <div className={`rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                                      selectedRole === 'Manager / Director' 
                                        ? 'bg-[#FFDC35] border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                        : 'bg-gray-50 border-gray-200 group-hover:border-[#FFDC35]/50'
                                    } relative overflow-hidden`}>
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      <p className="text-[#171717] text-sm font-medium relative z-10">Manager / Director</p>
                                    </div>
                                  </div>
                                  
                                  <div className="relative group">
                                    <div className={`rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                                      selectedRole === 'Staff / Student / Other' 
                                        ? 'bg-[#FFDC35] border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                        : 'bg-gray-50 border-gray-200 group-hover:border-[#FFDC35]/50'
                                    } relative overflow-hidden`}>
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      <p className="text-[#171717] text-sm font-medium relative z-10">Staff / Student / Other</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {qualifyStep === 2 && (
                              <div className="space-y-3">
                                <label className="text-[#171717] text-sm font-medium block flex items-center gap-2">
                                  <svg className="w-4 h-4 text-[#FFDC35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                  Are you currently looking for solutions like ours?
                                </label>
                                <div className="space-y-3">
                                  <div className="relative group" onClick={() => setSelectedSolution('Actively looking now')}>
                                    <div className={`rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                                      selectedSolution === 'Actively looking now' 
                                        ? 'bg-[#FFDC35] border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                        : 'bg-gray-50 border-gray-200 group-hover:border-[#FFDC35]/50'
                                    } relative overflow-hidden`}>
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      <p className="text-[#171717] text-sm font-medium relative z-10">Actively looking now</p>
                                    </div>
                                  </div>
                                  
                                  <div className="relative group" onClick={() => setSelectedSolution('Within 6-12 months')}>
                                    <div className={`rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                                      selectedSolution === 'Within 6-12 months' 
                                        ? 'bg-[#FFDC35] border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                        : 'bg-gray-50 border-gray-200 group-hover:border-[#FFDC35]/50'
                                    } relative overflow-hidden`}>
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      <p className="text-[#171717] text-sm font-medium relative z-10">Within 6-12 months</p>
                                    </div>
                                  </div>
                                  
                                  <div className="relative group" onClick={() => setSelectedSolution('Just browsing')}>
                                    <div className={`rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                                      selectedSolution === 'Just browsing' 
                                        ? 'bg-[#FFDC35] border-[#FFDC35] shadow-[0_0_20px_rgba(255,220,53,0.3)]' 
                                        : 'bg-gray-50 border-gray-200 group-hover:border-[#FFDC35]/50'
                                    } relative overflow-hidden`}>
                                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFDC35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      <p className="text-[#171717] text-sm font-medium relative z-10">Just browsing</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          </div>
                        </div>
                        
                        {/* Step 4: Verification Code */}
                        <div className={`transition-all duration-500 ${animationStep === 3 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="space-y-4 text-center">
                            <p className="text-gray-600 text-sm text-center">Enter the 6-digit code sent to your phone</p>
                            
                            <div className="flex justify-between gap-1">
                              {verificationCode.map((digit, index) => (
                                <div key={index} className="w-8 h-10 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
                                  <span className="text-[#171717] font-medium">{digit}</span>
                                </div>
                              ))}
                            </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 5: Prize Wheel */}
                        <div className={`transition-all duration-500  ${animationStep === 4 ? 'opacity-100 ' : 'opacity-0 absolute pointer-events-none  '}`} 
                            style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                          <div className="flex flex-col items-center h-full">
                            
                            <div className="space-y-4 text-center">
                              {/* Floating celebration particles */}
                              {winningPrize && (
                                <>
                                  <div className="absolute top-2 left-10 w-1.5 h-1.5 bg-[#FFDC35] rounded-full floating-particle" style={{ animationDelay: '0s' }}></div>
                                  <div className="absolute top-8 right-12 w-1 h-1 bg-[#059669] rounded-full floating-particle" style={{ animationDelay: '0.5s' }}></div>
                                  <div className="absolute bottom-8 left-16 w-2 h-2 bg-[#7c3aed] rounded-full floating-particle" style={{ animationDelay: '1s' }}></div>
                                  <div className="absolute bottom-2 right-8 w-1 h-1 bg-[#dc2626] rounded-full floating-particle" style={{ animationDelay: '1.5s' }}></div>
                                  <div className="absolute top-1/3 left-8 w-1 h-1 bg-[#FFDC35] rounded-full floating-particle" style={{ animationDelay: '2s' }}></div>
                                  <div className="absolute top-1/2 right-6 w-1.5 h-1.5 bg-[#059669] rounded-full floating-particle" style={{ animationDelay: '2.5s' }}></div>
                                </>
                              )}
                              
                              <div style={{ position: "absolute", left: "50%", top: 50, transform: "translate(-50%, -50%) scale(0.34)" }} 
                                    className={winningPrize ? 'wheel-celebrate' : ''}>
                                {pixiWheelLoaded ? (
                                  <lucky-wheel-pixi
                                    ref={pixiWheelRef}
                                    spin-duration="3000"
                                    target-prize="random"
                                    style={{ width: '240px', height: '240px', maxWidth: '240px', maxHeight: '240px' }}
                                  />
                                ) : (
                                  <div style={{ width: '240px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 6: Prize Reveal */}
                        <div className={`transition-all duration-500 ${animationStep === 5 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="text-center">
                            <div className="text-4xl mb-4">🎉</div>
                            
                            <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-gray-200 shadow-lg">
                              <p className="text-[#171717] font-bold mb-1">You won a</p>
                              <p className="text-[#FFDC35] text-xl font-bold mb-2">Free Setup Package (Value $500)</p>
                              <div className="text-3xl mb-1">🏆</div>
                              <p className="text-gray-600 text-xs">Check your email for details</p>
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
        </div>
      </section>

      {/* II. Social Proof Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#171717] mb-2">
              Trusted by Exhibitors Who Want Results, Not Piles of Business Cards
            </h2>
            <p className="text-gray-600">Here's why exhibitors trust us at major shows:</p>
          </div>

          {/* Video Left, Case Study + Stats Right */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Portrait Video */}
              <div className="lg:order-1">
                {!showVideo ? (
                  <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl">
                      <div
                        className="absolute inset-0 flex cursor-pointer items-center justify-center group"
                        onClick={() => handleVideoClick('social_proof')}
                      >
                        <div className="text-center">
                          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#171717] shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2a2a2a]">
                            <Play className="ml-1 h-8 w-8 text-white" />
                          </div>
                          <p className="text-xl font-bold text-[#171717] mb-2">Watch Demo Video</p>
                          <p className="text-gray-600">See SuperZoo results in action</p>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 rounded-full bg-[#FFDC35] px-3 py-1 text-sm font-bold text-[#171717]">
                        2 min
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-xl">
                      <video className="absolute inset-0 h-full w-full object-cover" controls autoPlay>
                        <source src="/videos/customer_prize_wheel_vertical.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Case Study + Stats */}
              <div className="lg:order-2 space-y-6">
                {/* Case Study Highlight */}
                <div className="bg-gradient-to-r from-[#FFDC35]/5 to-[#FFDC35]/10 rounded-2xl p-6 lg:p-8 border border-gray-100">
                  <div className="inline-flex items-center px-3 py-1 bg-[#FFDC35]/20 text-[#171717] rounded-full text-sm font-semibold mb-4 gap-2">
                    <BarChart3 className="w-4 h-4" />
                    CASE STUDY HIGHLIGHT
                  </div>
                  <p className="text-lg lg:text-xl font-bold text-[#171717] leading-tight">
                    At SuperZoo 2025, we helped a client 3X their qualified leads with a branded Spin-to-Win booth setup.
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-green-600 mb-1">73%</div>
                      <p className="text-gray-700 font-medium">More engagement vs. traditional raffles</p>
                      <p className="text-sm text-gray-500">Gamified booths attract crowds</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-[#FFDC35]/20 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-[#FFDC35]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-[#FFDC35] mb-1">40%</div>
                      <p className="text-gray-700 font-medium">Increase in lead quality</p>
                      <p className="text-sm text-gray-500">When validation steps are added</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            
          {/* Bottom Context */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              And this is just one example — see how we can do the same at your next boat show.
            </p>
          </div>
        </div>
      </section>

      {/* III. Value Proposition Section */}
      <section id="value-prop" className="relative py-16 lg:py-20 bg-gradient-to-br from-[#FFDC35] via-[#FFE55C] to-[#FFF2A1] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 border-2 border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#171717] mb-6">
              Why Choose SyncWorkflow
            </h2>
            <p className="text-xl text-[#171717]/80 max-w-3xl mx-auto">
              Stop wasting money on unqualified leads. Get only verified, interested prospects.
            </p>
          </div>

          {/* Enhanced Comparison Table */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
              <div className="grid lg:grid-cols-2">
                {/* Traditional Column */}
                <div className="p-8 lg:p-12 bg-white border-r border-gray-200/50">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#FFDC35]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-[#FFDC35]" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#171717]">Traditional Methods</h3>
                    <p className="text-gray-600 mt-2">Outdated & Ineffective</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-[#FFDC35]/20 rounded-full flex items-center justify-center mt-1">
                        <X className="w-4 h-4 text-[#FFDC35]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Business Card Bowls</p>
                        <p className="text-gray-600 text-sm">Random, unqualified contacts</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-[#FFDC35]/20 rounded-full flex items-center justify-center mt-1">
                        <X className="w-4 h-4 text-[#FFDC35]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Badge Scanners</p>
                        <p className="text-gray-600 text-sm">Too broad, no qualification</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-[#FFDC35]/20 rounded-full flex items-center justify-center mt-1">
                        <X className="w-4 h-4 text-[#FFDC35]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Low Engagement</p>
                        <p className="text-gray-600 text-sm">Boring booth experience</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-[#FFDC35]/20 rounded-full flex items-center justify-center mt-1">
                        <X className="w-4 h-4 text-[#FFDC35]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Wasted Budget</p>
                        <p className="text-gray-600 text-sm">Pay for junk leads</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SyncWorkflow Column */}
                <div className="p-8 lg:p-12 bg-white">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#171717]">SyncWorkflow</h3>
                    <p className="text-gray-600 mt-2">Smart & Results-Driven</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Verified Contacts</p>
                        <p className="text-gray-600 text-sm">Phone & email validation required</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Smart Qualification</p>
                        <p className="text-gray-600 text-sm">2 targeted questions filter quality</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Crowd Magnet</p>
                        <p className="text-gray-600 text-sm">Gamified experience creates buzz</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Pay Per Result</p>
                        <p className="text-gray-600 text-sm">Only $2 per qualified lead</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom CTA Bar */}
              <div className="bg-[#171717] p-6 text-center">
                <p className="text-white text-lg font-semibold mb-4">
                  Ready to 3X your qualified leads like our SuperZoo client?
                </p>
                <button 
                  onClick={() => handleCTAClick('comparison')}
                  className="bg-[#FFDC35] text-[#171717] px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started Free
                </button>
              </div>
            </div>
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
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-gray-300">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-[#171717] mb-2">$2</div>
                <p className="text-xl text-gray-600">per qualified lead</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Complete setup & training included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Custom branded forms & follow-up</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Real-time lead delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
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


      {/* Final CTA with Form */}
      <section id="lead-form" className="relative py-16 lg:py-24 bg-gradient-to-br from-[#FFDC35] via-[#FFE55C] to-[#FFF2A1] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 border-2 border-white/20 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#171717] mb-4">
                Ready to Transform Your Boat Show Results?
              </h2>
              <p className="text-xl text-[#171717]/80">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDC35] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDC35] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDC35] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDC35] focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFDC35] focus:border-transparent"
                    placeholder="Tell us about your goals or any specific requirements..."
                  />
                  {errors.notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 bg-[#171717] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Book My Demo'}
                </button>
              </form>
            )}
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
                  onClick={() => {
                    fireHotjarEvent(`faq_clicked_${faq.id}`);
                    setOpenFAQ(openFAQ === faq.id ? null : faq.id);
                  }}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform text-[#FFDC35] ${
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

      {/* Simple Footer */}
      <footer className="bg-[#171717] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {currentYear} SyncWorkflow. All rights reserved. | Turning trade show traffic into qualified leads.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
