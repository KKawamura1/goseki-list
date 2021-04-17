export const getSkills = async () => {
  const method = "GET";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch("api/getSkills", {
    method,
    headers,
  });
  const skills = await response.json();
  return skills;
};
