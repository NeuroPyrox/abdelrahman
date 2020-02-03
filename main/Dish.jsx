"use strict";

const React = require("react");
const QuantityInput = require("./QuantityInput.jsx")

class Dish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  isSelected() {
    return this.state.selected;
  }

  toggle() {
    this.setState({ selected: !this.isSelected() });
  }

  render() {
    return (
      <div
        className={"dish" + (this.isSelected() ? " selectedDish" : "")}
        onClick={() => this.toggle()}
      >
        <div>
          <img src={this.props.image} />
        </div>
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

module.exports = Dish;
