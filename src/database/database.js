import sqlite3 from 'sqlite3';
const { Database } = sqlite3;

export const database = new Database("data.db");

export function seed() {
  database.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      img_url TEXT,
      description TEXT,
      port TEXT
    ); 
  `);
}
