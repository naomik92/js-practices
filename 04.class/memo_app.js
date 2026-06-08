import * as readline from "node:readline";
import { Database } from "./database.js";
import { Display } from "./display.js";

export class MemoApp {
  constructor() {
    this.db = new Database("db/memos.db");
    this.display = new Display();
  }

  async create() {
    await this.db.createTable();
  }

  createMemoDetail() {
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
        const memoList = await this.db.readAllMemos();
        console.log(memoList.map((memo) => memo.title).join("\n"));
      } else if (args.includes("-r")) {
        this.display.selectAndDisplayDetail();
      } else if (args.includes("-d")) {
        const memoId = await this.display.selectMemoIdToDelete();
        await this.db.deleteMemo(memoId);
        console.log("【The memo was successfully deleted.】");
      } else if (args.length === 0) {
        const memoDetail = await this.createMemoDetail();
        const memoTitle = memoDetail.split("\n")[0];
        await this.db.createMemo(memoTitle, memoDetail);
        console.log("【The memo was successfully created.】");
      } else {
        console.log("【Invalid option entered.】");
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
