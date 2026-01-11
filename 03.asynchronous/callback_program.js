#!/usr/bin/env node

import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books(title) VALUES('n-book')", function () {
      console.log(this.lastID);
      db.all("SELECT * FROM books", (err, rows) => {
        console.log(rows);
        db.run("DROP TABLE books");
      });
    });
  },
);

await timers.setTimeout(100);

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books(title) VALUES('n-book')", () => {
      db.run("INSERT INTO books(title) VALUES('n-book')", (err) => {
        console.error(err.message);
        db.all("SELECT * FROM book", (err) => {
          console.error(err.message);
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      });
    });
  },
);
