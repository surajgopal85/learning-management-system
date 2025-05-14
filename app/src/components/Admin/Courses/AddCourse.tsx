import { useState, useEffect, useRef } from "react";
import { getTeachers } from "../../../api/teachersApi";
import { getSubjects } from "../../../api/subjectsApi";
import { getStudents } from "../../../api/studentsApi";
import { Subject } from "../../../types/subject";
import { TeacherWithSubjectNames } from "../../../types/teacher";
import { ViewStudentBody } from "../../../types/student";
import { addCourse } from "../../../api/coursesApi";
import { AddCourseProps } from "../../../types/course";

export const AddCourse: React.FC<AddCourseProps> = ({ onAddSuccess }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [teachers, setTeachers] = useState<TeacherWithSubjectNames[]>([]);
    const [students, setStudents] = useState<ViewStudentBody[]>([]);


    const courseFormRef = useRef(null); // reset form to blank!

      useEffect(() => {
        const fetchSubjects = async () => {
            try {
              const subjectsData = await getSubjects();
              setSubjects(subjectsData);
            } catch (error) {
              console.error("Error fetching subjects:", error);
            }
          };
        
          fetchSubjects();
      }, []);

      useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teacherData = await getTeachers();
                setTeachers(teacherData);
            } catch (err) {
                console.error('Error fetching teachers:', err);
            }
        }

        fetchTeachers();
      }, []);

      useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentData = await getStudents();
                setStudents(studentData);
            } catch (err) {
                console.error('Error fetching students', err);
            }
        };

        fetchStudents();
      }, []);

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name")?.toString().trim();
        const subjectId = Number(formData.get("subject"));

        // check off - need at least 1 teacher...
        const teacherCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="teachers"]:checked');
        const teacherIds = Array.from(teacherCheckboxes).map((checkbox) => Number(checkbox.value));

        const studentCheckboxes = form.querySelectorAll<HTMLInputElement>('input[name="students"]:checked');
        const studentIds = Array.from(studentCheckboxes).map((checkbox) => Number(checkbox.value));

        if (!name || !subjectId || teacherIds.length === 0) {
            alert("Please fill in all fields and select at least one teacher.");
            return;
        }

        try {
            await addCourse(name, subjectId, teacherIds, studentIds);
            alert("✅ Course added!");
            onAddSuccess();
            form.reset();
        } catch (error) {
            console.error("❌ Failed to add course:", error);
            alert("Failed to add course.");
        }

      }

    
    return (
        <center>
            <form ref={courseFormRef} onSubmit={handleSubmit} className='teacher-form'>
                <label>
                    Course Name
                    <input type="text" name="name" placeholder='Course Name'>
                    </input>
                </label>

                {/* looked this up, i didn't know about fieldset! */}
                <fieldset>
                    {/* add legend after reading about <fieldset></fieldset> */}
                <legend>Course Subject</legend>
                {subjects.map((subject) => (
                    <label key={subject.id}>
                        <input 
                            type="radio"
                            name="subject"
                            value={subject.id}
                        />
                        {subject.name}
                    </label>
                ))}
                </fieldset>
                <legend>Instructor(s)</legend>
                <fieldset>
                    {/* add legend after reading about <fieldset></fieldset> */}
                <legend>Course Instructor</legend>
                <ul>
                        {teachers.map((teacher) => (
                        <li key={teacher.id}>
                            <label>
                                <input 
                                    type="checkbox"
                                    name="teachers"
                                    value={teacher.id}
                                />
                                <span>{teacher.firstName} {teacher.lastName}, Subjects: Taught: {Array.isArray(teacher.subjects) ? teacher.subjects.join(", ") : "None"}</span>
                            </label>
                        </li>
                        ))}
                </ul>
                </fieldset>
                <fieldset>
                <legend>Add Students</legend>
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                        <label>
                            <input 
                            type="checkbox"
                            name="students"
                            value={student.id}
                            />
                            {student.firstName} {student.lastName}
                        </label>
                        </li>
                    ))}
                </ul>
                </fieldset>
                <button type="submit">Create Course</button>
            </form>
        </center>
    );
}