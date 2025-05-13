import { useState, useEffect, useRef } from "react";
import { getTeachers } from "../../../api/teachersApi";
import { Subject } from "../../../types/subject";
import { TeacherWithSubjectNames } from "../../../types/teacher";
import { getSubjects } from "../../../api/subjectsApi";
import { addCourse } from "../../../api/coursesApi";

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

        if (!name || !subjectId || teacherIds.length === 0) {
            alert("Please fill in all fields and select at least one teacher.");
            return;
        }

        try {
            await addCourse(name, subjectId, teacherIds);
            alert("✅ Course added!");
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
                <button type="submit">Create Course</button>
            </form>
        </center>
    );
}