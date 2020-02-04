"use strict";

const React = require("react");
const Button = require("./button.jsx");
require("./xButton.css");

const xButton = props => (
  <Button
    clickStyle="xButton xButtonClick"
    hoverStyle="xButton xButtonHover"
    defaultStyle="xButton"
    onClick={props.onClick}
  >
    <div />
    <div />
  </Button>
);

module.exports = xButton;
