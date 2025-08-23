'use client';

import { useState } from 'react';
import { CustomWheel } from '../../components/ui/CustomWheel';
import '../../styles/wheel.css';

export default function WheelTest() {
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showPrize, setShowPrize] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Phone mockup container */}
      <div className="relative w-[280px] h-[560px] bg-black rounded-[36px] overflow-hidden border-4 border-gray-800 shadow-xl">
        {/* Status bar */}
        <div className="flex justify-between items-center px-6 py-2 bg-black text-white">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
            <span className="text-xs">LIVE</span>
          </div>
          <span className="text-sm font-medium">SyncWorkflow</span>
        </div>
        
        {/* Ultra-compact Prize Wheel Layout */}
        <div className="flex flex-col items-center mt-8" style={{ height: "400px", padding: "15px 0 0 0" }}>
          {/* Title */}
          <div className="text-center">
            <span className="text-white text-lg font-bold tracking-wider block">SPIN TO WIN</span>
            <div className="w-16 h-1 bg-[#3777FF] mx-auto rounded-full mb-2"></div>
          </div>
          
          {/* Prize Wheel - Minimal spacing */}
          <div style={{ position: "relative", height: "350px", width: "100%" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(0.55)" }}>
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
                fontSize={28}
                textDistance={60}
                backgroundColors={['#ffffff']}
                perpendicularText={false}
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
              className={`mb-2 bg-[#3777FF] text-white font-bold py-1 px-6 rounded-md uppercase hover:bg-opacity-90 transition-all duration-300 ${wheelRotation > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(55,119,255,0.5)]'}`}
            >
              {wheelRotation > 0 ? 'SPINNING...' : 'SPIN'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Controls outside the phone mockup */}
      <div className="fixed bottom-4 left-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-white font-bold mb-2">Layout Controls</h3>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setWheelRotation(0)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Reset Wheel
          </button>
          <button 
            onClick={() => setShowPrize(false)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Hide Prize
          </button>
        </div>
      </div>
    </div>
  );
}
