/**
 * Lucky Wheel Web Component with PixiJS
 * High-performance 2D wheel with advanced effects
 * 
 * Requires PixiJS to be loaded via CDN
 */

// Wait for PIXI to be available
const waitForPIXI = () => {
  return new Promise((resolve) => {
    if (typeof PIXI !== 'undefined') {
      resolve(PIXI);
    } else {
      const checkInterval = setInterval(() => {
        if (typeof PIXI !== 'undefined') {
          clearInterval(checkInterval);
          resolve(PIXI);
        }
      }, 100);
    }
  });
};

class LuckyWheelPixi extends HTMLElement {
  static get observedAttributes() {
    return ['spin-duration', 'target-prize'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // State
    this._segments = [];
    this._isSpinning = false;
    this._currentRotation = 0;
    this._targetRotation = 0;
    this._spinDuration = 3000;
    this._targetPrize = null;
    
    // PixiJS objects
    this.app = null;
    this.wheelContainer = null;
    this.segmentGraphics = [];
    this.glowFilters = [];
    this.textCache = new Map(); // Cache text textures for reuse
    
    // Mobile detection
    this._isMobile = this._detectMobile();
    this._animationsEnabled = false; // Only animate during spin
  }
  
  _detectMobile() {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  async connectedCallback() {
    await waitForPIXI();
    this._render();
    this._initPixi();
  }

  disconnectedCallback() {
    // Clear text cache
    this.textCache.clear();
    
    if (this.app) {
      this.app.destroy(true, { children: true, texture: true, baseTexture: true });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if (name === 'spin-duration') {
      this._spinDuration = parseInt(newValue) || 3000;
    } else if (name === 'target-prize') {
      this._targetPrize = newValue === 'random' ? null : newValue;
    }
  }

  set segments(value) {
    this._segments = Array.isArray(value) ? value : [];
    if (this.app) {
      this._createWheel();
    }
  }

  get segments() {
    return this._segments;
  }

  _render() {
    const style = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .container {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        #wheel-canvas {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        
        .pointer {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 40px solid #ff0000;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
          z-index: 10;
        }
        
        .controls {
          margin-top: 20px;
          text-align: center;
        }
        
        button {
          padding: 12px 32px;
          font-size: 18px;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      </style>
    `;

    const template = document.createElement('template');
    template.innerHTML = `
      ${style}
      <div class="container">
        <div class="pointer"></div>
        <canvas id="wheel-canvas"></canvas>
      </div>
      <div class="controls">
        <button id="spin-btn">SPIN</button>
      </div>
    `;
    
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    // Add event listener
    const button = this.shadowRoot.getElementById('spin-btn');
    button.addEventListener('click', () => this.spin());
  }

  _initPixi() {
    const canvas = this.shadowRoot.getElementById('wheel-canvas');
    
    // Mobile-optimized sizing and resolution
    const size = this._isMobile ? 500 : 700;
    const resolution = this._isMobile ? 1 : (window.devicePixelRatio || 1);
    
    // Create PixiJS application with larger size to accommodate handles
    this.app = new PIXI.Application({
      view: canvas,
      width: size,
      height: size,
      backgroundColor: 0x1a1a2e,
      antialias: !this._isMobile, // Disable antialiasing on mobile for performance
      resolution: resolution,
      autoDensity: true,
    });

    // Create wheel container centered in larger canvas
    this.wheelContainer = new PIXI.Container();
    this.wheelContainer.x = this.app.screen.width / 2;
    this.wheelContainer.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.wheelContainer);

    // Create wheel
    this._createWheel();

    // Start animation loop
    this.app.ticker.add(() => this._animate());
  }

  _createWheel() {
    // Clear existing wheel
    this.wheelContainer.removeChildren();
    this.segmentGraphics = [];
    this.glowFilters = [];

    if (this._segments.length === 0) return;

    // Draw wooden rim first
    this._createWoodenRim();

    // Draw segments
    this._createSegments();

    // Draw wooden spokes/handles
    this._createSpokes();

    // Add center hub
    this._createHub();
  }

  _createWoodenRim() {
    const outerRadius = 280;
    const innerRadius = 240;
    
    // Base rim with gradient effect
    const rim = new PIXI.Graphics();
    rim.beginFill(0x8B4513); // Saddle brown
    rim.drawCircle(0, 0, outerRadius);
    rim.beginHole();
    rim.drawCircle(0, 0, innerRadius);
    rim.endHole();
    rim.endFill();
    
    // Add prominent wood grain texture with darker, thicker lines
    // Reduce grain density on mobile for performance
    const grainStep = this._isMobile ? 12 : 4;
    rim.lineStyle(2, 0x4a2511, 0.8);
    for (let i = 0; i < 360; i += grainStep) {
      const angle = (i * Math.PI) / 180;
      const x1 = Math.cos(angle) * innerRadius;
      const y1 = Math.sin(angle) * innerRadius;
      const x2 = Math.cos(angle) * outerRadius;
      const y2 = Math.sin(angle) * outerRadius;
      rim.moveTo(x1, y1);
      rim.lineTo(x2, y2);
    }
    
    // Skip secondary grain on mobile
    if (!this._isMobile) {
      rim.lineStyle(1, 0x6B3410, 0.5);
      for (let i = 2; i < 360; i += 4) {
        const angle = (i * Math.PI) / 180;
        const x1 = Math.cos(angle) * (innerRadius + 5);
        const y1 = Math.sin(angle) * (innerRadius + 5);
        const x2 = Math.cos(angle) * (outerRadius - 5);
        const y2 = Math.sin(angle) * (outerRadius - 5);
        rim.moveTo(x1, y1);
        rim.lineTo(x2, y2);
      }
    }
    
    // Reduced inner edge shadow to prevent flickering
    const innerShadow = new PIXI.Graphics();
    innerShadow.lineStyle(4, 0x000000, 0.15);
    innerShadow.drawCircle(0, 0, innerRadius + 4);
    
    // Reduced outer edge highlight to prevent flickering
    const outerHighlight = new PIXI.Graphics();
    outerHighlight.lineStyle(2, 0xA0522D, 0.3);
    outerHighlight.drawCircle(0, 0, outerRadius - 2);
    
    // Reduced outer edge shadow to prevent flickering
    const outerShadow = new PIXI.Graphics();
    outerShadow.lineStyle(2, 0x3e2723, 0.2);
    outerShadow.drawCircle(0, 0, innerRadius + 1);
    
    // Cache rim as bitmap for better performance (static element)
    rim.cacheAsBitmap = true;
    innerShadow.cacheAsBitmap = true;
    outerHighlight.cacheAsBitmap = true;
    outerShadow.cacheAsBitmap = true;
    
    this.wheelContainer.addChild(innerShadow);
    this.wheelContainer.addChild(rim);
    this.wheelContainer.addChild(outerHighlight);
    this.wheelContainer.addChild(outerShadow);
  }

  _createSegments() {
    const radius = 235;
    const segmentAngle = (Math.PI * 2) / this._segments.length;

    this._segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle - Math.PI / 2;
      const endAngle = (index + 1) * segmentAngle - Math.PI / 2;

      // Create segment graphics
      const segmentGraphic = new PIXI.Graphics();
      
      // Parse color
      const color = parseInt((segment.bg || segment.color || '#cccccc').replace('#', ''), 16);
      
      // Draw segment with slight inset
      segmentGraphic.beginFill(color, 1);
      segmentGraphic.moveTo(0, 0);
      segmentGraphic.arc(0, 0, radius, startAngle, endAngle);
      segmentGraphic.lineTo(0, 0);
      segmentGraphic.endFill();

      // Removed darker border to prevent flickering
      // segmentGraphic.lineStyle(4, 0x2c3e50, 1.0);
      // segmentGraphic.moveTo(0, 0);
      // segmentGraphic.lineTo(
      //   Math.cos(startAngle) * radius,
      //   Math.sin(startAngle) * radius
      // );
      
      // Removed inner white highlight to prevent flickering
      // segmentGraphic.lineStyle(2, 0xffffff, 0.3);
      // const innerStart = radius * 0.3;
      // segmentGraphic.moveTo(
      //   Math.cos(startAngle) * innerStart,
      //   Math.sin(startAngle) * innerStart
      // );
      // segmentGraphic.lineTo(
      //   Math.cos(startAngle) * radius,
      //   Math.sin(startAngle) * radius
      // );

      // Add blur filter for glow effect (reduced quality on mobile)
      const blurFilter = new PIXI.BlurFilter();
      blurFilter.blur = this._isMobile ? 2 : 3;
      blurFilter.quality = this._isMobile ? 1 : 4;
      
      segmentGraphic.filters = [blurFilter];
      this.glowFilters.push(blurFilter);

      // Store animation data
      segmentGraphic.userData = {
        baseGlow: 3,
        animationOffset: index * 0.5,
      };

      this.segmentGraphics.push(segmentGraphic);
      this.wheelContainer.addChild(segmentGraphic);

      // Add text
      this._addSegmentText(segment.label, startAngle, endAngle, radius);
    });
  }

  _createSpokes() {
    const spokeCount = 8; // Match the 8 prize segments
    const innerRadius = 70;
    const outerRadius = 320; // Extended much further (was 290)
    const spokeWidth = 18; // Slightly thinner for 8 spokes

    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * Math.PI * 2) / spokeCount;
      
      // Create spoke group
      const spoke = new PIXI.Graphics();
      
      // Main spoke shaft - extends well beyond rim
      spoke.beginFill(0x8B4513);
      spoke.drawRect(-spokeWidth / 2, innerRadius, spokeWidth, outerRadius - innerRadius);
      spoke.endFill();
      
      // Add wood grain lines (skip on mobile for performance)
      if (!this._isMobile) {
        spoke.lineStyle(1, 0x6B3410, 0.4);
        for (let j = innerRadius; j < outerRadius; j += 10) {
          spoke.moveTo(-spokeWidth / 2, j);
          spoke.lineTo(spokeWidth / 2, j);
        }
      }
      
      // Decorative rings (turned details) - reduced for performance
      // Only add rings on desktop for visual quality
      if (!this._isMobile) {
        const ringPositions = [0.3, 0.66]; // Reduced from 5 to 2 rings
        ringPositions.forEach(pos => {
          const ringY = innerRadius + (outerRadius - innerRadius) * pos;
          spoke.beginFill(0x6B3410);
          spoke.drawRect(-spokeWidth / 2 - 3, ringY - 5, spokeWidth + 6, 10);
          spoke.endFill();
        });
      }
      
      // Handle grip at end - positioned where red circles are
      const gripRadius = 18;
      spoke.beginFill(0x8B4513);
      spoke.drawCircle(0, outerRadius + 8, gripRadius);
      spoke.endFill();
      
      // Add darker edge to grip for definition
      spoke.lineStyle(3, 0x6B3410, 0.9);
      spoke.drawCircle(0, outerRadius + 8, gripRadius);
      
      // Add inner highlight for 3D effect
      spoke.lineStyle(2, 0xA0522D, 0.4);
      spoke.drawCircle(0, outerRadius + 8, gripRadius - 4);
      
      // Add shadow to spoke
      spoke.lineStyle(2, 0x000000, 0.2);
      spoke.drawRect(-spokeWidth / 2 - 1, innerRadius, 2, outerRadius - innerRadius);
      
      spoke.rotation = angle;
      // Cache spoke as bitmap (static element)
      spoke.cacheAsBitmap = true;
      this.wheelContainer.addChild(spoke);
    }
  }

  _addSegmentText(text, startAngle, endAngle, radius) {
    const centerAngle = (startAngle + endAngle) / 2;
    const textRadius = radius * 0.78;

    // Simplified text style for better performance
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: this._isMobile ? 18 : 22,
      fontWeight: 'bold',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: this._isMobile ? 3 : 5,
      // Simplified shadow on mobile
      dropShadow: !this._isMobile,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 2,
    });

    const label = new PIXI.Text(text, textStyle);
    label.anchor.set(0.5);
    label.x = Math.cos(centerAngle) * textRadius;
    label.y = Math.sin(centerAngle) * textRadius;
    label.rotation = centerAngle + Math.PI / 2;
    
    // Cache text as bitmap for better rendering performance
    label.cacheAsBitmap = true;

    this.wheelContainer.addChild(label);
  }

  _createHub() {
    // Brass hub with concentric rings
    const hubRadius = 70;
    
    // Outer brass disc
    const outerDisc = new PIXI.Graphics();
    outerDisc.beginFill(0xDAA520); // Gold
    outerDisc.drawCircle(0, 0, hubRadius);
    outerDisc.endFill();
    
    // Add metallic shine gradient effect
    outerDisc.lineStyle(2, 0xFFD700, 0.6);
    outerDisc.drawCircle(0, 0, hubRadius - 5);
    
    // Middle ring
    const middleRing = new PIXI.Graphics();
    middleRing.lineStyle(3, 0xB8860B);
    middleRing.drawCircle(0, 0, hubRadius * 0.7);
    
    // Inner ring
    const innerRing = new PIXI.Graphics();
    innerRing.lineStyle(2, 0x8B7355);
    innerRing.drawCircle(0, 0, hubRadius * 0.5);
    
    // Center hole
    const centerHole = new PIXI.Graphics();
    centerHole.beginFill(0x2a2a2a);
    centerHole.drawCircle(0, 0, hubRadius * 0.2);
    centerHole.endFill();
    
    // Add radial lines for detail
    const lines = new PIXI.Graphics();
    lines.lineStyle(1, 0x8B7355, 0.5);
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12;
      const startR = hubRadius * 0.55;
      const endR = hubRadius * 0.85;
      lines.moveTo(Math.cos(angle) * startR, Math.sin(angle) * startR);
      lines.lineTo(Math.cos(angle) * endR, Math.sin(angle) * endR);
    }
    
    // Add glow to hub (reduced on mobile)
    if (!this._isMobile) {
      const hubBlur = new PIXI.BlurFilter();
      hubBlur.blur = 5;
      hubBlur.quality = 2;
      outerDisc.filters = [hubBlur];
    }

    // Cache hub elements as bitmaps (static)
    outerDisc.cacheAsBitmap = true;
    middleRing.cacheAsBitmap = true;
    innerRing.cacheAsBitmap = true;
    lines.cacheAsBitmap = true;
    centerHole.cacheAsBitmap = true;
    
    this.wheelContainer.addChild(outerDisc);
    this.wheelContainer.addChild(middleRing);
    this.wheelContainer.addChild(innerRing);
    this.wheelContainer.addChild(lines);
    this.wheelContainer.addChild(centerHole);
  }

  _animate() {
    // Only animate during spin or if explicitly enabled
    if (!this._animationsEnabled && !this._isSpinning) return;
    
    // Skip animations entirely on mobile for better performance
    if (this._isMobile) return;
    
    const time = performance.now() * 0.001;

    // Animate blur filters for glow effect
    this.segmentGraphics.forEach((graphic, index) => {
      const offset = graphic.userData.animationOffset || 0;
      
      // Breathing effect - animate blur amount
      const breathe = Math.sin(time * 0.5 + offset) * 3 + 5; // 2 to 8
      
      // Shimmer - faster subtle variation
      const shimmer = Math.sin(time * 3 + offset * 2) * 1;
      
      const filter = this.glowFilters[index];
      if (filter) {
        filter.blur = Math.max(0, breathe + shimmer);
      }
      
      // Also animate alpha for pulsing effect
      graphic.alpha = Math.sin(time * 0.5 + offset) * 0.1 + 0.9; // 0.8 to 1.0
    });
  }

  async spin() {
    if (this._isSpinning) return;

    this._isSpinning = true;
    this._animationsEnabled = true; // Enable animations during spin
    const button = this.shadowRoot.getElementById('spin-btn');
    button.disabled = true;

    // Dispatch spin start event
    this.dispatchEvent(new CustomEvent('spinstart', {
      bubbles: true,
      composed: true,
    }));

    // Determine target
    let targetIndex;
    if (this._targetPrize) {
      targetIndex = this._segments.findIndex(s => s.label === this._targetPrize);
      if (targetIndex === -1) targetIndex = Math.floor(Math.random() * this._segments.length);
    } else {
      targetIndex = Math.floor(Math.random() * this._segments.length);
    }

    // Calculate target rotation accounting for segment offset
    const segmentAngle = 360 / this._segments.length;
    const extraRotations = 5 * 360; // 5 full spins
    
    // CRITICAL: Segments are drawn starting at -90° (top of wheel)
    // In the drawing code: startAngle = index * segmentAngle - Math.PI / 2
    // This means index 0 starts at -90° and goes clockwise
    
    // Step 1: Calculate where this segment's CENTER is in the drawing
    // Segment center = (index * segmentAngle) + (segmentAngle / 2) - 90°
    const segmentCenterInDrawing = (targetIndex * segmentAngle) + (segmentAngle / 2) - 90;
    
    // Step 2: Pointer is at 0° (top) in the wheel's coordinate system
    // We want the segment center to align with 0°
    const pointerAngle = 0;
    
    // Step 3: Calculate rotation needed
    // We need to rotate the wheel so segmentCenterInDrawing ends up at pointerAngle
    let targetAngle = pointerAngle - segmentCenterInDrawing;
    targetAngle = ((targetAngle % 360) + 360) % 360; // normalizeAngle
    
    // Step 4: Calculate how much to rotate from current position
    const currentNormalized = ((this._currentRotation % 360) + 360) % 360;
    let rotationNeeded = targetAngle - currentNormalized;
    
    // If rotation is negative or too small, add full rotations
    if (rotationNeeded <= 0) {
      rotationNeeded += 360;
    }
    
    // No additional random offset to guarantee exact targeting
    const randomOffset = 0;
    
    // Calculate final target rotation
    this._targetRotation = this._currentRotation + extraRotations + rotationNeeded + randomOffset;

    // Animate spin
    await this._animateSpin();

    // Normalize rotation for next spin
    this._currentRotation = targetAngle;

    // Dispatch spin end event
    this.dispatchEvent(new CustomEvent('spinend', {
      bubbles: true,
      composed: true,
      detail: {
        prize: this._segments[targetIndex].label,
        index: targetIndex,
      },
    }));

    this._isSpinning = false;
    this._animationsEnabled = false; // Disable animations when idle
    button.disabled = false;
  }

  _animateSpin() {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const startRotation = this._currentRotation;
      const totalRotation = this._targetRotation - startRotation;

      const animate = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / this._spinDuration, 1);

        // Easing function (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);

        this._currentRotation = startRotation + totalRotation * eased;
        // Convert to radians and add the -90° offset that segments use
        this.wheelContainer.rotation = ((this._currentRotation - 90) * Math.PI) / 180;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      animate();
    });
  }
}

// Register the custom element
customElements.define('lucky-wheel-pixi', LuckyWheelPixi);
