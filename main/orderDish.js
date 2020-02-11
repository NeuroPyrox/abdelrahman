"use strict";

// TODO move this file to its own folder to avoid naming overlap with dish.jsx

class Dish {
  constructor(notSpicy = 0, mild = 0, hot = 0) {
    this.notSpicy = notSpicy;
    this.mild = mild;
    this.hot = hot;
  }

  getLines() {
    const lines = [];
    for (const spiceLevel of ["notSpicy", "mild", "hot"]) {
      const quantity = this[spiceLevel];
      if (quantity) {
        lines.push({ spiceLevel, quantity });
      }
    }
    return lines;
  }

  add() {
    const clone = this.clone()
    clone.notSpicy += 1;
    return clone;
  }

  changeSpiceLevel(oldLevel, newLevel) {
    const clone = this.clone()
    clone[newLevel] += clone[oldLevel];
    clone[oldLevel] = 0;
    return clone;
  }

  remove(spiceLevel) {
    const clone = this.clone();
    clone[spiceLevel] = 0;
    return clone;
  }
  
  isEmpty() {
    return this.notSpicy === 0 && this.mild === 0 && this.hot === 0;
  }
  
  clone() {
    return new Dish(this.notSpicy, this.mild, this.hot);
  }
}

module.exports = Dish;
