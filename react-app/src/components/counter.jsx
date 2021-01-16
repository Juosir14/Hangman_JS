import React, { Component } from "react";

const initialState = {
  count: 10,
  letters: [],
  example: "a",
  letterError: "",
  //image: "https://picsum.photos/200",
  //address:{
  //    street: ''
  //}
};

class Counter extends Component {
  state = initialState;

  //constructor() {
  // super();
  //method handleIncrement will always reference to current object/function/method
  //  this.handleIncrement = this.handleIncrement.bind(this);
  //}

  styles = {
    fontSize: 15,
    fontWeight: "bold",
  };

  renderLetters() {
    if (this.state.letters.length === 0)
      return <h4>It was not guessed yet.</h4>;
    return (
      <h4>
        Guessed letters:
        <div>
          {this.state.letters.map((tag) => (
            <a key={tag}> {tag} ,</a>
          ))}
        </div>
      </h4>
    );
  }

  handleSubmit = () => {
    //event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear form
      //this.setState(initialState);
      return true;
    }
    return false;
  };

  validate = () => {
    let letterError = "";

    if (
      !this.state.example.match(/[a-z]/i) ||
      !this.state.example.match(/[A-Z]/i)
    ) {
      letterError = "it is not a letter!";
    }

    if (!(this.state.example.length === 1)) {
      letterError = "it is to long!";
    }
    if (!this.state.example) {
      letterError = "letter cannot be blank!";
    }

    if (letterError) {
      this.setState({ letterError });
      return false;
    }

    return true;
  };

  handleIncrement = () => {
    if (this.handleSubmit()) {
      console.log("Guess added. Left: ", this.state.count);
      this.setState({ count: this.state.count - 1 });
      if (this.state.count < 1) {
        window.location.reload(false);
      }
    }
  };

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  render() {
    return (
      //Ctrl+d for rewrite more than 1 segment
      <React.Fragment>
        <h1>HangMan</h1>
        {/*<img src={this.state.image} alt="" />*/}
        <span style={{ fontSize: 20 }} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <div>
          <input
            name="letter"
            placeholder="Write a letter here"
            onChange={this.handleChange}
          ></input>
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.letterError}
          </div>
        </div>
        <button
          type="submit"
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: 20 }}
        >
          {this.formatButton()}
        </button>

        <hr></hr>
        {this.renderLetters()}
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count < 4 ? "warning" : "primary";
    return classes;
  }

  formatButton() {
    const { count } = this.state;
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
}

export default Counter;
