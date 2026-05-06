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

  close() {
    this.db.close();
  }

  async createData(memoData) {
    await this.run(
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, details TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    );
    try {
      await this.run("INSERT INTO memos(details) VALUES(?)", memoData);
      console.log("メモが保存されました");
    } catch (err) {
      if (err instanceof Error && err.code.startsWith("SQLITE_")) {
        console.error(err.message);
      } else {
        throw err;
      }
    }
    await this.close();
    console.log("DBがクローズされました");
  }
}
