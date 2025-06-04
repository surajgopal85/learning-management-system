const API_URL = "http://localhost:3000/api";

export async function addAssignmentCategory(course_id: number, name: string, weight: number) {
    const res = await fetch(`${API_URL}/assignment-categories`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({course_id, name, weight})
    });
    if(!res.ok) {
        const err = await res.json();
        console.error('Backend error: ', err);
        throw new Error('Failed to add new assignment category');
    }
    return res.text();
}

export async function getAssignmentCategoriesForCourse(course_id: number) {
    const res = await fetch(`${API_URL}/assignment-categories/${course_id}`);
    if(!res.ok) {
        throw new Error(`Failed to fetch assignment categories for course with id ${course_id}`);
    } 
    return res.json();
}