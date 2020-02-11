"use strict";

class Order {
  constructor() {
    this.lines = []
  }
  
  getLines() {
    return this.lines
  }
  
  add(_) {
    this.lines.push(1);
  }
}

module.exports = Order;
