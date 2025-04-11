import React, { useState, useEffect } from "react";
import "./OtherComponent.css";
import { getTeachers, addTeacher, deleteTeacher } from "../../api/teachersApi";


interface Teacher {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
}

const OtherComponent: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch(error) {
        console.error("Error fetching teachers:", error);
      }
    }

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
    <div className="other-container">
      <h1>Other Page</h1>
      <p>This is the other page.</p>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.firstName} {teacher.lastName}: {teacher.email}
            <button onClick={() => handleDelete(teacher.id)}>Delete teacher</button>
          </li>

        ))}
      </ul>
    </div>
  );
};

export default OtherComponent;
