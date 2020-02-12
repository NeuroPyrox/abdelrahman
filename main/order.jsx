"use strict";

const React = require("react");
const Button = require("../shared/button.jsx");
const XButton = require("../shared/xButton.jsx");
require("./order.css");

const spiceOptionStyles = (spiceLevel, selectedLevel) => {
  if (spiceLevel === selectedLevel) {
    return [
      spiceLevel + " selected",
      spiceLevel + " selected",
      spiceLevel + " selected"
    ];
  } else {
    return [
      spiceLevel + " unselected",
      spiceLevel + " halfSelected",
      spiceLevel + " selected"
    ];
  }
};

// Not really a radio. It just acts like one
const SpiceRadio = ({ selectedLevel }) => (
  <div className="spiceRadio">
    {[["notSpicy", "Not Spicy"], ["mild", "Mild"], ["hot", "Hot"]].map(
      ([spiceLevel, text]) => {
        const [defaultStyle, hoverStyle, clickStyle] = spiceOptionStyles(
          spiceLevel,
          selectedLevel
        );
        return (
          <Button
            key={spiceLevel}
            defaultStyle={defaultStyle}
            hoverStyle={hoverStyle}
            clickStyle={clickStyle}
            onClick={() => {}}
          >
            {text}
          </Button>
        );
      }
    )}
  </div>
);

const Line = ({ dishName, quantity, spiceLevel }) => (
  <div>
    <div className="lineHeader">
      <h4>{`${quantity}x ${dishName}`}</h4>
      <XButton />
    </div>
    {spiceLevel ? <SpiceRadio selectedLevel={spiceLevel} /> : ""}
  </div>
);

const DishOrder = ({ dishName, lines }) => (
  <div>
    {lines.map(({ quantity, spiceLevel }) => (
      <Line
        key={spiceLevel ? spiceLevel : ""}
        dishName={dishName}
        quantity={quantity}
        spiceLevel={spiceLevel}
      />
    ))}
  </div>
);

const Order = ({ dishOrders }) => (
  <div className="order">
    {dishOrders.map(({ dishName, lines }) => (
      <DishOrder key={dishName} dishName={dishName} lines={lines} />
    ))}
  </div>
);

module.exports = Order;
;
