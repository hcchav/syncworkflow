import React from 'react';
import { SkinRenderer } from '../types';

export const rubberCoatedHelm: SkinRenderer = (config, geometry) => {
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
    // Outer rubber ring with textured appearance
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#rubberRingOuter)"
      strokeWidth={ringOuterWidth}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner rubber ring
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth / 2}
      fill="none"
      stroke="url(#rubberRingInner)"
      strokeWidth={ringInnerWidth}
    />,
    // Textured grip pattern ring
    <circle
      key="grip-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth * 0.3}
      fill="none"
      stroke="url(#rubberTexture)"
      strokeWidth={3}
      strokeDasharray="8,4"
      opacity={0.6}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Top handle with rubber coating
    <g key="handle-top-group">
      <rect
        x={centerX - handleWidth / 2}
        y={centerY - radius - handleLength}
        width={handleWidth}
        height={handleLength}
        rx={handleWidth / 4}
        fill="url(#rubberHandle)"
        stroke="url(#rubberHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Rubber grip texture */}
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={`grip-dot-top-${i}`}
          cx={centerX + (i % 2 === 0 ? -handleWidth / 6 : handleWidth / 6)}
          cy={centerY - radius - handleLength + (Math.floor(i / 2) + 1) * (handleLength / 5)}
          r={1.5}
          fill="#1a1a1a"
          opacity={0.4}
        />
      ))}
    </g>,
    // Bottom handle
    <g key="handle-bottom-group">
      <rect
        x={centerX - handleWidth / 2}
        y={centerY + radius}
        width={handleWidth}
        height={handleLength}
        rx={handleWidth / 4}
        fill="url(#rubberHandle)"
        stroke="url(#rubberHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={`grip-dot-bottom-${i}`}
          cx={centerX + (i % 2 === 0 ? -handleWidth / 6 : handleWidth / 6)}
          cy={centerY + radius + (Math.floor(i / 2) + 1) * (handleLength / 5)}
          r={1.5}
          fill="#1a1a1a"
          opacity={0.4}
        />
      ))}
    </g>,
    // Left handle
    <g key="handle-left-group">
      <rect
        x={centerX - radius - handleLength}
        y={centerY - handleWidth / 2}
        width={handleLength}
        height={handleWidth}
        rx={handleWidth / 4}
        fill="url(#rubberHandle)"
        stroke="url(#rubberHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={`grip-dot-left-${i}`}
          cx={centerX - radius - handleLength + (Math.floor(i / 2) + 1) * (handleLength / 5)}
          cy={centerY + (i % 2 === 0 ? -handleWidth / 6 : handleWidth / 6)}
          r={1.5}
          fill="#1a1a1a"
          opacity={0.4}
        />
      ))}
    </g>,
    // Right handle
    <g key="handle-right-group">
      <rect
        x={centerX + radius}
        y={centerY - handleWidth / 2}
        width={handleLength}
        height={handleWidth}
        rx={handleWidth / 4}
        fill="url(#rubberHandle)"
        stroke="url(#rubberHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={`grip-dot-right-${i}`}
          cx={centerX + radius + (Math.floor(i / 2) + 1) * (handleLength / 5)}
          cy={centerY + (i % 2 === 0 ? -handleWidth / 6 : handleWidth / 6)}
          r={1.5}
          fill="#1a1a1a"
          opacity={0.4}
        />
      ))}
    </g>,
  ] : [];

  const hubElement = hub?.show ? (
    <g key="hub-group">
      {/* Main hub with rubber-coated appearance */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill={hub.fill || "url(#rubberHub)"}
        stroke={hub.stroke || "url(#rubberHubStroke)"}
        strokeWidth={3}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Inner metallic center */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.04}
        fill="url(#metalCenter)"
        stroke="#2a2a2a"
        strokeWidth={2}
      />
      {/* Center logo area */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.02}
        fill="url(#rubberCenterDot)"
        stroke="#1a1a1a"
        strokeWidth={1}
      />
    </g>
  ) : null;

  const filters = [
    // Rubber coating gradients and textures
    <defs key="rubber-gradients">
      {/* Outer ring gradient */}
      <linearGradient id="rubberRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a4a4a" />
        <stop offset="25%" stopColor="#3a3a3a" />
        <stop offset="50%" stopColor="#2a2a2a" />
        <stop offset="75%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#0a0a0a" />
      </linearGradient>
      
      {/* Inner ring gradient */}
      <linearGradient id="rubberRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3a3a3a" />
        <stop offset="50%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      
      {/* Texture pattern */}
      <linearGradient id="rubberTexture" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5a5a5a" />
        <stop offset="50%" stopColor="#4a4a4a" />
        <stop offset="100%" stopColor="#3a3a3a" />
      </linearGradient>
      
      {/* Handle gradient */}
      <linearGradient id="rubberHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a4a4a" />
        <stop offset="30%" stopColor="#3a3a3a" />
        <stop offset="70%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      
      {/* Handle stroke */}
      <linearGradient id="rubberHandleStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2a2a2a" />
        <stop offset="50%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#0a0a0a" />
      </linearGradient>
      
      {/* Hub gradients */}
      <radialGradient id="rubberHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#5a5a5a" />
        <stop offset="30%" stopColor="#4a4a4a" />
        <stop offset="70%" stopColor="#3a3a3a" />
        <stop offset="100%" stopColor="#2a2a2a" />
      </radialGradient>
      
      <linearGradient id="rubberHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2a2a2a" />
        <stop offset="50%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#0a0a0a" />
      </linearGradient>
      
      {/* Metal center */}
      <radialGradient id="metalCenter" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#8a8a8a" />
        <stop offset="50%" stopColor="#6a6a6a" />
        <stop offset="100%" stopColor="#4a4a4a" />
      </radialGradient>
      
      {/* Center dot */}
      <radialGradient id="rubberCenterDot" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#3a3a3a" />
        <stop offset="50%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </radialGradient>

      {/* Rubber texture pattern */}
      <pattern id="rubberPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1" fill="#1a1a1a" opacity="0.3"/>
        <circle cx="15" cy="15" r="1" fill="#1a1a1a" opacity="0.3"/>
        <circle cx="10" cy="2" r="0.5" fill="#0a0a0a" opacity="0.2"/>
        <circle cx="2" cy="18" r="0.5" fill="#0a0a0a" opacity="0.2"/>
      </pattern>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="drop-shadow">
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.6)" />
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
