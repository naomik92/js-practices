import enquirer from "enquirer";
const { Select } = enquirer;

export class Display {
  async selectAndDisplayDetail(memoList) {
    const message = "Choose a note you want to see:";
    const selectedMemo = await this.selectMemo(message, memoList);
    console.log(selectedMemo.detail);
  }

  async selectMemoIdToDelete(memoList) {
    const message = "Choose a memo you want to delete:";
    const selectedMemo = await this.selectMemo(message, memoList);
    return selectedMemo.id;
  }

  async selectMemo(message, memoList) {
    const prompt = new Select({
      message: message,
      choices: memoList,
    });

    return prompt.run().then((answer) => {
      const indexOfAnswer = prompt.choices.findIndex((memo) => {
        return memo.title === answer;
      });
      return prompt.choices[indexOfAnswer];
    });
  }
}
