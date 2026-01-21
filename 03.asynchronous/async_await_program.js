#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { dbRun, dbAll, dbClose } from "./promise-based_sqlite3_functions.js";

const db = new sqlite3.Database(":memory:");
await dbRun(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
const this_object = await dbRun(
  db,
  "INSERT INTO books(title) VALUES('n-book')",
);
console.log(this_object.lastID);
const rows = await dbAll(db, "SELECT * FROM books");
console.log(rows);
await dbRun(db, "DROP TABLE books");

await dbRun(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
await dbRun(db, "INSERT INTO books(title) VALUES('n-book')");
try {
  await dbRun(db, "INSERT INTO books(title) VALUES('n-book')");
} catch (err) {
  if (err instanceof Error && err.code.startsWith("SQLITE_")) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await dbAll(db, "SELECT * FROM book");
} catch (err) {
  if (err instanceof Error && err.code.startsWith("SQLITE_")) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await dbRun(db, "DROP TABLE books");
await dbClose(db);
