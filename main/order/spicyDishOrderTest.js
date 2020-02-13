"use strict";

const SpicyDishOrder = require("./spicyDishOrder.js");
const { assert, deepEqual } = require("../../helpers.js");

const assertLines = (dishOrder, lines) =>
  assert(
    deepEqual(dishOrder.getLines(), lines),
    JSON.stringify(dishOrder.getLines(), null, 1)
  );

// Construction
const butterChicken = new SpicyDishOrder("Butter Chicken");
assertLines(butterChicken, []);

// Add
assertLines(butterChicken.add(), [{ quantity: 1, spiceLevel: "notSpicy" }]);
assertLines(butterChicken.add().add(), [{ quantity: 2, spiceLevel: "notSpicy" }]);

// Change Spice Level
assertLines(butterChicken.add().changeSpiceLevel("notSpicy", "mild"), [
  { quantity: 1, spiceLevel: "mild" }
]);
assertLines(
  butterChicken
    .add()
    .add()
    .changeSpiceLevel("notSpicy", "mild"),
  [{ quantity: 2, spiceLevel: "mild" }]
);
assertLines(
  butterChicken
    .add()
    .changeSpiceLevel("notSpicy", "mild")
    .add().add()
    .changeSpiceLevel("notSpicy", "mild"),
  [{ quantity: 3, spiceLevel: "mild" }]
);
assertLines(
  butterChicken
    .add()
    .changeSpiceLevel("notSpicy", "mild")
    .add()
    .changeSpiceLevel("notSpicy", "hot")
    .add(),
  [
    { quantity: 1, spiceLevel: "notSpicy" },
    { quantity: 1, spiceLevel: "mild" },
    { quantity: 1, spiceLevel: "hot" }
  ]
);

// Remove Line
assertLines(
  butterChicken
    .add()
    .changeSpiceLevel("notSpicy", "mild")
    .add()
    .removeLine("notSpicy"),
  [{ quantity: 1, spiceLevel: "mild" }]
);
assertLines(
  butterChicken
    .add().add()
    .removeLine("notSpicy"),
  []
);

// Is Empty
assert(butterChicken.isEmpty())
assert(!butterChicken.add().isEmpty())
