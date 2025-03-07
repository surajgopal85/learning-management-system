const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.post("/api/thing", (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO thing (name) VALUES (?)";
  db.run(sql, [name], function (err) {
    if (err) {
      console.error("Error inserting into database:", err.message);
      return res.status(500).send("Error inserting into database");
    }
    res.send(`Thing added with ID: ${this.lastID}`);
  });
});

router.get("/api/thing", (_, res) => {
  const sql = "SELECT * FROM thing";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error retrieving from database");
    }
    res.json(rows);
  });
});

module.exports = router;
