import React from "react";

class FormatCount extends React.Component {
  //formating count box message
  render() {
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
