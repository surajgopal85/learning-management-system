const express = require("express");
const router = express.Router();
const db = require("../util/db");

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