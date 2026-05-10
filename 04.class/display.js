import { Database } from "./database.js";

export class Display {
  constructor() {
    this.db = new Database("db/memos.db");
  }

  async buildDetails() {
    const allData = await this.db.readAllData();
    return allData.map((obj) => obj.details);
  }

  async buildTitles() {
    const allData = await this.buildDetails();
    return allData.map((str) => str.split("\n")[0]);
  }

  async buildMemoList() {
    const titles = await this.buildTitles();
    const details = await this.buildDetails();
    return titles.map((title, index) => {
      return {
        title: title,
        detail: details[index],
      };
    });
  }
}
