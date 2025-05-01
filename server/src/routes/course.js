const express = require("express");
const router = express.Router();
const db = require("../util/db");

router.get("/courses", (req, res) => {
    db.all("SELECT * FROM courses", (err, rows) => {
      if (err) {
        console.error("Error fetching courses:", err.message);
        return res.status(500).send("Error fetching courses");
      }
      res.json(rows); // Send the subjects as JSON
    });
  });

router.post("/courses", (req, res) => {
    const { name, subject } = req.body;
    
})

module.exports = router;