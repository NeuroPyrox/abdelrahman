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

const SpiceOption = ({ spiceLevel, selected, onSelect }) => {
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
      onClick={onSelect}
    >
      {formatSpiceLevel[spiceLevel]}
    </Button>
  );
};

// Not really a radio. It just acts like one
const SpiceRadio = ({ selectedLevel, onSelect }) => (
  <div className="spiceRadio">
    {["notSpicy", "mild", "hot"].map(spiceLevel => (
      <SpiceOption
        key={spiceLevel}
        spiceLevel={spiceLevel}
        selected={selectedLevel === spiceLevel}
        onSelect={() => onSelect(spiceLevel)}
      />
    ))}
  </div>
);

const Line = ({
  dishName,
  quantity,
  spiceLevel,
  onRemove,
  onChangeSpiceLevel
}) => (
  <div>
    <div className="lineHeader">
      <h4>{`${quantity}x ${dishName}`}</h4>
      <XButton onClick={onRemove} />
    </div>
    {spiceLevel ? (
      <SpiceRadio selectedLevel={spiceLevel} onSelect={onChangeSpiceLevel} />
    ) : (
      ""
    )}
  </div>
);

const DishOrder = ({ dishName, lines, onRemoveLine, onChangeSpiceLevel }) => (
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
        onChangeSpiceLevel={newLevel =>
          onChangeSpiceLevel(spiceLevel, newLevel)
        }
      />
    ))}
  </div>
);

const Order = ({ dishOrders, onRemoveLine, onChangeSpiceLevel }) => (
  <div className="order">
    {dishOrders.map(dishOrder => (
      <DishOrder
        key={dishOrder.getDishName()}
        dishName={dishOrder.getDishName()}
        lines={dishOrder.getLines()}
        onRemoveLine={(spiceLevel = null) =>
          onRemoveLine(dishOrder.getDishName(), spiceLevel)
        }
        onChangeSpiceLevel={(oldLevel, newLevel) =>
          onChangeSpiceLevel(dishOrder.getDishName(), oldLevel, newLevel)
        }
      />
    ))}
  </div>
);

module.exports = Order;
