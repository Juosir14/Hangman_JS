import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 10,
    letters: [],
    //examples: ,
    //image: "https://picsum.photos/200",
    //address:{
    //    street: ''
    //}
  };

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

  handleIncrement = () => {
    console.log("Guess added. Left: ", this.state.count);
    this.setState({ count: this.state.count - 1 });
    if (this.state.count < 1) {
      window.location.reload(false);
    }
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
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: 20 }}
        >
          Guess
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
