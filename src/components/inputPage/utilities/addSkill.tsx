export const addSkill = async (name: string, yomi: string, size: number) => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  await fetch("api/addSkill", {
    method,
    headers,
    body: JSON.stringify({ name, yomi, size }),
  });
};
