import React from 'react';
import { SkinRenderer } from '../types';

export const mahoganyHelm: SkinRenderer = (config, geometry) => {
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
    // Outer mahogany ring with rich wood texture
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#mahoganyRingOuter)"
      strokeWidth={ringOuterWidth}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner mahogany ring
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth / 2}
      fill="none"
      stroke="url(#mahoganyRingInner)"
      strokeWidth={ringInnerWidth}
    />,
    // Wood grain accent ring
    <circle
      key="grain-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth * 0.3}
      fill="none"
      stroke="url(#mahoganyGrain)"
      strokeWidth={1.5}
      opacity={0.6}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Top handle - realistic turned mahogany with brass ends
    <g key="handle-top-group">
      {/* Brass end cap */}
      <ellipse
        cx={centerX}
        cy={centerY - radius - handleLength * 0.95}
        rx={handleWidth * 0.6}
        ry={handleWidth * 0.3}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
      
      {/* Main turned mahogany handle */}
      <rect
        x={centerX - handleWidth * 0.4}
        y={centerY - radius - handleLength * 0.9}
        width={handleWidth * 0.8}
        height={handleLength * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedMahoganyHandle)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1.5}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      
      {/* Decorative grooves */}
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`groove-top-${i}`}
          cx={centerX}
          cy={centerY - radius - handleLength * 0.8 + (i + 1) * (handleLength * 0.15)}
          rx={handleWidth * 0.35}
          ry={handleWidth * 0.08}
          fill="none"
          stroke="#8B4513"
          strokeWidth={0.8}
          opacity={0.6}
        />
      ))}
      
      {/* Center bulge */}
      <ellipse
        cx={centerX}
        cy={centerY - radius - handleLength * 0.5}
        rx={handleWidth * 0.5}
        ry={handleWidth * 0.4}
        fill="url(#mahoganyBulge)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1}
      />
      
      {/* Brass end cap bottom */}
      <ellipse
        cx={centerX}
        cy={centerY - radius - handleLength * 0.05}
        rx={handleWidth * 0.6}
        ry={handleWidth * 0.3}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
    </g>,
    // Bottom handle - realistic turned mahogany with brass ends
    <g key="handle-bottom-group">
      {/* Brass end cap */}
      <ellipse
        cx={centerX}
        cy={centerY + radius + handleLength * 0.95}
        rx={handleWidth * 0.6}
        ry={handleWidth * 0.3}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
      
      {/* Main turned mahogany handle */}
      <rect
        x={centerX - handleWidth * 0.4}
        y={centerY + radius + handleLength * 0.1}
        width={handleWidth * 0.8}
        height={handleLength * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedMahoganyHandle)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1.5}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      
      {/* Decorative grooves */}
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`groove-bottom-${i}`}
          cx={centerX}
          cy={centerY + radius + handleLength * 0.2 + (i + 1) * (handleLength * 0.15)}
          rx={handleWidth * 0.35}
          ry={handleWidth * 0.08}
          fill="none"
          stroke="#8B4513"
          strokeWidth={0.8}
          opacity={0.6}
        />
      ))}
      
      {/* Center bulge */}
      <ellipse
        cx={centerX}
        cy={centerY + radius + handleLength * 0.5}
        rx={handleWidth * 0.5}
        ry={handleWidth * 0.4}
        fill="url(#mahoganyBulge)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1}
      />
      
      {/* Brass end cap bottom */}
      <ellipse
        cx={centerX}
        cy={centerY + radius + handleLength * 0.05}
        rx={handleWidth * 0.6}
        ry={handleWidth * 0.3}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
    </g>,
    // Left handle - realistic turned mahogany with brass ends
    <g key="handle-left-group">
      {/* Brass end cap */}
      <ellipse
        cx={centerX - radius - handleLength * 0.95}
        cy={centerY}
        rx={handleWidth * 0.3}
        ry={handleWidth * 0.6}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
      
      {/* Main turned mahogany handle */}
      <rect
        x={centerX - radius - handleLength * 0.9}
        y={centerY - handleWidth * 0.4}
        width={handleLength * 0.8}
        height={handleWidth * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedMahoganyHandle)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1.5}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      
      {/* Decorative grooves */}
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`groove-left-${i}`}
          cx={centerX - radius - handleLength * 0.8 + (i + 1) * (handleLength * 0.15)}
          cy={centerY}
          rx={handleWidth * 0.08}
          ry={handleWidth * 0.35}
          fill="none"
          stroke="#8B4513"
          strokeWidth={0.8}
          opacity={0.6}
        />
      ))}
      
      {/* Center bulge */}
      <ellipse
        cx={centerX - radius - handleLength * 0.5}
        cy={centerY}
        rx={handleWidth * 0.4}
        ry={handleWidth * 0.5}
        fill="url(#mahoganyBulge)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1}
      />
      
      {/* Brass end cap right */}
      <ellipse
        cx={centerX - radius - handleLength * 0.05}
        cy={centerY}
        rx={handleWidth * 0.3}
        ry={handleWidth * 0.6}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
    </g>,
    // Right handle - realistic turned mahogany with brass ends
    <g key="handle-right-group">
      {/* Brass end cap */}
      <ellipse
        cx={centerX + radius + handleLength * 0.95}
        cy={centerY}
        rx={handleWidth * 0.3}
        ry={handleWidth * 0.6}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
      
      {/* Main turned mahogany handle */}
      <rect
        x={centerX + radius + handleLength * 0.1}
        y={centerY - handleWidth * 0.4}
        width={handleLength * 0.8}
        height={handleWidth * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedMahoganyHandle)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1.5}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      
      {/* Decorative grooves */}
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`groove-right-${i}`}
          cx={centerX + radius + handleLength * 0.2 + (i + 1) * (handleLength * 0.15)}
          cy={centerY}
          rx={handleWidth * 0.08}
          ry={handleWidth * 0.35}
          fill="none"
          stroke="#8B4513"
          strokeWidth={0.8}
          opacity={0.6}
        />
      ))}
      
      {/* Center bulge */}
      <ellipse
        cx={centerX + radius + handleLength * 0.5}
        cy={centerY}
        rx={handleWidth * 0.4}
        ry={handleWidth * 0.5}
        fill="url(#mahoganyBulge)"
        stroke="url(#turnedMahoganyStroke)"
        strokeWidth={1}
      />
      
      {/* Brass end cap left */}
      <ellipse
        cx={centerX + radius + handleLength * 0.05}
        cy={centerY}
        rx={handleWidth * 0.3}
        ry={handleWidth * 0.6}
        fill="url(#brassEndCap)"
        stroke="url(#brassEndCapStroke)"
        strokeWidth={1}
      />
    </g>,
  ] : [];

  const hubElement = hub?.show ? (
    <g key="hub-group">
      {/* Main mahogany hub */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill={hub.fill || "url(#mahoganyHub)"}
        stroke={hub.stroke || "url(#mahoganyHubStroke)"}
        strokeWidth={3}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Wood grain overlay on hub */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill="url(#mahoganyGrainPattern)"
        opacity={0.3}
      />
      {/* Inner brass center */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.04}
        fill="url(#brassCenter)"
        stroke="#B8860B"
        strokeWidth={2}
      />
      {/* Center mahogany detail */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.02}
        fill="url(#mahoganyCenter)"
        stroke="#8B4513"
        strokeWidth={1}
      />
    </g>
  ) : null;

  const filters = [
    // Mahogany wood gradients and patterns
    <defs key="mahogany-gradients">
      {/* Outer ring gradient - rich mahogany */}
      <linearGradient id="mahoganyRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C04000" />
        <stop offset="25%" stopColor="#A0522D" />
        <stop offset="50%" stopColor="#8B4513" />
        <stop offset="75%" stopColor="#722F37" />
        <stop offset="100%" stopColor="#5D1A1B" />
      </linearGradient>
      
      {/* Inner ring gradient */}
      <linearGradient id="mahoganyRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A0522D" />
        <stop offset="50%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#722F37" />
      </linearGradient>
      
      {/* Wood grain accent */}
      <linearGradient id="mahoganyGrain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D2691E" />
        <stop offset="50%" stopColor="#CD853F" />
        <stop offset="100%" stopColor="#A0522D" />
      </linearGradient>
      
      {/* Handle gradient */}
      <linearGradient id="mahoganyHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C04000" />
        <stop offset="30%" stopColor="#A0522D" />
        <stop offset="70%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#722F37" />
      </linearGradient>
      
      {/* Handle stroke */}
      <linearGradient id="mahoganyHandleStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="50%" stopColor="#722F37" />
        <stop offset="100%" stopColor="#5D1A1B" />
      </linearGradient>
      
      {/* Hub gradients */}
      <radialGradient id="mahoganyHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D2691E" />
        <stop offset="30%" stopColor="#C04000" />
        <stop offset="70%" stopColor="#A0522D" />
        <stop offset="100%" stopColor="#8B4513" />
      </radialGradient>
      
      <linearGradient id="mahoganyHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="50%" stopColor="#722F37" />
        <stop offset="100%" stopColor="#5D1A1B" />
      </linearGradient>
      
      {/* Brass center */}
      <radialGradient id="brassCenter" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#DAA520" />
        <stop offset="100%" stopColor="#B8860B" />
      </radialGradient>
      
      {/* Center mahogany */}
      <radialGradient id="mahoganyCenter" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#A0522D" />
        <stop offset="50%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#722F37" />
      </radialGradient>
      
      {/* Realistic turned mahogany handle gradients */}
      <linearGradient id="turnedMahoganyHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C04000" />
        <stop offset="25%" stopColor="#A0522D" />
        <stop offset="50%" stopColor="#8B4513" />
        <stop offset="75%" stopColor="#722F37" />
        <stop offset="100%" stopColor="#5D1A1B" />
      </linearGradient>
      
      <linearGradient id="turnedMahoganyStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="50%" stopColor="#722F37" />
        <stop offset="100%" stopColor="#5D1A1B" />
      </linearGradient>
      
      <radialGradient id="mahoganyBulge" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#D2691E" />
        <stop offset="30%" stopColor="#C04000" />
        <stop offset="70%" stopColor="#A0522D" />
        <stop offset="100%" stopColor="#8B4513" />
      </radialGradient>
      
      {/* Brass end cap gradients */}
      <radialGradient id="brassEndCap" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="30%" stopColor="#FFC107" />
        <stop offset="60%" stopColor="#DAA520" />
        <stop offset="100%" stopColor="#B8860B" />
      </radialGradient>
      
      <linearGradient id="brassEndCapStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DAA520" />
        <stop offset="50%" stopColor="#B8860B" />
        <stop offset="100%" stopColor="#996515" />
      </linearGradient>
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
