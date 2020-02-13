"use strict";

const ReactDOM = require("react-dom");
const React = require("react");
const Menu = require("./order/menu.js");
const MenuView = require("./menu.jsx");
const Order = require("./order/order.js");
const OrderView = require("./order.jsx");
require("./index.css");

class Index extends React.Component {
  constructor(props) {
    super(props);
    // TODO get this from the server instead
    const menu = new Menu({
      "Sweet 'n Sour Chicken": { spicy: false },
      "Butter Chicken": { spicy: true }
    });
    this.state = {
      order: new Order(menu)
    };
  }

  modifyOrder(modify) {
    this.setState({ order: modify(this.state.order) });
  }

  render() {
    return (
      <div>
        <MenuView
          onClickDish={dishName =>
            this.modifyOrder(order => order.add(dishName))
          }
        />
        <OrderView dishOrders={this.state.order.getDishOrders()} />
      </div>
    );
  }
}

// Make it so when Menu clicks a dish, it goes into the order
ReactDOM.render(<Index />, document.getElementById("main"));
