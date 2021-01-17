import React from "react";

class GetBadgeClasses extends React.Component {
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes +=
      this.props.count < 1
        ? "danger"
        : this.props.count < 4
        ? "warning"
        : "primary";
    return classes;
  }
  render() {
    let classes = "badge m-2 badge-";
    classes +=
      this.props.count < 1
        ? "danger"
        : this.props.count < 4
        ? "warning"
        : "primary";
    console.log("clases", classes);
    return classes;
  }
}
export default GetBadgeClasses;
