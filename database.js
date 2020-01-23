"use strict";

const Promise = require("bluebird");
const sqlite3Async = Promise.promisifyAll(require("sqlite3"));

const database = new sqlite3Async.Database(".data/database.db");

exports.getPrices = getPrices;
exports.setPrices = setPrices;
exports.getOrders = getOrders;
exports.addOrder = addOrder;
exports.addSubscription = addSubscription;
exports.getSubscriptions = getSubscriptions;
exports.hasSubscription = hasSubscription;
exports.removeSubscription = removeSubscription;

async function getPrices() {
  return database.all("SELECT * FROM Prices");
}

async function setPrices(prices) {
  const promises = prices.map(updatePrice);
  await Promise.all(promises);
}

async function getOrders() {
  return database.all("SELECT * FROM Orders");
}

async function addOrder({ dish, quantity, pickupOrDelivery, contact }) {
  const timestamp = Date.now();
  await database.run(
    "INSERT INTO Orders (dish, quantity, pickupOrDelivery, contact, timestamp) VALUES (?, ?, ?, ?, ?)",
    [dish, quantity, pickupOrDelivery, contact, timestamp]
  );
}

async function addSubscription(subscription) {
  const { endpoint } = subscription;
  const { p256dh, auth } = subscription.keys;
  await database.run(
    "INSERT INTO Subscriptions (endpoint, p256dh, auth) VALUES (?, ?, ?)",
    [endpoint, p256dh, auth]
  );
}

async function getSubscriptions() {
  const rows = await database.all("SELECT endpoint, p256dh, auth FROM Subscriptions");
  return rows.map(convertRowToSubscription);
}

async function hasSubscription(endpoint) {
  const selection = await database.get(
    "SELECT 1 FROM Subscriptions WHERE endpoint=?",
    endpoint
  );
  return selection !== undefined;
}

async function removeSubscription(endpoint) {
  await database.run("DELETE FROM Subscriptions WHERE endpoint=?", endpoint);
}

/////////////////////////
// Non-exported functions
/////////////////////////

// Table resetters

async function resetPriceTable() {
  await database.run("DROP TABLE Prices");
  await database.run(
    "CREATE TABLE Prices (dish TEXT, quantity INT, pickupOrDelivery TEXT, price DECIMAL(9,2))"
  );
  await insertNullPrices();
}

async function resetOrderTable() {
  await database.run("DROP TABLE Orders");
  await database.run(
    "CREATE TABLE Orders (dish TEXT, quantity INT, pickupOrDelivery TEXT, contact TEXT, timestamp INT)"
  );
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
