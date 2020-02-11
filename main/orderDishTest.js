"use strict";

// TODO make spice optional

// I'm leaving out the immutibility tests because I think the code speaks for itself on immutibility

const Dish = require("./orderDish.js");
const { assert, deepEqual } = require("../helpers.js");

const assertLines = (order, lines) =>
  assert(deepEqual(order.getLines(), lines), JSON.stringify(order.getLines(), null, 1));

let dish = new Dish();
assertLines(dish, []);

dish = dish.add();
assertLines(dish, [{ spiceLevel: "notSpicy", quantity: 1 }]);

dish = dish.add();
assertLines(dish, [{ spiceLevel: "notSpicy", quantity: 2 }]);

dish = dish.changeSpiceLevel("notSpicy", "mild");
assertLines(dish, [{ spiceLevel: "mild", quantity: 2 }]);

dish = dish.add();
assertLines(dish, [
  { spiceLevel: "notSpicy", quantity: 1 },
  { spiceLevel: "mild", quantity: 2 }
]);

dish = dish.changeSpiceLevel("notSpicy", "hot");
assertLines(dish, [
  { spiceLevel: "mild", quantity: 2 },
  { spiceLevel: "hot", quantity: 1 }
]);

dish = dish.add();
assertLines(dish, [
  { spiceLevel: "notSpicy", quantity: 1 },
  { spiceLevel: "mild", quantity: 2 },
  { spiceLevel: "hot", quantity: 1 }
]);

dish = dish.changeSpiceLevel("notSpicy", "hot");
assertLines(dish, [
  { spiceLevel: "mild", quantity: 2 },
  { spiceLevel: "hot", quantity: 2 }
]);

dish = dish.remove("mild");
assertLines(dish, [{ spiceLevel: "hot", quantity: 2 }]);
