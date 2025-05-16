const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.post('/assignment-categories', (req, res) => {
    const { course_id, name, weight } = req.body;

    const insertAssignmentCategorySql = `
    INSERT INTO assignment_categories (course_id, name, weight) VALUES
    (?, ?, ?)`;

    db.run(insertAssignmentCategorySql, [course_id, name, weight], function(err) {
        if(err) {
            console.error('❌ Error inserting assignment category', err.message);
            return res.status(500).send('Error inserting assignment category');
        }

        const assignmentCategoryId = this.lastID;

        // ❌ DON'T use multiple args in res.send
    return res.status(200).json({
        message: '✅ Assignment category inserted',
        id: assignmentCategoryId,
    });
    })
});

router.get('/assignment-categories/:course_id', (req, res) => {
    const { course_id } = req.params;
    const getAssignmentCategoriesForCourseSql = 
    `SELECT * FROM assignment_categories WHERE course_id = ?`

    db.all(getAssignmentCategoriesForCourseSql, [course_id], function(err, assignment_categories){
        if(err) {
            console.error(`Error fetching assignment categories for courseId ${course_id}`, err.message);
            res.status(500).send(`Error fetching assignment categories for courseId ${course_id}`);
        }

        if(assignment_categories.length === 0) {
            return res.status(404).send(`No assignment categories found for courseId ${course_id}`);
        }

        return res.json(assignment_categories);
    })
});

module.exports = router;