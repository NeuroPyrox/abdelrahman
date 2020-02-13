"use strict";

const DishOrder = require("./dishOrder.js");
const { assert, deepEqual } = require("../../helpers.js");

const assertLines = (dishOrder, lines) =>
  assert(
    deepEqual(dishOrder.getLines(), lines),
    JSON.stringify(dishOrder.getLines(), null, 1)
  );

// Construction
const sweetNSourChicken = new DishOrder("Sweet 'n Sour Chicken", {
  spicy: false
});
const butterChicken = new DishOrder("Butter Chicken", { spicy: true });
assertLines(sweetNSourChicken, []);
assertLines(butterChicken, []);

// Add
assertLines(sweetNSourChicken.add(), [{ quantity: 1 }]);
assertLines(sweetNSourChicken.add().add(), [{ quantity: 2 }]);
assertLines(butterChicken.add(), [{ quantity: 1, spiceLevel: "notSpicy" }]);

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

// Remove
assertLines(
  butterChicken
    .add()
    .changeSpiceLevel("notSpicy", "mild")
    .add()
    .remove("notSpicy"),
  [{ quantity: 1, spiceLevel: "mild" }]
);
assertLines(
  sweetNSourChicken
    .add().add()
    .remove(),
  []
);

// Is Empty
assert(sweetNSourChicken.isEmpty())
assert(!sweetNSourChicken.add().isEmpty())
