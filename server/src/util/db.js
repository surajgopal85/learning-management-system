const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve("database.sqlite");
console.log("dbPath", dbPath);
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = db;
