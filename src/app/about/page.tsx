import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | SyncWorkflow',
  description: 'Learn about our growth team, our mission, and our approach to helping businesses scale.',
};

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Former growth lead at top SaaS companies with expertise in scaling startups from zero to millions in revenue.',
    image: '/images/team-placeholder-1.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Head of CRO',
    bio: 'Data-driven optimization expert with 10+ years experience running experiments for Fortune 500 companies.',
    image: '/images/team-placeholder-2.jpg',
  },
  {
    name: 'Alex Rodriguez',
    role: 'Creative Director',
    bio: 'Award-winning designer specializing in conversion-focused design that balances aesthetics and performance.',
    image: '/images/team-placeholder-3.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Paid Media',
    bio: 'Digital advertising specialist who has managed over $50M in ad spend across multiple platforms and industries.',
    image: '/images/team-placeholder-4.jpg',
  },
];

const values = [
  {
    title: 'Data-Driven',
    description: 'We make decisions based on data, not hunches. Every strategy is backed by research and analysis.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Transparent',
    description: 'We believe in complete transparency with our clients. No hidden fees, no vanity metrics, just results.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Collaborative',
    description: 'We work as an extension of your team, not as an external agency. Your goals are our goals.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Innovative',
    description: 'We stay ahead of industry trends and continuously test new approaches to find what works best.',
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            We're on a mission to help businesses grow
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            SyncWorkflow is a team of growth experts who help startups and established companies scale through data-driven strategies and continuous optimization.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="mt-6 text-lg text-gray-600 space-y-6">
              <p>
              SyncWorkflow was founded in 2020 by a team of growth marketers who saw a gap in the market. Too many agencies were focused on vanity metrics rather than actual business growth.
              </p>
              <p>
                We started with a simple mission: to help businesses grow through data-driven strategies that actually move the needle on revenue, not just impressions or clicks.
              </p>
              <p>
                Since then, we've helped over 100 companies across various industries achieve sustainable growth through our holistic approach to digital marketing and conversion optimization.
              </p>
            </div>
          </div>
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
            {/* Placeholder for an actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Company Image Placeholder
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and how we work with our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We're a team of growth experts passionate about helping businesses scale.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for team member images */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Team Member Image
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to accelerate your growth?</h2>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Let's discuss how our team can help you reach your business goals through data-driven growth strategies.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-50"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
