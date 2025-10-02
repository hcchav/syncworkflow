import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { WheelSpin } from '../WheelSpin';
import { WheelConfig, WheelSpinRef } from '../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    g: ({ children, onUpdate, animate, transition, style, ...props }: any) => <g {...props}>{children}</g>,
  },
}));

const mockConfig: WheelConfig = {
  size: 480,
  pointer: 'top',
  spin: {
    duration: 0.1, // Very short duration for tests
    easing: 'linear',
    extraSpins: [0, 0], // No extra spins for faster tests
  },
  selection: {
    seed: 12345, // Deterministic for testing
  },
  segments: [
    { label: 'Coffee', color: '#FFDC35' },
    { label: 'Tea', color: '#03c4eb' },
    { label: 'Water', color: '#f4f4f4' },
    { label: 'Juice', color: '#ff6b6b' },
  ],
  skin: {
    name: 'minimal',
    separator: { stroke: '#555', strokeWidth: 2 },
    hub: { show: true, fill: '#ffe08a', stroke: '#7a5a1a' },
  },
};

describe('WheelSpin Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    // Mock requestAnimationFrame to execute immediately
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      setTimeout(cb, 1); // Execute almost immediately
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render wheel with correct number of segments', () => {
      render(<WheelSpin config={mockConfig} />);
      
      const svg = screen.getByRole('button', { name: /spin the wheel/i });
      expect(svg).toBeInTheDocument();
      
      // Check for segment texts
      expect(screen.getByText('Coffee')).toBeInTheDocument();
      expect(screen.getByText('Tea')).toBeInTheDocument();
      expect(screen.getByText('Water')).toBeInTheDocument();
      expect(screen.getByText('Juice')).toBeInTheDocument();
    });

    it('should not render with empty segments', () => {
      const emptyConfig = { ...mockConfig, segments: [] };
      const { container } = render(<WheelSpin config={emptyConfig} />);
      
      expect(container.firstChild).toBeNull();
    });

    it('should not render with single segment', () => {
      const singleConfig = { 
        ...mockConfig, 
        segments: [{ label: 'Only One', color: '#FFDC35' }] 
      };
      
      // Should log warning and not render
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(<WheelSpin config={singleConfig} />);
      
      expect(consoleSpy).toHaveBeenCalledWith('WheelSpin: At least 2 segments are required');
      expect(container.firstChild).toBeNull();
      
      consoleSpy.mockRestore();
    });

    it('should apply custom className and style', () => {
      const customStyle = { border: '2px solid red' };
      render(
        <WheelSpin 
          config={mockConfig} 
          className="custom-wheel" 
          style={customStyle}
        />
      );
      
      const wheel = screen.getByRole('button');
      expect(wheel).toHaveClass('custom-wheel');
      expect(wheel).toHaveStyle('border: 2px solid red');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<WheelSpin config={mockConfig} />);
      
      const wheel = screen.getByRole('button', { name: /spin the wheel/i });
      expect(wheel).toHaveAttribute('tabIndex', '0');
      expect(wheel).toHaveAttribute('aria-busy', 'false');
    });

    it('should be keyboard accessible', async () => {
      const onResult = vi.fn();
      const { unmount } = render(<WheelSpin config={mockConfig} onResult={onResult} />);
      
      const wheel = screen.getByRole('button');
      
      // Focus and press Enter
      wheel.focus();
      await user.keyboard('{Enter}');
      
      expect(wheel).toHaveAttribute('aria-busy', 'true');
      
      // Wait for spin to complete
      await waitFor(() => {
        expect(wheel).toHaveAttribute('aria-busy', 'false');
      }, { timeout: 500 });
      
      unmount();
    });

    it('should handle Space key', async () => {
      const onResult = vi.fn();
      const { unmount } = render(<WheelSpin config={mockConfig} onResult={onResult} />);
      
      const wheel = screen.getByRole('button');
      
      wheel.focus();
      await user.keyboard(' ');
      
      expect(wheel).toHaveAttribute('aria-busy', 'true');
      
      // Wait for spin to complete
      await waitFor(() => {
        expect(wheel).toHaveAttribute('aria-busy', 'false');
      }, { timeout: 500 });
      
      unmount();
    });

    it('should prevent spinning when already spinning', async () => {
      const onResult = vi.fn();
      const { unmount } = render(<WheelSpin config={mockConfig} onResult={onResult} />);
      
      const wheel = screen.getByRole('button');
      
      // Start first spin
      await user.click(wheel);
      expect(wheel).toHaveAttribute('aria-busy', 'true');
      
      // Try to spin again - should be ignored (no change in state)
      await user.click(wheel);
      
      // Should still be spinning from first click
      expect(wheel).toHaveAttribute('aria-busy', 'true');
      
      // Wait for first spin to complete
      await waitFor(() => {
        expect(wheel).toHaveAttribute('aria-busy', 'false');
      }, { timeout: 500 });
      
      unmount();
    });
  });

  describe('Interaction', () => {
    it('should spin on click', async () => {
      const onResult = vi.fn();
      const { unmount } = render(<WheelSpin config={mockConfig} onResult={onResult} />);
      
      const wheel = screen.getByRole('button');
      await user.click(wheel);
      
      expect(wheel).toHaveAttribute('aria-busy', 'true');
      
      // Wait for animation to complete
      await waitFor(() => {
        expect(wheel).toHaveAttribute('aria-busy', 'false');
      }, { timeout: 500 });
      
      expect(onResult).toHaveBeenCalledWith({
        index: expect.any(Number),
        segment: expect.objectContaining({
          label: expect.any(String),
        }),
      });
      
      unmount();
    });

    it('should call onResult with correct data', async () => {
      const onResult = vi.fn();
      const { unmount } = render(<WheelSpin config={mockConfig} onResult={onResult} />);
      
      const wheel = screen.getByRole('button');
      await user.click(wheel);
      
      // Wait for animation to complete
      await waitFor(() => {
        expect(onResult).toHaveBeenCalled();
      }, { timeout: 500 });
      
      const result = onResult.mock.calls[0][0];
      expect(result.index).toBeGreaterThanOrEqual(0);
      expect(result.index).toBeLessThan(mockConfig.segments.length);
      expect(result.segment.label).toBe(mockConfig.segments[result.index].label);
      expect(result.segment.color).toBe(mockConfig.segments[result.index].color);
      
      unmount();
    });
  });

  describe('Imperative API', () => {
    it('should expose spin method via ref', async () => {
      const onResult = vi.fn();
      const ref = React.createRef<WheelSpinRef>();
      
      const { unmount } = render(<WheelSpin ref={ref} config={mockConfig} onResult={onResult} />);
      
      // Wait for component to initialize
      await new Promise(resolve => setTimeout(resolve, 50));
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.spin).toBe('function');
      
      // Call spin method
      const promise = ref.current?.spin();
      expect(promise).toBeInstanceOf(Promise);
      
      const result = await promise;
      expect(result).toEqual({
        index: expect.any(Number),
        segment: expect.objectContaining({
          label: expect.any(String),
        }),
      });
      
      unmount();
    });

    it('should spin to target index', async () => {
      const ref = React.createRef<WheelSpinRef>();
      const { unmount } = render(<WheelSpin ref={ref} config={mockConfig} />);
      
      // Wait for component to initialize
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const result = await ref.current?.spin({ targetIndex: 2 });
      
      expect(result?.index).toBe(2);
      expect(result?.segment.label).toBe('Water');
      
      unmount();
    });

    it('should spin to target label', async () => {
      const ref = React.createRef<WheelSpinRef>();
      const { unmount } = render(<WheelSpin ref={ref} config={mockConfig} />);
      
      // Wait for component to initialize
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const result = await ref.current?.spin({ targetLabel: 'Tea' });
      
      expect(result?.index).toBe(1);
      expect(result?.segment.label).toBe('Tea');
      
      unmount();
    });

    it('should get current rotation', () => {
      const ref = React.createRef<WheelSpinRef>();
      render(<WheelSpin ref={ref} config={mockConfig} />);
      
      const rotation = ref.current?.getRotation();
      expect(typeof rotation).toBe('number');
      expect(rotation).toBe(0); // Initial rotation
    });

    it('should update config', () => {
      const ref = React.createRef<WheelSpinRef>();
      render(<WheelSpin ref={ref} config={mockConfig} />);
      
      expect(() => {
        ref.current?.setConfig({ 
          spin: { duration: 2 } 
        });
      }).not.toThrow();
    });
  });

  describe('Renderer Selection', () => {
    it('should use SVG renderer by default', () => {
      render(<WheelSpin config={mockConfig} />);
      
      const svg = screen.getByRole('button').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should use SVG renderer when explicitly specified', () => {
      render(<WheelSpin config={mockConfig} renderer="svg" />);
      
      const svg = screen.getByRole('button').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    // Note: PixiJS renderer tests would require more complex mocking
    // and are better suited for integration tests
  });

  describe('Configuration', () => {
    it('should apply default colors when not specified', () => {
      const configWithoutColors = {
        ...mockConfig,
        segments: [
          { label: 'Test 1' },
          { label: 'Test 2' },
        ],
      };
      
      render(<WheelSpin config={configWithoutColors} />);
      
      expect(screen.getByText('Test 1')).toBeInTheDocument();
      expect(screen.getByText('Test 2')).toBeInTheDocument();
    });

    it('should handle different pointer positions', () => {
      const topConfig = { ...mockConfig, pointer: 'top' as const };
      const rightConfig = { ...mockConfig, pointer: 'right' as const };
      const noneConfig = { ...mockConfig, pointer: 'none' as const };
      
      const { rerender } = render(<WheelSpin config={topConfig} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      
      rerender(<WheelSpin config={rightConfig} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      
      rerender(<WheelSpin config={noneConfig} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle different skin configurations', () => {
      const woodConfig = { 
        ...mockConfig, 
        skin: { ...mockConfig.skin, name: 'wood-helm' as const } 
      };
      const modernConfig = { 
        ...mockConfig, 
        skin: { ...mockConfig.skin, name: 'modern-helm' as const } 
      };
      
      const { rerender } = render(<WheelSpin config={woodConfig} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      
      rerender(<WheelSpin config={modernConfig} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
