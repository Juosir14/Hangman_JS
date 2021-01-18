import React from "react";

class HandleLetter extends React.Component {
  //sending data which are required for class's function/components/methods
  constructor(letters, letterTextinput) {
    super();
    this.letters = letters;
    this.letterTextinput = letterTextinput;
  }

  //assing all possible warning for incorrect inputs
  //return null if everything goes fine
  validate() {
    let letterError = "";
    if (this.letterTextinput.length === 0) {
      letterError = "It can not be empty!";
    } else if (
      this.letterTextinput.length !== 1 &&
      this.letterTextinput !== 0
    ) {
      letterError = "It is to long!";
    } else if (!this.letterTextinput.match(/[a-z]/i)) {
      letterError = "It is not a letter!";
    } else if (this.checkLetter()) {
      letterError = "This letter already guessed.";
    }
    if (localStorage.getItem("WON") === "WON") {
      letterError = "You WON!";
    }
    //console.log("lettereeror", letterError);

    //sends error message or null
    return letterError;
  }

  //check if client's written character is a letter
  checkLetter() {
    for (var i = 0; i < this.letters.length; i++) {
      //console.log(this.letters[i]);
      if (this.letters[i] === this.letterTextinput.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  render() {
    return this.validate();
  }
}
export default HandleLetter;
