import Questions from "../questions";
export const checkSkip = (action: string, questionNumber: any, age:string) => {
  let prevNumber = 0,
    nextNumber = 0,
    currentNumber = 0,
    lastQuestion = Questions.length - 1;
  if (action === "NEXT") {
    nextNumber = questionNumber + 2;
    currentNumber = questionNumber + 1;
    prevNumber = questionNumber;
  }
  if (action === "NEXT" && questionNumber === 2 && Number(age) > 25) {
    nextNumber = questionNumber + 3;
    currentNumber = questionNumber + 2;
    prevNumber = questionNumber + 1;
    lastQuestion --
  }

  if (action === "PREV") {
    nextNumber = questionNumber;
    currentNumber = questionNumber - 1;
    prevNumber = questionNumber - 2;
  }

  if (action === "PREV" && questionNumber === 4 && Number(age) > 25) {
    nextNumber = questionNumber - 1;
    currentNumber = questionNumber - 2;
    prevNumber = questionNumber - 3;
  }
  return {
    questionNumber: currentNumber,
    currentQuestion: Questions[currentNumber],
    prevQuestion: Questions[prevNumber],
    nextQuestion: Questions[nextNumber],
    lastQuestion
  };
};
