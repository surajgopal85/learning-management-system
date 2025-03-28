import React, { useState } from 'react';
import './TeacherProfile.css';
import { addTeacher } from './../../api/teachersApi';

interface TeacherForm {
    firstName: string,
    lastName: string,
    email: string,
    subjects: string[]
}

const SUBJECTS = ['English', 'History', 'Math', 'Science']

export const TeacherProfile: React.FC = () => {
    // useState for TeacherForm object => init empty
    const [teacherFormData, setTeacherFormData] = useState<TeacherForm>({
        firstName: '',
        lastName: '',
        email: '',
        subjects: []
    })

    // handle any change in form data
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherFormData({...teacherFormData, [e.target.name]: e.target.value})
    }
    // specifically handle subject multi-select change
    // set subjects to any subject that is added and was not previously in subjects[]
    const handleSubjectChange = (subject: string) => {
        setTeacherFormData((prevState) => ({
            ...prevState, 
            subjects: prevState.subjects.includes(subject) ? 
            prevState.subjects.filter((curr) => curr !== subject) :
            [...prevState.subjects, subject]
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("TeacherFormData: ", teacherFormData);
        const { firstName, lastName, email } = teacherFormData;
        addTeacher(firstName, lastName, email);
    }


    return (
    <center>
        <div>
            <form onSubmit={handleSubmit} className='teacher-form'>
                <label>
                    First Name
                    <input type="text" name="firstName" value={teacherFormData.firstName} placeholder='First Name' onChange={handleFormChange}>
                    </input>
                </label>

                <label>
                    Last Name
                    <input type="text" name="lastName" value={teacherFormData.lastName} placeholder='Last Name' onChange={handleFormChange}>
                    </input>
                </label>

                <label>
                    Email
                    <input type="text" name="email" value={teacherFormData.email} placeholder='Email' onChange={handleFormChange}>
                    </input>
                </label>

                {/* looked this up, i didn't know about fieldset! */}
                <fieldset>
                    {/* add legend after reading about <fieldset></fieldset> */}
                <legend>Choose Your Subjects</legend>
                {SUBJECTS.map((subject) => (
                    <label key={subject}>
                        <input 
                            type="checkbox"
                            value={subject}
                            checked={teacherFormData.subjects.includes(subject)}
                            onChange={() => handleSubjectChange(subject)}
                        />

                        {subject}
                    </label>
                ))}
                </fieldset>
                <button type="submit">Make Profile</button>
            </form>
        </div>
    </center>
    );
};

