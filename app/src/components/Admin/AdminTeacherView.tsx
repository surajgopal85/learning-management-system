import { useEffect, useState } from "react";
import { AddTeacher } from "./Teachers/AddTeacher";
import { ViewAllTeachers } from "./Teachers/ViewAllTeachers";
import { getTeachers, deleteTeacher } from "../../api/teachersApi";
import { TeacherWithSubjectNames } from "../../types/teacher";

export const AdminTeacherView: React.FC = () => {
    const [teachers, setTeachers] = useState<TeacherWithSubjectNames[]>([]);

    const fetchTeachers = async () => {
        try {
          const data = await getTeachers();
          setTeachers(data);
        } catch (err) {
          console.error("Failed to fetch teachers", err);
        }
      };

      useEffect(() => {
        fetchTeachers();
      }, []);

      const handleDelete = async (id: number) => {
        try {
          await deleteTeacher(id);
          setTeachers((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
          console.error("Delete failed", err);
        }
      };
    

    return (
        <div>
            <AddTeacher onAddSuccess={fetchTeachers} />
            <ViewAllTeachers teachers={teachers} onDelete={handleDelete} />
        </div>
    )
}