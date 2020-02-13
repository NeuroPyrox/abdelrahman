"use strict";

const React = require("react");
const Dish = require("./dish.jsx");
require("./menu.css");
const foundBug = require("../shared/foundBug.jsx");
const api = require("../shared/api.jsx");

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
          <Dish
            key={dishName}
            image={imageUrl}
            dishName={dishName}
            onClick={() => this.props.onClickDish(dishName)}
          />
        ))}
      </div>
    );
  }
}

module.exports = Menu;
