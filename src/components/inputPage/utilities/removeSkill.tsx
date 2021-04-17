export const removeSkill = async (skillId: number) => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  await fetch("api/removeSkill", {
    method,
    headers,
    body: JSON.stringify({ skillId }),
  });
};
