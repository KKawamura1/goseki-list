import { Skill } from "./types/skill";
import { Talisman } from "./types/talisman";

export const talismanDomination = (
  skills: Skill[],
  dominator: Talisman,
  servant: Talisman
) => {
  // まずは dominator の skill で servant の skill を説明することを試みる
  // dominator の skill は、 servant の skill と完全一致しない限り無意味
  let servantSkillLevel1 =
    servant.skills[0].skillId == null ? 0 : servant.skills[0].skillLevel;
  let servantSkillLevel2 =
    servant.skills[1].skillId == null ? 0 : servant.skills[1].skillLevel;
  for (let i = 0; i < 2; i += 1) {
    if (dominator.skills[i].skillId != null) {
      if (dominator.skills[i].skillId === servant.skills[0].skillId) {
        servantSkillLevel1 -= dominator.skills[i].skillLevel;
      } else if (dominator.skills[i].skillId === servant.skills[1].skillId) {
        servantSkillLevel2 -= dominator.skills[i].skillLevel;
      }
    }
  }
  // 残った servant の skill は slot で説明するしかない
  let servantSlots: [number, number, number] = [...servant.slots];
  if (servantSkillLevel1 >= 1) {
    const servantSkill1 = skills.find(
      (skill) => skill.id === servant.skills[0].skillId
    );
    if (servantSkill1 != null) {
      if (servantSkill1.size === 4) {
        // 説明不可能
        return false;
      }
      servantSlots[servantSkill1.size - 1] += servantSkillLevel1;
    }
  }
  if (servantSkillLevel2 >= 1) {
    const servantSkill2 = skills.find((skill) => {
      skill.id === servant.skills[1].skillId;
    });
    if (servantSkill2 != null) {
      if (servantSkill2.size === 4) {
        // 説明不可能
        return false;
      }
      servantSlots[servantSkill2.size - 1] += servantSkillLevel2;
    }
  }
  // Slot の説明を試みる
  // 大きな slot から順に試し、余った分はより小さな slot の説明に用いる
  let remains = 0;
  for (let i = 2; i >= 0; i -= 1) {
    remains += dominator.slots[i];
    if (remains < servantSlots[i]) {
      return false;
    }
    remains -= servantSlots[i];
  }
  // ここまで残っていれば、 dominated
  return true;
};
