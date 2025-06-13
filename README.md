# SoulID - Decentralized Identity Platform

SoulID is a decentralized identity platform that allows users to create and manage their digital identity using soulbound tokens. The platform enables users to mint credentials, manage their profile, and receive AI-powered suggestions for opportunities.

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
- SQLite Database
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

1. Clone the repository:
```bash
git clone <repository-url>
cd soulid-ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

### Deploying to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account

3. Click "Add New Project"

4. Select your SoulID repository from the list

5. Before deploying, you need to set up the environment:
   - In your project settings, add the following environment variable:
     ```
     DATABASE_URL=file:./prisma/prod.db
     ```
   - This tells Prisma to use a SQLite database in the prisma directory

6. Click "Deploy"

Vercel will automatically:
- Initialize the database
- Generate the Prisma client
- Build your Next.js application
- Deploy it to their global edge network
- Provide you with a production URL
- Set up automatic deployments for future pushes to your repository

### Important Notes for Local SQLite Database

Since we're using a local SQLite database:
1. The database file will be created in the `/prisma` directory
2. Each deployment will start with a fresh database
3. Data will not persist between deployments
4. For production use, consider migrating to a cloud database service

### Post-Deployment

1. Verify your deployment:
   - Check all pages and features
   - Test the application functionality
   - Monitor the deployment logs in Vercel dashboard
   - Verify database operations are working

2. Set up custom domain (optional):
   - Go to your project settings in Vercel
   - Click "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

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

