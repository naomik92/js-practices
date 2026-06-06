import enquirer from "enquirer";
const { Select } = enquirer;
import { Database } from "./database.js";

export class Display {
  constructor() {
    this.db = new Database("db/memos.db");
  }

  async buildMemoList() {
    const allData = await this.db.readAllData();
    return allData.map((obj) => {
      return {
        id: obj.id,
        title: obj.detail.split("\n")[0],
        detail: obj.detail,
      };
    });
  }

  async buildSelectPrompt() {
    const memoList = await this.buildMemoList();
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

  async buildDeletePrompt() {
    const memoList = await this.buildMemoList();
    const prompt = new Select({
      message: "Choose a memo you want to delete:",
      choices: memoList,
    });

    return prompt
      .run()
      .then((answer) => {
        const indexOfAnswer = prompt.choices.findIndex((obj) => {
          return obj.title === answer;
        });
        return prompt.choices[indexOfAnswer].id;
      })
      .catch(console.error);
  }
}
