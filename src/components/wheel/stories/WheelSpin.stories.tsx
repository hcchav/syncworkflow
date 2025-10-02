import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { WheelSpin, WheelSpinRef, WheelConfig } from '../index';

const meta: Meta<typeof WheelSpin> = {
  title: 'Components/WheelSpin',
  component: WheelSpin,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A production-ready, skinnable, and fully configurable WheelSpin component for React applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      description: 'Wheel configuration object',
      control: { type: 'object' },
    },
    renderer: {
      description: 'Renderer type (SVG or PixiJS)',
      control: { type: 'select' },
      options: ['svg', 'pixi'],
    },
    onResult: {
      description: 'Callback fired when wheel stops spinning',
      action: 'result',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicSegments = [
  { label: 'Coffee', color: '#FFDC35' },
  { label: 'Sticker', color: '#03c4eb' },
  { label: '10% Off', color: '#f4f4f4' },
  { label: 'Try Again', color: '#ffffff' },
  { label: 'T-Shirt', color: '#03c4eb' },
  { label: 'Mug', color: '#FFDC35' },
];

const basicConfig: WheelConfig = {
  size: 480,
  pointer: 'top',
  spin: {
    duration: 4.2,
    easing: 'power4.out',
    extraSpins: [5, 7],
  },
  selection: {
    seed: 42,
    noRepeatUntilExhausted: false,
  },
  segments: basicSegments,
  skin: {
    name: 'wood-helm',
    style: 'wood',
    showHelm: true,
    handleWidthFactor: 0.12,
    handleLengthFactor: 0.42,
    ringOuterWidthFactor: 0.08,
    ringInnerWidthFactor: 0.05,
    separator: { stroke: '#555', strokeWidth: 2, dashed: false },
    hub: { show: true, fill: '#ffe08a', stroke: '#7a5a1a' },
  },
};

export const Basic: Story = {
  args: {
    config: basicConfig,
    renderer: 'svg',
  },
};

export const ModernHelm: Story = {
  args: {
    config: {
      ...basicConfig,
      skin: {
        ...basicConfig.skin,
        name: 'modern-helm',
        style: 'modern',
        handleWidthFactor: 0.15,
        handleLengthFactor: 0.5,
        effects: {
          dropShadow: true,
          glow: false,
        },
      },
    },
    renderer: 'svg',
  },
};

export const Minimal: Story = {
  args: {
    config: {
      ...basicConfig,
      skin: {
        ...basicConfig.skin,
        name: 'minimal',
        showHelm: false,
        separator: { stroke: '#e0e0e0', strokeWidth: 1 },
        hub: { show: true, fill: '#ffffff', stroke: '#e0e0e0' },
        effects: {
          dropShadow: false,
          glow: false,
        },
      },
    },
    renderer: 'svg',
  },
};

export const Casino: Story = {
  args: {
    config: {
      ...basicConfig,
      skin: {
        ...basicConfig.skin,
        name: 'casino',
        showHelm: false,
        separator: { stroke: '#ffd700', strokeWidth: 3 },
        hub: { show: true, fill: '#ffd700', stroke: '#dc143c' },
        effects: {
          dropShadow: true,
          glow: true,
        },
      },
    },
    renderer: 'svg',
  },
};

export const WeightedOdds: Story = {
  args: {
    config: {
      ...basicConfig,
      selection: {
        ...basicConfig.selection,
        weights: [10, 5, 1, 1, 5, 10], // Coffee and Mug more likely
      },
      segments: basicSegments.map((segment, index) => ({
        ...segment,
        label: index === 0 || index === 5 ? `${segment.label} (High)` : 
               index === 1 || index === 4 ? `${segment.label} (Med)` : 
               `${segment.label} (Low)`,
      })),
    },
    renderer: 'svg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates weighted selection where some segments are more likely to be selected.',
      },
    },
  },
};

