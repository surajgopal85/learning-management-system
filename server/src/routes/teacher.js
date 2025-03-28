const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.post("/teacher", (req, res) => {
  const { firstName, lastName, email } = req.body;
  const sql = "INSERT INTO teacher (firstName, lastName, email) VALUES (?, ?, ?)";
  db.run(sql, [name], function (err) {
    if (err) {
      console.error("Error inserting into database:", err.message);
      return res.status(500).send("Error inserting into database");
    }
    res.send(`teacher added with ID: ${this.lastID}`);
  });
});

router.get("/teacher", (_, res) => {
  const sql = "SELECT * FROM teacher";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error retrieving from database");
    }
    res.json(rows);
  });
});

module.exports = router;
