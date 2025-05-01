const express = require('express');
const router = express.Router;
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