import "./ViewAllTeachers.css";
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


  return (
    <div className="other-container">
      <h1>All Teachers</h1>
      <p>Current teacher roster. Edit information or remove teachers here.</p>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.firstName} {teacher.lastName}: {teacher.email} - <span>Subjects Taught: {Array.isArray(teacher.subjects) ? teacher.subjects.join(", ") : "None"}</span>
            <Link to={`/admin/teacher/edit/${teacher.id}`} style={{ marginLeft: '10px' }}>
              Edit
            </Link>
            <button onClick={() => onDelete(teacher.id)}>Delete teacher</button>
          </li>

        ))}
      </ul>
    </div>
  );
};