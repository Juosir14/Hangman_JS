import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

class HangMan extends Component {
  //state = initialState;

  constructor(props) {
    super();

    this.state = {
      letters: [],
      errorMsg: "",
      count: 10,
      randomWord: "",
      currentWord: "",
      won: false,
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

    this.handleClick = this.handleClick.bind(this);
    this.setRandomWord();
  }

  handleClick() {
    let letterError = this.validate();
    if (!letterError) {
      this.count();
      if (this.state.letters.length < 10) {
        this.setState({
          letters: this.state.letters.concat(this.letterTextinput.value),
          errorMsg: null,
        });
      }
    } else {
      if (this.state.letters.length > 9) {
        this.count();
        this.setState({
          errorMsg: null,
        });
      } else {
        this.setState({
          errorMsg: letterError,
        });
      }
    }

    console.log(this.state);
  }

  validate() {
    let letterError = "";
    if (this.letterTextinput.value.length === 0) {
      letterError = "It can not be empty!";
    } else if (
      this.letterTextinput.value.length !== 1 &&
      this.letterTextinput.value !== 0
    ) {
      letterError = "It is to long!";
    } else if (!this.letterTextinput.value.match(/[a-z]/i)) {
      letterError = "It is not a letter!";
    } else if (this.checkLetter()) {
      letterError = "This letter already guessed.";
    } else if (localStorage.getItem("WON") === true) {
      letterError = "You WON!";
    } else {
      //send null (correct)
      return letterError;
    }

    //sends error message
    return letterError;
  }

  checkLetter() {
    for (var i = 0; i < this.state.letters.length; i++) {
      //console.log(this.state.letters[i]);
      if (this.state.letters[i] === this.letterTextinput.value) {
        return true;
      }
    }
    return false;
  }

  count() {
    console.log("Guess added. Left: ", this.state.count);
    this.setState({ count: this.state.count - 1 });
    if (this.state.count < 1 || localStorage.getItem("WON") === true) {
      window.location.reload(false);
    }
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.letterTextinput).focus();
  }

  componentDidUpdate() {
    this.letterTextinput.value = "";
    ReactDOM.findDOMNode(this.letterTextinput).focus();
  }

  render() {
    let letters = this.state.letters.map((letter) => {
      return <li key={letter}>{letter}</li>;
    });
    return (
      <div>
        <h1>HangMan</h1>
        <hr></hr>
        <h3>{this.showRandomWord()}</h3>
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <br />

            <input
              type="text"
              placeholder="Enter a letter"
              ref={(ref) => (this.letterTextinput = ref)}
              className="form-control"
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.errorMsg}
            </div>
          </div>
          <div className="col-md-4">
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={this.handleClick}
            >
              {this.formatButton()}
            </button>
            <span style={{ fontSize: 20 }} className={this.getBadgeClasses()}>
              {this.formatCount()}
            </span>
          </div>
          <br />
        </div>
        <div>
          <div className="col-md-4 col-md-offset-2">
            <ol>{letters}</ol>
          </div>
        </div>
        <br />
        {/*<ListCountInfo count={this.state.letters.length} />*/}
        {/*{this.checkIfWon(this.showRandomWord())}*/}
      </div>
    );
  }

  formatButton() {
    //const { count } = this.state;
    let btn;
    if (this.state.count === 0 || localStorage.getItem("WON") === true) {
      btn = "Restart";
    } else btn = "Guess";
    return btn;
  }

  formatCount() {
    const { count } = this.state;
    let msg = "Moves left: ";
    msg += this.state.count;
    if (this.state.count < 1) {
      return "Lost";
    }
    return msg;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count < 4 ? "warning" : "primary";
    return classes;
  }

  setRandomWord() {
    let rnd = null;
    if (this.state.count === 10 && this.state.randomWord === "") {
      rnd = Math.floor(Math.random() * this.state.words.length);
      localStorage.setItem("randomWord", this.state.words[rnd]);
      console.log("random:", localStorage.getItem("randomWord"));
    }
  }

  showRandomWord() {
    let realWord = localStorage.getItem("randomWord");
    let showingWord = "";
    showingWord = realWord.split("");
    for (var i = 0; i < realWord.length; i++) {
      showingWord[i] = "_";
      for (var j = 0; j < this.state.letters.length; j++) {
        if (this.state.letters[j] === realWord[i]) {
          showingWord[i] = this.state.letters[j];
        }
        if (this.state.count < 1) {
          showingWord[i] = realWord[i];
        }
      }
    }

    return this.checkIfWon(showingWord);
  }

  checkIfWon(text) {
    let isWord = text;
    let count = 0;
    if (this.state.count > 0) {
      for (var i = 0; i < isWord.length; i++) {
        if (isWord[i] == "_") {
          count++;
        }
      }
      console.log("Counter: ", count);
    }
    if (count == 0 && this.state.letters.length > 0) {
      localStorage.setItem("WON", true);
      console.log("Won:", localStorage.getItem("WON"));
      //this.setState({ openModal: true });
      //this.setModal();
      return "WON";
    }

    console.log("If matched", isWord);
    return isWord;
  }

  setModal() {
    if (this.state.openModal === false) {
      return (
        <Modal isOpen={true} ariaHideApp={false}>
          <form>
            <h2>You WON!</h2>
            <button type="subtim">Restart</button>
          </form>
        </Modal>
      );
    }
    return null;
  }

  refreshPage() {
    window.location.reload(false);
  }
  //
}

class ListCountInfo extends React.Component {
  render() {
    if (this.props.count === 0) {
      return (
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <p>List is empty.</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <p>There are {this.props.count} letters on the list</p>
          </div>
        </div>
      );
    }
  }
}

export default HangMan;
