"use strict";

const sqlite3 = require("sqlite3");
const database = new sqlite3.Database("database.db");

database.run(
  "CREATE TABLE IF NOT EXISTS Subscriptions (endpoint TEXT, p256dh TEXT, auth TEXT)"
);

const assertNoError = err => {
  if (err) {
    throw Error(err);
  }
};

exports.add = async subscription => {
  const { endpoint } = subscription;
  const { p256dh, auth } = subscription.keys;
  const err = await new Promise((resolve, reject) =>
    database.run(
      "INSERT INTO Subscriptions (endpoint, p256dh, auth) VALUES (?, ?, ?)",
      [endpoint, p256dh, auth],
      resolve
    )
  );
  assertNoError(err);
};

exports.getAll = async () => {
  const [err, rows] = await new Promise((resolve, reject) => {
    database.all(
      "SELECT endpoint, p256dh, auth FROM Subscriptions",
      (err, rows) => resolve([err, rows])
    );
  });
  assertNoError(err);
  return rows.map(row => {
    return {
      endpoint: row.endpoint,
      keys: {
        p256dh: row.p256dh,
        auth: row.auth
      }
    };
  });
};

exports.has = async endpoint => {
  const [err, selection] = await new Promise((resolve, reject) => {
    database.get(
      "SELECT 1 FROM Subscriptions WHERE endpoint=?",
      endpoint,
      (err, row) => resolve([err, row])
    );
  });
  assertNoError(err);
  return selection !== undefined
};

exports.remove = async endpoint => {
  const err = await new Promise((resolve, reject) => {
    database.run(
      "DELETE FROM Subscriptions WHERE endpoint=?",
      endpoint,
      resolve
    );
  });
  assertNoError(err);
};
