import sqlite3 from "sqlite3";

export class Database {
  constructor() {
    this.db = new sqlite3.Database("db/memos.db");
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  all(sql) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    this.db.close();
  }

  async createTable() {
    try {
      await this.run(
        "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, detail TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
      );
    } catch (err) {
      if (err instanceof Error && err.code.startsWith("SQLITE_")) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
  }

  async createMemo(memoTitle, memoDetail) {
    try {
      await this.run("INSERT INTO memos(title, detail) VALUES(?, ?)", [
        memoTitle,
        memoDetail,
      ]);
    } catch (err) {
      if (err instanceof Error && err.code.startsWith("SQLITE_")) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
  }

  async readAllMemos() {
    try {
      return await this.all("SELECT * FROM memos ORDER BY id ASC");
    } catch (err) {
      if (err instanceof Error && err.code.startsWith("SQLITE_")) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
  }

  async deleteMemo(memoId) {
    try {
      await this.run("DELETE FROM memos WHERE id = ?", memoId);
    } catch (err) {
      if (err instanceof Error && err.code.startsWith("SQLITE_")) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
  }
}
