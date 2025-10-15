'use client';
import React, { useRef, useState, useEffect } from 'react';
import { WheelSpin, WheelSpinRef, WheelConfig } from '@/components/wheel';
import Script from 'next/script';

const demoSegments = [
  { label: 'Coffee', color: '#FFDC35', payload: { type: 'beverage', value: 'coffee' } },
  { label: 'Sticker Pack', color: '#03c4eb', payload: { type: 'merchandise', value: 'stickers' } },
];

// Default prize configuration (8 prizes)
const defaultPrizes = [
  { label: 'Coffee', color: '#feca57', labelColor: '#000000', payload: { type: 'beverage', value: 'coffee' } },
  { label: 'Try Again', color: '#ffffff', labelColor: '#000000', payload: { type: 'retry', value: null } },
  { label: 'T-Shirt', color: '#ff6b6b', labelColor: '#ffffff', payload: { type: 'merchandise', value: 'tshirt' } },
  { label: 'Free Mug', color: '#4ecdc4', labelColor: '#ffffff', payload: { type: 'merchandise', value: 'mug' } },
  { label: '25% Off', color: '#45b7d1', labelColor: '#ffffff', payload: { type: 'discount', value: 0.25 } },
  { label: 'Gift Card', color: '#96ceb4', labelColor: '#000000', payload: { type: 'giftcard', value: 50 } },
  { label: 'Free Spin', color: '#a55eea', labelColor: '#ffffff', payload: { type: 'bonus', value: 'spin' } },
  { label: 'No Prize', color: '#ddd', labelColor: '#666666', payload: { type: 'none', value: null } },
];

// Available background colors - bright vibrant tones
const backgroundColors = [
  '#4ecdc4', '#ff6b6b', '#45b7d1', '#feca57', '#a55eea', '#96ceb4',
  '#fd79a8', '#74b9ff', '#00b894', '#e17055', '#6c5ce7', '#fdcb6e',
  '#ffffff', '#2d3436', '#636e72', '#ddd'
];

// Available text colors
const textColors = [
  '#000000', '#ffffff', '#333333', '#666666', '#999999',
  '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'
];

// Character limit per prize name
const PRIZE_NAME_LIMIT = 12;

