export const addTalisman = async (name: string) => {
  const method = "POST";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  console.log("Hoggeeeeee");
  await fetch("api/addTalisman", {
    method,
    headers,
    body: JSON.stringify({ name }),
  });
};
