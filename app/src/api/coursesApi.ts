const API_URL = "http://localhost:3000/api";

export async function getCourses() {
    const res = await fetch(`${API_URL}/courses`);
    if(!res.ok) {
        throw new Error(`failed to fetch courses`);
    }
    return res.json();
}

export async function addCourse(name: string, subject_id: number, teacher_ids: number[]) {
    const res = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, subject_id, teacher_ids})
    });
    if(!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        throw new Error('Failed to add course');
    }
    return res.text();
}