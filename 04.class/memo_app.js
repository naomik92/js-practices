import * as readline from "node:readline";
import { Database } from "./database.js";
import { Display } from "./display.js";

export class MemoApp {
  constructor() {
    this.display = new Display();
  }

  static async create() {
    const memoApp = new MemoApp();
    memoApp.db = new Database();
    await memoApp.db.createTable();
    return memoApp;
  }

  readMemoDetail() {
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
    if (args.includes("-l")) {
      try {
        const memoList = await this.db.readAllMemos();
        console.log(memoList.map((memo) => memo.title).join("\n"));
      } catch (err) {
        console.log("【The memolists was failed to read.】");
        console.error(err.message);
      }
    } else if (args.includes("-r")) {
      try {
        const memoList = await this.db.readAllMemos();
        await this.display.selectAndDisplayDetail(memoList);
      } catch (err) {
        console.log("【The memos was failed to read.】");
        console.error(err.message);
      }
    } else if (args.includes("-d")) {
      try {
        const memoList = await this.db.readAllMemos();
        const memoId = await this.display.selectMemoIdToDelete(memoList);
        await this.db.deleteMemo(memoId);
        console.log("【The memo was successfully deleted.】");
      } catch (err) {
        console.log("【The memo was failed to delete.】");
        console.error(err.message);
      }
    } else if (args.length === 0) {
      const memoDetail = await this.readMemoDetail();
      const memoTitle = memoDetail.split("\n")[0];
      try {
        await this.db.createMemo(memoTitle, memoDetail);
        console.log("【The memo was successfully created.】");
      } catch (err) {
        console.log("【The memo was failed to save.】");
        console.error(err.message);
      }
    } else {
      console.log("【Invalid option entered.】");
    }
  }

  close() {
    this.db.close();
  }
}
