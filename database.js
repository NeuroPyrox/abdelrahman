"use strict";

const sqlite3 = require("sqlite3");
const database = new sqlite3.Database(".data/database.db");

const assertNoError = err => {
  if (err) {
    throw Error(err);
  }
};

const run = async (sql, params = []) => {
  const err = await new Promise((resolve, reject) => {
    database.run(sql, params, resolve);
  });
  assertNoError(err);
};

const all = async (sql, params = []) => {
  const [err, rows] = await new Promise((resolve, reject) => {
    database.all(sql, params, (err, rows) => resolve([err, rows]));
  });
  assertNoError(err);
  return rows;
};

const permutePriceParams = () => {
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
};

const insertNullPrice = async ({ dish, quantity, pickupOrDelivery }) => {
  await run(
    "INSERT INTO Prices (dish, quantity, pickupOrDelivery) VALUES (?, ?, ?)",
    [dish, quantity, pickupOrDelivery]
  );
};

const insertNullPrices = async () => {
  for (const priceParams of permutePriceParams()) {
    await insertNullPrice(priceParams);
  }
};

const resetPriceTable = async () => {
  await run("DROP TABLE Prices");
  await run(
    "CREATE TABLE Prices (dish TEXT, quantity INT, pickupOrDelivery TEXT, price DECIMAL(9,2))"
  );
  await insertNullPrices();
};

const resetOrderTable = async () => {
  await run("DROP TABLE Orders");
  await run(
    "CREATE TABLE Orders (dish TEXT, quantity INT, pickupOrDelivery TEXT, contact TEXT, timestamp INT)"
  );
}

exports.getPrices = async () => all("SELECT * FROM Prices");

const updatePrice = async ({ dish, quantity, pickupOrDelivery, price }) => {
  await run(
    "UPDATE Prices SET price=? WHERE dish=? AND quantity=? AND pickupOrDelivery=?",
    [price, dish, quantity, pickupOrDelivery]
  );
};

exports.setPrices = async prices => {
  const promises = prices.map(updatePrice);
  await Promise.all(promises);
};

exports.getOrders = async () => all("SELECT * FROM Orders");

exports.addOrder = async ({ dish, quantity, pickupOrDelivery, contact }) => {
  const timestamp = Date.now();
  run(
    "INSERT INTO Orders (dish, quantity, pickupOrDelivery, contact, timestamp) VALUES (?, ?, ?, ?, ?)",
    [dish, quantity, pickupOrDelivery, contact, timestamp]
  );
};
