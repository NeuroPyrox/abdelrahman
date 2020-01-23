"use strict";

// TODO test if contactInfo can be stored and retrieved if it has unsafe characters

const { promisify } = require("util")
const sqlite3 = require("sqlite3");
const Joi = require("joi");

const database = new sqlite3.Database(".data/database.db");
const run = promisify(database.run.bind(database));
const all = promisify(database.all.bind(database));
const get = promisify(database.get.bind(database));

exports.getPrices = getPrices;
exports.setPrices = setPrices;
exports.getOrders = getOrders;
exports.addOrder = addOrder;
exports.addSubscription = addSubscription;
exports.getSubscriptions = getSubscriptions;
exports.hasSubscription = hasSubscription;
exports.removeSubscription = removeSubscription;

async function getPrices() {
  return all("SELECT * FROM Prices");
}

async function setPrices(prices) {
  const promises = prices.map(updatePrice);
  await Promise.all(promises);
}

async function getOrders() {
  return all("SELECT * FROM Orders");
}

async function addOrder(order) {
  validateOrder(order);
  await run(
    `INSERT INTO Orders (
      timestamp, 
      butterChickenQuantity, 
      butterChickenSpiceLevel, 
      sweetNSourQuantity, 
      delivery, 
      contactInfo) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      Date.now(),
      order.butterChickenQuantity,
      order.butterChickenSpiceLevel,
      order.sweetNSourQuantity,
      order.delivery,
      order.contactInfo
    ]
  );
}

async function addSubscription(subscription) {
  const { endpoint } = subscription;
  const { p256dh, auth } = subscription.keys;
  await run(
    "INSERT INTO Subscriptions (endpoint, p256dh, auth) VALUES (?, ?, ?)",
    [endpoint, p256dh, auth]
  );
}

async function getSubscriptions() {
  const rows = await all("SELECT endpoint, p256dh, auth FROM Subscriptions");
  return rows.map(convertRowToSubscription);
}

async function hasSubscription(endpoint) {
  const selection = await get(
    "SELECT 1 FROM Subscriptions WHERE endpoint=?",
    endpoint
  );
  return selection !== undefined;
}

async function removeSubscription(endpoint) {
  await run("DELETE FROM Subscriptions WHERE endpoint=?", endpoint);
}

/////////////////////////
// Non-exported functions
/////////////////////////

// Table resetters

async function resetOrderTable() {
  await database.run("DROP TABLE Orders");
  await database.run(
    `CREATE TABLE Orders (
      timestamp INT,
      butterChickenQuantity INT, 
      butterChickenSpiceLevel TEXT,
      sweetNSourQuantity INT,
      delivery BOOL,
      contactInfo TEXT
    )`
  );
}

async function resetPriceTable() {
  await database.run("DROP TABLE Prices");
  await database.run(
    "CREATE TABLE Prices (dish TEXT, quantity INT, pickupOrDelivery TEXT, price DECIMAL(9,2))"
  );
  await insertNullPrices();
}

async function resetSubscriptionTable() {
  await database.run("DROP TABLE Subscriptions");
  await database.run(
    "CREATE TABLE Subscriptions (endpoint TEXT, p256dh TEXT, auth TEXT)"
  );
}

// Other helper functions

async function insertNullPrices() {
  for (const { dish, quantity, pickupOrDelivery } of permutePriceParams()) {
    await database.run(
      "INSERT INTO Prices (dish, quantity, pickupOrDelivery) VALUES (?, ?, ?)",
      [dish, quantity, pickupOrDelivery]
    );
  }
}

function permutePriceParams() {
  const permutations = [];
  for (const dish of ["sweet-n-sour-chicken", "butter-chicken"]) {
    for (const quantity of [1, 2, 3, 4, 5]) {
      for (const pickupOrDelivery of ["pickup", "delivery"]) {
        permutations.push({
          dish: dish,
          quantity: quantity,
          pickupOrDelivery: pickupOrDelivery
        });
      }
    }
  }
  return permutations;
}

async function updatePrice({ dish, quantity, pickupOrDelivery, price }) {
  await database.run(
    "UPDATE Prices SET price=? WHERE dish=? AND quantity=? AND pickupOrDelivery=?",
    [price, dish, quantity, pickupOrDelivery]
  );
}

function convertRowToSubscription({ endpoint, p256dh, auth }) {
  return {
    endpoint: endpoint,
    keys: {
      p256dh: p256dh,
      auth: auth
    }
  };
}

const orderSchema = Joi.object().keys({
  butterChickenQuantity: Joi.number().integer().min(0).required(),
  butterChickenSpiceLevel: Joi.string().only("notSpicy", "mild", "hot"),
  sweetNSourQuantity: Joi.number().integer().min(0).required(),
  delivery: Joi.boolean().required(),
  contactInfo: Joi.string().required()
})

function validateOrder(order) {
  const err = orderSchema.validate(order).error;
  if (err !== null) {
    throw Error(err.details[0].message)
  }
  if (order.butterChickenQuantity === 0) {
    if (order.butterChickenSpiceLevel !== null) {
      throw Error("Expected butterChickenSpiceLevel to be null when butterChickenQuantity is 0")
    }
  } else {
    if (!order.butterChickenSpiceLevel) {
      throw Error("Expected butterChickenSpiceLevel when butterChickenQuantity is above 0")
    }
  }
}
