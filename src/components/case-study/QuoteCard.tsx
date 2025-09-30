'use client';

import { useEffect, useRef, useState } from 'react';

interface QuoteCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  verified: boolean;
}

export default function QuoteCard({ quote, author, role, avatarUrl, verified }: QuoteCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={cardRef}
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <blockquote className="text-gray-800 text-lg leading-relaxed mb-4 italic">
        "{quote}"
      </blockquote>
      
      {verified && (
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-[#FFDC35]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
      )}

      <figcaption className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#03c4eb] to-[#0299c7] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {author.charAt(1).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-bold text-[#03c4eb]">{author}</div>
            <div className="text-sm text-gray-500">{role}</div>
          </div>
        </div>
        
        {verified && (
          <span className="text-xs text-gray-500 bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
            Verified Attendee
          </span>
        )}
      </figcaption>
    </figure>
  );
}
