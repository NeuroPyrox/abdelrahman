"use strict";

const React = require("react");
const QuantityInput = require("./QuantityInput.jsx")

module.exports = class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sweetNSourQuantity: 0, butterChickenQuantity: 0 };
    this.handleSweetNSourQuantity = this.handleSweetNSourQuantity.bind(this);
    this.handleButterChickenQuantity = this.handleButterChickenQuantity.bind(
      this
    );
  }

  render() {
    return (
      <div>
        <MenuOption
          onInput={this.handleSweetNSourQuantity}
          name="sweetNSourQuantity"
          text="Sweet 'n Sour Chicken"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sweetsourchickensoaked.jpg/220px-Sweetsourchickensoaked.jpg"
        />
        <MenuOption
          onInput={this.handleButterChickenQuantity}
          name="butterChickenQuantity"
          text="Butter Chicken"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/220px-Chicken_makhani.jpg"
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.sweetNSourQuantity !== prevState.sweetNSourQuantity ||
      this.state.butterChickenQuantity !== prevState.butterChickenQuantity
    ) {
      this.props.onNumMeals(this.getNumMeals());
    }
  }

  handleSweetNSourQuantity(event) {
    const quantity = getQuantityInput(event.target);
    this.setState({ sweetNSourQuantity: quantity });
  }

  handleButterChickenQuantity(event) {
    const quantity = getQuantityInput(event.target);
    this.setState({ butterChickenQuantity: quantity });
  }

  getNumMeals() {
    return this.state.sweetNSourQuantity + this.state.butterChickenQuantity;
  }
};

function MenuOption({ onInput, name, text, image }) {
  return (
    <div style={{ flexDirection: "column" }}>
      <img src={image} />
      {text}
      <QuantityInput />
    </div>
  );
}

function getQuantityInput(element) {
  if (!element.checkValidity()) {
    return 0;
  }
  return parseInt(element.value);
}
