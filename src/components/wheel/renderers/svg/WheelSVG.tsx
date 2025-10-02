'use client';

import React, { forwardRef, useImperativeHandle, useState, useCallback, useRef, useEffect } from 'react';
import { WheelConfig, WheelSpinRef, SpinResult, GeometryData, TickCallback } from '../../types';
import { DEFAULT_CONFIG, DEFAULT_SEGMENT_COLORS, DEFAULT_LABEL_COLORS } from '../../defaults';
import { calculateGeometry } from '../../engine/geometry';
import { createSeededRNG } from '../../engine/rng';
import { selectTargetIndex, NoRepeatQueue } from '../../engine/selection';
import { calculateTargetRotation, adjustForReducedMotion, detectSegmentCrossings } from '../../engine/kinematics';
import { getSkinRenderer } from '../../skins/registry';

interface WheelSVGProps {
  config: WheelConfig;
  onResult?: (result: SpinResult) => void;
  onTick?: TickCallback;
  className?: string;
  style?: React.CSSProperties;
}

export const WheelSVG = forwardRef<WheelSpinRef, WheelSVGProps>(
  ({ config, onResult, onTick, className, style }, ref) => {
    const [currentRotation, setCurrentRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [geometry, setGeometry] = useState<GeometryData | null>(null);
    
    const noRepeatQueueRef = useRef<NoRepeatQueue | null>(null);
    const previousRotationRef = useRef(0);
    const configRef = useRef(config);

    // Merge config with defaults
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const { size, pointer, spin, selection, segments, skin } = mergedConfig;

    // Update config ref when config changes
    useEffect(() => {
      configRef.current = mergedConfig;
    }, [mergedConfig]);

    // Initialize geometry when segments change
    useEffect(() => {
      console.log('Geometry init:', { segmentsLength: segments.length, size, hasSize: !!size, segments });
      if (segments.length > 0 && size) {
        try {
          const newGeometry = calculateGeometry(size, segments.length);
          console.log('Geometry created successfully:', newGeometry);
          setGeometry(newGeometry);
        } catch (error) {
          console.error('Geometry calculation failed:', error);
        }
      } else {
        console.warn('Cannot create geometry:', { segmentsLength: segments.length, size });
      }
    }, [segments, size]);

    // Force geometry initialization on mount if not already done
    useEffect(() => {
      const timer = setTimeout(() => {
        if (!geometry && segments.length > 0 && size) {
          console.log('Force initializing geometry after mount...');
          try {
            const newGeometry = calculateGeometry(size, segments.length);
            setGeometry(newGeometry);
          } catch (error) {
            console.error('Force geometry init failed:', error);
          }
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }, [geometry, segments.length, size]);

    // Initialize no-repeat queue
    useEffect(() => {
      if (selection.noRepeatUntilExhausted && segments.length > 0) {
        const rng = selection.seed ? createSeededRNG(selection.seed) : undefined;
        noRepeatQueueRef.current = new NoRepeatQueue(segments.length, rng);
      } else {
        noRepeatQueueRef.current = null;
      }
    }, [selection.noRepeatUntilExhausted, selection.seed, segments.length]);

    // Handle rotation updates for tick detection
    const handleRotationUpdate = useCallback((rotation: number) => {
      if (onTick && geometry) {
        const crossings = detectSegmentCrossings(
          previousRotationRef.current,
          rotation,
          geometry.segments.length
        );
        
        crossings.forEach(segmentIndex => {
          onTick(segmentIndex);
        });
      }
      
      previousRotationRef.current = rotation;
      setCurrentRotation(rotation);
    }, [onTick, geometry]);

    // Spin function
    const spinWheel = useCallback(async (opts?: { targetIndex?: number; targetLabel?: string }): Promise<SpinResult> => {
      if (isSpinning) {
        throw new Error('Wheel is already spinning');
      }
      
      // Try to initialize geometry if missing
      let currentGeometry = geometry;
      if (!currentGeometry && segments.length > 0 && size) {
        console.log('Attempting to initialize geometry during spin...');
        try {
          currentGeometry = calculateGeometry(size, segments.length);
          setGeometry(currentGeometry);
          console.log('Geometry initialized during spin:', currentGeometry);
        } catch (error) {
          console.error('Failed to initialize geometry:', error);
          throw new Error('Failed to initialize wheel geometry');
        }
      }
      
      if (!currentGeometry) {
        console.error('Geometry still missing after initialization attempt');
        throw new Error('Wheel is not initialized - geometry missing');
      }

      const currentConfig = configRef.current;
      const rng = currentConfig.selection.seed ? createSeededRNG(currentConfig.selection.seed) : undefined;

      // Determine target index
      const targetIndex = selectTargetIndex(currentConfig.segments, {
        targetIndex: opts?.targetIndex ?? currentConfig.selection.targetIndex,
        targetLabel: opts?.targetLabel ?? currentConfig.selection.targetLabel,
        weights: currentConfig.selection.weights,
        noRepeatQueue: noRepeatQueueRef.current || undefined,
        rng,
      });

      // Adjust for reduced motion
      const adjustedParams = adjustForReducedMotion(
        currentConfig.spin.duration!,
        currentConfig.spin.extraSpins!,
        currentConfig.spin.easing!
      );

      // Calculate target rotation
      const targetRotation = currentRotation + calculateTargetRotation(
        targetIndex,
        currentConfig.segments.length,
        adjustedParams.extraSpins,
        currentConfig.pointer === 'right' ? 'right' : 'top',
        rng
      );

      setIsSpinning(true);

      return new Promise((resolve) => {
        // Animate rotation using requestAnimationFrame for smooth animation
        const startTime = performance.now();
        const startRotation = currentRotation;
        const rotationDiff = targetRotation - startRotation;
        const duration = adjustedParams.duration * 1000; // Convert to milliseconds

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Apply easing
          let easedProgress = progress;
          if (adjustedParams.easing === 'power4.out') {
            easedProgress = 1 - Math.pow(1 - progress, 4);
          } else if (adjustedParams.easing === 'easeOut') {
            easedProgress = 1 - Math.pow(1 - progress, 2);
          }
          
          const newRotation = startRotation + (rotationDiff * easedProgress);
          handleRotationUpdate(newRotation);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Animation complete
            setIsSpinning(false);
            const result = {
              index: targetIndex,
              segment: currentConfig.segments[targetIndex],
            };
            
            if (onResult) {
              onResult(result);
            }
            
            resolve(result);
          }
        };

        requestAnimationFrame(animate);
      });
    }, [isSpinning, geometry, currentRotation, onResult, handleRotationUpdate]);

    // Imperative API
    useImperativeHandle(ref, () => ({
      spin: spinWheel,
      getRotation: () => currentRotation,
      setConfig: (patch: Partial<WheelConfig>) => {
        configRef.current = { ...configRef.current, ...patch };
      },
      // Debug methods
      isReady: () => {
        const ready = !!geometry && !isSpinning && segments.length > 0 && !!size;
        console.log('isReady check:', { hasGeometry: !!geometry, isSpinning, segmentsLength: segments.length, size, ready });
        return ready;
      },
      reset: () => {
        console.log('Resetting wheel state');
        setIsSpinning(false);
        setCurrentRotation(0);
        // Try to reinitialize geometry
        if (segments.length > 0 && size) {
          const newGeometry = calculateGeometry(size, segments.length);
          setGeometry(newGeometry);
        }
      },
    }), [spinWheel, currentRotation, geometry, isSpinning, segments, size]);

    if (!geometry || segments.length === 0) {
      return null;
    }

    // Get skin renderer
    const skinRenderer = getSkinRenderer(skin.name);
    const skinElements = skinRenderer(mergedConfig, geometry);

    // Create pointer element
    const createPointer = () => {
      if (pointer === 'none') return null;

      const pointerSize = size! * 0.05;
      const pointerOffset = geometry.centerY - geometry.radius; // Position right at wheel border

      if (pointer === 'top') {
        return (
          <polygon
            points={`${geometry.centerX},${pointerOffset + pointerSize * 1.5} ${geometry.centerX - pointerSize},${pointerOffset} ${geometry.centerX + pointerSize},${pointerOffset}`}
            fill="#ff4444"
            stroke="#cc0000"
            strokeWidth={2}
            filter="url(#pointerShadow)"
          />
        );
      } else {
        return (
          <polygon
            points={`${size! - pointerOffset},${geometry.centerY} ${size! - pointerOffset - pointerSize * 1.5},${geometry.centerY - pointerSize} ${size! - pointerOffset - pointerSize * 1.5},${geometry.centerY + pointerSize}`}
            fill="#ff4444"
            stroke="#cc0000"
            strokeWidth={2}
            filter="url(#pointerShadow)"
          />
        );
      }
    };

    return (
      <div 
        className={className} 
        style={{
          ...style,
          overflow: 'visible'
        }}
        role="button"
        tabIndex={0}
        aria-label="Spin the wheel"
        aria-busy={isSpinning}
        onClick={() => !isSpinning && spinWheel()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isSpinning) {
            e.preventDefault();
            spinWheel();
          }
        }}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%',
            overflow: 'visible'
          }}
        >
          <defs>
            {/* Pointer shadow */}
            <filter id="pointerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
            </filter>
            
            {/* Segment gradients */}
            {segments.map((segment, index) => (
              <linearGradient key={`gradient-${index}`} id={`segmentGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={segment.color || DEFAULT_SEGMENT_COLORS[index % DEFAULT_SEGMENT_COLORS.length]} />
                <stop offset="100%" stopColor={segment.color || DEFAULT_SEGMENT_COLORS[index % DEFAULT_SEGMENT_COLORS.length]} stopOpacity="0.8" />
              </linearGradient>
            ))}
          </defs>

          {/* Render skin filters */}
          {skinElements.filters}

          {/* Render skin rings (behind wheel) */}
          {skinElements.rings}

          {/* Animated wheel group */}
          <g
            transform={`rotate(${currentRotation} ${geometry.centerX} ${geometry.centerY})`}
          >
            {/* Render segments */}
            {geometry.segments.map((segmentGeometry, index) => {
              const segment = segments[index];
              const labelColor = segment.labelColor || DEFAULT_LABEL_COLORS[index % DEFAULT_LABEL_COLORS.length];
              
              return (
                <g key={index}>
                  {/* Segment path */}
                  <path
                    d={segmentGeometry.path}
                    fill={`url(#segmentGradient-${index})`}
                    stroke={skin.separator.stroke}
                    strokeWidth={skin.separator.strokeWidth}
                    strokeDasharray={skin.separator.dashed ? "5,5" : undefined}
                  />
                  
                  {/* Segment text */}
                  <text
                    x={segmentGeometry.textPosition.x}
                    y={segmentGeometry.textPosition.y}
                    fill={labelColor}
                    fontSize={size! * 0.03}
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${segmentGeometry.textPosition.angle}, ${segmentGeometry.textPosition.x}, ${segmentGeometry.textPosition.y})`}
                    style={{ userSelect: 'none' }}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}

            {/* Render inner spokes */}
            {skinElements.innerSpokes}

            {/* Render skin hub */}
            {skinElements.hub}
          </g>

          {/* Render skin handles (in front of wheel) */}
          {skinElements.handles}

          {/* Pointer */}
          {createPointer()}
        </svg>
      </div>
    );
  }
);

WheelSVG.displayName = 'WheelSVG';
