/*
  Warnings:

  - You are about to drop the column `name` on the `Talisman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Talisman" DROP COLUMN "name",
ADD COLUMN     "slots" INTEGER[];

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillAndLevel" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "talismanId" INTEGER,
    "skillId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkillAndLevel" ADD FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillAndLevel" ADD FOREIGN KEY ("talismanId") REFERENCES "Talisman"("id") ON DELETE SET NULL ON UPDATE CASCADE;
