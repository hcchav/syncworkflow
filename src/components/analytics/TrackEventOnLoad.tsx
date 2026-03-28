'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

export function TrackEventOnLoad({
  event,
  properties,
}: {
  event: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
}) {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) {
      return;
    }

    posthog.capture(event, properties);
  }, [event, posthog, properties]);

  return null;
}
