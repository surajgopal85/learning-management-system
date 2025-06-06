// import { AddStudentForm } from "../../../types/student";
import "./ViewAllStudents.css";
import { Link } from "react-router-dom";
import { ViewStudentBody } from "../../../types/student";

interface ViewAllStudentsProps {
  students: ViewStudentBody[];
//   onDelete: (id: number) => void;
}

export const ViewAllStudents: React.FC<ViewAllStudentsProps> = ({ students }) => {


  return (
    <div className="other-container">
      <h1>All Students</h1>
      <p>Current student roster. Edit information or remove students here.</p>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName}: {student.email} Grade: {student.grade}
            <Link to={`/admin/student/edit/${student.id}`} style={{ marginLeft: '10px' }}>
              Edit
            </Link>
            {/* <button onClick={() => onDelete(teacher.id)}>Delete teacher</button> */}
          </li>

        ))}
      </ul>
    </div>
  );
};