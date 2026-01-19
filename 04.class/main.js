#!/usr/bin/env node

import enquirer from "enquirer";
const { Select } = enquirer;

class Main {
  display() {
    const args = process.argv.slice(2);

    if (args.includes("-l")) {
      const memos = [
          { name: "メモその1", value: "ほうこく" },
          { name: "メモその2", value: "れんらく" },
          { name: "メモその3", value: "そうだん" },        
      ]
      memos.forEach(currentMemo => {
        console.log(currentMemo.name);
      });
    } else if (args.includes("-r")) {
      const prompt = new Select({
        message: "Choose a note you want to see:",
        choices: [
          { name: "メモその1", value: "ほうこく" },
          { name: "メモその2", value: "れんらく" },
          { name: "メモその3", value: "そうだん" },
        ],
      });

      prompt
        .run()
        .then((answer) => {
          const indexOfAnswer = prompt.choices.findIndex((obj) => {
            return obj.name === answer;
          });
          console.log(prompt.choices[indexOfAnswer].value);
        })
        .catch(console.error);
    } else if (args.includes("-d")) {
      console.log("削除されました");
    } else {
      console.log("メモを追加します");
    }
  }
}

const main = new Main;
main.display();
