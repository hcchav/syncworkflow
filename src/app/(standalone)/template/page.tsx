// This is a special standalone page that doesn't use the global navigation and footer
'use client';

import TemplateLandingPage from '@/components/templates/TemplateLandingPage';
import { useEffect } from 'react';

export default function Template() {
  // Use CSS to hide the default navigation and footer elements but keep LandingNavbar visible
  useEffect(() => {
    // Hide default navigation and footer, reposition announcement bar
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide only the default navigation in the root layout */
      body > nav:first-of-type, 
      footer {
        display: none !important;
      }
      /* Keep the LandingNavbar visible at the top */
      .landing-navbar {
        display: block !important;
        top: 0 !important;
        z-index: 50 !important;
      }
      /* Position the announcement bar below the navbar */
      [data-testid="announcement-bar"] {
        position: fixed !important;
        top: 60px !important; /* Adjusted to be below navbar height */
        width: 100% !important;
        z-index: 40 !important;
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

  return <TemplateLandingPage />;
}
