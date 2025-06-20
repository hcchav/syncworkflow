'use client';

import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="bg-blue-700">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to accelerate your growth?</span>
          <span className="block">Start working with us today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-100">
          Our team of growth experts is ready to help you scale your business with data-driven strategies.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
            >
              Get Started
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
