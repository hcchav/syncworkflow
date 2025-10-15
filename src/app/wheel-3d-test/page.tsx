'use client';
import React, { useRef, useState, useEffect } from 'react';

export default function Wheel3DTest() {
  const wheelRef = useRef<any>(null);
  const [componentLoaded, setComponentLoaded] = useState(false);
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
    // Load Three.js from CDN
    const loadThreeJS = () => {
      return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined' && (window as any).THREE) {
          resolve((window as any).THREE);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
        script.onload = () => resolve((window as any).THREE);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load the 3D wheel component
    const loadComponent = async () => {
      try {
        // First load Three.js
        await loadThreeJS();
        
        // Then load the wheel component
        const script = document.createElement('script');
        script.src = '/wheel-3d.js';
        script.onload = () => setComponentLoaded(true);
        script.onerror = (error) => console.error('Failed to load 3D wheel component:', error);
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load dependencies:', error);
      }
    };

    loadComponent();
  }, []);

  useEffect(() => {
    if (componentLoaded && wheelRef.current) {
      const wheel = wheelRef.current;
      wheel.segments = prizes;

      const handleSpinEnd = (e: any) => {
        setIsSpinning(false);
        setLastResult(e.detail);
      };

      wheel.addEventListener('spinend', handleSpinEnd);
      return () => wheel.removeEventListener('spinend', handleSpinEnd);
    }
  }, [componentLoaded]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚢 3D Ship's Wheel
          </h1>
          <p className="text-gray-600">
            Realistic Three.js wooden wheel with 3D graphics
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* 3D Wheel */}
          <div className="text-center mb-8">
            {componentLoaded ? (
              <lucky-wheel-3d
                ref={wheelRef}
                spin-duration="3000"
                min-rotations="3"
                style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '600px' }}
              />
            ) : (
              <div className="flex items-center justify-center aspect-square max-w-2xl bg-gray-100 rounded-lg mx-auto">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading 3D Wheel...</p>
                </div>
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
          <div className="text-center mb-6">
            <button
              onClick={handleSpin}
              disabled={!componentLoaded || isSpinning}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              {isSpinning ? '🔄 Spinning...' : '🎯 Spin Wheel'}
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

          {/* Features */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">✨ 3D Features:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Realistic 3D wooden rim</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Dynamic lighting & shadows</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>8 wooden spokes</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Brass center hub</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Smooth 3D rotation</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Hardware accelerated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
