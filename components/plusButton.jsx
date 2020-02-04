"use strict";

const React = require("react");
const Button = require("./button.jsx");
require("./plusButton.css");

const plusButton = props => (
  <Button
    clickStyle="plusButton plusButtonClick"
    hoverStyle="plusButton plusButtonHover"
    defaultStyle="plusButton"
    onClick={props.onClick}
  >
    <div />
    <div />
  </Button>
);

module.exports = plusButton;
