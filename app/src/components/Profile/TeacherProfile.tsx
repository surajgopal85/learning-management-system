import React, { useState, useEffect } from 'react';
import './TeacherProfile.css';
import { addTeacher } from './../../api/teachersApi';
import { getSubjects } from '../../api/subjectsApi';
import { AddTeacherForm } from '../../types/teacher';
import { Subject } from '../../types/subject';

interface TeacherForm {
    firstName: string,
    lastName: string,
    email: string,
    subjects: string[]
}

// interface Subject {
//     id: number;
//     name: string;
// }
// const SUBJECTS = ['English', 'History', 'Math', 'Science']

export const TeacherProfile: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

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


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedSubjects = formData.getAll('subjects') as string[];

    const teacherFormData: AddTeacherForm = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      subjects: selectedSubjects // These will be subject IDs now
    };

    console.log("TeacherFormData: ", teacherFormData);

    const { firstName, lastName, email, subjects } = teacherFormData;
    addTeacher(firstName, lastName, email, subjects)
      .then((res) => console.log("Success:", res))
      .catch((err) => console.error("Error:", err));
  };


    return (
    <center>
        <div>
            <form onSubmit={handleSubmit} className='teacher-form'>
                <label>
                    First Name
                    <input type="text" name="firstName" placeholder='First Name'>
                    </input>
                </label>

                <label>
                    Last Name
                    <input type="text" name="lastName" placeholder='Last Name'>
                    </input>
                </label>

                <label>
                    Email
                    <input type="text" name="email" placeholder='Email'>
                    </input>
                </label>

                {/* looked this up, i didn't know about fieldset! */}
                <fieldset>
                    {/* add legend after reading about <fieldset></fieldset> */}
                <legend>Choose Your Subjects</legend>
                {subjects.map((subject) => (
                    <label key={subject.id}>
                        <input 
                            type="checkbox"
                            name="subjects"
                            value={subject.id}
                        />
                        {subject.name}
                    </label>
                ))}
                </fieldset>
                <button type="submit">Make Profile</button>
            </form>
        </div>
    </center>
    );
};

