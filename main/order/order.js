"use strict";

class Order {
  constructor(menu, order) {
    this.menu = menu;
    this.order = order;
  }

  getLines() {
    const lines = [].concat(
      ...this.order.map(dishOrder => dishOrder.getLines())
    );
    return lines;
  }

  add(dishName) {
    const clone = this.clone();
    const index = clone.findDishOrder(dishName);
    if (index === -1) {
      clone.order.push(clone.menu.createDishOrder(dishName));
    } else {
      clone.order[index] = this.order[index].add();
    }
    return clone;
  }

  changeSpiceLevel(dishName, oldLevel, newLevel) {
    const clone = this.clone();
    const index = this.findDishOrder(dishName);
    if (index === -1) {
      throw Error();
    }
    clone.order[index] = this.order[index].changeSpiceLevel(oldLevel, newLevel);
    return clone;
  }

  remove(dishName, spiceLevel = undefined) {
    const clone = this.clone();
    const index = clone.findDishOrder(dishName);
    if (index === -1) {
      throw Error();
    }
    // spiceLevel is ignored in dishOrder.remove but not spicyDishOrder.remove
    const dishOrder = this.order[index].remove(spiceLevel);
    if (dishOrder.isEmpty()) {
      clone.order.splice(index, 1);
    } else {
      clone.order[index] = dishOrder;
    }
    return clone;
  }

  clone() {
    return new Order(this.menu, this.order.slice());
  }

  findDishOrder(dishName) {
    return this.order.findIndex(dishOrder => dishOrder.dishName === dishName);
  }
}

module.exports = Order;
