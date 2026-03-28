import type { AuditRecord } from '@/lib/audit-types';
import { makePrivateEntry } from '@/lib/tokens';

const sampleAudit: AuditRecord = {
  id: 'local-sample-small-law-firm',
  source: 'local',
  kind: 'sample',
  slug: 'sample-small-law-firm',
  headline: 'What a free SyncWorkflow audit looks like for a small law firm',
  subheadline:
    'This sanitized sample shows how I review website conversion, intake friction, and response workflow for a small law firm before recommending any build work.',
  auditSummary:
    'This is a public sample. A real free audit is personalized, private, and focused on the specific issues on a firm’s current site and intake flow.',
  reviewerNote:
    'Sanitized example using fictional details. Shared publicly to show the review format without exposing a real firm.',
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
    'Annotated screenshots of the most important mobile friction points.',
    'A recommended order for website, intake, and workflow fixes.',
    'Notes on where ongoing monthly support would help most after the audit.',
  ],
  implementationOptions: [
    'Ongoing website updates without needing to hire an internal web team.',
    'Simpler intake forms, stronger contact paths, and clearer next-step messaging.',
    'Workflow improvements like chatbots, follow-up automations, and routing logic where they actually help.',
  ],
  findings: [
    {
      id: 'homepage-message-gap',
      priority: 'Immediate',
      label: 'Homepage clarity',
      title: 'The homepage asks visitors to trust the firm before it clearly explains what to do next.',
      detail:
        'The first screen does not quickly answer who the firm helps, what the next step is, or how fast someone responds after a contact request.',
      evidence:
        'The CTA area competes with informational copy, while the strongest action is pushed below the fold on mobile.',
      impact:
        'Potential clients often delay action when the first screen feels dense or uncertain.',
      recommendation:
        'Lead with one clear consultation action, then reinforce it with a short trust block and response expectation.',
    },
    {
      id: 'intake-scope',
      priority: 'High',
      label: 'Intake form',
      title: 'The first-step intake form tries to qualify too much before the firm has earned that effort.',
      detail:
        'Several questions look useful internally, but they belong later in the process after the initial inquiry is secured.',
      evidence:
        'The mobile form asks for matter detail before clearly explaining what happens after submit.',
      impact:
        'Longer first-touch forms create avoidable drop-off, especially on phones.',
      recommendation:
        'Shorten the first form to essential routing fields and move lower-value questions into follow-up.',
    },
    {
      id: 'response-workflow-gap',
      priority: 'High',
      label: 'Response workflow',
      title: 'The site does not do enough to prove that inquiries will get a fast, structured response.',
      detail:
        'A strong website does not stop at form submission. It reassures people that their request is seen, routed, and answered quickly.',
      evidence:
        'There is no visible “what happens next” block and no concrete follow-up expectation around contact requests.',
      impact:
        'Prospects are more likely to keep searching when response confidence is weak.',
      recommendation:
        'Add stronger response messaging on the site and support it with a lightweight follow-up workflow behind the scenes.',
    },
  ],
  fullAuditSections: [
    {
      title: 'Website Conversion',
      summary:
        'The website should guide a visitor toward one clear next step instead of forcing extra interpretation.',
      bullets: [
        'Clarify the first-screen action and supporting trust language.',
        'Tighten page hierarchy so important contact actions show up sooner on mobile.',
        'Reduce copy blocks that slow down the first decision.',
      ],
      implementation:
        'This usually becomes a mix of messaging, layout, and page-level conversion work inside an ongoing site relationship.',
    },
    {
      title: 'Intake Experience',
      summary:
        'Small improvements to the intake path can remove friction without making the process feel robotic or generic.',
      bullets: [
        'Keep the first form short and useful.',
        'Add better handoff expectations after submit.',
        'Use follow-up logic to collect deeper details later.',
      ],
      implementation:
        'This often leads to form redesign, intake restructuring, and small automation changes that save staff time.',
    },
    {
      title: 'Ongoing Web Team Support',
      summary:
        'After the audit, the long-term value usually comes from consistent iteration rather than one isolated fix.',
      bullets: [
        'Monthly website improvements and page updates.',
        'Chatbot, contact, and follow-up experiments where they fit the firm.',
        'Workflow tuning so leads move through the first-touch process faster.',
      ],
      implementation:
        'This is the subscription-style web team offer: ongoing support that improves the site and the workflow together.',
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
  headline: '3 issues likely making it harder for Evergreen Family Law to win consultations',
  subheadline:
    'I reviewed the public site, intake form, and follow-up path on mobile. This free audit preview shows the highest-signal issues only, not the full diagnosis.',
  auditSummary:
    'This private preview shows a few of the clearest issues. The full audit expands on the friction points, annotated notes, and the order I would fix first.',
  reviewerNote:
    'Private free audit preview prepared after reviewing the public site on mobile and desktop.',
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
    'A screenshot sequence showing where the mobile contact path loses urgency.',
    'A short breakdown of intake questions that can be shortened or deferred.',
    'A response-speed messaging rewrite designed to increase qualified inquiries.',
  ],
  implementationOptions: [
    'Shorten the mobile intake path and move lower-value questions to follow-up.',
    'Add faster-response cues around consult requests and contact options.',
    'Install a tighter after-hours handoff flow using chat, forms, and follow-up email.',
  ],
  findings: [
    {
      id: 'mobile-cta-friction',
      priority: 'Immediate',
      label: 'Contact path',
      title: 'The primary contact path asks visitors to choose too much too early.',
      detail:
        'On mobile, the page asks a visitor to decide between calling, filling out a long form, or reading more before trust and urgency have been established.',
      evidence:
        'The first screen offers multiple actions, but no dominant next step and no clear response-time promise next to the consultation CTA.',
      impact:
        'Prospects are more likely to delay or bounce when the next step is unclear.',
      recommendation:
        'Reduce the first decision to one primary consultation action, then offer alternate contact paths after that commitment point.',
    },
    {
      id: 'form-length',
      priority: 'High',
      label: 'Intake form',
      title: 'The intake form asks for too much detail before the firm has earned that effort.',
      detail:
        'Several questions appear better suited for a follow-up call than for a first-touch mobile inquiry.',
      evidence:
        'The form asks for multiple context fields before reinforcing what the prospect gets after submitting or how quickly someone replies.',
      impact:
        'Longer mobile forms suppress completion and waste staff time following up on partial inquiries.',
      recommendation:
        'Move qualifying detail downstream. Keep the first-step form to essential routing information and response expectations.',
    },
    {
      id: 'response-confidence',
      priority: 'High',
      label: 'Response speed',
      title: 'There is not enough proof that inquiries will get a fast, useful response.',
      detail:
        'The current contact experience does not reassure a prospect about timing, ownership, or what happens after submit.',
      evidence:
        'The contact area lacks a plain-language “what happens next” block and does not show a concrete turnaround expectation.',
      impact:
        'When legal prospects do not believe they will hear back quickly, they keep searching and contact another firm.',
      recommendation:
        'Add response-timing language, after-hours expectations, and a simple follow-up workflow that immediately confirms the request.',
    },
  ],
  fullAuditSections: [
    {
      title: 'Homepage Conversion Path',
      summary:
        'The current homepage does not create a single dominant next step for consultation-seeking traffic.',
      bullets: [
        'Reduce competing first-screen actions and reinforce one consultation CTA.',
        'Move low-priority informational blocks below trust-building proof and the first CTA.',
        'Use clearer mobile spacing so the action path reads in one scroll, not as scattered modules.',
      ],
      implementation:
        'This is a copy, hierarchy, and layout fix. It can be implemented without a full redesign.',
    },
    {
      title: 'Intake Form Scope',
      summary:
        'The intake flow tries to both capture a lead and qualify the matter in one step. That is too much friction for first-touch traffic.',
      bullets: [
        'Trim the first form to the minimum needed to route the inquiry.',
        'Defer matter details until after confirmation or during the first callback.',
        'Add stronger reassurance around privacy and response timing on mobile.',
      ],
      implementation:
        'A shorter first-step intake plus automated follow-up can improve completion without reducing lead quality.',
    },
    {
      title: 'Response Workflow',
      summary:
        'The site does not clearly show that inquiry submission triggers a fast, structured response process.',
      bullets: [
        'Trigger immediate confirmation email or SMS after submit.',
        'Route the inquiry internally with owner and deadline visibility.',
        'Use an after-hours workflow so leads are not left in a dead zone overnight or on weekends.',
      ],
      implementation:
        'This is where chatbots, forms, inbox routing, and follow-up automations become useful after the audit identifies the weak points.',
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
