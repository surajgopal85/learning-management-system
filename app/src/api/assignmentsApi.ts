const API_URL = "http://localhost:3000/api";

export async function addAssignment(course_id: number, category_id: number, creation_date: Date, 
    due_date: Date, name: string, total_points: number) {
        const res = await fetch(`${API_URL}/assignments`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                course_id, 
                category_id, 
                creation_date: creation_date.toISOString(),
                due_date: due_date.toISOString(),
                name,
                total_points
            })
        })
        if(!res.ok) {
            const err = await res.json();
            console.error('Backend error: ', err);
            throw new Error('Failed to add new assignment');
        }
        return res.json();
}

export async function getAssignmentsForCourse(course_id: number) {
    const res = await fetch(`${API_URL}/assignments/${course_id}`);
    if(!res.ok) {
        throw new Error(`Failed to fetch assignments for course with id ${course_id}`);
    } 
    return res.json();
}