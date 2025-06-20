'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="bg-white text-black">
      {/* Main hero section */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Boost Your<br />
              <span className="text-4xl sm:text-5xl font-bold">Tradeshow</span><br />
              <span className="text-4xl sm:text-5xl font-bold">Lead Generation</span>
            </h1>
            
            <p className="text-lg mb-6">
              Capture more leads and engage visitors with our digital registration system.
              Perfect for tradeshows, conferences, and events of any size.
            </p>
            
            <ul className="mb-8 space-y-2">
              <li className="flex items-start">
                <span className="text-[#0bfe88] mr-2">•</span>
                <span><strong>Increase Engagement</strong> with digital prize wheels and giveaways</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0bfe88] mr-2">•</span>
                <span><strong>Verify Attendees</strong> with SMS or email verification</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0bfe88] mr-2">•</span>
                <span><strong>Track Inventory</strong> with our prize management dashboard</span>
              </li>
            </ul>
            
            <Link href="/contact" className="bg-[#0bfe88] hover:bg-[#00e070] text-black font-bold py-3 px-8 rounded inline-flex items-center">
              GET STARTED
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {/* Right column - Custom Booth Forms Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/custom-booth-forms.png"
                alt="Custom Booth Forms"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
            
            {/* Price tag overlay */}
            <div className="absolute top-15.5
             right-5 bg-white bg-opacity-80 rounded-lg p-3 shadow-lg">
              <p className="text-black text-sm font-medium">Custom Booth Forms</p>
              <p className="text-black text-xl font-bold">STARTING AT $500</p>
              <p className="text-[#3777ff] text-lg font-bold mt-1">+200% LEADS</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Clients section */}
      <div className="bg-black py-8">
        {/* Single row scrolling left */}
        <div className="scrolling-wrapper">
          <div className="scrolling-content-left">
            {/* First set of clients */}
            {['CES', 'E3 Expo', 'SXSW', 'Comic-Con', 'NAB Show', 'InfoComm', 'RSA Conference', 'Dreamforce', 'Adobe MAX', 'AWS re:Invent', 'Google I/O', 'Microsoft Build'].map((client, index) => (
              <div key={`client-1-${index}`} className="scrolling-item px-10 py-3 text-sm md:text-base font-medium text-white opacity-70">{client}</div>
            ))}
            {/* Duplicate set for seamless looping */}
            {['CES', 'E3 Expo', 'SXSW', 'Comic-Con', 'NAB Show', 'InfoComm', 'RSA Conference', 'Dreamforce', 'Adobe MAX', 'AWS re:Invent', 'Google I/O', 'Microsoft Build'].map((client, index) => (
              <div key={`client-2-${index}`} className="scrolling-item px-10 py-3 text-sm md:text-base font-medium text-white opacity-70">{client}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
