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

class Game{
    constructor(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference(){
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower(){
        if(this.playersGuess < this.winningNumber){
            return true;
        }else{
            return false;
        }
    }
    
}