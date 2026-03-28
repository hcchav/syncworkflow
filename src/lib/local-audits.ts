import type { AuditRecord } from '@/lib/audit-types';
import { makePrivateEntry } from '@/lib/tokens';

const sampleAudit: AuditRecord = {
  id: 'local-sample-small-law-firm',
  source: 'local',
  kind: 'sample',
  slug: 'sample-small-law-firm',
  headline: 'What a SyncWorkflow review looks like for one law firm',
  subheadline:
    'This public sample shows how I check the page, form, and reply path before I suggest any build work.',
  auditSummary:
    'This is a public sample. A real review is private and built for one firm and one site.',
  reviewerNote:
    'Fictional details. Shared to show the format without naming a real firm.',
  reviewedAt: 'March 27, 2026',
  ctaEmail: 'audits@syncworkflow.com',
  firm: {
    name: 'Cedar Ridge Family Law',
    website: 'https://www.cedarridgefamilylaw.example',
    location: 'Austin, TX',
    practiceArea: 'Family law',
    sizeBand: '2-10 attorneys',
  },
  curiosityBullets: [
    'Marked-up screenshots of the main mobile slow points.',
    'A simple fix order for the site, form, and reply process.',
    'Notes on where ongoing help would matter most after the review.',
  ],
  implementationOptions: [
    'Ongoing site updates without hiring an internal web team.',
    'Shorter forms, clearer contact paths, and better next-step copy.',
    'Simple automation where it actually helps the firm.',
  ],
  findings: [
    {
      id: 'homepage-message-gap',
      priority: 'Immediate',
      label: 'Homepage',
      title: 'The homepage does not make the next step clear.',
      detail:
        'The first screen does not quickly say who the firm helps, what to do next, or when someone will reply.',
      evidence:
        'The main action sits beside too much copy, and the strongest next step falls low on mobile.',
      impact:
        'People wait or leave when the first step feels unclear.',
      recommendation:
        'Lead with one clear contact action and a short reply-time note.',
    },
    {
      id: 'intake-scope',
      priority: 'High',
      label: 'Form',
      title: 'The first form asks for too much too soon.',
      detail:
        'Some questions are useful later, but they do not need to be in the first step.',
      evidence:
        'The mobile form asks for more detail before it explains what happens after submit.',
      impact:
        'Long first forms make more people stop on their phone.',
      recommendation:
        'Keep the first form short and move deeper questions to follow-up.',
    },
    {
      id: 'response-workflow-gap',
      priority: 'High',
      label: 'Reply path',
      title: 'The site does not show what happens after submit.',
      detail:
        'A strong site should tell people their request is seen and when they should expect a reply.',
      evidence:
        'There is no clear block that explains the next step or sets a reply expectation.',
      impact:
        'When people do not trust the reply process, they keep looking.',
      recommendation:
        'Add a plain next-step block and back it up with a simple reply workflow.',
    },
  ],
  fullAuditSections: [
    {
      title: 'Homepage path',
      summary:
        'The site should guide people to one clear next step.',
      bullets: [
        'Make the main action clearer on the first screen.',
        'Move contact actions higher on mobile.',
        'Cut copy that slows the first decision.',
      ],
      implementation:
        'This is mostly a copy and layout fix inside the site.',
    },
    {
      title: 'Form path',
      summary:
        'Small form changes can remove friction without making the site feel robotic.',
      bullets: [
        'Keep the first form short.',
        'Explain what happens after submit.',
        'Ask deeper questions later.',
      ],
      implementation:
        'This often leads to a form update and small automation changes.',
    },
    {
      title: 'Ongoing help',
      summary:
        'After the review, the long-term value comes from steady small fixes.',
      bullets: [
        'Monthly site improvements and page updates.',
        'Chat or contact experiments where they fit.',
        'Reply-flow tuning so leads move faster.',
      ],
      implementation:
        'This is the ongoing support offer that improves the site and reply path together.',
    },
  ],
};

