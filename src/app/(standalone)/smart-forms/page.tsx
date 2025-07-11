// This is a special standalone page that doesn't use the global navigation and footer
'use client';

import SmartFormsPage from '@/components/templates/SmartFormsPage';
import { useEffect } from 'react';

export default function SmartForms() {
  // Use CSS to hide the default navigation and footer elements but keep LandingNavbar visible
  useEffect(() => {
    // Hide default navigation, footer, and announcement bar
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide navigation, footer, and announcement bar */
      body > nav:first-of-type, 
      footer,
      .bg-black.text-white.py-4.px-4.text-center.pt-16,
      div.bg-black.text-white.py-4.px-4.text-center,
      [data-testid="announcement-bar"] {
        display: none !important;
      }
      /* Keep the LandingNavbar visible at the top */
      .landing-navbar {
        display: block !important;
        top: 0 !important;
        z-index: 50 !important;
      }
      body > div:first-child {
        min-height: 100vh;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up when component unmounts
      document.head.removeChild(style);
    };
  }, []);

  return <SmartFormsPage />;
}
