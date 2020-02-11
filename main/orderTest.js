"use strict";

const Order = require("./order.js");
const { assert, isEmptyArray, deepEqual } = require("../helpers.js");

const order = new Order();
assert(isEmptyArray(order.getLines()));

order.add("Sweet 'n Sour Chicken");
assert(
  deepEqual(order.getLines(), [
    { dishName: "Sweet 'n Sour Chicken", quantity: 1, spiceLevel: "notSpicy" }
  ])
);

// TODO test multiple additions, changing the spice level, and deleting a line

module.exports = Promise.resolve();
