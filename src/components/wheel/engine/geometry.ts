import { GeometryData, SegmentGeometry } from '../types';

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Calculate the center angle of a segment
 */
export function getSegmentCenterAngle(segmentIndex: number, totalSegments: number): number {
  const segmentAngle = 360 / totalSegments;
  return segmentIndex * segmentAngle + segmentAngle / 2;
}

/**
 * Create SVG path for a segment arc
 */
export function createSegmentPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const startAngleRad = degreesToRadians(startAngle);
  const endAngleRad = degreesToRadians(endAngle);

  const x1 = centerX + radius * Math.cos(startAngleRad);
  const y1 = centerY + radius * Math.sin(startAngleRad);
  const x2 = centerX + radius * Math.cos(endAngleRad);
  const y2 = centerY + radius * Math.sin(endAngleRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

/**
 * Calculate text position for a segment
 */
export function getTextPosition(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
  textDistance: number
): { x: number; y: number; angle: number } {
  const angleRad = degreesToRadians(angle);
  const x = centerX + textDistance * Math.cos(angleRad);
  const y = centerY + textDistance * Math.sin(angleRad);

  return { x, y, angle };
}

/**
 * Calculate geometry data for all segments
 */
export function calculateGeometry(
  size: number,
  segmentCount: number,
  textDistance?: number
): GeometryData {
  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;
  const segmentAngle = 360 / segmentCount;
  const textDist = textDistance || radius * 0.55;

  const segments: SegmentGeometry[] = [];

  for (let i = 0; i < segmentCount; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = (i + 1) * segmentAngle;
    const centerAngle = startAngle + segmentAngle / 2;

    const path = createSegmentPath(centerX, centerY, radius, startAngle, endAngle);
    const textPosition = getTextPosition(centerX, centerY, radius, centerAngle, textDist);

    segments.push({
      index: i,
      startAngle,
      endAngle,
      centerAngle,
      path,
      textPosition,
    });
  }

  return {
    centerX,
    centerY,
    radius,
    segmentAngle,
    segments,
  };
}

/**
 * Calculate the angle needed to point to a specific segment
 */
export function getAngleToSegment(
  segmentIndex: number,
  totalSegments: number,
  pointerPosition: 'top' | 'right' = 'top'
): number {
  const segmentCenterAngle = getSegmentCenterAngle(segmentIndex, totalSegments);
  
  // Pointer positions in degrees
  const pointerAngles = {
    top: 270, // 12 o'clock
    right: 0, // 3 o'clock
  };

  const pointerAngle = pointerAngles[pointerPosition];
  
  // Calculate the rotation needed to align segment center with pointer
  return normalizeAngle(pointerAngle - segmentCenterAngle);
}

/**
 * Check if a point is inside a segment
 */
export function isPointInSegment(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): boolean {
  // Check if point is within radius
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  if (distance > radius) return false;

  // Calculate angle of point relative to center
  const pointAngle = normalizeAngle(radiansToDegrees(Math.atan2(y - centerY, x - centerX)));
  
  // Normalize segment angles
  const normalizedStart = normalizeAngle(startAngle);
  const normalizedEnd = normalizeAngle(endAngle);

  // Handle angle wrapping around 0/360
  if (normalizedStart > normalizedEnd) {
    return pointAngle >= normalizedStart || pointAngle <= normalizedEnd;
  } else {
    return pointAngle >= normalizedStart && pointAngle <= normalizedEnd;
  }
}

/**
 * Calculate arc length for a segment
 */
export function getArcLength(radius: number, angleInDegrees: number): number {
  return (radius * degreesToRadians(angleInDegrees));
}

/**
 * Calculate optimal font size for segment text
 */
export function calculateOptimalFontSize(
  text: string,
  arcLength: number,
  maxFontSize: number = 16,
  minFontSize: number = 8
): number {
  // Rough estimate: each character takes about 0.6em width
  const estimatedWidth = text.length * 0.6;
  const availableWidth = arcLength * 0.8; // Use 80% of arc length
  
  const calculatedSize = (availableWidth / estimatedWidth) * maxFontSize;
  
  return Math.max(minFontSize, Math.min(maxFontSize, calculatedSize));
}
