import React from "react";

class FormatCount extends React.Component {
  render() {
    //const { count } = this.props;
    let msg = "Moves left: ";
    msg += this.props.count;
    if (this.props.count < 1) {
      msg = "Lost";
    }
    if (localStorage.getItem("WON") === "WON") {
      msg = "You WON!";
    }
    return msg;
  }
}
export default FormatCount;
