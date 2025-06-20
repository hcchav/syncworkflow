import Link from 'next/link';

export const metadata = {
  title: 'Our Services | SyncWorkflow',
  description: 'Explore our full range of growth services including CRO, paid media, email marketing, and more.',
};

const services = [
  {
    title: 'Conversion Rate Optimization',
    description: 'We help you convert more of your existing traffic into customers through data-driven testing and optimization. Our CRO process includes user research, analytics analysis, A/B testing, and continuous improvement.',
    icon: 'chart-up',
    features: [
      'Comprehensive site audits',
      'User journey mapping',
      'A/B and multivariate testing',
      'Personalization strategies',
      'Conversion funnel optimization',
      'User behavior analysis'
    ],
    link: '/services/cro'
  },
  {
    title: 'Landing Page Design',
    description: 'Our landing page designs are built to convert. We combine beautiful aesthetics with conversion-focused layouts and compelling copy to create pages that drive action.',
    icon: 'layout',
    features: [
      'Conversion-focused design',
      'Mobile-first approach',
      'Persuasive copywriting',
      'Clear call-to-actions',
      'Fast loading speed',
      'Seamless user experience'
    ],
    link: '/services/landing-page'
  },
  {
    title: 'Paid Social',
    description: 'Maximize your ROI on social platforms with our data-driven paid social strategies. We handle everything from audience research to creative development and optimization.',
    icon: 'social',
    features: [
      'Platform strategy development',
      'Audience targeting and segmentation',
      'Creative development',
      'Campaign management',
      'Performance optimization',
      'Detailed reporting and insights'
    ],
    link: '/services/social-ads'
  },
  {
    title: 'Paid Search',
    description: 'Capture high-intent traffic with our paid search services. We help you target the right keywords, optimize your ad copy, and maximize your quality scores for better ROI.',
    icon: 'search',
    features: [
      'Keyword research and strategy',
      'Ad copy optimization',
      'Landing page alignment',
      'Bid management',
      'Quality score improvement',
      'Competitor analysis'
    ],
    link: '/services/paid-search'
  },
  {
    title: 'Email & SMS Marketing',
    description: 'Build lasting relationships with your customers through personalized email and SMS campaigns. From welcome flows to win-back campaigns, we help you maximize customer lifetime value.',
    icon: 'email',
    features: [
      'Automation flow development',
      'Segmentation strategies',
      'A/B testing',
      'Personalization tactics',
      'Deliverability optimization',
      'Performance analytics'
    ],
    link: '/services/email-sms'
  },
  {
    title: 'Creative Services',
    description: 'Stand out in crowded feeds with scroll-stopping creative. Our team develops high-performing visuals and copy that capture attention and drive conversions.',
    icon: 'palette',
    features: [
      'Ad creative development',
      'Brand identity design',
      'Video production',
      'Animation and motion graphics',
      'Copywriting',
      'Creative testing frameworks'
    ],
    link: '/services/creative'
  }
];

export default function ServicesPage() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            From CRO to paid media, we offer a full suite of growth services to help you scale your business without the headache of hiring.
          </p>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md bg-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-xl font-bold text-gray-900">{service.title}</h2>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3">What's included:</h3>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={service.link}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to accelerate your growth?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our team of growth experts is ready to help you scale your business with data-driven strategies.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
