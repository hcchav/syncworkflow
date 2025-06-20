'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  // Countdown timer for next tradeshow
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 45
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.minutes > 0) {
        setTimeLeft({ ...timeLeft, minutes: timeLeft.minutes - 1 });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({ ...timeLeft, hours: timeLeft.hours - 1, minutes: 59 });
      } else if (timeLeft.days > 0) {
        setTimeLeft({ ...timeLeft, days: timeLeft.days - 1, hours: 23, minutes: 59 });
      }
    }, 60000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (

    <div className="bg-black text-white py-4 px-4 text-center pt-16 md:pt-22">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between">
        <p className="text-sm md:text-base font-medium">
          Next Tradeshow: Las Vegas Convention Center - July 3-5, 2025
        </p>
        
        {/* Countdown timer */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <div className="flex items-center">
            <div className="bg-[#0bfe88] text-black font-bold px-3 py-1 rounded mr-2">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <span className="text-xs uppercase">Days</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-[#0bfe88] text-black font-bold px-3 py-1 rounded mr-2">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-xs uppercase">Hours</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-[#0bfe88] text-black font-bold px-3 py-1 rounded mr-2">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-xs uppercase">Minutes</span>
          </div>
          
          <Link href="/contact" className="bg-[#0bfe88] hover:bg-[#00e070] text-black font-bold py-1 px-4 rounded text-sm">
            SIGN UP TODAY
          </Link>
        </div>
      </div>
    </div>
  );
}
