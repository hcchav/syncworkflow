'use client';

import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function HeroSection() {
  return (
    <div className={`${inter.className} bg-white text-black`}>
      {/* Main hero section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 uppercase">
            Tradeshow Registration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capture more leads and engage visitors with our digital registration system.
            Perfect for tradeshows, conferences, and events of any size.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {/* Tablet Device Mockup - Horizontal */}
          <div className="device-mockup tablet">
            <div className="rounded-[40px] border border-[#0bfe88]/20 shadow-[0_50px_100px_-20px_rgba(11,254,136,0.3),0_30px_60px_-30px_rgba(0,0,0,0.8)] bg-[#1a1a1a] p-2 w-[640px] h-[380px] relative">
              {/* Tablet camera */}
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-[6px] h-[6px] bg-[#333] rounded-full z-50 border border-[#444]"></div>
              
              <div className="bg-black rounded-[32px] w-full h-full overflow-hidden relative">
                {/* Background gradient and grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0bfe88]/5 via-black to-[#0bfe88]/10">
                  <div className="absolute inset-0 viewfinder-grid"></div>
                </div>
                
                {/* Top UI */}
                <div className="absolute top-0 left-0 right-0 z-40 pt-4 pb-2 px-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-2 py-1">
                      <div className="w-1.5 h-1.5 bg-[#0bfe88] rounded-full recording-dot"></div>
                      <span className="text-white text-xs">LIVE</span>
                    </div>
                    <div className="text-sm font-bold">
                      <span className="text-white">Sync</span><span className="text-[#3777ff]">Workflow</span>
                    </div>
                  </div>
                </div>
                
                {/* Form UI */}
                <div className="form-ui h-full p-8 pt-12 relative z-30">
                  <div className="flex flex-row gap-10 h-full">
                    {/* Left side - Form fields */}
                    <div className="flex-1 space-y-4">
                      <div className="text-white text-sm uppercase mb-1 opacity-70">Tradeshow Registration</div>
                      <input 
                        type="text" 
                        placeholder="NAME" 
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0bfe88] placeholder:text-gray-400 border border-gray-700"
                      />
                      
                      <input 
                        type="email" 
                        placeholder="EMAIL" 
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0bfe88] placeholder:text-gray-400 border border-gray-700"
                      />
                      
                      <input 
                        type="tel" 
                        placeholder="PHONE" 
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0bfe88] placeholder:text-gray-400 border border-gray-700"
                      />
                    </div>
                    
                    {/* Right side - Info and button */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-white text-sm uppercase mb-1 opacity-70">Event Details</div>
                        <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-md p-4 mb-3">
                          <p className="text-white text-sm">June 24-26, 2025</p>
                          <p className="text-white text-sm">Las Vegas Convention Center</p>
                          <p className="text-[#0bfe88] text-sm font-bold mt-1">Booth #1234</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <button className="w-full bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold py-3 px-6 rounded-md uppercase hover:shadow-[0_0_15px_rgba(11,254,136,0.5)] transform hover:scale-[1.02] transition-all duration-300">
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Phone Device Mockup */}
          <div className="device-mockup phone transform hover:-translate-y-2 transition-transform duration-500 ease-in-out camera-float">
            <div className="rounded-[54px] border border-[#0bfe88]/20 shadow-[0_50px_100px_-20px_rgba(11,254,136,0.3),0_30px_60px_-30px_rgba(0,0,0,0.8)] bg-[#1a1a1a] p-2 w-[280px] h-[580px] relative">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[24px] bg-black rounded-b-[12px] z-50"></div>
              
              <div className="bg-black rounded-[42px] w-full h-full overflow-hidden relative">
                {/* Background gradient and grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0bfe88]/5 via-black to-[#0bfe88]/10">
                  <div className="absolute inset-0 viewfinder-grid"></div>
                </div>
                
                {/* Top UI */}
                <div className="absolute top-0 left-0 right-0 z-40 pt-8 pb-4 px-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-2 py-1">
                      <div className="w-1.5 h-1.5 bg-[#0bfe88] rounded-full recording-dot"></div>
                      <span className="text-white text-xs">LIVE</span>
                    </div>
                    <div className="text-xs font-bold">
                      <span className="text-white">Sync</span><span className="text-[#3777ff]">Workflow</span>
                    </div>
                  </div>
                </div>
                
                {/* Form UI */}
                <div className="form-ui flex flex-col h-full justify-center items-center p-4 pt-16 relative z-30">
                  <div className="w-full space-y-5 max-w-[220px]">
                    <div className="text-white text-xs uppercase mb-2 opacity-70 text-center">Tradeshow Registration</div>
                    
                    <input 
                      type="text" 
                      placeholder="NAME" 
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0bfe88] placeholder:text-gray-400 border border-gray-700"
                    />
                    
                    <input 
                      type="email" 
                      placeholder="EMAIL" 
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0bfe88] placeholder:text-gray-400 border border-gray-700"
                    />
                    
                    <input 
                      type="tel" 
                      placeholder="PHONE" 
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0bfe88] placeholder:text-gray-400 border border-gray-700"
                    />
                    
                    {/* Bottom Controls */}
                    <div className="absolute bottom-12 left-0 right-0 z-40 pb-6 px-4">
                      <div className="flex items-center justify-center w-full px-4">
                        <button className="w-full bg-[#0bfe88] hover:bg-opacity-90 text-black font-bold py-3 px-6 rounded-md uppercase hover:shadow-[0_0_15px_rgba(11,254,136,0.5)] transform hover:scale-[1.02] transition-all duration-300">
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <Link href="/contact" className="bg-transparent hover:bg-[#0bfe88] border-2 border-[#0bfe88] hover:border-transparent text-[#0bfe88] hover:text-black font-bold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300">
            GET STARTED
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Clients section */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        {/* Single row scrolling left */}
        <div className="scrolling-wrapper">
          <div className="scrolling-content-left">
            {/* First set of clients */}
            {['CES', 'E3 Expo', 'SXSW', 'Comic-Con', 'NAB Show', 'InfoComm', 'RSA Conference', 'Dreamforce', 'Adobe MAX', 'AWS re:Invent', 'Google I/O', 'Microsoft Build'].map((client, index) => (
              <div key={`client-1-${index}`} className="scrolling-item px-10 py-3 text-sm md:text-base font-medium text-gray-700">{client}</div>
            ))}
            {/* Duplicate set for seamless looping */}
            {['CES', 'E3 Expo', 'SXSW', 'Comic-Con', 'NAB Show', 'InfoComm', 'RSA Conference', 'Dreamforce', 'Adobe MAX', 'AWS re:Invent', 'Google I/O', 'Microsoft Build'].map((client, index) => (
              <div key={`client-2-${index}`} className="scrolling-item px-10 py-3 text-sm md:text-base font-medium text-gray-700">{client}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
