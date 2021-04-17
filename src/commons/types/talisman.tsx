export type SkillAndLevel = {
  skillId: number;
  skillLevel: number;
};

export type Talisman = {
  id: number;
  skills: [SkillAndLevel, SkillAndLevel];
  slots: [number, number, number];
};

export const talismanToString = (
  skillIdToString: (skillId: number) => string,
  talisman: Talisman
) => {
  const skillToString = (skill: SkillAndLevel) => {
    if (skill.skillLevel === 0) {
      return null;
    }
    return `${skillIdToString(skill.skillId)}${skill.skillLevel}`;
  };
  if (talisman.slots.reduce((left, right) => left + right) > 3) {
    throw Error("Wow!" + talisman.slots);
  }
  const slotFlattened: number[] = talisman.slots
    .map((slotNum, size_minus_one) =>
      [...new Array(slotNum)].fill(size_minus_one + 1)
    )
    .flat();
  const slotResult = slotFlattened
    .concat([...new Array(3 - slotFlattened.length)].fill(0))
    .sort((a, b) => b - a);
  const slotString = slotResult.map((slot) => slot.toString()).join("-");
  return [
    skillToString(talisman.skills[0]),
    skillToString(talisman.skills[1]),
    slotString,
  ]
    .filter((value) => value !== null)
    .join(" ");
};
