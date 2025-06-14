# SoulID - Decentralized Identity Platform

SoulID is a decentralized identity platform that allows users to create and manage their digital identity using soulbound tokens. The platform enables users to mint credentials, manage their profile, and receive AI-powered suggestions for opportunities.

## Project Links
- [Demo Video](https://www.youtube.com/watch?v=h2w9CM2HYJU)
- [Devpost Submission](https://devpost.com/software/soulid-web3-identity-and-ai-help-for-the-undocumented)

## Features

### Identity Management
- User authentication and profile management
- Secure wallet integration
- Profile customization and verification
- Privacy-focused data handling

### Soulbound Tokens
- Mint various types of credentials:
  - Academic degrees and certifications
  - Professional certifications
  - Skill badges
  - Work experience
  - Volunteer work
  - Language proficiency
  - Project completion
  - Research publications
  - Awards and recognition
  - Grants and funding
  - Patents
  - Professional memberships
- Verifiable credentials on blockchain
- Immutable and non-transferable tokens
- Detailed credential information storage

### AI-Powered Suggestions
- Personalized opportunity recommendations
- Real-time matching with user profile
- Various opportunity types:
  - Certification programs
  - Student programs
  - Developer resources
  - Internships
  - Fellowships
  - Community programs
  - Learning resources
- Match score indicators
- Direct links to opportunities
- Detailed opportunity descriptions

### Verification System
- Instant credential verification
- Blockchain-based security
- Public verification access
- Detailed verification information

### User Interface
- Modern and responsive design
- Intuitive navigation
- Real-time updates
- Interactive components
- Mobile-friendly layout

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Hooks
- Context API

### Backend
- Node.js
- Prisma ORM
- Neon Database
- RESTful API

### Authentication
- Web3 Authentication
- JWT Tokens
- Secure Session Management

### Blockchain Integration
- Ethereum Network
- Smart Contracts
- Web3.js

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub Account
- Neon Database Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/soulid-ui.git
cd soulid-ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Neon Database
DATABASE_URL="postgresql://user:password@ep-sweet-queen-a8yljdfv-pooler.eastus2.aws.neon.tech/neondb?sslmode=require"

# Vercel (for production)
VERCEL_URL=your_vercel_url
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
soulid-ui/
├── prisma/
│   └── schema.prisma      # Database schema
├── public/
│   └── uploads/          # User uploaded files
├── src/
│   ├── components/       # React components
│   ├── context/         # React context providers
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Next.js pages and API routes
│   └── styles/          # Global styles
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/create-profile` - Create a new user profile
- `GET /api/get-profile` - Get user profile and tokens
- `POST /api/update-profile` - Update user profile

### Tokens
- `POST /api/mint-token` - Mint a new soulbound token
- `GET /api/tokens` - Get user's tokens
- `GET /api/verify-token` - Verify a token's authenticity

### AI Suggestions
- `POST /api/ai-suggestions` - Get AI-powered suggestions based on user profile
- `GET /api/suggestion-types` - Get available suggestion types
- `POST /api/feedback` - Submit feedback on suggestions

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the following environment variables in Vercel:
   - `GITHUB_ID`
   - `GITHUB_SECRET`
   - `NEXTAUTH_SECRET`
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (Vercel will set this automatically)

### Neon Database Setup

1. Create a new project in Neon
2. Get your connection string from the Neon dashboard
3. Add the connection string to your environment variables as `DATABASE_URL`
4. The database schema will be automatically created when you deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email cloudstack6@gmail.com

