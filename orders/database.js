"use strict";

const sqlite3 = require("sqlite3");
const database = new sqlite3.Database("database.db");

database.run(
  "CREATE TABLE IF NOT EXISTS Orders (dish TEXT, vegetarian TEXT, contact TEXT, timestamp INT)"
);

const assertNoError = err => {
  if (err) {
    throw Error(err);
  }
};

exports.add = async order => {
  const { dish, vegetarian, contact } = order;
  const timestamp = Date.now();
  const err = await new Promise((resolve, reject) =>
    database.run(
      "INSERT INTO Orders (dish, vegetarian, contact, timestamp) VALUES (?, ?, ?, ?)",
      [dish, vegetarian, contact, timestamp],
      resolve
    )
  );
  assertNoError(err);
};

exports.getAll = async () => {
  const [err, rows] = await new Promise((resolve, reject) => {
    database.all(
      "SELECT dish, vegetarian, contact, timestamp FROM Orders",
      (err, rows) => resolve([err, rows])
    );
  });
  assertNoError(err);
  return rows;
}
