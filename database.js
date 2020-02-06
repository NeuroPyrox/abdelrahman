"use strict";

const {onlyHasLetters, assert} = require("./helpers.js");
const sqlite3Async = require("./sqlite3Async.js");

// Unsafe = vulnerable to SQL injection

// TODO test if you can store strings with unsafe characters

// TODO move this into the Table class once necessary
/////////////////
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
/////////////////

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

const validateColumnName = key => {
  if (!/^[a-zA-Z]\w*$/.test(key)) {
    throw Error();
  }
}

const validateColumns = columns => {
  for (const [key, value] of Object.entries(columns)) {
    assert(["INT", "TEXT", "BOOL"].includes(value));
    validateColumnName(key);
  }
}

// TODO validate input here instead of delegating that task to the function callers
// TODO make async operations robust against race conditions
class Table {
  constructor(name, columns) {
    validateColumns(columns);
    this.name = name;
    this.columns = columns;
    // TODO force the constructor caller to await this
    this.ensureExists();
  }
  
  // Unsafe: row keys
  async setAll(rows) {
    await this.reset();
    for (const row of rows) {
      await this.insert(row);
    }
  }
  
  async getAll() {
    const table = await sqlite3Async.all(`SELECT * FROM ${this.name}`);
    return table;
  }
  
  // Unsafe: row keys
  async insert(row) {
    const keys = Object.keys(row);
    const columns = keys.join(", ");
    const placeholders = new Array(keys.length).fill("?").join(", ");
    await sqlite3Async.run(
      `INSERT INTO ${this.name} (${columns}) VALUES (${placeholders})`,
      Object.values(row)
    );
  }
  
  async ensureExists() {
    const exists = await this.exists();
    if (!exists) {
      await this.create();
    }
    // Reminder: if you find youself needing to check if the table has the right columns, you wrote poor code
  }
  
  async exists() {
    const err = await getRejection(sqlite3Async.run(`SELECT 1 FROM ${this.name}`));
    if (err === null) {
      return true;
    }
    if (err.message === `Error: SQLITE_ERROR: no such table: ${this.name}`) {
      return false;
    }
    throw err;
  }
  
  async reset() {
    await this.drop();
    await this.create();
  }
  
  async drop() {
    await sqlite3Async.run(`DROP TABLE ${this.name}`);
  }
  
  async create() {
    await sqlite3Async.run(`CREATE TABLE ${this.name} (${this.columns})`);
  }
}

module.exports = {
  Table: Table
}
