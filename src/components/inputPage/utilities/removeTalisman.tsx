export const removeTalisman = async (talismanId: number) => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  await fetch("api/removeTalisman", {
    method,
    headers,
    body: JSON.stringify({ talismanId }),
  });
};
