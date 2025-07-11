'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingNavbar from '../layout/LandingNavbar';

// Sample prize data
const initialPrizes = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech',
    value: 249.99,
    quantity: 3,
    remaining: 2,
    image: 'headphones',
    qualificationCriteria: 'Decision maker with budget > $10k',
    minLeadScore: 80
  },
  {
    id: 2,
    name: 'Smart Water Bottle',
    brand: 'HydroTech',
    value: 45.00,
    quantity: 50,
    remaining: 32,
    image: 'water-bottle',
    qualificationCriteria: 'Any lead that completes full survey',
    minLeadScore: 0
  },
  {
    id: 3,
    name: 'Power Bank 10000mAh',
    brand: 'PowerUp',
    value: 59.99,
    quantity: 25,
    remaining: 18,
    image: 'power-bank',
    qualificationCriteria: 'Implementation timeline < 6 months',
    minLeadScore: 60
  },
  {
    id: 4,
    name: 'Annual Software License',
    brand: 'Our Product',
    value: 1200.00,
    quantity: 1,
    remaining: 1,
    image: 'software',
    qualificationCriteria: 'C-level executive with immediate need',
    minLeadScore: 90
  },
  {
    id: 5,
    name: 'Conference VIP Pass',
    brand: 'TechConf 2025',
    value: 799.00,
    quantity: 2,
    remaining: 1,
    image: 'vip-pass',
    qualificationCriteria: 'Decision maker from Fortune 500',
    minLeadScore: 85
  }
];

// Sample winner data
const initialWinners = [
  {
    id: 1,
    name: 'Robert Chen',
    company: 'Innovative Solutions',
    email: 'rchen@innosol.com',
    prizeId: 4,
    prizeName: 'Annual Software License',
    timestamp: '2:20 PM',
    leadScore: 90,
    claimed: true
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'Acme Corp',
    email: 'jane@acmecorp.com',
    prizeId: 5,
    prizeName: 'Conference VIP Pass',
    timestamp: '10:15 AM',
    leadScore: 85,
    claimed: true
  },
  {
    id: 3,
    name: 'Michael Johnson',
    company: 'Global Industries',
    email: 'mjohnson@globalind.com',
    prizeId: 3,
    prizeName: 'Power Bank 10000mAh',
    timestamp: '11:30 AM',
    leadScore: 65,
    claimed: false
  },
  {
    id: 4,
    name: 'Emily Davis',
    company: 'Retail Masters',
    email: 'edavis@retailmasters.com',
    prizeId: 1,
    prizeName: 'Premium Wireless Headphones',
    timestamp: '3:05 PM',
    leadScore: 82,
    claimed: true
  }
];

// Sample qualified leads data
const qualifiedLeads = [
  {
    id: 1,
    name: 'Thomas Wilson',
    company: 'Enterprise Tech',
    email: 'twilson@enterprisetech.com',
    phone: '(555) 765-4321',
    score: 88,
    qualifiedFor: [1, 3],
    timestamp: '9:45 AM'
  },
  {
    id: 2,
    name: 'Sophia Rodriguez',
    company: 'Digital Solutions Inc.',
    email: 'srodriguez@digitalsol.com',
    phone: '(555) 234-5678',
    score: 75,
    qualifiedFor: [3],
    timestamp: '11:20 AM'
  },
  {
    id: 3,
    name: 'James Lee',
    company: 'Innovate Corp',
    email: 'jlee@innovatecorp.com',
    phone: '(555) 876-5432',
    score: 92,
    qualifiedFor: [1, 3, 4, 5],
    timestamp: '1:15 PM'
  }
];

