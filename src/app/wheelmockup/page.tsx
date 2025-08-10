"use client";

import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import MonitorMockup from '@/components/MonitorMockup';
import '../../styles/customwheel.css';
import '../../styles/monitormockup.css';

export default function WheelMockupPage() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  const [winningPrize, setWinningPrize] = useState('');

  const prizes = [
    { option: 'FREE SWAG', style: { fontSize: 20 } },
    { option: '10% OFF', style: { fontSize: 20 } },
    { option: 'FREE TRIAL', style: { fontSize: 18 } },
    { option: 'NO PRIZE', style: { fontSize: 20 } },
    { option: '$100 CREDIT', style: { fontSize: 18 } },
    { option: 'FREE DEMO', style: { fontSize: 20 } },
    { option: '25% OFF', style: { fontSize: 20 } },
    { option: 'MYSTERY GIFT', style: { fontSize: 16 } },
  ];

  const handleSpinClick = () => {
    if (wheelRotation > 0) return;
    
    // Generate random prize
    const newPrizeNumber = Math.floor(Math.random() * prizes.length);
    setPrizeNumber(newPrizeNumber);
    
    // Start spinning
    setWheelRotation(prev => prev + 1);
    setMustSpin(true);
    setShowPrize(false);
  };

  const wheelComponent = (
    <div className="wheel-page">
      <h1>SPIN TO WIN</h1>
      
      <div className="wheel-container">
        <div style={{ position: "relative", height: "350px", width: "100%" }}>
          <div className="wheel-glow-wrapper" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(0.65)" }}>
            <Wheel
              mustStartSpinning={wheelRotation > 0}
              prizeNumber={prizeNumber}
              data={prizes}
              spinDuration={0.8}
              outerBorderColor="#222222"
              outerBorderWidth={5}
              innerBorderColor="#222222"
              innerBorderWidth={5}
              innerRadius={15}
              radiusLineColor="#333"
              radiusLineWidth={2}
              fontSize={28}
              textDistance={60}
              backgroundColors={['#ffffff']}
              perpendicularText={false}
              fontWeight={700}
              onStopSpinning={() => {
                setWinningPrize(prizes[prizeNumber].option);
                setTimeout(() => setShowPrize(true), 500);
              }}
            />
          </div>
        </div>
        
        <button 
          className="spin-button" 
          onClick={handleSpinClick}
          disabled={wheelRotation > 0 && !showPrize}
        >
          {wheelRotation > 0 && !showPrize ? "SPINNING..." : "SPIN"}
        </button>
      </div>
      
      {showPrize && (
        <div className="prize-notification animate-fadeIn">
          <h2>Congratulations!</h2>
          <p>You won: <strong>{winningPrize}</strong></p>
        </div>
      )}
    </div>
  );

  return (
    <div className="mockup-container">
      <h1>Wheel Monitor Mockups</h1>
      
      <MonitorMockup orientation="landscape" title="Landscape Mode">
        {wheelComponent}
      </MonitorMockup>
      
      <MonitorMockup orientation="portrait" title="Portrait Mode">
        {wheelComponent}
      </MonitorMockup>
    </div>
  );
}
