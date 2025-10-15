# LuckyWheel Web Component v1.0.0

A framework-agnostic spinning wheel component that works in any web environment - plain HTML, React, Vue, Next.js, Angular, and more.

## 🚀 Quick Start

### 1. Include the Script

```html
<script src="wheel.js"></script>
```

### 2. Add the Element

```html
<lucky-wheel
  skin="wood"
  theme="light"
  target-prize="Gift Card"
  spin-duration="3500"
  size="420"
  easing="easeOutCubic"
  min-rotations="3"
></lucky-wheel>
```

### 3. Configure Segments

```javascript
const wheel = document.querySelector('lucky-wheel');
wheel.segments = [
  { label: "Coffee",   bg:"#F5C451", text:"#111" },
  { label: "Try Again",bg:"#E6E6E6", text:"#222" },
  { label: "T-Shirt",  bg:"#FF7B8B", text:"#fff" },
  { label: "Free Mug", bg:"#67D6CD", text:"#073B3A" },
  { label: "25% Off",  bg:"#59B6E6", text:"#072B42" },
  { label: "Gift Card",bg:"#9BD7C2", text:"#072B3A" },
];

wheel.addEventListener('spinend', (e) => {
  const { prize, index } = e.detail;
  console.log('Winner:', prize, index);
});
```

## 📋 API Reference

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `skin` | string | "minimal" | Visual theme: `minimal` \| `wood` \| `chrome` \| `casino` |
| `theme` | string | "light" | Color scheme: `light` \| `dark` |
| `target-prize` | string | "random" | Prize label to land on, or "random" |
| `spin-duration` | number | 3000 | Spin duration in milliseconds (500-10000) |
| `size` | number | 420 | Wheel diameter in pixels (200-800) |
| `easing` | string | "easeOutCubic" | Animation easing: `linear` \| `easeOutCubic` \| `easeOutQuint` |
| `min-rotations` | number | 3 | Minimum full rotations before stopping (1-10) |

### Properties

#### `segments` (get/set)
Array of segment objects. Each segment should have:
- `label` (string): Display text for the segment
- `bg` (string): Background color (hex, rgb, etc.)
- `text` (string): Text color (hex, rgb, etc.)

```javascript
wheel.segments = [
  { label: "Prize 1", bg: "#ff0000", text: "#ffffff" },
  { label: "Prize 2", bg: "#00ff00", text: "#000000" }
];
```

### Methods

#### `spin(options?)` → `Promise<{prize, index}>`
Spin the wheel with optional targeting.

```javascript
// Random spin
wheel.spin();

// Target specific index
wheel.spin({ targetIndex: 2 });

// Target specific label
wheel.spin({ targetLabel: "Gift Card" });
```

#### `reset()` → `void`
Reset wheel to initial position and stop any animation.

```javascript
wheel.reset();
```

#### `getState()` → `{spinning, lastResult, angle}`
Get current wheel state.

```javascript
const state = wheel.getState();
console.log(state.spinning); // boolean
console.log(state.lastResult); // {prize, index} or null
console.log(state.angle); // current rotation in degrees
```

### Events

#### `spinstart`
Fired when spin animation begins.

```javascript
wheel.addEventListener('spinstart', (e) => {
  const { targetIndex, targetPrize } = e.detail;
  console.log('Spin started, targeting:', targetPrize);
});
```

#### `spintick`
Fired when the pointer crosses a segment boundary during spinning.

```javascript
wheel.addEventListener('spintick', (e) => {
  const { segmentIndex } = e.detail;
  console.log('Pointer crossed segment:', segmentIndex);
});
```

#### `spinend`
Fired when spin animation completes.

```javascript
wheel.addEventListener('spinend', (e) => {
  const { prize, index } = e.detail;
  console.log('Spin ended on:', prize, 'at index:', index);
});
```

## 🎨 Styling & Themes

### Built-in Skins
- **minimal**: Clean, simple design
- **wood**: Wood-textured steering wheel style
- **chrome**: Metallic chrome finish
- **casino**: Vegas-style with glow effects

### Theme Support
- **light**: Light background, dark text
- **dark**: Dark background, light text

### Custom Styling
The component uses CSS custom properties that you can override:

```css
lucky-wheel {
  --wheel-size: 500px;
  --pointer-color: #ff6b6b;
  --hub-color: #ffffff;
  --separator-color: #333333;
  --text-color: #000000;
}
```

## 🔧 Framework Integration

