import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

interface VerificationResult {
  type: string;
  title: string;
  issuer: string;
  date: string;
  owner: string;
  walletAddress: string;
  description?: string;
  // Degree fields
  degreeName?: string;
  fieldOfStudy?: string;
  grade?: string;
  // Certification fields
  certificationName?: string;
  issuingBody?: string;
  validityPeriod?: string;
  // Skill fields
  skillName?: string;
  proficiencyLevel?: string;
}

const verificationFeatures = [
  {
    title: 'Instant Verification',
    description: 'Verify the authenticity of any credential instantly using its unique token ID.',
    icon: '⚡',
  },
  {
    title: 'Blockchain Security',
    description: 'All credentials are secured on the blockchain, ensuring they cannot be tampered with.',
    icon: '🔒',
  },
  {
    title: 'Detailed Information',
    description: 'View comprehensive details about the credential, including issuer, date, and owner.',
    icon: '📋',
  },
  {
    title: 'Public Verification',
    description: 'Anyone can verify credentials without needing to log in or create an account.',
    icon: '🌐',
  },
];

export default function Verify() {
  const router = useRouter();
  const [tokenId, setTokenId] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/verify-token?tokenId=${tokenId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify token');
      }

      setResult(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeSpecificFields = (result: VerificationResult) => {
    switch (result.type) {
      case 'degree':
        return (
          <>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Degree Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.degreeName}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Field of Study</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.fieldOfStudy}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Grade/CGPA</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.grade}</dd>
            </div>
          </>
        );
      case 'certification':
        return (
          <>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Certification Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.certificationName}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Issuing Body</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.issuingBody}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Validity Period</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.validityPeriod}</dd>
            </div>
          </>
        );
      case 'skill':
        return (
          <>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Skill Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.skillName}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-sm font-medium text-gray-500">Proficiency Level</dt>
              <dd className="mt-1 text-sm text-gray-900">{result.proficiencyLevel}</dd>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Verify Credential</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700">
                Token ID
              </label>
              <input
                type="text"
                name="tokenId"
                id="tokenId"
                required
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter token ID"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Verification Result</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Credential details</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Credential Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 capitalize">{result.type}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.title}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Issuer</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.issuer}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Date Issued</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(result.date)}</dd>
                  </div>
                  {result.description && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900">{result.description}</dd>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Owner</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.owner}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Owner's Wallet Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.walletAddress}</dd>
                  </div>
                  {getTypeSpecificFields(result)}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
} 