'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Wheel } from 'react-custom-roulette';
import '../../styles/wheel.css';

/*
 * ========================================
 * PRIZE WHEEL PAGE DOCUMENTATION
 * ========================================
 * 
 * This page implements a standalone prize wheel using the 'react-custom-roulette' npm package.
 * The wheel is configured to ALWAYS land on "Free Setup" for demonstration purposes.
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
 * - Index 7: 'Free Setup' (Light Green background) ← TARGET PRIZE
 * 
 * 2. HOW TO CONTROL WHICH PRIZE THE WHEEL LANDS ON:
 * -------------------------------------------------
 * The wheel will ALWAYS land on the segment specified by `prizeNumber`.
 * To make it land on "Free Setup": setPrizeNumber(7)
 * 
 * Current implementation: Always lands on index 7 (Free Setup)
 * 
 * 3. HOW THE SPINNING WORKS:
 * -------------------------
 * - `mustStartSpinning`: Boolean that triggers the spin animation
 * - `prizeNumber`: Integer (0-7) that determines landing segment
 * - `spinDuration`: How long the spin takes (currently 2.5 seconds)
 * 
 * 4. STATE MANAGEMENT:
 * -------------------
 * - `mustStartSpinning`: Controls spin trigger
 * - `prizeNumber`: Controls landing position (set to 7 for Free Setup)
 * - `showPrize`: Controls prize reveal overlay
 * - `winningPrize`: Stores the winning prize text for display
 * 
 * 5. CUSTOMIZATION OPTIONS:
 * ------------------------
 * To change behavior:
 * - Random: setPrizeNumber(Math.floor(Math.random() * 8))
 * - Specific prize: setPrizeNumber(desiredIndex)
 * - Weighted: Use conditional logic to favor certain prizes
 * 
 * ========================================
 */

