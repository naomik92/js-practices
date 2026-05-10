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
      console.log(
        "【メモを登録します。入力が終わったら改行後にCtrl+Dを押してください。】",
      );
      const lines = [];

      rl.on("line", (line) => {
        lines.push(line);
      });

      rl.on("close", () => {
        resolve(lines.join("\n"));
      });
    });
  }

  run(args) {
    if (args.includes("-l")) {
      this.display.buildDetails().then((result) => {
        console.log(result);
      });
    } else if (args.includes("-r")) {
      this.display.buildMemoList().then((result) => {
        console.log(result);
      });
    } else {
      this.organizeMemo().then((result) => {
        this.db.createData(result);
      });
    }
  }
}
