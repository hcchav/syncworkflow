import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import {
  getTeaserAuditByEntry,
  issueFullAuditDelivery,
  markAuditDeliveryFailed,
  markAuditDeliverySent,
} from '@/lib/audit-data';
import { sendFullAuditEmail } from '@/lib/email';
import { absoluteUrl } from '@/lib/site';

const requestSchema = z.object({
  entry: z.string().min(3),
  email: z.string().email(),
  source: z.string().default('teaser_page'),
});

export async function POST(request: NextRequest) {
  try {
    const body = requestSchema.parse(await request.json());
    const audit = await getTeaserAuditByEntry(body.entry);

    if (!audit) {
      return NextResponse.json(
        { success: false, message: 'This private teaser page is not available.' },
        { status: 404 },
      );
    }

    const utm = {
      utm_source: request.nextUrl.searchParams.get('utm_source') || '',
      utm_medium: request.nextUrl.searchParams.get('utm_medium') || '',
      utm_campaign: request.nextUrl.searchParams.get('utm_campaign') || '',
    };

    const delivery = await issueFullAuditDelivery({
      audit,
      email: body.email,
      source: body.source,
      utm,
    });

    const emailResult = await sendFullAuditEmail({
      to: body.email,
      firmName: audit.firm.name,
      fullAuditPath: delivery.urlPath,
    });

    if (emailResult) {
      const resendId =
        typeof emailResult === 'object' && emailResult && 'id' in emailResult
          ? String(emailResult.id ?? '')
          : undefined;

      await markAuditDeliverySent(delivery.entry, resendId);
    } else {
      await markAuditDeliveryFailed(delivery.entry);
    }

    const delivered = Boolean(emailResult);

    return NextResponse.json({
      success: true,
      delivered,
      message: delivered
        ? 'Full audit sent. Check your inbox for the private link.'
        : 'Request saved. A preview link is below because email is not set up here.',
      previewUrl: delivered ? null : absoluteUrl(delivery.urlPath),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    console.error('Audit request failed.', error);

    return NextResponse.json(
      { success: false, message: 'Could not send the full audit right now.' },
      { status: 500 },
    );
  }
}
