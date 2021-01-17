import React from "react";
class ShowRandomWord extends React.Component {
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
    //console.log("showing word", normalWord);
    if (this.checkIfWon(normalWord) === "WON") {
      //console.log("showing wordaaa", normalWord);
      return "WON";
    }
    if (this.props.count < 1) {
      normalWord = realWord;
    }
    return this.checkIfWon(normalWord);
  }

  checkIfWon(text) {
    let isWord = text;
    //console.log("Take a look into text:", isWord);
    var county = 0;
    if (this.props.count >= 0) {
      for (var i = 0; i < isWord.length; i++) {
        if (isWord[i] === "_") {
          county++;
        }
      }
      //console.log("iword: ", isWord);
      //console.log("localStorage.getItem(): ", localStorage.getItem("Word"));
      if (county === 0 && isWord === localStorage.getItem("Word")) {
        console.log("Counter after if xdd: ", county);
        if (this.props.letters.length > 0) {
          localStorage.setItem("WON", "WON");
          //console.log("Won:", localStorage.getItem("WON"));
          return "WON";
        }
      }
    }

    //console.log("If matched", isWord);
    return isWord;
  }
  render() {
    return this.showRandomWord();
  }
}

export default ShowRandomWord;
