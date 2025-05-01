import { useState, useEffect, useRef } from "react";
import { getTeachers } from "../../../api/teachersApi";
import { Subject } from "../../../types/subject";
import { Teacher, TeacherWithSubjectNames } from "../../../types/teacher";
import { getSubjects } from "../../../api/subjectsApi";

export const AddCourse: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [teachers, setTeachers] = useState<TeacherWithSubjectNames[]>([]);


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
      })

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('hell0, course form here!')
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
                            name="subjects"
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
                        <li>
                            <label key={teacher.id}>
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
                <button type="submit">Create Course</button>
            </form>
        </center>
    );
}

{/* <li key={teacher.id}>{teacher.firstName} {teacher.lastName}, Subjects: Taught: {Array.isArray(teacher.subjects) ? teacher.subjects.join(", ") : "None"}</li> */}