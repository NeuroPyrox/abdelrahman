"use strict";

const React = require("react");

class Dish extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dish">
        <div>
          <img src={this.props.image} />
        </div>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

module.exports = Dish;
