import { Database } from "./database.js";

export class Display {
  constructor() {
    this.db = new Database("db/memos.db");
  }

  async allMemo() {
    const allData = await this.db.readAllData();
    return allData.map((object) => object.details);
  }
}
