import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
    },
    {
      url: absoluteUrl('/request-audit'),
    },
    {
      url: absoluteUrl('/sample-review'),
    },
    {
      url: absoluteUrl('/privacy'),
    },
    {
      url: absoluteUrl('/terms'),
    },
  ];
}
