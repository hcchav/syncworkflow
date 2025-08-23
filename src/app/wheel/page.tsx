'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CustomWheel } from '../../components/ui/CustomWheel';
import '../../styles/wheel.css';

export default function WheelPage() {
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(1);
  const [winningPrize, setWinningPrize] = useState('');
  
  const prizes = [
    { option: 'Notebook', style: { backgroundColor: '#FF5252', textColor: 'white' } },
    { option: 'VIP Badge', style: { backgroundColor: '#4CAF50', textColor: 'white' } },
    { option: 'Gift Card', style: { backgroundColor: '#2196F3', textColor: 'white' } },
    { option: 'T-Shirt', style: { backgroundColor: '#FFC107', textColor: 'white' } },
    { option: 'Stickers', style: { backgroundColor: '#9C27B0', textColor: 'white' } },
    { option: 'Mug', style: { backgroundColor: '#FF9800', textColor: 'white' } },
    { option: 'Discount', style: { backgroundColor: '#00BCD4', textColor: 'white' } },
    { option: 'Pen', style: { backgroundColor: '#8BC34A', textColor: 'white' } }
  ];
  
  const handleSpinClick = () => {
    if (wheelRotation === 0) {
      // Generate random prize number (0-7)
      const randomPrize = Math.floor(Math.random() * prizes.length);
      setPrizeNumber(randomPrize);
      setWheelRotation(1);
      setShowPrize(false);
    }
  };
  
  const resetWheel = () => {
    setWheelRotation(0);
    setShowPrize(false);
    setWinningPrize('');
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
              <CustomWheel
                mustStartSpinning={wheelRotation > 0}
                prizeNumber={prizeNumber}
                data={prizes}
                spinDuration={0.8}
                outerBorderColor="#333"
                outerBorderWidth={1}
                innerBorderColor="#333"
                innerBorderWidth={3}
                innerRadius={15}
                radiusLineColor=""
                radiusLineWidth={1}
                fontSize={28}
                textDistance={60}
                fontWeight={700}
                onStopSpinning={() => {
                  setWinningPrize(prizes[prizeNumber].option);
                  setTimeout(() => setShowPrize(true), 500);
                }}
              />
            </div>
          </div>
          
          {/* Button at bottom */}
          <div className="text-center mt-4">
            <button 
              onClick={handleSpinClick}
              disabled={wheelRotation > 0}
              className={`mb-2 bg-[#0bfe88] text-black font-bold py-3 px-10 rounded-md uppercase hover:bg-opacity-90 transition-all duration-300 ${wheelRotation > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(11,254,136,0.5)] transform hover:scale-105'}`}
            >
              {wheelRotation > 0 ? 'SPINNING...' : 'SPIN'}
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
