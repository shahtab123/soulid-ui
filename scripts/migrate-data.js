const { PrismaClient } = require('@prisma/client');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const sqliteDb = new sqlite3.Database(path.join(__dirname, '../prisma/dev.db'));
const prisma = new PrismaClient();

async function migrateData() {
  try {
    // Migrate UserProfiles
    const userProfiles = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM UserProfile', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    console.log(`Found ${userProfiles.length} user profiles to migrate`);

    for (const profile of userProfiles) {
      await prisma.userProfile.create({
        data: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          walletAddress: profile.walletAddress,
          profileImage: profile.profileImage,
          createdAt: new Date(profile.createdAt),
          updatedAt: new Date(profile.updatedAt),
        },
      });
    }

    // Migrate Tokens
    const tokens = await new Promise((resolve, reject) => {
      sqliteDb.all('SELECT * FROM Token', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    console.log(`Found ${tokens.length} tokens to migrate`);

    for (const token of tokens) {
      await prisma.token.create({
        data: {
          id: token.id,
          type: token.type,
          title: token.title,
          issuer: token.issuer,
          date: new Date(token.date),
          createdAt: new Date(token.createdAt),
          profileId: token.profileId,
          degreeName: token.degreeName,
          fieldOfStudy: token.fieldOfStudy,
          grade: token.grade,
          certificationName: token.certificationName,
          issuingBody: token.issuingBody,
          validityPeriod: token.validityPeriod,
          skillName: token.skillName,
          proficiencyLevel: token.proficiencyLevel,
          description: token.description,
        },
      });
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
    sqliteDb.close();
  }
}

migrateData(); 