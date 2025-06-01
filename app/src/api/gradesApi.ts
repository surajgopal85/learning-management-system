const API_URL = "http://localhost:3000/api";

export async function createGrade(studentId: number, assignmentId: number, pointsEarned: number) {
    const res = await fetch(`${API_URL}/grades`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId, assignmentId, pointsEarned })
    })
    if(!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        throw new Error('Failed to add grade');
    }
    return res.text();
}

export async function updateGrade(id: number, pointsEarned: number) {
    const res = await fetch(`${API_URL}/grades/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pointsEarned })
    })
    if(!res.ok) {
        const err = await res.json();
        console.error('backend error: ', err);
        throw new Error('Failed to update grade');
    }
    return res.json();
}