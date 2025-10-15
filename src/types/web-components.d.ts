// Type declarations for Web Components
declare namespace JSX {
  interface IntrinsicElements {
    'lucky-wheel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      skin?: string;
      theme?: string;
      'target-prize'?: string;
      'spin-duration'?: string;
      size?: string;
      easing?: string;
      'min-rotations'?: string;
      ref?: React.Ref<any>;
    };
    'lucky-wheel-3d': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'spin-duration'?: string;
      'target-prize'?: string;
    };
    'lucky-wheel-pixi': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'spin-duration'?: string;
      'target-prize'?: string;
    };
  }
}

// Global interface for the LuckyWheel Web Component
interface LuckyWheelElement extends HTMLElement {
  segments: Array<{
    label: string;
    bg: string;
    text: string;
  }>;
  spin(options?: { targetIndex?: number; targetLabel?: string }): Promise<{ prize: string; index: number }>;
  reset(): void;
  getState(): { spinning: boolean; lastResult: any; angle: number };
}
