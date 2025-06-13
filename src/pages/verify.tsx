import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

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
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerificationResult(null);
    setIsLoading(true);

    try {
      const cleanTokenId = tokenId.trim();
      const response = await fetch(`/api/verify-token?tokenId=${encodeURIComponent(cleanTokenId)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify token');
      }

      setVerificationResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCredentialDetails = () => {
    if (!verificationResult) return null;

    const commonFields = [
      { label: 'Credential Type', value: verificationResult.type },
      { label: 'Title', value: verificationResult.title },
      { label: 'Issuer', value: verificationResult.issuer },
      { label: 'Date Issued', value: new Date(verificationResult.date).toLocaleDateString() },
      { label: 'Owner', value: verificationResult.owner },
      { label: 'Owner\'s Wallet Address', value: verificationResult.walletAddress }
    ];

    // Additional fields based on credential type
    const additionalFields = [];
    if (verificationResult.type === 'degree') {
      additionalFields.push(
        { label: 'Degree Name', value: verificationResult.degreeName },
        { label: 'Field of Study', value: verificationResult.fieldOfStudy },
        { label: 'Grade/CGPA', value: verificationResult.grade },
        { label: 'Additional Details', value: verificationResult.description }
      );
    } else if (verificationResult.type === 'certification') {
      additionalFields.push(
        { label: 'Certification Name', value: verificationResult.certificationName },
        { label: 'Issuing Body', value: verificationResult.issuingBody },
        { label: 'Validity Period', value: verificationResult.validityPeriod },
        { label: 'Additional Details', value: verificationResult.description }
      );
    } else if (verificationResult.type === 'skill') {
      additionalFields.push(
        { label: 'Skill Name', value: verificationResult.skillName },
        { label: 'Proficiency Level', value: verificationResult.proficiencyLevel },
        { label: 'Description', value: verificationResult.description }
      );
    }

    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Result</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            {[...commonFields, ...additionalFields].map((field, index) => (
              <div key={index} className={field.label === 'Owner\'s Wallet Address' ? 'sm:col-span-2' : ''}>
                <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">
                  {field.value || 'Not specified'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Verify Soulbound Token</h1>
            
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700">
                  Token ID
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="tokenId"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter token ID to verify"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify Token'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {renderCredentialDetails()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 