import React from 'react';
import { AdminAllCourseView } from '../../../types/course';

interface ViewCourseGradebookProps {
  course: AdminAllCourseView;
}

export const CourseGradebook: React.FC<ViewCourseGradebookProps> = ({ course }) => {
  const mockAssignments = ['Assignment 1', 'Assignment 2', 'Assignment 3'];

  return (
    <div style={{ padding: '1rem' }}>
      {/* Course Title Header */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>{course.name}</h1>
        <h3 style={{ margin: 0, fontWeight: 'normal', color: '#555' }}>
          Teachers: {course.teachers.map(t => t.name).join(', ') || 'No teachers'}
        </h3>
      </div>

      {/* Gradebook Grid */}
      <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Student</th>
            {mockAssignments.map((assignment, idx) => (
              <th key={idx} style={headerCellStyle}>{assignment}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {course.students && course.students.length > 0 ? (
            course.students.map(student => (
              <tr key={student.id}>
                <td style={cellStyle}>{student.name}</td>
                {mockAssignments.map((_, idx) => (
                  <td key={idx} style={cellStyle}>--</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={mockAssignments.length + 1} style={cellStyle}>
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
