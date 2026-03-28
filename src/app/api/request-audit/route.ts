import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { recordFreeAuditRequest } from '@/lib/audit-data';
import { sendAuditRequestNotification } from '@/lib/email';

const requestSchema = z.object({
  email: z.string().email(),
  website: z.string().url(),
  firmName: z.string().max(120).optional(),
  note: z.string().max(1000).optional(),
  source: z.string().default('request_audit_page'),
});

export async function POST(request: NextRequest) {
  try {
    const body = requestSchema.parse(await request.json());
    const utm = {
      utm_source: request.nextUrl.searchParams.get('utm_source') || '',
      utm_medium: request.nextUrl.searchParams.get('utm_medium') || '',
      utm_campaign: request.nextUrl.searchParams.get('utm_campaign') || '',
    };

    await recordFreeAuditRequest({
      email: body.email,
      website: body.website,
      firmName: body.firmName,
      note: body.note,
      source: body.source,
      utm,
    });

    await sendAuditRequestNotification({
      email: body.email,
      website: body.website,
      firmName: body.firmName,
      note: body.note,
      source: body.source,
    });

    return NextResponse.json({
      success: true,
      message: 'Request received. I will review the site and follow up with the free audit next steps.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Please complete the required fields.' },
        { status: 400 },
      );
    }

    console.error('Request audit submission failed.', error);

    return NextResponse.json(
      { success: false, message: 'Could not submit the request right now.' },
      { status: 500 },
    );
  }
}
