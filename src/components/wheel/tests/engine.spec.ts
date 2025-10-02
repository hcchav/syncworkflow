import { describe, it, expect, beforeEach } from 'vitest';
import { SeededRNG, createSeededRNG } from '../engine/rng';
import { weightedPick, NoRepeatQueue, findSegmentByLabel, selectTargetIndex } from '../engine/selection';
import { 
  calculateGeometry, 
  getSegmentCenterAngle, 
  getAngleToSegment, 
  normalizeAngle,
  degreesToRadians,
  radiansToDegrees
} from '../engine/geometry';
import { 
  calculateTargetRotation, 
  adjustForReducedMotion, 
  detectSegmentCrossings 
} from '../engine/kinematics';

describe('RNG Engine', () => {
  describe('SeededRNG', () => {
    it('should produce deterministic results with same seed', () => {
      const rng1 = new SeededRNG(12345);
      const rng2 = new SeededRNG(12345);
      
      const values1 = Array.from({ length: 10 }, () => rng1.next());
      const values2 = Array.from({ length: 10 }, () => rng2.next());
      
      expect(values1).toEqual(values2);
    });

    it('should produce different results with different seeds', () => {
      const rng1 = new SeededRNG(12345);
      const rng2 = new SeededRNG(54321);
      
      const values1 = Array.from({ length: 10 }, () => rng1.next());
      const values2 = Array.from({ length: 10 }, () => rng2.next());
      
      expect(values1).not.toEqual(values2);
    });

    it('should handle string seeds', () => {
      const rng1 = new SeededRNG('test');
      const rng2 = new SeededRNG('test');
      
      expect(rng1.next()).toBe(rng2.next());
    });

    it('should generate values between 0 and 1', () => {
      const rng = new SeededRNG(12345);
      
      for (let i = 0; i < 100; i++) {
        const value = rng.next();
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    });

    it('should reset to original seed', () => {
      const rng = new SeededRNG(12345);
      const firstValue = rng.next();
      
      rng.next(); // Generate more values
      rng.next();
      
      rng.reset();
      expect(rng.next()).toBe(firstValue);
    });
  });

  describe('createSeededRNG', () => {
    it('should create RNG with seed', () => {
      const rng = createSeededRNG(12345);
      expect(rng).toBeInstanceOf(SeededRNG);
      expect(rng.getSeed()).toBe(12345);
    });

    it('should handle null seed', () => {
      const rng = createSeededRNG(null);
      expect(rng).toBeInstanceOf(SeededRNG);
    });
  });
});

describe('Selection Engine', () => {
  describe('weightedPick', () => {
    it('should return valid indices', () => {
      const weights = [1, 2, 3, 4];
      const rng = new SeededRNG(12345);
      
      for (let i = 0; i < 100; i++) {
        const index = weightedPick(weights, rng);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(weights.length);
      }
    });

    it('should respect weight distribution roughly', () => {
      const weights = [1, 0, 0, 0]; // Only first item should be selected
      const rng = new SeededRNG(12345);
      
      for (let i = 0; i < 10; i++) {
        expect(weightedPick(weights, rng)).toBe(0);
      }
    });

    it('should handle zero weights', () => {
      const weights = [0, 0, 0, 0];
      const rng = new SeededRNG(12345);
      
      const index = weightedPick(weights, rng);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(weights.length);
    });

    it('should throw error for empty weights', () => {
      expect(() => weightedPick([], new SeededRNG(12345))).toThrow();
    });
  });

  describe('NoRepeatQueue', () => {
    let queue: NoRepeatQueue;

    beforeEach(() => {
      queue = new NoRepeatQueue(4, new SeededRNG(12345));
    });

    it('should cycle through all indices before repeating', () => {
      const selected = new Set<number>();
      
      // First cycle - should get all 4 indices
      for (let i = 0; i < 4; i++) {
        const index = queue.next();
        selected.add(index);
      }
      
      expect(selected.size).toBe(4);
      expect(selected).toEqual(new Set([0, 1, 2, 3]));
    });

    it('should reset after exhaustion', () => {
      // Exhaust the queue
      for (let i = 0; i < 4; i++) {
        queue.next();
      }
      
      expect(queue.isExhausted()).toBe(true);
      
      // Next call should reset and return valid index
      const index = queue.next();
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(4);
      expect(queue.getRemainingCount()).toBe(3);
    });

    it('should handle weights correctly', () => {
      const weights = [1, 0, 0, 0]; // Only first item has weight
      
      // Should still cycle through all, but first item more likely when available
      const firstIndex = queue.next(weights);
      expect(firstIndex).toBe(0); // With these weights and seed, should pick 0 first
    });
  });

  describe('findSegmentByLabel', () => {
    const segments = [
      { label: 'Coffee' },
      { label: 'Tea' },
      { label: 'Water' }
    ];

    it('should find segment by exact label', () => {
      expect(findSegmentByLabel(segments, 'Coffee')).toBe(0);
      expect(findSegmentByLabel(segments, 'Tea')).toBe(1);
      expect(findSegmentByLabel(segments, 'Water')).toBe(2);
    });

    it('should be case insensitive', () => {
      expect(findSegmentByLabel(segments, 'coffee')).toBe(0);
      expect(findSegmentByLabel(segments, 'COFFEE')).toBe(0);
    });

    it('should throw error for non-existent label', () => {
      expect(() => findSegmentByLabel(segments, 'Juice')).toThrow();
    });
  });

  describe('selectTargetIndex', () => {
    const segments = [
      { label: 'Coffee' },
      { label: 'Tea' },
      { label: 'Water' }
    ];

    it('should return direct target index', () => {
      const result = selectTargetIndex(segments, { targetIndex: 1 });
      expect(result).toBe(1);
    });

    it('should return index by label', () => {
      const result = selectTargetIndex(segments, { targetLabel: 'Tea' });
      expect(result).toBe(1);
    });

    it('should throw error for invalid target index', () => {
      expect(() => selectTargetIndex(segments, { targetIndex: 5 })).toThrow();
    });

    it('should use weights when provided', () => {
      const weights = [1, 0, 0]; // Only first segment
      const rng = new SeededRNG(12345);
      
      const result = selectTargetIndex(segments, { weights, rng });
      expect(result).toBe(0);
    });
  });
});

describe('Geometry Engine', () => {
  describe('angle utilities', () => {
    it('should convert degrees to radians correctly', () => {
      expect(degreesToRadians(0)).toBe(0);
      expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
      expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
      expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
    });

    it('should convert radians to degrees correctly', () => {
      expect(radiansToDegrees(0)).toBe(0);
      expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
      expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
      expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
    });

    it('should normalize angles correctly', () => {
      expect(normalizeAngle(0)).toBe(0);
      expect(normalizeAngle(360)).toBe(0);
      expect(normalizeAngle(450)).toBe(90);
      expect(normalizeAngle(-90)).toBe(270);
    });
  });

  describe('segment calculations', () => {
    it('should calculate segment center angles correctly', () => {
      expect(getSegmentCenterAngle(0, 4)).toBe(45);  // First segment of 4
      expect(getSegmentCenterAngle(1, 4)).toBe(135); // Second segment of 4
      expect(getSegmentCenterAngle(0, 6)).toBe(30);  // First segment of 6
    });

    it('should calculate angle to segment correctly', () => {
      // For top pointer (270°), first segment center at 45°
      const angle = getAngleToSegment(0, 4, 'top');
      expect(angle).toBe(225); // 270 - 45 = 225
    });
  });

  describe('calculateGeometry', () => {
    it('should create correct geometry for segments', () => {
      const geometry = calculateGeometry(480, 4);
      
      expect(geometry.centerX).toBe(240);
      expect(geometry.centerY).toBe(240);
      expect(geometry.radius).toBe(240);
      expect(geometry.segmentAngle).toBe(90);
      expect(geometry.segments).toHaveLength(4);
      
      // Check first segment
      const firstSegment = geometry.segments[0];
      expect(firstSegment.index).toBe(0);
      expect(firstSegment.startAngle).toBe(0);
      expect(firstSegment.endAngle).toBe(90);
      expect(firstSegment.centerAngle).toBe(45);
    });
  });
});

describe('Kinematics Engine', () => {
  describe('calculateTargetRotation', () => {
    it('should calculate rotation for target segment', () => {
      const rng = new SeededRNG(12345);
      const rotation = calculateTargetRotation(0, 4, [5, 7], 'top', rng);
      
      // Should be at least 5 full rotations (1800°) plus angle to segment
      expect(rotation).toBeGreaterThan(1800);
      expect(rotation).toBeLessThan(2880); // Less than 8 rotations
    });

    it('should be deterministic with same seed', () => {
      const rng1 = new SeededRNG(12345);
      const rng2 = new SeededRNG(12345);
      
      const rotation1 = calculateTargetRotation(0, 4, [5, 7], 'top', rng1);
      const rotation2 = calculateTargetRotation(0, 4, [5, 7], 'top', rng2);
      
      expect(rotation1).toBe(rotation2);
    });
  });

  describe('adjustForReducedMotion', () => {
    it('should reduce animation parameters', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
        }),
      });

      const adjusted = adjustForReducedMotion(4.2, [5, 7], 'power4.out');
      
      expect(adjusted.duration).toBeLessThanOrEqual(1.5);
      expect(adjusted.extraSpins).toEqual([1, 2]);
      expect(adjusted.easing).toBe('easeOut');
    });
  });

  describe('detectSegmentCrossings', () => {
    it('should detect when wheel crosses segment boundaries', () => {
      const crossings = detectSegmentCrossings(0, 100, 4); // 90° per segment
      
      expect(crossings).toContain(1); // Should cross into segment 1
    });

    it('should handle multiple crossings', () => {
      const crossings = detectSegmentCrossings(0, 270, 4); // Cross 3 segments
      
      expect(crossings).toHaveLength(3);
      expect(crossings).toEqual([1, 2, 3]);
    });

    it('should handle negative rotation', () => {
      const crossings = detectSegmentCrossings(0, -90, 4);
      
      expect(crossings).toContain(3); // Should cross into last segment
    });
  });
});
