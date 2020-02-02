"use strict";

const React = require("react");

const Plus = props => (
  <div>
    <div className="verticalLine"/>
    <div className="horizontalLine"/>
  </div>
);

// Must be inside a div to keep the css selectors consistent with Plus
const Minus = props => (
  <div>
    <div className="horizontalLine"/>
  </div>
);

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
      <div className="quantityInput">
        <button onClick={() => this.decrement()}>
          <Minus />
        </button>
        <input
          value={format(this.state.quantity)}
          onChange={e => this.setQuantity(parse(e.target.value))}
        />
        <button onClick={() => this.increment()}>
          <Plus />
        </button>
      </div>
    );
  }
}

module.exports = QuantityInput;
