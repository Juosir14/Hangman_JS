import React from "react";

class FormatButton extends React.Component {
  //formatting button name for meaningful purpose
  render() {
    //console.log(this.props.count);
    let btn = "Guess";

    this.props.count === 0
      ? (btn = "Restart")
      : localStorage.getItem("WON") === "WON"
      ? (btn = "Restart")
      : localStorage.getItem("Word") === localStorage.getItem("randomWord")
      ? (btn = "Restart")
      : (btn = "Guess");

    return btn;
  }
}
export default FormatButton;
