'use client';

import React, { useRef, useState, useEffect } from 'react';
import { WheelSpin, WheelSpinRef, WheelConfig } from '@/components/wheel';

const demoSegments = [
  { label: 'Coffee', color: '#FFDC35', payload: { type: 'beverage', value: 'coffee' } },
  { label: 'Sticker Pack', color: '#03c4eb', payload: { type: 'merchandise', value: 'stickers' } },
  { label: '10% Off', color: '#f4f4f4', payload: { type: 'discount', value: 0.1 } },
  { label: 'Try Again', color: '#ffffff', payload: { type: 'retry', value: null } },
  { label: 'T-Shirt', color: '#ff6b6b', payload: { type: 'merchandise', value: 'tshirt' } },
  { label: 'Free Mug', color: '#4ecdc4', payload: { type: 'merchandise', value: 'mug' } },
  { label: '25% Off', color: '#45b7d1', payload: { type: 'discount', value: 0.25 } },
  { label: 'Gift Card', color: '#96ceb4', payload: { type: 'giftcard', value: 50 } },
];

// Simplified responsive wheel size function
const getWheelSize = () => {
  if (typeof window === 'undefined') return 300; // SSR fallback
  const screenWidth = window.innerWidth;
  
  // Simple responsive sizing without complex calculations
  if (screenWidth < 331) {
    return 170; // Small mobile screens
  }
  if (screenWidth < 342) {
    return 180; // Small mobile screens
  }
  if (screenWidth < 359) {
    return 190; // Small mobile screens
  }
  if (screenWidth < 470) {
    return 200; // Small mobile screens
  }
  if (screenWidth < 768) {
    return 320; // Large mobile/small tablets
  }
  if (screenWidth < 1024) {
    return 400; // Tablets
  }
  return 480; // Desktop
};

// Calculate container size to accommodate handles
const getContainerSize = (wheelSize: number) => {
  // Based on actual handle positioning in woodHelm.tsx:
  // Left handle: x = centerX - radius - handleLength (starts at this position)
  // Right handle: x = centerX + radius, width = handleLength (extends to centerX + radius + handleLength)
  // Total width from leftmost to rightmost point:
  // From (centerX - radius - handleLength) to (centerX + radius + handleLength)
  // = 2 * (radius + handleLength)
  
  const radius = wheelSize / 2;
  const handleLength = radius * 0.42; // handleLengthFactor = 0.42
  const strokeWidth = 2; // Handle stroke width
  const padding = 30; // Padding for safety and visual spacing
  
  // Total width needed = 2 * (radius + handleLength) + strokeWidth + padding
  const totalWidth = 2 * (radius + handleLength) + strokeWidth + padding;
  
  // For height, top and bottom handles extend the same way
  const totalHeight = 2 * (radius + handleLength) + strokeWidth + padding;
  
  // Use the larger dimension for square container
  const containerSize = Math.max(totalWidth, totalHeight);
  
  return Math.ceil(containerSize);
};

const baseConfig: WheelConfig = {
  size: getWheelSize(),
  pointer: 'top',
  spin: {
    duration: 4.2,
    easing: 'power4.out',
    extraSpins: [5, 7],
  },
  selection: {
    seed: null, // Random by default
    noRepeatUntilExhausted: false,
  },
  segments: demoSegments,
  skin: {
    name: 'wood-helm',
    style: 'wood',
    showHelm: true,
    handleWidthFactor: 0.12,
    handleLengthFactor: 0.42,
    ringOuterWidthFactor: 0.08,
    ringInnerWidthFactor: 0.05,
    separator: { stroke: '#555', strokeWidth: 2, dashed: false },
    hub: { show: true, fill: '#ffe08a', stroke: '#7a5a1a' },
    effects: {
      dropShadow: true,
      glow: false,
    },
  },
};

