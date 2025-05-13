import { AdminAllCourseView } from "../../../types/course"

interface ViewAllCoursesProps {
    courses: AdminAllCourseView[]
}

export const ViewAllCourses: React.FC<ViewAllCoursesProps> = ({ courses }) => {

    return (
            <div className="other-container">
      <h1>All Courses</h1>
      <p>Current course offerings. View information here — edit coming soon.</p>
      {courses.map((course) => (
          <li key={course.id}>
            <strong>Department:</strong> {course.subject} <br />
            <strong>Course Name:</strong> {course.name} <br />
            <strong>Teacher(s):</strong>{" "}
            {course.teachers.length > 0
              ? course.teachers.map((t) => t.name).join(", ")
              : "None"}
            <br />
            <strong>Student(s):</strong>{" "}
            {course.students.length > 0
              ? course.students.map((s) => s.name).join(", ")
              : "None"}
          </li>
        ))}
    </div>
    )
}