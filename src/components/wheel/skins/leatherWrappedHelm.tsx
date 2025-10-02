import React from 'react';
import { SkinRenderer } from '../types';

export const leatherWrappedHelm: SkinRenderer = (config, geometry) => {
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
    // Outer leather ring with rich texture
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#leatherRingOuter)"
      strokeWidth={ringOuterWidth}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner leather ring
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth / 2}
      fill="none"
      stroke="url(#leatherRingInner)"
      strokeWidth={ringInnerWidth}
    />,
    // Stitching detail ring
    <circle
      key="stitch-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth * 0.2}
      fill="none"
      stroke="#8B4513"
      strokeWidth={1.5}
      strokeDasharray="6,3"
      opacity={0.8}
    />,
    // Inner stitching ring
    <circle
      key="inner-stitch-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth * 0.2}
      fill="none"
      stroke="#8B4513"
      strokeWidth={1}
      strokeDasharray="4,2"
      opacity={0.6}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Top handle with leather wrapping
    <g key="handle-top-group">
      <rect
        x={centerX - handleWidth / 2}
        y={centerY - radius - handleLength}
        width={handleWidth}
        height={handleLength}
        rx={handleWidth / 3}
        fill="url(#leatherHandle)"
        stroke="url(#leatherHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Leather stitching lines */}
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={`stitch-top-${i}`}
          x1={centerX - handleWidth / 3}
          y1={centerY - radius - handleLength + (i + 1) * (handleLength / 7)}
          x2={centerX + handleWidth / 3}
          y2={centerY - radius - handleLength + (i + 1) * (handleLength / 7)}
          stroke="#8B4513"
          strokeWidth={1}
          strokeDasharray="3,2"
          opacity={0.7}
        />
      ))}
      {/* Leather texture dots */}
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={`texture-top-${i}`}
          cx={centerX + (i % 3 - 1) * (handleWidth / 4)}
          cy={centerY - radius - handleLength + (Math.floor(i / 3) + 1) * (handleLength / 5)}
          r={0.8}
          fill="#654321"
          opacity={0.3}
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
        rx={handleWidth / 3}
        fill="url(#leatherHandle)"
        stroke="url(#leatherHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={`stitch-bottom-${i}`}
          x1={centerX - handleWidth / 3}
          y1={centerY + radius + (i + 1) * (handleLength / 7)}
          x2={centerX + handleWidth / 3}
          y2={centerY + radius + (i + 1) * (handleLength / 7)}
          stroke="#8B4513"
          strokeWidth={1}
          strokeDasharray="3,2"
          opacity={0.7}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={`texture-bottom-${i}`}
          cx={centerX + (i % 3 - 1) * (handleWidth / 4)}
          cy={centerY + radius + (Math.floor(i / 3) + 1) * (handleLength / 5)}
          r={0.8}
          fill="#654321"
          opacity={0.3}
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
        rx={handleWidth / 3}
        fill="url(#leatherHandle)"
        stroke="url(#leatherHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={`stitch-left-${i}`}
          x1={centerX - radius - handleLength + (i + 1) * (handleLength / 7)}
          y1={centerY - handleWidth / 3}
          x2={centerX - radius - handleLength + (i + 1) * (handleLength / 7)}
          y2={centerY + handleWidth / 3}
          stroke="#8B4513"
          strokeWidth={1}
          strokeDasharray="3,2"
          opacity={0.7}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={`texture-left-${i}`}
          cx={centerX - radius - handleLength + (Math.floor(i / 3) + 1) * (handleLength / 5)}
          cy={centerY + (i % 3 - 1) * (handleWidth / 4)}
          r={0.8}
          fill="#654321"
          opacity={0.3}
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
        rx={handleWidth / 3}
        fill="url(#leatherHandle)"
        stroke="url(#leatherHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={`stitch-right-${i}`}
          x1={centerX + radius + (i + 1) * (handleLength / 7)}
          y1={centerY - handleWidth / 3}
          x2={centerX + radius + (i + 1) * (handleLength / 7)}
          y2={centerY + handleWidth / 3}
          stroke="#8B4513"
          strokeWidth={1}
          strokeDasharray="3,2"
          opacity={0.7}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={`texture-right-${i}`}
          cx={centerX + radius + (Math.floor(i / 3) + 1) * (handleLength / 5)}
          cy={centerY + (i % 3 - 1) * (handleWidth / 4)}
          r={0.8}
          fill="#654321"
          opacity={0.3}
        />
      ))}
    </g>,
  ] : [];

  const hubElement = hub?.show ? (
    <g key="hub-group">
      {/* Main hub with leather texture */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill={hub.fill || "url(#leatherHub)"}
        stroke={hub.stroke || "url(#leatherHubStroke)"}
        strokeWidth={3}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Decorative stitching around hub */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.06}
        fill="none"
        stroke="#8B4513"
        strokeWidth={1.5}
        strokeDasharray="4,2"
        opacity={0.8}
      />
      {/* Inner metallic center */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.03}
        fill="url(#leatherCenterMetal)"
        stroke="#654321"
        strokeWidth={2}
      />
      {/* Brand emboss area */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.015}
        fill="url(#leatherEmboss)"
        stroke="#5D4037"
        strokeWidth={1}
      />
    </g>
  ) : null;

  const filters = [
    // Leather gradients and textures
    <defs key="leather-gradients">
      {/* Outer ring gradient */}
      <linearGradient id="leatherRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="25%" stopColor="#795548" />
        <stop offset="50%" stopColor="#6D4C41" />
        <stop offset="75%" stopColor="#5D4037" />
        <stop offset="100%" stopColor="#4E342E" />
      </linearGradient>
      
      {/* Inner ring gradient */}
      <linearGradient id="leatherRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#795548" />
        <stop offset="50%" stopColor="#6D4C41" />
        <stop offset="100%" stopColor="#5D4037" />
      </linearGradient>
      
      {/* Handle gradient */}
      <linearGradient id="leatherHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="30%" stopColor="#795548" />
        <stop offset="70%" stopColor="#6D4C41" />
        <stop offset="100%" stopColor="#5D4037" />
      </linearGradient>
      
      {/* Handle stroke */}
      <linearGradient id="leatherHandleStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6D4C41" />
        <stop offset="50%" stopColor="#5D4037" />
        <stop offset="100%" stopColor="#4E342E" />
      </linearGradient>
      
      {/* Hub gradients */}
      <radialGradient id="leatherHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#A1887F" />
        <stop offset="30%" stopColor="#8D6E63" />
        <stop offset="70%" stopColor="#795548" />
        <stop offset="100%" stopColor="#6D4C41" />
      </radialGradient>
      
      <linearGradient id="leatherHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6D4C41" />
        <stop offset="50%" stopColor="#5D4037" />
        <stop offset="100%" stopColor="#4E342E" />
      </linearGradient>
      
      {/* Center metal */}
      <radialGradient id="leatherCenterMetal" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#BCAAA4" />
        <stop offset="50%" stopColor="#A1887F" />
        <stop offset="100%" stopColor="#8D6E63" />
      </radialGradient>
      
      {/* Embossed area */}
      <radialGradient id="leatherEmboss" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#795548" />
        <stop offset="50%" stopColor="#6D4C41" />
        <stop offset="100%" stopColor="#5D4037" />
      </radialGradient>

      {/* Leather texture pattern */}
      <pattern id="leatherPattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="0.5" fill="#654321" opacity="0.2"/>
        <circle cx="12" cy="12" r="0.5" fill="#654321" opacity="0.2"/>
        <circle cx="7" cy="1" r="0.3" fill="#5D4037" opacity="0.15"/>
        <circle cx="1" cy="14" r="0.3" fill="#5D4037" opacity="0.15"/>
        <path d="M2,8 Q7,6 12,8" stroke="#654321" strokeWidth="0.3" fill="none" opacity="0.1"/>
      </pattern>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="drop-shadow">
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.5)" />
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
