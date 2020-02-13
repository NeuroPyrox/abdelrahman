"use strict";

const DishOrder = require("./dishOrder.js");
const { assert, deepEqual } = require("../../helpers.js");

const assertLines = (dishOrder, lines) =>
  assert(
    deepEqual(dishOrder.getLines(), lines),
    JSON.stringify(dishOrder.getLines(), null, 1)
  );

// Construction
const sweetNSourChicken = new DishOrder("Sweet 'n Sour Chicken");
assertLines(sweetNSourChicken, []);

// Add
assertLines(sweetNSourChicken.add(), [{ quantity: 1 }]);
assertLines(sweetNSourChicken.add().add(), [{ quantity: 2 }]);

// Remove
assertLines(
  sweetNSourChicken
    .add().add()
    .remove(),
  []
);

// Is Empty
assert(sweetNSourChicken.isEmpty())
assert(!sweetNSourChicken.add().isEmpty())
