"use strict";

const ReactDOM = require("react-dom");
// Idk why webpack makes me require React here, but I get "Error: React is not defined" otherwise
const React = require("react");
const Form = require("./Form.jsx");

ReactDOM.render(
  <div>
    <h1>Abdelrahman's Food</h1>
    <Form />
  </div>,
  document.getElementById("main")
);
