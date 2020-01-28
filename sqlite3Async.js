"use strict";

////////////////////////////////
// Promisification of sqlite3 //
////////////////////////////////

const databasePromise = createDatabase(".data/database.db");

module.exports = {
  run: async function run(sql, params) {
    const database = await databasePromise;
    await promisify(callback => database.run(sql, params, callback));
  },

  get: async function get(sql, params) {
    const database = await databasePromise;
    return promisify(callback => database.get(sql, params, callback));
  },

  all: async function all(sql, params) {
    const database = await databasePromise;
    return promisify(callback => database.all(sql, params, callback));
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

// I prefer this promisifier because I couldn't get util.promisify or bluebird to detect certain errors
// As a bonus, it has the same clean syntax as "new Promise(resolve => ...)"
async function promisify(executor) {
  const [err, result] = await promiseMultiple(executor);
  if (err !== null) {
    throw Error(err);
  }
  return result;
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