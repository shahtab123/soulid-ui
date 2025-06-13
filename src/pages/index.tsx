import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    title: 'Academic Credentials',
    description: 'Mint and verify academic degrees, certifications, and achievements with detailed information.',
    icon: '🎓',
    items: [
      'Degree Name and Field of Study',
      'Grade/CGPA Information',
      'Issuing Institution Details',
      'Additional Academic Achievements'
    ]
  },
  {
    title: 'Professional Certifications',
    description: 'Create verifiable professional certifications with comprehensive details.',
    icon: '📜',
    items: [
      'Certification Name and Level',
      'Issuing Organization',
      'Validity Period',
      'Professional Standards'
    ]
  },
  {
    title: 'Skill Badges',
    description: 'Showcase your skills with detailed proficiency levels and specializations.',
    icon: '🏆',
    items: [
      'Skill Name and Category',
      'Proficiency Level',
      'Specialization Areas',
      'Project Experience'
    ]
  }
];

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Sign up and create your digital identity profile with basic information.',
    icon: '👤'
  },
  {
    number: '02',
    title: 'Mint Credentials',
    description: 'Add your academic, professional, and skill credentials as soulbound tokens.',
    icon: '🎯'
  },
  {
    number: '03',
    title: 'Get AI Suggestions',
    description: 'Receive personalized opportunities and recommendations based on your profile.',
    icon: '🤖'
  },
  {
    number: '04',
    title: 'Share & Verify',
    description: 'Share your credentials and let others verify them instantly.',
    icon: '🔍'
  }
];

const statistics = [
  {
    title: '100%',
    description: 'Verification Rate',
    detail: 'Instant verification of credentials with blockchain technology',
    icon: '🔒'
  },
  {
    title: '50%',
    description: 'Time Saved',
    detail: 'Reduced time in credential verification process',
    icon: '⚡'
  },
  {
    title: '24/7',
    description: 'Accessibility',
    detail: 'Access and verify credentials anytime, anywhere',
    icon: '🌐'
  },
  {
    title: '0%',
    description: 'Fraud Rate',
    detail: 'Immutable records prevent credential fraud',
    icon: '✅'
  }
];

const benefits = [
  {
    title: 'For Educational Institutions',
    items: [
      'Reduce administrative costs by 40%',
      'Eliminate credential fraud',
      'Streamline verification process',
      'Enhance student employability'
    ]
  },
  {
    title: 'For Employers',
    items: [
      'Verify credentials in seconds',
      'Reduce hiring time by 60%',
      'Ensure candidate authenticity',
      'Access verified skill sets'
    ]
  },
  {
    title: 'For Individuals',
    items: [
      'Own your credentials securely',
      'Share verified achievements instantly',
      'Get personalized opportunities',
      'Build trusted digital identity'
    ]
  }
];

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Digital Identity</span>
                  <span className="block text-indigo-600">On the Blockchain</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create, manage, and verify your credentials with soulbound tokens. Get AI-powered suggestions for opportunities that match your profile.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => router.push('/register')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => router.push('/verify')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Verify Credentials
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your credentials
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Create, manage, and verify your credentials with our comprehensive suite of features.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.title} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    <ul className="mt-4 space-y-2">
                      {feature.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="ml-2 text-sm text-gray-500">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Get Started in Four Simple Steps
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="ml-16">
                    <div className="text-sm font-medium text-indigo-600">Step {step.number}</div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Replace Testimonials Section with Statistics Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Why Choose SoulID</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Numbers That Speak
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {statistics.map((stat) => (
                <div key={stat.title} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.title}</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{stat.description}</div>
                  <p className="text-gray-500">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Benefits Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Use SoulID?
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Transform how you manage and verify credentials with our blockchain-powered platform.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{benefit.title}</h3>
                  <ul className="space-y-3">
                    {benefit.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-500">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">Create your digital identity today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => router.push('/register')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 