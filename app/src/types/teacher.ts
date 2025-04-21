import { StringLiteral } from "typescript";

export type Teacher = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

// ADD FORM
export type AddTeacherForm = {
    firstName: string;
    lastName: string;
    email: string;
    subjects: string[];
}

// EDIT CASES
// Represents the data used when editing a teacher
export type TeacherEditPayload = Teacher & {
    subjects: number[]; // ID references to subject list
};

// Represents the teacher as it comes back from the API
export type TeacherWithSubjectIds = Teacher & {
    subjects: number[]; // same shape used in EditProfile.tsx
};  

export type TeacherWithSubjectNames = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    subjects: string[]; // e.g., ['Math', 'Biology']
};

// on add success, we get a promise
export type AddTeacherProps = {
    onAddSuccess: () => Promise<void>;
};

export type EditTeacherProfileProps = {
    teacherId: number;
}