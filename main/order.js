"use strict";

// TODO factor out spiceQuantities into a separate class

class Order {
  constructor() {
    this.dishes = [];
  }

  getLines() {
    const lines = [];
    for (const {dishName, spiceQuantities} of this.dishes) {
      for (const spiceLevel of ["notSpicy", "mild", "hot"]) {
        const quantity = spiceQuantities[spiceLevel];
        if (quantity) {
          lines.push({dishName, spiceLevel, quantity})
        }
      }
    }
    return lines
  }

  add(dishName) {
    const index = this.dishes.findIndex(dish => dish.dishName === dishName);
    if (index === -1) {
      this.dishes.push({dishName, spiceQuantities: {notSpicy: 1}});
      return;
    }
    const spiceQuantities = this.dishes[index].spiceQuantities;
    if (!spiceQuantities.notSpicy) {
      spiceQuantities.notSpicy = 1;
      return;
    }
    spiceQuantities.notSpicy += 1
  }

  changeSpiceLevel(dishName, oldLevel, newLevel) {
    const index = this.dishes.findIndex(dish => dish.dishName === dishName);
    if (index === -1) {
      throw Error();
    }
    const spiceQuantities = this.dishes[index].spiceQuantities;
    const oldQuantity = spiceQuantities[oldLevel];
    if (!oldQuantity) {
      throw Error();
    }
    spiceQuantities[oldLevel] = 0;
    if(!spiceQuantities[newLevel]) {
      spiceQuantities[newLevel] = oldQuantity;
      return;
    }
    spiceQuantities[newLevel] += oldQuantity;
  }
}

module.exports = Order;
