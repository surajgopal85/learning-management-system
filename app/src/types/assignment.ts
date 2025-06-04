export type Assignment = {
    name: string;
    points: number;
    category: string;
}

export interface CourseAssignment {
  id: number;
  course_id: number;
  name: string;
  points: number;
  due_date: string; // ISO format (e.g., '2025-05-16')
  category_id: number;
}

export interface AssignmentCategory {
  id: number;
  course_id: number;
  name: string;
  weight: number;
}
