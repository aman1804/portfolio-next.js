// lib/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// You need to use a function to allow async/await
export async function openDB() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}