// Simplified responsive wheel size function
const getWheelSize = () => {
  if (typeof window === 'undefined') return 300; // SSR fallback
  const screenWidth = window.innerWidth;
  
  // Simple responsive sizing without complex calculations
  if (screenWidth < 310) {
    return 130; // Small mobile screens
  }
  if (screenWidth < 331) {
    return 170; // Small mobile screens
  }
  if (screenWidth < 342) {
    return 180; // Small mobile screens
  }
  if (screenWidth < 359) {
    return 190; // Small mobile screens
  }
  if (screenWidth < 400) {
    return 190; // Small mobile screens
  }
  if (screenWidth < 500) {
    return 225; // Small mobile screens
  }
  if (screenWidth < 600) {
    return 300; // Small mobile screens
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
  segments: defaultPrizes,
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
  const webComponentRef = useRef<any>(null);
  const [config, setConfig] = useState<WheelConfig>(baseConfig);
  const [activeDemo, setActiveDemo] = useState<'react' | 'webcomponent'>('react');
  const [webComponentLoaded, setWebComponentLoaded] = useState(false);
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
  const [prizes, setPrizes] = useState(defaultPrizes);
  const [editingPrize, setEditingPrize] = useState<number | null>(null);
  const [customColors, setCustomColors] = useState<{[key: string]: string}>({});
  const [customTextColors, setCustomTextColors] = useState<{[key: string]: string}>({});

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

  // Update config when prizes change
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      segments: prizes
    }));
  }, [prizes]);

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

  // Helper function to validate hex color
  const isValidHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  // Prize management functions
  const updatePrizeName = (index: number, name: string) => {
    if (name.length > PRIZE_NAME_LIMIT) return;
    setPrizes(prev => prev.map((prize, i) => 
      i === index ? { ...prize, label: name } : prize
    ));
  };

  const updatePrizeColor = (index: number, color: string) => {
    setPrizes(prev => prev.map((prize, i) => 
      i === index ? { ...prize, color } : prize
    ));
  };

  const updatePrizeTextColor = (index: number, textColor: string) => {
    setPrizes(prev => prev.map((prize, i) => 
      i === index ? { ...prize, labelColor: textColor } : prize
    ));
  };

  const updateCustomColor = (index: number, color: string) => {
    setCustomColors(prev => ({ ...prev, [`bg-${index}`]: color }));
    if (isValidHexColor(color)) {
      updatePrizeColor(index, color);
    }
  };

  const updateCustomTextColor = (index: number, color: string) => {
    setCustomTextColors(prev => ({ ...prev, [`text-${index}`]: color }));
    if (isValidHexColor(color)) {
      updatePrizeTextColor(index, color);
    }
  };

  const resetPrizes = () => {
    setPrizes([...defaultPrizes]);
    setEditingPrize(null);
    setCustomColors({});
    setCustomTextColors({});
  };

  // Web Component event handlers
  useEffect(() => {
    if (webComponentLoaded && webComponentRef.current) {
      const wheel = webComponentRef.current;
      
      // Set segments
      wheel.segments = prizes.map(prize => ({
        label: prize.label,
        bg: prize.color,
        text: prize.labelColor
      }));

      // Add event listeners
      const handleSpinEnd = (e: any) => {
        setResult({
          index: e.detail.index,
          segment: prizes[e.detail.index]
        });
        setIsSpinning(false);
        setHistory(prev => [{
          index: e.detail.index,
          segment: prizes[e.detail.index]
        }, ...prev.slice(0, 9)]);
      };

      wheel.addEventListener('spinend', handleSpinEnd);
      return () => wheel.removeEventListener('spinend', handleSpinEnd);
    }
  }, [webComponentLoaded, prizes]);

  const spinWebComponent = async () => {
    if (isSpinning || !webComponentRef.current) return;
    setIsSpinning(true);
    setResult(null);
    try {
      await webComponentRef.current.spin();
    } catch (error) {
      console.error('Web component spin failed:', error);
      setIsSpinning(false);
    }
  };

  const spinWebComponentToTarget = async (targetLabel: string) => {
    if (isSpinning || !webComponentRef.current) return;
    setIsSpinning(true);
    setResult(null);
    try {
      await webComponentRef.current.spin({ targetLabel });
    } catch (error) {
      console.error('Web component targeted spin failed:', error);
      setIsSpinning(false);
    }
  };

  return (
    <>
      <Script 
        src="/wheel.js" 
        onLoad={() => setWebComponentLoaded(true)}
      />
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
            Wheel Component Demo
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Compare the React component vs Web Component implementations.
            Both offer the same functionality with different integration approaches.
          </p>
          
          {/* Demo Type Selector */}
          <div className="flex justify-center mt-6">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveDemo('react')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeDemo === 'react'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                React Component
              </button>
              <button
                onClick={() => setActiveDemo('webcomponent')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeDemo === 'webcomponent'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Web Component
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Wheel */}
          <div className="lg:col-span-2 flex justify-center w-full">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
              <div className="mb-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {activeDemo === 'react' ? 'React Component' : 'Web Component'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {activeDemo === 'react' 
                    ? 'Full React integration with TypeScript support'
                    : 'Framework-agnostic Web Component with HTML attributes'
                  }
                </p>
              </div>
              
              <div className="flex justify-center items-center">
                {activeDemo === 'react' ? (
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
                ) : (
                  webComponentLoaded && (
                    <lucky-wheel
                      ref={webComponentRef}
                      skin="minimal"
                      theme="light"
                      target-prize="random"
                      spin-duration="3000"
                      size={wheelSize.toString()}
                      easing="easeOutCubic"
                      min-rotations="3"
                      style={{ display: 'block' }}
                    />
                  )
                )}
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <button
                  onClick={activeDemo === 'react' ? spin : spinWebComponent}
                  disabled={isSpinning || (activeDemo === 'webcomponent' && !webComponentLoaded)}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
                >
                  {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                </button>
                
                {activeDemo === 'react' && (
                  <div className="mt-2 text-xs text-gray-500">
                    <div>Wheel: {wheelSize}px | Container: {containerSize}px | Screen: {typeof window !== 'undefined' ? window.innerWidth : 'SSR'}px</div>
                    <button 
                      onClick={forceResize}
                      className="mt-1 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      Force Resize Check
                    </button>
                  </div>
                )}
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

            {/* Prize Configuration */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold">Prize Configuration</h3>
                <button
                  onClick={resetPrizes}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                  Reset
                </button>
              </div>
              
              <div className="space-y-3">
                {prizes.map((prize, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium w-12">#{index + 1}</span>
                      <input
                        type="text"
                        value={prize.label}
                        onChange={(e) => updatePrizeName(index, e.target.value)}
                        maxLength={PRIZE_NAME_LIMIT}
                        className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Prize name"
                      />
                      <span className="text-xs text-gray-500">
                        {prize.label.length}/{PRIZE_NAME_LIMIT}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-16">Background:</span>
                      <div className="flex gap-1 flex-wrap">
                        {backgroundColors.slice(0, 8).map(color => (
                          <button
                            key={color}
                            onClick={() => updatePrizeColor(index, color)}
                            className={`w-6 h-6 rounded border-2 ${
                              prize.color === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                        <input
                          type="text"
                          value={customColors[`bg-${index}`] || ''}
                          onChange={(e) => updateCustomColor(index, e.target.value)}
                          placeholder="#hex"
                          className={`w-16 px-1 py-0 text-xs border rounded ${
                            customColors[`bg-${index}`] && isValidHexColor(customColors[`bg-${index}`]) 
                              ? 'border-green-500' 
                              : customColors[`bg-${index}`] 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-600 w-16">Text:</span>
                      <div className="flex gap-1">
                        {textColors.slice(0, 6).map(color => (
                          <button
                            key={color}
                            onClick={() => updatePrizeTextColor(index, color)}
                            className={`w-6 h-6 rounded border-2 ${
                              prize.labelColor === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                        <input
                          type="text"
                          value={customTextColors[`text-${index}`] || ''}
                          onChange={(e) => updateCustomTextColor(index, e.target.value)}
                          placeholder="#hex"
                          className={`w-16 px-1 py-0 text-xs border rounded ${
                            customTextColors[`text-${index}`] && isValidHexColor(customTextColors[`text-${index}`]) 
                              ? 'border-green-500' 
                              : customTextColors[`text-${index}`] 
                                ? 'border-red-500' 
                                : 'border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Targeted Spins */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Targeted Spins</h3>
              <div className="grid grid-cols-2 gap-2">
                {prizes.slice(0, 4).map(segment => (
                  <button
                    key={segment.label}
                    onClick={() => activeDemo === 'react' ? spinToTarget(segment.label) : spinWebComponentToTarget(segment.label)}
                    disabled={isSpinning || (activeDemo === 'webcomponent' && !webComponentLoaded)}
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
