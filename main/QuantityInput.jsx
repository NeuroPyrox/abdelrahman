"use strict";

const React = require("react");

const digitsOnly = value => {
  return value.replace(/[^0-9]/, "");
};

const parse = value => {
  const filtered = digitsOnly(value);
  if (filtered !== "") {
    return parseInt(filtered);
  } else {
    return 0;
  }
};

const format = quantity => {
  if (quantity !== 0) {
    return quantity;
  } else {
    return "";
  }
};

class QuantityInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
  }

  setQuantity(quantity) {
    this.setState({ quantity: quantity });
  }

  mapQuantity(mapper) {
    this.setQuantity(mapper(this.state.quantity));
  }

  decrement() {
    this.mapQuantity(q => Math.max(q - 1, 0));
  }

  increment() {
    this.mapQuantity(q => q + 1);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.decrement()}>-</button>
        <input
          style={{ textAlign: "center" }}
          value={format(this.state.quantity)}
          onChange={e => this.setQuantity(parse(e.target.value))}
        />
        <button onClick={() => this.increment()}>+</button>
      </div>
    );
  }
}

module.exports = QuantityInput;
