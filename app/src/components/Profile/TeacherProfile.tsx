import React from 'react';
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const subjects = formData.getAll

        const teacherFormData = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            subjects: subjects // This will only contain checked values
        };
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
                {SUBJECTS.map((subject) => (
                    <label key={subject}>
                        <input 
                            type="checkbox"
                            name="subjects"
                            value={subject}
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

