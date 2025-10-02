import React from 'react';
import { SkinRenderer } from '../types';

export const woodHelm: SkinRenderer = (config, geometry) => {
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
    // Outer ring
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#woodRingOuter)"
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
      stroke="url(#woodRingInner)"
      strokeWidth={ringInnerWidth}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Top handle
    <rect
      key="handle-top"
      x={centerX - handleWidth / 2}
      y={centerY - radius - handleLength}
      width={handleWidth}
      height={handleLength}
      rx={handleWidth / 4}
      fill="url(#woodHandle)"
      stroke="#4a3728"
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
      rx={handleWidth / 4}
      fill="url(#woodHandle)"
      stroke="#4a3728"
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
      rx={handleWidth / 4}
      fill="url(#woodHandle)"
      stroke="#4a3728"
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
      rx={handleWidth / 4}
      fill="url(#woodHandle)"
      stroke="#4a3728"
      strokeWidth={2}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
  ] : [];

  // Inner spokes (radial lines within the wheel)
  const innerSpokes = showSpokes ? [
    // Vertical spoke
    <line
      key="inner-spoke-vertical"
      x1={centerX}
      y1={centerY - radius * 0.8}
      x2={centerX}
      y2={centerY + radius * 0.8}
      stroke="url(#woodHandle)"
      strokeWidth={size * 0.008}
      opacity={0.8}
    />,
    // Horizontal spoke
    <line
      key="inner-spoke-horizontal"
      x1={centerX - radius * 0.8}
      y1={centerY}
      x2={centerX + radius * 0.8}
      y2={centerY}
      stroke="url(#woodHandle)"
      strokeWidth={size * 0.008}
      opacity={0.8}
    />,
    // Diagonal spokes
    <line
      key="inner-spoke-diagonal-1"
      x1={centerX - radius * 0.6}
      y1={centerY - radius * 0.6}
      x2={centerX + radius * 0.6}
      y2={centerY + radius * 0.6}
      stroke="url(#woodHandle)"
      strokeWidth={size * 0.006}
      opacity={0.6}
    />,
    <line
      key="inner-spoke-diagonal-2"
      x1={centerX - radius * 0.6}
      y1={centerY + radius * 0.6}
      x2={centerX + radius * 0.6}
      y2={centerY - radius * 0.6}
      stroke="url(#woodHandle)"
      strokeWidth={size * 0.006}
      opacity={0.6}
    />,
  ] : [];

  const hubElement = hub?.show ? (
    <circle
      key="hub"
      cx={centerX}
      cy={centerY}
      r={size * 0.08}
      fill={hub.fill || "url(#brassHub)"}
      stroke={hub.stroke || "#7a5a1a"}
      strokeWidth={3}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />
  ) : null;

  const filters = [
    // Wood gradients
    <defs key="wood-gradients">
      <linearGradient id="woodRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b4513" />
        <stop offset="50%" stopColor="#a0522d" />
        <stop offset="100%" stopColor="#654321" />
      </linearGradient>
      
      <linearGradient id="woodRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a0522d" />
        <stop offset="50%" stopColor="#8b4513" />
        <stop offset="100%" stopColor="#5d4037" />
      </linearGradient>
      
      <linearGradient id="woodHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6d4c41" />
        <stop offset="50%" stopColor="#5d4037" />
        <stop offset="100%" stopColor="#4e342e" />
      </linearGradient>
      
      <radialGradient id="brassHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="50%" stopColor="#daa520" />
        <stop offset="100%" stopColor="#b8860b" />
      </radialGradient>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="drop-shadow">
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
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
    innerSpokes,
    hub: hubElement,
    filters,
  };
};
