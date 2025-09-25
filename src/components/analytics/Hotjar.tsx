'use client';

import { useEffect } from 'react';

interface HotjarProps {
  hjid?: string;
  hjsv?: string;
}

export default function Hotjar({ 
  hjid = process.env.NEXT_PUBLIC_HOTJAR_ID, 
  hjsv = process.env.NEXT_PUBLIC_HOTJAR_SV || '6' 
}: HotjarProps) {
  useEffect(() => {
    if (!hjid) {
      console.warn('Hotjar ID not provided. Skipping Hotjar initialization.');
      return;
    }

    // Initialize Hotjar
    (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj = h.hj || function(...args: any[]) { 
        (h.hj.q = h.hj.q || []).push(args); 
      };
      h._hjSettings = { hjid, hjsv };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

    // Set up scroll depth tracking
    let scrollDepth50Fired = false;
    let scrollDepth90Fired = false;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 50 && !scrollDepth50Fired) {
        scrollDepth50Fired = true;
        if ((window as any).hj) {
          (window as any).hj('event', 'scroll_depth_50');
        }
      }
      
      if (scrollPercent >= 90 && !scrollDepth90Fired) {
        scrollDepth90Fired = true;
        if ((window as any).hj) {
          (window as any).hj('event', 'scroll_depth_90');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hjid, hjsv]);

  return null;
}

// Utility function to fire custom Hotjar events
export const fireHotjarEvent = (eventName: string) => {
  if (typeof window !== 'undefined' && (window as any).hj) {
    (window as any).hj('event', eventName);
  }
};
