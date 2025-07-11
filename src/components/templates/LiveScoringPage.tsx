'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingNavbar from '../layout/LandingNavbar';

// Sample lead data with scores
const initialLeads = [
  {
    id: 1,
    name: 'Jane Smith',
    company: 'Acme Corp',
    email: 'jane@acmecorp.com',
    phone: '(555) 123-4567',
    score: 85,
    responses: [
      { question: 'Role in purchasing', answer: 'Decision Maker', score: 30 },
      { question: 'Timeline for implementation', answer: '1-3 months', score: 25 },
      { question: 'Budget allocated', answer: '$10,000-$50,000', score: 20 },
      { question: 'Current solution', answer: 'Competitor X', score: 10 }
    ],
    notes: 'Showed high interest in premium features',
    timestamp: '10:15 AM'
  },
  {
    id: 2,
    name: 'Michael Johnson',
    company: 'Global Industries',
    email: 'mjohnson@globalind.com',
    phone: '(555) 987-6543',
    score: 65,
    responses: [
      { question: 'Role in purchasing', answer: 'Influencer', score: 15 },
      { question: 'Timeline for implementation', answer: '3-6 months', score: 15 },
      { question: 'Budget allocated', answer: '$5,000-$10,000', score: 15 },
      { question: 'Current solution', answer: 'In-house solution', score: 20 }
    ],
    notes: 'Needs approval from management',
    timestamp: '11:30 AM'
  },
  {
    id: 3,
    name: 'Sarah Williams',
    company: 'Tech Innovations',
    email: 'swilliams@techinno.com',
    phone: '(555) 456-7890',
    score: 45,
    responses: [
      { question: 'Role in purchasing', answer: 'Researcher', score: 5 },
      { question: 'Timeline for implementation', answer: '6+ months', score: 10 },
      { question: 'Budget allocated', answer: 'Not determined', score: 5 },
      { question: 'Current solution', answer: 'None', score: 25 }
    ],
    notes: 'Early research stage',
    timestamp: '1:45 PM'
  },
  {
    id: 4,
    name: 'Robert Chen',
    company: 'Innovative Solutions',
    email: 'rchen@innosol.com',
    phone: '(555) 789-0123',
    score: 90,
    responses: [
      { question: 'Role in purchasing', answer: 'Decision Maker', score: 30 },
      { question: 'Timeline for implementation', answer: 'Immediate', score: 30 },
      { question: 'Budget allocated', answer: '$50,000+', score: 25 },
      { question: 'Current solution', answer: 'Unhappy with current', score: 5 }
    ],
    notes: 'Urgent need, ready to move forward',
    timestamp: '2:20 PM'
  },
  {
    id: 5,
    name: 'Emily Davis',
    company: 'Retail Masters',
    email: 'edavis@retailmasters.com',
    phone: '(555) 234-5678',
    score: 70,
    responses: [
      { question: 'Role in purchasing', answer: 'Manager', score: 20 },
      { question: 'Timeline for implementation', answer: '1-3 months', score: 25 },
      { question: 'Budget allocated', answer: '$10,000-$50,000', score: 20 },
      { question: 'Current solution', answer: 'Manual process', score: 5 }
    ],
    notes: 'Looking to automate current processes',
    timestamp: '3:05 PM'
  }
];

// Helper function to determine lead temperature based on score
const getLeadTemperature = (score: number) => {
  if (score >= 80) return { label: 'HOT', color: 'bg-red-500', textColor: 'text-red-500' };
  if (score >= 60) return { label: 'WARM', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
  return { label: 'COLD', color: 'bg-blue-400', textColor: 'text-blue-400' };
};

export default function LiveScoringPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  const [filterType, setFilterType] = useState('all');
  
  // Filter leads based on selected filter
  const filteredLeads = leads.filter(lead => {
    if (filterType === 'all') return true;
    if (filterType === 'hot') return lead.score >= 80;
    if (filterType === 'warm') return lead.score >= 60 && lead.score < 80;
    if (filterType === 'cold') return lead.score < 60;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Live Lead Scoring Dashboard</h1>
              <p className="text-blue-100 mt-2">Instantly identify your hottest leads based on their responses</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/dashboard" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition duration-300"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Today's Booth Leads</h2>
            <div className="flex mt-4 md:mt-0">
              <button 
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-l-md ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterType('hot')}
                className={`px-4 py-2 ${filterType === 'hot' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Hot
              </button>
              <button 
                onClick={() => setFilterType('warm')}
                className={`px-4 py-2 ${filterType === 'warm' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Warm
              </button>
              <button 
                onClick={() => setFilterType('cold')}
                className={`px-4 py-2 rounded-r-md ${filterType === 'cold' ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Cold
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => {
                  const temp = getLeadTemperature(lead.score);
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLead(lead.id)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${temp.color} text-white font-bold text-sm`}>
                            {lead.score}
                          </div>
                          <span className={`ml-2 font-medium ${temp.textColor}`}>{temp.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{lead.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-800">Export</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Lead Detail Panel */}
        {selectedLead && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {leads.filter(lead => lead.id === selectedLead).map(lead => {
              const temp = getLeadTemperature(lead.score);
              return (
                <div key={lead.id}>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold text-gray-800">{lead.name}</h2>
                      <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${temp.color} text-white`}>
                        {temp.label} LEAD
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedLead(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Lead Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Company:</span>
                          <p className="text-gray-800">{lead.company}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Email:</span>
                          <p className="text-gray-800">{lead.email}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Phone:</span>
                          <p className="text-gray-800">{lead.phone}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Captured:</span>
                          <p className="text-gray-800">{lead.timestamp} today</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Notes:</span>
                          <p className="text-gray-800">{lead.notes}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Actions</h3>
                        <div className="flex space-x-3">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300">
                            Export to CRM
                          </button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition duration-300">
                            Send Email
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Lead Score Breakdown</h3>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Overall Score</span>
                          <span className={`font-bold ${temp.textColor}`}>{lead.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className={`${temp.color} h-2.5 rounded-full`} style={{ width: `${lead.score}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {lead.responses.map((response, idx) => (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-500">{response.question}</span>
                              <span className="text-sm font-medium text-gray-800">{response.score} pts</span>
                            </div>
                            <div className="flex items-center">
                              <div className="flex-grow">
                                <div className="text-sm text-gray-800">{response.answer}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-gray-50 rounded-md">
                        <h4 className="font-medium text-gray-800 mb-2">Scoring Explanation</h4>
                        <p className="text-sm text-gray-600">
                          Lead scores are calculated based on the responses to key qualification questions. 
                          Higher scores indicate leads that are more likely to convert based on their role, 
                          timeline, budget, and current solution status.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      
      {/* Feature Highlight */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Lead Scoring Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent algorithm analyzes responses to key questions to identify your most promising leads in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customizable Questions</h3>
              <p className="text-gray-600">
                Create your own qualification questions that matter most to your business. Assign point values to each possible answer.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Scoring</h3>
              <p className="text-gray-600">
                As leads complete your form, our system instantly calculates their score and categorizes them as hot, warm, or cold.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prioritized Follow-up</h3>
              <p className="text-gray-600">
                Focus your team's efforts on the leads most likely to convert. Export hot leads directly to your CRM for immediate action.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Prioritize Your Best Leads?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Start capturing and scoring leads at your next event with our powerful lead management system.
          </p>
          <Link 
            href="/signup" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-md font-bold text-center transition duration-300 inline-block"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
