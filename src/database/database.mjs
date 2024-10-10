import sqlite3 from 'sqlite3';
const { Database } = sqlite3;

export const database = new Database("prod.db");

