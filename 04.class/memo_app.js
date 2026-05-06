import { Database } from "./database.js";

export class MemoApp {
  constructor() {
    this.db = new Database("db/memos.db");
  }

  async addMemo(memoData) {
    await this.db.createData(memoData);
  }
}