export default function WheelDemo() {
  const wheelRef = useRef<WheelSpinRef>(null);
  const [config, setConfig] = useState<WheelConfig>(baseConfig);
  const [result, setResult] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [wheelSize, setWheelSize] = useState(() => {
    const initialSize = getWheelSize();
    console.log('Initial wheel size:', initialSize);
    return initialSize;
  });
  const [containerSize, setContainerSize] = useState(() => {
    const initialWheelSize = getWheelSize();
    const initialContainerSize = getContainerSize(initialWheelSize);
    console.log('Initial container size:', initialContainerSize, 'for wheel:', initialWheelSize);
    return initialContainerSize;
  });

  // Handle window resize for responsive wheel sizing
  useEffect(() => {
    const handleResize = () => {
      const newSize = getWheelSize();
      const newContainerSize = getContainerSize(newSize);
      console.log('Resize triggered:', { 
        screenWidth: window.innerWidth, 
        newWheelSize: newSize, 
        newContainerSize: newContainerSize,
        currentWheelSize: wheelSize,
        currentContainerSize: containerSize
      });
      
      // Only update if sizes actually changed
      if (newSize !== wheelSize || newContainerSize !== containerSize) {
        setWheelSize(newSize);
        setContainerSize(newContainerSize);
        setConfig(prev => ({ ...prev, size: newSize }));
      }
    };

    // Add debouncing to prevent too many updates
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, [wheelSize, containerSize]);

  const handleResult = (res: any) => {
    setResult(res);
    setIsSpinning(false);
    setHistory(prev => [res, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const spin = async () => {
    if (isSpinning) return;
    
    // Check if wheel is ready
    if (!wheelRef.current?.isReady?.()) {
      console.log('Wheel not ready, resetting...');
      wheelRef.current?.reset?.();
      // Wait a bit for reset
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsSpinning(true);
    setResult(null);
    try {
      const result = await wheelRef.current?.spin();
      if (result) {
        handleResult(result);
      }
    } catch (error) {
      console.error('Spin failed:', error);
      setIsSpinning(false);
    }
  };

  const spinToTarget = async (targetLabel: string) => {
    if (isSpinning) return;
    
    // Check if wheel is ready
    if (!wheelRef.current?.isReady?.()) {
      console.log('Wheel not ready, resetting...');
      wheelRef.current?.reset?.();
      // Wait a bit for reset
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsSpinning(true);
    setResult(null);
    try {
      const result = await wheelRef.current?.spin({ targetLabel });
      if (result) {
        handleResult(result);
      }
    } catch (error) {
      console.error('Spin failed:', error);
      setIsSpinning(false);
    }
  };

  const updateSkin = (skinName: 'wood-helm' | 'modern-helm' | 'minimal' | 'casino' | 'stainless-steel-helm' | 'rubber-coated-helm' | 'leather-wrapped-helm' | 'chrome-helm' | 'mahogany-helm' | 'boat-helm') => {
    const skinConfigs = {
      'wood-helm': {
        name: 'wood-helm' as const,
        style: 'wood' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: false,
        separator: { stroke: '#555', strokeWidth: 2 },
        hub: { show: true, fill: '#ffe08a', stroke: '#7a5a1a', text: '', textColor: '#000000' },
        effects: { dropShadow: true, glow: false },
      },
      'modern-helm': {
        name: 'modern-helm' as const,
        style: 'modern' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: false,
        separator: { stroke: '#34495e', strokeWidth: 2 },
        hub: { show: true, fill: '#ecf0f1', stroke: '#7f8c8d', text: '', textColor: '#000000' },
        effects: { dropShadow: true, glow: false },
      },
      'minimal': {
        name: 'minimal' as const,
        showHelm: false,
        showHandles: false,
        showSpokes: false,
        separator: { stroke: '#bdc3c7', strokeWidth: 1 },
        hub: { show: true, fill: '#ffffff', stroke: '#95a5a6', text: '', textColor: '#000000' },
        effects: { dropShadow: false, glow: false },
      },
      'casino': {
        name: 'casino' as const,
        showHelm: false,
        showHandles: false,
        showSpokes: false,
        separator: { stroke: '#f39c12', strokeWidth: 3 },
        hub: { show: true, fill: '#e74c3c', stroke: '#c0392b', text: '', textColor: '#ffffff' },
        effects: { dropShadow: true, glow: true },
      },
      'stainless-steel-helm': {
        name: 'stainless-steel-helm' as const,
        style: 'stainless-steel' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: false,
        separator: { stroke: '#7a8fa3', strokeWidth: 2 },
        hub: { show: true, fill: 'url(#stainlessHub)', stroke: 'url(#stainlessHubStroke)', text: '', textColor: '#000000' },
        effects: { dropShadow: true, glow: false },
      },
      'rubber-coated-helm': {
        name: 'rubber-coated-helm' as const,
        style: 'rubber-coated' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: false,
        separator: { stroke: '#2a2a2a', strokeWidth: 2 },
        hub: { show: true, fill: 'url(#rubberHub)', stroke: 'url(#rubberHubStroke)', text: '', textColor: '#ffffff' },
        effects: { dropShadow: true, glow: false },
      },
      'leather-wrapped-helm': {
        name: 'leather-wrapped-helm' as const,
        style: 'leather-wrapped' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: false,
        separator: { stroke: '#6D4C41', strokeWidth: 2 },
        hub: { show: true, fill: 'url(#leatherHub)', stroke: 'url(#leatherHubStroke)', text: '', textColor: '#000000' },
        effects: { dropShadow: true, glow: false },
      },
      'chrome-helm': {
        name: 'chrome-helm' as const,
        style: 'chrome' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: false,
        separator: { stroke: '#adb5bd', strokeWidth: 2 },
        hub: { show: true, fill: 'url(#chromeHub)', stroke: 'url(#chromeHubStroke)', text: '', textColor: '#000000' },
        effects: { dropShadow: true, glow: false },
      },
      'mahogany-helm': {
        name: 'mahogany-helm' as const,
        style: 'mahogany' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: false,
        separator: { stroke: '#8B4513', strokeWidth: 2 },
        hub: { show: true, fill: 'url(#mahoganyHub)', stroke: 'url(#mahoganyHubStroke)', text: '', textColor: '#000000' },
        effects: { dropShadow: true, glow: false },
      },
      'boat-helm': {
        name: 'boat-helm' as const,
        style: 'boat' as const,
        showHelm: true,
        showHandles: true,
        showSpokes: true,
        separator: { stroke: '#A0522D', strokeWidth: 3 },
        hub: { show: true, fill: 'url(#boatHub)', stroke: 'url(#boatHubStroke)', text: '', textColor: '#000000' },
        effects: { dropShadow: true, glow: false },
      },
    };

    setConfig(prev => ({
      ...prev,
      skin: { ...prev.skin, ...skinConfigs[skinName] },
    }));
  };

  const toggleNoRepeat = () => {
    setConfig(prev => ({
      ...prev,
      selection: {
        ...prev.selection,
        noRepeatUntilExhausted: !prev.selection.noRepeatUntilExhausted,
      },
    }));
  };

  const updateWeights = (weighted: boolean) => {
    setConfig(prev => ({
      ...prev,
      selection: {
        ...prev.selection,
        weights: weighted ? [10, 5, 1, 1, 5, 10, 3, 8] : undefined,
      },
    }));
  };

  const updateDividerThickness = (thickness: number) => {
    setConfig(prev => ({
      ...prev,
      skin: {
        ...prev.skin,
        separator: {
          ...prev.skin.separator,
          strokeWidth: thickness,
        },
      },
    }));
  };

  const toggleSpokes = () => {
    setConfig(prev => ({
      ...prev,
      skin: {
        ...prev.skin,
        showHelm: !prev.skin.showHelm,
      },
    }));
  };

  const toggleHandles = () => {
    setConfig(prev => ({
      ...prev,
      skin: {
        ...prev.skin,
        showHandles: !prev.skin.showHandles,
      },
    }));
  };

  const toggleInnerSpokes = () => {
    setConfig(prev => ({
      ...prev,
      skin: {
        ...prev.skin,
        showSpokes: !prev.skin.showSpokes,
      },
    }));
  };

  const updateHubText = (text: string) => {
    setConfig(prev => ({
      ...prev,
      skin: {
        ...prev.skin,
        hub: {
          ...prev.skin.hub,
          text: text,
        },
      },
    }));
  };

  const forceResize = () => {
    const newSize = getWheelSize();
    const newContainerSize = getContainerSize(newSize);
    console.log('Force resize:', { 
      screenWidth: window.innerWidth, 
      newWheelSize: newSize, 
      newContainerSize: newContainerSize 
    });
    setWheelSize(newSize);
    setContainerSize(newContainerSize);
    setConfig(prev => ({ ...prev, size: newSize }));
  };

  return (
    <>
      <style jsx global>{`
        .wheel-container {
          overflow: visible !important;
        }
        .wheel-container > div {
          overflow: visible !important;
        }
        .wheel-container svg {
          overflow: visible !important;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-4 sm:py-8">
        <div className="container mx-auto px-6 sm:px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            WheelSpin Component Demo
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            A production-ready, skinnable, and fully configurable wheel spinner for React applications.
            Try different configurations and see the results!
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Wheel */}
          <div className="lg:col-span-2 flex justify-center w-full">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
              <div className="flex justify-center items-center">
                <div 
                  className="wheel-container relative flex justify-center items-center"
                  style={{ 
                    width: `${containerSize}px`, 
                    height: `${containerSize}px`,
                    overflow: 'visible'
                  }}
                >
                  <WheelSpin
                    ref={wheelRef}
                    config={config}
                    style={{
                      width: `${wheelSize}px`,
                      height: `${wheelSize}px`,
                      overflow: 'visible'
                    }}
                  />
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <button
                  onClick={spin}
                  disabled={isSpinning}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
                >
                  {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                </button>
                
                {/* Debug info - remove in production */}
                <div className="mt-2 text-xs text-gray-500">
                  <div>Wheel: {wheelSize}px | Container: {containerSize}px | Screen: {typeof window !== 'undefined' ? window.innerWidth : 'SSR'}px</div>
                  <button 
                    onClick={forceResize}
                    className="mt-1 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Force Resize Check
                  </button>
                </div>
              </div>

              {result && (
                <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Result:</h3>
                  <p className="text-green-700">
                    <strong>{result.segment.label}</strong> (Index: {result.index})
                  </p>
                  {result.segment.payload && (
                    <p className="text-sm text-green-600 mt-1">
                      Payload: {JSON.stringify(result.segment.payload)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4 sm:space-y-6">
            {/* Skin Selection */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Skin Selection</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['wood-helm', 'modern-helm', 'minimal', 'casino', 'stainless-steel-helm', 'rubber-coated-helm', 'leather-wrapped-helm', 'chrome-helm', 'mahogany-helm', 'boat-helm'] as const).map(skin => {
                  const getSkinDisplayName = (skinName: string) => {
                    switch (skinName) {
                      case 'stainless-steel-helm': return 'Stainless Steel';
                      case 'rubber-coated-helm': return 'Rubber Coated';
                      case 'leather-wrapped-helm': return 'Leather Wrapped';
                      case 'chrome-helm': return 'Chrome';
                      case 'mahogany-helm': return 'Mahogany';
                      case 'boat-helm': return 'Boat Helm';
                      default: return skinName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    }
                  };

                  return (
                    <button
                      key={skin}
                      onClick={() => updateSkin(skin)}
                      className={`p-2 sm:p-3 text-xs sm:text-sm rounded border transition-colors min-h-[44px] ${
                        config.skin.name === skin
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {getSkinDisplayName(skin)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Targeted Spins */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Targeted Spins</h3>
              <div className="grid grid-cols-2 gap-2">
                {demoSegments.slice(0, 4).map(segment => (
                  <button
                    key={segment.label}
                    onClick={() => spinToTarget(segment.label)}
                    disabled={isSpinning}
                    className="p-2 sm:p-3 text-xs sm:text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 transition-colors min-h-[44px]"
                  >
                    {segment.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Configuration</h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.selection.noRepeatUntilExhausted}
                    onChange={toggleNoRepeat}
                    className="mr-2"
                  />
                  <span className="text-sm">No Repeat Until Exhausted</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!config.selection.weights}
                    onChange={(e) => updateWeights(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Weighted Selection</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.skin.showHelm}
                    onChange={toggleSpokes}
                    className="mr-2"
                  />
                  <span className="text-sm">Show Wheel Spokes</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.skin.showHandles !== false}
                    onChange={toggleHandles}
                    className="mr-2"
                  />
                  <span className="text-sm">Show Handles (Outer)</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.skin.showSpokes === true}
                    onChange={toggleInnerSpokes}
                    className="mr-2"
                  />
                  <span className="text-sm">Show Inner Spokes</span>
                </label>

                {/* Hub Text Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Axle/Spindle Text
                  </label>
                  <input
                    type="text"
                    value={config.skin.hub?.text || ''}
                    onChange={(e) => updateHubText(e.target.value)}
                    placeholder="Enter text for center hub"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Divider Thickness Control */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Divider Line Thickness: {config.skin.separator.strokeWidth}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={config.skin.separator.strokeWidth}
                    onChange={(e) => updateDividerThickness(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Thin (1px)</span>
                    <span>Thick (8px)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Results</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm">No spins yet</p>
                ) : (
                  history.map((res, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                      <strong>{res.segment.label}</strong>
                      <span className="text-gray-500 ml-2">#{res.index}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useRef } from "react";
import { WheelSpin, type WheelSpinRef, type WheelConfig } from "@yourscope/wheel";

const cfg: WheelConfig = {
  size: 480,
  pointer: "top",
  spin: { duration: 4.2, easing: "power4.out", extraSpins: [5,7] },
  selection: { seed: 42, noRepeatUntilExhausted: false },
  segments: [
    { label: "Coffee", color: "#FFDC35" },
    { label: "Sticker", color: "#03c4eb" },
    { label: "10% Off", color: "#f4f4f4" },
    { label: "Try Again", color: "#ffffff" },
    { label: "T-Shirt", color: "#03c4eb" },
    { label: "Mug", color: "#FFDC35" },
  ],
  skin: {
    name: "wood-helm",
    style: "wood",
    showHelm: true,
    separator: { stroke: "#555", strokeWidth: 2 },
    hub: { show: true, fill: "#ffe08a", stroke: "#7a5a1a" },
  },
};

export default function Demo() {
  const ref = useRef<WheelSpinRef>(null);
  return (
    <>
      <WheelSpin ref={ref} config={cfg} onResult={({index, segment}) => console.log(index, segment)} />
      <button onClick={() => ref.current?.spin({ targetLabel: "Coffee" })}>Spin to Coffee</button>
    </>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
    </>
  );
}
