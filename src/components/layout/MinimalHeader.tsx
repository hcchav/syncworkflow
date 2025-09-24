'use client';

import Link from 'next/link';

interface MinimalHeaderProps {
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  showCta?: boolean;
}

export default function MinimalHeader({ 
  ctaText = "Get Started", 
  ctaHref = "#", 
  onCtaClick,
  showCta = true 
}: MinimalHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container-width">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-brand-dark">
              Sync<span className="text-brand-primary">Workflow</span>
            </span>
          </Link>

          {/* Primary CTA */}
          {showCta && (
            <div>
              {onCtaClick ? (
                <button
                  onClick={onCtaClick}
                  className="btn-primary text-sm lg:text-base"
                >
                  {ctaText}
                </button>
              ) : (
                <Link href={ctaHref} className="btn-primary text-sm lg:text-base">
                  {ctaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
