'use client';

import React, { forwardRef, useImperativeHandle, useState, useCallback, useRef, useEffect } from 'react';
import { WheelConfig, WheelSpinRef, SpinResult, GeometryData, TickCallback } from '../../types';
import { DEFAULT_CONFIG, DEFAULT_SEGMENT_COLORS, DEFAULT_LABEL_COLORS } from '../../defaults';
import { calculateGeometry } from '../../engine/geometry';
import { createSeededRNG } from '../../engine/rng';
import { selectTargetIndex, NoRepeatQueue } from '../../engine/selection';
import { calculateTargetRotation, adjustForReducedMotion, detectSegmentCrossings } from '../../engine/kinematics';

interface WheelPixiProps {
  config: WheelConfig;
  onResult?: (result: SpinResult) => void;
  onTick?: TickCallback;
  className?: string;
  style?: React.CSSProperties;
}

export const WheelPixi = forwardRef<WheelSpinRef, WheelPixiProps>(
  ({ config, onResult, onTick, className, style }, ref) => {
    const [currentRotation, setCurrentRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [geometry, setGeometry] = useState<GeometryData | null>(null);
    const [pixiApp, setPixiApp] = useState<any>(null);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const wheelContainerRef = useRef<any>(null);
    const noRepeatQueueRef = useRef<NoRepeatQueue | null>(null);
    const previousRotationRef = useRef(0);
    const configRef = useRef(config);
    const gsapRef = useRef<any>(null);

    // Merge config with defaults
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const { size, pointer, spin, selection, segments, skin } = mergedConfig;

    // Update config ref when config changes
    useEffect(() => {
      configRef.current = mergedConfig;
    }, [mergedConfig]);

    // Initialize PixiJS app
    useEffect(() => {
      const initPixi = async () => {
        try {
          // Dynamic import to avoid SSR issues
          const PIXI = await import('pixi.js');
          const gsap = await import('gsap');
          
          gsapRef.current = gsap;

          if (containerRef.current && !pixiApp) {
            const app = new PIXI.Application({
              width: size,
              height: size,
              backgroundColor: 0x000000,
              backgroundAlpha: 0,
              antialias: true,
            });

            await app.init();
            containerRef.current.appendChild(app.canvas);
            
            // Create wheel container
            const wheelContainer = new PIXI.Container();
            wheelContainer.x = size! / 2;
            wheelContainer.y = size! / 2;
            app.stage.addChild(wheelContainer);
            
            wheelContainerRef.current = wheelContainer;
            setPixiApp(app);
          }
        } catch (error) {
          console.error('Failed to initialize PixiJS:', error);
          // Fallback to SVG renderer would be handled by parent component
        }
      };

      initPixi();

      return () => {
        if (pixiApp) {
          pixiApp.destroy(true);
          setPixiApp(null);
        }
      };
    }, [size, pixiApp]);

    // Initialize geometry when segments change
    useEffect(() => {
      if (segments.length > 0) {
        const newGeometry = calculateGeometry(size!, segments.length);
        setGeometry(newGeometry);
      }
    }, [segments, size]);

    // Initialize no-repeat queue
    useEffect(() => {
      if (selection.noRepeatUntilExhausted && segments.length > 0) {
        const rng = selection.seed ? createSeededRNG(selection.seed) : undefined;
        noRepeatQueueRef.current = new NoRepeatQueue(segments.length, rng);
      } else {
        noRepeatQueueRef.current = null;
      }
    }, [selection.noRepeatUntilExhausted, selection.seed, segments.length]);

    // Render wheel segments
    useEffect(() => {
      const renderWheel = async () => {
        if (!pixiApp || !geometry || !wheelContainerRef.current) return;

        const PIXI = await import('pixi.js');
        const wheelContainer = wheelContainerRef.current;
        
        // Clear existing graphics
        wheelContainer.removeChildren();

        // Create segments
        segments.forEach((segment, index) => {
          const segmentGeometry = geometry.segments[index];
          const graphics = new PIXI.Graphics();
          
          // Draw segment
          const color = segment.color || DEFAULT_SEGMENT_COLORS[index % DEFAULT_SEGMENT_COLORS.length];
          graphics.beginFill(color.replace('#', '0x'));
          
          // Create segment path using moveTo and lineTo
          const startAngle = (segmentGeometry.startAngle * Math.PI) / 180;
          const endAngle = (segmentGeometry.endAngle * Math.PI) / 180;
          const radius = geometry.radius;
          
          graphics.moveTo(0, 0);
          graphics.lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle));
          graphics.arc(0, 0, radius, startAngle, endAngle);
          graphics.lineTo(0, 0);
          graphics.endFill();
          
          // Add stroke
          graphics.lineStyle(skin.separator.strokeWidth || 2, skin.separator.stroke?.replace('#', '0x') || 0x555555);
          graphics.drawCircle(0, 0, radius);
          
          wheelContainer.addChild(graphics);
          
          // Add text
          const textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: size! * 0.03,
            fontWeight: '600',
            fill: segment.labelColor || DEFAULT_LABEL_COLORS[index % DEFAULT_LABEL_COLORS.length],
            align: 'center',
          });
          
          const text = new PIXI.Text(segment.label, textStyle);
          text.anchor.set(0.5);
          text.x = segmentGeometry.textPosition.x - geometry.centerX;
          text.y = segmentGeometry.textPosition.y - geometry.centerY;
          text.rotation = (segmentGeometry.textPosition.angle * Math.PI) / 180;
          
          wheelContainer.addChild(text);
        });

        // Add hub
        if (skin.hub?.show) {
          const hubGraphics = new PIXI.Graphics();
          const hubRadius = size! * 0.08;
          hubGraphics.beginFill(skin.hub.fill?.replace('#', '0x') || 0xffe08a);
          hubGraphics.drawCircle(0, 0, hubRadius);
          hubGraphics.endFill();
          
          if (skin.hub.stroke) {
            hubGraphics.lineStyle(3, skin.hub.stroke.replace('#', '0x'));
            hubGraphics.drawCircle(0, 0, hubRadius);
          }
          
          wheelContainer.addChild(hubGraphics);
        }
      };

      renderWheel();
    }, [pixiApp, geometry, segments, skin, size]);

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
      
      // Update PixiJS rotation
      if (wheelContainerRef.current) {
        wheelContainerRef.current.rotation = (rotation * Math.PI) / 180;
      }
    }, [onTick, geometry]);

    // Spin function
    const spinWheel = useCallback(async (opts?: { targetIndex?: number; targetLabel?: string }): Promise<SpinResult> => {
      if (isSpinning || !geometry || !gsapRef.current) {
        throw new Error('Wheel is already spinning or not initialized');
      }

      const currentConfig = configRef.current;
      const rng = currentConfig.selection.seed ? createSeededRNG(currentConfig.selection.seed) : undefined;

      // Determine target index
      const targetIndex = selectTargetIndex(currentConfig.segments, {
        targetIndex: opts?.targetIndex ?? currentConfig.selection.targetIndex,
        targetLabel: opts?.targetLabel ?? currentConfig.selection.targetLabel,
        weights: currentConfig.selection.weights,
        noRepeatQueue: noRepeatQueueRef.current ?? undefined,
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
        // Use GSAP for animation
        const gsap = gsapRef.current;
        const ease = adjustedParams.easing === 'linear' ? 'none' : 
                    adjustedParams.easing === 'power4.out' ? 'power4.out' : 'power2.out';

        gsap.to({ rotation: currentRotation }, {
          rotation: targetRotation,
          duration: adjustedParams.duration,
          ease,
          onUpdate: function() {
            handleRotationUpdate(this.targets()[0].rotation);
          },
          onComplete: () => {
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
        });
      });
    }, [isSpinning, geometry, currentRotation, onResult, handleRotationUpdate]);

    // Imperative API
    useImperativeHandle(ref, () => ({
      spin: spinWheel,
      getRotation: () => currentRotation,
      setConfig: (patch: Partial<WheelConfig>) => {
        configRef.current = { ...configRef.current, ...patch };
      },
    }), [spinWheel, currentRotation]);

    if (!geometry || segments.length === 0) {
      return null;
    }

    return (
      <div 
        ref={containerRef}
        className={className} 
        style={style}
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
      />
    );
  }
);

WheelPixi.displayName = 'WheelPixi';
