import React from "react";
class ListCountInfo extends React.Component {
  //formatting count of all letters in list
  render() {
    if (this.props.count === 0) {
      return (
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <p>There are no guessed letters.</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <p>
              There are {this.props.count}{" "}
              {this.props.count < 2 ? "letter" : "letters"} on the list
            </p>
          </div>
        </div>
      );
    }
  }
}
export default ListCountInfo;
