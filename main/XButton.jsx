"use strict";

const React = require("react");
const Button = require("./Button.jsx");

const XButton = props => (
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

module.exports = XButton;
