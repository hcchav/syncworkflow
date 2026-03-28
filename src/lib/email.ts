import { Resend } from 'resend';

import { absoluteUrl, siteConfig } from '@/lib/site';

function getResendClient() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

export async function sendFullAuditEmail({
  to,
  firmName,
  fullAuditPath,
}: {
  to: string;
  firmName: string;
  fullAuditPath: string;
}) {
  const resend = getResendClient();

  if (!resend) {
    return null;
  }

  return resend.emails.send({
    from: `${siteConfig.name} <${siteConfig.resendFromEmail}>`,
    to: [to],
    replyTo: siteConfig.replyToEmail,
    subject: `Your full SyncWorkflow audit for ${firmName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1e2435; line-height: 1.6;">
        <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #8c6f50;">SyncWorkflow</p>
        <h1 style="font-size: 28px; line-height: 1.2; margin-bottom: 12px;">Your full audit is ready.</h1>
        <p style="font-size: 16px; margin-bottom: 16px;">
          Here is the private link to the full audit for ${firmName}. It expands on the preview and includes the highest-priority fixes first.
        </p>
        <p style="margin: 24px 0;">
          <a href="${absoluteUrl(fullAuditPath)}" style="display: inline-block; background: #1b2442; color: #f7f3eb; text-decoration: none; padding: 12px 18px; border-radius: 999px; font-weight: 600;">Open the full audit</a>
        </p>
        <p style="font-size: 15px; margin-bottom: 16px;">
          If you want, reply to this email and I can also walk through the highest-impact fixes or discuss ongoing implementation support.
        </p>
        <p style="font-size: 14px; color: #5d6577;">
          Private link: <a href="${absoluteUrl(fullAuditPath)}">${absoluteUrl(fullAuditPath)}</a>
        </p>
      </div>
    `,
    text: `Your full SyncWorkflow audit for ${firmName} is ready: ${absoluteUrl(fullAuditPath)}`,
  });
}

export async function sendAuditRequestNotification({
  email,
  website,
  firmName,
  note,
  source,
}: {
  email: string;
  website: string;
  firmName?: string;
  note?: string;
  source: string;
}) {
  const resend = getResendClient();

  if (!resend) {
    return null;
  }

  return resend.emails.send({
    from: `${siteConfig.name} <${siteConfig.resendFromEmail}>`,
    to: [siteConfig.notificationEmail],
    replyTo: email,
    subject: `New free audit request from ${firmName || website}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1e2435; line-height: 1.6;">
        <h1 style="font-size: 24px; margin-bottom: 12px;">New free audit request</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Firm:</strong> ${firmName || 'Not provided'}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Note:</strong> ${note || 'None'}</p>
      </div>
    `,
    text: `New audit request\nEmail: ${email}\nWebsite: ${website}\nFirm: ${firmName || 'Not provided'}\nSource: ${source}\nNote: ${note || 'None'}`,
  });
}

export async function sendWalkthroughRequestNotification({
  email,
  firmName,
  note,
  source,
}: {
  email: string;
  firmName?: string;
  note?: string;
  source: string;
}) {
  const resend = getResendClient();

  if (!resend) {
    return null;
  }

  return resend.emails.send({
    from: `${siteConfig.name} <${siteConfig.resendFromEmail}>`,
    to: [siteConfig.notificationEmail],
    replyTo: email,
    subject: `New walkthrough request from ${firmName || email}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1e2435; line-height: 1.6;">
        <h1 style="font-size: 24px; margin-bottom: 12px;">New walkthrough request</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Firm:</strong> ${firmName || 'Not provided'}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Note:</strong> ${note || 'None'}</p>
      </div>
    `,
    text: `New walkthrough request\nEmail: ${email}\nFirm: ${firmName || 'Not provided'}\nSource: ${source}\nNote: ${note || 'None'}`,
  });
}
