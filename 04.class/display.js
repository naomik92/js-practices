import enquirer from "enquirer";
const { Select } = enquirer;
import { Database } from "./database.js";

export class Display {
  constructor() {
    this.db = new Database("db/memos.db");
  }

  async buildDetails() {
    const allData = await this.db.readAllData();
    return allData.map((obj) => {
      return {
        title: obj.detail.split("\n")[0],
        detail: obj.detail,
        created_time: obj.created_at,
      };
    });
  }

  async buildSelectPrompt() {
    const memoList = await this.buildDetails();
    const prompt = new Select({
      message: "Choose a note you want to see:",
      choices: memoList,
    });

    prompt
      .run()
      .then((answer) => {
        const indexOfAnswer = prompt.choices.findIndex((obj) => {
          return obj.title === answer;
        });
        console.log(prompt.choices[indexOfAnswer].detail);
      })
      .catch(console.error);
  }
}
