'use client';

import Link from 'next/link';
import Image from 'next/image';

const caseStudies = [
  {
    title: 'How we decreased CAC by Over 50%',
    description: 'We helped a D2C brand optimize their acquisition funnel and reduce their customer acquisition cost by more than half.',
    industry: 'E-commerce',
    result: '-50% CAC',
    link: '/case-studies/decreased-cac'
  },
  {
    title: 'How we 3X Website Purchases',
    description: 'Through strategic CRO and paid media optimization, we helped an e-commerce brand triple their conversion rate.',
    industry: 'Retail',
    result: '3X CVR',
    link: '/case-studies/3x-purchases'
  },
  {
    title: 'We Found an Extra $175K in 30 Days',
    description: 'Our data analysis uncovered hidden opportunities that generated significant additional revenue for this SaaS client.',
    industry: 'SaaS',
    result: '+$175K',
    link: '/case-studies/extra-revenue'
  }
];

export default function CaseStudiesSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-500 text-black font-bold text-sm px-3 py-1 rounded-full mb-4">CASE STUDIES</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            We Grow Brands at an Insane Rate
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            From startups to FORTUNE 500s, we have worked at every phase of growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <div 
              key={index}
              className="relative bg-black rounded-lg overflow-hidden border border-gray-800 hover:border-green-500 transition-colors duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">{study.industry}</span>
                  <span className="bg-green-500 text-black font-bold text-sm px-3 py-1 rounded">{study.result}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{study.title}</h3>
                <p className="text-gray-400 mb-6">{study.description}</p>
                
                <Link 
                  href={study.link}
                  className="text-green-500 hover:text-green-400 font-medium inline-flex items-center"
                >
                  See Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/case-studies"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-green-500 hover:bg-green-600"
          >
            View All Case Studies
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {/* Featured clients section */}
        <div className="mt-20 border-t border-gray-800 pt-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold">Featured Clients</h3>
            <p className="mt-2 text-gray-400">We've helped these brands achieve exceptional growth</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {['Client 1', 'Client 2', 'Client 3', 'Client 4'].map((client, index) => (
              <div key={index} className="h-16 w-full flex items-center justify-center bg-gray-800 rounded-lg">
                <span className="text-gray-400 font-medium">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
