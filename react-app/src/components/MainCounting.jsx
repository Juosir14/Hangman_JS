import React from "react";

import ReactDOM from "react-dom";
import HandleLetter from "./HandleLetter";

//main class, where are all counting processes
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
  }

  validate(letter) {
    const handlerLettter = new HandleLetter(this.state.letters, letter);
    var letterError = handlerLettter.validate();
    if (!letterError) {
      //this.counts();
      if (this.state.letters.length < 10) {
        this.state.letters = this.state.letters.concat(letter.toLowerCase());
        this.state.errorMsg = null;
      }
    } else {
      if (
        this.state.letters.length > 9 ||
        localStorage.getItem("WON") === "WON"
      ) {
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

  //counts going to subract after correct input is given
  counts() {
    //this.setState({ count: this.state.count - 1 }); //-----------somehow setState does not work there, so decided to do manually
    this.state.count = this.state.count - 1;
    if (this.state.count < 0 || localStorage.getItem("WON") === "WON") {
      window.location.reload(false);
    }
  }

  render() {
    return this.validate();
  }

  //at the start, set random word for guessing
  setRandomWord() {
    let rnd = null;
    if (this.state.count === 10 && this.state.randomWord === "") {
      rnd = Math.floor(Math.random() * this.state.words.length);
      localStorage.setItem("randomWord", this.state.words[rnd]);
      //for testing purposes - F12 -> Console - to get the random word. (also going to this leave in final version)
      console.log("random:", localStorage.getItem("randomWord"));
    }
  }
}
export default MainCounting;
