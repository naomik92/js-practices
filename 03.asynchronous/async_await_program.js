#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
const db = new sqlite3.Database(":memory:");

function dbRun(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

function dbAll(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function dbClose(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function asyncPractice() {
  await dbRun(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const result1 = await dbRun(db, "INSERT INTO books(title) VALUES('n-book')");
  console.log(result1);
  const result2 = await dbAll(db, "SELECT * FROM books");
  console.log(result2);
  await dbRun(db, "DROP TABLE books");

  await timers.setTimeout(100);

  await dbRun(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  await dbRun(db, "INSERT INTO books(title) VALUES('n-book')");
  try {
    await dbRun(db, "INSERT INTO books(title) VALUES('n-book')");
  } catch (err) {
    if (err.message.includes("SQLITE_CONSTRAINT")) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
  try {
    await dbAll(db, "SELECT * FROM book");
  } catch (err) {
    if (err.message.includes("SQLITE_ERROR")) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
  await dbRun(db, "DROP TABLE books");
  await dbClose(db);
}

asyncPractice();
