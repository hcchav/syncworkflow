// Main exports
export { WheelSpin } from './WheelSpin';
export { Wheel, Wheel as default } from './Wheel';
export type { WheelProps } from './Wheel';
export type { 
  WheelConfig, 
  WheelSpinRef, 
  WheelSpinProps, 
  SkinConfig, 
  SpinResult,
  GeometryData,
  SegmentGeometry,
  SkinRenderer,
  TickCallback,
  AnimationState
} from './types';

// Defaults and utilities
export { DEFAULT_CONFIG, DEFAULT_SEGMENT_COLORS, DEFAULT_LABEL_COLORS, CSS_VARIABLES } from './defaults';

// Engine utilities (for advanced usage)
export { createSeededRNG, SeededRNG } from './engine/rng';
export { weightedPick, NoRepeatQueue, findSegmentByLabel } from './engine/selection';
export { 
  calculateGeometry, 
  getSegmentCenterAngle, 
  getAngleToSegment, 
  normalizeAngle 
} from './engine/geometry';
export { 
  calculateTargetRotation, 
  WheelAnimation, 
  prefersReducedMotion, 
  adjustForReducedMotion 
} from './engine/kinematics';

// Skin system
export { 
  getSkinRenderer, 
  registerSkin, 
  getAvailableSkins, 
  hasSkin, 
  unregisterSkin 
} from './skins/registry';
export { woodHelm } from './skins/woodHelm';
export { modernHelm } from './skins/modernHelm';
export { minimal } from './skins/minimal';
export { casino } from './skins/casino';

// Renderers (for direct usage if needed)
export { WheelSVG } from './renderers/svg/WheelSVG';
export { WheelPixi } from './renderers/pixi/WheelPixi';
