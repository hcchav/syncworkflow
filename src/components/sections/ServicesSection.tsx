'use client';

import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: 'Conversion Rate Optimization',
    description: 'Grow sales with your existing traffic by designing a site that converts',
    icon: 'chart',
    stats: '+60% CVR',
    link: '/services/cro'
  },
  {
    title: 'Landing Page Design',
    description: 'Don\'t settle for being average. Elevate your company and sales by investing in brand.',
    icon: 'layout',
    stats: '3x ROI',
    link: '/services/landing-page'
  },
  {
    title: 'Paid Social',
    description: 'Daily oversight and optimization of your ad spend on Facebook, Instagram, Twitter, and more.',
    icon: 'social',
    stats: '-40% CAC',
    link: '/services/social-ads'
  },
  {
    title: 'Paid Search',
    description: 'Take advantage of the search volume around your category with a dedicated paid search team.',
    icon: 'search',
    stats: '+125% ROAS',
    link: '/services/paid-search'
  },
  {
    title: 'Email & SMS',
    description: 'From automation flows to innovative SMS campaigns, leverage email & SMS to increase your LTV.',
    icon: 'email',
    stats: '+35% LTV',
    link: '/services/email-sms'
  },
  {
    title: 'Creative',
    description: 'Get scroll-stopping creative that\'s designed to engage and convert.',
    icon: 'palette',
    stats: '2x CTR',
    link: '/services/creative'
  }
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'chart':
      return (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'layout':
      return (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case 'social':
      return (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      );
    case 'search':
      return (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    case 'email':
      return (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'palette':
      return (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

export default function ServicesSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your Growth Plan Just Got Easier
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Want an entire growth team on speed dial? From CRO to ads, we help you scale without the headache of hiring.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-green-500 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-800 flex items-center justify-center">
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="ml-3 text-xl font-bold">{service.title}</h3>
                </div>
                <div className="bg-green-500 text-black font-bold text-sm px-3 py-1 rounded">
                  {service.stats}
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 min-h-[80px]">{service.description}</p>
              
              <Link 
                href={service.link}
                className="text-green-500 hover:text-green-400 font-medium inline-flex items-center"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-green-500 hover:bg-green-600"
          >
            View All Services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