const demoAudit: AuditRecord = {
  id: 'local-evergreen-family-law',
  source: 'local',
  kind: 'personalized',
  slug: 'evergreen-family-law',
  teaserToken: 'review-q4m7n2w1',
  previewDeliveryToken: 'audit-b8r9t4x2',
  headline: '3 issues likely making it harder for Evergreen Family Law to get calls',
  subheadline:
    'I checked the public site, form, and reply path on mobile. This preview shows only the clearest issues.',
  auditSummary:
    'This private preview shows a few clear issues. The full review adds notes, screenshots, and the order I would fix first.',
  reviewerNote:
    'Private preview based on a review of the public site on mobile and desktop.',
  reviewedAt: 'March 26, 2026',
  ctaEmail: 'audits@syncworkflow.com',
  campaign: 'law-firm-outreach',
  firm: {
    name: 'Evergreen Family Law',
    website: 'https://www.evergreenfamilylaw.example',
    location: 'Seattle, WA',
    practiceArea: 'Family law',
    sizeBand: '2-8 attorneys',
  },
  curiosityBullets: [
    'A screenshot set showing where the mobile contact path loses urgency.',
    'A short list of form questions that can be cut or moved later.',
    'A rewrite for reply-speed messaging near the contact action.',
  ],
  implementationOptions: [
    'Shorten the mobile form and move lower-value questions to follow-up.',
    'Add faster-reply cues around the main contact action.',
    'Set up a tighter after-hours handoff with forms and follow-up email.',
  ],
  findings: [
    {
      id: 'mobile-cta-friction',
      priority: 'Immediate',
      label: 'Contact path',
      title: 'The main contact path asks visitors to choose too much too early.',
      detail:
        'On mobile, the page asks a visitor to choose between too many actions before trust and urgency are clear.',
      evidence:
        'The first screen offers more than one action, but no clear main step and no reply-time promise.',
      impact:
        'People are more likely to wait or leave when the next step is unclear.',
      recommendation:
        'Reduce the first decision to one main action, then offer other paths later.',
    },
    {
      id: 'form-length',
      priority: 'High',
      label: 'Form',
      title: 'The first form asks for too much detail.',
      detail:
        'Several questions fit better in a follow-up call than in the first mobile step.',
      evidence:
        'The form asks for extra detail before it says what happens next or how fast someone replies.',
      impact:
        'Long mobile forms cut completion and create more partial leads.',
      recommendation:
        'Move deeper questions later. Keep the first form to the minimum needed to reply.',
    },
    {
      id: 'response-confidence',
      priority: 'High',
      label: 'Reply speed',
      title: 'The site does not prove that inquiries get a fast reply.',
      detail:
        'The current contact experience does not reassure a prospect about timing or what happens after submit.',
      evidence:
        'The contact area lacks a plain next-step block and does not show a clear turnaround time.',
      impact:
        'When people do not believe they will hear back soon, they keep searching.',
      recommendation:
        'Add reply-time language, after-hours expectations, and a simple confirmation flow.',
    },
  ],
  fullAuditSections: [
    {
      title: 'Homepage path',
      summary:
        'The current homepage does not create one clear next step.',
      bullets: [
        'Reduce competing first-screen actions and reinforce one CTA.',
        'Move low-priority blocks below proof and the first CTA.',
        'Use cleaner mobile spacing so the action path reads in one scroll.',
      ],
      implementation:
        'This is a copy, hierarchy, and layout fix. It does not need a full redesign.',
    },
    {
      title: 'Form scope',
      summary:
        'The form tries to capture a lead and qualify the matter in one step. That is too much for first-touch traffic.',
      bullets: [
        'Trim the first form to the minimum needed to route the lead.',
        'Defer matter details until after the first confirmation or callback.',
        'Add stronger reassurance around privacy and reply timing on mobile.',
      ],
      implementation:
        'A shorter first form plus follow-up can improve completion without lowering lead quality.',
    },
    {
      title: 'Reply workflow',
      summary:
        'The site does not clearly show that submission triggers a fast reply process.',
      bullets: [
        'Send a confirmation email or text right after submit.',
        'Route the lead internally with a clear owner and deadline.',
        'Use an after-hours flow so leads are not left waiting overnight or on weekends.',
      ],
      implementation:
        'This is where forms, routing, chat, and follow-up automation can help after the review finds the weak points.',
    },
  ],
};

const localAudits = [demoAudit];

export const sampleReviewEntry = makePrivateEntry(demoAudit.slug, demoAudit.teaserToken!);
export const sampleFullAuditEntry = makePrivateEntry(demoAudit.slug, demoAudit.previewDeliveryToken!);

export function getLocalTeaserAudit(slug: string, token: string) {
  return (
    localAudits.find((audit) => audit.slug === slug && audit.teaserToken === token) ?? null
  );
}

export function getLocalFullAudit(slug: string, token: string) {
  return (
    localAudits.find(
      (audit) => audit.slug === slug && audit.previewDeliveryToken === token,
    ) ?? null
  );
}

export function getDemoAudit() {
  return demoAudit;
}

export function getSampleAudit() {
  return sampleAudit;
}
