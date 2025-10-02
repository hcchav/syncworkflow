import { WheelConfig } from './types';

export const DEFAULT_CONFIG: WheelConfig = {
  size: 480,
  pointer: "top",
  spin: {
    duration: 4.2,
    easing: "power4.out",
    extraSpins: [5, 7],
  },
  selection: {
    weights: undefined, // equal weights by default
    targetIndex: null,
    targetLabel: null,
    noRepeatUntilExhausted: false,
    seed: null,
  },
  segments: [],
  skin: {
    name: "wood-helm",
    showHelm: true,
    style: "wood",
    handleWidthFactor: 0.12,
    handleLengthFactor: 0.42,
    ringOuterWidthFactor: 0.08,
    ringInnerWidthFactor: 0.05,
    separator: {
      stroke: "#555",
      strokeWidth: 2,
      dashed: false,
    },
    hub: {
      show: true,
      fill: "#ffe08a",
      stroke: "#7a5a1a",
    },
    effects: {
      dropShadow: true,
      glow: false,
    },
  },
};

export const DEFAULT_SEGMENT_COLORS = [
  "#FFDC35", // Gold
  "#03c4eb", // Blue
  "#f4f4f4", // Light Gray
  "#ffffff", // White
  "#ff6b6b", // Red
  "#4ecdc4", // Teal
  "#45b7d1", // Light Blue
  "#96ceb4", // Mint
  "#feca57", // Orange
  "#ff9ff3", // Pink
  "#54a0ff", // Blue
  "#5f27cd", // Purple
];

export const DEFAULT_LABEL_COLORS = [
  "#333333", // Dark Gray
  "#ffffff", // White
  "#333333", // Dark Gray
  "#333333", // Dark Gray
  "#ffffff", // White
  "#ffffff", // White
  "#ffffff", // White
  "#333333", // Dark Gray
  "#333333", // Dark Gray
  "#333333", // Dark Gray
  "#ffffff", // White
  "#ffffff", // White
];

export const CSS_VARIABLES = {
  '--wheel-separator': 'var(--wheel-separator, #555)',
  '--wheel-label-color': 'var(--wheel-label-color, #333)',
  '--wheel-hub-fill': 'var(--wheel-hub-fill, #ffe08a)',
  '--wheel-hub-stroke': 'var(--wheel-hub-stroke, #7a5a1a)',
  '--wheel-ring-outer': 'var(--wheel-ring-outer, #8b4513)',
  '--wheel-ring-inner': 'var(--wheel-ring-inner, #a0522d)',
  '--wheel-handle-fill': 'var(--wheel-handle-fill, #654321)',
  '--wheel-glow-color': 'var(--wheel-glow-color, rgba(255, 220, 53, 0.3))',
} as const;
