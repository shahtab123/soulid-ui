import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tokenId } = req.query;

  if (!tokenId) {
    return res.status(400).json({ message: 'Token ID is required' });
  }

  console.log('Attempting to verify token:', tokenId);

  try {
    // First, check if the token ID format is valid
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(String(tokenId))) {
      console.log('Invalid token ID format:', tokenId);
      return res.status(400).json({ 
        message: 'Invalid token ID format. Token IDs should be in UUID format.',
        details: 'Example format: 123e4567-e89b-12d3-a456-426614174000'
      });
    }

    const token = await prisma.token.findUnique({
      where: {
        id: String(tokenId),
      },
      include: {
        profile: {
          select: {
            name: true,
            walletAddress: true,
          },
        },
      },
    });

    if (!token) {
      console.log('Token not found:', tokenId);
      return res.status(404).json({ 
        message: 'Token not found',
        details: 'This token ID does not exist in our database. Please check the ID and try again.'
      });
    }

    console.log('Token verified successfully:', tokenId);
    return res.status(200).json({
      title: token.title,
      issuer: token.issuer,
      date: token.date,
      owner: token.profile.name,
      walletAddress: token.profile.walletAddress,
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: 'An unexpected error occurred while verifying the token. Please try again later.'
    });
  }
} 