'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar - positioned at the top of the page */}
      <nav 
        className={`landing-navbar fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-md py-2' : 'bg-black/80 py-4'}`} 
        style={{ top: '0' }} // Position at the top of the page
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-white">Sync</span>
                <span className="text-2xl font-bold text-[var(--brand-blue)]">Workflow</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="/contact" className="bg-[var(--brand-blue)] hover:bg-opacity-90 text-white px-4 py-2 rounded-md font-medium transition-colors">
                BOOK NOW
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#0bfe88]"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/services" className="block px-3 py-2 text-white hover:bg-gray-800 hover:text-[var(--brand-blue)] font-medium">
                Services
              </Link>
              <Link href="/case-studies" className="block px-3 py-2 text-white hover:bg-gray-800 hover:text-[var(--brand-blue)] font-medium">
                Case Studies
              </Link>
              <Link href="/about" className="block px-3 py-2 text-white hover:bg-gray-800 hover:text-[var(--brand-blue)] font-medium">
                About Us
              </Link>
              <Link href="/contact" className="block px-3 py-2 bg-[var(--brand-blue)] text-white hover:bg-opacity-90 rounded-md font-medium transition-colors">
                BOOK NOW
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
