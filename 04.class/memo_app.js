import * as readline from "node:readline";
import { Database } from "./database.js";
import { Display } from "./display.js";

export class MemoApp {
  constructor() {
    this.db = new Database("db/memos.db");
    this.display = new Display();
  }

  organizeMemo() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      const lines = [];

      rl.on("line", (line) => {
        lines.push(line);
      });

      rl.on("close", () => {
        resolve(lines.join("\n"));
      });
    });
  }

  async run(args) {
    try {
      if (args.includes("-l")) {
        const result = await this.display.buildDetails();
        console.log(result.map((obj) => obj.title).join("\n"));
      } else if (args.includes("-r")) {
        this.display.buildSelectPrompt();
      } else if (args.includes("-d")) {
        const memoId = await this.display.buildDeletePrompt();
        await this.db.deleteData(memoId);
      } else if (args.length === 0) {
        const memoDetail = await this.organizeMemo();
        await this.db.createData(memoDetail);
      } else {
        console.log("【Invalid option entered.】");
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
