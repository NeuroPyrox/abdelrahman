"use strict";

const Dish = require("./orderDish.js");

class Order {
  constructor(dishes = []) {
    this.dishes = dishes;
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
    const clone = this.clone();
    const index = clone.findDish(dishName);
    if (index === -1) {
      clone.dishes.push({ dishName, dish: new Dish().add() });
    } else {
      clone.setDishAt(index, this.getDishAt(index).add());
    }
    return clone
  }

  changeSpiceLevel(dishName, oldLevel, newLevel) {
    const clone = this.clone();
    const index = this.findDish(dishName);
    if (index === -1) {
      throw Error();
    }
    clone.setDishAt(
      index,
      this.getDishAt(index).changeSpiceLevel(oldLevel, newLevel)
    );
    return clone
  }

  remove(dishName, spiceLevel) {
    const clone = this.clone();
    const index = clone.findDish(dishName);
    if (index === -1) {
      throw Error();
    }
    const newDish = this.getDishAt(index).remove(spiceLevel);
    if (newDish.isEmpty()) {
      clone.dishes.splice(index, 1);
    } else {
      clone.setDishAt(index, newDish);
    }
    return clone;
  }

  clone() {
    return new Order(this.dishes.slice());
  }

  findDish(dishName) {
    return this.dishes.findIndex(dish => dish.dishName === dishName);
  }

  getDishAt(index) {
    return this.dishes[index].dish;
  }

  setDishAt(index, dish) {
    this.dishes[index].dish = dish;
  }
}

module.exports = Order;
