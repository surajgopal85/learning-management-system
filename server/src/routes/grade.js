const express = require("express");
const router = express.Router();
const db = require("../util/db");

// initialize grades on assignment creation
router.post('/grades', (req, res) => {
    const { studentId, assignmentId } = req.body;

    const insertGradesForAssignmentSql = `INSERT INTO grades (student_id, assignment_id, pointsEarned)
                                          VALUES (?, ?, 0)`;

    db.run(insertGradesForAssignmentSql, [studentId, assignmentId], function(err) {
        if(err) {
            if(err.message.includes('UNIQUE')) {
                return res.status(409).send('Grade already exists');
            }
            return res.status(500).send('Error inserting grade');
        }
        res.status(201).json({ id: this.lastID});
    });
})

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