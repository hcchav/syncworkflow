const fallbackUrl = 'http://localhost:3000';

export const siteConfig = {
  name: 'SyncWorkflow',
  title: 'SyncWorkflow | Find What Is Costing Your Law Firm New Calls',
  description:
    'Free private audits for law firms that review the homepage, form, and next step before any ongoing website or workflow support.',
  url: process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl,
  replyToEmail: process.env.AUDIT_REPLY_TO_EMAIL || 'hello@syncworkflow.com',
  notificationEmail:
    process.env.AUDIT_NOTIFICATION_EMAIL || process.env.AUDIT_REPLY_TO_EMAIL || 'hello@syncworkflow.com',
  resendFromEmail: process.env.RESEND_FROM_EMAIL || 'audits@syncworkflow.com',
};

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}
