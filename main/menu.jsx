"use strict";

const React = require("react");
const Dish = require("./dish.jsx");
require("./menu.css");
const foundBug = require("../shared/foundBug.jsx");
// TODO move these dependencies out of the admin folder
const api = require("../admin/api.jsx");

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menu: [] };
    api
      .loadMenu()
      .then(menu => this.setState({ menu: menu }))
      .catch(foundBug);
  }

  render() {
    // TODO fix unique key prop warning
    return (
      <div className="menu">
        {this.state.menu.map(({ imageUrl, dishName }) => (
          <Dish key={dishName} image={imageUrl} dishName={dishName} />
        ))}
      </div>
    );
  }
}

module.exports = Menu;
