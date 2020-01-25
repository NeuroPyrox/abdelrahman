"use strict";

// TODO test if contactInfo can be stored and retrieved if it has unsafe characters

const sqlite3 = require("sqlite3");
const Joi = require("@hapi/joi");

const database = new sqlite3.Database(".data/database.db");

ensureTableExists("Subscriptions", "endpoint TEXT, p256dh TEXT, auth TEXT");
ensureTableExists(
  "Orders",
  `timestamp INT,
   butterChickenQuantity INT, 
   butterChickenSpiceLevel TEXT,
   sweetNSourQuantity INT,
   delivery BOOL,
   contactInfo TEXT`
);

module.exports = {
  getOrders: async function getOrders() {
    return all("SELECT * FROM Orders");
  },

  addOrder: async function addOrder(order) {
    validateOrder(order);
    await run(
      `INSERT INTO Orders (
        timestamp, 
        butterChickenQuantity, 
        butterChickenSpiceLevel, 
        sweetNSourQuantity, 
        delivery, 
        contactInfo) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        Date.now(),
        order.butterChickenQuantity,
        order.butterChickenSpiceLevel,
        order.sweetNSourQuantity,
        order.delivery,
        order.contactInfo
      ]
    );
  },

  addSubscription: async function addSubscription(subscription) {
    const { endpoint } = subscription;
    const { p256dh, auth } = subscription.keys;
    await run(
      "INSERT INTO Subscriptions (endpoint, p256dh, auth) VALUES (?, ?, ?)",
      [endpoint, p256dh, auth]
    );
  },

  getSubscriptions: async function getSubscriptions() {
    const rows = await all("SELECT endpoint, p256dh, auth FROM Subscriptions");
    return rows.map(convertRowToSubscription);
  },

  hasSubscription: async function hasSubscription(endpoint) {
    const selection = await get(
      "SELECT 1 FROM Subscriptions WHERE endpoint=?",
      endpoint
    );
    return selection !== undefined;
  },

  removeSubscription: async function removeSubscription(endpoint) {
    await run("DELETE FROM Subscriptions WHERE endpoint=?", endpoint);
  }
}

// Vulnerable to sql injection
function ensureTableExists(name, columns) {
  if (!tableExists(name)) {
    createTable(name, columns);
  }
}

async function tableExists(name) {
  const err = await getRejection(run(`SELECT 1 FROM ${name}`))
  if (err === null) {
    return true;
  }
  if (err.message === `Error: SQLITE_ERROR: no such table: ${name}`) {
    return false;
  }
  throw err;
}

// Vulnerable to sql injection
async function createTable(name, columns) {
  await run(`CREATE TABLE ${name} (${columns})`);
}

async function run(sql, params) {
  const {promise, outerResolve} = createOuterResolve();
  database.run(sql, params, outerResolve);
  const [err] = await promise;
  checkForError(err);
}

async function get(sql, params) {
  const {promise, outerResolve} = createOuterResolve();
  database.get(sql, params, outerResolve);
  const [err, row] = await promise;
  checkForError(err);
  return row;
}

async function all(sql, params) {
  const {promise, outerResolve} = createOuterResolve();
  database.all(sql, params, outerResolve);
  const [err, rows] = await promise;
  checkForError(err);
  return rows;
}

//////////////////////
// Helper functions //
//////////////////////

async function getRejection(promise) {
  try {
    await promise;
  } catch(err) {
    return err;
  }
  return null;
}

// Resolves its arguments in an array
function createOuterResolve() {
  let outerResolve;
  const promise = new Promise(function(resolve, reject) {
    outerResolve = function(...args) {
      resolve(args)
    }
  })
  return {promise: promise, outerResolve: outerResolve}
}

function checkForError(err) {
  if (err !== null) {
    throw Error(err)
  }
}

/////////////////////////
// Non-exported functions
/////////////////////////

async function createOrderTable() {
  await database.run(
    `CREATE TABLE Orders (
      timestamp INT,
      butterChickenQuantity INT, 
      butterChickenSpiceLevel TEXT,
      sweetNSourQuantity INT,
      delivery BOOL,
      contactInfo TEXT
    )`
  );
}

function convertRowToSubscription({ endpoint, p256dh, auth }) {
  return {
    endpoint: endpoint,
    keys: {
      p256dh: p256dh,
      auth: auth
    }
  };
}

const orderSchema = Joi.object().keys({
  butterChickenQuantity: Joi.number()
    .integer()
    .min(0)
    .required(),
  butterChickenSpiceLevel: Joi.string().valid("notSpicy", "mild", "hot"),
  sweetNSourQuantity: Joi.number()
    .integer()
    .min(0)
    .required(),
  delivery: Joi.boolean().required(),
  contactInfo: Joi.string().required()
});

function validateOrder(order) {
  const err = orderSchema.validate(order).error;
  if (err !== undefined) {
    throw Error(JSON.stringify(err, null, 2));
  }
  if (order.butterChickenQuantity === 0) {
    if (order.butterChickenSpiceLevel !== null) {
      throw Error(
        "Expected butterChickenSpiceLevel to be null when butterChickenQuantity is 0"
      );
    }
  } else {
    if (!order.butterChickenSpiceLevel) {
      throw Error(
        "Expected butterChickenSpiceLevel when butterChickenQuantity is above 0"
      );
    }
  }
}
