import Navbar from '../components/Navbar';

const faqs = [
  {
    question: 'What is SoulID?',
    answer: 'SoulID is a platform that helps you manage and verify your credentials using blockchain technology. It allows you to create soulbound tokens for your achievements, skills, and qualifications.',
  },
  {
    question: 'How do I create my profile?',
    answer: 'Click on the "Get Started" button on the homepage and follow the registration process. You\'ll need to provide basic information and can optionally upload identification documents.',
  },
  {
    question: 'What are soulbound tokens?',
    answer: 'Soulbound tokens are non-transferable digital credentials that represent your achievements, skills, and qualifications. They are permanently linked to your identity and cannot be sold or transferred.',
  },
  {
    question: 'How do I mint a credential?',
    answer: 'Go to the "Mint Credential" page, select the type of credential you want to create, fill in the required information, and submit. You can also upload supporting evidence if needed.',
  },
  {
    question: 'How does the AI help feature work?',
    answer: 'The AI help feature analyzes your profile and credentials to provide personalized suggestions for opportunities, including jobs, grants, and resources that match your skills and qualifications.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use blockchain technology to ensure the security and immutability of your credentials. Your personal information is encrypted and stored securely.',
  },
  {
    question: 'Can I delete my credentials?',
    answer: 'While you cannot delete soulbound tokens once they are minted (as they are permanent records), you can hide them from your public profile if needed.',
  },
  {
    question: 'How do I verify someone\'s credentials?',
    answer: 'You can verify credentials by entering the credential ID or scanning the QR code provided by the credential holder. The system will show you the verified information.',
  },
  {
    question: 'What types of credentials can I mint?',
    answer: 'You can mint various types of credentials including academic degrees, professional certifications, skills badges, work experience, volunteer work, and more.',
  },
  {
    question: 'How do I get support?',
    answer: 'You can contact our support team through the contact form below or email us at support@soulid.com. We typically respond within 24 hours.',
  },
];

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Help Center
          </h1>

          {/* FAQs Section */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-sm text-gray-500">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="mt-12 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Contact Support</h3>
              <div className="mt-5">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 