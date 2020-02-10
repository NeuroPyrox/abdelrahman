"use strict";

const { assert, getRejection, asyncThrow, mapValues } = require("./helpers.js");
const T = require("./type.js");
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

class UnsafeTable {
  constructor(name, columns) {
    this.name = name;
    this.columns = columns;
  }

  async getAll() {
    return sqlite3Async.all(`SELECT * FROM ${this.name}`);
  }

  async setAll(rows) {
    await this.reset();
    for (const row of rows) {
      await this.insert(row);
    }
  }

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
    const exists = await this.exists();
    if (!exists) {
      await this.create();
    }
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
    try {
      await sqlite3Async.run(`DROP TABLE ${this.name}`);
    } catch (err) {
      throw Error(`Could not drop ${this.name}:\n${err}`);
    }
  }

  async create() {
    const signature = Object.entries(this.columns)
      .map(([column, type]) => `${column} ${type}`)
      .join(", ");
    await sqlite3Async.run(`CREATE TABLE ${this.name} (${signature})`);
  }
}

const nameType = T.regex(/^[a-zA-Z]\w*$/);

const columnsType = T.map(nameType, T.choice("INT", "TEXT", "BOOL"));

const takenNames = {};

class Table {
  constructor(name, columns) {
    nameType.validate(name);
    columnsType.validate(columns);
    assert(1 <= Object.keys(columns).length)
    assert(!takenNames[name]);
    takenNames[name] = true;
    this.unsafe = new UnsafeTable(name, columns);
    this.rowsType = T.array(
      T.object(
        mapValues(
          columns,
          value =>
            ({ INT: T.int, TEXT: T.type("string"), BOOL: T.type("boolean") }[
              value
            ])
        )
      )
    );
    this.lock = new Mutex();
    this.lock.do(() => this.unsafe.ensureExists());
  }

  async getAll() {
    return this.lock.do(() => this.unsafe.getAll());
  }

  async setAll(rows) {
    this.rowsType.validate(rows);
    await this.lock.do(() => this.unsafe.setAll(rows));
  }
  
  async reset() {
    await this.lock.do(async () => {
      await this.unsafe.reset();
    })
  }
}

module.exports = {
  Table: Table
};
