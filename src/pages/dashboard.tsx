import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

interface Suggestion {
  id: number;
  title: string;
  company: string;
  link: string;
  type: string;
  matchScore: number;
  description: string;
}

// Mock data for credential types
const credentialTypes = [
  { id: 'degree', title: 'Academic Degree', icon: '🎓' },
  { id: 'certification', title: 'Professional Certification', icon: '📜' },
  { id: 'skill', title: 'Skill Badge', icon: '🏆' },
  { id: 'work', title: 'Work Experience', icon: '💼' },
  { id: 'volunteer', title: 'Volunteer Work', icon: '🤝' },
  { id: 'language', title: 'Language Proficiency', icon: '🌍' },
  { id: 'project', title: 'Project Completion', icon: '🚀' },
  { id: 'research', title: 'Research Publication', icon: '📚' },
  { id: 'award', title: 'Award or Recognition', icon: '🏅' },
  { id: 'grant', title: 'Grant or Funding', icon: '💰' },
  { id: 'patent', title: 'Patent', icon: '⚡' },
  { id: 'membership', title: 'Professional Membership', icon: '👥' },
];

// Mock data for AI suggestions
const mockSuggestions: Suggestion[] = [
  {
    id: 1,
    title: 'Google Cloud Certification Program',
    company: 'Google Cloud',
    link: 'https://cloud.google.com/certification',
    type: 'certification',
    matchScore: 0.95,
    description: 'Get certified in Google Cloud technologies with free training resources and exam vouchers.'
  },
  {
    id: 2,
    title: 'Microsoft Learn Student Ambassador Program',
    company: 'Microsoft',
    link: 'https://studentambassadors.microsoft.com/',
    type: 'program',
    matchScore: 0.90,
    description: 'Join a global community of student leaders and get access to Microsoft resources and opportunities.'
  },
  {
    id: 3,
    title: 'GitHub Student Developer Pack',
    company: 'GitHub',
    link: 'https://education.github.com/pack',
    type: 'resource',
    matchScore: 0.88,
    description: 'Get free access to developer tools and services worth over $200.'
  },
  {
    id: 4,
    title: 'AWS Educate Program',
    company: 'Amazon Web Services',
    link: 'https://aws.amazon.com/education/awseducate/',
    type: 'program',
    matchScore: 0.85,
    description: 'Access AWS cloud services, training, and career resources for students.'
  },
  {
    id: 5,
    title: 'Google Summer of Code',
    company: 'Google',
    link: 'https://summerofcode.withgoogle.com/',
    type: 'internship',
    matchScore: 0.82,
    description: 'Work on open source projects and get paid during your summer break.'
  },
  {
    id: 6,
    title: 'MLH Fellowship',
    company: 'Major League Hacking',
    link: 'https://fellowship.mlh.io/',
    type: 'fellowship',
    matchScore: 0.80,
    description: '12-week internship alternative for aspiring software engineers.'
  },
  {
    id: 7,
    title: 'Hacktoberfest',
    company: 'DigitalOcean',
    link: 'https://hacktoberfest.com/',
    type: 'event',
    matchScore: 0.78,
    description: 'Contribute to open source and earn limited edition swag.'
  },
  {
    id: 8,
    title: 'Google Developer Student Clubs',
    company: 'Google',
    link: 'https://developers.google.com/community/gdsc',
    type: 'community',
    matchScore: 0.75,
    description: 'Join a community of student developers and learn from peers.'
  },
  {
    id: 9,
    title: 'Microsoft Learn',
    company: 'Microsoft',
    link: 'https://docs.microsoft.com/learn/',
    type: 'learning',
    matchScore: 0.72,
    description: 'Free interactive learning paths for Microsoft technologies.'
  },
  {
    id: 10,
    title: 'AWS Cloud Quest',
    company: 'Amazon Web Services',
    link: 'https://aws.amazon.com/training/learn-about-cloud/',
    type: 'learning',
    matchScore: 0.70,
    description: 'Interactive role-based learning game for AWS cloud skills.'
  }
];

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [showMintMenu, setShowMintMenu] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/register');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/get-profile?id=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setProfile(data.profile);
            setTokens(data.tokens);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt, profile }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
      setShowAIPrompt(false);
      setAiPrompt('');
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    }
  };

  const handleMintCredential = (type: string) => {
    router.push(`/mint?type=${type}`);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Welcome, {user.name}</h1>
              <p className="mt-1 text-sm text-gray-500">Wallet: {user.walletAddress}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setShowAIPrompt(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get AI Help
              </button>
            </div>
          </div>

          {/* Soulbound Tokens Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Soulbound Tokens</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tokens.length > 0 ? (
                tokens.map((token) => {
                  const credentialType = credentialTypes.find(type => type.id === token.type);
                  return (
                    <div
                      key={token.id}
                      className="bg-white overflow-hidden shadow-lg rounded-lg transform transition duration-500 hover:scale-105"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{token.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {credentialType?.icon} {credentialType?.title || 'Credential'}
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                            {new Date(token.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Issued by: {token.issuer}</p>
                        {token.type === 'degree' && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Degree: {token.degreeName}</p>
                            <p>Field: {token.fieldOfStudy}</p>
                            <p>Grade: {token.grade}</p>
                          </div>
                        )}
                        {token.type === 'certification' && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Certification: {token.certificationName}</p>
                            <p>Issuing Body: {token.issuingBody}</p>
                            <p>Valid for: {token.validityPeriod}</p>
                          </div>
                        )}
                        {token.type === 'skill' && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Skill: {token.skillName}</p>
                            <p>Level: {token.proficiencyLevel}</p>
                          </div>
                        )}
                        {token.description && (
                          <p className="mt-2 text-sm text-gray-500">{token.description}</p>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-400">Token ID: {token.id}</span>
                          <button 
                            onClick={() => {
                              setSelectedToken(token);
                              setShowDetailsModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-500">No tokens yet. Mint your first credential!</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Suggestions Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">AI Suggestions</h2>
              <button
                onClick={() => setShowAIPrompt(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Get More Suggestions
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((suggestion) => (
                <a
                  key={suggestion.id}
                  href={suggestion.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-indigo-600 truncate">
                        {suggestion.title}
                      </h3>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {suggestion.company}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)} Opportunity
                    </p>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {suggestion.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Match Score: {Math.round(suggestion.matchScore * 100)}%
                      </span>
                      <span className="text-xs text-indigo-600 hover:text-indigo-800">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* AI Prompt Modal */}
      {showAIPrompt && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAISubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Get AI Help
                      </h3>
                      <div className="mt-4">
                        <textarea
                          rows={4}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="What kind of help do you need? (e.g., 'Find job opportunities in AI', 'Get legal aid for refugees', 'Find grants for education')"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Get Suggestions
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAIPrompt(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Token Details Modal */}
      {showDetailsModal && selectedToken && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedToken.title}
                      </h3>
                      <button
                        onClick={() => setShowDetailsModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {credentialTypes.find(type => type.id === selectedToken.type)?.icon}{' '}
                          {credentialTypes.find(type => type.id === selectedToken.type)?.title}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Issued By</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedToken.issuer}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date Issued</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedToken.date).toLocaleDateString()}
                        </p>
                      </div>
                      {selectedToken.type === 'degree' && (
                        <>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Degree Name</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.degreeName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Field of Study</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.fieldOfStudy}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Grade</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.grade}</p>
                          </div>
                        </>
                      )}
                      {selectedToken.type === 'certification' && (
                        <>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Certification Name</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.certificationName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Issuing Body</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.issuingBody}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Validity Period</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.validityPeriod}</p>
                          </div>
                        </>
                      )}
                      {selectedToken.type === 'skill' && (
                        <>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Skill Name</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.skillName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Proficiency Level</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedToken.proficiencyLevel}</p>
                          </div>
                        </>
                      )}
                      {selectedToken.description && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Description</p>
                          <p className="mt-1 text-sm text-gray-900">{selectedToken.description}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-500">Token ID</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedToken.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 