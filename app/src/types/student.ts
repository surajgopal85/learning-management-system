export type Student = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    grade: number;
    credits: number;
    courses: number[];
}

export type AddStudentForm = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    grade: number;
    credits: number;
}

export type ViewStudentBody = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    grade: number;
    credits: number;
}

export type AddStudentProps = {
    onAddSuccess: () => Promise<void>;
};