// scripts/reset-db.ts
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const db = new sqlite3.Database(path.resolve(__dirname, "../database.sqlite"));

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

runSQLFile(path.resolve(__dirname, '../db/schema.sql'));
runSQLFile(path.resolve(__dirname, '../db/seed.sql'));

db.close(() => {
  console.log('🛑 DB connection closed');
});