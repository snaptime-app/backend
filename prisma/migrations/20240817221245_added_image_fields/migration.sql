/*
  Warnings:

  - Added the required column `correctImage` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attemptedImage` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "correctImage" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Challenge_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Challenge_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Challenge" ("authorId", "createdAt", "groupId", "id", "updatedAt") SELECT "authorId", "createdAt", "groupId", "id", "updatedAt" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
CREATE UNIQUE INDEX "Challenge_correctImage_key" ON "Challenge"("correctImage");
CREATE UNIQUE INDEX "Challenge_groupId_key" ON "Challenge"("groupId");
CREATE UNIQUE INDEX "Challenge_authorId_key" ON "Challenge"("authorId");
CREATE TABLE "new_Submission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isCorrect" BOOLEAN NOT NULL,
    "attemptedImage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "challengeId" INTEGER NOT NULL,
    "creatorId" INTEGER NOT NULL,
    CONSTRAINT "Submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Submission_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Submission" ("challengeId", "createdAt", "creatorId", "id", "isCorrect") SELECT "challengeId", "createdAt", "creatorId", "id", "isCorrect" FROM "Submission";
DROP TABLE "Submission";
ALTER TABLE "new_Submission" RENAME TO "Submission";
CREATE UNIQUE INDEX "Submission_attemptedImage_key" ON "Submission"("attemptedImage");
CREATE UNIQUE INDEX "Submission_challengeId_key" ON "Submission"("challengeId");
CREATE UNIQUE INDEX "Submission_creatorId_key" ON "Submission"("creatorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
