const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.post("/teachers", (req, res) => {
  const { firstName, lastName, email, subjects } = req.body;

  const insertTeacherSql =
    "INSERT INTO teachers (firstName, lastName, email) VALUES (?, ?, ?)";

  db.run(insertTeacherSql, [firstName, lastName, email], function (err) {
    if (err) {
      console.error("❌ Error inserting teacher:", err.message);
      return res.status(500).send("Error inserting teacher");
    }

    const teacherId = this.lastID;

    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(200).send({
        message: `✅ Teacher added with ID: ${teacherId}, no subjects added.`,
      });
    }

    // 🔥 Now treating subjects as array of subject IDs
    const processSubjects = subjects.map((subjectId) => {
      return new Promise((resolve, reject) => {
        const insertTeacherSubjectSql = `
          INSERT INTO teacher_subjects (teacher_id, subject_id)
          VALUES (?, ?)
        `;

        // Convert to integer in case it's a string
        db.run(insertTeacherSubjectSql, [teacherId, parseInt(subjectId)], function (err) {
          if (err) {
            console.error(
              `❌ Error linking teacher ${teacherId} with subject ${subjectId}:`,
              err.message
            );
            return reject(err);
          }
          resolve(true);
        });
      });
    });

    Promise.all(processSubjects)
      .then(() => {
        res.status(200).send({
          message: `✅ Teacher added with ID: ${teacherId}, subjects linked.`,
          teacherId,
          subjects,
        });
      })
      .catch((err) => {
        res.status(500).send("Teacher added, but error linking subjects");
      });
  });
});

// GET all teachers with their subjects
router.get("/teachers", (req, res) => {
  const sql = `
    SELECT 
      t.id AS teacherId,
      t.firstName,
      t.lastName,
      t.email,
      s.name AS subjectName
    FROM teachers t
    LEFT JOIN teacher_subjects ts ON t.id = ts.teacher_id
    LEFT JOIN subjects s ON ts.subject_id = s.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching teachers:", err.message);
      return res.status(500).send("Error fetching teachers");
    }

    // Group by teacherId
    const teacherMap = {};

    rows.forEach((row) => {
      if (!teacherMap[row.teacherId]) {
        teacherMap[row.teacherId] = {
          id: row.teacherId,
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          subjects: [],
        };
      }

      if (row.subjectName) {
        teacherMap[row.teacherId].subjects.push(row.subjectName);
      }
    });

    res.json(Object.values(teacherMap));
  });
});

router.get("/teachers/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      t.id AS teacherId,
      t.firstName,
      t.lastName,
      t.email,
      s.id AS subjectId
    FROM teachers t
    LEFT JOIN teacher_subjects ts ON t.id = ts.teacher_id
    LEFT JOIN subjects s ON ts.subject_id = s.id
    WHERE t.id = ?
  `;

  db.all(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error fetching teacher:", err.message);
      return res.status(500).send("Error fetching teacher");
    }

    if (rows.length === 0) {
      return res.status(404).send("Teacher not found");
    }

    const teacher = {
      id: rows[0].teacherId,
      firstName: rows[0].firstName,
      lastName: rows[0].lastName,
      email: rows[0].email,
      subjects: rows
        .filter(row => row.subjectId !== null)
        .map(row => row.subjectId),
    };

    res.json(teacher);
  });
});


// router.get("/teachers", (_, res) => {
//   const sql = "SELECT * FROM teachers";
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       return res.status(500).send("Error retrieving from database");
//     }
//     res.json(rows);
//   });
// });

router.delete('/teachers/:id', (req, res) => {
  // Logic to delete the resource
  const { id } = req.params; // testing here
  const sql = "DELETE FROM teachers WHERE id = (?)";
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Error deleting from database", err.message);
      return res.status(500).send("Error deleting from database"); // placeholder
    }
    res.send(`teacher deleted with id: ${id}`);
  });
  // res.status(204).send();
});

// routes/teachers.ts or api/teachers/[id].ts


router.put('/teachers/:id', (req, res) => {
  const { id } = req.params;
  const {firstName, lastName, email, subjects } = req.body;
  const sql = `UPDATE teachers
              SET firstName = ?, lastName = ?, email = ?
              WHERE id = ?
              `;
  const teacherParams = [firstName, lastName, email, id];
  db.run(sql, teacherParams, function(err) {
    if (err) {
      console.error("Error updating teacher in database", err.message);
      return res.status(500).send('Error updating teacher');
    }

    if (Array.isArray(subjects)) {
      // update subjects pt 1 - clear arr
      const deleteSubjectsSql = `DELETE FROM teacher_subjects WHERE teacher_id = ?`;
      db.run(deleteSubjectsSql, [id], function(err) {
        if (err) {
          console.error("Error clearing existing subjects", err.message);
          return res.status(500).send('Error updating teacher subjects');
        }

        // now if there's nothing there
        if(subjects.length === 0) {
          return res.status(200).json({ message: '`Teacher with id ${id} updated (no subjects)`'});
        }

         // Build insert statement dynamically
         const insertSql = `INSERT INTO teacher_subjects (teacher_id, subject_id) VALUES ${subjects.map(() => '(?, ?)').join(', ')}`;
         const insertParams = subjects.flatMap(subjectId => [id, Number(subjectId)]);
         db.run(insertSql, insertParams, function(err) {
          if (err) {
            console.error("Error inserting new subjects", err.message);
            return res.status(500).send('Error updating teacher subjects');
          }

          res.status(200).json({ message: `Teacher with id ${id} and subjects updated successfully!`});
        });
      });
    } else {
      return res.status(200).json({ message: `Teacher with id ${id} updated successfully (no subjects changed)!`});
    }
  });
});

module.exports = router;
