"use strict";

const Order = require("./order.js");
const { assert, deepEqual } = require("../helpers.js");

const order = new Order();
// TODO replace with deepEqual
assert(deepEqual(order.getLines(), []));

order.add("Sweet 'n Sour Chicken");
assert(
  // TODO test deepEqual
  deepEqual(order.getLines(), [
    { dishName: "Sweet 'n Sour Chicken", quantity: 1, spiceLevel: "notSpicy" }
  ])
);

// TODO test multiple additions, changing the spice level, and deleting a line

module.exports = Promise.resolve();
