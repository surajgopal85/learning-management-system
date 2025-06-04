// scripts/reset-db.ts
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const db = new sqlite3.Database('./../database.sqlite');

const runSQLFile = (filePath: string) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  db.exec(sql, err => {
    if (err) {
      console.error(`Failed running ${filePath}:`, err.message);
    } else {
      console.log(`✅ Ran ${path.basename(filePath)}`);
    }
  });
};

runSQLFile('./../db/schema.sql');
runSQLFile('./../db/seed.sql');

db.close(() => {
  console.log('🛑 DB connection closed');
});