import { getAngleToSegment, normalizeAngle } from './geometry';
import { randomFloat, SeededRNG } from './rng';

/**
 * Easing functions for wheel rotation
 */
export const easingFunctions = {
  linear: (t: number): number => t,
  easeOut: (t: number): number => 1 - Math.pow(1 - t, 3),
  'power4.out': (t: number): number => 1 - Math.pow(1 - t, 4),
} as const;

/**
 * Calculate total rotation needed to land on target segment
 */
export function calculateTargetRotation(
  targetSegmentIndex: number,
  totalSegments: number,
  extraSpins: [number, number],
  pointerPosition: 'top' | 'right' = 'top',
  rng?: SeededRNG
): number {
  // Get base angle to target segment
  const baseAngle = getAngleToSegment(targetSegmentIndex, totalSegments, pointerPosition);
  
  // Add random jitter within the segment to avoid landing exactly on the edge
  const segmentAngle = 360 / totalSegments;
  const jitterRange = segmentAngle * 0.3; // Use 30% of segment for jitter
  const jitter = randomFloat(-jitterRange / 2, jitterRange / 2, rng);
  
  // Calculate number of extra full rotations
  const [minSpins, maxSpins] = extraSpins;
  const extraRotations = Math.floor(randomFloat(minSpins, maxSpins, rng)) * 360;
  
  // Total rotation = extra spins + base angle + jitter
  return extraRotations + baseAngle + jitter;
}

/**
 * Animation state for wheel rotation
 */
export class WheelAnimation {
  private startTime: number = 0;
  private startRotation: number = 0;
  private targetRotation: number = 0;
  private duration: number = 0;
  private easing: keyof typeof easingFunctions = 'power4.out';
  private isRunning: boolean = false;
  private animationId: number | null = null;
  private onUpdate?: (rotation: number) => void;
  private onComplete?: () => void;

  constructor(
    onUpdate?: (rotation: number) => void,
    onComplete?: () => void
  ) {
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
  }

  /**
   * Start the wheel animation
   */
  start(
    currentRotation: number,
    targetRotation: number,
    duration: number,
    easing: keyof typeof easingFunctions = 'power4.out'
  ): void {
    if (this.isRunning) {
      this.stop();
    }

    this.startRotation = currentRotation;
    this.targetRotation = targetRotation;
    this.duration = duration * 1000; // Convert to milliseconds
    this.easing = easing;
    this.isRunning = true;
    this.startTime = 0;

    this.animate();
  }

  /**
   * Stop the animation
   */
  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isRunning = false;
  }

  /**
   * Check if animation is currently running
   */
  getIsRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Get current rotation value
   */
  getCurrentRotation(): number {
    return this.startRotation;
  }

  /**
   * Animation loop
   */
  private animate = (timestamp: number = performance.now()): void => {
    if (!this.isRunning) return;

    if (this.startTime === 0) {
      this.startTime = timestamp;
    }

    const elapsed = timestamp - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);

    // Apply easing function
    const easedProgress = easingFunctions[this.easing](progress);

    // Calculate current rotation
    const rotationDelta = this.targetRotation - this.startRotation;
    const currentRotation = this.startRotation + (rotationDelta * easedProgress);

    // Update rotation
    if (this.onUpdate) {
      this.onUpdate(currentRotation);
    }

    if (progress >= 1) {
      // Animation complete
      this.isRunning = false;
      this.animationId = null;
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      // Continue animation
      this.animationId = requestAnimationFrame(this.animate);
    }
  };
}

/**
 * Calculate rotation speed at different points in animation
 */
export function calculateRotationSpeed(
  progress: number,
  totalRotation: number,
  duration: number,
  easing: keyof typeof easingFunctions = 'power4.out'
): number {
  const easingFunc = easingFunctions[easing];
  
  // Calculate derivative of easing function for speed
  const delta = 0.001;
  const currentEased = easingFunc(progress);
  const nextEased = easingFunc(Math.min(progress + delta, 1));
  
  const speedFactor = (nextEased - currentEased) / delta;
  return (totalRotation / duration) * speedFactor;
}

/**
 * Detect when wheel passes segment boundaries for tick sounds
 */
export function detectSegmentCrossings(
  previousRotation: number,
  currentRotation: number,
  totalSegments: number
): number[] {
  const segmentAngle = 360 / totalSegments;
  const prevSegment = Math.floor(normalizeAngle(previousRotation) / segmentAngle);
  const currentSegment = Math.floor(normalizeAngle(currentRotation) / segmentAngle);
  
  const crossings: number[] = [];
  
  // Handle rotation direction and multiple crossings
  const rotationDelta = currentRotation - previousRotation;
  const segmentsCrossed = Math.abs(Math.floor(rotationDelta / segmentAngle));
  
  if (segmentsCrossed > 0) {
    const direction = rotationDelta > 0 ? 1 : -1;
    
    for (let i = 1; i <= segmentsCrossed; i++) {
      const crossedSegment = (prevSegment + (i * direction) + totalSegments) % totalSegments;
      crossings.push(crossedSegment);
    }
  }
  
  return crossings;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Adjust animation parameters for reduced motion
 */
export function adjustForReducedMotion(
  duration: number,
  extraSpins: [number, number],
  easing: keyof typeof easingFunctions
): {
  duration: number;
  extraSpins: [number, number];
  easing: keyof typeof easingFunctions;
} {
  if (!prefersReducedMotion()) {
    return { duration, extraSpins, easing };
  }

  return {
    duration: Math.min(duration * 0.5, 1.5), // Reduce duration, max 1.5s
    extraSpins: [1, 2], // Reduce spins
    easing: 'easeOut', // Use gentler easing
  };
}
