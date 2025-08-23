'use client';

import React, { useState, useEffect } from 'react';

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

  const segmentAngle = 360 / data.length;
  const radius = wheelRadius;

  useEffect(() => {
    if (mustStartSpinning && !isSpinning) {
      setIsSpinning(true);
      
      // Calculate final rotation to land on the prize
      const targetAngle = 360 - (prizeNumber * segmentAngle) - (segmentAngle / 2);
      const spins = 5; // Number of full rotations
      const finalRotation = targetAngle + (spins * 360);
      
      setRotation(finalRotation);
      
      // Stop spinning after duration
      setTimeout(() => {
        setIsSpinning(false);
        if (onStopSpinning) {
          onStopSpinning();
        }
      }, spinDuration * 1000);
    }
  }, [mustStartSpinning, isSpinning, prizeNumber, segmentAngle, spinDuration, onStopSpinning]);

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
      <svg width={radius * 2} height={radius * 2} className="drop-shadow-lg">
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
            return (
              <g key={index}>
                <path
                  d={createSegmentPath(index)}
                  fill={segment.style.backgroundColor}
                  stroke={radiusLineColor}
                  strokeWidth={radiusLineWidth}
                />
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
          
          {/* Inner circle */}
          <circle
            cx={radius}
            cy={radius}
            r={innerRadius}
            fill="white"
            stroke={innerBorderColor}
            strokeWidth={innerBorderWidth}
          />
        </g>
        
        {/* Outer border */}
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="none"
          stroke={outerBorderColor}
          strokeWidth={outerBorderWidth}
        />
      </svg>
      
      {/* Pointer */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"
        style={{ zIndex: 10 }}
      >
        <div
          className="w-0 h-0 border-l-6 border-r-6 border-b-10"
          style={{
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#3777ff',
          }}
        />
      </div>
    </div>
  );
};
