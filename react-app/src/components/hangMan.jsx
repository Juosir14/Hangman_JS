import React, { Component } from "react";
import ReactDOM from "react-dom";
import FormatButton from "./FormatButton";
import FormatCount from "./FormatCount";
import ListCountInfo from "./ListCountInfo";
import ShowRandomWord from "./ShowRandomWord";
import MainCounting from "./MainCounting";

class HangMan extends Component {
  //state = initialState;

  constructor(props) {
    super();

    this.state = {
      errorMsg: "",
    };

    this.handleClick = this.handleClick.bind(this);

    localStorage.setItem("WON", "No");

    //add Main counting class for processing here
    this.mainCounting = new MainCounting();

    //after page is loading, 1st thing to do is to generate random word
    this.mainCounting.setRandomWord();
  }

  handleClick() {
    //setting error message if input was incorrect
    var letterError = this.mainCounting.validate(this.letterTextinput.value);

    //if input correct (letterError = null) subtract count and add letter to letters list
    if (!letterError) {
      this.mainCounting.counts();
      if (this.mainCounting.state.letters.length < 11) {
        this.setState({
          errorMsg: null,
        });
      }
    } else {
      //if incorrect, check if it is lost or won (for restart page)
      if (
        this.mainCounting.state.letters.length > 9 ||
        localStorage.getItem("WON") === "WON"
      ) {
        this.mainCounting.counts();
        this.setState({
          errorMsg: null,
        });
      } else {
        this.setState({
          errorMsg: letterError,
        });
      }
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
    let letters = this.mainCounting.state.letters.map((letter) => {
      return <li key={letter}>{letter}</li>;
    });
    return (
      <div>
        <h1>HangMan</h1>
        <hr></hr>
        <h3 data-testid="RandomWord">
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
            <div data-testid="error" style={{ fontSize: 12, color: "red" }}>
              {this.state.errorMsg}
            </div>
          </div>
          <div className="col-md-4">
            <br />
            <button
              data-testid="button"
              type="button"
              className="btn btn-success"
              onClick={this.handleClick}
            >
              {<FormatButton count={this.mainCounting.state.count} />}
            </button>
            <span
              data-testid="badges"
              style={{ fontSize: 20 }}
              className={this.getBadgeClasses()}
            >
              {<FormatCount count={this.mainCounting.state.count} />}
            </span>
          </div>
          <br />
        </div>
        <div>
          <div data-testid="letters" className="col-md-4 col-md-offset-2">
            <ol>{letters}</ol>
          </div>
        </div>
        <br />
        <div data-testid="list">
          {<ListCountInfo count={this.mainCounting.state.letters.length} />}
        </div>
      </div>
    );
  }

  //decorates Moves left:
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
