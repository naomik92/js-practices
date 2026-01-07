#!/usr/bin/env node

import sqlite3 from "sqlite3";
import timers from "timers/promises";
const db = new sqlite3.Database(":memory:");

function dbRun(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err.message);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

function dbAll(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

function dbClose() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err.message);
      } else {
        resolve();
      }
    });
  });
}

async function promisePractice() {
  dbRun(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      return dbRun("INSERT INTO books(title) VALUES('n-book')");
    })
    .then((result) => {
      console.log(result);
      return dbAll("SELECT * FROM books");
    })
    .then((result) => {
      console.log(result);
      return dbRun("DROP TABLE books");
    });

  await timers.setTimeout(100);

  dbRun(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      return dbRun("INSERT INTO books(title) VALUES('n-book')");
    })
    .then(() => {
      return dbRun("INSERT INTO books(title) VALUES('n-book')");
    })
    .catch((result) => {
      console.log(result);
      return dbAll("SELECT * FROM book");
    })
    .catch((result) => {
      console.log(result);
      return dbRun("DROP TABLE books");
    });
}

async function asyncPractice() {
  await dbRun(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const result1 = await dbRun("INSERT INTO books(title) VALUES('n-book')");
  console.log(result1);
  const result2 = await dbAll("SELECT * FROM books");
  console.log(result2);
  await dbRun("DROP TABLE books");

  await timers.setTimeout(100);

  await dbRun(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  await dbRun("INSERT INTO books(title) VALUES('n-book')");
  try {
    await dbRun("INSERT INTO books(title) VALUES('n-book')");
  } catch (err) {
    console.log(err);
  }
  try {
    await dbAll("SELECT * FROM book");
  } catch (err) {
    console.log(err);
  }
  await dbRun("DROP TABLE books");
}

async function main() {
  console.log("プラクティス「2. Promise」の実行結果です");
  await promisePractice();
  await timers.setTimeout(1000);
  await console.log("---\nプラクティス「3. async / await」の実行結果です");
  await asyncPractice();
  await dbClose();
}

main();