export default function GiveawayTrackerPage() {
  const [prizes, setPrizes] = useState(initialPrizes);
  const [winners, setWinners] = useState(initialWinners);
  const [leads, setLeads] = useState(qualifiedLeads);
  const [activeTab, setActiveTab] = useState('prizes');
  const [selectedPrize, setSelectedPrize] = useState<number | null>(null);
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [newWinner, setNewWinner] = useState<any | null>(null);
  
  // Function to handle prize drawing
  const handleDrawWinner = (prizeId: number) => {
    const prize = prizes.find(p => p.id === prizeId);
    if (!prize || prize.remaining <= 0) return;
    
    // Find qualified leads for this prize
    const qualifiedForPrize = leads.filter(lead => 
      lead.qualifiedFor.includes(prizeId) && 
      !winners.some(w => w.email === lead.email && w.prizeId === prizeId)
    );
    
    if (qualifiedForPrize.length === 0) {
      alert('No qualified leads available for this prize.');
      return;
    }
    
    // Randomly select a winner
    const randomIndex = Math.floor(Math.random() * qualifiedForPrize.length);
    const selectedLead = qualifiedForPrize[randomIndex];
    
    // Create new winner
    const winner = {
      id: winners.length + 1,
      name: selectedLead.name,
      company: selectedLead.company,
      email: selectedLead.email,
      prizeId: prize.id,
      prizeName: prize.name,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      leadScore: selectedLead.score,
      claimed: false
    };
    
    setNewWinner(winner);
    setShowDrawModal(true);
  };
  
  // Function to confirm winner
  const confirmWinner = () => {
    if (!newWinner) return;
    
    // Update winners list
    setWinners([...winners, newWinner]);
    
    // Update prize remaining count
    setPrizes(prizes.map(prize => 
      prize.id === newWinner.prizeId 
        ? {...prize, remaining: prize.remaining - 1} 
        : prize
    ));
    
    setShowDrawModal(false);
    setNewWinner(null);
  };
  
  // Function to mark prize as claimed
  const markAsClaimed = (winnerId: number) => {
    setWinners(winners.map(winner => 
      winner.id === winnerId 
        ? {...winner, claimed: true} 
        : winner
    ));
  };
  
  // Function to add a new lead (simplified for demo)
  const addNewLead = () => {
    const newLead = {
      id: leads.length + 1,
      name: 'New Lead',
      company: 'New Company',
      email: `lead${leads.length + 1}@example.com`,
      phone: '(555) 123-4567',
      score: 75,
      qualifiedFor: [2, 3],
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setLeads([...leads, newLead]);
    alert('New lead added and automatically qualified for eligible prizes!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Booth Giveaway Tracker</h1>
              <p className="text-blue-100 mt-2">Manage booth prizes and automatically enter qualified leads</p>
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
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('prizes')}
              className={`${
                activeTab === 'prizes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Prizes
            </button>
            <button
              onClick={() => setActiveTab('winners')}
              className={`${
                activeTab === 'winners'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Winners
            </button>
            <button
              onClick={() => setActiveTab('qualified')}
              className={`${
                activeTab === 'qualified'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Qualified Leads
            </button>
          </nav>
        </div>
        
        {/* Prizes Tab Content */}
        {activeTab === 'prizes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Available Prizes</h2>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                onClick={() => alert('Add Prize functionality would go here')}
              >
                Add New Prize
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prizes.map((prize) => (
                <div 
                  key={prize.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      {prize.image === 'headphones' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      )}
                      {prize.image === 'water-bottle' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      )}
                      {prize.image === 'power-bank' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {prize.image === 'software' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {prize.image === 'vip-pass' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{prize.name}</h3>
                        <p className="text-sm text-gray-500">{prize.brand}</p>
                      </div>
                      <span className="text-lg font-bold text-blue-600">${prize.value.toFixed(2)}</span>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Remaining:</span>
                        <span className={`ml-1 font-bold ${prize.remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {prize.remaining} of {prize.quantity}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Min Score:</span>
                        <span className="ml-1 font-medium">
                          {prize.minLeadScore > 0 ? prize.minLeadScore : 'Any'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Qualification Criteria:</h4>
                      <p className="text-sm text-gray-800">{prize.qualificationCriteria}</p>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={() => setSelectedPrize(prize.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDrawWinner(prize.id)}
                        disabled={prize.remaining <= 0}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          prize.remaining > 0
                            ? 'bg-amber-500 hover:bg-amber-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Draw Winner
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Winners Tab Content */}
        {activeTab === 'winners' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Prize Winners</h2>
              <div className="flex space-x-2">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                  onClick={() => alert('Export Winners functionality would go here')}
                >
                  Export CSV
                </button>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Winner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prize
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {winners.map((winner) => (
                    <tr key={winner.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{winner.name}</div>
                            <div className="text-sm text-gray-500">{winner.company}</div>
                            <div className="text-xs text-gray-400">{winner.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{winner.prizeName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{winner.timestamp}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          <span className={`${
                            winner.leadScore >= 80 ? 'text-green-600' : 
                            winner.leadScore >= 60 ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {winner.leadScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          winner.claimed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {winner.claimed ? 'Claimed' : 'Unclaimed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {!winner.claimed ? (
                          <button
                            onClick={() => markAsClaimed(winner.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Mark Claimed
                          </button>
                        ) : (
                          <span className="text-gray-400">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Qualified Leads Tab Content */}
        {activeTab === 'qualified' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Qualified Leads</h2>
              <div className="flex space-x-2">
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                  onClick={addNewLead}
                >
                  Add Demo Lead
                </button>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-300"
                  onClick={() => alert('Import Leads functionality would go here')}
                >
                  Import Leads
                </button>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qualified For
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{lead.timestamp}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          <span className={`${
                            lead.score >= 80 ? 'text-green-600' : 
                            lead.score >= 60 ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {lead.score}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {lead.qualifiedFor.map((prizeId) => {
                            const prize = prizes.find(p => p.id === prizeId);
                            return prize ? (
                              <span 
                                key={prizeId}
                                className="px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full bg-blue-100 text-blue-800"
                                title={prize.name}
                              >
                                {prize.name.length > 15 ? prize.name.substring(0, 15) + '...' : prize.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>



        )}
{/* Draw Winner Modal */}
{showDrawModal && newWinner && (
  <div className="fixed inset-0 overflow-y-auto z-50">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Confirm Prize Winner
              </h3>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-4">
                  The following lead has been randomly selected to win:
                </p>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="font-medium text-gray-800">{newWinner.prizeName}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="font-medium text-gray-800">{newWinner.name}</div>
                  <div className="text-sm text-gray-500">{newWinner.company}</div>
                  <div className="text-sm text-gray-500">{newWinner.email}</div>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm font-medium text-gray-500 mr-2">Lead Score:</span>
                    <span className={`font-medium ${
                      newWinner.leadScore >= 80 ? 'text-green-600' : 
                      newWinner.leadScore >= 60 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {newWinner.leadScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={confirmWinner}
          >
            Confirm Winner
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setShowDrawModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </main>
      
      {/* Educational Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How Booth Prize Management Works</h2>
            <p className="mt-4 text-lg text-gray-500">
              Automatically qualify leads for prizes based on their score and profile data
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">1. Set Up Prizes</h3>
                <p className="mt-2 text-gray-500">
                  Add prizes to your booth inventory with qualification criteria and lead score thresholds.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">2. Collect Leads</h3>
                <p className="mt-2 text-gray-500">
                  As leads are captured, they're automatically qualified for prizes based on their profile and score.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">3. Draw Winners</h3>
                <p className="mt-2 text-gray-500">
                  Randomly select winners from qualified leads and track prize claims in real-time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/features" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Learn more about our lead management features
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to boost your booth ROI?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Start capturing and qualifying leads with our complete trade show solution
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                >
                  Start Free Trial
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}