"use strict";

// IDEA move the non-exported parts to their own module to separate abstraction from implementation

const {
  assert,
  combineEntries,
  wrapIfNotArray,
  mapValues,
  mapValuesWithKeys,
  asyncHandler
} = require("./helpers.js");
const express = require("express");

const insertMainHandlers = (middleware, mainHandlers) => {
  // WARNING "main" is a magic value. Maybe make it a constant
  const mainIndex = middleware.indexOf("main");
  assert(mainIndex !== -1)
  const start = middleware.slice(0, mainIndex)
  const end = middleware.slice(mainIndex+1)
  return start.concat(mainHandlers, end)
};

class Service {
  constructor(methodHandlers) {
    // Maps http methods each to an array of handlers
    // Convert the values to arrays because it simplifies route and routeAll
    this.methodHandlers = mapValues(methodHandlers, wrapIfNotArray);
  }

  // Specifies which methods are allowed and what middleware they each have
  route(methodMiddleware) {
    return new Service(
      mapValuesWithKeys(methodMiddleware, (method, middleware) =>
        insertMainHandlers(middleware, this.methodHandlers[method])
      )
    );
  }

  // Adds the same middleware to every method
  routeAll(middleware) {
    return new Service(
      mapValues(this.methodHandlers, handlers =>
        insertMainHandlers(middleware, handlers)
      )
    );
  }
}

const asyncService = handlers => {
  return new Service(mapValues(handlers, asyncHandler));
};

/////////////
// Exports //
/////////////

const staticFile = path => {
  return new Service({
    get: (req, res) => {
      res.sendFile(__dirname + path);
    }
  });
};

const staticJson = json => {
  return new Service({
    get: (req, res) => {
      res.send(json);
    }
  });
};

const redirect = path => {
  return new Service({
    get: (req, res) => {
      res.redirect(path);
    }
  });
};

const table = databaseTable => {
  return asyncService({
    get: async (req, res) => {
      const rows = await table.getAll();
      res.send(rows);
    },

    put: async (req, res) => {
      await table.setAll(req.body);
    },

    post: async (req, res) => {
      await table.insert(req.body);
    }
  });
};

const tableRow = table => {
  return asyncService({
    head: async (req, res) => {
      const exists = await table.exists(req.params);
      if (!exists) {
        return res.sendStatus(404);
      }
    },

    put: async (req, res) => {
      const row = combineEntries([req.params, req.body]);
      await table.insert(row);
    },

    delete: async (req, res) => {
      await table.remove(req.params);
    }
  });
};

module.exports = {
  staticFile: staticFile,
  staticJson: staticJson,
  redirect: redirect,
  table: table,
  tableRow: tableRow
}
