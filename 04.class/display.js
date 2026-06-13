import enquirer from "enquirer";
const { Select } = enquirer;

export class Display {
  async selectAndDisplayDetail(memoList) {
    const prompt = new Select({
      message: "Choose a note you want to see:",
      choices: memoList,
    });

    prompt
      .run()
      .then((answer) => {
        const indexOfAnswer = prompt.choices.findIndex((memo) => {
          return memo.title === answer;
        });
        console.log(prompt.choices[indexOfAnswer].detail);
      })
      .catch(console.error);
  }

  async selectMemoIdToDelete(memoList) {
    const prompt = new Select({
      message: "Choose a memo you want to delete:",
      choices: memoList,
    });

    return prompt
      .run()
      .then((answer) => {
        const indexOfAnswer = prompt.choices.findIndex((memo) => {
          return memo.title === answer;
        });
        return prompt.choices[indexOfAnswer].id;
      })
      .catch(console.error);
  }
}
