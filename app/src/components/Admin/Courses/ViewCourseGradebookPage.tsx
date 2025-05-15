// EditTeacherPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourse } from '../../../api/coursesApi';
import { CourseGradebook } from './CourseGradebook';
import { AdminAllCourseView } from '../../../types/course';

// adding a TYPE!
// interface Teacher {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   subjects: string[];
// }

export const ViewCourseGradebookPage: React.FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<AdminAllCourseView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getCourse(Number(id)); // or getTeacherById if you have that
        // const found = course.find((t: TeacherWithSubjectNames) => t.id === parseInt(id!));
        // if (found) 
        setCourse(course);
      } catch (err) {
        console.error('Failed to fetch teacher:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found.</p>;

  return <CourseGradebook course={course} />;
};
