"use strict";

const {asyncThrow} = require("./helpers.js")

////////////////////////////////
// Promisification of sqlite3 //
////////////////////////////////

// I prefer this promisifier because I couldn't get util.promisify or bluebird to detect certain errors
// As a bonus, it has the same clean syntax as "new Promise(resolve => ...)"
const promisify = asyncThrow(async executor => {
  const [err, result] = await promiseMultiple(executor);
  if (err !== null) {
    throw Error(err);
  }
  return result;
});

const databasePromise = createDatabase(".data/database.db");

module.exports = {
  run: asyncThrow(async (sql, params) => {
    const database = await databasePromise;
    await promisify(callback => database.run(sql, params, callback));
  }),

  get: async (sql, params) => {
    const database = await databasePromise;
    const result = await promisify(callback => database.get(sql, params, callback));
    return result;
  },

  all: async (sql, params) => {
    const database = await databasePromise;
    const result = await promisify(callback => database.all(sql, params, callback));
    return result;
  }
}

async function createDatabase(filename) {
  let database;
  await promisify(function(callback) {
    const sqlite3 = require("sqlite3");
    database = new sqlite3.Database(filename, callback);
  });
  return database;
}

async function promiseMultiple(executor) {
  return new Promise(function(resolve, reject) {
    try {
      executor((...args) => resolve(args));
    } catch (err) {
      reject(err);
    }
  });
}