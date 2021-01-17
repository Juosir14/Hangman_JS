import React from "react";

import ReactDOM from "react-dom";
import HandleLetter from "./HandleLetter";

class MainCounting extends React.Component {
  constructor(props) {
    super();

    this.state = {
      letters: [],
      errorMsg: "",
      count: 10,
      randomWord: "",
      currentWord: "",
      won: false,
      letterTextinput: null,
      words: [
        "gregarious",
        "initiative",
        "absorption",
        "opposition",
        "atmosphere",
        "registration",
        "pedestrian",
        "concentrate",
        "entitlement",
        "background",
        "publication",
        "hospitality",
        "assessment",
        "vegetation",
        "incongruous",
        "partnership",
        "leadership",
        "conference",
        "exaggerate",
        "celebration",
        "constitutional",
        "experiment",
        "identification",
        "motivation",
        "simplicity",
        "intervention",
        "jurisdiction",
        "plagiarize",
        "contribution",
        "accessible",
        "instruction",
        "federation",
        "negotiation",
        "photograph",
        "constituency",
        "distribute",
        "excitement",
        "possession",
        "psychology",
        "basketball",
        "artificial",
        "revolutionary",
        "conservation",
        "mechanical",
        "domination",
        "transparent",
        "acquaintance",
        "experience",
        "application",
        "conglomerate",
      ],
    };
    //console.log("inputa:", inputa);
    //this.letterTextinput = inputa;
    //console.log("letterTextinput:", this.letterTextinput);
  }

  validate(letter) {
    console.log("letter----", letter);
    const handlerLettter = new HandleLetter(
      this.state.count,
      this.state.letters,
      letter
    );
    console.log("count mainCOUNTINGE:", this.state.count);
    var letterError = handlerLettter.validate();
    if (!letterError) {
      //this.counts();
      if (this.state.letters.length < 10) {
        this.state.letters = this.state.letters.concat(letter.toLowerCase());
        this.state.errorMsg = null;
      }
      console.log("Im in !letter -", this.state.letters);
    } else {
      if (
        this.state.letters.length > 9 ||
        localStorage.getItem("WON") === "WON"
      ) {
        console.log("Im in elseeeeeee");
        //this.counts();
        this.state.errorMsg = null;
      } else {
        this.state.errorMsg = letterError;
      }
    }
    return letterError;
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.letterTextinput).focus();
  }

  componentDidUpdate() {
    this.letterTextinput.value = "";
    ReactDOM.findDOMNode(this.letterTextinput).focus();
  }

  ifLost() {
    if (this.state.count === 0 && !(localStorage.getItem("WON") === "WON")) {
      localStorage.setItem("LOST", "LOST");
      return true;
    } else return false;
  }

  counts() {
    console.log("Guess added. Left: ", this.state.count);
    //this.setState({ count: this.state.count - 1 });
    this.state.count = this.state.count - 1;
    console.log("Guess after substraction: ", this.state.count);
    if (this.state.count < 0 || localStorage.getItem("WON") === "WON") {
      window.location.reload(false);
    }
  }

  render() {
    return this.validate();
  }

  setRandomWord() {
    let rnd = null;
    if (this.state.count === 10 && this.state.randomWord === "") {
      rnd = Math.floor(Math.random() * this.state.words.length);
      localStorage.setItem("randomWord", this.state.words[rnd]);
      console.log("random:", localStorage.getItem("randomWord"));
    }
  }
}
export default MainCounting;
