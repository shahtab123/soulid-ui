import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt, profile } = req.body;

  if (!prompt || !profile) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Here you would typically integrate with an AI service
    // For now, we'll return mock suggestions based on the profile and prompt
    const suggestions = [
      {
        id: 1,
        title: 'Google Cloud Certification Program',
        company: 'Google Cloud',
        link: 'https://cloud.google.com/certification',
        type: 'certification',
        matchScore: 0.95,
        description: 'Get certified in Google Cloud technologies with free training resources and exam vouchers.'
      },
      {
        id: 2,
        title: 'Microsoft Learn Student Ambassador Program',
        company: 'Microsoft',
        link: 'https://studentambassadors.microsoft.com/',
        type: 'program',
        matchScore: 0.90,
        description: 'Join a global community of student leaders and get access to Microsoft resources and opportunities.'
      },
      {
        id: 3,
        title: 'GitHub Student Developer Pack',
        company: 'GitHub',
        link: 'https://education.github.com/pack',
        type: 'resource',
        matchScore: 0.88,
        description: 'Get free access to developer tools and services worth over $200.'
      },
      {
        id: 4,
        title: 'AWS Educate Program',
        company: 'Amazon Web Services',
        link: 'https://aws.amazon.com/education/awseducate/',
        type: 'program',
        matchScore: 0.85,
        description: 'Access AWS cloud services, training, and career resources for students.'
      },
      {
        id: 5,
        title: 'Google Summer of Code',
        company: 'Google',
        link: 'https://summerofcode.withgoogle.com/',
        type: 'internship',
        matchScore: 0.82,
        description: 'Work on open source projects and get paid during your summer break.'
      },
      {
        id: 6,
        title: 'MLH Fellowship',
        company: 'Major League Hacking',
        link: 'https://fellowship.mlh.io/',
        type: 'fellowship',
        matchScore: 0.80,
        description: '12-week internship alternative for aspiring software engineers.'
      },
      {
        id: 7,
        title: 'Hacktoberfest',
        company: 'DigitalOcean',
        link: 'https://hacktoberfest.com/',
        type: 'event',
        matchScore: 0.78,
        description: 'Contribute to open source and earn limited edition swag.'
      },
      {
        id: 8,
        title: 'Google Developer Student Clubs',
        company: 'Google',
        link: 'https://developers.google.com/community/gdsc',
        type: 'community',
        matchScore: 0.75,
        description: 'Join a community of student developers and learn from peers.'
      },
      {
        id: 9,
        title: 'Microsoft Learn',
        company: 'Microsoft',
        link: 'https://docs.microsoft.com/learn/',
        type: 'learning',
        matchScore: 0.72,
        description: 'Free interactive learning paths for Microsoft technologies.'
      },
      {
        id: 10,
        title: 'AWS Cloud Quest',
        company: 'Amazon Web Services',
        link: 'https://aws.amazon.com/training/learn-about-cloud/',
        type: 'learning',
        matchScore: 0.70,
        description: 'Interactive role-based learning game for AWS cloud skills.'
      }
    ];

    return res.status(200).json({
      message: 'Suggestions generated successfully',
      suggestions,
    });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 