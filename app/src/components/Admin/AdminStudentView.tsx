import { useEffect, useState } from "react";
import { AddStudent } from "./Students/AddStudent";
import { getStudents } from "../../api/studentsApi";
import { ViewStudentBody } from "../../types/student";
import { ViewAllStudents } from "./Students/ViewAllStudents";

export const AdminStudentView: React.FC = () => {
    const [students, setStudents] = useState<ViewStudentBody[]>([]);

    const fetchStudents = async () => {
        try {
          const data = await getStudents();
          setStudents(data);
        } catch (err) {
          console.error("Failed to fetch students", err);
        }
      };

      useEffect(() => {
        fetchStudents();
      }, []);

    //   const handleDelete = async (id: number) => {
    //     try {
    //       await deleteTeacher(id);
    //       setTeachers((prev) => prev.filter((t) => t.id !== id));
    //     } catch (err) {
    //       console.error("Delete failed", err);
    //     }
    //   };
    

    return (
        <div>
            <AddStudent onAddSuccess={fetchStudents} />
            <ViewAllStudents students={students} />
            {/* <ViewAllTeachers teachers={teachers} onDelete={handleDelete} /> */}
        </div>
    )
}