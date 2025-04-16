// EditTeacherPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTeachers } from '../../../api/teachersApi';
import { EditTeacherProfile } from './EditTeacherProfile';
import { TeacherWithSubjectNames } from '../../../types/teacher';

// adding a TYPE!
// interface Teacher {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   subjects: string[];
// }

export const EditTeacherPage: React.FC = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<TeacherWithSubjectNames | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teachers = await getTeachers(); // or getTeacherById if you have that
        const found = teachers.find((t: TeacherWithSubjectNames) => t.id === parseInt(id!));
        if (found) setTeacher(found);
      } catch (err) {
        console.error('Failed to fetch teacher:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!teacher) return <p>Teacher not found.</p>;

  return <EditTeacherProfile teacherId={teacher.id} />;
};
