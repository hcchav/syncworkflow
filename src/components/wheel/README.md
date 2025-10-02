# WheelSpin Component

A production-ready, skinnable, and fully configurable wheel spinner component for React applications. Built with TypeScript, featuring SVG and PixiJS renderers, comprehensive accessibility support, and extensive customization options.

## Features

- 🎨 **Multiple Skins**: Wood helm, modern helm, minimal, and casino themes
- 🎯 **Precise Control**: Target specific segments or use weighted random selection
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🎭 **Dual Renderers**: SVG with Framer Motion or PixiJS with GSAP
- 🔧 **Configurable**: Extensive customization options for appearance and behavior
- 📱 **Responsive**: Works on all screen sizes with reduced motion support
- 🧪 **Well Tested**: Comprehensive test suite with 100% TypeScript coverage
- 🌳 **Tree Shakeable**: Import only what you need

## Installation

```bash
npm install framer-motion
# For PixiJS renderer (optional)
npm install pixi.js gsap
```

## Quick Start

```tsx
import { useRef } from "react";
import { WheelSpin, type WheelSpinRef, type WheelConfig } from "./components/wheel";

const config: WheelConfig = {
  size: 480,
  pointer: "top",
  spin: { duration: 4.2, easing: "power4.out", extraSpins: [5,7] },
  selection: { seed: 42, noRepeatUntilExhausted: false },
  segments: [
    { label: "Coffee", color: "#FFDC35" },
    { label: "Sticker", color: "#03c4eb" },
    { label: "10% Off", color: "#f4f4f4" },
    { label: "Try Again", color: "#ffffff" },
    { label: "T-Shirt", color: "#03c4eb" },
    { label: "Mug", color: "#FFDC35" },
  ],
  skin: {
    name: "wood-helm",
    style: "wood",
    showHelm: true,
    separator: { stroke: "#555", strokeWidth: 2 },
    hub: { show: true, fill: "#ffe08a", stroke: "#7a5a1a" },
  },
};

export default function Demo() {
  const ref = useRef<WheelSpinRef>(null);
  
  return (
    <>
      <WheelSpin 
        ref={ref} 
        config={config} 
        onResult={({index, segment}) => console.log(index, segment)} 
      />
      <button onClick={() => ref.current?.spin({ targetLabel: "Coffee" })}>
        Spin to Coffee
      </button>
    </>
  );
}
```

## API Reference

### WheelSpin Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `WheelConfig` | - | Wheel configuration object |
| `onResult` | `(result: SpinResult) => void` | - | Callback when spin completes |
| `renderer` | `"svg" \| "pixi"` | `"svg"` | Renderer type |
| `className` | `string` | - | CSS class name |
| `style` | `CSSProperties` | - | Inline styles |

### WheelConfig

```typescript
type WheelConfig = {
  size?: number;                   // px; default 480
  pointer?: "top" | "right" | "none"; // default "top"
  spin: {
    duration?: number;             // seconds, default 4.2
    easing?: "easeOut" | "power4.out" | "linear"; // default "power4.out"
    extraSpins?: [min:number, max:number]; // default [5,7]
  };
  selection: {
    weights?: number[];            // default equal weights
    targetIndex?: number | null;   // when set, must land on index
    targetLabel?: string | null;   // convenience over index
    noRepeatUntilExhausted?: boolean; // default false
    seed?: number | string | null; // deterministic RNG if set
  };
  segments: Array<{
    label: string;
    color?: string;                // slice fill
    labelColor?: string;           // text color
    payload?: unknown;             // arbitrary metadata
  }>;
  skin: SkinConfig;
};
```

### SkinConfig

```typescript
type SkinConfig = {
  name?: "wood-helm" | "modern-helm" | "minimal" | "casino";
  showHelm?: boolean;              // default true for helm skins
  style?: "wood" | "modern";       // material styling for helm skins
  handleWidthFactor?: number;      // 0..1 of size, default 0.12
  handleLengthFactor?: number;     // 0..1 of radius, default 0.42
  ringOuterWidthFactor?: number;   // 0..1 of size, default 0.08
  ringInnerWidthFactor?: number;   // 0..1 of size, default 0.05
  separator: {
    stroke?: string;               // default "#555"
    strokeWidth?: number;          // default 2
    dashed?: boolean;              // default false
  };
  hub: {
    show?: boolean;                // default true
    fill?: string;                 // default brass gradient
    stroke?: string;               // default dark brass
  };
  effects?: {
    dropShadow?: boolean;
    glow?: boolean;
  };
};
```

### Imperative API

```typescript
type WheelSpinRef = {
  spin: (opts?: { targetIndex?: number; targetLabel?: string }) => Promise<SpinResult>;
  getRotation: () => number;
  setConfig: (patch: Partial<WheelConfig>) => void;
};
```

## Skins

### Wood Helm
Classic ship's wheel appearance with wooden textures and brass hub.

```tsx
skin: {
  name: "wood-helm",
  style: "wood",
  showHelm: true,
}
```

### Modern Helm
Contemporary design with metallic gradients and clean lines.

```tsx
skin: {
  name: "modern-helm",
  style: "modern",
  showHelm: true,
}
```

### Minimal
Clean, simple design with no decorative elements.

```tsx
skin: {
  name: "minimal",
  showHelm: false,
}
```

### Casino
Flashy casino-style with gold accents and decorative elements.

```tsx
skin: {
  name: "casino",
  showHelm: false,
  effects: { glow: true },
}
```

## Advanced Usage

### Weighted Selection

```tsx
const config = {
  // ... other config
  selection: {
    weights: [10, 5, 1, 1, 5, 10], // Higher numbers = more likely
  },
};
```

### No-Repeat Mode

```tsx
const config = {
  // ... other config
  selection: {
    noRepeatUntilExhausted: true, // All segments visited before repeating
  },
};
```

### Deterministic Results

```tsx
const config = {
  // ... other config
  selection: {
    seed: "my-seed", // Same seed = same sequence
  },
};
```

### Custom Skin Registration

```tsx
import { registerSkin } from "./components/wheel";

registerSkin("my-custom-skin", (config, geometry) => ({
  rings: [/* custom ring elements */],
  handles: [/* custom handle elements */],
  hub: /* custom hub element */,
  filters: [/* custom SVG filters */],
}));
```

## Theming with CSS Variables

```css
:root {
  --wheel-separator: #555;
  --wheel-label-color: #333;
  --wheel-hub-fill: #ffe08a;
  --wheel-hub-stroke: #7a5a1a;
  --wheel-ring-outer: #8b4513;
  --wheel-ring-inner: #a0522d;
  --wheel-handle-fill: #654321;
  --wheel-glow-color: rgba(255, 220, 53, 0.3);
}
```

## Accessibility

The component is fully accessible with:

- **Keyboard Navigation**: Tab to focus, Enter/Space to spin
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Focus Management**: Clear focus indicators and states

## Testing

```bash
# Run unit tests
npm test

# Run component tests
npm run test:components

# Run e2e tests
npm run test:e2e
```

## Storybook

```bash
# Start Storybook
npm run storybook
```

View interactive examples and documentation at `http://localhost:6006`

## Performance

- **SVG Renderer**: Lightweight, uses Framer Motion for smooth animations
- **PixiJS Renderer**: Hardware-accelerated, ideal for complex animations
- **Tree Shaking**: Import only the parts you need
- **No Global State**: Each instance is independent

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Changelog

### v1.0.0
- Initial release
- SVG and PixiJS renderers
- Four built-in skins
- Comprehensive accessibility support
- Full TypeScript support
- Extensive test coverage
