'use client';

import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "Working with SyncWorkflow transformed our business. They helped us scale our customer acquisition while reducing costs by over 40%.",
    author: "Sarah Johnson",
    title: "CMO, TechStart Inc.",
    image: "/images/testimonial-1.jpg"
  },
  {
    quote: "Their data-driven approach to growth is unmatched. We saw a 3x increase in conversions within the first 60 days of working together.",
    author: "Michael Chen",
    title: "Founder, EcoGoods",
    image: "/images/testimonial-2.jpg"
  },
  {
    quote: "The team at SyncWorkflow doesn't just execute - they become an extension of your team. Their insights have been invaluable to our growth.",
    author: "Alex Rivera",
    title: "VP of Marketing, FitTech",
    image: "/images/testimonial-3.jpg"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            No contracts. No jerks. See why 100+ brands trust our growth team.
          </p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-blue-50 rounded-xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 mb-6 overflow-hidden relative">
                {/* Placeholder for testimonial author image */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                  <span className="text-white font-bold">{testimonials[activeIndex].author.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              
              <div className="text-center">
                <svg className="h-12 w-12 text-blue-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-xl md:text-2xl font-medium text-gray-900 mb-6">
                  {testimonials[activeIndex].quote}
                </p>
                <div className="font-medium text-gray-900">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-blue-600">
                  {testimonials[activeIndex].title}
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8">
            <button 
              onClick={prevTestimonial}
              className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none"
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8">
            <button 
              onClick={nextTestimonial}
              className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none"
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full ${index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
