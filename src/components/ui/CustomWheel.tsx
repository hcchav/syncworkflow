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
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const segmentAngle = 360 / data.length;
  const radius = 150;

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
          {data.map((segment, index) => (
            <g key={index}>
              <path
                d={createSegmentPath(index)}
                fill={segment.style.backgroundColor}
                stroke={radiusLineColor}
                strokeWidth={radiusLineWidth}
              />
              <text
                x={getTextPosition(index).x}
                y={getTextPosition(index).y}
                fill={segment.style.textColor}
                fontSize={fontSize}
                fontWeight={fontWeight}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${getTextPosition(index).angle}, ${getTextPosition(index).x}, ${getTextPosition(index).y})`}
              >
                {segment.option}
              </text>
            </g>
          ))}
          
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
          className="w-0 h-0 border-l-4 border-r-4 border-b-8"
          style={{
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#333',
          }}
        />
      </div>
    </div>
  );
};
