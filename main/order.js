"use strict";

const Dish = require("./orderDish.js");

class Order {
  constructor() {
    this.dishes = [];
  }

  getLines() {
    let lines = [];
    for (const { dishName, dish } of this.dishes) {
      const dishLines = dish.getLines();
      for (const line of dishLines) {
        line.dishName = dishName;
      }
      lines = lines.concat(dishLines);
    }
    return lines;
  }

  add(dishName) {
    const index = this.dishes.findIndex(dish => dish.dishName === dishName);
    if (index === -1) {
      const dish = new Dish().add();
      this.dishes.push({ dishName, dish });
    } else {
      this.dishes[index].dish = this.dishes[index].dish.add();
    }
  }

  changeSpiceLevel(dishName, oldLevel, newLevel) {
    const index = this.dishes.findIndex(dish => dish.dishName === dishName);
    if (index === -1) {
      throw Error();
    }
    this.dishes[index].dish = this.dishes[index].dish.changeSpiceLevel(
      oldLevel,
      newLevel
    );
  }

  remove(dishName, spiceLevel) {
    const index = this.dishes.findIndex(dish => dish.dishName === dishName);
    if (index === -1) {
      throw Error();
    }
    const newDish = this.dishes[index].dish.remove(spiceLevel);
    if (newDish.isEmpty()) {
      this.dishes.splice(index, 1);
      return;
    }
    this.dishes[index].dish = newDish;
  }
}

module.exports = Order;
