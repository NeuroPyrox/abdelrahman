
const React = require("react");
const ReactDOM = require("react-dom");
const NotificationButton = require("./notificationButton.js")
const OrderTable = require("./orderTable.js")

ReactDOM.render(<Main />, document.getElementById("main"));

function Main() {
  return (
    <div>
      <NotificationButton />
      <OrderTable />
    </div>
  );
}
