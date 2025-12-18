#!/usr/bin/env node

import sqlite3Module from "sqlite3";
const sqlite3 = sqlite3Module.verbose();
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run("INSERT INTO books(title) VALUES('n-book')", function () {
      console.log(this.lastID);
      db.all("SELECT * FROM books", function (err, row) {
        console.log(row);
        db.run("DROP TABLE books");
      });
    });
  },
);
