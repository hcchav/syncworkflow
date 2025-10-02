/**
 * Seeded random number generator using a simple LCG algorithm
 * Provides deterministic random numbers when seed is provided
 */
export class SeededRNG {
  private seed: number;
  private originalSeed: number;

  constructor(seed?: number | string | null) {
    if (seed === null || seed === undefined) {
      this.seed = Math.random() * 2147483647;
    } else if (typeof seed === 'string') {
      this.seed = this.hashString(seed);
    } else {
      this.seed = seed;
    }
    this.originalSeed = this.seed;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Generate next random number between 0 and 1
   */
  next(): number {
    // Linear Congruential Generator
    this.seed = (this.seed * 1664525 + 1013904223) % 2147483647;
    return this.seed / 2147483647;
  }

  /**
   * Generate random integer between min (inclusive) and max (inclusive)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generate random float between min and max
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Reset to original seed
   */
  reset(): void {
    this.seed = this.originalSeed;
  }

  /**
   * Get current seed value
   */
  getSeed(): number {
    return this.originalSeed;
  }
}

/**
 * Create a new seeded RNG instance
 */
export function createSeededRNG(seed?: number | string | null): SeededRNG {
  return new SeededRNG(seed);
}

/**
 * Generate a random number using Math.random or seeded RNG
 */
export function random(rng?: SeededRNG): number {
  return rng ? rng.next() : Math.random();
}

/**
 * Generate random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number, rng?: SeededRNG): number {
  if (rng) {
    return rng.nextInt(min, max);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random float between min and max
 */
export function randomFloat(min: number, max: number, rng?: SeededRNG): number {
  if (rng) {
    return rng.nextFloat(min, max);
  }
  return Math.random() * (max - min) + min;
}
