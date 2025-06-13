import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

interface Token {
  id: string;
  title: string;
  issuer: string;
  date: string;
  createdAt: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, email } = req.query;

  if (!id && !email) {
    return res.status(400).json({ message: 'User ID or email is required' });
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: id ? { id: String(id) } : { email: String(email) },
      include: {
        tokens: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({
      profile: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        walletAddress: profile.walletAddress.toLowerCase().trim(),
        profileImage: profile.profileImage,
        createdAt: profile.createdAt,
      },
      tokens: profile.tokens.map((token: Token) => ({
        id: token.id,
        title: token.title,
        issuer: token.issuer,
        date: token.date,
        createdAt: token.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 