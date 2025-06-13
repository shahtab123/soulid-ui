const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

async function initDb() {
  // Create the database directory if it doesn't exist
  const dbDir = path.join(process.cwd(), 'prisma');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Initialize Prisma
  const prisma = new PrismaClient();

  try {
    // Test the connection
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the initialization
initDb().catch(console.error); 