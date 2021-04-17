/*
  Warnings:

  - You are about to drop the column `slots` on the `Talisman` table. All the data in the column will be lost.
  - You are about to drop the `SkillAndLevel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[skill1Id]` on the table `Talisman` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[skill2Id]` on the table `Talisman` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SkillAndLevel" DROP CONSTRAINT "SkillAndLevel_skillId_fkey";

-- DropForeignKey
ALTER TABLE "SkillAndLevel" DROP CONSTRAINT "SkillAndLevel_talismanId_fkey";

-- AlterTable
ALTER TABLE "Talisman" DROP COLUMN "slots",
ADD COLUMN     "skill1Id" INTEGER,
ADD COLUMN     "level1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "skill2Id" INTEGER,
ADD COLUMN     "level2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slot1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slot2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slot3" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "SkillAndLevel";

-- CreateIndex
CREATE UNIQUE INDEX "Talisman_skill1Id_unique" ON "Talisman"("skill1Id");

-- CreateIndex
CREATE UNIQUE INDEX "Talisman_skill2Id_unique" ON "Talisman"("skill2Id");

-- AddForeignKey
ALTER TABLE "Talisman" ADD FOREIGN KEY ("skill1Id") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talisman" ADD FOREIGN KEY ("skill2Id") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
