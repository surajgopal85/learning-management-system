const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.post("/teachers", (req, res) => {
  const { firstName, lastName, email } = req.body;
  const sql = "INSERT INTO teachers (firstName, lastName, email) VALUES (?, ?, ?)";
  db.run(sql, [firstName, lastName, email], function (err) {
    if (err) {
      console.error("Error inserting into database:", err.message);
      return res.status(500).send("Error inserting into database");
    }
    res.send(`teacher added with ID: ${this.lastID}`);
  });
});

router.get("/teachers", (_, res) => {
  const sql = "SELECT * FROM teachers";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error retrieving from database");
    }
    res.json(rows);
  });
});

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

module.exports = router;
