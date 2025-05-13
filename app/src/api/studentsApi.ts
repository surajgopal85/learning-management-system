const API_URL = "http://localhost:3000/api";

export async function getStudents() {
    const res = await fetch(`${API_URL}/students`)
    if(!res.ok) {
        throw new Error(`failed to fetch students`);
    }
    return res.json();
}

export async function addStudent(firstName: string, lastName: string, email: string, dateOfBirth: string, grade: number, credits: number) {
    const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, dateOfBirth, grade, credits }),
    });
    if(!response.ok) {
        throw new Error('Failed to add student');
    }
    return response.text();
}