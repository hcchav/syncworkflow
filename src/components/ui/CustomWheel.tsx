'use client';

import React, { useState, useEffect, useRef } from 'react';

interface WheelSegment {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
}

interface CustomWheelProps {
  data: WheelSegment[];
  mustStartSpinning: boolean;
  prizeNumber: number;
  spinDuration?: number;
  onStopSpinning?: () => void;
  fontSize?: number;
  textDistance?: number;
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  innerRadius?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  backgroundColors?: string[];
  perpendicularText?: boolean;
  fontWeight?: number;
  wheelRadius?: number; // controls rendered wheel size
  keepUpright?: boolean; // ensure labels are always upright
  maxLabelLength?: number; // NEW: limit label length
}

export const CustomWheel: React.FC<CustomWheelProps> = ({
  data,
  mustStartSpinning,
  prizeNumber,
  spinDuration = 3,
  onStopSpinning,
  fontSize = 16,
  textDistance = 60,
  outerBorderColor = '#333',
  outerBorderWidth = 2,
  innerBorderColor = '#333',
  innerBorderWidth = 2,
  innerRadius = 20,
  radiusLineColor = '#333',
  radiusLineWidth = 1,
  fontWeight = 400,
  wheelRadius = 150,
  keepUpright = true,
  maxLabelLength = 14,
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const prevStartRef = useRef(false);

  const segmentAngle = 360 / data.length;
  const radius = wheelRadius;

  // Reset the edge detector when component unmounts or when mustStartSpinning becomes false
  useEffect(() => {
    return () => {
      if (mustStartSpinning) {
        prevStartRef.current = false;
      }
    };
  }, [mustStartSpinning]);

  useEffect(() => {
    // Only trigger on rising edge of mustStartSpinning
    if (mustStartSpinning && !prevStartRef.current) {
      console.log('🚀 Starting wheel spin effect');
      prevStartRef.current = true;
      
      // Create a new spin ID to track this specific spin
      const spinId = Date.now();
      console.log(`🆔 Starting spin with ID: ${spinId}`);
      
      // Reset any existing spinning state
      setIsSpinning(true);
      
      // Calculate the target segment's middle angle (in degrees)
      const targetSegmentMiddle = (prizeNumber * segmentAngle) + (segmentAngle / 2);
      
      // Calculate the angle needed to land the target at the bottom (270°)
      // We add 360 to ensure we always rotate clockwise (positive rotation)
      const angleToBottom = (360 - targetSegmentMiddle + 270) % 360;
      
      // Number of full rotations before stopping (at least 5 full rotations)
      const fullRotations = 5 * 360;
      const totalRotation = fullRotations + angleToBottom;
      
      console.log(`🎯 Target segment middle: ${targetSegmentMiddle}°`);
      console.log(`🔄 Need to rotate ${angleToBottom}° to land at bottom`);
      console.log(`🔄 Total rotation: ${totalRotation}° (5 spins + ${angleToBottom}° final rotation)`);
      console.log(`🎯 Final prize: ${data[prizeNumber]?.option}`);
      
      // Set up animation frame for smooth rotation
      let startTime: number | null = null;
      const duration = 5000; // 5 seconds total spin time
      let animationFrameId: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function that starts fast and slows down at the end
        const easeOutQuart = (t: number): number => {
          return 1 - Math.pow(1 - t, 4);
        };
        
        // Apply easing to the progress
        const easedProgress = easeOutQuart(progress);
        
        // Calculate current rotation with non-linear progression
        // Start with the current rotation to ensure smooth continuation
        const startRotation = rotation % 360;
        const rotationDistance = (totalRotation - startRotation) % 360;
        const currentRotation = startRotation + (rotationDistance * easedProgress);
        
        setRotation(currentRotation);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          console.log(`✅ Spin ${spinId} completed successfully`);
          setIsSpinning(false);
          if (onStopSpinning) onStopSpinning();
        }
      };
      
      // Start the animation
      animationFrameId = requestAnimationFrame(animate);
      
      // Cleanup function
      return () => {
        console.log(`🧹 Cleaning up spin ${spinId}`);
        cancelAnimationFrame(animationFrameId);
      };
    }
    
    // Reset the edge detector when mustStartSpinning becomes false
    if (!mustStartSpinning) {
      prevStartRef.current = false;
    }
  }, [mustStartSpinning, prizeNumber, segmentAngle, spinDuration, onStopSpinning]);

  const createSegmentPath = (index: number) => {
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = radius + radius * Math.cos(startAngleRad);
    const y1 = radius + radius * Math.sin(startAngleRad);
    const x2 = radius + radius * Math.cos(endAngleRad);
    const y2 = radius + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = segmentAngle > 180 ? 1 : 0;
    
    return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angle = (index * segmentAngle + segmentAngle / 2) * (Math.PI / 180);
    const x = radius + (textDistance * Math.cos(angle));
    const y = radius + (textDistance * Math.sin(angle));
    return { x, y, angle: angle * (180 / Math.PI) };
  };

  const getDisplayAngle = (baseAngleDeg: number) => {
    if (!keepUpright) return baseAngleDeg;
    // Flip text on left side so it stays upright
    return baseAngleDeg > 90 && baseAngleDeg < 270 ? baseAngleDeg + 180 : baseAngleDeg;
  };

  const getStrokeForText = (textColor: string) => {
    // If text is light, use dark stroke; if dark, use light stroke
    const color = textColor.toLowerCase();
    const isLight = color === '#fff' || color === 'white' || color === 'rgb(255,255,255)';
    return isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';
  };

  const shorten = (label: string) => {
    if (label.length <= maxLabelLength) return label;
    return label.slice(0, Math.max(0, maxLabelLength - 1)) + '…';
  };

  // Estimate text width using a simple heuristic: ~0.6em per character
  const estimateWidth = (text: string, fs: number) => text.length * fs * 0.6;

  // Try to split into two lines at a space near the middle when long
  const splitTwoLines = (text: string): string[] | null => {
    const trimmed = text.trim();
    if (!trimmed.includes(' ')) return null;
    const mid = Math.floor(trimmed.length / 2);
    // find nearest space to middle
    let splitIdx = -1;
    let left = mid, right = mid + 1;
    while (left >= 0 || right < trimmed.length) {
      if (left >= 0 && trimmed[left] === ' ') { splitIdx = left; break; }
      if (right < trimmed.length && trimmed[right] === ' ') { splitIdx = right; break; }
      left--; right++;
    }
    if (splitIdx === -1) return null;
    const first = trimmed.slice(0, splitIdx).trim();
    const second = trimmed.slice(splitIdx + 1).trim();
    if (!first || !second) return null;
    return [first, second];
  };

  // Compute per-label layout: lines and fontScale so the widest line fits available arc width
  const computeLayout = (label: string, baseFont: number) => {
    const thetaRad = (segmentAngle * Math.PI) / 180;
    const available = Math.max(8, textDistance * thetaRad * 0.85); // conservative available arc width

    // Try two-line split FIRST (more natural fit on arcs)
    const twoFirst = splitTwoLines(label);
    let lines: string[];
    if (twoFirst) {
      // Soft-limit each line length before measuring
      lines = twoFirst.map(l => (l.length > maxLabelLength ? l.slice(0, maxLabelLength - 1) + '…' : l));
    } else {
      lines = [shorten(label)];
    }

    // If still too wide, compare with single-line shortened as fallback
    const widths = (fs: number, arr: string[]) => arr.map(l => estimateWidth(l, fs));
    const maxLine = Math.max(...widths(baseFont, lines));
    let candidateLines = lines;
    let candidateMax = maxLine;

    if (twoFirst) {
      const single = [shorten(label)];
      const singleMax = Math.max(...widths(baseFont, single));
      if (singleMax < candidateMax * 0.92) {
        candidateLines = single;
        candidateMax = singleMax;
      }
    }

    const scale = Math.max(0.6, Math.min(1, available / candidateMax));
    return { lines: candidateLines, scale, available };
  };

  return (
    <div className="relative inline-block">
      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,220,53,0.4) 0%, rgba(255,220,53,0.1) 50%, transparent 70%)',
          width: radius * 2 + 40,
          height: radius * 2 + 40,
          left: -20,
          top: -20,
          filter: 'blur(8px)'
        }}
      />
      
      {/* Main wheel SVG with enhanced styling */}
      <svg 
        width={radius * 2} 
        height={radius * 2} 
        className="drop-shadow-2xl relative z-10"
        style={{
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255,220,53,0.2))'
        }}
      >
        {/* Outer ring gradient */}
        <defs>
          <radialGradient id="outerRing" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0.3" />
          </radialGradient>
          <linearGradient id="segmentGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${radius}px ${radius}px`,
            transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.23, 1, 0.32, 1)` : 'none',
          }}
        >
          {data.map((segment, index) => {
            const pos = getTextPosition(index);
            const displayAngle = getDisplayAngle(pos.angle);
            const stroke = getStrokeForText(segment.style.textColor);
            const { lines, scale, available } = computeLayout(segment.option, fontSize);
            const fs = fontSize * scale;
            const strokeW = Math.max(1.1, Math.floor(fs / 10));
            const lineHeight = fs * 0.95;
            const needFit = scale < 0.95; // use textLength to fine-tune if scaled down
            
            // Enhanced segment colors with gradients
            const segmentId = `segment-${index}`;
            const gradientId = `gradient-${index}`;
            
            return (
              <g key={index}>
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={segment.style.backgroundColor} />
                    <stop offset="50%" stopColor={segment.style.backgroundColor} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={segment.style.backgroundColor} stopOpacity="0.7" />
                  </linearGradient>
                  <filter id={`shadow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.2)" />
                  </filter>
                </defs>
                
                {/* Main segment with gradient and shadow */}
                <path
                  d={createSegmentPath(index)}
                  fill={`url(#${gradientId})`}
                  stroke={radiusLineColor}
                  strokeWidth={radiusLineWidth}
                  filter={`url(#shadow-${index})`}
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                />
                
                {/* Highlight overlay for premium segments */}
                {(segment.option.includes('Free Setup') || segment.option.includes('$100 Off')) && (
                  <path
                    d={createSegmentPath(index)}
                    fill="url(#segmentGlow)"
                    stroke="none"
                    opacity="0.6"
                  />
                )}
                {lines.length === 1 ? (
                  <text
                    x={pos.x}
                    y={pos.y}
                    fill={segment.style.textColor}
                    fontSize={fs}
                    fontWeight={fontWeight}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${displayAngle}, ${pos.x}, ${pos.y})`}
                    stroke={stroke}
                    strokeWidth={strokeW}
                    paintOrder="stroke fill"
                    style={{ letterSpacing: '0.25px' }}
                    {...(needFit ? { textLength: available * 0.98, lengthAdjust: 'spacingAndGlyphs' } as any : {})}
                  >
                    {lines[0]}
                  </text>
                ) : (
                  <text
                    x={pos.x}
                    y={pos.y}
                    fill={segment.style.textColor}
                    fontSize={fs}
                    fontWeight={fontWeight}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${displayAngle}, ${pos.x}, ${pos.y})`}
                    stroke={stroke}
                    strokeWidth={strokeW}
                    paintOrder="stroke fill"
                    style={{ letterSpacing: '0.2px' }}
                  >
                    <tspan x={pos.x} dy={-lineHeight / 2} {...(needFit ? { textLength: available * 0.95, lengthAdjust: 'spacingAndGlyphs' } as any : {})}>{lines[0]}</tspan>
                    <tspan x={pos.x} dy={lineHeight} {...(needFit ? { textLength: available * 0.95, lengthAdjust: 'spacingAndGlyphs' } as any : {})}>{lines[1]}</tspan>
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Enhanced inner circle with gradient and shadow */}
          <defs>
            <radialGradient id="innerCircleGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f8f9fa" />
              <stop offset="100%" stopColor="#e9ecef" />
            </radialGradient>
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.15)" />
            </filter>
          </defs>
          
          <circle
            cx={radius}
            cy={radius}
            r={innerRadius + 2}
            fill="url(#innerCircleGradient)"
            stroke={innerBorderColor}
            strokeWidth={innerBorderWidth + 1}
            filter="url(#innerShadow)"
          />
          
          {/* Inner circle highlight */}
          <circle
            cx={radius}
            cy={radius}
            r={innerRadius - 2}
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1"
          />
        </g>
        
        {/* Enhanced outer border with gradient */}
        <defs>
          <linearGradient id="outerBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="50%" stopColor="#4a5568" />
            <stop offset="100%" stopColor="#2d3748" />
          </linearGradient>
        </defs>
        
        <circle
          cx={radius}
          cy={radius}
          r={radius - outerBorderWidth/2}
          fill="none"
          stroke="url(#outerBorderGradient)"
          strokeWidth={outerBorderWidth + 1}
        />
        
        {/* Outer highlight ring */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - outerBorderWidth - 2}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
      </svg>
      
      {/* Enhanced Pointer with shadow and glow */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"
        style={{ zIndex: 20 }}
      >
        {/* Pointer glow effect */}
        <div 
          className="absolute inset-0 transform -translate-x-1/2 -translate-y-1"
          style={{
            width: '24px',
            height: '24px',
            background: 'radial-gradient(circle, rgba(255,77,77,0.6) 0%, transparent 70%)',
            filter: 'blur(4px)',
            zIndex: -1
          }}
        />
        
        {/* Main pointer */}
        <div className="relative">
          {/* Pointer shadow */}
          <div
            className="absolute top-1 left-0 w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '16px solid rgba(0,0,0,0.2)',
              filter: 'blur(1px)'
            }}
          />
          
          {/* Main pointer body */}
          <div
            className="w-0 h-0 relative"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '16px solid #ff4d4d',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          />
          
          {/* Pointer highlight */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderBottom: '8px solid rgba(255,255,255,0.6)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
