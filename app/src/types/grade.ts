export type GradeCellProps = {
    initialGrade: number;
    onSave: (val: number) => void; // save takes a number and returns nothing
}