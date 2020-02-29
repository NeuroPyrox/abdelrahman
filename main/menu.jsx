"use strict";

const React = require("react");
const Dish = require("./dish.jsx");
require("./menu.css");
const foundBug = require("../shared/foundBug.jsx");
const api = require("../shared/api.jsx");

const Menu = ({menuTable, onClickDish}) => (
  <div className="menu">
    {menuTable.map(({ imageUrl, dishName }) => (
      <Dish
        key={dishName}
        image={imageUrl}
        dishName={dishName}
        onClick={() => onClickDish(dishName)}
      />
    ))}
  </div>
);

module.exports = Menu;