export const TargetedSpin: Story = {
  render: (args) => {
    const wheelRef = useRef<WheelSpinRef>(null);
    const [result, setResult] = useState<string>('');

    const spinToCoffee = () => {
      wheelRef.current?.spin({ targetLabel: 'Coffee' }).then((res) => {
        setResult(`Landed on: ${res.segment.label}`);
      });
    };

    const spinToIndex = (index: number) => {
      wheelRef.current?.spin({ targetIndex: index }).then((res) => {
        setResult(`Landed on: ${res.segment.label}`);
      });
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <WheelSpin ref={wheelRef} config={args.config} renderer={args.renderer} onResult={(res) => setResult(`Landed on: ${res.segment.label}`)} />
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={spinToCoffee} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc' }}>
            Spin to Coffee
          </button>
          <button onClick={() => spinToIndex(2)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc' }}>
            Spin to 10% Off
          </button>
          <button onClick={() => spinToIndex(4)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc' }}>
            Spin to T-Shirt
          </button>
        </div>
        {result && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            {result}
          </div>
        )}
      </div>
    );
  },
  args: {
    config: basicConfig,
    renderer: 'svg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates programmatic spinning to specific segments using targetLabel or targetIndex.',
      },
    },
  },
};

export const NoRepeatMode: Story = {
  render: (args) => {
    const wheelRef = useRef<WheelSpinRef>(null);
    const [results, setResults] = useState<string[]>([]);
    const [spinsLeft, setSpinsLeft] = useState(6);

    const spin = () => {
      if (spinsLeft > 0) {
        wheelRef.current?.spin().then((res) => {
          setResults(prev => [...prev, res.segment.label]);
          setSpinsLeft(prev => prev - 1);
        });
      }
    };

    const reset = () => {
      setResults([]);
      setSpinsLeft(6);
      // Reset the wheel's no-repeat queue by updating config
      wheelRef.current?.setConfig({
        selection: { ...args.config.selection, noRepeatUntilExhausted: true }
      });
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <WheelSpin ref={wheelRef} config={args.config} renderer={args.renderer} />
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={spin} 
            disabled={spinsLeft === 0}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              marginRight: '10px',
              opacity: spinsLeft === 0 ? 0.5 : 1
            }}
          >
            Spin ({spinsLeft} left)
          </button>
          <button onClick={reset} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc' }}>
            Reset
          </button>
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          Results: {results.join(', ')}
        </div>
        {spinsLeft === 0 && (
          <div style={{ marginTop: '10px', color: '#666' }}>
            All segments visited! Next spin will start a new cycle.
          </div>
        )}
      </div>
    );
  },
  args: {
    config: {
      ...basicConfig,
      selection: {
        ...basicConfig.selection,
        noRepeatUntilExhausted: true,
      },
    },
    renderer: 'svg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates no-repeat mode where all segments must be visited before any can repeat.',
      },
    },
  },
};

export const AccessibilityDemo: Story = {
  render: (args) => {
    const [result, setResult] = useState<string>('');
    const [instructions, setInstructions] = useState('Click the wheel or press Enter/Space to spin');

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 'bold' }}>
          Accessibility Demo
        </div>
        <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
          {instructions}
        </div>
        <WheelSpin 
          config={args.config}
          renderer={args.renderer}
          onResult={(res) => {
            setResult(`Result: ${res.segment.label}`);
            setInstructions('Spin again or use Tab to navigate');
          }}
          style={{ margin: '0 auto' }}
        />
        {result && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
            {result}
          </div>
        )}
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#888', maxWidth: '400px', margin: '20px auto 0' }}>
          This wheel is fully keyboard accessible. Use Tab to focus, Enter or Space to spin. 
          Screen readers will announce the spinning state and results.
        </div>
      </div>
    );
  },
  args: {
    config: basicConfig,
    renderer: 'svg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard accessibility and screen reader support.',
      },
    },
  },
};

export const CustomSizes: Story = {
  render: () => {
    const sizes = [240, 360, 480, 600];
    
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sizes.map(size => (
          <div key={size} style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
              {size}px
            </div>
            <WheelSpin 
              config={{
                ...basicConfig,
                size,
                skin: {
                  ...basicConfig.skin,
                  name: 'minimal',
                  showHelm: false,
                },
              }}
              renderer="svg"
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates different wheel sizes from 240px to 600px.',
      },
    },
  },
};

export const PixiJSRenderer: Story = {
  args: {
    config: {
      ...basicConfig,
      skin: {
        ...basicConfig.skin,
        name: 'modern-helm',
        effects: {
          dropShadow: true,
          glow: true,
        },
      },
    },
    renderer: 'pixi',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the PixiJS renderer with GSAP animations. Requires pixi.js to be installed.',
      },
    },
  },
};
