"use strict";

const { assert, combineEntries, countKeys } = require("./helpers.js");
const responses = require("./responses.js");

class StaticFile {
  constructor(path) {
    this.path = path;
  }

  async get() {
    return responses.file(this.path);
  }
}

class StaticJson {
  constructor(json) {
    this.json = json;
  }

  async get() {
    return responses.json(this.json);
  }
}

class Redirect {
  constructor(path) {
    this.path = path;
  }

  async get() {
    return responses.redirect(this.path);
  }
}

class Table {
  constructor(table) {
    this.table = table;
  }

  async get() {
    const rows = await this.table.getAll();
    return responses.json(rows);
  }

  async put(json) {
    await this.table.setAll(json);
  }

  async post(json) {
    await this.table.insert(json);
  }
}

class TableRow {
  constructor(table, where) {
    assert(countKeys(where) === 1);
    this.table = table;
    this.where = where;
  }

  async head() {
    const exists = await this.table.exists(this.where);
    if (!exists) {
      return responses.status(404);
    }
  }

  async put(json) {
    const row = combineEntries([this.where, json]);
    await this.table.insert(row);
  }

  async delete() {
    await this.table.remove(this.where);
  }
}

module.exports = {
  StaticFile: StaticFile,
  StaticJson: StaticJson,
  Redirect: Redirect,
  Table: Table,
  TableRow: TableRow
};