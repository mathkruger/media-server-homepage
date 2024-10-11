import sqlite3 from 'sqlite3';
const { Database } = sqlite3;

export const database = new Database("prod.db");

export async function all(query) {
  return new Promise((resolve, reject) => {
    database.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function get(query) {
  return new Promise((resolve, reject) => {
    database.get(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function runStatement(query, values) {
  const statement = database.prepare(query);

  return new Promise((resolve, reject) => {
    statement.run(...values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

