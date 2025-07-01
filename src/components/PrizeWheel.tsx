import React, { useState, useEffect, useRef } from 'react';

interface PrizeWheelProps {
  segments: string[];
  segColors: string[];
  onFinished?: (winner: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  winningSegment?: string;
  zIndex?: number;
  autoSpin?: boolean;
  textRadius?: number; // How far from center the text should be (0-1, percentage of radius)
  textRotation?: number; // Rotation of text in radians
  fontSize?: number; // Font size in pixels
  textAlign?: CanvasTextAlign; // Text alignment: 'left', 'right', 'center'
}

const PrizeWheel: React.FC<PrizeWheelProps> = ({
  segments,
  segColors,
  onFinished = () => {},
  primaryColor = '#333',
  contrastColor = '#fff',
  buttonText = 'SPIN',
  size = 290,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = 'Inter',
  winningSegment,
  zIndex = 9999,
  autoSpin = false,
  textRadius = 0.1, // Default: 75% of wheel radius
  textRotation = Math.PI, // Default: 90 degrees
  fontSize = 12, // Default: 12px
  textAlign = 'center' // Default: right aligned
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [currentSegment, setCurrentSegment] = useState<string | null>(null);
  
  // Calculate dimensions
  const canvasSize = size;
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;
  const radius = centerX - 10;
  
  useEffect(() => {
    drawWheel();
  }, [rotation]);
  
  // Auto-spin effect
  useEffect(() => {
    if (autoSpin && !isSpinning) {
      setTimeout(() => {
        spinWheel();
      }, 500); // Small delay to ensure wheel is visible before spinning
    }
  }, [autoSpin]);
  
  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / segments.length;
    
    for (let i = 0; i < segments.length; i++) {
      // Start angle
      const startAngle = i * segmentAngle + rotation;
      // End angle
      const endAngle = (i + 1) * segmentAngle + rotation;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill segment
      ctx.fillStyle = segColors[i % segColors.length];
      ctx.fill();
      
      // Add segment border
      ctx.lineWidth = 1;
      ctx.strokeStyle = contrastColor;
      ctx.stroke();
      
      // Add text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      
      ctx.textAlign = textAlign;
      ctx.fillStyle = contrastColor;
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      
      // Calculate text position based on textRadius prop
      const actualTextRadius = radius * textRadius;
      ctx.translate(actualTextRadius, 0);
      ctx.rotate(textRotation);
      
      // Limit text length
      const maxLength = 12;
      const text = segments[i].length > maxLength ? 
        segments[i].substring(0, maxLength) + '...' : 
        segments[i];
      
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = primaryColor;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#3779FF'; // Brand blue
    ctx.fill();
    
    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 15);
    ctx.lineTo(centerX - 10, centerY - radius);
    ctx.lineTo(centerX + 10, centerY - radius);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.fill();
  };
  
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Calculate the winning segment index
    let winningIndex = Math.floor(Math.random() * segments.length);
    
    // If a winning segment is specified, find its index
    if (winningSegment) {
      const index = segments.indexOf(winningSegment);
      if (index !== -1) {
        winningIndex = index;
      }
    }
    
    // Calculate the rotation needed to land on the winning segment
    // We add multiple full rotations (5-10) plus the specific angle to land on the segment
    const segmentAngle = (2 * Math.PI) / segments.length;
    const spinAngle = (2 * Math.PI) * (5 + Math.random() * 5) - (winningIndex * segmentAngle) - (segmentAngle / 2);
    
    // Convert to degrees
    const spinDegrees = (spinAngle * 180 / Math.PI) % 360;
    
    // Animate the spin
    let currentRotation = rotation;
    const startTime = Date.now();
    const totalDuration = upDuration + downDuration;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (elapsed < totalDuration) {
        // Easing function to simulate acceleration and deceleration
        let progress;
        
        if (elapsed < upDuration) {
          // Acceleration phase
          progress = elapsed / upDuration;
          progress = progress * progress; // Quadratic easing
        } else {
          // Deceleration phase
          progress = (elapsed - upDuration) / downDuration;
          progress = 1 - (1 - progress) * (1 - progress); // Inverse quadratic easing
          progress = 0.5 + (progress * 0.5); // Map to 0.5-1.0 range
        }
        
        const newRotation = currentRotation + (spinDegrees * progress);
        setRotation(newRotation);
        
        requestAnimationFrame(animate);
      } else {
        // Spin complete
        const finalRotation = currentRotation + spinDegrees;
        setRotation(finalRotation);
        
        // Determine the winning segment
        const normalizedRotation = finalRotation % (2 * Math.PI);
        const segmentIndex = Math.floor(segments.length - (normalizedRotation / segmentAngle) % segments.length) % segments.length;
        const winningSegment = segments[segmentIndex];
        
        setWinner(winningSegment);
        setCurrentSegment(winningSegment);
        setIsSpinning(false);
        
        // Call the onFinished callback
        onFinished(winningSegment);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  return (
    <div style={{ 
      position: 'relative', 
      width: `${size}px`, 
      height: `${size}px`,
      margin: '0 auto',
      zIndex: zIndex
    }}>
      <canvas 
        ref={canvasRef} 
        width={canvasSize} 
        height={canvasSize} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: zIndex
        }}
      />
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isSpinning ? '#cccccc' : '#3779FF',
          color: contrastColor,
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: isSpinning ? 'default' : 'pointer',
          fontFamily,
          zIndex: zIndex + 1
        }}
      >
        {buttonText}
      </button>
      {winner && (
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '0',
          right: '0',
          textAlign: 'center',
          color: '#3779FF',
          fontFamily,
          fontWeight: 'bold',
          zIndex: zIndex
        }}>
          {winner}
        </div>
      )}
    </div>
  );
};

export default PrizeWheel;
