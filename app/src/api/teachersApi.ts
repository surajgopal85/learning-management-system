const API_URL = "http://localhost:3000/api";

export async function getTeachers() {
    const response = await fetch(`${API_URL}/teachers`);
    if (!response.ok) {
        throw new Error('failed to fetch teachers');
    }
    return response.json();
}

export async function getTeacher(id: number) {
    const res = await fetch(`${API_URL}/teachers/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch teacher");
    }
    return res.json();
  }

export async function addTeacher(firstName: string, lastName: string, email: string, subjects: string[]) {
    const response = await fetch(`${API_URL}/teachers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, subjects }),
    });
    if(!response.ok) {
        throw new Error('Failed to add teacher');
    }
    return response.text();
}

export async function deleteTeacher(id: number) {
    const response = await fetch(`${API_URL}/teachers/${id}`, {
        method: "DELETE",
    });
    if(!response.ok) {
        throw new Error('Failed to delete teacher');
    }
    return response.text();
}

// teachersApi.ts
export const updateTeacher = async (teacherId: number, data: {
    firstName: string;
    lastName: string;
    email: string;
    subjects: number[]; // ← changed from string[]
  }) => {
    const res = await fetch(`/api/teachers/${teacherId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error('Failed to update teacher');
    }
  
    return res.json();
  };
  