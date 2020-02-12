"use strict";

const Order = require("./order.js");
const SpicyDishOrder = require("./spicyDishOrder.js")
const DishOrder = require("./dishOrder.js")

class Menu {
  constructor(menu) {
    this.menu = menu;
  }
  
  createOrder() {
    return new Order(this, []);
  }
  
  createDishOrder(dishName) {
    if (this.menu[dishName].spicy) {
      return new SpicyDishOrder(dishName, {notSpicy: 1, mild: 0, hot: 0})
    } else {
      return new DishOrder(dishName, 1)
    }
  }
}

module.exports = Menu;
