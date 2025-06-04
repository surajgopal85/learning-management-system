const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.get('/courses/:id', (req, res) => {
  const { id } = req.params;
  // const getCourseSql = 
  //  `SELECT 
  //   c.id AS course_id, 
  //   c.name AS course_name, 
  //   c.subject_id, 
  //   FROM courses c
  //   LEFT JOIN subjects s ON c.subject_id = s.id,
  //   LEFT JOIN course_teachers ct ON  ct.course_id = course_id,
  //   LEFT JOIN course_students cs ON cs.course_id = course_id,
  //   WHERE course_id = ?`;
  const getCourseSql = `
    SELECT c.id AS course_id, c.name AS course_name, c.subject_id, s.name AS subject_name
    FROM courses c
    JOIN subjects s ON c.subject_id = s.id
    WHERE c.id = ?
  `;

  db.all(getCourseSql, [id], (err, rows) => {
    if (err) {
      console.error('Error fetching course', err.message);
      return res.status(500).send('Error fetching course');
    }

    const getTeachersSql = `
      SELECT ct.course_id, t.id AS teacher_id, t.firstName, t.lastName
      FROM course_teachers ct
      JOIN teachers t ON ct.teacher_id = t.id
      WHERE ct.course_id = ?
    `;

    db.all(getTeachersSql, [id], (err2, teacherRows) => {
      if (err2) {
        console.error("Error fetching course_teachers:", err2.message);
        return res.status(500).send("Error fetching course_teachers");
      }

    const getStudentsSql = `
      SELECT cs.course_id, s.id AS student_id, s.firstName, s.lastName
      FROM course_students cs
      JOIN students s ON cs.student_id = s.id
      WHERE cs.course_id = ?
    `;

    db.all(getStudentsSql, [id], (err3, studentRows) => {
      if (err3) {
        console.error('Error fetching course_students:', err3.message);
        return res.status(500).send('Error fetching course_students');
      }


    const completeCourses = rows.map(course => {
      const teachers = teacherRows
      .filter(t => t.course_id === course.course_id)
      .map(t => ({
        id: t.teacher_id,
        name: `${t.firstName} ${t.lastName}`
      }));

      const students = studentRows
      .filter(s => s.course_id === course.course_id)
      .map(s => ({
        id: s.student_id,
        name: `${s.firstName} ${s.lastName}`
      }));

      return {
            id: course.course_id,
            name: course.course_name,
            subject_id: course.subject_id,
            subject: course.subject_name,
            teachers,
            students
          };
      });

      return res.json(completeCourses[0]);
      });
    });
  });
});

router.get("/courses", (req, res) => {
  const getCoursesSql = `
    SELECT c.id AS course_id, c.name AS course_name, c.subject_id, s.name AS subject_name
    FROM courses c
    JOIN subjects s ON c.subject_id = s.id
  `;

  db.all(getCoursesSql, (err, courses) => {
    if (err) {
      console.error("Error fetching courses:", err.message);
      return res.status(500).send("Error fetching courses");
    }

    const getTeachersSql = `
      SELECT ct.course_id, t.id AS teacher_id, t.firstName, t.lastName
      FROM course_teachers ct
      JOIN teachers t ON ct.teacher_id = t.id
    `;

    db.all(getTeachersSql, (err2, teacherRows) => {
      if (err2) {
        console.error("Error fetching course_teachers:", err2.message);
        return res.status(500).send("Error fetching course_teachers");
      }

      const getStudentsSql = `
        SELECT cs.course_id, s.id AS student_id, s.firstName, s.lastName
        FROM course_students cs
        JOIN students s ON cs.student_id = s.id
      `;

      db.all(getStudentsSql, (err3, studentRows) => {
        if (err3) {
          console.error("Error fetching course_students:", err3.message);
          return res.status(500).send("Error fetching course_students");
        }

        const enrichedCourses = courses.map(course => {
          const teachers = teacherRows
            .filter(t => t.course_id === course.course_id)
            .map(t => ({
              id: t.teacher_id,
              name: `${t.firstName} ${t.lastName}`
            }));

          const students = studentRows
            .filter(s => s.course_id === course.course_id)
            .map(s => ({
              id: s.student_id,
              name: `${s.firstName} ${s.lastName}`
            }));

          return {
            id: course.course_id,
            name: course.course_name,
            subject_id: course.subject_id,
            subject: course.subject_name,
            teachers,
            students
          };
        });

        return res.json(enrichedCourses);
      });
    });
  });
});

router.post("/courses", (req, res) => {
  const { name, subject_id, teacher_ids, student_ids } = req.body;

  if (!name || !subject_id || isNaN(subject_id)) {
    return res.status(400).send("Missing course name or subject_id.");
  }

  const insertCourseSql = 'INSERT INTO courses (name, subject_id) VALUES (?, ?)';
  
  db.run(insertCourseSql, [name, subject_id], function(err) {
    if (err) {
      console.error("❌ Error inserting course:", err.message);
      return res.status(500).send("Error inserting course");
    }

    const courseId = this.lastID;

    // Helper function to handle optional linking
    const linkTeachersAndStudents = () => {
      if (Array.isArray(teacher_ids) && teacher_ids.length > 0) {
        const teacherPlaceholders = teacher_ids.map(() => "(?, ?)").join(", ");
        const teacherValues = teacher_ids.flatMap(teacherId => [courseId, teacherId]);
        const insertTeachersSql = `INSERT INTO course_teachers (course_id, teacher_id) VALUES ${teacherPlaceholders}`;

        db.run(insertTeachersSql, teacherValues, function(err2) {
          if (err2) {
            console.error("❌ Error linking teachers:", err2.message);
            return res.status(500).send("Error linking teachers to course");
          }
          linkStudents(); // Continue with student linking
        });
      } else {
        linkStudents(); // Skip teacher linking, go to students
      }
    };

    const linkStudents = () => {
      if (Array.isArray(student_ids) && student_ids.length > 0) {
        const studentPlaceholders = student_ids.map(() => "(?, ?)").join(", ");
        const studentValues = student_ids.flatMap(studentId => [courseId, studentId]);
        const insertStudentsSql = `INSERT INTO course_students (course_id, student_id) VALUES ${studentPlaceholders}`;

        db.run(insertStudentsSql, studentValues, function(err3) {
          if (err3) {
            console.error("❌ Error linking students:", err3.message);
            return res.status(500).send("Error linking students to course");
          }
          return res.status(200).send({ message: `✅ Course added with ID: ${courseId}` });
        });
      } else {
        return res.status(200).send({ message: `✅ Course added with ID: ${courseId}` });
      }
    };

    // Start linking after course is created
    linkTeachersAndStudents();
  });
});



module.exports = router;