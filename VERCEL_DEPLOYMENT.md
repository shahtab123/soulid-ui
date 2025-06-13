# Vercel Deployment Guide for SoulID

This guide will walk you through deploying your SoulID application to Vercel with Neon PostgreSQL database.

## Prerequisites

1. A GitHub account with your SoulID repository
2. A Vercel account (sign up at [vercel.com](https://vercel.com))
3. A Neon database account (sign up at [neon.tech](https://neon.tech))

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. Verify your `.env` file is in `.gitignore` (it should be)

## Step 2: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and sign in
2. Create a new project
3. Once created, go to the project dashboard
4. Click on "Connection Details"
5. Copy the connection string that looks like:
   ```
   postgresql://user:password@ep-xxx-xxx-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```
6. Keep this connection string handy for the next step

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `soulid-ui` (if your project is in a subdirectory)
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:
   Click "Environment Variables" and add the following:

   ```
   # GitHub OAuth
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-project-name.vercel.app

   # Database
   DATABASE_URL=your_neon_connection_string
   ```

6. Click "Deploy"

## Step 4: Verify Deployment

1. Wait for the deployment to complete
2. Click on the deployment URL provided by Vercel
3. Test the following functionality:
   - GitHub authentication
   - Profile creation
   - Token creation
   - Database operations

## Step 5: Set Up Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click on "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions provided by Vercel

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your `DATABASE_URL` is correct
   - Check if your Neon database is active
   - Ensure the connection string includes `?sslmode=require`

2. **Build Failures**
   - Check the build logs in Vercel
   - Verify all dependencies are in `package.json`
   - Ensure `prisma generate` is running before build

3. **Authentication Issues**
   - Verify GitHub OAuth credentials
   - Check `NEXTAUTH_URL` matches your deployment URL
   - Ensure `NEXTAUTH_SECRET` is set

### Checking Logs

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Deployments"
4. Select the latest deployment
5. Click on "Runtime Logs" or "Build Logs"

## Maintenance

### Updating the Application

1. Make your changes locally
2. Test thoroughly
3. Push to GitHub
4. Vercel will automatically deploy the changes

### Database Migrations

1. Create migrations locally:
```bash
npx prisma migrate dev --name your_migration_name
```

2. Apply migrations to production:
```bash
npx prisma migrate deploy
```

### Monitoring

1. Use Vercel Analytics to monitor:
   - Page views
   - Performance metrics
   - Error rates
2. Use Neon dashboard to monitor:
   - Database performance
   - Connection status
   - Query performance

## Security Considerations

1. Never commit `.env` files
2. Regularly rotate secrets and API keys
3. Keep dependencies updated
4. Monitor for security vulnerabilities
5. Use environment variables for all sensitive data

## Support

If you encounter any issues:
1. Check the [Vercel documentation](https://vercel.com/docs)
2. Check the [Neon documentation](https://neon.tech/docs)
3. Open an issue in your GitHub repository
4. Contact Vercel support if needed 