import React from 'react';
import { SkinRenderer } from '../types';

export const minimal: SkinRenderer = (config, geometry) => {
  const { size = 480, skin } = config;
  const { centerX, centerY, radius } = geometry;
  
  const {
    hub,
    effects,
  } = skin;

  // Minimal skin has no rings or handles
  const rings: React.ReactNode[] = [];
  const handles: React.ReactNode[] = [];

  const hubElement = hub?.show ? (
    <circle
      key="hub"
      cx={centerX}
      cy={centerY}
      r={size * 0.04}
      fill={hub.fill || "url(#minimalHub)"}
      stroke={hub.stroke || "#e0e0e0"}
      strokeWidth={2}
      filter={effects?.dropShadow ? "url(#minimalShadow)" : undefined}
    />
  ) : null;

  const filters = [
    // Minimal gradients
    <defs key="minimal-gradients">
      <radialGradient id="minimalHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f5f5f5" />
        <stop offset="100%" stopColor="#e0e0e0" />
      </radialGradient>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="minimal-shadow">
        <filter id="minimalShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.1)" />
        </filter>
      </defs>
    );
  }

  if (effects?.glow) {
    filters.push(
      <defs key="minimal-glow">
        <filter id="minimalGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
