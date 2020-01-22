"use strict";

const sqlite3 = require("sqlite3");
const database = new sqlite3.Database(".data/database.db");

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

async function addOrder({ dish, quantity, pickupOrDelivery, contact }) {
  const timestamp = Date.now();
  await run(
    "INSERT INTO Orders (dish, quantity, pickupOrDelivery, contact, timestamp) VALUES (?, ?, ?, ?, ?)",
    [dish, quantity, pickupOrDelivery, contact, timestamp]
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

// Sqlite3 helpers

async function run(sql, params = []) {
  const err = await new Promise((resolve, reject) => {
    database.run(sql, params, resolve);
  });
  assertNoError(err);
}

async function all(sql, params = []) {
  const [err, rows] = await new Promise((resolve, reject) => {
    database.all(sql, params, (err, rows) => resolve([err, rows]));
  });
  assertNoError(err);
  return rows;
}

async function get(sql, params = []) {
  const [err, result] = await new Promise((resolve, reject) => {
    database.get(sql, params, (err, row) => resolve([err, row]));
  });
  assertNoError(err);
  return result;
}

// Table resetters

async function resetPriceTable() {
  await run("DROP TABLE Prices");
  await run(
    "CREATE TABLE Prices (dish TEXT, quantity INT, pickupOrDelivery TEXT, price DECIMAL(9,2))"
  );
  await insertNullPrices();
}

async function resetOrderTable() {
  await run("DROP TABLE Orders");
  await run(
    "CREATE TABLE Orders (dish TEXT, quantity INT, pickupOrDelivery TEXT, contact TEXT, timestamp INT)"
  );
}

async function resetSubscriptionTable() {
  await run("DROP TABLE Subscriptions");
  await run(
    "CREATE TABLE Subscriptions (endpoint TEXT, p256dh TEXT, auth TEXT)"
  );
}

// Other helper functions

async function insertNullPrices() {
  for (const { dish, quantity, pickupOrDelivery } of permutePriceParams()) {
    await run(
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
  await run(
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

function assertNoError(err) {
  if (err) {
    throw Error(err);
  }
}
