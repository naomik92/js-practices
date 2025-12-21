#!/usr/bin/env node

import sqlite3Module from "sqlite3";
import timers from "timers/promises";
const sqlite3 = sqlite3Module.verbose();
const db = new sqlite3.Database(":memory:");

async function promisePractice() {
  function dbRun(sql) {
    return new Promise(function (resolve, reject) {
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
    return new Promise(function (resolve, reject) {
      db.all(sql, function (err, rows) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  }

  dbRun(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(function () {
      return dbRun("INSERT INTO books(title) VALUES('n-book')"); //returnはかならずつけること！なぜかはわからない
    })
    .then(function (result) {
      console.log(result);
      return dbAll("SELECT * FROM books");
    })
    .then(function (result) {
      console.log(result);
      return dbRun("DROP TABLE books");
    });

  await timers.setTimeout(100);

  dbRun(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(function () {
      return dbRun("INSERT INTO books(title) VALUES('n-book')");
    })
    .then(function () {
      return dbRun("INSERT INTO books(title) VALUES('n-book')");
    })
    .catch(function (result) {
      console.log(result);
      return dbAll("SELECT * FROM book");
    })
    .catch(function (result) {
      console.log(result);
      return dbRun("DROP TABLE books");
    });
}

promisePractice();
