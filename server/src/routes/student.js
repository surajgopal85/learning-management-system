const express = require('express');
const router = express.Router();
const db = require('../util/db');

router.get("/students", (req, res) => {
    db.all("SELECT * FROM students", (err, rows) => {
      if (err) {
        console.error("Error fetching students:", err.message);
        return res.status(500).send("Error fetching students");
      }
      res.json(rows); // Send the students as JSON
    });
  });

router.post('/students', (req, res) => {
    const { firstName, lastName, dateOfBirth, email, grade, credits } = req.body;

    const insertStudentSql = 
    "INSERT INTO students (firstName, lastName, dateOfBirth, email, grade, credits) VALUES (?, ?, ?, ?, ?, ?)";
    db.run(insertStudentSql, [firstName, lastName, dateOfBirth, email, grade, credits], function(err) {

      if (err) {
          console.error("❌ Error inserting student:", err.message);
          return res.status(500).send("Error inserting student");
      }

      const studentId = this.lastID;

      return res.status(200).send({
        message: `✅ Student added with ID: ${studentId}, no subjects added.`,
      });
    });
  });

// get a student for view/edit
router.get('/student/:id', (req, res) => {
  // get id from path
  const { id } = req.params;
  const sql = `
    SELECT 
      s.id AS studentId,
      s.firstName,
      s.lastName,
      s.email,
    FROM students s
    LEFT JOIN course_students cs ON s.id = cs.student_id
    WHERE s.id = ?
  `;

  


});

router.delete('/student/:id', (req, res) => {

});

module.exports = router;