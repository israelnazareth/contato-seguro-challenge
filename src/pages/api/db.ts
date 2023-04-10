import sqlite3 from 'sqlite3';
sqlite3.verbose();

const DBSOURCE = './database.db';

export const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        birth_date TEXT,
        city TEXT
    )`,
      (err) => {
        if (err) {
          console.log('Table creation failed: ', err.message);
        } else {
          console.log('Table created successfully.');
        }
      }
    );
    console.log('Connected to the SQLite database.');
  }
});
