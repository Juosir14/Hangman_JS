import React, { Component } from "react";
import ReactDOM from "react-dom";
import FormatButton from "./FormatButton";
import FormatCount from "./FormatCount";
import ListCountInfo from "./ListCountInfo";
import ShowRandomWord from "./ShowRandomWord";
//import HandleLetter from "./HandleLetter";
//import GetBadgeClasses from "./GetBadgeClasses";
import MainCounting from "./MainCounting";

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

    localStorage.setItem("WON", "No");
    this.mainCounting = new MainCounting();
    this.mainCounting.setRandomWord();
  }

  handleClick() {
    var letterError = this.mainCounting.validate(this.letterTextinput.value);

    console.log("aaaaa--", this.mainCounting.state.count);

    if (!letterError) {
      this.mainCounting.counts();
      if (this.mainCounting.state.letters.length < 10) {
        this.setState({
          errorMsg: null,
        });
      }
    } else {
      if (
        this.mainCounting.state.letters.length > 9 ||
        localStorage.getItem("WON") === "WON"
      ) {
        this.mainCounting.counts();
        // this.setState({
        //   errorMsg: null,
        // });
      } else {
        this.setState({
          errorMsg: letterError,
        });
      }
    }

    //console.log(this.state);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.letterTextinput).focus();
  }

  componentDidUpdate() {
    this.letterTextinput.value = "";
    ReactDOM.findDOMNode(this.letterTextinput).focus();
  }

  render() {
    let letters = this.mainCounting.state.letters.map((letter) => {
      return <li key={letter}>{letter}</li>;
    });
    return (
      <div>
        <h1>HangMan</h1>
        <hr></hr>
        <h3>
          {
            <ShowRandomWord
              count={this.mainCounting.state.count}
              letters={this.mainCounting.state.letters}
            />
          }
        </h3>
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
              {<FormatButton count={this.mainCounting.state.count} />}
            </button>
            <span style={{ fontSize: 20 }} className={this.getBadgeClasses()}>
              {<FormatCount count={this.mainCounting.state.count} />}
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
        {<ListCountInfo count={this.mainCounting.state.letters.length} />}
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes +=
      this.mainCounting.state.count < 1
        ? "danger"
        : this.mainCounting.state.count < 4
        ? "warning"
        : "primary";
    return classes;
  }
}

export default HangMan;
