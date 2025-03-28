const API_URL = "http://localhost:3000/api";

export async function getTeachers() {
    const response = await fetch(`${API_URL}/teachers`);
    if (!response.ok) {
        throw new Error('failed to fetch teachers');
    }
    return response.json();
}

export async function addTeacher(firstName: string, lastName: string, email: string) {
    const response = await fetch(`${API_URL}/teachers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email }),
    });
    if(!response.ok) {
        throw new Error('Failed to add teacher');
    }
    return response.text();
}