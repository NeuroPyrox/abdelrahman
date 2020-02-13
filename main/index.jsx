"use strict";

const ReactDOM = require("react-dom");
const React = require("react");
const Menu = require("./menu.jsx");
const Order = require("./order.jsx");
require("./index.css");

// Make it so when Menu clicks a dish, it goes into the order
ReactDOM.render(
  <div>
    <Menu />
    <Order
      dishOrders={[
        { dishName: "Sweet 'n Sour Chicken", lines: [{ quantity: 1 }] },
        {
          dishName: "Butter Chicken",
          lines: [
            { quantity: 2, spiceLevel: "notSpicy" },
            { quantity: 3, spiceLevel: "mild" }
          ]
        }
      ]}
    />
  </div>,
  document.getElementById("main")
);
