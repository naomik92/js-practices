import { Database } from "./database.js";
import { Display } from "./display.js";

export class MemoApp {
  constructor() {
    this.db = new Database("db/memos.db");
    this.display = new Display();
  }

  run(args) {
    if (args.includes("-l")) {
      this.display.allMemo().then((result) => {
        console.log(result);
      });
    } else {
      this.db.createData(args);
    }
  }
}
