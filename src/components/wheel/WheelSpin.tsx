'use client';

import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react';
import { WheelSpinProps, WheelSpinRef, WheelConfig } from './types';
import { DEFAULT_CONFIG, DEFAULT_SEGMENT_COLORS, DEFAULT_LABEL_COLORS, CSS_VARIABLES } from './defaults';
import { WheelSVG } from './renderers/svg/WheelSVG';
import { WheelPixi } from './renderers/pixi/WheelPixi';

/**
 * Main WheelSpin component with renderer selection
 */
export const WheelSpin = forwardRef<WheelSpinRef, WheelSpinProps>(
  ({ config, onResult, renderer = 'svg', className, style }, ref) => {
    const svgRef = useRef<WheelSpinRef>(null);
    const pixiRef = useRef<WheelSpinRef>(null);

    // Merge config with defaults and apply segment colors if not provided
    const mergedConfig = useMemo(() => {
      const merged = { ...DEFAULT_CONFIG, ...config };
      
      // Apply default colors to segments that don't have them
      merged.segments = merged.segments.map((segment, index) => ({
        ...segment,
        color: segment.color || DEFAULT_SEGMENT_COLORS[index % DEFAULT_SEGMENT_COLORS.length],
        labelColor: segment.labelColor || DEFAULT_LABEL_COLORS[index % DEFAULT_LABEL_COLORS.length],
      }));

      return merged;
    }, [config]);

    // Forward imperative API to the active renderer
    useImperativeHandle(ref, () => {
      const activeRef = renderer === 'pixi' ? pixiRef.current : svgRef.current;
      
      if (!activeRef) {
        throw new Error('Renderer not initialized');
      }

      return {
        spin: activeRef.spin,
        getRotation: activeRef.getRotation,
        setConfig: activeRef.setConfig,
      };
    }, [renderer]);

    // Validate segments
    if (!mergedConfig.segments || mergedConfig.segments.length === 0) {
      console.warn('WheelSpin: No segments provided');
      return null;
    }

    if (mergedConfig.segments.length < 2) {
      console.warn('WheelSpin: At least 2 segments are required');
      return null;
    }

    // Apply CSS variables for theming
    const wheelStyle: React.CSSProperties = {
      ...CSS_VARIABLES,
      ...style,
    };

    // Common props for both renderers
    const commonProps = {
      config: mergedConfig,
      onResult,
      className,
      style: wheelStyle,
    };

    // Render based on selected renderer
    if (renderer === 'pixi') {
      return <WheelPixi ref={pixiRef} {...commonProps} />;
    }

    return <WheelSVG ref={svgRef} {...commonProps} />;
  }
);

WheelSpin.displayName = 'WheelSpin';
