import { Student } from "./student";

export type Course = {
    id: number;
    name: string;
    subjectId: number;
    teachers: number[];
    students: number[];
    assignmentCategories: AssignmentCategory[];
}

// ex. participation, exams, homework, classwork, etc...
export type AssignmentCategory = {
    id: number;
    name: string;
    weight: number; // this only is 1-100.
}

export type Assignment = {
    id: number;
    courseId: number;
    categoryId: number;
    name: string;
    totalPoints: number;
}

export type Grade = {
    id: number;
    studentId: number;
    assignmentId: number;
    pointsEarned: number;
}