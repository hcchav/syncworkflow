'use client';

import { useState, useEffect } from 'react';
import CaseStudyBadge from './CaseStudyBadge';
import StatCard from './StatCard';
import QuoteCard from './QuoteCard';
import SocialPostEmbed from './SocialPostEmbed';

interface Stat {
  value: string;
  label: string;
  comparison: string;
}

interface Quote {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  verified: boolean;
}

interface SocialProof {
  network: string;
  handle: string;
  content: string;
  timestamp: string;
}

interface CTA {
  text: string;
  subtext: string;
}

interface CaseStudyProps {
  headline: string;
  subheadline: string;
  videoSrc: string;
  stats: Stat[];
  quotes: Quote[];
  socialProof: SocialProof[];
  ctaText: CTA;
  badge: string;
  bridgeNote: string;
  footnote: string;
}

export default function CaseStudy({
  headline,
  subheadline,
  videoSrc,
  stats,
  quotes,
  socialProof,
  ctaText,
  badge,
  bridgeNote,
  footnote
}: CaseStudyProps) {
  const [showVideo, setShowVideo] = useState(false);

  // Analytics tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Track section view
          if (typeof window !== 'undefined' && (window as any).hj) {
            (window as any).hj('event', 'cs_view_section');
            (window as any).hj('tagRecording', ['case_study_viewer']);
          }
        }
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('case-study');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoPlay = () => {
    setShowVideo(true);
    // Track video play
    if (typeof window !== 'undefined' && (window as any).hj) {
      (window as any).hj('event', 'cs_play_video');
    }
  };

  const handleCtaClick = () => {
    // Track CTA click
    if (typeof window !== 'undefined' && (window as any).hj) {
      (window as any).hj('event', 'cs_cta_click');
    }
    // Scroll to form or handle CTA action
    const formSection = document.getElementById('conversion-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="case-study" 
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="case-study-headline"
    >
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "SuperZoo Case Study: 3X More Qualified Leads at $2 CPL",
            "about": "Interactive booth lead gen using spin-to-win with validation",
            "industry": "Trade Shows",
            "isBasedOn": "Pet industry activation",
            "audience": "Boat show exhibitors",
            "author": { 
              "@type": "Organization", 
              "name": "SyncWorkflow" 
            }
          })
        }}
      />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <CaseStudyBadge text={badge} />
          <h2 
            id="case-study-headline"
            className="text-4xl lg:text-6xl font-bold text-[#171717] mb-6 leading-tight"
          >
            {headline}
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            {subheadline}
          </p>
          
          {/* Stats Grid - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                comparison={stat.comparison}
                delay={index * 200}
              />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto mb-16">
          
          {/* Left Column: Social Proof & Quotes */}
          <div className="space-y-8">
            {/* Social Post */}
            {socialProof.map((post, index) => (
              <SocialPostEmbed
                key={index}
                network={post.network}
                handle={post.handle}
                content={post.content}
                timestamp={post.timestamp}
              />
            ))}

            {/* Quote Cards */}
            {quotes.map((quote, index) => (
              <QuoteCard
                key={index}
                quote={quote.quote}
                author={quote.author}
                role={quote.role}
                avatarUrl={quote.avatarUrl}
                verified={quote.verified}
              />
            ))}
          </div>

          {/* Right Column: Video */}
          <div className="flex justify-center">
            {/* Video Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-md">
              <div className="relative">
                {!showVideo ? (
                  <div 
                    className="relative cursor-pointer group"
                    onClick={handleVideoPlay}
                    role="button"
                    tabIndex={0}
                    aria-label="Play case study video"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleVideoPlay();
                      }
                    }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#03c4eb]/10 to-[#03c4eb]/5 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#03c4eb] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0299c7] transition-colors shadow-lg">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                          </svg>
                        </div>
                        <p className="text-lg font-semibold text-[#171717]">Watch 60-Second Highlight</p>
                        <p className="text-sm text-gray-600">Scan → Register → Verify → Spin → Follow-up</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <video 
                    className="w-full aspect-video rounded-2xl shadow-lg"
                    controls
                    autoPlay
                    preload="metadata"
                    poster="/images/video-poster.jpg"
                    aria-describedby="video-description"
                  >
                    <source src={videoSrc} type="video/mp4" />
                    <track kind="captions" src="/captions/case-study-en.vtt" srcLang="en" label="English" />
                    Your browser does not support the video tag.
                  </video>
                )}
                
                {showVideo && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                    SuperZoo Case Study
                  </div>
                )}
              </div>
              
              <div id="video-description" className="sr-only">
                60-second highlight video showing the complete process: scan QR code, register, verify email, spin wheel, and automated follow-up
              </div>
            </div>
          </div>
        </div>

        {/* Bridge Note */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-[#03c4eb]/5 to-[#FFDC35]/5 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed">
              {bridgeNote}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={handleCtaClick}
            className="bg-[#03c4eb] hover:bg-[#0299c7] text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4"
            aria-describedby="cta-description"
          >
            {ctaText.text}
          </button>
          <p id="cta-description" className="text-gray-600 text-lg mb-6">
            {ctaText.subtext}
          </p>
          <p className="text-sm text-gray-500 italic">
            {footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
