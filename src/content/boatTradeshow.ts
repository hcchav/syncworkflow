// Content constants for Boat Tradeshow Landing Page

export const HERO = {
  headline: 'Turn Boat Show Traffic into Qualified Leads',
  subheadline: 'Pay only $2 per qualified lead with our proven spin-to-win system',
  primaryCTA: 'Book Your Demo',
  secondaryCTA: 'See How It Works',
  trustSignals: [
    'No upfront costs',
    'Setup in 24 hours', 
    'Works on any device'
  ],
  videoPlaceholder: {
    title: 'Watch Demo Video',
    subtitle: 'See the system in action'
  }
};

export const STEPS = {
  title: 'How It Works',
  subtitle: 'Simple 3-step process that transforms booth visitors into qualified prospects',
  steps: [
    {
      number: 1,
      title: 'Scan QR Code',
      description: 'Visitors scan your QR code to access the interactive prize wheel experience',
      devices: ['📱 Phone', '💻 Tablet/TV']
    },
    {
      number: 2,
      title: 'Verify & Qualify',
      description: 'System captures contact info and qualifying questions before they spin',
      feature: '✓ Email verification'
    },
    {
      number: 3,
      title: 'Win & Follow Up',
      description: 'Instant prize delivery and automated follow-up sequences begin',
      feature: '🎁 Instant gratification'
    }
  ],
  deviceNote: '* Devices not included - works on attendee phones or your booth displays'
};

export const PROOF = {
  title: 'Proven Results from Pet Industry',
  stats: [
    {
      value: '3X',
      description: 'More qualified leads than traditional methods',
      color: 'blue' // #03c4eb
    },
    {
      value: '87%',
      description: 'Email capture rate at trade shows',
      color: 'yellow' // #FFDC35
    },
    {
      value: '$2',
      description: 'Average cost per qualified lead',
      color: 'black' // #171717
    }
  ],
  videoPlaceholder: {
    title: 'Case Study Video',
    subtitle: 'Real results from pet shows'
  }
};

export const PRICING = {
  title: 'Simple, Results-Based Pricing',
  subtitle: 'No setup fees. No monthly costs. Pay only for qualified leads.',
  price: '$2',
  priceDescription: 'per qualified lead',
  features: [
    'Complete setup & training included',
    'Works on any device (phone/tablet/TV)',
    'Real-time lead notifications',
    'Automated follow-up sequences'
  ],
  cta: 'Get Started Today',
  disclaimer: '* Devices not provided. System works on attendee phones or your booth displays.'
};

export const FAQS = [
  {
    id: 'devices',
    question: 'What devices do I need for my booth?',
    answer: 'None! The system works on attendees\' smartphones via QR code. Optionally, you can display it on any tablet or TV screen you already have. We don\'t provide hardware - just the software solution.'
  },
  {
    id: 'setup',
    question: 'How quickly can this be set up?',
    answer: 'Setup takes less than 24 hours. We provide your custom QR code, configure your prize wheel, and train your team. You\'ll be ready for your next show immediately.'
  },
  {
    id: 'qualified',
    question: 'How do you define a "qualified lead"?',
    answer: 'A qualified lead provides verified contact information and answers your custom qualifying questions (budget, timeline, decision-making authority, etc.). You only pay for leads that meet your criteria.'
  },
  {
    id: 'pricing',
    question: 'Are there any hidden fees or monthly costs?',
    answer: 'No hidden fees. No setup costs. No monthly subscriptions. You only pay $2 per qualified lead that meets your criteria. If you get zero qualified leads, you pay nothing.'
  },
  {
    id: 'integration',
    question: 'Does this integrate with my CRM?',
    answer: 'Yes! We can integrate with most major CRMs including Salesforce, HubSpot, and others. Leads are automatically synced in real-time with all the qualification data collected.'
  }
];

export const FINAL_CTA = {
  title: 'Ready to 3X Your Boat Show Leads?',
  subtitle: 'Book a 15-minute demo and see how the system works for boat shows',
  successMessage: {
    title: 'Thank You!',
    subtitle: 'We\'ll contact you within 24 hours to schedule your demo.'
  },
  formLabels: {
    name: 'Full Name *',
    email: 'Email Address *',
    company: 'Company Name *',
    nextShow: 'Next Boat Show *',
    notes: 'Additional Notes (Optional)'
  },
  formPlaceholders: {
    name: 'Your full name',
    email: 'your@email.com',
    company: 'Your company name',
    notes: 'Tell us about your goals, booth size, typical show attendance, etc.'
  },
  nextShowOptions: [
    { value: '', label: 'Select timeline' },
    { value: 'Soon', label: 'Within 30 days' },
    { value: '30-60 days', label: '30-60 days' },
    { value: '60-90 days', label: '60-90 days' },
    { value: 'Not scheduled', label: 'Not scheduled yet' }
  ],
  submitButton: 'Book My Demo',
  submittingButton: 'Booking Demo...',
  disclaimer: 'We\'ll contact you within 24 hours to schedule your personalized demo.'
};

export const FOOTER = {
  copyright: '© 2024 SyncWorkflow. All rights reserved.',
  links: ['Privacy Policy', 'Terms of Service']
};

// Color palette
export const COLORS = {
  primary: '#03c4eb',    // Blue
  secondary: '#FFDC35',  // Yellow
  dark: '#171717',       // Black
  light: '#f4f4f4',      // Light Grey
  white: '#ffffff'       // White
};

// Hotjar events
export const HOTJAR_EVENTS = {
  VIEW_HERO_VIDEO: 'view_hero_video',
  CTA_CLICK_HERO: 'cta_click_hero',
  CTA_CLICK_PRICING: 'cta_click_pricing',
  CTA_CLICK_FINAL: 'cta_click_final',
  FORM_SUBMIT_SUCCESS: 'form_submit_success',
  FAQ_OPEN: 'faq_open_',
  SCROLL_DEPTH_50: 'scroll_depth_50',
  SCROLL_DEPTH_90: 'scroll_depth_90'
};
