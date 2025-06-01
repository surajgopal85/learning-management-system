import React, { useEffect, useState } from 'react';
import { GradeCell } from './Grades/GradeCell';
import { AdminAllCourseView } from '../../../types/course';
import { getAssignmentCategoriesForCourse, addAssignmentCategory } from '../../../api/assignmentCategoriesApi';
import { getAssignmentsForCourse, addAssignment } from '../../../api/assignmentsApi';
import { CourseAssignment, AssignmentCategory } from '../../../types/assignment';

interface ViewCourseGradebookProps {
  course: AdminAllCourseView;
}

export const CourseGradebook: React.FC<ViewCourseGradebookProps> = ({ course }) => {
  const [timeout, setTimeout] = useState<NodeJS.Timeout | null>(null);
  const [assignmentCategories, setAssignmentCategories] = useState<AssignmentCategory[]>([]);
  const [assignments, setAssignments] = useState<CourseAssignment[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', weight: 0 });
  const [newAssignment, setNewAssignment] = useState({
    name: '',
    points: 0,
    due_date: '',
    category_id: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAssignmentCategoriesForCourse(course.id);
        setAssignmentCategories(categories);
      } catch (err) {
        console.error('Failed to fetch assignment categories:', err);
      }
    };
    fetchData();
  }, [course.id]);

  useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const data = await getAssignmentsForCourse(course.id);
      setAssignments(data);
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
    }
  };
  fetchAssignments();
}, [course.id]);


  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAssignmentCategory(course.id, newCategory.name, newCategory.weight);
      const updated = await getAssignmentCategoriesForCourse(course.id);
      setAssignmentCategories(updated);
      setNewCategory({ name: '', weight: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAssignment = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const now = new Date(); // current timestamp for creation_date
    const dueDate = new Date(newAssignment.due_date); // convert to Date object

    await addAssignment(
      course.id,
      newAssignment.category_id,
      now,
      dueDate,
      newAssignment.name,
      newAssignment.points
    );

    const updatedAssignments = await getAssignmentsForCourse(course.id);
    setAssignments(updatedAssignments);
    setNewAssignment({ name: '', points: 0, due_date: '', category_id: 0 });
  } catch (err) {
    console.error('Error adding assignment:', err);
  }
};

const handleGradeChange = (id: number, value: string) => {
  
}


  return (
    <div style={{ padding: '1rem' }}>
      {/* Course Info */}
      <div style={{ marginBottom: '1rem' }}>
        <h1>{course.name}</h1>
        <h3 style={{ fontWeight: 'normal', color: '#555' }}>
          Teachers: {course.teachers.map(t => t.name).join(', ') || 'No teachers'}
        </h3>
      </div>

      {/* Add Assignment Category */}
      <form onSubmit={handleAddCategory} style={{ marginBottom: '1rem' }}>
        <h2>Add Assignment Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Weight"
          value={newCategory.weight}
          onChange={e => setNewCategory({ ...newCategory, weight: Number(e.target.value) })}
          required
        />
        <button type="submit">Add Category</button>
      </form>

      {/* Add Assignment */}
      <form onSubmit={handleAddAssignment} style={{ marginBottom: '2rem' }}>
        <h2>Add Assignment</h2>
        <input
          type="text"
          placeholder="Assignment Name"
          value={newAssignment.name}
          onChange={e => setNewAssignment({ ...newAssignment, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Points"
          value={newAssignment.points}
          onChange={e => setNewAssignment({ ...newAssignment, points: Number(e.target.value) })}
          required
        />
        <input
          type="date"
          value={newAssignment.due_date}
          onChange={e => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
          required
        />
        <select
          value={newAssignment.category_id}
          onChange={e => setNewAssignment({ ...newAssignment, category_id: Number(e.target.value) })}
          required
        >
          <option value="">Select Category</option>
          {assignmentCategories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.weight}%)
            </option>
          ))}
        </select>
        <button type="submit">Add Assignment</button>
      </form>

      {/* Gradebook Table */}
      <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Student</th>
            {assignments.map(assignment => (
              <th key={assignment.id} style={headerCellStyle}>{assignment.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {course.students && course.students.length > 0 ? (
            course.students.map(student => (
              <tr key={student.id}>
                <td style={cellStyle}>{student.name}</td>
                {assignments.map(a => (
                  <td key={a.id} style={cellStyle}>--</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={assignments.length + 1} style={cellStyle}>
                No students enrolled
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const headerCellStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '12px',
  backgroundColor: '#f0f0f0',
  textAlign: 'center',
  fontWeight: 'bold',
};

const cellStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};