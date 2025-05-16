const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.post('/assignments', (req, res) => {
    console.log('REQ BODY:', req.body); // 🔍 What does the backend see?

    const {
  course_id,
  category_id,
  creation_date: creationDate,
  due_date: dueDate,
  name,
  total_points: totalPoints
} = req.body;

console.log('Received request body:', req.body);


    const insertAssignmentSql = `
        INSERT INTO assignments (course_id, category_id, creationDate, dueDate, name, totalPoints)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(insertAssignmentSql, [course_id, category_id, creationDate, dueDate, name, totalPoints], function(err) {
        if(err) {
            console.error('❌ Error inserting assignment', err.message);
            return res.status(500).send('Error inserting assignment');
        }

        const assignmentId = this.lastID;

        const getStudentIdsSql = `
        SELECT student_id FROM course_students WHERE course_id = ?
      `;

        db.all(getStudentIdsSql, [course_id], (err, students) => {
            if (err) {
                console.error('❌ Error fetching students:', err.message);
                return res.status(500).send('Error fetching students for grades');
            }

            const insertGradeSql = `
            INSERT INTO grades (student_id, assignment_id, pointsEarned)
            VALUES (?, ?, NULL)
            `;

            const gradesForAllCourseStudents = db.prepare(insertGradeSql);
            
            students.forEach(({ student_id }) => {
                gradesForAllCourseStudents.run(student_id, assignmentId);
            });

            gradesForAllCourseStudents.finalize(err => {
                if(err) {
                    console.error('❌ Error inserting initial grades:', err.message);
                    return res.status(500).send('Error inserting initial grades');
                }

                return res.status(200).json({ id: assignmentId });
            });
        })
    });
});

router.get('/assignments/:course_id', (req, res) => {
    const { course_id } = req.params;
    const getAssignmentsSql =  `SELECT a.*, ac.name as category_name, ac.weight
                                FROM assignments a
                                JOIN assignment_categories ac ON a.category_id = ac.id
                                WHERE a.course_id = ?`;

    db.all(getAssignmentsSql, [course_id], function(err, assignments) {
        if(err) {
            console.error(`Error fetching assignments for courseId ${course_id}`, err.message);
            res.status(500).send(`Error fetching assignments for courseId ${course_id}`);
        }

        if(assignments.length === 0) {
            return res.status(404).send(`No assignments found for courseId ${course_id}`);
        }

        return res.json(assignments);
    });
})

module.exports = router;