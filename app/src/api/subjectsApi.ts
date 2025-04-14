const API_URL = "http://localhost:3000/api";

export async function getSubjects() {
    const res = await fetch(`${API_URL}/subjects`);
    if(!res.ok) {
        throw new Error(`failed to fetch subjects`);
    }
    return res.json();
}