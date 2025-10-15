'use client';

import React, { useRef, useEffect, useState } from 'react';
import Script from 'next/script';

export default function WebComponentTest() {
  const wheelRef = useRef<any>(null);
  const [webComponentLoaded, setWebComponentLoaded] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetPrize, setTargetPrize] = useState('random');

  // Prize segments
  const prizes = [
    { label: "Coffee", bg: "#F5C451", text: "#111" },
    { label: "Try Again", bg: "#E6E6E6", text: "#222" },
    { label: "T-Shirt", bg: "#FF7B8B", text: "#fff" },
    { label: "Free Mug", bg: "#67D6CD", text: "#073B3A" },
    { label: "25% Off", bg: "#59B6E6", text: "#072B42" },
    { label: "Gift Card", bg: "#9BD7C2", text: "#072B3A" }
  ];

  useEffect(() => {
    if (webComponentLoaded && wheelRef.current) {
      const wheel = wheelRef.current;
      wheel.segments = prizes;

      const handleSpinEnd = (e: any) => {
        setIsSpinning(false);
        setLastResult(e.detail);
      };

      wheel.addEventListener('spinend', handleSpinEnd);
      return () => wheel.removeEventListener('spinend', handleSpinEnd);
    }
  }, [webComponentLoaded]);

  const handleSpin = async () => {
    if (!wheelRef.current || isSpinning) return;
    setIsSpinning(true);
    setLastResult(null);
    
    if (targetPrize === 'random') {
      await wheelRef.current.spin();
    } else {
      await wheelRef.current.spin({ targetLabel: targetPrize });
    }
  };

  const testTargeting = async () => {
    if (!wheelRef.current || isSpinning) return;
    
    console.log('🧪 Starting targeting test...');
    let successCount = 0;
    const totalTests = prizes.length;
    
    for (let i = 0; i < totalTests; i++) {
      const targetPrize = prizes[i].label;
      console.log(`🎯 Test ${i + 1}/${totalTests}: Targeting "${targetPrize}"`);
      
      setIsSpinning(true);
      setTargetPrize(targetPrize);
      setLastResult(null);
      
      try {
        const result = await wheelRef.current.spin({ targetLabel: targetPrize });
        const success = result.prize === targetPrize;
        
        if (success) {
          successCount++;
          console.log(`✅ SUCCESS: Landed on "${result.prize}"`);
        } else {
          console.log(`❌ FAILED: Expected "${targetPrize}", got "${result.prize}"`);
        }
        
        setLastResult(result);
        setIsSpinning(false);
        
        // Wait a bit between tests
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error in test ${i + 1}:`, error);
        setIsSpinning(false);
      }
    }
    
    const accuracy = (successCount / totalTests * 100).toFixed(1);
    console.log(`🏁 Test Complete: ${successCount}/${totalTests} successful (${accuracy}% accuracy)`);
    
    setTargetPrize('random');
  };

  return (
    <>
      <Script 
        src="/wheel.js" 
        onLoad={() => setWebComponentLoaded(true)}
      />
      
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🎯 Simple Wheel Test
            </h1>
            <p className="text-gray-600">
              Just the wheel, prizes, and target selection
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Wheel */}
            <div className="text-center mb-8">
              {webComponentLoaded ? (
                <lucky-wheel
                  ref={wheelRef}
                  skin="wood"
                  theme="light"
                  spin-duration="3000"
                  easing="easeOutCubic"
                  min-rotations="3"
                  style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '600px' }}
                />
              ) : (
                <div className="flex items-center justify-center aspect-square max-w-md bg-gray-100 rounded-full mx-auto">
                  <p className="text-gray-600">Loading...</p>
                </div>
              )}
            </div>

            {/* Target Selection */}
            <div className="max-w-md mx-auto mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Prize:
              </label>
              <select
                value={targetPrize}
                onChange={(e) => setTargetPrize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="random">🎲 Random</option>
                {prizes.map((prize) => (
                  <option key={prize.label} value={prize.label}>
                    {prize.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Spin Button */}
            <div className="text-center mb-6 space-y-3">
              <button
                onClick={handleSpin}
                disabled={!webComponentLoaded || isSpinning}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg block w-full sm:w-auto mx-auto"
              >
                {isSpinning ? '🔄 Spinning...' : '🎯 Spin Wheel'}
              </button>
              
              <button
                onClick={testTargeting}
                disabled={!webComponentLoaded || isSpinning}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm block w-full sm:w-auto mx-auto"
              >
                🧪 Test All Targets
              </button>
            </div>

            {/* Result */}
            {lastResult && (
              <div className="max-w-md mx-auto p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <h3 className="font-semibold text-green-800 mb-1">🏆 Winner!</h3>
                <p className="text-green-700 text-lg">
                  <strong>{lastResult.prize}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
