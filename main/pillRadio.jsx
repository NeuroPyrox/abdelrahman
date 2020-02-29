"use strict";

const React = require("react");
const Button = require("../shared/button.jsx");
require("./pillRadio.css");

const PillOption = ({ children, className }) => (
  <Button
    defaultStyle={className + " unselected"}
    hoverStyle={className + " halfSelected"}
    clickStyle={className + " selected"}
  >
    {children}
  </Button>
);

const PillRadio = props => <div className="pillRadio">{props.children}</div>;

module.exports = { PillRadio, PillOption };
