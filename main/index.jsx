"use strict";

const ReactDOM = require("react-dom");
const React = require("react");
const Menu = require("./order/menu.js");
const MenuView = require("./menu.jsx");
const Order = require("./order/order.js");
const OrderView = require("./order.jsx");
const jsonHttp = require("../shared/jsonHttp.jsx");
require("./index.css");

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.load();
  }

  async load() {
    const menuTable = await jsonHttp.get("/menu");
    const menu = new Menu(
      Object.fromEntries(
        menuTable.map(({ dishName, spicy }) => [dishName, { spicy }])
      )
    );
    this.setState({ order: new Order(menu), menuTable, loaded: true });
  }

  modifyOrder(modify) {
    this.setState({ order: modify(this.state.order) });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <div>
        <MenuView
          menuTable={this.state.menuTable}
          onClickDish={dishName =>
            this.modifyOrder(order => order.add(dishName))
          }
        />
        <OrderView
          dishOrders={this.state.order.getDishOrders()}
          onRemoveLine={(dishName, spiceLevel = null) =>
            this.modifyOrder(order => order.removeLine(dishName, spiceLevel))
          }
          onChangeSpiceLevel={(dishName, oldLevel, newLevel) =>
            this.modifyOrder(order =>
              order.changeSpiceLevel(dishName, oldLevel, newLevel)
            )
          }
        />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("main"));
