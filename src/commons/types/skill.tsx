export type Skill = {
  id: number;
  name: string;
  yomi: string;
  size: number;
};

export const skillToString = (skill: Skill) => {
  const left = skill.name;
  const right = skill.size === 4 ? "" : ` (${skill.size})`;
  return left + right;
};
