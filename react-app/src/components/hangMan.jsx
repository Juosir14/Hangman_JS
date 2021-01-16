import React, { Component } from "react";
import ReactDOM from "react-dom";

class HangMan extends Component {
  //state = initialState;

  constructor(props) {
    super();

    this.state = {
      people: [],
      errorMsg: "",
      count: 10,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let letterError = this.validate();
    if (!letterError) {
      this.count();
      if (this.state.people.length < 10) {
        this.setState({
          people: this.state.people.concat(this.letterTextinput.value),
          errorMsg: null,
        });
      }
    } else {
      if (this.state.people.length > 9) {
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
    } else {
      //siuncia, kad good
      return letterError;
    }

    //siuncia errora
    return letterError;
  }

  checkLetter() {
    for (var i = 0; i < this.state.people.length; i++) {
      //console.log(this.state.people[i]);
      if (this.state.people[i] === this.letterTextinput.value) {
        return true;
      }
    }
    return false;
  }

  count() {
    console.log("Guess added. Left: ", this.state.count);
    this.setState({ count: this.state.count - 1 });
    if (this.state.count < 1) {
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
    let letters = this.state.people.map((letter) => {
      return <li key={letter}>{letter}</li>;
    });
    return (
      <div>
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
        <ListCountInfo count={this.state.people.length} />
      </div>
    );
  }

  formatButton() {
    //const { count } = this.state;
    let btn;
    if (this.state.count === 0) {
      btn = "Restart";
    } else btn = "Guess";
    return btn;
  }

  formatCount() {
    const { count } = this.state;
    //const zer = <h1>Zero</h1>;
    let zer = "Moves left: ";
    zer += this.state.count;
    if (this.state.count < 1) {
      return "Lost";
    }
    return zer;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count < 4 ? "warning" : "primary";
    return classes;
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
