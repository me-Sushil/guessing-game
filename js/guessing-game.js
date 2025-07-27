/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".
In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
  let m = array.length;
  while (m > 0) {
    let i = Math.floor(Math.random() * m);
    m--;

    let temp = array[m];
    array[m] = array[i];
    array[i] = temp;
  }
  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    if (this.playersGuess < this.winningNumber) {
      return true;
    } else {
      return false;
    }
  }

  playersGuessSubmission(num) {
    if (typeof num !== "number" || isNaN(num) || num < 1 || num > 100) {
      throw "That is an invalid guess.";
    }
    this.playersGuess = num;
    return this.checkGuess(num);
  }

  checkGuess(num) {
    if (num === this.winningNumber) {
      console.log(this.winningNumber);
      return "You Win!";
    }

    if (this.pastGuesses.includes(num)) {
      return "You have already guessed that number.";
    }
    this.pastGuesses.push(num);

    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }

    let diff = this.difference();

    if (diff < 10) {
      return "You're burning up!";
    } else if (diff < 25) {
      return "You're lukewarm.";
    } else if (diff < 50) {
      return "You're a bit chilly.";
    } else if (diff < 100) {
      return "You're ice cold!";
    }
  }

  provideHint() {
    const hintArray = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];

    return shuffle(hintArray);
  }
}

function newGame() {
  return new Game();
}

let game = new Game();

let mainDiv = document.getElementById("mainDiv");
let header = document.getElementById("header");
let h2Guess = document.getElementById("h2");
let pastGusArray = document.querySelectorAll(".preGusses");
let h4remine = document.getElementById("remineGuss");
let buttons = document.getElementById("buttonSection");
let inputFild = document.getElementById("input");
let submit = document.getElementById("submit");
let reset = document.getElementById("reset");
let hint = document.getElementById("hint");

buttons.addEventListener("click", (event) => {
  if (event.target.id === "submit") {
    let num = parseInt(inputFild.value);
    inputFild.value = null;
    try {
      let result = game.playersGuessSubmission(num);
      if (result.includes("You Win!")) {
        h2Guess.innerText = `🏆👏🎉🎊 Congratulations! ${result} 🎉🎊💯🔥`;
      } else {
        h2Guess.innerText = result;
      }

      let guess = game.pastGuesses;
      guess.forEach((num, idx) => {
        console.log(num);
        if (pastGusArray[idx]) {
          pastGusArray[idx].innerText = num;
        }
      });
    } catch (error) {
      h2Guess.innerText = error;
    }
  }

  if (event.target.id === "reset") {
    game.newGame();
  }
  if (event.target.id === "hint") {
    let hint = game.provideHint();
    h2Guess.innerText = `The winning number is either ${hint[0]}, ${hint[1]}, or ${hint[2]},`;
  }
});
