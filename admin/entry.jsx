const React = require("react");
const ReactDOM = require("react-dom");
const NotificationButton = require("./NotificationButton.jsx");
const PriceTable = require("./PriceTable.jsx");
const OrderTable = require("./OrderTable.jsx");

ReactDOM.render(
  <div>
    <NotificationButton />
    <PriceTable />
    <OrderTable />
  </div>,
  document.getElementById("main")
);
