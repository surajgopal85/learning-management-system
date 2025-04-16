import React, { useState, useEffect } from "react";
import "./ViewAllTeachers.css";
import { getTeachers, deleteTeacher } from "../../../api/teachersApi";
import { Link } from "react-router-dom";


interface Teacher {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  subjects: string[]
}

interface ViewAllTeachersProps {
  teachers: Teacher[];
  onDelete: (id: number) => void;
}

export const ViewAllTeachers: React.FC<ViewAllTeachersProps> = ({ teachers, onDelete }) => {
  // const [teachers, setTeachers] = useState<Teacher[]>([]);

  // useEffect(() => {
  //   async function fetchTeachers() {
  //     try {
  //       const data = await getTeachers();
  //       setTeachers(data);
  //     } catch(error) {
  //       console.error("Error fetching teachers:", error);
  //     }
  //   }

  //   fetchTeachers();
  // }, []);

  // const handleDelete = async (id: number) => {
  //   try {
  //     await deleteTeacher(id);
  //     setTeachers((prev) => prev.filter((t) => t.id !== id));
  //   } catch (err) {
  //     console.error("Delete failed", err);
  //   }
  // };


  return (
    <div className="other-container">
      <h1>All Teachers</h1>
      <p>Current teacher roster. Edit information or remove teachers here.</p>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.firstName} {teacher.lastName}: {teacher.email} - <span>Subjects Taught: {Array.isArray(teacher.subjects) ? teacher.subjects.join(", ") : "None"}</span>
            <Link to={`/editProfile/${teacher.id}`} style={{ marginLeft: '10px' }}>
              Edit
            </Link>
            <button onClick={() => onDelete(teacher.id)}>Delete teacher</button>
          </li>

        ))}
      </ul>
    </div>
  );
};

// export default OtherComponent;
