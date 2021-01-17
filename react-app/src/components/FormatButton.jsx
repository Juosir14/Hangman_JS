import React from "react";

class FormatButton extends React.Component {
  //formatting button name for meaningful purpose
  render() {
    let btn;
    if (
      this.props.count === 0 ||
      localStorage.getItem("WON") === "WON" ||
      localStorage.getItem("Word") === localStorage.getItem("randomWord")
    ) {
      btn = "Restart";
    } else btn = "Guess";
    return btn;
  }
}
export default FormatButton;
