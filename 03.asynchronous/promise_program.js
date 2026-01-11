#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { dbRun, dbAll, dbClose } from "./program_functions.js";

const db = new sqlite3.Database(":memory:");
dbRun(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => dbRun(db, "INSERT INTO books(title) VALUES('n-book')"))
  .then((generatedId) => {
    console.log(generatedId);
    return dbAll(db, "SELECT * FROM books");
  })
  .then((records) => {
    console.log(records);
    return dbRun(db, "DROP TABLE books");
  });

await timers.setTimeout(100);

dbRun(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => dbRun(db, "INSERT INTO books(title) VALUES('n-book')"))
  .then(() => dbRun(db, "INSERT INTO books(title) VALUES('n-book')"))
  .catch((err) => {
    console.error(err.message);
    return dbAll(db, "SELECT * FROM book");
  })
  .catch((err) => {
    console.error(err.message);
    return dbRun(db, "DROP TABLE books");
  })
  .then(() => dbClose(db));
