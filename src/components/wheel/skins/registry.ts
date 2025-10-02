import { SkinRenderer, WheelConfig, GeometryData } from '../types';
import { woodHelm } from './woodHelm';
import { modernHelm } from './modernHelm';
import { minimal } from './minimal';
import { casino } from './casino';
import { stainlessSteelHelm } from './stainlessSteelHelm';
import { rubberCoatedHelm } from './rubberCoatedHelm';
import { leatherWrappedHelm } from './leatherWrappedHelm';
import { chromeHelm } from './chromeHelm';
import { mahoganyHelm } from './mahoganyHelm';
import { boatHelm } from './boatHelm';

/**
 * Registry of available skins
 */
const skinRegistry = new Map<string, SkinRenderer>([
  ['wood-helm', woodHelm],
  ['modern-helm', modernHelm],
  ['minimal', minimal],
  ['casino', casino],
  ['stainless-steel-helm', stainlessSteelHelm],
  ['rubber-coated-helm', rubberCoatedHelm],
  ['leather-wrapped-helm', leatherWrappedHelm],
  ['chrome-helm', chromeHelm],
  ['mahogany-helm', mahoganyHelm],
  ['boat-helm', boatHelm],
]);

/**
 * Get skin renderer by name
 */
export function getSkinRenderer(skinName?: string): SkinRenderer {
  if (!skinName) {
    return woodHelm; // Default skin
  }

  const renderer = skinRegistry.get(skinName);
  if (!renderer) {
    console.warn(`Skin "${skinName}" not found, falling back to wood-helm`);
    return woodHelm;
  }

  return renderer;
}

/**
 * Register a custom skin
 */
export function registerSkin(name: string, renderer: SkinRenderer): void {
  skinRegistry.set(name, renderer);
}

/**
 * Get list of available skin names
 */
export function getAvailableSkins(): string[] {
  return Array.from(skinRegistry.keys());
}

/**
 * Check if a skin exists
 */
export function hasSkin(name: string): boolean {
  return skinRegistry.has(name);
}

/**
 * Remove a custom skin from registry
 */
export function unregisterSkin(name: string): boolean {
  // Prevent removal of built-in skins
  const builtInSkins = ['wood-helm', 'modern-helm', 'minimal', 'casino', 'stainless-steel-helm', 'rubber-coated-helm', 'leather-wrapped-helm', 'chrome-helm', 'mahogany-helm', 'boat-helm'];
  if (builtInSkins.includes(name)) {
    console.warn(`Cannot unregister built-in skin "${name}"`);
    return false;
  }

  return skinRegistry.delete(name);
}
