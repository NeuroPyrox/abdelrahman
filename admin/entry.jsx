// TODO do I really need to import React here?
const React = require("react");
const ReactDOM = require("react-dom");
// TODO change extensions to jsx
const NotificationButton = require("./NotificationButton.jsx");
const OrderTable = require("./OrderTable.jsx");

ReactDOM.render(
  <div>
    <NotificationButton />
    <OrderTable />
  </div>,
  document.getElementById("main")
);
