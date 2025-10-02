export type WheelConfig = {
  size?: number; // px; default 480
  pointer?: "top" | "right" | "none"; // default "top"
  spin: {
    duration?: number; // seconds, default 4.2
    easing?: "easeOut" | "power4.out" | "linear"; // default "power4.out"
    extraSpins?: [min: number, max: number]; // default [5,7], integers
  };
  selection: {
    weights?: number[]; // default equal weights
    targetIndex?: number | null; // when set, must land on index
    targetLabel?: string | null; // convenience over index
    noRepeatUntilExhausted?: boolean; // default false
    seed?: number | string | null; // deterministic RNG if set
  };
  segments: Array<{
    label: string;
    color?: string; // slice fill
    labelColor?: string; // text color
    payload?: unknown; // arbitrary metadata
  }>;
  skin: SkinConfig; // see below
};

export type SkinConfig = {
  name?: "wood-helm" | "modern-helm" | "minimal" | "casino" | "stainless-steel-helm" | "rubber-coated-helm" | "leather-wrapped-helm" | "chrome-helm" | "mahogany-helm" | "boat-helm";
  showHelm?: boolean; // default true for helm skins
  showHandles?: boolean; // default true - outer protruding handles
  showSpokes?: boolean; // default false - inner radial spokes within wheel
  style?: "wood" | "modern" | "stainless-steel" | "rubber-coated" | "leather-wrapped" | "chrome" | "mahogany" | "boat"; // material styling for helm skins
  handleWidthFactor?: number; // 0..1 of size, default 0.12
  handleLengthFactor?: number; // 0..1 of radius, default 0.42
  ringOuterWidthFactor?: number; // 0..1 of size, default 0.08
  ringInnerWidthFactor?: number; // 0..1 of size, default 0.05
  separator: {
    stroke?: string; // default "#555"
    strokeWidth?: number; // default 2, configurable thickness for pie divider lines
    dashed?: boolean; // default false
  };
  hub: {
    show?: boolean; // default true
    fill?: string; // default "#ffe08a"
    stroke?: string; // default "#7a5a1a"
    strokeWidth?: number; // default 2
    text?: string; // optional text to display on axle/spindle
    textColor?: string; // default "#000000"
    textSize?: number; // default size * 0.03
  };
  effects?: {
    dropShadow?: boolean;
    glow?: boolean;
  };
};

export interface WheelSpinRef {
  spin: (opts?: { targetIndex?: number; targetLabel?: string }) => Promise<SpinResult>;
  getRotation: () => number;
  setConfig: (patch: Partial<WheelConfig>) => void;
  // Debug methods
  isReady?: () => boolean;
  reset?: () => void;
}

export interface WheelSpinProps {
  config: WheelConfig;
  onResult?: (res: {
    index: number;
    segment: WheelConfig["segments"][number];
  }) => void;
  renderer?: "svg" | "pixi"; // default "svg"
  className?: string;
  style?: React.CSSProperties;
}

export type SpinResult = {
  index: number;
  segment: WheelConfig["segments"][number];
};

export type GeometryData = {
  centerX: number;
  centerY: number;
  radius: number;
  segmentAngle: number;
  segments: SegmentGeometry[];
};

export type SegmentGeometry = {
  index: number;
  startAngle: number;
  endAngle: number;
  centerAngle: number;
  path: string;
  textPosition: { x: number; y: number; angle: number };
};

export type SkinRenderer = (config: WheelConfig, geometry: GeometryData) => {
  rings?: React.ReactNode[];
  handles?: React.ReactNode[];
  innerSpokes?: React.ReactNode[];
  hub?: React.ReactNode;
  filters?: React.ReactNode[];
};

export type TickCallback = (segmentIndex: number) => void;

export type AnimationState = {
  isSpinning: boolean;
  currentRotation: number;
  targetRotation: number;
};
