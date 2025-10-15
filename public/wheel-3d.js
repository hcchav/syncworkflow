/**
 * 3D Lucky Wheel Web Component with Three.js
 * Realistic wooden ship's wheel with proper lighting and textures
 * 
 * Note: This component requires Three.js to be loaded via CDN or bundler
 */

// Wait for THREE to be available
const waitForTHREE = () => {
  return new Promise((resolve) => {
    if (typeof THREE !== 'undefined') {
      resolve(THREE);
    } else {
      const checkInterval = setInterval(() => {
        if (typeof THREE !== 'undefined') {
          clearInterval(checkInterval);
          resolve(THREE);
        }
      }, 100);
    }
  });
};

class LuckyWheel3D extends HTMLElement {
  static get observedAttributes() {
    return ['spin-duration', 'min-rotations', 'target-prize'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Three.js objects
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.wheel = null;
    this.animationId = null;
    
    // State
    this._segments = [];
    this._isSpinning = false;
    this._currentRotation = 0;
    this._targetRotation = 0;
    this._config = {
      spinDuration: 3000,
      minRotations: 3,
      size: 600
    };
  }

  connectedCallback() {
    this._createTemplate();
    this._initThreeJS();
    this._createWheel();
    this._animate();
    
    // Handle window resize
    window.addEventListener('resize', () => this._onResize());
  }

  disconnectedCallback() {
    window.removeEventListener('resize', () => this._onResize());
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'spin-duration':
        this._config.spinDuration = Math.max(500, Math.min(10000, parseInt(newValue) || 3000));
        break;
      case 'min-rotations':
        this._config.minRotations = Math.max(1, Math.min(10, parseInt(newValue) || 3));
        break;
    }
  }

  set segments(value) {
    if (Array.isArray(value)) {
      this._segments = value;
      this._updateWheel();
    }
  }

  get segments() {
    return this._segments;
  }

  async spin(options = {}) {
    if (this._isSpinning) return;
    
    const targetLabel = options.targetLabel || null;
    let targetIndex;
    
    if (targetLabel) {
      targetIndex = this._segments.findIndex(s => s.label === targetLabel);
      if (targetIndex === -1) targetIndex = 0;
    } else {
      targetIndex = Math.floor(Math.random() * this._segments.length);
    }
    
    return this._animateSpin(targetIndex);
  }

