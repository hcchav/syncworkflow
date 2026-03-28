'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

declare global {
  interface Window {
    __syncworkflowPostHogInitialized?: boolean;
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

    if (!key || typeof window === 'undefined' || window.__syncworkflowPostHogInitialized) {
      return;
    }

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageleave: true,
      capture_pageview: false,
    });

    window.__syncworkflowPostHogInitialized = true;
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
