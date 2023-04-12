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
        city TEXT);
      `,
      (err) => {
        if (err) {
          console.log('Table creation failed: ', err.message);
        } else {
          console.log('Table created successfully.');
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        cnpj TEXT,
        address TEXT);
      `,
      (err) => {
        if (err) {
          console.log('Table creation failed: ', err.message);
        } else {
          console.log('Table created successfully.');
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS users_companies (
        user_id INTEGER,
        company_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (company_id) REFERENCES companies(id));
        PRIMARY KEY (user_id, company_id));
      `,
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
