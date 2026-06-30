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
    await this.run(
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, detail TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    );
  }

  async createMemo(memoTitle, memoDetail) {
    await this.run("INSERT INTO memos(title, detail) VALUES(?, ?)", [
      memoTitle,
      memoDetail,
    ]);
  }

  async readAllMemos() {
    return await this.all("SELECT * FROM memos ORDER BY id ASC");
  }

  async deleteMemo(memoId) {
    await this.run("DELETE FROM memos WHERE id = ?", memoId);
  }
}
