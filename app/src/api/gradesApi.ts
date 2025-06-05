const API_URL = "http://localhost:3000/api";

// we'll always be scoping grades fetch to a single course
export async function getGradesForCourse(courseId: number) {
  const res = await fetch(`${API_URL}/grades/${courseId}`);
  if (!res.ok) throw new Error("Failed to fetch grades");

  return res.json();
}

export async function createGrade(studentId: number, assignmentId: number) {
    const res = await fetch(`${API_URL}/grades`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId, assignmentId })
    })
    if(!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        throw new Error('Failed to add grade');
    }
    return await res.json();
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