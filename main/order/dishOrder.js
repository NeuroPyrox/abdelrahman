"use strict";

class DishOrder {
  constructor(dishName, quantity=0) {
    this.dishName = dishName;
    this.quantity = quantity;
  }

  getLines() {
    if (this.quantity === 0) {
      return [];
    }
    return [{ quantity: this.quantity }];
  }

  add() {
    const clone = this.clone();
    clone.quantity += 1;
    return clone;
  }

  remove(spiceLevel) {
    const clone = this.clone();
    clone.quantity = 0;
    return clone;
  }

  isEmpty() {
    return this.quantity === 0;
  }

  clone() {
    return new DishOrder(this.dishName, this.quantity);
  }
}

module.exports = DishOrder;
