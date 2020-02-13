"use strict";

const Order = require("./order.js");
const DishOrder = require("./dishOrder.js");
const SpicyDishOrder = require("./spicyDishOrder.js");
const Menu = require("./menu.js");
const { assert, deepEqual } = require("../../helpers.js");

const assertDishOrders = (order, dishOrders) =>
  assert(
    deepEqual(order.getDishOrders(), dishOrders),
    JSON.stringify(order.getDishOrders(), null, 1)
  );

// Setup
const menu = new Menu({
  "Sweet 'n Sour Chicken": { spicy: false },
  "Butter Chicken": { spicy: true }
});
const sweetNSourChicken = new DishOrder("Sweet 'n Sour Chicken");
const butterChicken = new SpicyDishOrder("Butter Chicken");

// Construction
const order = new Order(menu);
assertDishOrders(order, []);

// Add
assertDishOrders(order.add("Sweet 'n Sour Chicken"), [sweetNSourChicken.add()]);
assertDishOrders(order.add("Sweet 'n Sour Chicken").add("Butter Chicken"), [
  sweetNSourChicken.add(),
  butterChicken.add()
]);

// Change Spice Level
assertDishOrders(
  order
    .add("Butter Chicken")
    .changeSpiceLevel("Butter Chicken", "notSpicy", "mild"),
  [butterChicken.add().changeSpiceLevel("notSpicy", "mild")]
);

// Remove
assertDishOrders(
  order.add("Sweet 'n Sour Chicken").remove("Sweet 'n Sour Chicken"),
  []
);
assertDishOrders(
  order
    .add("Butter Chicken")
    .add("Sweet 'n Sour Chicken")
    .remove("Butter Chicken", "notSpicy")
    .add("Butter Chicken"),
  [sweetNSourChicken.add(), butterChicken.add()]
);
