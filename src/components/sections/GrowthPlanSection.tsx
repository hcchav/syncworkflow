import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GrowthPlanSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with Phones */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex justify-center -mx-2 mb-8">
            {/* Phone mockups */}
            <div className="px-2">
              <Image 
                src="/images/phone-mockup-1.png" 
                alt="Registration app mockup" 
                width={180} 
                height={360}
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="px-2">
              <Image 
                src="/images/phone-mockup-2.png" 
                alt="Prize wheel mockup" 
                width={180} 
                height={360}
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="px-2">
              <Image 
                src="/images/phone-mockup-3.png" 
                alt="Lead capture mockup" 
                width={180} 
                height={360}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
          
          <div className="text-center max-w-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0 md:mr-3">We've helped 100+</h2>
              <div>
                <p className="text-3xl md:text-4xl font-bold">companies</p>
                <p className="text-3xl md:text-4xl font-bold">grow</p>
                <div className="bg-[#0bfe88] px-3 py-1 inline-block">
                  <p className="text-3xl md:text-4xl font-bold">revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Your Growth Plan Just Got Easier</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stand out with custom apps for your next B2B tradeshow. Our tools will help you
            collect and qualify leads faster than ever before.
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Steps */}
          <div className="space-y-8">
            <div className="border-b pb-4">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="font-semibold">1</span>
                </div>
                <h3 className="font-bold">Share with us your starting needs</h3>
              </div>
              <p className="text-gray-600 mt-2 pl-11">
                We'll help you design a full-service booth experience.
              </p>
              <Link href="/contact" className="text-[#0bfe88] font-semibold pl-11 block mt-2">
                LEARN MORE
              </Link>
            </div>
            
            <div className="border-b pb-4">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="font-semibold">2</span>
                </div>
                <h3 className="font-bold">WEBSITE DESIGN & BRAND</h3>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="font-semibold">3</span>
                </div>
                <h3 className="font-bold">PRIZE WHEEL</h3>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="font-semibold">4</span>
                </div>
                <h3 className="font-bold">EMAIL & SMS</h3>
              </div>
            </div>
            
            <div className="border-b pb-4">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <span className="font-semibold">5</span>
                </div>
                <h3 className="font-bold">AD CREATIVE SERVICES</h3>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image Grid */}
          <div className="relative">
            <div className="bg-black rounded-lg p-8 relative overflow-hidden">
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    <Image 
                      src={`/images/app-screen-${num}.png`} 
                      alt={`App screen ${num}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-70 p-4 rounded text-center">
                  <p className="text-white text-sm mb-2">Our process will help</p>
                  <p className="text-white text-sm mb-4">you stand out right</p>
                  <Link href="/contact" className="bg-[#0bfe88] text-black px-4 py-2 rounded-md text-sm font-medium inline-flex items-center">
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
