-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "profileImage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,
    "degreeName" TEXT,
    "fieldOfStudy" TEXT,
    "grade" TEXT,
    "certificationName" TEXT,
    "issuingBody" TEXT,
    "validityPeriod" TEXT,
    "skillName" TEXT,
    "proficiencyLevel" TEXT,
    "description" TEXT,
    CONSTRAINT "Token_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_walletAddress_key" ON "UserProfile"("walletAddress");