### React
```jsx
import { useRef, useEffect } from 'react';

function WheelComponent() {
  const wheelRef = useRef();

  useEffect(() => {
    const wheel = wheelRef.current;
    wheel.segments = [
      { label: "Prize 1", bg: "#ff0000", text: "#ffffff" },
      { label: "Prize 2", bg: "#00ff00", text: "#000000" }
    ];

    const handleSpinEnd = (e) => {
      console.log('Winner:', e.detail.prize);
    };

    wheel.addEventListener('spinend', handleSpinEnd);
    return () => wheel.removeEventListener('spinend', handleSpinEnd);
  }, []);

  return (
    <lucky-wheel
      ref={wheelRef}
      skin="wood"
      theme="light"
      size="400"
    />
  );
}
```

### Vue
```vue
<template>
  <lucky-wheel
    ref="wheel"
    skin="wood"
    theme="light"
    size="400"
    @spinend="handleSpinEnd"
  />
</template>

<script>
export default {
  mounted() {
    this.$refs.wheel.segments = [
      { label: "Prize 1", bg: "#ff0000", text: "#ffffff" },
      { label: "Prize 2", bg: "#00ff00", text: "#000000" }
    ];
  },
  methods: {
    handleSpinEnd(event) {
      console.log('Winner:', event.detail.prize);
    }
  }
}
</script>
```

### Angular
```typescript
// app.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <lucky-wheel 
      #wheel
      skin="wood" 
      theme="light" 
      size="400">
    </lucky-wheel>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('wheel') wheel!: ElementRef;

  ngAfterViewInit() {
    this.wheel.nativeElement.segments = [
      { label: "Prize 1", bg: "#ff0000", text: "#ffffff" },
      { label: "Prize 2", bg: "#00ff00", text: "#000000" }
    ];

    this.wheel.nativeElement.addEventListener('spinend', (e: any) => {
      console.log('Winner:', e.detail.prize);
    });
  }
}
```

## ♿ Accessibility

The component includes built-in accessibility features:

- **Keyboard Support**: Press Enter or Space to spin
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators
- **Screen Reader Announcements**: Results announced via `aria-live`

## 📱 Responsive Design

The wheel automatically adapts to different screen sizes:
- Desktop: Full size (up to 800px)
- Tablet: Medium size (400-600px)
- Mobile: Compact size (280-400px)

## 🔒 Safety & Validation

- Attribute values are automatically clamped to safe ranges
- Minimum 2 segments required for spinning
- Animation guards prevent double-spinning
- Graceful fallbacks for missing segments

## 🎯 Advanced Usage

### Deterministic Results
```javascript
// Always land on specific prize
wheel.setAttribute('target-prize', 'Gift Card');
wheel.spin();

// Or use method parameter
wheel.spin({ targetLabel: 'Gift Card' });
```

### Custom Animation Timing
```javascript
wheel.setAttribute('spin-duration', '5000'); // 5 seconds
wheel.setAttribute('min-rotations', '5'); // 5 full spins minimum
wheel.setAttribute('easing', 'easeOutQuint'); // Smooth deceleration
```

### Event-Driven Logic
```javascript
wheel.addEventListener('spinstart', () => {
  // Disable UI, show loading
});

wheel.addEventListener('spintick', (e) => {
  // Play tick sound, update UI
  playTickSound();
});

wheel.addEventListener('spinend', (e) => {
  // Award prize, update database
  awardPrize(e.detail.prize);
});
```

## 🐛 Troubleshooting

### Common Issues

**Wheel not showing segments**
```javascript
// Make sure segments are set after the element is connected
setTimeout(() => {
  wheel.segments = mySegments;
}, 0);
```

**Events not firing**
```javascript
// Ensure event listeners are added after element is defined
customElements.whenDefined('lucky-wheel').then(() => {
  wheel.addEventListener('spinend', handler);
});
```

**Styling not applied**
```css
/* Use :defined pseudo-class for custom element styles */
lucky-wheel:defined {
  --wheel-size: 500px;
}
```

## 📄 License

MIT License - feel free to use in commercial and personal projects.

## 🤝 Contributing

Issues and pull requests welcome! Please ensure:
- Cross-browser compatibility
- Accessibility compliance
- Performance optimization
- Clear documentation

---

**Version**: 1.0.0  
**Size**: ~15KB minified  
**Dependencies**: None  
**Browser Support**: Modern browsers (ES6+)
