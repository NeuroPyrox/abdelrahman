"use strict";

const React = require("react");
const Button = require("../shared/button.jsx");
const XButton = require("../shared/xButton.jsx");
require("./order.css");

const spiceOptionStyles = (spiceLevel, selected) => {
  if (selected) {
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

const formatSpiceLevel = {
  notSpicy: "Not Spicy",
  mild: "Mild",
  hot: "Hot"
};

const SpiceOption = ({ spiceLevel, selected }) => {
  const [defaultStyle, hoverStyle, clickStyle] = spiceOptionStyles(
    spiceLevel,
    selected
  );
  return (
    <Button
      key={spiceLevel}
      defaultStyle={defaultStyle}
      hoverStyle={hoverStyle}
      clickStyle={clickStyle}
      onClick={() => {}}
    >
      {formatSpiceLevel[spiceLevel]}
    </Button>
  );
};

// Not really a radio. It just acts like one
const SpiceRadio = ({ selectedLevel }) => (
  <div className="spiceRadio">
    {["notSpicy", "mild", "hot"].map(spiceLevel => (
      <SpiceOption
        key={spiceLevel}
        spiceLevel={spiceLevel}
        selected={selectedLevel === spiceLevel}
      />
    ))}
  </div>
);

const Line = ({ dishName, quantity, spiceLevel, onRemove }) => (
  <div>
    <div className="lineHeader">
      <h4>{`${quantity}x ${dishName}`}</h4>
      <XButton onClick={onRemove} />
    </div>
    {spiceLevel ? <SpiceRadio selectedLevel={spiceLevel} /> : ""}
  </div>
);

const DishOrder = ({ dishName, lines, onRemoveLine }) => (
  <div>
    {lines.map(({ quantity, spiceLevel }) => (
      <Line
        key={spiceLevel ? spiceLevel : ""}
        dishName={dishName}
        quantity={quantity}
        spiceLevel={spiceLevel}
        onRemove={() => {
          if (spiceLevel) {
            onRemoveLine(spiceLevel);
          } else {
            onRemoveLine();
          }
        }}
      />
    ))}
  </div>
);

const Order = ({ dishOrders, onRemoveLine }) => (
  <div className="order">
    {dishOrders.map(dishOrder => (
      <DishOrder
        key={dishOrder.getDishName()}
        dishName={dishOrder.getDishName()}
        lines={dishOrder.getLines()}
        onRemoveLine={(spiceLevel = null) =>
          onRemoveLine(dishOrder.getDishName(), spiceLevel)
        }
      />
    ))}
  </div>
);

module.exports = Order;
