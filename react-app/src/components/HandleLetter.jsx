import React from "react";

class HandleLetter extends React.Component {
  constructor(count, letters, letterTextinput) {
    super();
    this.count = count;
    this.letters = letters;
    this.letterTextinput = letterTextinput;
  }

  validate() {
    //console.log("this.props.letters", this.letters);
    //console.log("this.letterTextinput.value", this.letterTextinput.value);
    //console.log("this.count", this.count);
    //console.log("this.letterTextinput ====", this.letterTextinput);
    //
    //this.letterTextinput = "hello";

    //console.log("this.letterTextinput ====", this.letterTextinput);
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
    console.log("lettereeror", letterError);
    //sends error message or null
    return letterError;
  }

  checkLetter() {
    for (var i = 0; i < this.letters.length; i++) {
      //console.log(this.letters[i]);
      if (this.letters[i] === this.letterTextinput) {
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
