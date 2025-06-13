import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    profileId, 
    type,
    title, 
    issuer, 
    date,
    // Degree fields
    degreeName,
    fieldOfStudy,
    grade,
    // Certification fields
    certificationName,
    issuingBody,
    validityPeriod,
    // Skill fields
    skillName,
    proficiencyLevel,
    // Common field
    description
  } = req.body;

  if (!profileId || !type || !title || !issuer || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if profile exists
    const profile = await prisma.userProfile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Parse date from YYYY-MM-DD format
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Create new token with all fields
    const token = await prisma.token.create({
      data: {
        type,
        title,
        issuer,
        date: parsedDate,
        profileId,
        // Additional fields
        degreeName,
        fieldOfStudy,
        grade,
        certificationName,
        issuingBody,
        validityPeriod,
        skillName,
        proficiencyLevel,
        description
      },
    });

    return res.status(201).json({
      message: 'Token minted successfully',
      token: {
        id: token.id,
        type: token.type,
        title: token.title,
        issuer: token.issuer,
        date: token.date,
        // Additional fields
        degreeName: token.degreeName,
        fieldOfStudy: token.fieldOfStudy,
        grade: token.grade,
        certificationName: token.certificationName,
        issuingBody: token.issuingBody,
        validityPeriod: token.validityPeriod,
        skillName: token.skillName,
        proficiencyLevel: token.proficiencyLevel,
        description: token.description,
        createdAt: token.createdAt,
      },
    });
  } catch (error) {
    console.error('Error minting token:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 