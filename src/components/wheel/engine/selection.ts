import { SeededRNG, random } from './rng';

/**
 * Weighted selection algorithm
 * Returns index based on weights array
 */
export function weightedPick(
  weights: number[],
  rng?: SeededRNG
): number {
  if (weights.length === 0) {
    throw new Error('Weights array cannot be empty');
  }

  // Normalize weights to handle negative or zero values
  const normalizedWeights = weights.map(w => Math.max(0, w));
  const totalWeight = normalizedWeights.reduce((sum, weight) => sum + weight, 0);

  if (totalWeight === 0) {
    // All weights are zero, pick randomly
    return Math.floor(random(rng) * weights.length);
  }

  const randomValue = random(rng) * totalWeight;
  let currentWeight = 0;

  for (let i = 0; i < normalizedWeights.length; i++) {
    currentWeight += normalizedWeights[i];
    if (randomValue <= currentWeight) {
      return i;
    }
  }

  // Fallback (should never reach here)
  return normalizedWeights.length - 1;
}

/**
 * No-repeat selection queue
 * Ensures all indices are selected before repeating
 */
export class NoRepeatQueue {
  private availableIndices: number[] = [];
  private totalIndices: number;
  private rng?: SeededRNG;

  constructor(totalIndices: number, rng?: SeededRNG) {
    this.totalIndices = totalIndices;
    this.rng = rng;
    this.reset();
  }

  /**
   * Get next index without repeating until all are exhausted
   */
  next(weights?: number[]): number {
    if (this.availableIndices.length === 0) {
      this.reset();
    }

    if (weights && weights.length === this.totalIndices) {
      // Apply weights to available indices only
      const availableWeights = this.availableIndices.map(index => weights[index]);
      const selectedIndex = weightedPick(availableWeights, this.rng);
      const actualIndex = this.availableIndices[selectedIndex];
      
      // Remove selected index from available pool
      this.availableIndices.splice(selectedIndex, 1);
      return actualIndex;
    } else {
      // Random selection from available indices
      const randomIndex = Math.floor(random(this.rng) * this.availableIndices.length);
      const selectedIndex = this.availableIndices[randomIndex];
      
      // Remove selected index from available pool
      this.availableIndices.splice(randomIndex, 1);
      return selectedIndex;
    }
  }

  /**
   * Reset the queue to include all indices
   */
  reset(): void {
    this.availableIndices = Array.from({ length: this.totalIndices }, (_, i) => i);
  }

  /**
   * Check if all indices have been used
   */
  isExhausted(): boolean {
    return this.availableIndices.length === 0;
  }

  /**
   * Get remaining available indices
   */
  getAvailable(): number[] {
    return [...this.availableIndices];
  }

  /**
   * Get count of remaining indices
   */
  getRemainingCount(): number {
    return this.availableIndices.length;
  }
}

/**
 * Find segment index by label
 */
export function findSegmentByLabel(
  segments: Array<{ label: string }>,
  targetLabel: string
): number {
  const index = segments.findIndex(segment => 
    segment.label.toLowerCase() === targetLabel.toLowerCase()
  );
  
  if (index === -1) {
    throw new Error(`Segment with label "${targetLabel}" not found`);
  }
  
  return index;
}

/**
 * Select target index based on configuration
 */
export function selectTargetIndex(
  segments: Array<{ label: string }>,
  options: {
    targetIndex?: number | null;
    targetLabel?: string | null;
    weights?: number[];
    noRepeatQueue?: NoRepeatQueue;
    rng?: SeededRNG;
  }
): number {
  const { targetIndex, targetLabel, weights, noRepeatQueue, rng } = options;

  // Direct index override
  if (targetIndex !== null && targetIndex !== undefined) {
    if (targetIndex < 0 || targetIndex >= segments.length) {
      throw new Error(`Target index ${targetIndex} is out of bounds (0-${segments.length - 1})`);
    }
    return targetIndex;
  }

  // Label-based override
  if (targetLabel !== null && targetLabel !== undefined) {
    return findSegmentByLabel(segments, targetLabel);
  }

  // No-repeat queue selection
  if (noRepeatQueue) {
    return noRepeatQueue.next(weights);
  }

  // Weighted or equal probability selection
  if (weights && weights.length === segments.length) {
    return weightedPick(weights, rng);
  }

  // Equal probability selection
  const equalWeights = new Array(segments.length).fill(1);
  return weightedPick(equalWeights, rng);
}
