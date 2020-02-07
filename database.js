"use strict";

const { assert, getRejection, asyncThrow } = require("./helpers.js");
const Mutex = require("./mutex.js");
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

const isName = name => /^[a-zA-Z]\w*$/.test(name);

const isColumnType = type => ["INT", "TEXT", "BOOL"].includes(type);

const columnsAreValid = columns => {
  return Object.entries(columns).every(
    ([key, value]) => isName(key) && isColumnType(value)
  );
};

// TODO validate input here instead of delegating that task to the function callers
// TODO make async operations robust against race conditions
class Table {
  constructor(name, columns) {
    assert(isName(name));
    assert(columnsAreValid(columns));
    this.name = name;
    this.columns = columns;
    this.lock = new Mutex();
    this.lock.do(() => this.ensureExists());
  }

  async getAll() {
    return this.lock.do(async () => {
      return sqlite3Async.all(`SELECT * FROM ${this.name}`);
    });
  }
  
  // Unsafe: row keys
  async setAll(rows) {
    await this.lock.do(
      async () => {
        await this.reset();
        for (const row of rows) {
          await this.insert(row);
        }
      }
    );
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

  async reset() {
    await this.drop();
    await this.create();
  }

  async ensureExists() {
    this.ensuringExistance = true;
    const exists = await this.exists();
    if (!exists) {
      console.log(this.name, "does not exist yet")
      await this.create();
    }
    this.ensuringExistance = false;
  }

  async exists() {
    const err = await getRejection(
      sqlite3Async.run(`SELECT 1 FROM ${this.name}`)
    );
    if (err === null) {
      return true;
    }
    if (err.message === `Error: SQLITE_ERROR: no such table: ${this.name}`) {
      return false;
    }
    throw err;
  }
  
  async drop() {
    await asyncThrow(async () => {
      try {
        await sqlite3Async.run(`DROP TABLE ${this.name}`);
      } catch(err) {
        throw Error(`Could not drop ${this.name}:\n${err}`)
      }
    })();
  }

  async create() {
    const signature = Object.entries(this.columns)
      .map(([column, type]) => `${column} ${type}`)
      .join(", ");
    await sqlite3Async.run(`CREATE TABLE ${this.name} (${signature})`);
  }
}

module.exports = {
  Table: Table
};
