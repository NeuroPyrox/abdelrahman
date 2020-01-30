"use strict";

const { assert, objectIsEmpty } = require("./helper.js");
const resources = require("./resources.js");

// TODO decouple middleware from service classes once
//      there are 3 service classes using middleware

class StaticFile {
  constructor(path) {
    this.resource = new resources.StaticFile(path);
  }

  getResource(params) {
    assert(objectIsEmpty(params));
    return this.resource;
  }
}

class StaticJson {
  constructor(json) {
    this.resource = new resources.StaticJson(json);
  }

  getResource(params) {
    assert(objectIsEmpty(params));
    return this.resource;
  }
}

class Redirect {
  constructor(path) {
    this.resource = new resources.Redirect(path);
  }

  getResource(params) {
    assert(objectIsEmpty(params));
    return this.resource;
  }
}

class Table {
  constructor(table, middleware) {
    this.resource = new resources.MiddlewareWrapper(
      new resources.Table(table),
      middleware
    );
  }

  getResource(params) {
    assert(objectIsEmpty(params));
    return this.resource;
  }
}

class TableRow {
  constructor(table, middleware) {
    this.table = table;
    this.middleware = middleware;
  }

  getResource(params) {
    return new resources.MiddlewareWrapper(
      new resources.TableRow(this.table),
      this.middleware
    );
  }
}
