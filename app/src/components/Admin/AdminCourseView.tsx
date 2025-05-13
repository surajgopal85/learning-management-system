import { useState, useEffect } from 'react';
import { AddCourse } from "./Courses/AddCourse";
import { getCourses } from '../../api/coursesApi';
import { AdminAllCourseView, AddCourseProps } from '../../types/course';
import { ViewAllCourses } from './Courses/ViewAllCourses';

export const AdminCourseView: React.FC = () => {
    const [courses, setCourses] = useState<AdminAllCourseView[]>([]);

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (err) {
            console.error('Failed to fetch courses', err);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            <AddCourse onAddSuccess={fetchCourses} />
            <ViewAllCourses courses={courses} />
        </div>
    )
}