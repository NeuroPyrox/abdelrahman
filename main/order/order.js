"use strict";

class Order {
  constructor(menu, dishOrders=[]) {
    this.menu = menu;
    this.dishOrders = dishOrders;
  }

  getDishOrders() {
    return this.dishOrders.slice();
  }

  add(dishName) {
    const clone = this.clone();
    const index = clone.findDishOrder(dishName);
    if (index === -1) {
      clone.dishOrders.push(clone.menu.createDishOrder(dishName));
    } else {
      clone.dishOrders[index] = this.dishOrders[index].add();
    }
    return clone;
  }

  changeSpiceLevel(dishName, oldLevel, newLevel) {
    const clone = this.clone();
    const index = this.findDishOrder(dishName);
    if (index === -1) {
      throw Error();
    }
    clone.dishOrders[index] = this.dishOrders[index].changeSpiceLevel(oldLevel, newLevel);
    return clone;
  }

  removeLine(dishName, spiceLevel = null) {
    const clone = this.clone();
    const index = clone.findDishOrder(dishName);
    if (index === -1) {
      throw Error();
    }
    // spiceLevel is ignored in dishOrder.remove but not spicyDishOrder.remove
    const dishOrder = this.dishOrders[index].removeLine(spiceLevel);
    if (dishOrder.isEmpty()) {
      clone.dishOrders.splice(index, 1);
    } else {
      clone.dishOrders[index] = dishOrder;
    }
    return clone;
  }

  clone() {
    return new Order(this.menu, this.dishOrders.slice());
  }

  findDishOrder(dishName) {
    return this.dishOrders.findIndex(dishOrder => dishOrder.dishName === dishName);
  }
}

module.exports = Order;
