'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) {
      return;
    }

    posthog.capture('$pageview', {
      pathname,
      search: searchParams.toString(),
    });
  }, [pathname, posthog, searchParams]);

  return null;
}
