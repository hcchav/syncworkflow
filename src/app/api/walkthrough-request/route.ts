import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import {
  getFullAuditByEntry,
  getTeaserAuditByEntry,
  recordWalkthroughRequest,
} from '@/lib/audit-data';
import { sendWalkthroughRequestNotification } from '@/lib/email';

const requestSchema = z.object({
  entry: z.string().optional(),
  email: z.string().email(),
  firmName: z.string().max(120).optional(),
  note: z.string().max(1000).optional(),
  source: z.string().default('walkthrough_request'),
});

export async function POST(request: NextRequest) {
  try {
    const body = requestSchema.parse(await request.json());
    const utm = {
      utm_source: request.nextUrl.searchParams.get('utm_source') || '',
      utm_medium: request.nextUrl.searchParams.get('utm_medium') || '',
      utm_campaign: request.nextUrl.searchParams.get('utm_campaign') || '',
    };

    const audit =
      (body.entry ? await getTeaserAuditByEntry(body.entry) : null) ||
      (body.entry ? await getFullAuditByEntry(body.entry) : null);

    await recordWalkthroughRequest({
      audit,
      email: body.email,
      firmName: body.firmName || audit?.firm.name,
      note: body.note,
      source: body.source,
      utm,
    });

    await sendWalkthroughRequestNotification({
      email: body.email,
      firmName: body.firmName || audit?.firm.name,
      note: body.note,
      source: body.source,
    });

    return NextResponse.json({
      success: true,
      message: 'Walkthrough request received. I will follow up directly.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    console.error('Walkthrough request failed.', error);

    return NextResponse.json(
      { success: false, message: 'Could not submit the walkthrough request right now.' },
      { status: 500 },
    );
  }
}
