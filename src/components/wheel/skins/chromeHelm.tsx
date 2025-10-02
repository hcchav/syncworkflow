import React from 'react';
import { SkinRenderer } from '../types';

export const chromeHelm: SkinRenderer = (config, geometry) => {
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
    // Outer chrome ring with high reflectivity
    <circle
      key="outer-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth / 2}
      fill="none"
      stroke="url(#chromeRingOuter)"
      strokeWidth={ringOuterWidth}
      filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
    />,
    // Inner chrome ring
    <circle
      key="inner-ring"
      cx={centerX}
      cy={centerY}
      r={radius - ringInnerWidth / 2}
      fill="none"
      stroke="url(#chromeRingInner)"
      strokeWidth={ringInnerWidth}
    />,
    // Chrome highlight ring
    <circle
      key="highlight-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth * 0.7}
      fill="none"
      stroke="url(#chromeHighlight)"
      strokeWidth={2}
      opacity={0.8}
    />,
    // Chrome reflection ring
    <circle
      key="reflection-ring"
      cx={centerX}
      cy={centerY}
      r={radius + ringOuterWidth * 0.1}
      fill="none"
      stroke="url(#chromeReflection)"
      strokeWidth={1.5}
      opacity={0.6}
    />,
  ] : [];

  const handles = (showHelm && showHandles) ? [
    // Top handle with chrome finish
    <g key="handle-top-group">
      <rect
        x={centerX - handleWidth / 2}
        y={centerY - radius - handleLength}
        width={handleWidth}
        height={handleLength}
        rx={handleWidth / 8}
        fill="url(#chromeHandle)"
        stroke="url(#chromeHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Chrome highlight strips */}
      <rect
        x={centerX - handleWidth / 3}
        y={centerY - radius - handleLength + handleLength * 0.1}
        width={handleWidth / 8}
        height={handleLength * 0.8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      <rect
        x={centerX + handleWidth / 6}
        y={centerY - radius - handleLength + handleLength * 0.1}
        width={handleWidth / 8}
        height={handleLength * 0.8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      {/* Chrome reflection spots */}
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`reflection-top-${i}`}
          cx={centerX}
          cy={centerY - radius - handleLength + (i + 1) * (handleLength / 5)}
          rx={handleWidth / 6}
          ry={handleLength / 20}
          fill="url(#chromeReflectionSpot)"
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
        rx={handleWidth / 8}
        fill="url(#chromeHandle)"
        stroke="url(#chromeHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      <rect
        x={centerX - handleWidth / 3}
        y={centerY + radius + handleLength * 0.1}
        width={handleWidth / 8}
        height={handleLength * 0.8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      <rect
        x={centerX + handleWidth / 6}
        y={centerY + radius + handleLength * 0.1}
        width={handleWidth / 8}
        height={handleLength * 0.8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`reflection-bottom-${i}`}
          cx={centerX}
          cy={centerY + radius + (i + 1) * (handleLength / 5)}
          rx={handleWidth / 6}
          ry={handleLength / 20}
          fill="url(#chromeReflectionSpot)"
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
        rx={handleWidth / 8}
        fill="url(#chromeHandle)"
        stroke="url(#chromeHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      <rect
        x={centerX - radius - handleLength + handleLength * 0.1}
        y={centerY - handleWidth / 3}
        width={handleLength * 0.8}
        height={handleWidth / 8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      <rect
        x={centerX - radius - handleLength + handleLength * 0.1}
        y={centerY + handleWidth / 6}
        width={handleLength * 0.8}
        height={handleWidth / 8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`reflection-left-${i}`}
          cx={centerX - radius - handleLength + (i + 1) * (handleLength / 5)}
          cy={centerY}
          rx={handleLength / 20}
          ry={handleWidth / 6}
          fill="url(#chromeReflectionSpot)"
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
        rx={handleWidth / 8}
        fill="url(#chromeHandle)"
        stroke="url(#chromeHandleStroke)"
        strokeWidth={2}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      <rect
        x={centerX + radius + handleLength * 0.1}
        y={centerY - handleWidth / 3}
        width={handleLength * 0.8}
        height={handleWidth / 8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      <rect
        x={centerX + radius + handleLength * 0.1}
        y={centerY + handleWidth / 6}
        width={handleLength * 0.8}
        height={handleWidth / 8}
        rx={2}
        fill="url(#chromeHighlightStrip)"
        opacity={0.7}
      />
      {Array.from({ length: 4 }, (_, i) => (
        <ellipse
          key={`reflection-right-${i}`}
          cx={centerX + radius + (i + 1) * (handleLength / 5)}
          cy={centerY}
          rx={handleLength / 20}
          ry={handleWidth / 6}
          fill="url(#chromeReflectionSpot)"
          opacity={0.4}
        />
      ))}
    </g>,
  ] : [];

  const hubElement = hub?.show ? (
    <g key="hub-group">
      {/* Main chrome hub */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill={hub.fill || "url(#chromeHub)"}
        stroke={hub.stroke || "url(#chromeHubStroke)"}
        strokeWidth={3}
        filter={effects?.dropShadow ? "url(#dropShadow)" : undefined}
      />
      {/* Chrome highlight ring */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.065}
        fill="none"
        stroke="url(#chromeHighlight)"
        strokeWidth={2}
        opacity={0.8}
      />
      {/* Inner chrome center */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.04}
        fill="url(#chromeCenterInner)"
        stroke="url(#chromeCenterStroke)"
        strokeWidth={2}
      />
      {/* Chrome reflection highlight */}
      <ellipse
        cx={centerX - size * 0.02}
        cy={centerY - size * 0.02}
        rx={size * 0.025}
        ry={size * 0.015}
        fill="url(#chromeReflectionHighlight)"
        opacity={0.6}
      />
      {/* Center chrome bolt */}
      <circle
        cx={centerX}
        cy={centerY}
        r={size * 0.015}
        fill="url(#chromeBolt)"
        stroke="url(#chromeBoltStroke)"
        strokeWidth={1}
      />
    </g>
  ) : null;

  const filters = [
    // Chrome gradients and reflections
    <defs key="chrome-gradients">
      {/* Outer ring gradient */}
      <linearGradient id="chromeRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8f9fa" />
        <stop offset="15%" stopColor="#e9ecef" />
        <stop offset="30%" stopColor="#dee2e6" />
        <stop offset="45%" stopColor="#ced4da" />
        <stop offset="60%" stopColor="#adb5bd" />
        <stop offset="75%" stopColor="#868e96" />
        <stop offset="90%" stopColor="#6c757d" />
        <stop offset="100%" stopColor="#495057" />
      </linearGradient>
      
      {/* Inner ring gradient */}
      <linearGradient id="chromeRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e9ecef" />
        <stop offset="50%" stopColor="#ced4da" />
        <stop offset="100%" stopColor="#adb5bd" />
      </linearGradient>
      
      {/* Chrome highlight */}
      <linearGradient id="chromeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f8f9fa" />
        <stop offset="100%" stopColor="#e9ecef" />
      </linearGradient>
      
      {/* Chrome reflection */}
      <linearGradient id="chromeReflection" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#f1f3f4" />
        <stop offset="70%" stopColor="#e8eaed" />
        <stop offset="100%" stopColor="#dadce0" />
      </linearGradient>
      
      {/* Handle gradient */}
      <linearGradient id="chromeHandle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f8f9fa" />
        <stop offset="20%" stopColor="#e9ecef" />
        <stop offset="40%" stopColor="#dee2e6" />
        <stop offset="60%" stopColor="#ced4da" />
        <stop offset="80%" stopColor="#adb5bd" />
        <stop offset="100%" stopColor="#868e96" />
      </linearGradient>
      
      {/* Handle stroke */}
      <linearGradient id="chromeHandleStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ced4da" />
        <stop offset="50%" stopColor="#adb5bd" />
        <stop offset="100%" stopColor="#868e96" />
      </linearGradient>
      
      {/* Highlight strip */}
      <linearGradient id="chromeHighlightStrip" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f8f9fa" />
        <stop offset="100%" stopColor="#e9ecef" />
      </linearGradient>
      
      {/* Reflection spot */}
      <radialGradient id="chromeReflectionSpot" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f8f9fa" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      
      {/* Hub gradients */}
      <radialGradient id="chromeHub" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#f8f9fa" />
        <stop offset="40%" stopColor="#e9ecef" />
        <stop offset="60%" stopColor="#dee2e6" />
        <stop offset="80%" stopColor="#ced4da" />
        <stop offset="100%" stopColor="#adb5bd" />
      </radialGradient>
      
      <linearGradient id="chromeHubStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#adb5bd" />
        <stop offset="50%" stopColor="#868e96" />
        <stop offset="100%" stopColor="#6c757d" />
      </linearGradient>
      
      <radialGradient id="chromeCenterInner" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#f8f9fa" />
        <stop offset="50%" stopColor="#e9ecef" />
        <stop offset="100%" stopColor="#dee2e6" />
      </radialGradient>
      
      <linearGradient id="chromeCenterStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dee2e6" />
        <stop offset="50%" stopColor="#ced4da" />
        <stop offset="100%" stopColor="#adb5bd" />
      </linearGradient>
      
      <radialGradient id="chromeReflectionHighlight" cx="20%" cy="20%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#f8f9fa" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      
      <radialGradient id="chromeBolt" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#e9ecef" />
        <stop offset="50%" stopColor="#dee2e6" />
        <stop offset="100%" stopColor="#ced4da" />
      </radialGradient>
      
      <linearGradient id="chromeBoltStroke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ced4da" />
        <stop offset="50%" stopColor="#adb5bd" />
        <stop offset="100%" stopColor="#868e96" />
      </linearGradient>
    </defs>,
  ];

  if (effects?.dropShadow) {
    filters.push(
      <defs key="drop-shadow">
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>
    );
  }

  if (effects?.glow) {
    filters.push(
      <defs key="glow">
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
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
