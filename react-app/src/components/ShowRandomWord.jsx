import React from "react";
class ShowRandomWord extends React.Component {
  //assign correct guesed letters for true value, otherwise - '_'
  showRandomWord() {
    let realWord = localStorage.getItem("randomWord");
    let showingWord = "";
    showingWord = realWord.split("");
    for (var i = 0; i < realWord.length; i++) {
      showingWord[i] = "_";
      for (var j = 0; j < this.props.letters.length; j++) {
        if (this.props.letters[j] === realWord[i]) {
          showingWord[i] = this.props.letters[j];
        }
      }
    }
    var normalWord = showingWord.join("");
    localStorage.setItem("Word", normalWord);
    if (this.checkIfWon(normalWord) === "WON") {
      return "WON";
    }
    if (this.props.count < 1) {
      normalWord = realWord;
    }
    return this.checkIfWon(normalWord);
  }

  //check if client won. Going throw all showing Word letters. If there are not any _ - client won
  checkIfWon(text) {
    let isWord = text;
    var county = 0;
    if (this.props.count >= 0) {
      for (var i = 0; i < isWord.length; i++) {
        if (isWord[i] === "_") {
          county++;
        }
      }
      if (county === 0 && isWord === localStorage.getItem("Word")) {
        if (this.props.letters.length > 0) {
          localStorage.setItem("WON", "WON");
          //instead of all word return Won message
          return "WON";
        }
      }
    }
    //return showing word with '_'
    return isWord;
  }
  render() {
    return this.showRandomWord();
  }
}

export default ShowRandomWord;
