import type { NextApiRequest, NextApiResponse } from 'next';
import { addSoulboundToken } from '../../utils/store';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { profileId, title, description, date, issuer, evidence, type } = req.body;
    if (!profileId || !title || !description || !date || !issuer || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Mock Web3 interaction: generate a fake tokenId and image URL
    const tokenId = Math.floor(Math.random() * 1000000).toString();
    const imageUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${tokenId}`;

    const token = addSoulboundToken({
      profileId,
      title,
      description,
      date,
      issuer,
      evidence,
      type,
    });

    return res.status(200).json({ tokenId: token.id, imageUrl, ...token });
  } catch (error) {
    console.error('Error minting SBT:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 