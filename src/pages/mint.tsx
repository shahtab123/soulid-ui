import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Credential types with their specific fields
const credentialTypes = [
  { 
    id: 'degree', 
    title: 'Academic Degree', 
    icon: '🎓',
    fields: [
      { name: 'degreeName', label: 'Degree Name', placeholder: 'e.g., Bachelor of Science in Computer Science', required: true },
      { name: 'fieldOfStudy', label: 'Field of Study', placeholder: 'e.g., Computer Science', required: true },
      { name: 'grade', label: 'Grade/CGPA', placeholder: 'e.g., 3.8', required: true },
      { name: 'description', label: 'Additional Details', placeholder: 'e.g., Dean\'s List, Specialization in AI' }
    ]
  },
  { 
    id: 'certification', 
    title: 'Professional Certification', 
    icon: '📜',
    fields: [
      { name: 'certificationName', label: 'Certification Name', placeholder: 'e.g., AWS Certified Solutions Architect', required: true },
      { name: 'issuingBody', label: 'Issuing Body', placeholder: 'e.g., Amazon Web Services', required: true },
      { name: 'validityPeriod', label: 'Validity Period', placeholder: 'e.g., 2 years', required: true },
      { name: 'description', label: 'Additional Details', placeholder: 'e.g., Level: Associate' }
    ]
  },
  { 
    id: 'skill', 
    title: 'Skill Badge', 
    icon: '🏆',
    fields: [
      { name: 'skillName', label: 'Skill Name', placeholder: 'e.g., Python Programming', required: true },
      { name: 'proficiencyLevel', label: 'Proficiency Level', placeholder: 'e.g., Advanced', required: true },
      { name: 'description', label: 'Description', placeholder: 'e.g., Specialized in Data Analysis and Machine Learning' }
    ]
  }
];

export default function Mint() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    issuer: '',
    date: '',
    // Additional fields
    degreeName: '',
    fieldOfStudy: '',
    grade: '',
    certificationName: '',
    issuingBody: '',
    validityPeriod: '',
    skillName: '',
    proficiencyLevel: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getSelectedTypeFields = () => {
    const selectedType = credentialTypes.find(type => type.id === formData.type);
    return selectedType?.fields || [];
  };

  const validateForm = () => {
    if (!formData.type) {
      setError('Please select a credential type');
      return false;
    }

    const selectedType = credentialTypes.find(type => type.id === formData.type);
    if (!selectedType) return false;

    const requiredFields = selectedType.fields.filter(field => field.required);
    for (const field of requiredFields) {
      if (!formData[field.name as keyof typeof formData]) {
        setError(`Please fill in the ${field.label} field`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/mint-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId: user?.id,
          ...formData,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to mint token');
      }

      router.push('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    router.push('/register');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mint New Credential</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Credential Type *
              </label>
              <select
                name="type"
                id="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a type</option>
                {credentialTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.title}
                  </option>
                ))}
              </select>
            </div>

            {formData.type && (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Credential Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., Bachelor of Science"
                  />
                </div>

                <div>
                  <label htmlFor="issuer" className="block text-sm font-medium text-gray-700">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    name="issuer"
                    id="issuer"
                    required
                    value={formData.issuer}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., University of Technology"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date Issued *
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Dynamic fields based on credential type */}
                {getSelectedTypeFields().map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label} {field.required && '*'}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      required={field.required}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </>
            )}

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
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Minting...' : 'Mint Credential'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 