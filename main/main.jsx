"use strict";

// TODO rename sweetNSour to sweetNSourChicken in all files

const React = require("react");
const ReactDOM = require("react-dom");
const Form = require("./form.jsx");

ReactDOM.render(<Main />, document.getElementById("main"));

function Main() {
  return (
    <div>
      <h1>Abdelrahman's Food</h1>
      <Form />
    </div>
  );
}
