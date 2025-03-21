import React, { useState } from 'react';
import './TeacherProfile.css';

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
        // Get form data
        const formData = new FormData(e.currentTarget)

        // FormData only includes checked checkboxes
        const subjects = formData.getAll('subjects') as string[];

        const teacherFormData = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            subjects: subjects // This will only contain checked values
        };
        console.log("TeacherFormData: ", teacherFormData);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='teacher-form'>
                <label>
                    First Name
                    <input type="text" name="firstName"></input>
                </label>

                <label>
                    Last Name
                    <input type="text" name="lastName"></input>
                </label>

                <label>
                    Email
                    <input type="text" name="email"></input>
                </label>

                <fieldset>
                    <legend>Choose Your Subjects</legend>
                    {SUBJECTS.map((subject) => (
                        <label key={subject}>
                            <input type="checkbox" name="subjects" value={subject} />
                            {subject}
                        </label>
                    ))}
                </fieldset>
                <button type="submit">Make Profile</button>
            </form>
        </div>
    );
};

