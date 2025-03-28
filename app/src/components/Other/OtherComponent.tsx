import React, { useState, useEffect } from "react";
import "./OtherComponent.css";
import { getTeachers, addTeacher } from "../../api/teachersApi";

interface Teacher {
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

  return (
    <div className="other-container">
      <h1>Other Page</h1>
      <p>This is the other page.</p>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            {teacher.firstName} {teacher.lastName}: {teacher.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherComponent;
