import { createHash, randomBytes } from 'node:crypto';

import type { PrivateEntry } from '@/lib/audit-types';

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function generateAccessToken() {
  return randomBytes(18).toString('base64url');
}

export function parsePrivateEntry(entry: string): PrivateEntry | null {
  const separator = '--';
  const index = entry.lastIndexOf(separator);

  if (index <= 0) {
    return null;
  }

  const slug = entry.slice(0, index).trim();
  const token = entry.slice(index + separator.length).trim();

  if (!slug || !token) {
    return null;
  }

  if (!/^[a-z0-9-]+$/i.test(slug) || !/^[a-zA-Z0-9_-]+$/.test(token)) {
    return null;
  }

  return { slug, token };
}

export function makePrivateEntry(slug: string, token: string) {
  return `${slug}--${token}`;
}
