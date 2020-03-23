"use strict";

const React = require("react");
const Button = require("../shared/button.jsx");
const XButton = require("../shared/xButton.jsx");
const { PillRadio, PillOption } = require("./pillRadio.jsx");
require("./order.css");

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
    {0 < dishOrders.length ? ( // TODO pass whole css class instead of just its name
      <PillRadio>
        <PillOption value="pickup" className="pickupDelivery">Pickup</PillOption>
        <PillOption value="delivery" className="pickupDelivery">Delivery</PillOption>
      </PillRadio>
    ) : null}
  </div>
);

module.exports = Order;
