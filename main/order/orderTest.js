"use strict";

const Menu = require("./menu.js");
const { assert, deepEqual } = require("../../helpers.js");

const assertLines = (order, lines) =>
  assert(
    deepEqual(order.getLines(), lines),
    JSON.stringify(order.getLines(), null, 1)
  );

const menu = new Menu({
  "Sweet 'n Sour Chicken": { spicy: false },
  "Butter Chicken": { spicy: true }
});

const order = menu.createOrder();

assertLines(order, []);

assertLines(order.add("Sweet 'n Sour Chicken"), [
  { dishName: "Sweet 'n Sour Chicken", quantity: 1 }
]);
assertLines(order.add("Sweet 'n Sour Chicken").add("Sweet 'n Sour Chicken"), [
  { dishName: "Sweet 'n Sour Chicken", quantity: 2 }
]);
assertLines(order.add("Butter Chicken"), [
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 1 }
]);
assertLines(order.add("Butter Chicken").add("Butter Chicken"), [
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 2 }
]);
assertLines(order.add("Butter Chicken").add("Sweet 'n Sour Chicken"), [
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 1 },
  { dishName: "Sweet 'n Sour Chicken", quantity: 1 }
]);
assertLines(order.add("Sweet 'n Sour Chicken").add("Butter Chicken"), [
  { dishName: "Sweet 'n Sour Chicken", quantity: 1 },
  { dishName: "Butter Chicken", spiceLevel: "notSpicy", quantity: 1 }
]);
assertLines(
  order
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "mild"),
  [
    {
      dishName: "Butter Chicken",
      spiceLevel: "mild",
      quantity: 1
    }
  ]
);
assertLines(
  order
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "mild")
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "mild"),
  [
    {
      dishName: "Butter Chicken",
      spiceLevel: "mild",
      quantity: 2
    }
  ]
);
assertLines(
  order
    .add("Butter Chicken")
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "mild"),
  [
    {
      dishName: "Butter Chicken",
      spiceLevel: "mild",
      quantity: 2
    }
  ]
);
assertLines(
  order
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "mild")
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "hot")
    .add("Butter Chicken"),
  [
    {
      dishName: "Butter Chicken",
      spiceLevel: "notSpicy",
      quantity: 1
    },
    {
      dishName: "Butter Chicken",
      spiceLevel: "mild",
      quantity: 1
    },
    {
      dishName: "Butter Chicken",
      spiceLevel: "hot",
      quantity: 1
    }
  ]
);
assertLines(
  order
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "mild")
    .add("Butter Chicken")
    .remove("Butter Chicken", "notSpicy"),
  [
    {
      dishName: "Butter Chicken",
      spiceLevel: "mild",
      quantity: 1
    }
  ]
);
assertLines(order.add("Sweet 'n Sour Chicken").remove("Sweet 'n Sour Chicken"), []);
assertLines(
  order
    .add("Butter Chicken")
    .add("Sweet 'n Sour Chicken")
    .remove("Butter Chicken", "notSpicy")
    .add("Butter Chicken"),
  [
    {
      dishName: "Sweet 'n Sour Chicken",
      quantity: 1
    },
    {
      dishName: "Butter Chicken",
      spiceLevel: "notSpicy",
      quantity: 1
    }
  ]
);
