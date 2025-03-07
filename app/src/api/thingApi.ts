const API_URL = "http://localhost:3000/api";

export async function getThings() {
  const response = await fetch(`${API_URL}/thing`);
  if (!response.ok) {
    throw new Error("Failed to fetch things");
  }
  return response.json();
}

export async function addThing(name: string) {
  const response = await fetch(`${API_URL}/thing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to add thing");
  }
  return response.text();
}
