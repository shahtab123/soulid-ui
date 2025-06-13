import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    profileImage: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        profileImage: e.target.files![0],
      }));
    }
  };

  const generateWalletAddress = () => {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    console.log('Generated wallet address:', address);
    setFormData(prev => ({
      ...prev,
      walletAddress: address,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Submitting form with wallet address:', formData.walletAddress);

      // Create form data for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('walletAddress', formData.walletAddress.trim());
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      // Create profile
      const response = await fetch('/api/create-profile', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        console.log('Error response:', data);
        throw new Error(data.details ? JSON.stringify(data.details) : data.message || 'Failed to create profile');
      }

      const { profile } = await response.json();
      console.log('Created profile:', profile);

      // Log in the user
      login(profile);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Create Your SoulID Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
                Wallet Address
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="walletAddress"
                  id="walletAddress"
                  required
                  value={formData.walletAddress}
                  onChange={handleChange}
                  className="flex-1 block w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0x..."
                />
                <button
                  type="button"
                  onClick={generateWalletAddress}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading || !formData.walletAddress}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Profile...' : 'Create Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 