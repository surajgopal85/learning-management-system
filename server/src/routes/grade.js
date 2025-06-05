const express = require("express");
const router = express.Router();
const db = require("../util/db");

// fetch all grades for a course! crux of gradebook
router.get('/grades/:courseId', (req, res) => {
  const { courseId } = req.params;

  // grab not only the grade but associated assignment and student info
  const sql = `
    SELECT 
      g.id AS gradeId,
      g.student_id AS studentId,
      g.assignment_id AS assignmentId,
      g.pointsEarned
    FROM grades g
    JOIN assignments a ON g.assignment_id = a.id
    JOIN course_students cs ON g.student_id = cs.student_id
    WHERE a.course_id = ? AND cs.course_id = ?
  `;

  db.all(sql, [courseId, courseId], (err, rows) => {
    if (err) {
      console.error('❌ Failed to fetch grades:', err.message);
      return res.status(500).json({ error: 'Failed to fetch grades' });
    }

    return res.json(rows); // return list of grades for all (student, assignment) pairs
  });
});


// initialize grades on assignment creation
router.post('/grades', (req, res) => {
    const { studentId, assignmentId } = req.body;

    const insertGradesForAssignmentSql = `INSERT INTO grades (student_id, assignment_id)
                                          VALUES (?, ?)`;

    db.run(insertGradesForAssignmentSql, [studentId, assignmentId], function(err) {
        if(err) {
            if(err.message.includes('UNIQUE')) {
                return res.status(409).send('Grade already exists');
            }
            return res.status(500).send('Error inserting grade');
        }
        res.status(201).json({ 
            message: '✅ Grade created',
            id: this.lastID
        });
    });
})

// update an individual grade
router.patch('/grades/:id', (req, res) => {
    const { id } = req.params;
    const { pointsEarned } = req.body;

    const updateGradeSql = 
    `UPDATE grades 
    SET pointsEarned = ? 
    WHERE id = ?`;

    db.run(updateGradeSql, [pointsEarned, id], function(err) {
        if(err) {
            console.error('❌ Error inserting grade', err.message);
            return res.status(500).send('Error inserting grade');
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'No grade found with that ID.' });
        }

        return res.status(200).json({
            message: '✅ grade inserted',
            id,
        });
    });
});

module.exports = router;