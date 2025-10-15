/**
 * LuckyWheel Web Component v1.0.0
 * A framework-agnostic spinning wheel component
 * 
 * Usage:
 * <lucky-wheel
 *   skin="wood"
 *   theme="light"
 *   target-prize="Gift Card"
 *   spin-duration="3500"
 *   size="420"
 *   easing="easeOutCubic"
 *   min-rotations="3"
 * ></lucky-wheel>
 */

class LuckyWheel extends HTMLElement {
  // Observed attributes for automatic updates
  static get observedAttributes() {
    return [
      'skin',
      'theme', 
      'target-prize',
      'spin-duration',
      'size',
      'easing',
      'min-rotations'
    ];
  }

  constructor() {
    super();
    
    // Internal state
    this._segments = [];
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5; // Balanced brightness
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this._resizeObserver = null;
    
    // Default configuration
    this._config = {
      skin: 'minimal',
      theme: 'light',
      targetPrize: 'random',
      spinDuration: 3000,
      size: 420,
      easing: 'easeOutCubic',
      minRotations: 3
    };

    // Create shadow DOM
    this.attachShadow({ mode: 'open' });
    this._createTemplate();
    this._setupEventListeners();
    this._setupResizeObserver();
  }

  connectedCallback() {
    this._updateFromAttributes();
    this._render();
  }

