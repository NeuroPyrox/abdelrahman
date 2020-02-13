"use strict";

const ReactDOM = require("react-dom");
const React = require("react");
const Menu = require("./order/menu.js")
const MenuView = require("./menu.jsx");
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
      order: menu
        .createOrder()
        .add("Sweet 'n Sour Chicken")
        .add("Butter Chicken")
        .add("Butter Chicken")
        .add("Butter Chicken")
        .changeSpiceLevel("Butter Chicken", "notSpicy", "mild")
        .add("Butter Chicken")
        .add("Butter Chicken")
    };
  }

  render() {
    return (
      <div>
        <MenuView onClickDish={dishName => alert(dishName)} />
        <OrderView dishOrders={this.state.order.getDishOrders()} />
      </div>
    );
  }
}

// Make it so when Menu clicks a dish, it goes into the order
ReactDOM.render(<Index />, document.getElementById("main"));
