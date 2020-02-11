"use strict";

// TODO make orders immutable
// TODO make the spice level optional

const Order = require("./order.js");
const { assert, deepEqual } = require("../helpers.js");

const assertLines = (order, lines) =>
  assert(
    deepEqual(order.getLines(), lines),
    JSON.stringify(order.getLines(), null, 1)
  );

const order = new Order();
assertLines(order, []);

order.add("Sweet 'n Sour Chicken");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "notSpicy", quantity: 1 }
]);

order.add("Sweet 'n Sour Chicken");
order.add("Sweet 'n Sour Chicken");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "notSpicy", quantity: 3 }
]);

order.add("Butter Chicken");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "notSpicy", quantity: 3 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 1 }
]);

order.add("Butter Chicken");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "notSpicy", quantity: 3 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 2 }
]);

order.changeSpiceLevel("Sweet 'n Sour Chicken", "notSpicy", "mild");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "mild", quantity: 3 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 2 }
]);

order.add("Sweet 'n Sour Chicken");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "notSpicy", quantity: 1 },
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "mild", quantity: 3 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 2 }
]);

order.changeSpiceLevel("Sweet 'n Sour Chicken", "notSpicy", "hot");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "mild", quantity: 3 },
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "hot", quantity: 1 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 2 }
]);

order.add("Sweet 'n Sour Chicken");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "notSpicy", quantity: 1 },
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "mild", quantity: 3 },
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "hot", quantity: 1 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 2 }
]);

order.changeSpiceLevel("Sweet 'n Sour Chicken", "notSpicy", "hot");
assertLines(order, [
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "mild", quantity: 3 },
  { dishName: "Sweet 'n Sour Chicken", spiceLevel: "hot", quantity: 2 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 2 }
]);

// TODO test deleting a line

module.exports = Promise.resolve();
