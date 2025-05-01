const API_URL = "http://localhost:3000/api";

export async function getStudents() {
    const res = await fetch(`${API_URL}/students`)
    if(!res.ok) {
        throw new Error(`failed to fetch students`);
    }
    return res.json();
}