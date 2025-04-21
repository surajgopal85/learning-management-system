import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeacher, updateTeacher } from "../../../api/teachersApi";
import { getSubjects } from '../../../api/subjectsApi';
import { TeacherWithSubjectIds } from '../../../types/teacher';
import { Subject } from '../../../types/subject';
import { EditTeacherProfileProps } from '../../../types/teacher';

export const EditTeacherProfile: React.FC<EditTeacherProfileProps> = ({ teacherId }) => {
  const navigate = useNavigate(); // navigate back to adminview

  const [teacher, setTeacher] = useState<TeacherWithSubjectIds | null>(null);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subjects, setSubjects] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [teacherData, subjectList] = await Promise.all([
          getTeacher(teacherId),
          getSubjects()
        ]);
        setTeacher(teacherData);
        setAvailableSubjects(subjectList);
        setFirstName(teacherData.firstName);
        setLastName(teacherData.lastName);
        setEmail(teacherData.email);
        setSubjects(teacherData.subjects);
      } catch (err) {
        console.error(err);
        setError('Failed to load teacher or subjects');
      }
    }

    fetchData();
  }, [teacherId]);

  const handleToggleSubject = (id: number) => {
    setSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateTeacher(teacherId, { firstName, lastName, email, subjects });
      navigate('/admin/teachers'); // instead of alert, navigate
      // alert('Teacher profile updated!');
    } catch (err) {
      console.error(err);
      setError('Failed to update teacher');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!teacher) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <label>
        First Name:
        <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input value={lastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Email:
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </label>

      <fieldset>
        <legend>Subjects</legend>
        {availableSubjects.map(subject => (
          <label key={subject.id}>
            <input
              type="checkbox"
              checked={subjects.includes(subject.id)}
              onChange={() => handleToggleSubject(subject.id)}
            />
            {subject.name}
          </label>
        ))}
      </fieldset>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};
