import React, { useState, useEffect, useRef } from 'react';
import './TeacherProfile.css';
import { addTeacher } from '../../../api/teachersApi';
import { getSubjects } from '../../../api/subjectsApi';
import { AddTeacherForm } from '../../../types/teacher';
import { Subject } from '../../../types/subject';
import { AddTeacherProps } from '../../../types/teacher';

export const AddTeacher: React.FC<AddTeacherProps> = ({ onAddSuccess }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const teacherFormRef = useRef<HTMLFormElement>(null); // 

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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedSubjects = formData.getAll('subjects') as string[];

    const teacherFormData: AddTeacherForm = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      subjects: selectedSubjects // These will be subject IDs now
    };

    const { firstName, lastName, email, subjects } = teacherFormData;
    try {
        await addTeacher(firstName, lastName, email, subjects);
        console.log('teacher added successfully!');
        onAddSuccess();
    } catch(err) {
        console.error('error: ', err);
    }
      teacherFormRef.current?.reset();
  };


    return (
    <center>
        <h1>#MySchool Roster</h1>
        <h2>Add Teacher</h2>
        <div>
            <form ref={teacherFormRef} onSubmit={handleSubmit} className='teacher-form'>
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

