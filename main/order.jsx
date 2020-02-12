"use strict";

const React = require("react");
const XButton = require("../shared/xButton.jsx");

const SpiceRadio = ({ selected }) => (
  <div className="spiceRadio">
    {[["notSpicy", "Not Spicy"], ["mild", "Mild"], ["hot", "Hot"]].map(
      ([spiceLevel, text]) => (
        <p
          key={spiceLevel}
          className={spiceLevel === selected ? spiceLevel : ""}
        >
          {text}
        </p>
      )
    )}
  </div>
);

const Line = ({ dishName, quantity, spiceLevel }) => (
  <div>
    <h4>{`${quantity}x ${dishName}`}</h4>
    <XButton />
    {spiceLevel ? <SpiceRadio selected={spiceLevel} /> : ""}
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
  <div>
    {dishOrders.map(({ dishName, lines }) => (
      <DishOrder key={dishName} dishName={dishName} lines={lines} />
    ))}
  </div>
);

module.exports = Order;
