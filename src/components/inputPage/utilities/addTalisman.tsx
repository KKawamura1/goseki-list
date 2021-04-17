export const addTalisman = async (talisman: {
  skill1Id: number;
  level1: number;
  skill2Id: number;
  level2: number;
  slot1: number;
  slot2: number;
  slot3: number;
}) => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  await fetch("api/addTalisman", {
    method,
    headers,
    body: JSON.stringify(talisman),
  });
};
