import React from 'react';
import { SkinRenderer } from '../types';

export const modernHelm: SkinRenderer = (config, geometry) => {
  const { size = 480, skin } = config;
  const { centerX, centerY, radius } = geometry;
  
  const {
    showHelm = true,
    showHandles = true,
    showSpokes = false,
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
    // Outer ring with modern gradient
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#modernRingOuter)"
      strokeWidth={ringOuterWidth}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner ring
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth / 2}
      fill="none"
      stroke="url(#modernRingInner)"
      strokeWidth={ringInnerWidth}
    />,
    // Accent ring
    <circle
      key="accent-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth + 2}
      fill="none"
      stroke="url(#modernAccent)"
      strokeWidth={1}
      opacity={0.7}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Modern handles with rounded caps
    <g key="handles">
      {/* Top handle */}
      <rect
        x={centerX - handleWidth / 2}
        y={centerY - radius - handleLength}
        width={handleWidth}
        height={handleLength}
        rx={handleWidth / 2}
        fill="url(#modernHandle)"
        stroke="url(#modernHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Bottom handle */}
      <rect
        x={centerX - handleWidth / 2}
        y={centerY + radius}
        width={handleWidth}
        height={handleLength}
        rx={handleWidth / 2}
        fill="url(#modernHandle)"
        stroke="url(#modernHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Left handle */}
      <rect
        x={centerX - radius - handleLength}
        y={centerY - handleWidth / 2}
        width={handleLength}
        height={handleWidth}
        rx={handleWidth / 2}
        fill="url(#modernHandle)"
        stroke="url(#modernHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Right handle */}
      <rect
        x={centerX + radius}
        y={centerY - handleWidth / 2}
        width={handleLength}
        height={handleWidth}
        rx={handleWidth / 2}
        fill="url(#modernHandle)"
        stroke="url(#modernHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
    </g>,
  ] : [];

  const hubElement = hub?.show ? (
    <g key="hub">
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill={hub.fill || "url(#modernHub)"}
        stroke={hub.stroke || "url(#modernHubStroke)"}
        strokeWidth={3}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.05}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
      />
    </g>
  ) : null;

  const filters = [
    // Modern gradients
    <defs key="modern-gradients">
      <linearGradient id="modernRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2c3e50" />
        <stop offset="50%" stopColor="#34495e" />
        <stop offset="100%" stopColor="#2c3e50" />
      </linearGradient>
      
      <linearGradient id="modernRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34495e" />
        <stop offset="50%" stopColor="#2c3e50" />
        <stop offset="100%" stopColor="#1a252f" />
      </linearGradient>
      
      <linearGradient id="modernAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3498db" />
        <stop offset="50%" stopColor="#2980b9" />
        <stop offset="100%" stopColor="#3498db" />
      </linearGradient>
      
      <linearGradient id="modernHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#95a5a6" />
        <stop offset="50%" stopColor="#7f8c8d" />
        <stop offset="100%" stopColor="#6c7b7d" />
      </linearGradient>
      
      <linearGradient id="modernHandleStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34495e" />
        <stop offset="100%" stopColor="#2c3e50" />
      </linearGradient>
      
      <radialGradient id="modernHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ecf0f1" />
        <stop offset="50%" stopColor="#bdc3c7" />
        <stop offset="100%" stopColor="#95a5a6" />
      </radialGradient>
      
      <linearGradient id="modernHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7f8c8d" />
        <stop offset="100%" stopColor="#6c7b7d" />
      </linearGradient>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="drop-shadow">
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.25)" />
        </filter>
      </defs>
    );
  }

  if (effects?.glow) {
    filters.push(
      <defs key="glow">
        <filter id="modernGlow" x="-50%" y="-50%" width="200%" height="200%">
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
    innerSpokes: showSpokes ? [
      // Modern inner spokes
      <line
        key="inner-spoke-vertical"
        x1={centerX}
        y1={centerY - radius * 0.75}
        x2={centerX}
        y2={centerY + radius * 0.75}
        stroke="url(#modernHandle)"
        strokeWidth={size * 0.006}
        opacity={0.7}
      />,
      <line
        key="inner-spoke-horizontal"
        x1={centerX - radius * 0.75}
        y1={centerY}
        x2={centerX + radius * 0.75}
        y2={centerY}
        stroke="url(#modernHandle)"
        strokeWidth={size * 0.006}
        opacity={0.7}
      />,
    ] : [],
    hub: hubElement,
    filters,
  };
};
