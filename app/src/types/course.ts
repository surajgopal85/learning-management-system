import { Student } from "./student";
import { Teacher } from "./teacher";

export type Course = {
    id: number;
    name: string;
    subjectId: number;
    teachers: number[];
    students: number[];
    assignmentCategories: AssignmentCategory[];
}

export type AdminAllCourseView = {
    id: number;
    name: string;
    subject_id: number;
    subject: string;
    teachers: {
        id: number;
        name: string;
    }[];
    students: {
        id: number;
        name: string;
    }[];
    assignmentCategories?: AssignmentCategory[];
}

export type AddCourseProps = {
    onAddSuccess: () => Promise<void>;
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