"use strict";

// TODO merge this file with menu.jsx

const React = require("react");
const Button = require("../shared/button.jsx");
require("./dish.css");

const Dish = props => (
  <Button
    clickStyle="dish dishSelected"
    hoverStyle="dish dishHalfSelected"
    defaultStyle={props.selected ? "dish dishSelected" : "dish dishUnselected"}
    onClick={props.onClick}
  >
    <div>
      <img src={props.image} />
    </div>
    <h3>{props.dishName}</h3>
  </Button>
);

module.exports = Dish;
