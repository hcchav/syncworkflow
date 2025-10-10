'use client';

import React, { forwardRef, useMemo } from 'react';
import { WheelSpin } from './WheelSpin';
import type { WheelSpinRef, WheelConfig, SkinConfig, WheelSpinProps } from './types';
import { DEFAULT_CONFIG } from './defaults';

const DEFAULT_SEGMENTS: WheelConfig['segments'] = [
  { label: 'Coffee' },
  { label: 'Try Again' },
  { label: 'T-Shirt' },
  { label: 'Free Mug' },
  { label: '25% Off' },
  { label: 'Gift Card' },
  { label: 'Free Spin' },
  { label: 'No Prize' },
];

const SKIN_ALIASES: Record<string, SkinConfig['name']> = {
  mahoney: 'mahogany-helm',
  mahogany: 'mahogany-helm',
  mahoganyhelm: 'mahogany-helm',
};

type SkinName = NonNullable<SkinConfig['name']>;

const normalizeSkinName = (skin?: string): SkinName => {
  if (!skin) {
    return (DEFAULT_CONFIG.skin.name ?? 'wood-helm') as SkinName;
  }

  const key = skin.toLowerCase().replace(/[^a-z-]/g, '');
  return (SKIN_ALIASES[key] ?? key) as SkinName;
};

const mergeSkinConfig = (
  skinName: SkinName,
  overrides?: Partial<SkinConfig>,
): SkinConfig => {
  const { separator, hub, effects, name: _name, ...rest } = overrides ?? {};
  const base = { ...DEFAULT_CONFIG.skin, name: skinName } as SkinConfig;

  return {
    ...base,
    ...rest,
    separator: { ...base.separator, ...separator },
    hub: { ...base.hub, ...hub },
    effects: { ...base.effects, ...effects },
  };
};

export type WheelProps = {
  /** String alias for built-in skins, e.g. "mahoney" */
  skin?: string;
  /** Additional overrides for the resolved skin */
  skinOptions?: Partial<SkinConfig>;
  /** Toggle the visibility of helm handles without diving into skinOptions */
  showHandles?: SkinConfig['showHandles'];
  /** Override the wheel size (defaults to 480) */
  size?: WheelConfig['size'];
  /** Override pointer position (defaults to "top") */
  pointer?: WheelConfig['pointer'];
  /** Replace the wheel segments */
  segments?: WheelConfig['segments'];
  /** Override spin behaviour */
  spin?: Partial<WheelConfig['spin']>;
  /** Override selection behaviour */
  selection?: Partial<WheelConfig['selection']>;
  /** Provide additional config overrides */
  config?: Partial<WheelConfig>;
} & Pick<WheelSpinProps, 'renderer' | 'onResult' | 'className' | 'style'>;

export const Wheel = forwardRef<WheelSpinRef, WheelProps>(
  ({
    skin,
    skinOptions,
    showHandles,
    size,
    pointer,
    segments,
    spin,
    selection,
    config,
    renderer,
    onResult,
    className,
    style,
  }, ref) => {
    const mergedConfig = useMemo<WheelConfig>(() => {
      const {
        spin: configSpin,
        selection: configSelection,
        skin: configSkin,
        segments: configSegments,
        size: configSize,
        pointer: configPointer,
        ...configRest
      } = config ?? {};

      const resolvedSkinName = normalizeSkinName(
        skin ?? configSkin?.name ?? DEFAULT_CONFIG.skin.name ?? 'wood-helm',
      );

      const resolvedSkin = mergeSkinConfig(resolvedSkinName, {
        ...configSkin,
        ...skinOptions,
        ...(showHandles !== undefined ? { showHandles } : {}),
      });

      const resolvedSegments = segments ?? configSegments ?? DEFAULT_SEGMENTS;

      return {
        ...DEFAULT_CONFIG,
        ...configRest,
        size: size ?? configSize ?? DEFAULT_CONFIG.size,
        pointer: pointer ?? configPointer ?? DEFAULT_CONFIG.pointer,
        segments: resolvedSegments.length > 0 ? resolvedSegments : DEFAULT_SEGMENTS,
        spin: {
          ...DEFAULT_CONFIG.spin,
          ...configSpin,
          ...spin,
        },
        selection: {
          ...DEFAULT_CONFIG.selection,
          ...configSelection,
          ...selection,
        },
        skin: resolvedSkin,
      };
    }, [
      config,
      pointer,
      segments,
      selection,
      showHandles,
      size,
      skin,
      skinOptions,
      spin,
    ]);

    return (
      <WheelSpin
        ref={ref}
        config={mergedConfig}
        renderer={renderer}
        onResult={onResult}
        className={className}
        style={style}
      />
    );
  },
);

Wheel.displayName = 'Wheel';

export default Wheel;
