"use strict";

const sqlite3Async = require("./sqlite3Async.js");

// Unsafe = vulnerable to SQL injection

// TODO test if you can store strings with unsafe characters

// Unsafe
async function ensureTableExists(tableName, columns) {
  const exists = await tableExists(tableName);
  if (!exists) {
    await createTable(tableName, columns);
  }
  // Reminder: if you find youself needing to check if the table has the right columns, you wrote poor code
}

// Unsafe
async function getTable(tableName) {
  const table = await sqlite3Async.all(`SELECT * FROM ${tableName}`);
  return table;
}

// Unsafe: tableName, row keys
async function setTable(tableName, rows) {
  await sqlite3Async.run(`TRUNCATE TABLE ${tableName}`);
  for (const row of rows) {
    await insert(tableName, row);
  }
}

// Unsafe: tableName, row keys
async function insert(tableName, row) {
  const keys = Object.keys(row);
  const columns = keys.join(", ");
  const placeholders = new Array(keys.length).fill("?").join(", ");
  await sqlite3Async.run(
    `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}))`,
    Object.values(row)
  );
}

// Unsafe: tableName, row keys
async function remove(tableName, row) {
  await sqlite3Async.run(
    `DELETE FROM ${tableName} WHERE ${convertToConditions(row)}`,
    Object.values(row)
  );
}

// Unsafe: tableName, row keys
async function has(tableName, row) {
  const selection = await sqlite3Async.get(
    `SELECT 1 FROM ${tableName} WHERE ${convertToConditions(row)}`,
    Object.values(row)
  );
  return selection !== undefined;
}

////////////////////////////
// Non-exported functions //
////////////////////////////

// Unsafe
async function tableExists(tableName) {
  const err = await getRejection(sqlite3Async.run(`SELECT 1 FROM ${tableName}`));
  if (err === null) {
    return true;
  }
  if (err.message === `Error: SQLITE_ERROR: no such table: ${tableName}`) {
    return false;
  }
  throw err;
}

// Unsafe
async function createTable(tableName, columns) {
  await sqlite3Async.run(`CREATE TABLE ${tableName} (${columns})`);
}

// Unsafe: row keys
function convertToConditions(row) {
  return Object.keys(row)
    .map(key => `${key}=?`)
    .join(" ");
}

async function getRejection(promise) {
  try {
    await promise;
  } catch (err) {
    return err;
  }
  return null;
}

class Table {
  constructor(name, columns) {
    this.name = name;
    this.columns = columns;
  }
}

module.exports = {
  Table: Table
}
