import { Student } from "./student";

export type Course = {
    name: string;
    department: string;
    students: Student[];
    assignmentCategories: string[];
}