// TODO do I really need to import React here?
const React = require("react");
const ReactDOM = require("react-dom");
// TODO change extensions to jsx
const NotificationButton = require("./notificationButton.jsx")
const OrderTable = require("./orderTable.jsx")

ReactDOM.render(<Main />, document.getElementById("main"));

function Main() {
  return (
    <div>
      <NotificationButton />
      <OrderTable />
    </div>
  );
}
