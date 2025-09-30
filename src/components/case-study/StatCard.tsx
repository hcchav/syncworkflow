'use client';

import { useState, useEffect, useRef } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  comparison: string;
  delay?: number;
}

export default function StatCard({ value, label, comparison, delay = 0 }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [animatedValue, setAnimatedValue] = useState('0');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            animateValue();
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animateValue = () => {
    // Simple animation for numeric values
    const numericValue = parseInt(value.replace(/[^\d]/g, ''));
    if (numericValue) {
      let current = 0;
      const increment = numericValue / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current) + value.replace(/[\d]/g, ''));
        }
      }, 50);
    } else {
      setAnimatedValue(value);
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setShowComparison(true)}
      onMouseLeave={() => setShowComparison(false)}
      role="button"
      tabIndex={0}
      aria-label={`${value} ${label}. ${comparison}`}
    >
      <div className="text-4xl lg:text-5xl font-bold text-[#03c4eb] mb-2">
        {isVisible ? animatedValue : '0'}
      </div>
      <div className="text-gray-700 font-semibold mb-2">{label}</div>
      
      {/* Comparison reveal on hover */}
      <div className={`transition-all duration-300 overflow-hidden ${
        showComparison ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-2 mt-2">
          {comparison}
        </div>
      </div>
    </div>
  );
}
