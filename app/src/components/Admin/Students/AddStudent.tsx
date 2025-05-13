import React, { useRef } from 'react';
import './AddStudent.css';
import { addStudent } from './../../../api/studentsApi';
import { AddStudentForm, AddStudentProps } from '../../../types/student';


export const AddStudent: React.FC<AddStudentProps> = ({onAddSuccess}) => {
    const studentFormRef = useRef<HTMLFormElement>(null);

    // hooks / handlers for adding students
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // std form data: type studentform, add all attrs to create new
        const studentFormData: AddStudentForm = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            dateOfBirth: formData.get('dateOfBirth') as string,
            grade: parseInt(formData.get('grade')?.toString() ?? '9') as number,
            credits: parseInt(formData.get('credits')?.toString() ?? '0') as number,
        }

        // call api?
        // destructure
        const formattedDate = new Date(studentFormData.dateOfBirth).toISOString().split('T')[0]; // Format to YYYY-MM-DD
        studentFormData.dateOfBirth = formattedDate;

        const { firstName, lastName, email, grade, credits } = studentFormData;

        // try / catch api
        try {
                await addStudent(firstName, lastName, email, formattedDate, grade, credits);
                console.log('teacher added successfully!');
                onAddSuccess();
            } catch(err) {
                console.error('error: ', err);
            }
              studentFormRef.current?.reset();
    }
    return (
        <center>
            <h1>#ADD STUDENT</h1>
            <form ref={studentFormRef} className='student-form' onSubmit={handleSubmit}>
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
                <label>
                    Date of Birth
                    <input type='date' name='dateOfBirth' placeholder='Date of Birth'>
                    </input>
                </label>
                <select id="grade" name="grade">
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <label>
                    Credits Earned
                    <input type="text" name="credits" placeholder='Credits Earned'>
                    </input>
                </label>
                <button type="submit">Add Student</button>
            </form>
        </center>
    )
}