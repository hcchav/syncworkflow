import React from 'react';
import { SkinRenderer } from '../types';

export const boatHelm: SkinRenderer = (config, geometry) => {
  const { size = 480, skin } = config;
  const { centerX, centerY, radius } = geometry;
  
  const {
    showHelm = true,
    showHandles = true,
    handleWidthFactor = 0.08, // Thinner spokes like the boat wheel
    handleLengthFactor = 0.35, // Shorter spokes
    ringOuterWidthFactor = 0.12, // Thicker wooden rim
    ringInnerWidthFactor = 0.04,
    hub,
    effects,
  } = skin;

  const handleWidth = size * handleWidthFactor;
  const handleLength = radius * handleLengthFactor;
  const ringOuterWidth = size * ringOuterWidthFactor;
  const ringInnerWidth = size * ringInnerWidthFactor;

  const rings = showHelm ? [
    // Outer wooden rim - thick like boat wheel
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#boatWoodRim)"
      strokeWidth={ringOuterWidth}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner rim detail
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth / 2}
      fill="none"
      stroke="url(#boatWoodRimInner)"
      strokeWidth={ringInnerWidth}
    />,
    // Wood grain accent on rim
    <circle
      key="wood-grain-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth * 0.3}
      fill="none"
      stroke="url(#boatWoodGrain)"
      strokeWidth={2}
      opacity={0.6}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Top handle - realistic turned wood with brass ends
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
      
      {/* Main turned wood handle */}
      <rect
        x={centerX - handleWidth * 0.4}
        y={centerY - radius - handleLength * 0.9}
        width={handleWidth * 0.8}
        height={handleLength * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedWoodHandle)"
        stroke="url(#turnedWoodStroke)"
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
        fill="url(#woodBulge)"
        stroke="url(#turnedWoodStroke)"
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
    // Bottom handle - realistic turned wood with brass ends
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
      
      {/* Main turned wood handle */}
      <rect
        x={centerX - handleWidth * 0.4}
        y={centerY + radius + handleLength * 0.1}
        width={handleWidth * 0.8}
        height={handleLength * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedWoodHandle)"
        stroke="url(#turnedWoodStroke)"
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
        fill="url(#woodBulge)"
        stroke="url(#turnedWoodStroke)"
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
    // Left handle - realistic turned wood with brass ends
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
      
      {/* Main turned wood handle */}
      <rect
        x={centerX - radius - handleLength * 0.9}
        y={centerY - handleWidth * 0.4}
        width={handleLength * 0.8}
        height={handleWidth * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedWoodHandle)"
        stroke="url(#turnedWoodStroke)"
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
        fill="url(#woodBulge)"
        stroke="url(#turnedWoodStroke)"
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
    // Right handle - realistic turned wood with brass ends
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
      
      {/* Main turned wood handle */}
      <rect
        x={centerX + radius + handleLength * 0.1}
        y={centerY - handleWidth * 0.4}
        width={handleLength * 0.8}
        height={handleWidth * 0.8}
        rx={handleWidth * 0.4}
        fill="url(#turnedWoodHandle)"
        stroke="url(#turnedWoodStroke)"
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
        fill="url(#woodBulge)"
        stroke="url(#turnedWoodStroke)"
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
    // Additional diagonal spokes for 6-spoke design like boat wheel
    <g key="spoke-top-right-group">
      <rect
        x={centerX + radius * 0.5}
        y={centerY - radius * 0.866 - handleLength * 0.7}
        width={handleWidth * 0.8}
        height={handleLength * 0.7}
        rx={handleWidth / 8}
        fill="url(#boatSpoke)"
        stroke="url(#boatSpokeStroke)"
        strokeWidth={1.5}
        transform={`rotate(30 ${centerX} ${centerY})`}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
    </g>,
    <g key="spoke-top-left-group">
      <rect
        x={centerX - radius * 0.5 - handleWidth * 0.8}
        y={centerY - radius * 0.866 - handleLength * 0.7}
        width={handleWidth * 0.8}
        height={handleLength * 0.7}
        rx={handleWidth / 8}
        fill="url(#boatSpoke)"
        stroke="url(#boatSpokeStroke)"
        strokeWidth={1.5}
        transform={`rotate(-30 ${centerX} ${centerY})`}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
    </g>,
  ] : [];

  const hubElement = hub?.show ? (
    <g key="hub-group">
      {/* Main chrome hub like boat wheel */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.09}
        fill={hub.fill || "url(#boatHub)"}
        stroke={hub.stroke || "url(#boatHubStroke)"}
        strokeWidth={3}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Chrome ring detail */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.07}
        fill="none"
        stroke="url(#chromeRing)"
        strokeWidth={2}
        opacity={0.8}
      />
      {/* Inner hub */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.04}
        fill="url(#boatHubInner)"
        stroke="url(#boatHubInnerStroke)"
        strokeWidth={2}
      />
      {/* Center chrome detail */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.02}
        fill="url(#chromeCenter)"
        stroke="#adb5bd"
        strokeWidth={1}
      />
    </g>
  ) : null;

  const filters = [
    // Boat helm gradients and materials
    <defs key="boat-gradients">
      {/* Wooden rim gradients - rich boat wood */}
      <linearGradient id="boatWoodRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D2691E" />
        <stop offset="25%" stopColor="#CD853F" />
        <stop offset="50%" stopColor="#A0522D" />
        <stop offset="75%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#654321" />
      </linearGradient>
      
      <linearGradient id="boatWoodRimInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#CD853F" />
        <stop offset="50%" stopColor="#A0522D" />
        <stop offset="100%" stopColor="#8B4513" />
      </linearGradient>
      
      <linearGradient id="boatWoodGrain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DEB887" />
        <stop offset="50%" stopColor="#D2691E" />
        <stop offset="100%" stopColor="#CD853F" />
      </linearGradient>
      
      {/* Chrome/stainless steel spokes */}
      <linearGradient id="boatSpoke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8f9fa" />
        <stop offset="20%" stopColor="#e9ecef" />
        <stop offset="40%" stopColor="#dee2e6" />
        <stop offset="60%" stopColor="#ced4da" />
        <stop offset="80%" stopColor="#adb5bd" />
        <stop offset="100%" stopColor="#868e96" />
      </linearGradient>
      
      <linearGradient id="boatSpokeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ced4da" />
        <stop offset="50%" stopColor="#adb5bd" />
        <stop offset="100%" stopColor="#868e96" />
      </linearGradient>
      
      {/* Chrome highlights */}
      <linearGradient id="chromeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f8f9fa" />
        <stop offset="100%" stopColor="#e9ecef" />
      </linearGradient>
      
      {/* Hub gradients */}
      <radialGradient id="boatHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#f8f9fa" />
        <stop offset="40%" stopColor="#e9ecef" />
        <stop offset="60%" stopColor="#dee2e6" />
        <stop offset="80%" stopColor="#ced4da" />
        <stop offset="100%" stopColor="#adb5bd" />
      </radialGradient>
      
      <linearGradient id="boatHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#adb5bd" />
        <stop offset="50%" stopColor="#868e96" />
        <stop offset="100%" stopColor="#6c757d" />
      </linearGradient>
      
      <linearGradient id="chromeRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#e9ecef" />
        <stop offset="100%" stopColor="#ced4da" />
      </linearGradient>
      
      <radialGradient id="boatHubInner" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#f8f9fa" />
        <stop offset="50%" stopColor="#e9ecef" />
        <stop offset="100%" stopColor="#dee2e6" />
      </radialGradient>
      
      <linearGradient id="boatHubInnerStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dee2e6" />
        <stop offset="50%" stopColor="#ced4da" />
        <stop offset="100%" stopColor="#adb5bd" />
      </linearGradient>
      
      <radialGradient id="chromeCenter" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#e9ecef" />
        <stop offset="50%" stopColor="#dee2e6" />
        <stop offset="100%" stopColor="#ced4da" />
      </radialGradient>
      
      {/* Realistic turned wood handle gradients */}
      <linearGradient id="turnedWoodHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D2691E" />
        <stop offset="25%" stopColor="#CD853F" />
        <stop offset="50%" stopColor="#A0522D" />
        <stop offset="75%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#654321" />
      </linearGradient>
      
      <linearGradient id="turnedWoodStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="50%" stopColor="#654321" />
        <stop offset="100%" stopColor="#5D4037" />
      </linearGradient>
      
      <radialGradient id="woodBulge" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#DEB887" />
        <stop offset="30%" stopColor="#D2691E" />
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
