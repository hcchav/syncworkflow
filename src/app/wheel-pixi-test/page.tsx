'use client';

import { useEffect, useRef, useState } from 'react';

export default function WheelPixiTest() {
  const wheelRef = useRef<any>(null);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const prizes = [
    { label: '$100 Cash', bg: '#e74c3c', text: '#ffffff' },
    { label: '50% Off', bg: '#3498db', text: '#ffffff' },
    { label: 'Free Item', bg: '#2ecc71', text: '#ffffff' },
    { label: 'Gift Card', bg: '#9b59b6', text: '#ffffff' },
    { label: '$50 Cash', bg: '#f39c12', text: '#ffffff' },
    { label: '25% Off', bg: '#1abc9c', text: '#ffffff' },
    { label: 'Try Again', bg: '#95a5a6', text: '#ffffff' },
    { label: 'Free Ship', bg: '#e67e22', text: '#ffffff' },
  ];

  useEffect(() => {
    // Load PixiJS from CDN
    const loadPixiJS = () => {
      return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined' && (window as any).PIXI) {
          resolve((window as any).PIXI);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.min.js';
        script.onload = () => resolve((window as any).PIXI);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load the Pixi wheel component
    const loadComponent = async () => {
      try {
        // First load PixiJS
        await loadPixiJS();
        
        // Then load the wheel component
        const script = document.createElement('script');
        script.src = '/wheel-pixi.js';
        script.onload = () => setComponentLoaded(true);
        script.onerror = (error) => console.error('Failed to load Pixi wheel component:', error);
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
    wheelRef.current.spin();
  };

  const handleTargetSpin = (prizeLabel: string) => {
    if (!wheelRef.current || isSpinning) return;
    setIsSpinning(true);
    wheelRef.current.setAttribute('target-prize', prizeLabel);
    wheelRef.current.spin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-6xl">🎡</span>
            PixiJS Wheel
          </h1>
          <p className="text-xl text-blue-200">
            High-performance 2D WebGL wheel with glow effects
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {!componentLoaded ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
              <p className="text-white mt-4">Loading PixiJS Wheel...</p>
            </div>
          ) : (
            <lucky-wheel-pixi
              ref={wheelRef}
              spin-duration="3000"
              target-prize="random"
            />
          )}

          {lastResult && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-center animate-bounce">
              <p className="text-2xl font-bold text-white">
                🎉 You won: {lastResult.prize}!
              </p>
            </div>
          )}

          {/* Target Prize Buttons */}
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 text-center">🎯 Target Specific Prize</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {prizes.map((prize, index) => (
                <button
                  key={index}
                  onClick={() => handleTargetSpin(prize.label)}
                  disabled={isSpinning}
                  className="px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: prize.bg,
                    boxShadow: `0 4px 15px ${prize.bg}40`
                  }}
                >
                  {prize.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-blue-200 mt-4 text-center">
              Click any prize to guarantee landing on it
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-bold mb-2">⚡ WebGL Powered</h3>
            <p className="text-sm text-blue-200">Hardware-accelerated 2D graphics with PixiJS</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-bold mb-2">✨ Glow Effects</h3>
            <p className="text-sm text-blue-200">Built-in filters for beautiful glowing segments</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-bold mb-2">🎨 Smooth Animation</h3>
            <p className="text-sm text-blue-200">60fps breathing and shimmer effects</p>
          </div>
        </div>
      </div>
    </div>
  );
}
