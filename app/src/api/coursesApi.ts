const API_URL = "http://localhost:3000/api";

export async function getCourses() {
    const res = await fetch(`${API_URL}/courses`);
    if(!res.ok) {
        throw new Error(`failed to fetch courses`);
    }
    return res.json();
}

export async function addCourse(name: string, subjectId: number, teachers: number[], students: number[]) {
    
}