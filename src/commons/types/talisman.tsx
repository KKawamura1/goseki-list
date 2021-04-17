export type SkillAndLevel = {
  skillId: number;
  skillLevel: number;
};

export type Talisman = {
  id: number;
  skills: [SkillAndLevel, SkillAndLevel];
  slots: [number, number, number];
};
