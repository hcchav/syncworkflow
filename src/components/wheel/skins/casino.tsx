import React from 'react';
import { SkinRenderer } from '../types';

export const casino: SkinRenderer = (config, geometry) => {
  const { size = 480, skin } = config;
  const { centerX, centerY, radius } = geometry;
  
  const {
    showHelm = false, // Casino style typically doesn't show helm
    hub,
    effects,
  } = skin;

  const rings = [
    // Outer decorative ring
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + 8}
      fill="none"
      stroke="url(#casinoOuter)"
      strokeWidth={6}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner decorative ring
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - 8}
      fill="none"
      stroke="url(#casinoInner)"
      strokeWidth={4}
    />,
    // Accent dots around the wheel
    ...Array.from({ length: 24 }, (_, i) => {
      const angle = (i * 360) / 24;
      const dotRadius = radius + 15;
      const dotX = centerX + dotRadius * Math.cos((angle * Math.PI) / 180);
      const dotY = centerY + dotRadius * Math.sin((angle * Math.PI) / 180);
      
      return (
        <circle
          key={`dot-${i}`}
          cx={dotX}
          cy={dotY}
          r={3}
          fill="url(#casinoDot)"
          filter={effects?.glow ? "url(#casinoGlow)" : undefined}
        />
      );
    }),
  ];

  const handles: React.ReactNode[] = []; // Casino style has no handles

  const hubElement = hub?.show ? (
    <g key="hub">
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.1}
        fill={hub.fill || "url(#casinoHub)"}
        stroke={hub.stroke || "url(#casinoHubStroke)"}
        strokeWidth={4}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Inner hub decoration */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.06}
        fill="none"
        stroke="rgba(255,215,0,0.8)"
        strokeWidth={2}
      />
      {/* Center star */}
      <g transform={`translate(${centerX}, ${centerY})`}>
        <path
          d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z"
          fill="rgba(255,215,0,0.9)"
          stroke="rgba(184,134,11,0.8)"
          strokeWidth={1}
        />
      </g>
    </g>
  ) : null;

  const filters = [
    // Casino gradients
    <defs key="casino-gradients">
      <linearGradient id="casinoOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc143c" />
        <stop offset="25%" stopColor="#ffd700" />
        <stop offset="50%" stopColor="#dc143c" />
        <stop offset="75%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#dc143c" />
      </linearGradient>
      
      <linearGradient id="casinoInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b8860b" />
        <stop offset="50%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#b8860b" />
      </linearGradient>
      
      <radialGradient id="casinoDot" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#b8860b" />
      </radialGradient>
      
      <radialGradient id="casinoHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="50%" stopColor="#daa520" />
        <stop offset="100%" stopColor="#b8860b" />
      </radialGradient>
      
      <linearGradient id="casinoHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b0000" />
        <stop offset="50%" stopColor="#dc143c" />
        <stop offset="100%" stopColor="#8b0000" />
      </linearGradient>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="casino-shadow">
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" />
        </filter>
      </defs>
    );
  }

  if (effects?.glow) {
    filters.push(
      <defs key="casino-glow">
        <filter id="casinoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
