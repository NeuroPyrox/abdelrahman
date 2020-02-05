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
    // TODO fix naming ambiguity between "name" and "dish"
    return (
      <div className="menu">
        {this.state.menu.map(({ imageUrl, dish }) => (
          <Dish key={dish} image={imageUrl} name={dish} />
        ))}
      </div>
    );
  }
}

module.exports = Menu;
