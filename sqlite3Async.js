"use strict";

const { promisify } = require("./asyncHelpers.js");

////////////////////////////////
// Promisification of sqlite3 //
////////////////////////////////

const databasePromise = createDatabase(".data/database.db");

module.exports = {
  run: async (sql, params) => {
    const database = await databasePromise;
    await promisify(callback => database.run(sql, params, callback));
  },

  get: async (sql, params) => {
    const database = await databasePromise;
    const result = await promisify(callback =>
      database.get(sql, params, callback)
    );
    return result;
  },

  all: async (sql, params) => {
    const database = await databasePromise;
    const result = await promisify(callback =>
      database.all(sql, params, callback)
    );
    return result;
  }
};

async function createDatabase(filename) {
  let database;
  await promisify(function(callback) {
    const sqlite3 = require("sqlite3");
    database = new sqlite3.Database(filename, callback);
  });
  return database;
}
