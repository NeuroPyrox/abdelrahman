"use strict";

const React = require("react");
const Dish = require("./Dish.jsx");
require("./menu.css");
// TODO move these dependencies out of the admin folder
const api = require("../admin/api.jsx");
const foundBug = require("../admin/foundBug.jsx");

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
