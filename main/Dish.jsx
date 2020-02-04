"use strict";

const React = require("react");
const Button = require("./Button.jsx");

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
    <h3>{props.name}</h3>
  </Button>
);

module.exports = Dish;
