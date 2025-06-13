import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Ethereum address validation
function isValidEthereumAddress(address: string): boolean {
  console.log('Validating address:', address);
  console.log('Address length:', address.length);
  console.log('Starts with 0x:', address.startsWith('0x'));
  console.log('Hex characters only:', /^0x[a-fA-F0-9]{40}$/.test(address));
  
  // Check if address starts with 0x and has 42 characters (0x + 40 hex characters)
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return false;
  }
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({ multiples: true });
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    console.log('Received fields:', fields);

    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const walletAddress = Array.isArray(fields.walletAddress) ? fields.walletAddress[0] : fields.walletAddress;

    console.log('Processed fields:', {
      name,
      email,
      walletAddress,
      walletAddressLength: walletAddress?.length,
      walletAddressType: typeof walletAddress
    });

    if (!name || !email || !walletAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate wallet address format
    if (!isValidEthereumAddress(walletAddress)) {
      console.log('Wallet address validation failed:', {
        address: walletAddress,
        length: walletAddress.length,
        startsWith0x: walletAddress.startsWith('0x'),
        hexOnly: /^0x[a-fA-F0-9]{40}$/.test(walletAddress)
      });
      return res.status(400).json({ 
        message: 'Invalid Ethereum address format',
        details: {
          address: walletAddress,
          length: walletAddress.length,
          startsWith0x: walletAddress.startsWith('0x'),
          hexOnly: /^0x[a-fA-F0-9]{40}$/.test(walletAddress)
        }
      });
    }

    // Check if user with email or wallet address already exists
    const existingUser = await prisma.userProfile.findFirst({
      where: {
        OR: [
          { email },
          { walletAddress },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or wallet address already exists' });
    }

    let profileImagePath = null;
    if (files.profileImage) {
      const file = Array.isArray(files.profileImage) ? files.profileImage[0] : files.profileImage;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${file.originalFilename}`;
      const filePath = path.join(uploadDir, fileName);
      
      // Copy file to uploads directory
      fs.copyFileSync(file.filepath, filePath);
      profileImagePath = `/uploads/${fileName}`;
    }

    // Create new user profile
    const normalizedWalletAddress = walletAddress.toLowerCase().trim();
    console.log('Creating profile with wallet address:', normalizedWalletAddress);

    const profile = await prisma.userProfile.create({
      data: {
        name,
        email,
        walletAddress: normalizedWalletAddress,
        profileImage: profileImagePath,
      },
    });

    console.log('Created profile:', profile);

    return res.status(201).json({
      message: 'Profile created successfully',
      profile: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        walletAddress: profile.walletAddress,
        profileImage: profile.profileImage,
        createdAt: profile.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 