export default function WheelPage() {
  // WHEEL STATE VARIABLES FOR REACT-CUSTOM-ROULETTE:
  // ================================================
  const [mustStartSpinning, setMustStartSpinning] = useState(false); // Controls when wheel starts spinning
  const [showPrize, setShowPrize] = useState(false); // Controls prize reveal overlay
  const [prizeNumber, setPrizeNumber] = useState(7); // CRITICAL: Set to 7 to always land on "Free Setup"
  const [winningPrize, setWinningPrize] = useState(''); // Stores winning prize text
  
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
  
  const handleSpinClick = () => {
    if (!mustStartSpinning) {
      /*
       * PRIZE SELECTION LOGIC:
       * =====================
       * Currently set to ALWAYS land on "Free Setup" (index 7)
       * 
       * To change this behavior, modify the setPrizeNumber call:
       * - Random: setPrizeNumber(Math.floor(Math.random() * prizes.length))
       * - Specific prize: setPrizeNumber(desiredIndex)
       * - Weighted: Use conditional logic to favor certain prizes
       */
      setPrizeNumber(7); // Always land on "Free Setup" (index 7)
      
      // Alternative implementations (uncomment to use):
      // const randomPrize = Math.floor(Math.random() * prizes.length); // Random
      // setPrizeNumber(randomPrize);
      
      setMustStartSpinning(true); // Start the spin animation
      setShowPrize(false); // Hide any existing prize display
    }
  };
  
  const resetWheel = () => {
    setMustStartSpinning(false); // Stop spinning state
    setShowPrize(false); // Hide prize overlay
    setWinningPrize(''); // Clear winning prize text
    setPrizeNumber(7); // Reset to Free Setup for next spin
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Spin <span className="text-[#3777FF]">The Wheel</span>
        </h1>
        <p className="text-gray-300 text-xl">Try your luck and win exciting prizes!</p>
      </div>
      
      {/* Phone mockup container */}
      <div className="relative w-[320px] h-[600px] bg-black rounded-[36px] overflow-hidden border-4 border-gray-800 shadow-2xl">
        {/* Status bar */}
        <div className="flex justify-between items-center px-6 py-2 bg-black text-white">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-[#0bfe88] mr-1"></span>
            <span className="text-xs">LIVE</span>
          </div>
          <span className="text-sm font-medium">
            <span className="text-white">Sync</span><span className="text-[#3777FF]">Workflow</span>
          </span>
        </div>
        
        {/* Prize Wheel Layout */}
        <div className="flex flex-col items-center mt-8" style={{ height: "450px", padding: "15px 0 0 0" }}>
          {/* Title */}
          <div className="text-center">
            <span className="text-white text-2xl font-bold tracking-wider block">SPIN TO WIN</span>
            <div className="w-20 h-1 bg-[#3777FF] mx-auto rounded-full mb-4"></div>
          </div>
          
          {/* Prize Wheel */}
          <div style={{ position: "relative", height: "350px", width: "100%" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(0.65)" }}>
              {/* 
                REACT-CUSTOM-ROULETTE WHEEL COMPONENT:
                =====================================
                This uses the official npm package 'react-custom-roulette'
                
                Key Props:
                - mustStartSpinning: Boolean to trigger spin (controlled by button)
                - prizeNumber: Index (0-7) determining landing segment (set to 7 for Free Setup)
                - data: Array of 8 prize segments with styling
                - spinDuration: Animation duration (0.9 seconds)
                
                The wheel will ALWAYS land on the segment specified by prizeNumber.
                Current setting: prizeNumber = 7 (Free Setup)
              */}
              <Wheel
                mustStartSpinning={mustStartSpinning} // Boolean: triggers spin animation
                prizeNumber={prizeNumber} // Integer 0-7: determines landing segment (7 = Free Setup)
                data={prizes} // Array of 8 prize segments
                spinDuration={0.9} // Spin animation duration in seconds
                outerBorderColor="#333" // Dark border around wheel
                outerBorderWidth={3} // Border thickness
                innerBorderColor="#333" // Inner border color
                innerBorderWidth={0} // No inner border
                innerRadius={20} // Size of center circle
                radiusLineColor="#ffffff" // Color of lines between segments
                radiusLineWidth={2} // Thickness of segment divider lines
                fontSize={24} // Text size on segments
                textDistance={65} // How far text is from center
                onStopSpinning={() => {
                  console.log('Wheel stopped spinning on prize:', prizes[prizeNumber].option);
                  setWinningPrize(prizes[prizeNumber].option);
                  setMustStartSpinning(false); // Reset spinning state
                  setTimeout(() => setShowPrize(true), 500); // Show prize after delay
                }}
              />
            </div>
          </div>
          
          {/* Button at bottom */}
          <div className="text-center mt-4">
            <button 
              onClick={handleSpinClick}
              disabled={mustStartSpinning} // Disable while spinning
              className={`mb-2 bg-[#0bfe88] text-black font-bold py-3 px-10 rounded-md uppercase hover:bg-opacity-90 transition-all duration-300 ${mustStartSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(11,254,136,0.5)] transform hover:scale-105'}`}
            >
              {mustStartSpinning ? 'SPINNING...' : 'SPIN'}
            </button>
          </div>
        </div>
        
        {/* Prize notification overlay */}
        {showPrize && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 max-w-[80%] border border-gray-700 transform animate-fadeIn">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-white text-xl font-bold mb-2">Congratulations!</h3>
              <div className="w-16 h-1 bg-[#3777FF] mx-auto rounded-full mb-4"></div>
              
              <p className="text-white font-bold mb-1">You won a</p>
              <p className="text-[#0bfe88] text-2xl font-bold mb-2">{winningPrize}</p>
              {winningPrize === 'Free Setup' && <p className="text-gray-300 text-sm mb-2">(Value $500)</p>}
              <div className="text-3xl mb-1">🏆</div>
              <p className="text-gray-400 text-xs mb-4">Check your email for details</p>
              
              <button 
                onClick={resetWheel}
                className="bg-[#3777FF] hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-md uppercase hover:shadow-[0_0_15px_rgba(55,119,255,0.5)] transform hover:scale-[1.02] transition-all duration-300"
              >
                SPIN AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Back to promotional page link */}
      <div className="mt-8 text-center">
        <Link 
          href="/"
          className="text-[#3777FF] hover:text-[#0bfe88] transition-colors duration-300"
        >
          ← Back to main page
        </Link>
      </div>
    </div>
  );
}