  _createTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
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
        }
        
        canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .center-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, #FFD700 0%, #DAA520 50%, #B8860B 100%);
          border: 4px solid #8B4513;
          cursor: pointer;
          font-size: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3);
          transition: transform 0.2s;
          z-index: 10;
        }
        
        .center-button:hover:not(:disabled) {
          transform: translate(-50%, -50%) scale(1.05);
        }
        
        .center-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      </style>
      
      <div class="container">
        <canvas id="wheel-canvas"></canvas>
        <button class="center-button" id="spin-btn">⚓</button>
      </div>
    `;
    
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _initThreeJS() {
    const container = this.shadowRoot.querySelector('.container');
    const canvas = this.shadowRoot.getElementById('wheel-canvas');
    
    // Scene with dark casino background
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
    
    // Camera positioned for perfectly straight-on view
    const aspect = 1;
    this.camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 12);
    this.camera.lookAt(0, 0, 0);
    
    // High-quality renderer
    this.renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(600, 600);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5; // Balanced brightness
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    
    // Animation tracking
    this.segmentLights = [];
    this.segmentMeshes = [];
    
    // Add environment map for reflections
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    this.envMap = pmremGenerator.fromScene(new THREE.Scene()).texture;
    
    // Casino-style dramatic lighting
    const ambientLight = new THREE.AmbientLight(0x4a4a6a, 0.6);
    this.scene.add(ambientLight);
    
    // Main spotlight from above
    const spotLight = new THREE.SpotLight(0xffffff, 2.5);
    spotLight.position.set(0, 8, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.3;
    spotLight.decay = 1.5;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 4096;
    spotLight.shadow.mapSize.height = 4096;
    this.scene.add(spotLight);
    
    // Colored accent lights for casino vibe
    const accentLight1 = new THREE.PointLight(0xff00ff, 0.8, 15);
    accentLight1.position.set(6, 3, 3);
    this.scene.add(accentLight1);
    
    const accentLight2 = new THREE.PointLight(0x00ffff, 0.8, 15);
    accentLight2.position.set(-6, 3, 3);
    this.scene.add(accentLight2);
    
    // Rim light for glow
    const rimLight = new THREE.DirectionalLight(0x6666ff, 1.2);
    rimLight.position.set(0, -3, -5);
    this.scene.add(rimLight);
    
    // Create procedural wood texture
    this._createWoodTexture();
  }
  
  _createWoodTexture() {
    // Create canvas for wood grain texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Rich mahogany wood color with variation
    const gradient = ctx.createLinearGradient(0, 0, 512, 0);
    gradient.addColorStop(0, '#A0522D');
    gradient.addColorStop(0.2, '#8B4513');
    gradient.addColorStop(0.4, '#A0522D');
    gradient.addColorStop(0.6, '#8B4513');
    gradient.addColorStop(0.8, '#6B3410');
    gradient.addColorStop(1, '#8B4513');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add realistic wood grain lines
    ctx.strokeStyle = 'rgba(40, 20, 10, 0.4)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 512; i += 6) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      const waveOffset = Math.sin(i * 0.05) * 15;
      ctx.lineTo(i + waveOffset + Math.random() * 8 - 4, 512);
      ctx.stroke();
    }
    
    // Add knots and imperfections
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const radius = Math.random() * 20 + 10;
      
      const knotGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      knotGradient.addColorStop(0, 'rgba(40, 20, 10, 0.5)');
      knotGradient.addColorStop(1, 'rgba(40, 20, 10, 0)');
      
      ctx.fillStyle = knotGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    this.woodTexture = new THREE.CanvasTexture(canvas);
    this.woodTexture.wrapS = THREE.RepeatWrapping;
    this.woodTexture.wrapT = THREE.RepeatWrapping;
  }

  _createWheel() {
    // Create wheel group
    this.wheel = new THREE.Group();
    
    // Create segment wheel
    this._createSegmentWheel();
    
    // Create wooden spokes
    this._createSpokes();
    
    // Create center hub
    this._createHub();
    
    // Tilt wheel slightly for better 3D appearance
    this.wheel.rotation.x = -0.15;
    
    this.scene.add(this.wheel);
  }

  _createWoodenRim() {
    const outerRadius = 3.8;
    const innerRadius = 3.0;
    const rimDepth = 0.4;
    
    // Create torus for rim with wood texture
    const rimGeometry = new THREE.TorusGeometry(
      (outerRadius + innerRadius) / 2,
      (outerRadius - innerRadius) / 2,
      64,
      128
    );
    
    // Apply wood texture
    const woodMaterial = new THREE.MeshStandardMaterial({
      map: this.woodTexture,
      roughness: 0.9,
      metalness: 0.0,
      bumpMap: this.woodTexture,
      bumpScale: 0.02,
    });
    
    const rim = new THREE.Mesh(rimGeometry, woodMaterial);
    rim.rotation.x = Math.PI / 2;
    rim.castShadow = true;
    rim.receiveShadow = true;
    
    this.wheel.add(rim);
  }

  _createSegmentWheel() {
    if (this._segments.length === 0) return;
    
    const radius = 2.8;
    const depth = 0.2;
    const segmentAngle = (Math.PI * 2) / this._segments.length;
    
    this._segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      
      // Create extruded segment for depth
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.absarc(0, 0, radius, startAngle, endAngle, false);
      shape.lineTo(0, 0);
      
      const extrudeSettings = {
        depth: depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 2
      };
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      
      // Parse color and make it ULTRA vibrant for casino look
      const baseColor = new THREE.Color(segment.bg || segment.color || '#cccccc');
      // Saturate and brighten by 80% for maximum vibrancy
      baseColor.r = Math.min(1, baseColor.r * 1.8);
      baseColor.g = Math.min(1, baseColor.g * 1.8);
      baseColor.b = Math.min(1, baseColor.b * 1.8);
      
      // NEON GLOW material - balanced and animated
      const material = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        roughness: 0.15,
        metalness: 0.7,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        side: THREE.DoubleSide,
        envMap: this.envMap,
        envMapIntensity: 2.0,
        emissive: baseColor,
        emissiveIntensity: 0.6, // Will be animated
        transmission: 0.05,
        thickness: 0.3,
      });
      
      const segmentMesh = new THREE.Mesh(geometry, material);
      segmentMesh.position.z = -depth / 2;
      segmentMesh.castShadow = true;
      segmentMesh.receiveShadow = true;
      
      // Store for animation
      segmentMesh.userData.baseEmissive = 0.6;
      segmentMesh.userData.animationOffset = index * 0.5;
      this.segmentMeshes.push(segmentMesh);
      
      // Add ANIMATED POINT LIGHT for each segment
      const centerAngle = (startAngle + endAngle) / 2;
      const lightRadius = radius * 0.7;
      const segmentLight = new THREE.PointLight(baseColor, 1.5, 4);
      segmentLight.position.x = Math.cos(centerAngle) * lightRadius;
      segmentLight.position.y = Math.sin(centerAngle) * lightRadius;
      segmentLight.position.z = 0.5;
      
      // Store for animation
      segmentLight.userData.baseIntensity = 1.5;
      segmentLight.userData.animationOffset = index * 0.5;
      this.segmentLights.push(segmentLight);
      
      this.wheel.add(segmentLight);
      
      // Add separator lines
      this._addSeparatorLine(startAngle, radius);
      
      // Add text
      this._addSegmentText(segment.label, startAngle, endAngle, radius, segment.text);
      
      this.wheel.add(segmentMesh);
    });
  }
  
  _addSeparatorLine(angle, radius) {
    // Glowing separator lines
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0.15),
      new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.15)
    ]);
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 3,
      transparent: true,
      opacity: 0.8
    });
    
    const line = new THREE.Line(lineGeometry, lineMaterial);
    this.wheel.add(line);
    
    // Add glow line underneath
    const glowLineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      linewidth: 5,
      transparent: true,
      opacity: 0.3
    });
    const glowLine = new THREE.Line(lineGeometry.clone(), glowLineMaterial);
    glowLine.position.z = -0.01;
    this.wheel.add(glowLine);
  }

  _addSegmentText(text, startAngle, endAngle, radius, textColor) {
    // Create high-res canvas for text texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Add glowing shadow for neon effect
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Bright white text with glow
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 56px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    
    const material = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(material);
    
    const centerAngle = (startAngle + endAngle) / 2;
    const textRadius = radius * 0.7;
    sprite.position.x = Math.cos(centerAngle) * textRadius;
    sprite.position.y = Math.sin(centerAngle) * textRadius;
    sprite.position.z = 0.3;
    sprite.scale.set(1.4, 0.35, 1);
    
    this.wheel.add(sprite);
  }

  _createSpokes() {
    const spokeCount = 6;
    const segmentRadius = 2.8; // Match segment size
    const handleStartRadius = segmentRadius + 0.1; // Start just outside segments
    const handleLength = 1.0;
    
    // Wood material with texture
    const woodMaterial = new THREE.MeshStandardMaterial({
      map: this.woodTexture,
      roughness: 0.8,
      metalness: 0.0,
      bumpMap: this.woodTexture,
      bumpScale: 0.02,
    });
    
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * Math.PI * 2) / spokeCount;
      
      // Create handle group
      const handleGroup = new THREE.Group();
      
      // Main shaft - tapered for natural look
      const shaftGeometry = new THREE.CylinderGeometry(0.07, 0.09, handleLength, 24);
      const shaft = new THREE.Mesh(shaftGeometry, woodMaterial);
      shaft.rotation.z = Math.PI / 2;
      shaft.castShadow = true;
      shaft.receiveShadow = true;
      
      // Decorative turned rings - more subtle
      const ringPositions = [0.25, 0.5, 0.75];
      ringPositions.forEach(pos => {
        const ringGeometry = new THREE.CylinderGeometry(0.10, 0.10, 0.05, 24);
        const ring = new THREE.Mesh(ringGeometry, woodMaterial);
        ring.rotation.z = Math.PI / 2;
        ring.position.x = (pos - 0.5) * handleLength;
        ring.castShadow = true;
        handleGroup.add(ring);
      });
      
      // End grip - more natural rounded shape
      const gripGeometry = new THREE.SphereGeometry(0.14, 24, 24);
      const grip = new THREE.Mesh(gripGeometry, woodMaterial);
      grip.scale.set(0.9, 0.9, 1.4);
      grip.position.x = handleLength / 2 + 0.1;
      grip.castShadow = true;
      
      handleGroup.add(shaft);
      handleGroup.add(grip);
      
      // Position handle naturally from edge
      const handleCenterRadius = handleStartRadius + handleLength / 2;
      handleGroup.position.x = Math.cos(angle) * handleCenterRadius;
      handleGroup.position.y = Math.sin(angle) * handleCenterRadius;
      handleGroup.position.z = 0.1;
      handleGroup.rotation.z = angle;
      
      this.wheel.add(handleGroup);
    }
  }

  _createHub() {
    // Create authentic brass hub matching reference image
    const hubRadius = 0.55;
    const hubHeight = 0.15;
    
    // Shiny gold disc with casino glow
    const discGeometry = new THREE.CylinderGeometry(hubRadius, hubRadius, hubHeight, 64);
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFD700, // Bright gold
      roughness: 0.1,
      metalness: 1.0,
      envMapIntensity: 2.0,
      emissive: 0xFFAA00,
      emissiveIntensity: 0.3,
    });
    
    const disc = new THREE.Mesh(discGeometry, brassMaterial);
    disc.rotation.x = Math.PI / 2;
    disc.position.z = hubHeight / 2;
    disc.castShadow = true;
    disc.receiveShadow = true;
    
    // Outer decorative ring (raised edge)
    const outerRingGeometry = new THREE.TorusGeometry(hubRadius * 0.9, 0.03, 16, 64);
    const outerRing = new THREE.Mesh(outerRingGeometry, brassMaterial);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.z = hubHeight / 2 + 0.02;
    
    // Middle ring
    const middleRingGeometry = new THREE.TorusGeometry(hubRadius * 0.6, 0.025, 16, 64);
    const middleRing = new THREE.Mesh(middleRingGeometry, brassMaterial);
    middleRing.rotation.x = Math.PI / 2;
    middleRing.position.z = hubHeight / 2 + 0.02;
    
    // Center hole (like in reference)
    const holeGeometry = new THREE.CylinderGeometry(hubRadius * 0.15, hubRadius * 0.15, hubHeight + 0.02, 32);
    const holeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.9,
      metalness: 0.1,
    });
    const hole = new THREE.Mesh(holeGeometry, holeMaterial);
    hole.rotation.x = Math.PI / 2;
    hole.position.z = hubHeight / 2;
    
    // Add subtle engraved lines (decorative)
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12;
      const lineStart = hubRadius * 0.65;
      const lineEnd = hubRadius * 0.85;
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(Math.cos(angle) * lineStart, Math.sin(angle) * lineStart, hubHeight / 2 + 0.03),
        new THREE.Vector3(Math.cos(angle) * lineEnd, Math.sin(angle) * lineEnd, hubHeight / 2 + 0.03)
      ]);
      
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8b7355, linewidth: 2 });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      this.wheel.add(line);
    }
    
    this.wheel.add(disc);
    this.wheel.add(outerRing);
    this.wheel.add(middleRing);
    this.wheel.add(hole);
  }

  _updateWheel() {
    // Clear existing wheel
    if (this.wheel) {
      this.scene.remove(this.wheel);
    }
    
    // Recreate wheel with new segments
    this._createWheel();
  }

  _animate() {
    this.animationId = requestAnimationFrame(() => this._animate());
    
    // Natural breathing glow animation
    const time = performance.now() * 0.001;
    
    this.segmentMeshes.forEach((mesh, index) => {
      const offset = mesh.userData.animationOffset || 0;
      
      // Slow, gentle breathing effect (4 second cycle)
      const breathe = Math.sin(time * 0.5 + offset) * 0.15 + 0.85; // 0.7 to 1.0
      
      // Subtle shimmer overlay (faster, smaller amplitude)
      const shimmer = Math.sin(time * 3 + offset * 2) * 0.05;
      
      // Combine effects
      const finalPulse = breathe + shimmer;
      
      mesh.material.emissiveIntensity = mesh.userData.baseEmissive * finalPulse;
    });
    
    this.segmentLights.forEach((light, index) => {
      const offset = light.userData.animationOffset || 0;
      
      // Lights pulse more subtly and slower
      const pulse = Math.sin(time * 0.5 + offset) * 0.2 + 0.8; // 0.6 to 1.0
      light.intensity = light.userData.baseIntensity * pulse;
    });
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  _animateSpin(targetIndex) {
    return new Promise((resolve) => {
      this._isSpinning = true;
      const button = this.shadowRoot.getElementById('spin-btn');
      button.disabled = true;
      
      const segmentAngle = 360 / this._segments.length;
      const extraRotations = this._config.minRotations * 360;
      
      // Calculate target
      const segmentCenterAngle = (targetIndex * segmentAngle) + (segmentAngle / 2);
      const pointerAngle = 270;
      let targetAngle = pointerAngle - segmentCenterAngle;
      targetAngle = ((targetAngle % 360) + 360) % 360;
      
      const currentNormalized = ((this._currentRotation % 360) + 360) % 360;
      let rotationNeeded = targetAngle - currentNormalized;
      
      if (rotationNeeded <= 0) {
        rotationNeeded += 360;
      }
      
      this._targetRotation = this._currentRotation + extraRotations + rotationNeeded;
      
      // Animate
      const startTime = performance.now();
      const startRotation = this._currentRotation;
      const rotationDiff = this._targetRotation - startRotation;
      const duration = this._config.spinDuration;
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        
        this._currentRotation = startRotation + (rotationDiff * easedProgress);
        
        // Update wheel rotation
        this.wheel.rotation.z = (this._currentRotation * Math.PI) / 180;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this._isSpinning = false;
          button.disabled = false;
          
          const normalizedFinal = ((this._currentRotation % 360) + 360) % 360;
          this._currentRotation = normalizedFinal;
          
          const prize = this._segments[targetIndex];
          
          this.dispatchEvent(new CustomEvent('spinend', {
            detail: { prize: prize.label, index: targetIndex }
          }));
          
          resolve({ prize: prize.label, index: targetIndex });
        }
      };
      
      requestAnimationFrame(animate);
    });
  }

  _onResize() {
    const container = this.shadowRoot.querySelector('.container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

customElements.define('lucky-wheel-3d', LuckyWheel3D);
