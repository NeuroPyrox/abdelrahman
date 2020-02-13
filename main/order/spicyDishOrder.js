"use strict";

class SpicyDishOrder {
  constructor(
    dishName,
    spiceLevelQuantities = { notSpicy: 0, mild: 0, hot: 0 }
  ) {
    this.dishName = dishName;
    this.spiceLevelQuantities = spiceLevelQuantities;
  }

  getLines() {
    return ["notSpicy", "mild", "hot"]
      .map(spiceLevel => ({
        spiceLevel,
        quantity: this.spiceLevelQuantities[spiceLevel]
      }))
      .filter(line => line.quantity !== 0);
  }

  add() {
    const clone = this.clone();
    clone.spiceLevelQuantities.notSpicy += 1;
    return clone;
  }

  changeSpiceLevel(oldLevel, newLevel) {
    const clone = this.clone();
    clone.spiceLevelQuantities[newLevel] +=
      clone.spiceLevelQuantities[oldLevel];
    clone.spiceLevelQuantities[oldLevel] = 0;
    return clone;
  }

  remove(spiceLevel) {
    const clone = this.clone();
    clone.spiceLevelQuantities[spiceLevel] = 0;
    return clone;
  }

  isEmpty() {
    return Object.values(this.spiceLevelQuantities).every(
      quantity => quantity === 0
    );
  }

  clone() {
    return new SpicyDishOrder(
      this.dishName,
      Object.assign({}, this.spiceLevelQuantities)
    );
  }
}

module.exports = SpicyDishOrder;
