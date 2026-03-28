export type FirmProfile = {
  name: string;
  website: string;
  location: string;
  practiceArea: string;
  sizeBand: string;
};

export type AuditFinding = {
  id: string;
  priority: 'Immediate' | 'High' | 'Medium';
  label: string;
  title: string;
  detail: string;
  evidence: string;
  impact: string;
  recommendation: string;
};

export type AuditSection = {
  title: string;
  summary: string;
  bullets: string[];
  implementation: string;
};

export type AuditRecord = {
  id: string;
  source: 'local' | 'convex';
  kind: 'sample' | 'personalized';
  slug: string;
  teaserToken?: string;
  previewDeliveryToken?: string;
  headline: string;
  subheadline: string;
  auditSummary: string;
  reviewerNote: string;
  reviewedAt: string;
  ctaEmail: string;
  campaign?: string;
  firm: FirmProfile;
  curiosityBullets: string[];
  implementationOptions: string[];
  findings: AuditFinding[];
  fullAuditSections: AuditSection[];
};

export type PrivateEntry = {
  slug: string;
  token: string;
};
