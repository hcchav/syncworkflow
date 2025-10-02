import React from 'react';
import { SkinRenderer } from '../types';

export const stainlessSteelHelm: SkinRenderer = (config, geometry) => {
  const { size = 480, skin } = config;
  const { centerX, centerY, radius } = geometry;
  
  const {
    showHelm = true,
    showHandles = true,
    handleWidthFactor = 0.12,
    handleLengthFactor = 0.42,
    ringOuterWidthFactor = 0.08,
    ringInnerWidthFactor = 0.05,
    hub,
    effects,
  } = skin;

  const handleWidth = size * handleWidthFactor;
  const handleLength = radius * handleLengthFactor;
  const ringOuterWidth = size * ringOuterWidthFactor;
  const ringInnerWidth = size * ringInnerWidthFactor;

  const rings = showHelm ? [
    // Outer ring with stainless steel gradient
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#stainlessRingOuter)"
      strokeWidth={ringOuterWidth}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner ring with darker stainless steel
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth / 2}
      fill="none"
      stroke="url(#stainlessRingInner)"
      strokeWidth={ringInnerWidth}
    />,
    // Additional metallic accent ring
    <circle
      key="accent-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth * 0.8}
      fill="none"
      stroke="url(#stainlessAccent)"
      strokeWidth={2}
      opacity={0.7}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Top handle with stainless steel styling
    <rect
      key="handle-top"
      x={centerX - handleWidth / 2}
      y={centerY - radius - handleLength}
      width={handleWidth}
      height={handleLength}
      rx={handleWidth / 6}
      fill="url(#stainlessHandle)"
      stroke="url(#stainlessHandleStroke)"
      strokeWidth={2}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Bottom handle
    <rect
      key="handle-bottom"
      x={centerX - handleWidth / 2}
      y={centerY + radius}
      width={handleWidth}
      height={handleLength}
      rx={handleWidth / 6}
      fill="url(#stainlessHandle)"
      stroke="url(#stainlessHandleStroke)"
      strokeWidth={2}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Left handle
    <rect
      key="handle-left"
      x={centerX - radius - handleLength}
      y={centerY - handleWidth / 2}
      width={handleLength}
      height={handleWidth}
      rx={handleWidth / 6}
      fill="url(#stainlessHandle)"
      stroke="url(#stainlessHandleStroke)"
      strokeWidth={2}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Right handle
    <rect
      key="handle-right"
      x={centerX + radius}
      y={centerY - handleWidth / 2}
      width={handleLength}
      height={handleWidth}
      rx={handleWidth / 6}
      fill="url(#stainlessHandle)"
      stroke="url(#stainlessHandleStroke)"
      strokeWidth={2}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Add metallic grip texture to handles
    ...Array.from({ length: 4 }, (_, i) => {
      const angle = i * 90;
      const handleX = i % 2 === 0 ? centerX : (i === 1 ? centerX + radius + handleLength / 2 : centerX - radius - handleLength / 2);
      const handleY = i % 2 === 1 ? centerY : (i === 0 ? centerY - radius - handleLength / 2 : centerY + radius + handleLength / 2);
      
      return (
        <g key={`grip-${i}`}>
          {Array.from({ length: 3 }, (_, j) => (
            <line
              key={j}
              x1={handleX - (i % 2 === 0 ? handleWidth / 4 : handleLength / 4)}
              y1={handleY + (j - 1) * (i % 2 === 0 ? handleLength / 8 : handleWidth / 8)}
              x2={handleX + (i % 2 === 0 ? handleWidth / 4 : handleLength / 4)}
              y2={handleY + (j - 1) * (i % 2 === 0 ? handleLength / 8 : handleWidth / 8)}
              stroke="#8a9ba8"
              strokeWidth={1}
              opacity={0.6}
            />
          ))}
        </g>
      );
    }),
  ] : [];

  const hubElement = hub?.show ? (
    <g key="hub-group">
      {/* Main hub with stainless steel gradient */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill={hub.fill || "url(#stainlessHub)"}
        stroke={hub.stroke || "url(#stainlessHubStroke)"}
        strokeWidth={3}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Inner hub detail */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.05}
        fill="url(#stainlessHubInner)"
        stroke="#5a6c7a"
        strokeWidth={1}
      />
      {/* Center bolt detail */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.02}
        fill="url(#stainlessBolt)"
        stroke="#4a5a6a"
        strokeWidth={1}
      />
    </g>
  ) : null;

  const filters = [
    // Stainless steel gradients and patterns
    <defs key="stainless-gradients">
      {/* Outer ring gradient */}
      <linearGradient id="stainlessRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e8eef2" />
        <stop offset="25%" stopColor="#c1d0db" />
        <stop offset="50%" stopColor="#9bb0c1" />
        <stop offset="75%" stopColor="#7a8fa3" />
        <stop offset="100%" stopColor="#5a6c7a" />
      </linearGradient>
      
      {/* Inner ring gradient */}
      <linearGradient id="stainlessRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b8c5d1" />
        <stop offset="50%" stopColor="#8a9ba8" />
        <stop offset="100%" stopColor="#6b7d8a" />
      </linearGradient>
      
      {/* Accent ring */}
      <linearGradient id="stainlessAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f0f4f7" />
        <stop offset="50%" stopColor="#d4e1ea" />
        <stop offset="100%" stopColor="#a8b8c5" />
      </linearGradient>
      
      {/* Handle gradient */}
      <linearGradient id="stainlessHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dce6ed" />
        <stop offset="30%" stopColor="#b8c5d1" />
        <stop offset="70%" stopColor="#8a9ba8" />
        <stop offset="100%" stopColor="#6b7d8a" />
      </linearGradient>
      
      {/* Handle stroke */}
      <linearGradient id="stainlessHandleStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7a8fa3" />
        <stop offset="50%" stopColor="#5a6c7a" />
        <stop offset="100%" stopColor="#4a5a6a" />
      </linearGradient>
      
      {/* Hub gradients */}
      <radialGradient id="stainlessHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#f0f4f7" />
        <stop offset="30%" stopColor="#d4e1ea" />
        <stop offset="70%" stopColor="#a8b8c5" />
        <stop offset="100%" stopColor="#7a8fa3" />
      </radialGradient>
      
      <linearGradient id="stainlessHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6b7d8a" />
        <stop offset="50%" stopColor="#5a6c7a" />
        <stop offset="100%" stopColor="#4a5a6a" />
      </linearGradient>
      
      <radialGradient id="stainlessHubInner" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#e8eef2" />
        <stop offset="50%" stopColor="#c1d0db" />
        <stop offset="100%" stopColor="#9bb0c1" />
      </radialGradient>
      
      <radialGradient id="stainlessBolt" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#c1d0db" />
        <stop offset="50%" stopColor="#8a9ba8" />
        <stop offset="100%" stopColor="#5a6c7a" />
      </radialGradient>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="drop-shadow">
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" />
        </filter>
      </defs>
    );
  }

  if (effects?.glow) {
    filters.push(
      <defs key="glow">
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    );
  }

  return {
    rings,
    handles,
    innerSpokes: [],
    hub: hubElement,
    filters,
  };
};
