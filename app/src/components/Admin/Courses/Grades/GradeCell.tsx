import { useRef, useState } from "react";
import { GradeCellProps } from "../../../../types/grade";

export const GradeCell: React.FC<GradeCellProps> = ({ initialGrade, onSave }) => {
    const [grade, setGrade] = useState(initialGrade); // initially set to 0? 
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // state set, wait 1s to save
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // get the value from the cell, update state
        const val = Number(e.target.value);
        setGrade(val);
        // nodeJS timeout instance has current property
        if(timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            onSave(val);
        }, 1000);
    };

    return (
        <input
            type="number"
            value={grade}
            onChange={handleChange}
            // className="idkyet, style last"
        />
    );
};