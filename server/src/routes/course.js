const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.get("/courses", (req, res) => {
      const getCoursesSql = `
      SELECT c.id, c.name, c.subject_id, s.name AS subject_name
      FROM courses c
      JOIN subjects s ON c.subject_id = s.id
    `;
    db.all(getCoursesSql, (err, rows) => {
      if (err) {
        console.error("Error fetching courses:", err.message);
        return res.status(500).send("Error fetching courses");
      }
      res.json(rows); // Send the subjects as JSON
    });
  });

router.post("/courses", (req, res) => {
    const { name, subject_id, teacher_ids } = req.body;

    if (!name || !subject_id || isNaN(subject_id) || !Array.isArray(teacher_ids) || teacher_ids.length === 0) {
      return res.status(400).send("Missing course name, subject_id, or teacher_ids.");
    }

    const insertCourseSql = 'INSERT INTO courses (name, subject_id) VALUES (?, ?)';
    db.run(insertCourseSql, [name, subject_id], function(err){
      if(err) {
        console.error("❌ Error inserting course:", err.message);
        return res.status(500).send("Error inserting course");
      }
    });

    const courseId = this.lastID;
    const placeholders = teacher_ids.map(() => "(?, ?)").join(", ");
    const values = teacher_ids.flatMap(teacherId => [courseId, teacherId]);
    const insertTeachersSql = `INSERT INTO course_teachers (course_id, teacher_id) VALUES ${placeholders}`;

    db.run(insertTeachersSql, values, function (err2) {
        if (err2) {
          console.error("❌ Error inserting course_teachers:", err2.message);
          return res.status(500).send("Error linking teachers to course");
        }

        return res.status(200).send({
          message: `✅ Course added with ID: ${courseId}`,
        });
      });
    return res.status(200).send({
      message: `✅ Course added with ID: ${courseId}`,
    });
    
})

module.exports = router;