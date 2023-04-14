import sqlite3 from 'sqlite3';
sqlite3.verbose();

const DBSOURCE = './database.db';

const db = new sqlite3.Database(DBSOURCE);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      birth_date TEXT,
      city TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY,
      name TEXT,
      cnpj TEXT UNIQUE,
      address TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users_companies (
      user_id INTEGER,
      company_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    INSERT INTO users (name, email, phone, birth_date, city)
    VALUES
      ('Fulano', 'fulano@email.com', '(21) 98765-4321', '1990-01-01', 'Rio de Janeiro'),
      ('Ciclano', 'ciclano@email.com', '(21) 98765-4321', '1992-01-01', 'Rio de Janeiro')
  `);

  db.run(`
    INSERT INTO companies (name, cnpj, address)
    VALUES
      ('Empresa A', '12.345.678/9012-34', 'Rua A'),
      ('Empresa B', '98.765.432/1234-56', 'Rua B')
  `);

  db.run(`
    INSERT INTO users_companies (user_id, company_id)
    VALUES
      (1, 1),
      (2, 2)
  `);
});

export default db;
