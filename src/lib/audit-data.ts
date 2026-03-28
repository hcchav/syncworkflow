import 'server-only';

import { ConvexHttpClient } from 'convex/browser';

import type { AuditRecord } from '@/lib/audit-types';
import { getLocalFullAudit, getLocalTeaserAudit } from '@/lib/local-audits';
import { makePrivateEntry, parsePrivateEntry, hashToken, generateAccessToken } from '@/lib/tokens';

type AuditRequestInput = {
  audit: AuditRecord;
  email: string;
  source: string;
  utm?: Record<string, string>;
};

type FreeAuditRequestInput = {
  email: string;
  website: string;
  firmName?: string;
  note?: string;
  source: string;
  utm?: Record<string, string>;
};

type WalkthroughRequestInput = {
  audit?: AuditRecord | null;
  email: string;
  firmName?: string;
  note?: string;
  source: string;
  utm?: Record<string, string>;
};

type IssuedAuditDelivery = {
  entry: string;
  urlPath: string;
};

function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  return url ? new ConvexHttpClient(url) : null;
}

function normalizeAuditRecord(record: any): AuditRecord {
  return {
    id: String(record._id ?? record.id),
    source: 'convex',
    kind: record.kind,
    slug: record.slug,
    headline: record.headline,
    subheadline: record.subheadline,
    auditSummary: record.auditSummary,
    reviewerNote: record.reviewerNote,
    reviewedAt: record.reviewedAt,
    ctaEmail: record.ctaEmail,
    campaign: record.campaign,
    curiosityBullets: record.curiosityBullets,
    implementationOptions: record.implementationOptions,
    findings: record.findings,
    fullAuditSections: record.fullAuditSections,
    firm: record.firm,
  };
}

export async function getTeaserAuditByEntry(entry: string) {
  const parsed = parsePrivateEntry(entry);

  if (!parsed) {
    return null;
  }

  const client = getConvexClient();

  if (client) {
    try {
      const record = await client.query(
        'auditPages:getByTeaserEntry' as any,
        {
          slug: parsed.slug,
          tokenHash: hashToken(parsed.token),
        } as any,
      );

      if (record) {
        return normalizeAuditRecord(record);
      }
    } catch (error) {
      console.error('Convex teaser lookup failed, falling back to local seed.', error);
    }
  }

  return getLocalTeaserAudit(parsed.slug, parsed.token);
}

export async function getFullAuditByEntry(entry: string) {
  const parsed = parsePrivateEntry(entry);

  if (!parsed) {
    return null;
  }

  const client = getConvexClient();

  if (client) {
    try {
      const record = await client.query(
        'auditPages:getByDeliveryEntry' as any,
        {
          slug: parsed.slug,
          tokenHash: hashToken(parsed.token),
        } as any,
      );

      if (record) {
        return normalizeAuditRecord(record);
      }
    } catch (error) {
      console.error('Convex full audit lookup failed, falling back to local seed.', error);
    }
  }

  return getLocalFullAudit(parsed.slug, parsed.token);
}

export async function issueFullAuditDelivery({
  audit,
  email,
  source,
  utm,
}: AuditRequestInput): Promise<IssuedAuditDelivery> {
  const client = getConvexClient();

  if (audit.source === 'convex' && client) {
    const accessToken = generateAccessToken();

    await client.mutation(
      'auditRequests:create' as any,
      {
        auditPageId: audit.id,
        email,
        firmName: audit.firm.name,
        source,
        accessTokenHash: hashToken(accessToken),
        requestedAt: Date.now(),
        utm: utm ?? {},
      } as any,
    );

    const entry = makePrivateEntry(audit.slug, accessToken);

    return {
      entry,
      urlPath: `/audit/${entry}`,
    };
  }

  if (!audit.previewDeliveryToken) {
    throw new Error('No local delivery token is configured for this audit.');
  }

  const entry = makePrivateEntry(audit.slug, audit.previewDeliveryToken);

  return {
    entry,
    urlPath: `/audit/${entry}`,
  };
}

export async function recordFreeAuditRequest({
  email,
  website,
  firmName,
  note,
  source,
  utm,
}: FreeAuditRequestInput) {
  const client = getConvexClient();

  if (!client) {
    return;
  }

  try {
    await client.mutation(
      'auditRequests:createFreeAuditRequest' as any,
      {
        email,
        website,
        firmName,
        note,
        source,
        requestedAt: Date.now(),
        utm: utm ?? {},
      } as any,
    );
  } catch (error) {
    console.error('Convex free audit request failed.', error);
  }
}

export async function recordWalkthroughRequest({
  audit,
  email,
  firmName,
  note,
  source,
  utm,
}: WalkthroughRequestInput) {
  const client = getConvexClient();

  if (!client) {
    return;
  }

  try {
    await client.mutation(
      'walkthroughRequests:create' as any,
      {
        auditPageId: audit?.source === 'convex' ? audit.id : undefined,
        email,
        firmName,
        note,
        source,
        requestedAt: Date.now(),
        utm: utm ?? {},
      } as any,
    );
  } catch (error) {
    console.error('Convex walkthrough request failed.', error);
  }
}

export async function markAuditDeliverySent(entry: string, resendId?: string | null) {
  const parsed = parsePrivateEntry(entry);
  const client = getConvexClient();

  if (!parsed || !client) {
    return;
  }

  try {
    await client.mutation(
      'auditRequests:markSent' as any,
      {
        accessTokenHash: hashToken(parsed.token),
        deliveredAt: Date.now(),
        resendId: resendId ?? undefined,
      } as any,
    );
  } catch (error) {
    console.error('Convex delivery update failed.', error);
  }
}

export async function markAuditDeliveryFailed(entry: string) {
  const parsed = parsePrivateEntry(entry);
  const client = getConvexClient();

  if (!parsed || !client) {
    return;
  }

  try {
    await client.mutation(
      'auditRequests:markFailed' as any,
      {
        accessTokenHash: hashToken(parsed.token),
      } as any,
    );
  } catch (error) {
    console.error('Convex delivery failure update failed.', error);
  }
}
