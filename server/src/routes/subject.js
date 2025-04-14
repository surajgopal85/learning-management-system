const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.get("/subjects", (req, res) => {
    db.all("SELECT * FROM subjects", (err, rows) => {
      if (err) {
        console.error("Error fetching subjects:", err.message);
        return res.status(500).send("Error fetching subjects");
      }
      res.json(rows); // Send the subjects as JSON
    });
  });

module.exports = router;