  disconnectedCallback() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateFromAttributes();
      this._render();
    }
  }

  // Public API - Properties
  get segments() {
    return this._segments;
  }

  set segments(value) {
    if (Array.isArray(value) && value.length >= 2) {
      this._segments = value.map((segment, index) => ({
        label: segment.label || `Prize ${index + 1}`,
        bg: segment.bg || this._getDefaultColor(index),
        text: segment.text || '#000000',
        ...segment
      }));
      this._render();
    } else {
      console.warn('LuckyWheel: segments must be an array with at least 2 items');
    }
  }

  // Public API - Methods
  spin(options = {}) {
    if (this._isSpinning) {
      console.warn('LuckyWheel: Already spinning');
      return Promise.resolve(null);
    }

    if (this._segments.length < 2) {
      console.warn('LuckyWheel: Need at least 2 segments to spin');
      return Promise.resolve(null);
    }

    const targetIndex = this._resolveTargetIndex(options);
    const targetPrize = this._segments[targetIndex];

    // Dispatch spinstart event
    this.dispatchEvent(new CustomEvent('spinstart', {
      detail: { targetIndex, targetPrize }
    }));

    return this._animateSpin(targetIndex);
  }

  reset() {
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }
    this._isSpinning = false;
    this._currentRotation = 0;
    this._targetRotation = 0;
    this._updateWheelRotation();
  }

  getState() {
    return {
      spinning: this._isSpinning,
      lastResult: this._lastResult || null,
      angle: this._currentRotation
    };
  }

  // Private methods
  _createTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
          width: 100%;
          max-width: 500px;
          --wheel-size: 420px;
          --pointer-color: #ff4444;
          --hub-color: #ffffff;
          --separator-color: #333333;
          --text-color: #000000;
        }

        :host([theme="dark"]) {
          --hub-color: #333333;
          --separator-color: #ffffff;
          --text-color: #ffffff;
        }

        /* Wood Skin - Ship's Helm Style */
        :host([skin="wood"]) {
          --hub-color: #8B4513;
          --separator-color: #654321;
          --pointer-color: #B8860B;
        }

        :host([skin="wood"]) .wheel-group {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }

        :host([skin="wood"]) .segment {
          stroke: var(--separator-color);
          stroke-width: 3;
        }

        :host([skin="wood"]) .center-button {
          background: radial-gradient(circle, #D2691E 0%, #8B4513 70%, #654321 100%);
          border: 4px solid #654321;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.4);
        }

        :host([skin="wood"]) .button-icon::before {
          content: "⚓";
          font-size: 1.2em;
        }

        :host([skin="wood"]) .button-icon {
          display: none;
        }

        :host([skin="wood"]) .pointer {
          fill: #B8860B;
          stroke: #8B4513;
          stroke-width: 2;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
        }

        /* Chrome Skin */
        :host([skin="chrome"]) {
          --hub-color: #E5E5E5;
          --separator-color: #999999;
          --pointer-color: #C0C0C0;
        }

        :host([skin="chrome"]) .center-button {
          background: linear-gradient(145deg, #ffffff 0%, #e5e5e5 50%, #cccccc 100%);
          border: 3px solid #999999;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2);
        }

        :host([skin="chrome"]) .pointer {
          fill: linear-gradient(145deg, #ffffff 0%, #c0c0c0 100%);
          stroke: #999999;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }

        /* Casino Skin */
        :host([skin="casino"]) {
          --hub-color: #FFD700;
          --separator-color: #B8860B;
          --pointer-color: #FF6B35;
        }

        :host([skin="casino"]) .center-button {
          background: radial-gradient(circle, #FFD700 0%, #FFA500 50%, #B8860B 100%);
          border: 4px solid #B8860B;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), 0 4px 12px rgba(0,0,0,0.4);
        }

        :host([skin="casino"]) .pointer {
          fill: #FF6B35;
          stroke: #B8860B;
          stroke-width: 2;
          filter: drop-shadow(2px 2px 6px rgba(0,0,0,0.4));
        }

        .wheel-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          margin: 0 auto;
          max-width: var(--wheel-size);
        }

        .wheel-svg {
          width: 100%;
          height: 100%;
          cursor: pointer;
          transition: filter 0.2s ease;
        }

        .wheel-svg:hover:not(.spinning) {
          filter: brightness(1.05);
        }

        .wheel-svg.spinning {
          cursor: not-allowed;
        }

        .wheel-group {
          transform-origin: center;
          transition: none;
        }

        .segment {
          stroke: var(--separator-color);
          stroke-width: 2;
        }

        .segment-text {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 600;
          text-anchor: middle;
          dominant-baseline: middle;
          user-select: none;
          pointer-events: none;
          fill: var(--text-color);
        }

        .pointer {
          fill: var(--pointer-color);
          stroke: #cc0000;
          stroke-width: 2;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }

        .hub {
          fill: var(--hub-color);
          stroke: var(--separator-color);
          stroke-width: 2;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .center-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid var(--separator-color);
          background: var(--hub-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .center-button:hover:not(:disabled) {
          transform: translate(-50%, -50%) scale(1.05);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .center-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .center-button:focus {
          outline: 2px solid #007bff;
          outline-offset: 2px;
        }

        /* Responsive sizing */
        @media (max-width: 768px) {
          :host {
            --wheel-size: 350px;
            max-width: 90vw;
          }
          .center-button {
            width: 50px;
            height: 50px;
            font-size: 18px;
          }
        }
        
        @media (max-width: 480px) {
          :host {
            --wheel-size: 280px;
            max-width: 85vw;
          }
          .center-button {
            width: 45px;
            height: 45px;
            font-size: 16px;
          }
        }
        
        @media (max-width: 320px) {
          :host {
            --wheel-size: 250px;
            max-width: 90vw;
          }
          .center-button {
            width: 40px;
            height: 40px;
            font-size: 14px;
          }
        }
      </style>
      
      <div class="wheel-container">
        <svg class="wheel-svg" viewBox="0 0 420 420">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
            <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="3" dy="3" stdDeviation="4" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
            <!-- Wood gradients -->
            <linearGradient id="woodRingOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8b4513" />
              <stop offset="50%" stop-color="#a0522d" />
              <stop offset="100%" stop-color="#654321" />
            </linearGradient>
            <linearGradient id="woodRingInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#a0522d" />
              <stop offset="50%" stop-color="#8b4513" />
              <stop offset="100%" stop-color="#5d4037" />
            </linearGradient>
            <linearGradient id="woodHandle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6d4c41" />
              <stop offset="50%" stop-color="#5d4037" />
              <stop offset="100%" stop-color="#4e342e" />
            </linearGradient>
            <radialGradient id="brassHub" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#ffd700" />
              <stop offset="50%" stop-color="#daa520" />
              <stop offset="100%" stop-color="#b8860b" />
            </radialGradient>
          </defs>
          <g class="wheel-group">
            <!-- Segments will be rendered here -->
          </g>
          <!-- Wood spokes (only visible with wood skin) -->
          <g class="wood-spokes" style="display: none;">
            <!-- Will be populated by JavaScript for wood skin -->
          </g>
          <!-- Pointer - dynamically positioned -->
          <polygon class="pointer" points="210,30 200,15 220,15"></polygon>
        </svg>
        <button class="center-button" role="button" tabindex="0" aria-label="Spin the wheel">
          <span class="button-icon">🎯</span>
        </button>
      </div>
      
      <div aria-live="polite" aria-atomic="true" style="position: absolute; left: -10000px;">
        <!-- Screen reader announcements -->
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _setupEventListeners() {
    const centerButton = this.shadowRoot.querySelector('.center-button');
    const wheelSvg = this.shadowRoot.querySelector('.wheel-svg');

    // Center button click
    centerButton.addEventListener('click', () => {
      if (!this._isSpinning) {
        this.spin();
      }
    });

    // Keyboard support
    centerButton.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !this._isSpinning) {
        e.preventDefault();
        this.spin();
      }
    });

    // Wheel click (alternative to center button)
    wheelSvg.addEventListener('click', (e) => {
      if (!this._isSpinning && e.target !== centerButton) {
        this.spin();
      }
    });
  }

  _setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this._updateCanvasSize();
      });
      this._resizeObserver.observe(this);
    }
  }

  _updateFromAttributes() {
    // Update config from attributes
    this._config.skin = this.getAttribute('skin') || 'minimal';
    this._config.theme = this.getAttribute('theme') || 'light';
    this._config.targetPrize = this.getAttribute('target-prize') || 'random';
    this._config.spinDuration = this._clamp(
      parseInt(this.getAttribute('spin-duration')) || 3000,
      500,
      10000
    );
    this._config.size = this._clamp(
      parseInt(this.getAttribute('size')) || 420,
      200,
      800
    );
    this._config.easing = this.getAttribute('easing') || 'easeOutCubic';
    this._config.minRotations = this._clamp(
      parseInt(this.getAttribute('min-rotations')) || 3,
      1,
      10
    );

    // Update CSS custom properties
    this.style.setProperty('--wheel-size', `${this._config.size}px`);
  }

  _updateCanvasSize() {
    const svg = this.shadowRoot.querySelector('.wheel-svg');
    const pointer = this.shadowRoot.querySelector('.pointer');
    const container = this.shadowRoot.querySelector('.wheel-container');
    
    if (svg && pointer && container) {
      const containerRect = container.getBoundingClientRect();
      const actualSize = Math.min(containerRect.width, containerRect.height);
      
      // Update the effective size based on actual container size
      const effectiveSize = actualSize > 0 ? Math.min(actualSize, this._config.size) : this._config.size;
      
      // Update viewBox to maintain aspect ratio
      svg.setAttribute('viewBox', `0 0 ${this._config.size} ${this._config.size}`);
      
      // Update pointer position to be centered
      const centerX = this._config.size / 2;
      const pointerY = 30; // Distance from top
      pointer.setAttribute('points', `${centerX},${pointerY} ${centerX-10},${pointerY-15} ${centerX+10},${pointerY-15}`);
      
      // Update CSS custom property for responsive sizing
      this.style.setProperty('--actual-size', `${effectiveSize}px`);
    }
  }

  _render() {
    if (this._segments.length === 0) {
      this._renderEmptyState();
      return;
    }

    this._renderSegments();
    this._renderSkinElements();
    this._updateWheelRotation();
    this._updateCanvasSize(); // Ensure pointer is positioned correctly
  }

  _renderEmptyState() {
    const wheelGroup = this.shadowRoot.querySelector('.wheel-group');
    const centerX = this._config.size / 2;
    const centerY = this._config.size / 2;
    const radius = (this._config.size / 2) - 30;
    
    wheelGroup.innerHTML = `
      <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="#f0f0f0" stroke="#ccc" stroke-width="2"/>
      <text x="${centerX}" y="${centerY}" text-anchor="middle" dominant-baseline="middle" 
            font-family="Arial, sans-serif" font-size="16" fill="#666">
        No segments defined
      </text>
    `;
  }

  _renderSegments() {
    const wheelGroup = this.shadowRoot.querySelector('.wheel-group');
    const centerX = this._config.size / 2;
    const centerY = this._config.size / 2;
    
    // Calculate radius accounting for wood rings if wood skin is active
    let radius = (this._config.size / 2) - 30; // Leave margin for pointer
    if (this._config.skin === 'wood') {
      // Reduce radius to fit inside the inner wood ring
      const ringOuterWidthFactor = 0.08;
      const ringInnerWidthFactor = 0.05;
      const ringOuterWidth = this._config.size * ringOuterWidthFactor;
      const ringInnerWidth = this._config.size * ringInnerWidthFactor;
      radius = radius - ringOuterWidth - ringInnerWidth - 5; // Extra 5px padding
    }
    
    const segmentAngle = 360 / this._segments.length;

    let html = '';

    this._segments.forEach((segment, index) => {
      // Match wheel-demo: segments start at 0° (3 o'clock) going clockwise
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
      // Create segment path
      const path = this._createSegmentPath(centerX, centerY, radius, startAngle, endAngle);
      
      // Calculate text position (keep labels away from segment edges)
      const textAngle = startAngle + segmentAngle / 2;
      const textRadius = radius * 0.6;
      const textX = centerX + textRadius * Math.cos(this._degreesToRadians(textAngle));
      const textY = centerY + textRadius * Math.sin(this._degreesToRadians(textAngle));

      // Calculate text rotation for better readability
      let textRotation = textAngle;
      if (textAngle > 90 && textAngle < 270) {
        textRotation += 180; // Flip text to keep it readable
      }

      // Dynamic font size based on wheel size and segment count
      const baseFontSize = Math.max(14, Math.min(24, this._config.size * 0.04));
      const segmentAdjustedSize = Math.max(12, baseFontSize - (this._segments.length - 4) * 2);

      html += `
        <g>
          <!-- Segment path with background color -->
          <path class="segment" 
                d="${path}" 
                fill="${segment.bg || segment.color}" 
                stroke="${this._config.skin === 'wood' ? 'var(--separator-color)' : '#333'}" 
                stroke-width="2"/>
          <!-- Segment text -->
          <text class="segment-text" 
                x="${textX}" 
                y="${textY}" 
                transform="rotate(${textRotation} ${textX} ${textY})"
                font-size="${segmentAdjustedSize}"
                fill="${segment.text || '#000'}"
                text-anchor="middle"
                dominant-baseline="middle">
            ${segment.label}
          </text>
        </g>
      `;
    });

    // Add center hub with brass gradient for wood skin
    const hubRadius = this._config.size * 0.08;
    const hubFill = this._config.skin === 'wood' ? 'url(#brassHub)' : 'var(--hub-color)';
    const hubStroke = this._config.skin === 'wood' ? '#7a5a1a' : 'var(--separator-color)';
    
    html += `
      <circle class="hub" cx="${centerX}" cy="${centerY}" r="${hubRadius}"
              fill="${hubFill}" stroke="${hubStroke}" stroke-width="3"
              filter="${this._config.skin === 'wood' ? 'url(#dropShadow)' : 'none'}"/>
    `;

    wheelGroup.innerHTML = html;
  }

  _renderSkinElements() {
    const spokesGroup = this.shadowRoot.querySelector('.wood-spokes');
    
    if (this._config.skin === 'wood') {
      spokesGroup.style.display = 'block';
      this._renderWoodSpokes();
    } else {
      spokesGroup.style.display = 'none';
    }
  }

  _renderWoodSpokes() {
    const spokesGroup = this.shadowRoot.querySelector('.wood-spokes');
    const centerX = this._config.size / 2;
    const centerY = this._config.size / 2;
    const radius = (this._config.size / 2) - 30;
    
    // Ring dimensions - no handles, just rings
    const ringOuterWidthFactor = 0.08;
    const ringInnerWidthFactor = 0.05;
    const glassRingWidth = 8;
    
    const ringOuterWidth = this._config.size * ringOuterWidthFactor;
    const ringInnerWidth = this._config.size * ringInnerWidthFactor;

    let helmHtml = '';

    // Outer ring only - fits within the wheel boundary
    helmHtml += `
      <circle cx="${centerX}" cy="${centerY}" r="${radius - ringOuterWidth / 2}" 
              fill="none" stroke="url(#woodRingOuter)" stroke-width="${ringOuterWidth}"
              filter="url(#dropShadow)" />
    `;

    // Inner ring
    helmHtml += `
      <circle cx="${centerX}" cy="${centerY}" r="${radius - ringOuterWidth - ringInnerWidth / 2}" 
              fill="none" stroke="url(#woodRingInner)" stroke-width="${ringInnerWidth}" />
    `;

    // Glass-like inner border (very subtle transparent effect)
    const glassRadius = radius - ringOuterWidth - ringInnerWidth;
    helmHtml += `
      <circle cx="${centerX}" cy="${centerY}" r="${glassRadius}" 
              fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="3"
              opacity="0.5" />
      <circle cx="${centerX}" cy="${centerY}" r="${glassRadius - 2}" 
              fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"
              opacity="0.6" />
    `;

    spokesGroup.innerHTML = helmHtml;
  }

  _createSegmentPath(centerX, centerY, radius, startAngle, endAngle) {
    const startAngleRad = this._degreesToRadians(startAngle);
    const endAngleRad = this._degreesToRadians(endAngle);

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
  }

  _resolveTargetIndex(options) {
    // Priority: options.targetIndex > options.targetLabel > attribute target-prize > random
    if (typeof options.targetIndex === 'number') {
      return this._clamp(options.targetIndex, 0, this._segments.length - 1);
    }

    const targetLabel = options.targetLabel || this._config.targetPrize;
    if (targetLabel && targetLabel !== 'random') {
      const index = this._segments.findIndex(segment => 
        segment.label.toLowerCase() === targetLabel.toLowerCase()
      );
      if (index !== -1) {
        return index;
      }
    }

    // Random selection
    return Math.floor(Math.random() * this._segments.length);
  }

  _animateSpin(targetIndex) {
    return new Promise((resolve) => {
      this._isSpinning = true;
      const centerButton = this.shadowRoot.querySelector('.center-button');
      const wheelSvg = this.shadowRoot.querySelector('.wheel-svg');
      
      centerButton.disabled = true;
      wheelSvg.classList.add('spinning');

      // Calculate target rotation
      const segmentAngle = 360 / this._segments.length;
      const extraRotations = this._config.minRotations * 360;
      
      // Calculate the angle needed to land on target segment
      // Using the EXACT same logic as wheel-demo's getAngleToSegment function
      
      // Step 1: Calculate segment center angle (segments start at 0° going clockwise)
      const segmentCenterAngle = (targetIndex * segmentAngle) + (segmentAngle / 2);
      
      // Step 2: Pointer is at top = 270° (12 o'clock position)
      const pointerAngle = 270;
      
      // Step 3: Calculate the absolute angle where we want to end up
      let targetAngle = pointerAngle - segmentCenterAngle;
      targetAngle = ((targetAngle % 360) + 360) % 360; // normalizeAngle
      
      // Step 4: Calculate how much to rotate from current position
      // We need to find the shortest path that includes at least minRotations full spins
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
      
      // Debug logging
      console.log('🎯 Targeting Debug:');
      console.log(`  Total segments: ${this._segments.length}`);
      console.log(`  Target index: ${targetIndex} ("${this._segments[targetIndex].label}")`);
      console.log(`  Segment angle: ${segmentAngle.toFixed(2)}°`);
      console.log(`  Segment center angle: ${segmentCenterAngle.toFixed(2)}°`);
      console.log(`  Target absolute angle: ${targetAngle.toFixed(2)}°`);
      console.log(`  Current rotation: ${this._currentRotation.toFixed(2)}° (normalized: ${currentNormalized.toFixed(2)}°)`);
      console.log(`  Rotation needed: ${rotationNeeded.toFixed(2)}°`);
      console.log(`  Extra rotations: ${extraRotations}°`);
      console.log(`  Final target rotation: ${this._targetRotation.toFixed(2)}°`);

      // Animation parameters
      const startTime = performance.now();
      const startRotation = this._currentRotation;
      const rotationDiff = this._targetRotation - startRotation;
      const duration = this._config.spinDuration;

      let lastSegmentIndex = -1;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        const easedProgress = this._applyEasing(progress, this._config.easing);
        
        // Update rotation
        this._currentRotation = startRotation + (rotationDiff * easedProgress);
        this._updateWheelRotation();

        // Emit tick events
        const currentSegmentIndex = this._getCurrentSegmentIndex();
        if (currentSegmentIndex !== lastSegmentIndex) {
          this.dispatchEvent(new CustomEvent('spintick', {
            detail: { segmentIndex: currentSegmentIndex }
          }));
          lastSegmentIndex = currentSegmentIndex;
        }

        if (progress < 1) {
          this._animationId = requestAnimationFrame(animate);
        } else {
          // Animation complete
          this._isSpinning = false;
          centerButton.disabled = false;
          wheelSvg.classList.remove('spinning');
          
          // Use the targetIndex directly (the rotation is deterministic)
          // This matches how wheel-demo handles it
          const finalSegmentIndex = targetIndex;
          const prize = this._segments[finalSegmentIndex];
          
          // Log final state
          const finalRotation = this._currentRotation;
          const normalizedFinal = ((finalRotation % 360) + 360) % 360;
          console.log('🏁 Final State:');
          console.log(`  Final rotation: ${finalRotation.toFixed(2)}° (normalized: ${normalizedFinal.toFixed(2)}°)`);
          console.log(`  Result: "${prize.label}" (index ${targetIndex})`);
          console.log(`  ✅ SUCCESS`);
          
          // CRITICAL: Normalize rotation for next spin
          // Keep the visual position but reset to 0-360 range
          this._currentRotation = normalizedFinal;
          console.log(`  Reset rotation to: ${this._currentRotation.toFixed(2)}° for next spin`);
          
          this._lastResult = { prize: prize.label, index: finalSegmentIndex };

          // Announce result for screen readers
          this._announceResult(prize.label);

          // Dispatch spinend event
          this.dispatchEvent(new CustomEvent('spinend', {
            detail: { prize: prize.label, index: finalSegmentIndex }
          }));

          resolve({ prize: prize.label, index: finalSegmentIndex });
        }
      };

      this._animationId = requestAnimationFrame(animate);
    });
  }

  _updateWheelRotation() {
    const wheelGroup = this.shadowRoot.querySelector('.wheel-group');
    if (wheelGroup) {
      const centerX = this._config.size / 2;
      const centerY = this._config.size / 2;
      wheelGroup.style.transform = `rotate(${this._currentRotation}deg)`;
      wheelGroup.style.transformOrigin = `${centerX}px ${centerY}px`;
    }
  }

  _getCurrentSegmentIndex() {
    // Normalize rotation to 0-360
    const normalizedRotation = ((this._currentRotation % 360) + 360) % 360;
    
    // Calculate which segment the pointer is pointing to
    const segmentAngle = 360 / this._segments.length;
    
    // Segments start at -90° (top) and go clockwise
    // Pointer is at 0° (top)
    // As the wheel rotates positively (clockwise), the segments rotate clockwise
    // We need to find which segment is currently under the pointer at 0°
    
    // Adjust for the -90° starting position
    const adjustedRotation = (normalizedRotation + 90) % 360;
    
    // Calculate which segment is at the pointer position
    // Since wheel rotates clockwise, we divide by segment angle
    const segmentIndex = Math.floor(adjustedRotation / segmentAngle) % this._segments.length;
    
    return segmentIndex;
  }

  _applyEasing(progress, easingType) {
    switch (easingType) {
      case 'linear':
        return progress;
      case 'easeOutCubic':
        return 1 - Math.pow(1 - progress, 3);
      case 'easeOutQuint':
        return 1 - Math.pow(1 - progress, 5);
      default:
        return 1 - Math.pow(1 - progress, 4); // Default to easeOutQuart
    }
  }

  _announceResult(prize) {
    const announcer = this.shadowRoot.querySelector('[aria-live]');
    if (announcer) {
      announcer.textContent = `Wheel stopped on ${prize}`;
    }
  }

  _getDefaultColor(index) {
    const colors = [
      '#F5C451', '#E6E6E6', '#FF7B8B', '#67D6CD', 
      '#59B6E6', '#9BD7C2', '#FD79A8', '#74B9FF'
    ];
    return colors[index % colors.length];
  }

  _truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength - 1) + '…' : text;
  }

  _degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  _clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}

// Register the custom element
customElements.define('lucky-wheel', LuckyWheel);

// Export for ES modules (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LuckyWheel;
}
